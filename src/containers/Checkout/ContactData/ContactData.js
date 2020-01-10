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
                elementConfig: {
                    placeholder: "Name",
                    type: "text"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    placeholder: "Country",
                    type: "text"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    placeholder: "Street",
                    type: "text"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    placeholder: "Zip code",
                    type: "text"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    placeholder: "E-mail",
                    type: "email"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                validation: {},
                value: "",
                valid: true,
                touched: false
            }
        },
        loading: false,
        formIsValid: false
    }

    makeOrderHandler = (evt) => {
        evt.preventDefault();

        this.setState(() => {
            return { loading: true }
        })

        const formData = {};
        for (let elementIdentifier in this.state.orderForm) {
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = isValid && value.trim() !== "";
        }
        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }
        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = updatedOrderForm[identifier];
        updatedElement["value"] = event.target.value;
        updatedElement["valid"] = this.checkValidity(event.target.value, updatedElement.validation);
        updatedElement["touched"] = true;

        updatedOrderForm[identifier] = updatedElement;

        let formIsValid = true;
        for (let inputElementIdentifier in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[inputElementIdentifier].valid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        })
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.makeOrderHandler}>
                {formElementsArray.map(element => {
                    return (
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            changed={(event) => this.inputChangedHandler(event, element.id)}
                            invalid={!element.config.valid}
                            shouldValidate={element.config.validation}
                            touched={element.config.touched}
                        />
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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