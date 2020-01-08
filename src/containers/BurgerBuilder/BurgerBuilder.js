import React, { Component } from "react"

import Aux from "../../hoc/Auxi/Auxi"
import Modal from "../../components/UI/Modal/Modal"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Burger from "../../components/Burger/Burger"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-order"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.4,
    cheese: 0.4,
    meat: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        hasError: false
    }

    componentDidMount(){
        axios.get("https://burger-builder-134d9.firebaseio.com/ingredients.json")
            .then(response =>{
                this.setState({ingredients: response.data});
            })
            .catch(err =>{
                this.setState({hasError: true});
            })
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = type =>{
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const additionPrice = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + additionPrice;

        this.setState(() => ({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }));

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type =>{
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;

        if(newCount < 0){
            return true;
        }

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const deductionPrice = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - deductionPrice;

        this.setState(() => ({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }));
        this.updatePurchaseState(updatedIngredients);
    }

    cancelPurchaseHandler = () =>{
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () =>{
        this.setState(() => {
            console.log("Loading")
            return {loading: true}
        })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            .then(response =>{
                this.setState({loading: false, purchasing: false})
            })
            .catch(err =>{
                this.setState({loading: false, purchasing: false})
            });
    }
    
    render() {
        const disabledIngredientsInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledIngredientsInfo){
            disabledIngredientsInfo[key] = disabledIngredientsInfo[key] <= 0;
        }

        let burger = this.state.hasError? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;

        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        disabledIngredientsInfo={disabledIngredientsInfo}
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    canceled={this.cancelPurchaseHandler} 
                    continued={this.continuePurchaseHandler}
                />
            )
        }

        if(this.state.loading){
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

export default withErrorHandler(BurgerBuilder, axios)