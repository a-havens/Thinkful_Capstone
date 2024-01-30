import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

export const READ_RESERVATION_QUERY_KEY = 'readReservation';

const fetchReservation = async (reservation_id) => {
    return await fetchWithException(
        `${API_BASE_URL}/reservations/${reservation_id}`
    );
};

export const useReadReservationQuery = ({ reservation_id }) => {
    return useQuery({
        queryFn: () => fetchReservation(reservation_id),
        queryKey: [READ_RESERVATION_QUERY_KEY, reservation_id],
        enabled: reservation_id !== undefined,
    });
};
