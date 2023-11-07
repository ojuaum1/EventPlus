import React from 'react';
import "./Title.css";

const Title = ({titleText, color = "", className = ""}) => {

 return (
        <h1 className= {`title ${className}`} style={{color : color}}>
            {titleText}
            <hr 
            className='title__underscore'
            style={
                color !=="" ? {bordercColor: color} : {}
            }
            />
        </h1>
    );


}
   

export default Title;