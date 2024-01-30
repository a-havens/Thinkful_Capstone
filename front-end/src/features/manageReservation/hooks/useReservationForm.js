import { useReadReservationQuery } from '../api/useReadReservationQuery';
import { useCreateReservationMutation } from '../api/useCreateReservationMutation';
import { useEffect } from 'react';
import { useUpdateReservationMutation } from '../api/useUpdateReservationMutation';
import { useForm } from '../../../hooks/useForm';
import { convertFormattedDate } from '../../../utils/date-time';
import { useLocation } from 'react-router-dom';
import { reservationForm } from '../../../constants/constants';

export const useReservationForm = ({ reservation_id }) => {
    const location = useLocation();

    const { state: locationState } = location;

    const { formState, setFormState } = useForm(reservationForm);

    const { data: reservation } = useReadReservationQuery({ reservation_id });

    const {
        mutate: createReservation,
        isError: isPostReservationError,
        error: postReservationError,
    } = useCreateReservationMutation();

    const { mutate: editReservation } = useUpdateReservationMutation();

    // if "editing" the form, load data for the supplied reservation_id
    useEffect(() => {
        if (reservation !== undefined) {
            setFormState({
                ...reservation.data,
                reservation_date: convertFormattedDate(
                    reservation.data.reservation_date
                ),
            });
        } else {
            setFormState({
                ...locationState.form,
            });
        }
    }, [locationState, reservation, setFormState]);

    const handleChange = ({ target }) =>
        setFormState({
            ...formState,
            [target.name]: target.value,
        });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // POST request (new reservation)
        if (!reservation_id) {
            createReservation({
                ...formState,
                people: parseInt(formState.people, 10),
            });
        }

        // PUT request (edit reservation)
        if (reservation_id) {
            console.log('calling');
            editReservation({
                form: formState,
                reservation_id: reservation_id,
            });
        }
    };

    return {
        formState,
        setFormState,
        handleChange,
        handleSubmit,
        postReservationStates: {
            isPostReservationError,
            postReservationError,
        },
    };
};
