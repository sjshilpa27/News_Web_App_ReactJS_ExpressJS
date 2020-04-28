import React, { Component } from "react";
import BookmarkCard from './BookmarkCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import ReactTooltip from 'react-tooltip'

class Bookmarked extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        data:[]
     }
  this.onDeleteClick =this.onDeleteClick.bind(this)
 }

  onDeleteClick(id){
    //console.log(id)
        

        var title = (JSON.parse(localStorage.getItem(id))).title
        console.log(title)
        toast("Removing "+title, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          color: "black",
          backgroundColor :"red"
          });

        localStorage.removeItem(id)  

        var keys = Object.keys(localStorage)
        var arr = []
        console.log(keys)
        for (var i = 0; i < keys.length; i++) {
          arr.push(JSON.parse(localStorage.getItem(keys[i])))
        }
        // console.log(JSON.parse(localStorage.getItem(keys[0]))
        console.log(arr)


        var dataComponent = arr.map(item=> <BookmarkCard key={item.id} article={item} onDeleteClick={this.onDeleteClick} />)
        this.setState({
          data:dataComponent
        })
  }



  componentDidMount(){
    var keys = Object.keys(localStorage)
    var arr = []
    ReactTooltip.hide();
    //console.log(keys)
    for (var i = 0; i < keys.length; i++) {
      arr.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    // console.log(JSON.parse(localStorage.getItem(keys[0]))
    //console.log(arr)
    var dataComponent = arr.map(item=> <BookmarkCard key={item.id} article={item} onDeleteClick={this.onDeleteClick} />)
    this.setState({
      data:dataComponent
    })
  }







  render(){
    var keys = Object.keys(localStorage)

    // console.log(localStorage)
  	return(
  	<div className="m-3">
      <ToastContainer transition={Zoom}  />   
      { keys.length === 0 ?
        <h3 style={{textAlign :"center"}}>
        You have no saved articles
        </h3>
      :
      <div className="m-3">
        <ToastContainer transition={Zoom}  />        
        <h3 style={{marginBottom : "1rem"}}>Favorites</h3>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", flexFlow:"row wrap", alignItems:"flex-start"}}> 
          {this.state.data}
        </div>

      </div>
    }
    </div>
  		)


  }
}
export default Bookmarked