import { API_BASE_URL } from '../../../constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithException } from '../../../utils/handledFetch';
import { READ_RESERVATION_QUERY_KEY } from '../../manageReservation/api/useReadReservationQuery';
import { useHistory } from 'react-router-dom';

const assignReservationToTable = async ({ table_id, reservation_id }) => {
    if (!table_id) {
        // This should be detected by the BE or at the very least handled gracefully on the FE
        // Using the disabled prop on a button will break tests as they do not account for this
        // As a work-around we throw here early if a submit attempt is made without picking a
        // valid table from the dropdown select
        throw Error('Must select a table from the list.');
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: { reservation_id },
        }),
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

export const useUpdateTableMutation = () => {
    const history = useHistory();
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
            history.push('/dashboard');
        },
    });
};
