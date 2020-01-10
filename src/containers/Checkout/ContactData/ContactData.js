import React, { Component } from "react"

import axios from "../../../axios-order"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"

export default class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig:{
                    placeholder: "Name",
                    type: "text"
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig:{
                    placeholder: "Country",
                    type: "text"
                },
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig:{
                    placeholder: "Street",
                    type: "text"
                },
                value: ""
            },
            zipCode: {
                elementType: "input",
                elementConfig:{
                    placeholder: "Zip code",
                    type: "text"
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig:{
                    placeholder: "E-mail",
                    type: "email"
                },
                value: ""
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig:{
                    options:[
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: ""
            }
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
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }  

        let form = (
            <form>
                {formElementsArray.map(element =>{
                    return(
                        <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value}/>
                    )
                })}
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