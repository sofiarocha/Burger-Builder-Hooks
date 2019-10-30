import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    //to optimize the app and order summary just be render when we click on the "ORDER NOW" is clicked
    // shouldComponentUpdate (nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    // }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{ 
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0"
                }}
            >
                {props.children}
            </div>  
        </Aux>
    );
}
 
export default React.memo(
    Modal,
    (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children
);