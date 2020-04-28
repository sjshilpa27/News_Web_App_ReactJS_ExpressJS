import React, { Component } from "react";
import SearchCard from './SearchCard'
import Loading from "./Loading.js"
import queryString from 'query-string'


class SearchResults extends Component {
  
 constructor(props) {
    super(props)
      this.state = { 
        loading : true,
        cards : [],
        keyword:""
      }
    this.fetchData=this.fetchData.bind(this)
    }

    fetchData(url,keyword){
      fetch(url)
        .then(response => response.json())
        .then(data => {
          data = data.map(article => <SearchCard key={article.id} article={article}/>)
          this.setState((prevState)=>{
            return{
            loading: false,
            cards : data,
            keyword : keyword
            }
          })

        })
    }

    componentDidMount(){
      //console.log(this.props)
      //console.log(this.props.location.search)
      const values = queryString.parse(this.props.location.search)
      //console.log(values.keyword)
      var keyword = values.keyword
      var url= this.props.isguardian ? "http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/search/guardian?keyword="+keyword  :"http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/search/nytimes/?keyword="+keyword
      //console.log(url)
      this.fetchData(url,keyword)

    }


    componentDidUpdate(){
      // console.log(this.props)
      // console.log(this.props.location.search)

      const values = queryString.parse(this.props.location.search)
      //console.log(values.keyword)
      var keyword = values.keyword
      if(this.state.keyword !== keyword)
      {
        var url= this.props.isguardian ? "http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/search/guardian?keyword="+keyword  :"http://newsappserver-env.eba-u2cka2hf.us-west-1.elasticbeanstalk.com/search/nytimes/?keyword="+keyword
        console.log(url)
        this.fetchData(url,keyword)
      }
    }

  render(){

  	return(
      <div >
      {this.state.loading ? <Loading /> : 
        <div className="m-3">
          <h3 style={{marginBottom : "1rem"}}>Results</h3>
          <div className="d-flex flex-wrap"> 
            {this.state.cards}
          </div>
        </div>
      }
  		</div>
  		)


  }
}
export default SearchResults