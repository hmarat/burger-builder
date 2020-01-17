import * as actionTypes from "../actions/actionTypes"

const initState = {
    orders: [],
    loading: false
}

const reducer = (state = initState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.concat()
            }
        case actionTypes.PURCHASE_BURGER_FAILED: 
            return {
                ...state,
                loading: false
            }
        default: return state
    }
}

export default reducer