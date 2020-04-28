import React, {Component} from 'react'
import NavBar from './components/NavBar.js'
import Home from "./components/Home"
import World from "./components/World.js"
import Politics from "./components/Politics"
import Business from "./components/Business"
import Technology from "./components/Technology"
import Sports from "./components/Sports"
import Expand from "./components/Expand"
import Bookmarked from "./components/Bookmarked"
import SearchResults from "./components/SearchResults"

import Error from "./components/Error"
import { BrowserRouter, Route, Switch } from "react-router-dom"
class App extends Component {

	constructor(){

		super()
		this.state = {
			isguardian : true
		}
		this.changeSource = this.changeSource.bind(this)
	}

	changeSource(){
		this.setState(prevState => {
			return(
			{
				isguardian : !prevState.isguardian
			})
		})
		// console.log(this.state.isguardian)
	}


	render(){

		return(
			<div>
				<NavBar isguardian={this.state.isguardian} changeSource={this.changeSource}/>
				<Switch>
					       <Route path="/" render={() => <Home isguardian = {this.state.isguardian} />} exact />
			               <Route path="/world" render={() => <World isguardian = {this.state.isguardian} />} />
			               <Route path="/politics" render={() => <Politics isguardian = {this.state.isguardian} />} />
			               <Route path="/business" render={() => <Business isguardian = {this.state.isguardian} />} />
			               <Route path="/technology" render={() => <Technology isguardian = {this.state.isguardian} />} />
			               <Route path="/sports" render={() => <Sports isguardian = {this.state.isguardian} />} />
			               <Route path="/expand" render={(props) => <Expand isguardian = {this.state.isguardian} {...this.props} {...props}/>} />
			               <Route path="/bookmarked" render={() => <Bookmarked />} />
			               <Route path="/searchresults" render={(props) => <SearchResults isguardian = {this.state.isguardian} {...this.props} {...props}/>} />
					       <Route component={Error} />
				</Switch>
			</div>

			)

	}

}
export default App
