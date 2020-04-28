import React, { Component } from "react";
import Card from "./Card.js"
import Loading from "./Loading.js"

class Technology extends Component {

	constructor(props) {
    super(props)
    	this.state = { 
    		loading : true,
    		cards : []
    	}
    this.fetchData=this.fetchData.bind(this)
    }

    fetchData(url){
      fetch(url)
        .then(response => response.json())
        .then(data => {
          data = data.map(article => <Card key={article.id} article={article}/>)
          this.setState((prevState)=>{
            return{
            loading: false,
            cards : data
            }
          })

        })
    }

    componentDidMount(){
      var url= this.props.isguardian ? "http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/topstories/guardian/technology":"http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/topstories/nytimes/technology"
    	this.fetchData(url)

    }

    componentDidUpdate(prevProps){
      if(prevProps.isguardian!==this.props.isguardian){
        this.setState({loading:true})
      
        var url= this.props.isguardian ? "http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/topstories/guardian/technology":"http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/topstories/nytimes/technology"
        this.fetchData(url)

      }
    }
  

   render() {
    return (
      <div>
  		{this.state.loading ? <Loading /> : this.state.cards}
      </div>
  	
  	)

}
}

export default Technology
