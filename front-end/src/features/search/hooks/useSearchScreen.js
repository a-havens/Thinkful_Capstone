import { useMemo } from 'react';
import { useReservationsByMobileNumberQuery } from '../api/useReservationsByMobileNumberQuery';
import { useHistory } from 'react-router-dom';

export const useSearchScreen = ({ mobileNumber }) => {
    const reservationsByMobileNumberQueryInfo =
        useReservationsByMobileNumberQuery({ mobileNumber });

    const history = useHistory();

    const data = useMemo(() => {
        if (!reservationsByMobileNumberQueryInfo.data) {
            return null;
        }

        return {
            reservation: reservationsByMobileNumberQueryInfo.data,
        };
    }, [reservationsByMobileNumberQueryInfo.data]);

    return {
        ...reservationsByMobileNumberQueryInfo,
        data,
        history,
    };
};
