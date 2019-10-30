import React from 'react';

import Aux from '../Auxiliar/Auxiliar';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorhandler from '../../hooks/http-error';

const withErrorModal = ( WrappedComponent, axios ) => {
    return props => {
        const [error, clearError] = useHttpErrorhandler(axios);

        return (
            <Aux>
                <Modal 
                    show={error}
                    modalClosed={clearError}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}
 
export default withErrorModal;