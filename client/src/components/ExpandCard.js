import React, { Component } from "react"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import Badge from 'react-bootstrap/Badge'
import Shareicon from "./Shareicon.js"
import ShareModal from "./ShareModal.js"
import Button from 'react-bootstrap/Button'
import Bookmarkicon from './Bookmarkicon'
import Bookmarkedicon from './Bookmarkedicon'
import { FaAngleDown, FaAngleUp} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";

const hash = "CSCI_571_NewsApp"
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)


class ExpandCard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isBm : false,
        isExpanded : false,
        shorttext : ""
     }
    this.onBmClick=this.onBmClick.bind(this)
    this.notifyToastandSave=this.notifyToastandSave.bind(this)
    this.onClickAngleIcon=this.onClickAngleIcon.bind(this)
  }

componentDidMount(){
  if(localStorage.getItem(this.props.data.id) !== null){
      this.setState({isBm:true})
  } 
    var shorttext = document.getElementsByClassName("LinesEllipsis")[0].innerText 
    console.log(shorttext)
    this.setState({shorttext:shorttext})
}

componentDidUpdate(){
  if(!this.state.isExpanded)
  {
    var shorttext = document.getElementsByClassName("LinesEllipsis")[0].innerText 
    if(this.state.shorttext!==shorttext){
      this.setState({shorttext:shorttext})
    }
  }
}

onClickAngleIcon(){
  this.setState((prevState) => {return {isExpanded: !prevState.isExpanded}})
}



onBmClick(event){
  event.preventDefault()
  console.log("bm clikced")
  this.setState((prevState)=>{
            return{
            isBm : !prevState.isBm

            }
  }, this.notifyToastandSave)
}

notifyToastandSave = () => {
    if (this.state.isBm === true){
      toast("Saving "+this.props.data.title, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          color: "black",
          backgroundColor :"red"
          });
      localStorage.setItem(this.props.data.id, JSON.stringify(this.props.data));
    }
    else{
      toast("Removing "+this.props.data.title, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          color: "black",
          backgroundColor :"red"
          });
    
      localStorage.removeItem(this.props.data.id);
    }

}









render() {
  var size = "2rem"
  
                  //console.log(shorttext)
  
  // console.log(this.props)
    return(
    <Card className='m-3 shadow bg-white rounded'>
    

      <ReactTooltip place="top" type="dark" effect="solid"/>
              <Card.Body style={{display:"flex", flexDirection:"column"}}>
                <Card.Title style={{margin:"0"}}><h3 style={{fontStyle: 'italic', fontWeight:'normal'}}>{this.props.data.title}</h3></Card.Title>
                  <div style={{display:"flex", alignItems:"center"}}>
                      <h5 style={{margin:"0", marginLeft:"1%"}} ><span style={{fontStyle: 'italic', margin:"0", fontWeight:'normal'}}>{this.props.data.date}</span></h5>
                      
                      <div style={{display:"flex",flexDirection:"row-reverse", flex:"1"}}>
                        <div onClick={this.onBmClick} style={{color:"#b24555", fontSize:"2rem", marginLeft:"6%" , marginRight:"1.5%"}}>
                            {this.state.isBm ?  <a data-tip="Bookmark"> <Bookmarkedicon /></a> :  <a data-tip="Bookmark"> <Bookmarkicon/></a>}


                        </div>
                        <ToastContainer transition={Zoom}  />  
                          <div style={{display:"flex", flex:"1", justifyContent : "flex-end"}}>
                            <FacebookShareButton
                            url={this.props.data.url}
                            hashtag={'#'+hash}
                            >
                              <a data-tip="Facebook">  
                              <FacebookIcon
                                size={size}
                                round/>
                              </a>
                            </FacebookShareButton>


                            <TwitterShareButton
                            url={this.props.data.url}
                            hashtags={[hash]}
                            >
                            <a data-tip="Twitter">  
                            <TwitterIcon
                              size={size}
                              round />
                            </a>
                          </TwitterShareButton>

                          <EmailShareButton
                            url={this.props.data.url}
                            body=""
                            subject={'#'+hash}
                            >
                            <a data-tip="Email">  
                            <EmailIcon
                              size={size}
                              round/>
                           </a>
                          </EmailShareButton>
                        </div>
                          
                    </div>
                      

                   </div>


                <div>
                  <img style={{width:"100%"}} src={this.props.data.img}/>
                  </div>


              

                <Card.Text style={{align:"justify"}}>
                {this.state.isExpanded ?
                  this.props.data.desc
                  :
                  <ResponsiveEllipsis
                      text={this.props.data.desc}
                      maxLine='6'
                      ellipsis='...'
                      trimRight
                      basedOn='words'
                      style = {{whiteSpace : "pre-wrap"}}
                    />
                  }
                  
                </Card.Text>

                  <div style={{fontSize:"1.5rem"}}>
                  {
                  this.state.shorttext === this.props.data.desc?
                  null
                  :
                  this.state.isExpanded ? 
                    <FaAngleUp onClick = {this.onClickAngleIcon} style={{float:"right"}} />
                    :
                    <FaAngleDown onClick = {this.onClickAngleIcon} style={{float:"right"}}/>
                  }
                  </div>

              </Card.Body>
    
    </Card>
    )
}
}

export default ExpandCard