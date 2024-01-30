import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Menu } from '../navigation/menu/Menu';
import { Routes } from '../navigation/routes/Routes';

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
export const App = () => (
    <div className='container-fluid'>
        <div className='row h-100'>
            <div className='col-md-2 side-bar'>
                <Menu />
            </div>
            <div className='col'>
                <Routes />
            </div>
        </div>
    </div>
);
