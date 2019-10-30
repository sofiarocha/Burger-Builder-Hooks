import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import { useSelector, useDispatch } from 'react-redux';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actions';

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => state.auth.token !== "");

    const onAddIngredients = (ingType) => dispatch(actions.addIngredient(ingType));
    const onRemoveIngredients = (ingType) => dispatch(actions.removeIngredient(ingType));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onPurchasedInit = () => dispatch(actions.purchaseInit());
    const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    
    useEffect(() => {
       onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchase = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum += ingredients[key];
        }
        return sum > 0;
    }

    const purshasingHandler = () => {
        if(props.isAuth) {
            setPurchasing(true);
        } else {
            onSetRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onPurchasedInit();
        props.history.push("/checkout");
    }

    const disabledInfo = {...ings};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0; 
    }

    return (
        <Aux>
            {error
                    && <p style={{ textAlign: "center" }}>
                    Ingredients are not available! <br/>Try later, please
                </p>
            }
            {ings
                ? <Aux>
                    <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                        <OrderSummary 
                            ingredients={ings}
                            totalPrice={totPrice}
                            purchaseCancel={purchaseCancelHandler}
                            purchaseContinue={purchaseContinueHandler}
                        />
                    </Modal>
                    <Burger ingredients={ings} />
                    <BuildControls 
                        addIngredient={onAddIngredients}
                        removeIngredient={onRemoveIngredients}
                        disableInfo={disabledInfo}
                        totalPrice={totPrice}
                        purchasable={updatePurchase(ings)}
                        ordered={purshasingHandler}
                        isAuth={isAuth}
                    />
                </Aux>   
                : <Spinner />
            }
        </Aux>
    );
}
 
export default (withErrorHandler(BurgerBuilder, axios));

