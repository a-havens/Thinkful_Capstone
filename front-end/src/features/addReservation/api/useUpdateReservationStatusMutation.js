import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';
import { RESERVATIONS_LIST_QUERY_KEY } from '../../dashboard/api/useReservationsListQuery';

const updateStatus = async (reservation_id, status) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { reservation_id, status: status } }),
    };
    return await fetchWithException(
        `${API_BASE_URL}/reservations/${reservation_id}/status`,
        options
    );
};

export const useUpdateReservationStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables) =>
            updateStatus(variables.reservation_id, variables.status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RESERVATIONS_LIST_QUERY_KEY],
            });
        },
    });
};
