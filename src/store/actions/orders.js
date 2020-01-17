import axios from "../../axios-order"

import * as actionTypes from "./actionTypes"

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id,
        orderData
    }
}

export const purchaseBurgerFailed = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart())

        axios.post("/orders.json", orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFailed(err));
            });
    }
}