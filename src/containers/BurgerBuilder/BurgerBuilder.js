import React, { Component } from "react"
import { connect } from "react-redux"

import Aux from "../../hoc/Auxi/Auxi"
import Modal from "../../components/UI/Modal/Modal"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Burger from "../../components/Burger/Burger"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-order"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import * as actionTypes from "../../store/actions"

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        hasError: false
    }

    componentDidMount() {
        // axios.get("https://burger-builder-134d9.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(err => {
        //         this.setState({ hasError: true });
        //     })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchaseHandler = () => {
        this.props.history.push({
            pathname: "/checkout"
        });
    }

    render() {
        const disabledIngredientsInfo = {
            ...this.props.ings
        }

        for (let key in disabledIngredientsInfo) {
            disabledIngredientsInfo[key] = disabledIngredientsInfo[key] <= 0;
        }

        let burger = this.state.hasError ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        disabledIngredientsInfo={disabledIngredientsInfo}
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    canceled={this.cancelPurchaseHandler}
                    continued={this.continuePurchaseHandler}
                />
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => ({
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))