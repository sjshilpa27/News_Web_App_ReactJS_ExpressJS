import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";

const hash = "CSCI_571_NewsApp"

class ShareModalBM extends Component {
  constructor(){
    super()
  }


  render(){
    var size = "3.5rem"
    return (
        <Modal show={true} onHide={this.props.close}>
          <Modal.Header closeButton>
              <Modal.Title>
              <h4 style={{fontWeight:"bold"}}>{this.props.source}</h4>
              <h5 style={{fontWeight:"normal"}}>{this.props.title}</h5></Modal.Title>
          </Modal.Header>
          
          <Modal.Body style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
            <h5 style={{fontWeight:"normal"}}>Share via</h5>

          <div style={{display:"flex", justifyContent:"space-around", width:"100%"}}>
            <FacebookShareButton
            url={this.props.url}
            hashtag={'#'+hash}
            >
              <FacebookIcon
                size={size}
                round/>
            </FacebookShareButton>


            <TwitterShareButton
            url={this.props.url}
            hashtags={[hash]}
            >
            <TwitterIcon
              size={size}
              round />
          </TwitterShareButton>

          <EmailShareButton
            url={this.props.url}
            body=""
            subject={'#'+hash}
            >
            <EmailIcon
              size={size}
              round/>
           
          </EmailShareButton>
          </div>
          </Modal.Body>
        </Modal>
      )
  }
}


export default ShareModalBM