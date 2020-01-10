import React from "react"

import classes from "./Input.module.css"

const Input = props =>{
    let inputElement = null;

    switch(props.elementType){
        case "input": inputElement = <input className={classes.InputElement} type={props.elementType} {...props.elementConfig} value={props.value}/>;break;
        case "textarea": inputElement = <textarea className={classes.InputElement} type={props.elementType} {...props.elementConfig} value={props.value}/>;break;
        case "select": inputElement = (
            <select value={props.value} className={classes.InputElement}>
                {props.elementConfig.options.map(option =>{
                    return(
                        <option value={option.value}>{option.displayValue}</option>
                    )
                })}
            </select>
        );break;
        default: inputElement = <input className={classes.InputElement} type={props.elementType} {...props.elementConfig} value={props.value}/>; break;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;