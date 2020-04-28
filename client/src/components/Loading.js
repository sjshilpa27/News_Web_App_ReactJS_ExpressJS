import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

function Loading(props){
	const override = css`
	  display: block;
	  margin: auto;
	  border-color: red;
	`;
	return(
		<div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column', height:'80vh' , width:'100vw'}}>
        <BounceLoader
          size={30}
          color={"#2e4ec3"}
          
        />
        <span className="m-1"><h5>Loading</h5></span>
      </div>

	)
}

export default Loading