import React, { useState } from "react"
import { connect } from "react-redux"

import axios from "../../../axios-order"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import { purchaseBurger } from "../../../store/actions/index"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
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
            value: "fastest",
            valid: true,
            touched: false
        }
    })

    const [formIsValid, setFormIsValid] = useState(false);

    const makeOrderHandler = (evt) => {
        evt.preventDefault();

        const formData = {};
        for (let elementIdentifier in orderForm) {
            formData[elementIdentifier] = orderForm[elementIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onBurgerOrdered(order, props.token)
    }

    const checkValidity = (value, rules) => {
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

    const inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = { ...orderForm };
        const updatedElement = updatedOrderForm[identifier];
        updatedElement["value"] = event.target.value;
        updatedElement["valid"] = checkValidity(event.target.value, updatedElement.validation);
        updatedElement["touched"] = true;

        updatedOrderForm[identifier] = updatedElement;

        let formIsValid = true;

        for (let inputElementIdentifier in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[inputElementIdentifier].valid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid)
    }

    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={makeOrderHandler}>
            {formElementsArray.map(element => {
                return (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        changed={(event) => inputChangedHandler(event, element.id)}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                    />
                )
            })}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    )

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Fill contacts below</h4>
            {form}
        </div>
    )

}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    onBurgerOrdered: (orderData, token) => dispatch(purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))