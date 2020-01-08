import React from "react"

import Aux from "../../../hoc/Auxi/Auxi"
import Button from "../../../components/UI/Button/Button"

const OrderSummary = props => {
    const items = Object.keys(props.ingredients).map(ingKey => (
        <li key={ingKey}><span style={{textTransform: "capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
    ))

    return(
        <Aux>
            <h1>Your order</h1>
            <p>A delicius burger with following ingredients:</p>
            <ul>
                {items}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.canceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;