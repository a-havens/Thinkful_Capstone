import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

const RESERVATIONS_BY_MOBILE_NUMBER_QUERY_KEY = 'reservationsList';

/**
 * @param mobileNumber
 * the mobile number of the reservation to retrieve
 * @param signal
 * the AbortController signal
 * @returns {Promise<[reservation]>}
 * a promise that resolves to a possibly empty array
 * of reservation saved in the database.
 */
const fetchReservationsByMobileNumber = async ({ mobileNumber, signal }) => {
    try {
        return await fetchWithException(
            `${API_BASE_URL}/reservations?mobile_number=${mobileNumber}`,
            { signal }
        );
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves all existing reservation.
 */
export const useReservationsByMobileNumberQuery = ({ mobileNumber }) => {
    const controller = new AbortController();

    return useQuery({
        queryFn: () =>
            fetchReservationsByMobileNumber({
                mobileNumber,
                signal: controller.signal,
            }),
        queryKey: [RESERVATIONS_BY_MOBILE_NUMBER_QUERY_KEY, mobileNumber],
        enabled: mobileNumber !== undefined && mobileNumber !== '',
    });
};
