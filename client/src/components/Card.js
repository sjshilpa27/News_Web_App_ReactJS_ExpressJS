import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import Badge from 'react-bootstrap/Badge'
import Shareicon from "./Shareicon.js"
import ShareModal from "./ShareModal.js"
import {Link} from "react-router-dom";


const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
const BadgeDict = {
  WORLD : ["#7c4eff","white","WORLD"],
  POLITICS : ["#419488","white","POLITICS"],
  BUSINESS : ["#4696ec", "white","BUSINESS"],
  TECHNOLOGY : ["#cedc39", "black","TECHNOLOGY"],
  SPORT : ["#f6c244", "black","SPORTS"],
  SPORTS : ["#f6c244", "black","SPORTS"]

}

class Cards extends Component {
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

    var sharemodal = this.state.modal ? <ShareModal close={this.onCloseShareClick} title={this.props.article.title} url={this.props.article.url}/> : null;

    return(
    <>
    {sharemodal}
    <Card as = {Link} to={"/expand?id="+this.props.article.id} className='m-3 shadow bg-white rounded' style={{textDecoration:"inherit", color:"inherit"}}>
    
    <Container fluid >
      <Row xs={1} >
        <Col md ={5} lg = {3} style={{padding:"20px"}} >
              <img className='img-thumbnail' src={this.props.article.img} />
         </Col>
         <Col md={7} lg= {9} >

              <Card.Body>
                <Card.Title><h3 style={{fontStyle: 'italic' ,fontWeight:'bold'}}>{this.props.article.title}<span onClick={this.onShareClick}><Shareicon/></span></h3></Card.Title>
                <h6>
                <ResponsiveEllipsis
                    text={this.props.article.desc}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='words'
                    style = {{whiteSpace : "pre-wrap"}}

                  />
                </h6>
                
                <h5 style={{marginTop:"2rem"}}><span style={{fontStyle: 'italic'}}>{this.props.article.date}</span>
                <Badge style={{float:"right" , fontSize:"85%", backgroundColor:bgcolor, color:fontcolor}}>{text}</Badge>{' '}
                </h5>
              </Card.Body>
        </Col>
        </Row>
    </Container>
    </Card>
    </>
    )
}
}

export default Cards