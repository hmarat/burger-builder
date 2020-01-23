import React, { useEffect } from "react"
import { connect } from "react-redux"

import Order from "../../components/Order/Order"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-order"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import { fetchOrders } from "../../store/actions"

const Orders = (props) => {
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, [])

    let orders = <Spinner />;

    if (!props.loading) {
        orders = props.orders.map(order => {
            return (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            )
        })
    }

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))