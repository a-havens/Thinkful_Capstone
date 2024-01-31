import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { useHistory } from 'react-router-dom';
import { fetchWithException } from '../../../utils/handledFetch';
import { TABLES_QUERY_KEY } from './useTablesQuery';

// posts a new table to the database
const postTable = async (table) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: table }),
    };

    try {
        return await fetchWithException(`${API_BASE_URL}/tables`, options);
    } catch (error) {
        throw error;
    }
};

export const useCreateTableMutation = () => {
    const queryClient = useQueryClient();
    const history = useHistory();

    return useMutation({
        mutationFn: (variables) => postTable(variables.form),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [TABLES_QUERY_KEY],
            });
            history.push(`/dashboard`);
        },
    });
};
