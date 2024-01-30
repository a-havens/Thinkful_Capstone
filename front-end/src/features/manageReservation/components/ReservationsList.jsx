import React from 'react';
import { useUpdateReservationStatusMutation } from '../api/useUpdateReservationStatusMutation';
import { Link } from 'react-router-dom';

export const ReservationsList = ({ reservations }) => {
    const { mutate: cancelReservation } = useUpdateReservationStatusMutation();

    const cancelReservationHandler = ({
        reservation_id,
        reservation_status,
    }) => {
        if (window.confirm('Are you sure you want to cancel reservation.')) {
            cancelReservation({ reservation_id, status: reservation_status });
        }
    };

    const displayReservations = reservations.map((reservation, index) => {
        if (
            reservation.status !== 'finished' ||
            reservation.status !== 'cancelled'
        ) {
            return (
                <tr key={index} className='res-text table-row'>
                    <td>{reservation.reservation_id}</td>
                    <td>{reservation.first_name}</td>
                    <td>{reservation.last_name}</td>
                    <td>{reservation.mobile_number}</td>
                    <td>{reservation.reservation_date}</td>
                    <td>{reservation.reservation_time}</td>
                    <td>{reservation.people}</td>
                    <td>
                        <p
                            data-reservation-id-status={
                                reservation.reservation_id
                            }
                        >
                            {reservation.status}
                        </p>
                    </td>
                    <td>
                        {reservation.status !== 'booked' ? null : (
                            <>
                                <Link
                                    to={`/reservations/${reservation.reservation_id}/seat`}
                                    className='btn btn-outline-primary mx-1'
                                >
                                    Seat
                                </Link>
                                <Link
                                    to={`/reservations/${reservation.reservation_id}/edit`}
                                    className='btn btn-outline-primary mx-1'
                                >
                                    Edit
                                </Link>
                                <button
                                    data-reservation-id-cancel={
                                        reservation.reservation_id
                                    }
                                    className='btn btn-danger'
                                    type='button'
                                    onClick={() =>
                                        cancelReservationHandler({
                                            reservation_id:
                                                reservation.reservation_id,
                                            reservation_status: 'cancelled',
                                        })
                                    }
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </td>
                </tr>
            );
        }
        return null;
    });

    return (
        <div>
            <div>
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
                    <tbody>{displayReservations}</tbody>
                </table>
            </div>
        </div>
    );
};
