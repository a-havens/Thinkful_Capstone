import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../constants/constants';
import { fetchWithException } from '../../../utils/handledFetch';

const TABLES_QUERY_KEY = 'tables';

const fetchTables = async () => {
    try {
        return await fetchWithException(`${API_BASE_URL}/tables`);
    } catch (error) {
        throw error;
    }
};

// gets a list of all existing tables in the database
export const useTablesQuery = () => {
    return useQuery({ queryFn: fetchTables, queryKey: [TABLES_QUERY_KEY] });
};
