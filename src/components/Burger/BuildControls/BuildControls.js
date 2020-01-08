import React from "react"

import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.module.css"

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]

const BuildControls = props =>{
    return(
        <div className={classes.BuildControls}>
            <p>Current price: {props.price.toFixed(2)}$</p>
            {controls.map(ctr => (
                <BuildControl 
                    key={ctr.label}
                    label={ctr.label}
                    add={() => props.addIngredient(ctr.type)}
                    remove={() => props.removeIngredient(ctr.type)}
                    disabled={props.disabledIngredientsInfo[ctr.type]}
                />
            ))}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    )
}

export default BuildControls;