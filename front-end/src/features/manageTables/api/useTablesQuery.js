import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

export const TABLES_QUERY_KEY = 'tables';

/**
 * @param signal
 * the AbortController signal
 * @returns {Promise<any>}
 */
const fetchTables = async (signal) => {
    try {
        return await fetchWithException(`${API_BASE_URL}/tables`, { signal });
    } catch (error) {
        throw error;
    }
};

// gets a list of all existing tables in the database
export const useTablesQuery = () => {
    const controller = new AbortController();

    return useQuery({
        queryFn: () => fetchTables(controller.signal),
        queryKey: [TABLES_QUERY_KEY],
    });
};
