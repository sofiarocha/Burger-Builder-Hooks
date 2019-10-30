import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = ({ children, link, active }) => (
    <li className={classes.NavigationItem}>
        <NavLink
            exact
            to={link}
            activeClassName={classes.active}
        >
            {children}
        </NavLink>
    </li>
);
 
export default NavigationItem;