import React, { lazy, Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/actions';

const AsyncAuth = lazy(() => import('./containers/Auth/Auth'));
const AsyncOrders = lazy(() => import('./containers/Orders/Orders'));
const AsyncCheckout = lazy(() => import('./containers/Checkout/Checkout'));

const App = (props) => {
  const { onTryAutoSignup } = props;
  
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <Layout>
      {props.isAuth
        ? 
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={BurgerBuilder} />
              <Route path="/checkout" component={AsyncCheckout} />
              <Route path="/orders" component={AsyncOrders} />
              <Route path="/logout" component={Logout} />
              <Route path="/auth" component={AsyncAuth} />
              <Redirect to="/" />
            </Switch>
        </Suspense>
        : 
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={BurgerBuilder} />
              <Route path="/auth" component={AsyncAuth} />
              <Redirect to="/" />
            </Switch>
        </Suspense>
      }
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== "",
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
