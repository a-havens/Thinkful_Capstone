import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { useHistory } from 'react-router-dom';
import { fetchWithException } from '../../../utils/handledFetch';

const putReservation = async (reservation) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: reservation }),
    };

    return await fetchWithException(
        `${API_BASE_URL}/reservations/${reservation.reservation_id}`,
        options
    );
};

export const useUpdateReservationMutation = ({ reservation_date }) => {
    const history = useHistory();

    return useMutation({
        mutationFn: (reservation) => putReservation(reservation),
        onSuccess: (data) =>
            history.push(`/dashboard?date=${reservation_date}`),
    });
};
