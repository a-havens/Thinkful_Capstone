import { API_BASE_URL } from '../../../constants/constants';
import { useMutation } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import { fetchWithException } from '../../../utils/handledFetch';

const deleteTable = async (table_id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return await fetchWithException(
        `${API_BASE_URL}/tables/${table_id}/seat`,
        options
    );
};

export const useDeleteTableMutation = () => {
    const history = useHistory();

    return useMutation({
        mutationFn: (table_id) => deleteTable(table_id),
        onsuccess: () => {
            history.go(0);
        },
    });
};
