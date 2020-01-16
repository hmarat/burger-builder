import * as actionTypes from "./actionTypes"

import axios from "../../axios-order"

export const addIngredient = (ingName) => ({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName })
export const removeIngredient = (ingName) => ({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
export const setIngredients = (ingredients) => ({ type: actionTypes.SET_INGREDIENTS, ingredients })
export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burger-builder-134d9.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            })
    }
}
export const fetchIngredientsFailed = () => ({ type: actionTypes.FETCH_INGREDIENTS_FAILED })