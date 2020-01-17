import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth"

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" component={BurgerBuilder} exact />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Layout>
      </div>
    )
  }
}