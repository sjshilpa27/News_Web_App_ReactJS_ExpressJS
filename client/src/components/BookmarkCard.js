import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import Badge from 'react-bootstrap/Badge'
import Shareicon from "./Shareicon.js"
import ShareModalBM from "./ShareModalBM.js"
import DeleteIcon from "./DeleteIcon.js"
import {Link} from "react-router-dom";


const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
const BadgeDict = {
  WORLD : ["#7c4eff","white","WORLD"],
  POLITICS : ["#419488","white","POLITICS"],
  BUSINESS : ["#4696ec", "white","BUSINESS"],
  TECHNOLOGY : ["#cedc39", "black","TECHNOLOGY"],
  SPORT : ["#f6c244", "black","SPORTS"],
  GUARDIAN : ["#14284a","white","GUARDIAN"],
  NYTIMES : ["#dddddd","black","NYTIMES"]


}

class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        modal:false
     }
    this.onShareClick = this.onShareClick.bind(this)
    this.onCloseShareClick = this.onCloseShareClick.bind(this)

  }

onShareClick(event){
  event.stopPropagation()
  event.preventDefault()
  this.setState({modal:true})
  console.log(event)

}

onCloseShareClick(){
  // event.stopPropagation()
  //event.preventDefault()
  this.setState({modal:false})
  // console.log(event)

}

render() {
  var bgcolor=""
  var fontcolor=""
  var text=""
  if(BadgeDict.hasOwnProperty(this.props.article.sectionid.toUpperCase())){
    bgcolor = BadgeDict[this.props.article.sectionid.toUpperCase()][0]
    fontcolor = BadgeDict[this.props.article.sectionid.toUpperCase()][1]
    text = BadgeDict[this.props.article.sectionid.toUpperCase()][2]
    
  }
  else{
    bgcolor = "gray"
    fontcolor = "white"
    text=this.props.article.sectionid.toUpperCase()
  }

    var sharemodal = this.state.modal ? <ShareModalBM close={this.onCloseShareClick} title={this.props.article.title} url={this.props.article.url} source={this.props.article.source.toUpperCase()}/> : null;

    return(
    <>
    {sharemodal}
    <Card as = {Link} to={"/expand?id="+this.props.article.id} className='searchcard shadow bg-white rounded' style={{textDecoration:"inherit", color:"inherit"}}>
 
		  <Card.Body>
		    <Card.Title><h5 style={{margin:"0", fontStyle: 'italic' , fontWeight : 'bold'}}>
            
                <ResponsiveEllipsis
                    text={this.props.article.title}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='words'
                    style = {{whiteSpace : "pre-wrap"}}
                  />
                <span onClick={this.onShareClick}><Shareicon/></span>
                <span onClick={(event) => { event.preventDefault();
                                            this.props.onDeleteClick(this.props.article.id)}}><DeleteIcon/></span>

                </h5>
                </Card.Title>
		    <Card.Img className='img-thumbnail' src={this.props.article.img}/>
		    <div className="mt-2 mb-2" style={{display:"flex", flexDirection:"row", alignItems:"flex-end"}}>
		      <h5 style={{margin:"0rem"}}><span style={{fontStyle: 'italic', fontSize:'medium', margin:"0rem"}}>{this.props.article.date}</span>
		      </h5> 
          <div style={{display:"flex", flex:"1", flexDirection:"row-reverse", alignItems:"flex-end"}}>         
		      <h5 style={{margin:"0rem"}}>     
		                <Badge className="ml-1" style={{float:"right" ,
		                	 			fontSize:"small", 
		                	 			backgroundColor:BadgeDict[this.props.article.source.toUpperCase()][0],
		                	 			color:BadgeDict[this.props.article.source.toUpperCase()][1]
		                	 		}}> {BadgeDict[this.props.article.source.toUpperCase()][2]} 
		                </Badge>{' '}
          </h5>
          <h5 style={{margin:"0rem"}}>
		                <Badge  style={{float:"right" , fontSize:"small", backgroundColor:bgcolor, color:fontcolor}}>{text}</Badge>{' '}
					</h5>
           </div>
		    </div>
		  </Card.Body>
</Card>
    </>
    )
}
}

export default BookmarkCard