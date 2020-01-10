import React, { Component } from "react"

import Order from "../../components/Order/Order"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-order"

export default class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount() {
        axios.get("orders.json")
            .then(response => {
                const fetchedOrders = [];
                const orders = response.data;
                for (let key in orders) {
                    fetchedOrders.push({
                        ...orders[key],
                        id: key
                    })
                }

                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        let orders = <Spinner />;

        if (!this.state.loading) {
            orders = this.state.orders.map(order => {
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
}