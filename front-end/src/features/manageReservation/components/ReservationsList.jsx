import React from 'react';
import { useUpdateReservationStatusMutation } from '../api/useUpdateReservationStatusMutation';
import { Link } from 'react-router-dom';
import { reservationForm } from '../../../constants/constants';

export const ReservationsList = ({ reservations }) => {
    const { mutate: cancelReservation } = useUpdateReservationStatusMutation();

    const cancelReservationHandler = ({
        reservation_id,
        reservation_status,
        reservation_date,
    }) => {
        if (window.confirm('Do you want to cancel this reservation?')) {
            cancelReservation({
                reservation_id: reservation_id,
                status: reservation_status,
                reservation_date: reservation_date,
            });
        }
    };

    return (
        <table className='table table-striped table-bordered'>
            <thead className='thread-dark'>
                <tr>
                    <th>Reservation ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                    <th>Reservation Date</th>
                    <th>Reservation Time</th>
                    <th>People</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map(
                    (
                        {
                            reservation_id,
                            first_name,
                            last_name,
                            mobile_number,
                            reservation_date,
                            reservation_time,
                            people,
                            status,
                        },
                        index
                    ) =>
                        status !== 'cancelled' &&
                        status !== 'finished' && (
                            <tr key={index} className='res-text table-row'>
                                <td>{reservation_id}</td>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{mobile_number}</td>
                                <td>{reservation_date}</td>
                                <td>{reservation_time}</td>
                                <td>{people}</td>
                                <td>
                                    <p
                                        data-reservation-id-status={
                                            reservation_id
                                        }
                                    >
                                        {status}
                                    </p>
                                </td>
                                <td>
                                    {status !== 'booked' ? null : (
                                        <>
                                            <Link
                                                to={{
                                                    pathname: `/reservations/${reservation_id}/seat`,
                                                    state: {
                                                        reservation_date:
                                                            reservation_date,
                                                    },
                                                }}
                                                className='btn btn-outline-primary mx-1'
                                            >
                                                Seat
                                            </Link>
                                            <Link
                                                to={{
                                                    pathname: `/reservations/${reservation_id}/edit`,
                                                    state: {
                                                        form: reservationForm,
                                                        reservation_date:
                                                            reservation_date,
                                                    },
                                                }}
                                                className='btn btn-outline-primary mx-1'
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                data-reservation-id-cancel={
                                                    reservation_id
                                                }
                                                className='btn btn-danger'
                                                type='button'
                                                onClick={() =>
                                                    cancelReservationHandler({
                                                        reservation_id:
                                                            reservation_id,
                                                        reservation_status:
                                                            'cancelled',
                                                        reservation_date:
                                                            reservation_date,
                                                    })
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )
                )}
            </tbody>
        </table>
    );
};
