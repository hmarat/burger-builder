import React from "react"

import classes from "./Order.module.css"

const Order = props => {
    const ingredients = [];

    for (let key in props.ingredients) {
        ingredients.push({ name: key, amount: props.ingredients[key] })
    }

    const ingredientsOutput = ingredients.map(ingredient => (
        <span
            key={ingredient.name}
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                border: "1px solid #ccc",
                padding: "5px",
                margin: "0 8px"
            }}
        >{ingredient.name}({ingredient.amount})</span>
    ))

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Total price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;