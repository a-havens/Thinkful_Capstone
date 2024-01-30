import { API_BASE_URL } from '../../../constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithException } from '../../../utils/handledFetch';
import { READ_RESERVATION_QUERY_KEY } from '../../addReservation/api/useReadReservationQuery';

const assignReservationToTable = async ({ table_id, reservation_id }) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: { table_id, reservation_id },
        }),
    };
    return await fetchWithException(
        `${API_BASE_URL}/tables/${table_id}/seat`,
        options
    );
};

export const useUpdateTableMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables) =>
            assignReservationToTable({
                table_id: variables.table_id,
                reservation_id: variables.reservation_id,
            }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    READ_RESERVATION_QUERY_KEY,
                    variables.reservation_id,
                ],
            });
        },
    });
};
