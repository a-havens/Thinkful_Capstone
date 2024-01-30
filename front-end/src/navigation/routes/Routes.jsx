import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DashboardScreen } from '../../features/dashboard/DashboardScreen';
import { SearchScreen } from '../../features/search/SearchScreen';
import { TablesListScreen } from '../../features/addTable/TablesListScreen';
import { ReservationsScreen } from '../../features/addReservation/ReservationsScreen';
import { AddTableScreen } from '../../features/addTable/AddTableScreen';
import { NotFound } from './NotFound';
import { AssignTableReservationForm } from '../../features/addReservation/components/AssignTableReservationForm';

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
            <ReservationsScreen title='New Reservation' />
        </Route>
        <Route path='/reservations/:reservation_id/edit'>
            <ReservationsScreen title='Edit Reservation' isEditing />
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
