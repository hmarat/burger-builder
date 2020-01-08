import React, { Component } from "react"
import { Route } from "react-router";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

const searchToParams = search => {
    const query = new URLSearchParams(search).entries();
    const params = {};
    for (let param of query) {
        params[param[0]] = param[1];
    }

    return params;
}

export default class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount() {
        const params = searchToParams(this.props.location.search);
        const state = {}
        console.log(params)
        if (params["ingredientsString"]) {
            state["ingredients"] = JSON.parse(params["ingredientsString"]);
        }
        state["price"] = params["price"];

        this.setState(state);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={`${this.props.match.path}/contact-data`} render={(props) => (
                    <ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.price}
                        {...props}
                    />)} />
            </div>
        )
    }
}