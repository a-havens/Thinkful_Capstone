import React from 'react';
import { useHistory } from 'react-router-dom';
import { useReservationForm } from '../hooks/useReservationForm';
import { Button } from '../../../components/Button/Button';
import { FormInput } from '../../components/FormInput';
import { ErrorState } from '../../../components/Error/ErrorState';

export const ReservationForm = ({ reservation_id }) => {
    const {
        formState,
        handleChange,
        handleSubmit,
        isError,
        readReservationError,
        postReservationError,
        editReservationError,
    } = useReservationForm({
        reservation_id,
    });
    const history = useHistory();

    return (
        <>
            {isError && (
                <ErrorState
                    error={
                        readReservationError ||
                        postReservationError ||
                        editReservationError
                    }
                />
            )}
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='First Name'
                    labelHtml='first_name'
                    name='first_name'
                    id='first_name'
                    placeholder='First Name'
                    onChange={handleChange}
                    required
                    value={formState.first_name}
                />

                <FormInput
                    label='Last Name'
                    labelHtml='last_name'
                    name='last_name'
                    id='last_name'
                    placeholder='Last Name'
                    onChange={handleChange}
                    required
                    value={formState.last_name}
                />

                <FormInput
                    label='Mobile Phone Number'
                    labelHtml='mobile_number'
                    name='mobile_number'
                    id='mobile_number'
                    placeholder='555-555-5555'
                    onChange={handleChange}
                    required
                    value={formState.mobile_number}
                />

                <FormInput
                    label='Reservation Date'
                    labelHtml='reservation_date'
                    type='date'
                    name='reservation_date'
                    id='reservation_date'
                    onChange={handleChange}
                    required
                    value={formState.reservation_date}
                />

                <FormInput
                    label='Reservation Time'
                    labelHtml='reservation_time'
                    type='time'
                    name='reservation_time'
                    id='reservation_time'
                    onChange={handleChange}
                    required
                    value={formState.reservation_time}
                />

                <FormInput
                    label='Number of People in Party'
                    labelHtml='people'
                    type='number'
                    name='people'
                    id='people'
                    onChange={handleChange}
                    required
                    value={formState.people}
                />

                <Button title='Submit' type='submit' />
                <Button
                    title='Cancel'
                    onClick={() => history.goBack()}
                    data-reservation-id-cancel={reservation_id}
                />
            </form>
        </>
    );
};
