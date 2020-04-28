import React, { Component } from "react";
import Card from "./Card.js"
import Loading from "./Loading.js"
import queryString from 'query-string'
import ExpandCard from './ExpandCard.js'
import CommentBox from './CommentBox.js'

class Expand extends Component {

	constructor() {
    super()
    	this.state = { 
    		loading : true,
    		data : []
    	}
    this.fetchData=this.fetchData.bind(this)
    }

    fetchData(url){
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          //data = data.map(article => <Card key={article.id} article={article}/>)
          this.setState((prevState)=>{
            return{
            loading: false,
            data : data
            }
          })

        })
    }

    componentDidMount(){
      console.log(this.props)
      console.log(this.props.location.search)
      const values = queryString.parse(this.props.location.search)
      console.log(values.id)
      var id = values.id
      var url= this.props.isguardian ? "http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/detail/guardian?id="+id  :"http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/detail/nytimes/?id="+id
    	console.log(url)
      this.fetchData(url)


    }

    
   render() {
    return (
      <div>
  		{this.state.loading ? <Loading /> 
      : 
      <div>
           <ExpandCard data = {this.state.data} /> 
           <CommentBox data = {this.state.data}/> 
      </div>}
      </div>
  	
  	)

}
}

export default Expand
