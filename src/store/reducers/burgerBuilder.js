import * as actionTypes from "../actions/actionTypes"

import { updateObject } from "../utility"

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    isBuilding: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.4,
    cheese: 0.4,
    meat: 1.2
}

const addIngredient = (state, action) => {
    const updatedIngrediend = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngrediends = updateObject(state.ingredients, updatedIngrediend);
    return updateObject(state, {
        ingredients: updatedIngrediends,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        isBuilding: true
    })
}

const removeIngredient = (state, action) => {
    const updatedIngrediend = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngrediends = updateObject(state.ingredients, updatedIngrediend);
    return updateObject(state, {
        ingredients: updatedIngrediends,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        isBuilding: true
    })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        isBuilding: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;
    }
}

export default reducer