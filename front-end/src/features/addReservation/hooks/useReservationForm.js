import { useReadReservationQuery } from '../api/useReadReservationQuery';
import { useCreateReservationMutation } from '../api/useCreateReservationMutation';
import { useEffect } from 'react';
import { useUpdateReservationMutation } from '../api/useUpdateReservationMutation';
import { useForm } from '../../../hooks/useForm';

export const useReservationForm = ({ reservation_id }) => {
    const { formState, setFormState } = useForm({
        first_name: 'Tom',
        last_name: 'Brady',
        mobile_number: '555-123-4567',
        reservation_date: '2020-01-31',
        reservation_time: '15:00',
        people: '',
    });

    const { data: reservation } = useReadReservationQuery({ reservation_id });

    const {
        mutate: postReservation,
        isError: isPostReservationError,
        error: postReservationError,
    } = useCreateReservationMutation();

    const { mutate: putReservation } = useUpdateReservationMutation({
        reservation_id,
    });

    // if "editing" the form, load data for the supplied reservation_id
    useEffect(() => {
        const abortController = new AbortController();

        if (reservation) {
            setFormState(reservation);
        }
        return () => abortController.abort();
    }, [reservation, setFormState]);

    const handleChange = ({ target }) =>
        setFormState({
            ...formState,
            [target.name]: target.value,
        });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // POST request (new reservation)
        if (!reservation_id) {
            postReservation({
                ...formState,
                people: parseInt(formState.people, 10),
            });
        }

        // PUT request (edit reservation)
        if (reservation_id) {
            putReservation(formState);
        }
    };

    return {
        formState,
        handleChange,
        handleSubmit,
        postReservationStates: {
            isPostReservationError,
            postReservationError,
        },
    };
};
