import React,{Component} from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import {withRouter} from 'react-router-dom'




class SearchBox extends Component{
	constructor(){
		super()
		this.state={
			results:[],
			defaultinput:"Enter keyword ..",
			value:''
		}
		this.getSuggestion=this.getSuggestion.bind(this)
		this.loadOptions=this.loadOptions.bind(this)
		this.handleSelectChange=this.handleSelectChange.bind(this)

	}


	async getSuggestion(inputValue) {
		try {
      const response = await fetch(
        `https://autosuggestnewsapp.cognitiveservices.azure.com/bing/v7.0/suggestions?q=${inputValue}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "c4c50194297f4b72925b859e13c984e3"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ value: result.displayText , label: result.displayText }));
      // console.log(results)
      // console.log(inputValue)
      this.setState({results:results})
      return results;
      //this.setState({ results });
    } catch (error) {
      console.log(`Error fetching search ${inputValue}`);
      return this.state.results;
    }
  };


	async loadOptions(inputValue, callback){

	    callback(await this.getSuggestion(inputValue));
	}

	handleSelectChange(event) {

		// this.setState((prevState)=> {
		// 	return {flag : !prevState.flag}
		// })
		this.props.history.push('/searchresults?keyword='+event.value)


	  };


	

	  render() {
	  	// console.log("in render")
	  	// console.log("inside")

	  	var path = this.props.location.pathname
	  	console.log(path)



	  	console.log(this.state.value)
	    return (
	      

	      <div className="search">
	      
	      { path !== "/searchresults" ?
	      	<AsyncSelect
	          cacheOptions
	          placeholder={this.state.defaultinput}
	          loadOptions={this.loadOptions}
	          defaultOptions
	          value=""
	          noOptionsMessage={() => { return "No Match"} }
	          onChange={this.handleSelectChange}
	        />
	       :

	        <AsyncSelect
	          cacheOptions
	          placeholder={this.state.defaultinput}
	          loadOptions={this.loadOptions}
	          defaultOptions
	          noOptionsMessage={() => { return "No Match"} }
	          onChange={this.handleSelectChange}
	        />
	      }
	      </div>
	    );
	  }
	}



export  default withRouter(SearchBox)