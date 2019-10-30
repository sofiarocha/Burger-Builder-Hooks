import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './ContactForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/actions';
import { updateObject, checkValidationHandler } from '../../../shared/utility';

const ContactForm = (props) => {
    const [orderForm, setOrderForm] = useState(
        {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                changedByUser: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7,
                    isNumeric: true,
                },
                valid: false,
                changedByUser: false,
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "normal"},
                        {value: "express"},
                    ]
                },
                value: "normal",
                valid: true,
                validation: {},
                changedByUser: false,
            }
        }
    );
    const [formIsValid, setFormIsValid] = useState(false);

    const orderSubmit = (event) => {
        const { ings, totPrice, userId, token  } = props;
        event.preventDefault();
        const orderData = {};
        for (let formInputName in orderForm) {
            orderData[formInputName] = orderForm[formInputName].value
        }

        const order = {
            ingredients: ings,
            price: totPrice,
            orderData: orderData,
            userId: userId,
        }

        props.onBurgerOrder(order, token);
    }
    
    const inputChangedHandler = (event, inputIndentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIndentifier], {
            value: event.target.value,
            valid: checkValidationHandler(event.target.value, orderForm[inputIndentifier].validation),
            changedByUser: true,
        });
        
        const updatedForm = updateObject(orderForm, {
            [inputIndentifier]: updatedFormElement,
        });

        let formIsValid = true;
        for (let inputNames in updatedForm) {
            formIsValid = updatedForm[inputNames].valid && formIsValid;
        }
        setOrderForm(updatedForm);
        setFormIsValid(formIsValid);
    }

    const { loading } = props;

    let formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    return (
        <div className={classes.ContactForm}>
            <h4>Enter your Contact data:</h4>
            {
                loading
                    ? <Spinner />
                    : <form onSubmit={orderSubmit}>
                        {formElementsArray.map(formInput => (
                            <Input
                                key={formInput.id}
                                inputName={formInput.id}
                                elementType={formInput.config.elementType}
                                elementConfig={formInput.config.elementConfig}
                                value={formInput.config.value}
                                invalid={!formInput.config.valid}
                                shouldBeValidated={formInput.config.validation}
                                changedByUser={formInput.config.changedByUser}
                                changed={(event) => inputChangedHandler(event, formInput.id)}
                            />
                        ))}
                        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                    </form>
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactForm, axios));