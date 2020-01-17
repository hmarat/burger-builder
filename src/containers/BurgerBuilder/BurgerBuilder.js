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
import { addIngredient, removeIngredient, initIngredients, purchaseInit } from "../../store/actions/index"

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    }

    componentDidMount() {
        this.props.onIngredientsLoaded();
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
        this.props.onPurchaseInit();
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

        let burger = this.props.error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p> : <Spinner />;
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
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => ({
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onIngredientsLoaded: () => dispatch(initIngredients()),
    onPurchaseInit: () => dispatch(purchaseInit())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))