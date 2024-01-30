import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DashboardScreen } from '../../features/dashboard/DashboardScreen';
import { SearchScreen } from '../../features/search/SearchScreen';
import { TablesListScreen } from '../../features/manageTables/TablesListScreen';
import { ManageReservationsScreen } from '../../features/manageReservation/ManageReservationsScreen';
import { AddTableScreen } from '../../features/manageTables/AddTableScreen';
import { NotFound } from './NotFound';
import { AssignTableReservationForm } from '../../features/manageReservation/components/AssignTableReservationForm';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

export const Routes = () => (
    <Switch>
        <Route exact path='/'>
            <Redirect to='/dashboard' />
        </Route>

        <Route path='/dashboard' component={DashboardScreen} />

        <Route path='/search' component={SearchScreen} />

        <Route path='/reservations/new'>
            <ManageReservationsScreen title='New Reservation' />
        </Route>
        <Route path='/reservations/:reservation_id/edit'>
            <ManageReservationsScreen title='Edit Reservation' isEditing />
        </Route>
        <Route
            path='/reservations/:reservation_id/seat'
            component={AssignTableReservationForm}
        />

        <Route exact path='/tables' component={TablesListScreen} />
        <Route path='/tables/new' component={AddTableScreen} />

        <Route>
            <NotFound />
        </Route>
    </Switch>
);
