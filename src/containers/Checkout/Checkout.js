import React from "react"
import { Route, Redirect } from "react-router";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"
import { connect } from "react-redux";

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace("/checkout/contact-data");
    }

    let summary = <Redirect to="/" />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null

        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route path={`${props.match.path}/contact-data`} component={ContactData} />
            </div>
        )
    }
    return summary

}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.orders.purchased
})

export default connect(mapStateToProps)(Checkout);