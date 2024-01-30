import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { useHistory } from 'react-router-dom';
import { fetchWithException } from '../../../utils/handledFetch';

const postReservation = async (reservation) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: reservation }),
    };

    return await fetchWithException(`${API_BASE_URL}/reservations`, options);
};

// posts a new reservation to the database
export const useCreateReservationMutation = () => {
    const history = useHistory();

    return useMutation({
        mutationFn: (reservation) => postReservation(reservation),
        onSuccess: (_data, variables) =>
            history.push(`/dashboard?date=${variables.reservation_date}`),
    });
};
