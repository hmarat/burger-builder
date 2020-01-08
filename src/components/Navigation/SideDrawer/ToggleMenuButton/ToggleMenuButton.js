import React from "react"

import classes from "./ToggleMenuButton.module.css"

const ToggleMenuButton = props =>{
    return(
        <div 
            className={classes.ToggleMenuButton}
            onClick={props.clicked}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )   
}

export default ToggleMenuButton;