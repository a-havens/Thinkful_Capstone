import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { useHistory } from 'react-router-dom';
import { fetchWithException } from '../../../utils/handledFetch';
import { RESERVATIONS_LIST_QUERY_KEY } from '../../dashboard/api/useReservationsListQuery';

const putReservation = async ({ reservation, reservation_id }) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: reservation }),
    };

    return await fetchWithException(
        `${API_BASE_URL}/reservations/${reservation_id}`,
        options
    );
};

export const useUpdateReservationMutation = () => {
    const queryClient = useQueryClient();
    const history = useHistory();

    return useMutation({
        mutationFn: (variables) =>
            putReservation({
                reservation: variables.form,
                reservation_id: variables.reservation_id,
            }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [RESERVATIONS_LIST_QUERY_KEY],
            });
            history.push(`/dashboard?date=${variables.form.reservation_date}`);
        },
    });
};
