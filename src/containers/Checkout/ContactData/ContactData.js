import React, { Component } from "react"

import axios from "../../../axios-order"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner"

export default class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postal: ""
        },
        loading: false
    }

    makeOrderHandler = (evt) => {
        evt.preventDefault();

        this.setState(() => {
            return { loading: true }
        })

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Marat Hakobjanyan",
                address: {
                    country: "Armenia",
                    street: "Test Street 2",
                    zipCode: "375000"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        }

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push("/")
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
                <Button btnType="Success" clicked={this.makeOrderHandler}>ORDER</Button>
            </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Fill contacts below</h4>
                {form}
            </div>
        )
    }
}