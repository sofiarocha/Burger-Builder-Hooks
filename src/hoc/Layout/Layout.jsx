import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false);
    }

    const openSideDrawerHandler = () => {
        setShowSideDrawer(true);
    }

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticate}
                drawerToggleClicked={openSideDrawerHandler}
            />
            <SideDrawer
                isAuth={props.isAuthenticate}
                open={showSideDrawer}
                closed={closeSideDrawerHandler}
            />
            <main className={classes.content}>
                {props.children}
            </main>
        </Aux>
    );

}

const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token !== "",
    }
}

export default connect(mapStateToProps)(Layout);