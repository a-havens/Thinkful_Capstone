import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

const RESERVATIONS_BY_MOBILE_NUMBER_QUERY_KEY = 'reservationsList';

/**
 * the id of the reservation to retrieve
 * @param mobileNumber
 * the mobile number of the reservation to retrieve
 * @returns {Promise<[reservation]>}
 * a promise that resolves to a possibly empty array
 * of reservation saved in the database.
 */
const fetchReservationsByMobileNumber = async ({ mobileNumber }) => {
    try {
        return await fetchWithException(
            `${API_BASE_URL}/reservations?mobile_number=${mobileNumber}`
        );
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves all existing reservation.
 */
export const useReservationsByMobileNumberQuery = ({ mobileNumber }) => {
    return useQuery({
        queryFn: fetchReservationsByMobileNumber,
        queryKey: [RESERVATIONS_BY_MOBILE_NUMBER_QUERY_KEY, mobileNumber],
        enabled: mobileNumber !== undefined && mobileNumber !== '',
    });
};
