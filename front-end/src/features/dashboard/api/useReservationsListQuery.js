import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

export const RESERVATIONS_LIST_QUERY_KEY = 'reservationsList';

/**
 * @param signal
 * the AbortController signal
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 * a promise that resolves to a possibly empty array
 * of reservation saved in the database.
 */
const fetchReservations = async (signal) => {
    try {
        return await fetchWithException(`${API_BASE_URL}/reservations`, {
            signal,
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves all existing reservation.
 */
export const useReservationsListQuery = () => {
    const controller = new AbortController();

    return useQuery({
        queryFn: () => fetchReservations(controller.signal),
        queryKey: [RESERVATIONS_LIST_QUERY_KEY],
    });
};
