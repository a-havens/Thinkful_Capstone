import React from 'react';
import { useDashboard } from './hooks/useDashboard';
import { ErrorState } from '../../components/Error/ErrorState';
import { ReservationsList } from '../manageReservation/components/ReservationsList';
import { TableList } from '../manageTables/components/TableList';

export const DashboardScreen = () => {
    const { data, isError, error, actions } = useDashboard();

    const { handlePrevious, handleNext } = actions;

    if (isError) {
        return <ErrorState error={error} />;
    }

    if (!data) {
        return null;
    }

    const { date, reservations, tables } = data;

    return (
        <main>
            <h1>Dashboard</h1>
            <div className='d-md-flex mb-3'>
                <h4 className='mb-0'>Reservations for date: {date}</h4>
            </div>
            <div className='d-md-flex mb-3'>
                <button
                    className='col-3'
                    type='button'
                    onClick={handlePrevious}
                >
                    Previous
                </button>
                <button className='col-3' type='button' onClick={handleNext}>
                    Next
                </button>
            </div>

            <ReservationsList reservations={reservations} />
            <TableList tables={tables} />
        </main>
    );
};
