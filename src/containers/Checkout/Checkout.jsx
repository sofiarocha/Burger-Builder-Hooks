import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace("/checkout/contact-form");
    }

    const { ings, purchased } = props;
    if (Object.keys(ings).length === 0)  return <Redirect to="/" />
    return (
        <div>
            {purchased ? <Redirect to="/" /> : null}
            <CheckoutSummary 
                ingredients={ings}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route 
                path={`${props.match.url}/contact-form`} 
                component={ContactForm}
            />
        </div>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

 
export default connect(mapStateToProps)(Checkout);