/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 * a promise that resolves to a possibly empty array
 * of reservation saved in the database.
 */
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

export const RESERVATIONS_LIST_QUERY_KEY = 'reservationsList';

const fetchReservations = async () => {
    try {
        return await fetchWithException(`${API_BASE_URL}/reservations`);
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves all existing reservation.
 */
export const useReservationsListQuery = () => {
    return useQuery({
        queryFn: fetchReservations,
        queryKey: [RESERVATIONS_LIST_QUERY_KEY],
    });
};
