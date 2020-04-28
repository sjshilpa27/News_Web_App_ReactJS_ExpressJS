import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import SearchBox from './SearchBox.js'
import Container from 'react-bootstrap/Container'
import SwitchSource from './Switch.js'
import Bookmarkicon from './Bookmarkicon'
import Bookmarkedicon from './Bookmarkedicon'
import ReactTooltip from 'react-tooltip'
import {Link,withRouter} from "react-router-dom";

class NavBar extends Component{
	constructor(){
		super()
		this.state = {
			selectedTab:"home"

		}
		this.tabClick=this.tabClick.bind(this)
	}

	componentDidUpdate(){
		var path = this.props.location.pathname
		if((path==="/bookmarked" || path=="/searchresults" || path=="/expand" ) && this.state.selectedTab!=="")
			this.setState({selectedTab:""})
	}

	tabClick(e){
		var id = e.currentTarget.dataset.id
		this.setState((prevState)=>{
		return {selectedTab:id}
		})
	
	}
	render(){
		ReactTooltip.rebuild()

		var path = this.props.location.pathname

		//console.log(path)
		return (
						<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ backgroundImage: "linear-gradient(to right, #24355c , #4060a5)" , width: "100%" , verticalAlign: "middle" }} >
					    <ReactTooltip place="top" type="dark" effect="solid" style={{padding:'4px 10px'}}/>
					    <SearchBox/>
					    <Navbar.Toggle aria-controls = "responsive-navbar-nav"/>
					    <Navbar.Collapse>

					    <Nav className="mr-auto" >
					      	<Nav.Link as={Link} data-id="home" className = {this.state.selectedTab==="home"? "selected":null} to="/" onClick={this.tabClick}>Home</Nav.Link>
							<Nav.Link as={Link} data-id="world" className = {this.state.selectedTab==="world"? "selected":null} to="/World" onClick={this.tabClick}>World</Nav.Link>
							<Nav.Link as={Link} data-id="politics" className = {this.state.selectedTab==="politics"? "selected":null} to="/Politics" onClick={this.tabClick}>Politics</Nav.Link>
							<Nav.Link as={Link} data-id="business" className = {this.state.selectedTab==="business"? "selected":null} to="/Business" onClick={this.tabClick}>Business</Nav.Link>
							<Nav.Link as={Link} data-id="technology" className = {this.state.selectedTab==="technology"? "selected":null} to="/Technology" onClick={this.tabClick}>Technology</Nav.Link>
							<Nav.Link as={Link} data-id="sports" className = {this.state.selectedTab==="sports"? "selected":null} to="/Sports" onClick={this.tabClick}>Sports</Nav.Link>
					    </Nav>
					    <Nav>
					    <Nav.Link as ={Link} to="/bookmarked" style={{ color:"rgba(255,255,255,.9)"}} className="mr-3" ><span data-tip="Bookmark" style={{fontSize:'large'}}>{path==="/bookmarked"? <Bookmarkedicon/>:<Bookmarkicon/>}</span></Nav.Link>
					    {
					    	(path==="/bookmarked" || path=="/searchresults" || path=="/expand") ?
					    		null 
					    		:
					    <>		
					    <Navbar.Text className="mr-2" style={{ color:"rgba(255,255,255,.9)",fontSize:'large'}}>NYTimes</Navbar.Text>
					    <Navbar.Text className="mr-2" style={{ fontSize:'large'}}><SwitchSource isguardian={this.props.isguardian} changeSource={this.props.changeSource}/></Navbar.Text>
					    <Navbar.Text className="mr-2" style={{ color:"rgba(255,255,255,.9)",fontSize:'large'}}>Guardian</Navbar.Text>
						</>
						}
					    </Nav>
					    </Navbar.Collapse>
					  </Navbar>
			
		)
	}
}

export default withRouter(NavBar)


