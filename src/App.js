import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
//import Checkout from "./containers/Checkout/Checkout"
//import Orders from './containers/Orders/Orders';
//import Auth from "./containers/Auth/Auth"
import Logout from './containers/Auth/Logout/Logout';
import { checkAuthState } from './store/actions/index';

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" component={BurgerBuilder} exact />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" component={BurgerBuilder} exact />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<div>Loading</div>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token != null
})

const mapDispatchToProps = dispatch => {
  return {
    onAutoAuth: () => dispatch(checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)