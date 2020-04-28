const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 8081
const key_guardian = '4c8a77b0-89e8-4dc5-be95-049f0e731e5e'
const key_nytimes = '8k2TGD3EwOWZ9yzHsTMsdlJiBZ0B1MWf'
const default_guardian_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
const default_nytimes_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
})


app.get('/topstories/:source/:section', (req, res,next) => {
	let source = req.params.source
	let section = req.params.section
	let url =""
	if(source === "guardian"){
		if(section === "home"){
			url = 'https://content.guardianapis.com/search?api-key='+key_guardian+'&section=(sport|business|technology|politics)&show-blocks=all'
		}
		else{
			url = 'https://content.guardianapis.com/'+section+'?api-key='+key_guardian+'&show-blocks=all'

		}
	}
	else if(source ==="nytimes"){
		if(section === "home"){
			url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key='+key_nytimes
		}
		else{
			url = 'https://api.nytimes.com/svc/topstories/v2/'+section+'.json?api-key='+key_nytimes

		}

	}
	// console.clear()
	console.log(url)
	const getData = async url => {
	  try {
	    const response = await fetch(url);
	    let json = await response.json();
	    if(source === "guardian"){
	    	json = filterguardian(json,10)
		}
		else if(source === "nytimes"){
	    	json = filternytimes(json)
		}	
	    
	    res.send(json);
	  } catch (error) {
	    console.log(error);
	  }
	};

	getData(url);

})


const filterguardian = (json,maxcount) => {
	let articles = json.response.results
	// console.log(articles)
	let count = 0
	var results = []
	for (var i = 0; i < articles.length; i++) {
		if (articles[i].webTitle != null && articles[i].sectionId != null && articles[i].webPublicationDate != null && articles[i].blocks.body[0].bodyTextSummary != null &&  articles[i].webTitle != "" && articles[i].sectionId != "" && articles[i].webPublicationDate != "" && articles[i].blocks.body[0].bodyTextSummary != "")
		{
			var obj = new Object()
			obj.id = articles[i].id
			obj.title = articles[i].webTitle
			obj.sectionid = articles[i].sectionId
			obj.date = articles[i].webPublicationDate.split('T')[0]
			obj.desc = articles[i].blocks.body[0].bodyTextSummary
			obj.url = articles[i].webUrl
			obj.source="guardian"
			try{
				if (articles[i].blocks.main.elements[0].assets[articles[i].blocks.main.elements[0].assets.length-1].file != null && articles[i].blocks.main.elements[0].assets[articles[i].blocks.main.elements[0].assets.length-1].file != ""){
					obj.img = articles[i].blocks.main.elements[0].assets[articles[i].blocks.main.elements[0].assets.length-1].file
				}
				else{
					obj.img = default_guardian_img
				}

			}

			catch(error){
					obj.img = default_guardian_img
			}

			count+=1
			results.push(obj)
		}

		if(count == maxcount){
			break
		}
	}
	// console.log(results)
	return results
}

const filternytimes = json => {
	let articles = json.results
	let count = 0
	var results = []
	for (var i = 0; i < articles.length; i++) {
		if (articles[i].title != null && articles[i].section != null && articles[i].published_date != null && articles[i].abstract != null && articles[i].title != "" && articles[i].section != "" && articles[i].published_date != "" && articles[i].abstract != "")
		{

			var obj = new Object()
			obj.id = articles[i].url
			obj.title = articles[i].title
			obj.sectionid = articles[i].section
			obj.date = articles[i].published_date.split('T')[0]
			obj.desc = articles[i].abstract
			obj.url = articles[i].url
			obj.source="nytimes"
			imgset = 0
			try
			{
				multimedia = articles[i].multimedia
				for (var j = 0; j < multimedia.length; j++) {
					if(multimedia[j].width >=2000){
						obj.img = multimedia[j].url
						imgset = 1
						break
					}
				}
			}
			catch(err)
			{
				console.log("image not found for "+obj.id)
				imgset=0
			}

			if(imgset==0){
				obj.img = default_nytimes_img
			}

			count+=1
			// console.log(i)
			// console.log(obj)
			results.push(obj)
		}

		if(count == 10){
			break
		}
	}
	return results
}





app.get('/detail/:source', (req, res,next) => {
	let source = req.params.source
	let id = req.query.id
	let url =""
	console.log("hi")
	if(source === "guardian"){
			url = 'https://content.guardianapis.com/'+id+'?api-key='+key_guardian+'&show-blocks=all'

	}
	else if(source ==="nytimes"){
			url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+id+'")&api-key='+key_nytimes
	}
	
	console.log(url)
	const getData = async url => {
	  try {
	    const response = await fetch(url);
	    const json = await response.json();
	    cleaned_json=clean(json,source)
	    res.send(cleaned_json);
	  } catch (error) {
	    console.log(error);
	  }
	};

	getData(url);

})


const clean = (json,source) => {
	if (source == "guardian"){
		console.log(json)
		let articleContent = json.response.content
		console.log(articleContent)
			var obj = new Object()
			obj.title = articleContent.webTitle
			obj.date = articleContent.webPublicationDate.split('T')[0]
			obj.desc = articleContent.blocks.body[0].bodyTextSummary
			obj.url = articleContent.webUrl
			obj.id=articleContent.id
			obj.source=source
			obj.sectionid=articleContent.sectionId
			
			try{
				if (articleContent.blocks.main.elements[0].assets[articleContent.blocks.main.elements[0].assets.length-1].file != null && articleContent.blocks.main.elements[0].assets[articleContent.blocks.main.elements[0].assets.length-1].file != ""){
					obj.img = articleContent.blocks.main.elements[0].assets[articleContent.blocks.main.elements[0].assets.length-1].file
				}
				else{
					obj.img = default_guardian_img
				}

			}

			catch(error){
					obj.img = default_guardian_img
			}
	return obj
	}
	else if (source =="nytimes"){
		let articleDocs = json.response.docs[0]
				var obj = new Object()
				obj.title = articleDocs.headline.main
				obj.date = articleDocs.pub_date.split('T')[0]
				obj.desc = articleDocs.abstract
				obj.url = articleDocs.web_url
				obj.id= articleDocs.web_url
				obj.source=source
				obj.sectionid=articleDocs.news_desk
				
				imgset = 0
				try
				{
					multimedia = articleDocs.multimedia
					for (var j = 0; j < multimedia.length; j++) {
						if(multimedia[j].width >=2000){
							obj.img = "https://www.nytimes.com/"+multimedia[j].url
							imgset = 1
							break
						}
					}
				}
				catch(err)
				{
					console.log("image not found ")
					imgset=0
				}

				if(imgset==0){
					obj.img = default_nytimes_img
				}
		return obj
	}

}






app.get('/search/:source', (req, res,next) => {
	let source = req.params.source
	let keyword = req.query.keyword
	let url =""
	console.log("hi")
	if(source === "guardian"){
		url = 'https://content.guardianapis.com/search?q='+keyword+'&api-key='+key_guardian+'&show-blocks=all'
	}
	else if(source ==="nytimes"){
		url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keyword+'&api-key='+key_nytimes
	}
	
	console.log(url)
	const getData = async url => {
	  try {
	    const response = await fetch(url);
	    const json = await response.json();
	    if(source==="guardian")
	    {
	    cleaned_json=filterguardian(json,json.length)
	    }
	    if(source==="nytimes")
	    {
	    cleaned_json=cleansearchnytimes(json)
	    }
	    res.send(cleaned_json);
	  } catch (error) {
	    console.log(error);
	  }
	};

	getData(url);

})


const cleansearchnytimes = (json) => {
	
			let articles = json.response.docs
			var results = []
			for (var i = 0; i < articles.length; i++) {
				if (articles[i].headline.main != null && articles[i].news_desk != null && articles[i].pub_date != null && articles[i].headline.main != "" && articles[i].news_desk != "" && articles[i].pub_date != "" )
				{

					var obj = new Object()
					obj.id = articles[i].web_url
					obj.title = articles[i].headline.main
					obj.sectionid = articles[i].news_desk
					obj.date = articles[i].pub_date.split('T')[0]
					obj.desc = articles[i].abstract
					obj.url = articles[i].web_url
					obj.source="nytimes"
					imgset = 0
					try
					{
						multimedia = articles[i].multimedia
						for (var j = 0; j < multimedia.length; j++) {
							if(multimedia[j].width >=2000){
								obj.img = "https://www.nytimes.com/"+multimedia[j].url
								imgset = 1
								break
							}
						}
					}
					catch(err)
					{
						console.log("image not found for "+obj.id)
						imgset=0
					}

					if(imgset==0){
						obj.img = default_nytimes_img
					}

					// console.log(i)
					// console.log(obj)
					results.push(obj)
				}

				
			}
			return results
		}








 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


