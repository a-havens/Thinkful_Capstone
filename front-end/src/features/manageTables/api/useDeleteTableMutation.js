import { API_BASE_URL } from '../../../constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithException } from '../../../utils/handledFetch';
import { TABLES_QUERY_KEY } from './useTablesQuery';
import { RESERVATIONS_LIST_QUERY_KEY } from '../../dashboard/api/useReservationsListQuery';

const deleteTable = async (table_id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        return await fetchWithException(
            `${API_BASE_URL}/tables/${table_id}/seat`,
            options
        );
    } catch (error) {
        throw error;
    }
};

export const useDeleteTableMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (table_id) => deleteTable(table_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TABLES_QUERY_KEY] });
            queryClient.invalidateQueries({
                queryKey: [RESERVATIONS_LIST_QUERY_KEY],
            });
        },
    });
};
