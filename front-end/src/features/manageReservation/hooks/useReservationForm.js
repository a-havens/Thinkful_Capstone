import { useReadReservationQuery } from '../api/useReadReservationQuery';
import { useCreateReservationMutation } from '../api/useCreateReservationMutation';
import { useEffect } from 'react';
import { useUpdateReservationMutation } from '../api/useUpdateReservationMutation';
import { useForm } from '../../../hooks/useForm';
import { convertFormattedDate, formatAsTime } from '../../../utils/date-time';
import { useLocation } from 'react-router-dom';
import { reservationForm } from '../../../constants/constants';

// The optional param of reservation_id will determine if handleSubmit is Put or Post
export const useReservationForm = ({ reservation_id }) => {
    const location = useLocation();

    const { state: locationState } = location;

    const { formState, setFormState } = useForm(reservationForm);

    const {
        data: reservation,
        isError: isReadReservationError,
        error: readReservationError,
    } = useReadReservationQuery({ reservation_id });

    const {
        mutate: createReservation,
        isError: isPostReservationError,
        error: postReservationError,
    } = useCreateReservationMutation();

    const {
        mutate: editReservation,
        isError: isEditReservationError,
        error: editReservationError,
    } = useUpdateReservationMutation();

    useEffect(() => {
        // If there is an existing reservation match the formState with it to pre-fill the inputs
        if (reservation !== undefined) {
            setFormState({
                // Set the reservation form to match the details contained in the reservation
                ...reservation.reservation,
                reservation_date: convertFormattedDate(
                    reservation.reservation.reservation_date
                ),
            });
        } else {
            setFormState({
                // If coming from a Link button then use default empty form from locationState
                // OR use default empty reservationForm
                ...(locationState?.form || reservationForm),
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
        const people = parseInt(formState.people, 10);

        // POST request (new reservation)
        if (!reservation_id) {
            createReservation({
                ...formState,
                people,
            });
        }

        // PUT request (edit reservation)
        if (reservation_id) {
            editReservation({
                form: {
                    ...formState,
                    reservation_time: formatAsTime(formState.reservation_time),
                    people,
                },
                reservation_id: reservation_id,
            });
        }
    };

    return {
        formState,
        setFormState,
        handleChange,
        handleSubmit,
        isError:
            isReadReservationError ||
            isPostReservationError ||
            isEditReservationError,
        readReservationError,
        postReservationError,
        editReservationError,
    };
};
