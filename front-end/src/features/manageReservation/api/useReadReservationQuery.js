import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

export const READ_RESERVATION_QUERY_KEY = 'readReservation';

/**
 * @param reservation_id
 * the reservation id
 * @param signal
 * the AbortController signal
 * @returns {Promise<any>}
 */
const fetchReservation = async (reservation_id, signal) => {
    try {
        return await fetchWithException(
            `${API_BASE_URL}/reservations/${reservation_id}`,
            { signal }
        );
    } catch (error) {
        throw error;
    }
};

export const useReadReservationQuery = ({ reservation_id }) => {
    const controller = new AbortController();

    return useQuery({
        queryFn: () => fetchReservation(reservation_id, controller.signal),
        queryKey: [READ_RESERVATION_QUERY_KEY, reservation_id],
        enabled: reservation_id !== undefined,
    });
};
