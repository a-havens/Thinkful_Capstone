import { useMemo, useState } from 'react';
import { formatAsDate, previous, next, today } from '../../../utils/date-time';
import { useReservationsListQuery } from '../api/useReservationsListQuery';
import { useTablesQuery } from '../../manageTables/api/useTablesQuery';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { useLocation } from 'react-router-dom';

const filterReservationsByCurrentDate = (reservations, currentDate) => {
    // Convert reservation_date to 'YYYY-MM-DD' format on each object
    const formattedReservations = reservations.map((reservation) => ({
        ...reservation,
        reservation_date: formatAsDate(reservation.reservation_date),
    }));

    // Filter reservations based on the matching formatted reservation_date
    return formattedReservations.filter(
        (reservation) => reservation.reservation_date === currentDate
    );
};

export const useDashboard = () => {
    const location = useLocation();
    const { state: locationState } = location;
    const urlParams = useRouteParams();

    const urlDate =
        (locationState && locationState.reservation_date) ??
        urlParams.get('date');
    const [date, setDate] = useState(urlDate || today());
    const reservationsListQueryInfo = useReservationsListQuery();
    const tablesListQueryInfo = useTablesQuery();

    const handlePrevious = (event) => {
        event.preventDefault();
        setDate(previous(date));
    };

    const handleToday = (event) => {
        event.preventDefault();
        setDate(today());
    };

    const handleNext = (event) => {
        event.preventDefault();
        setDate(next(date));
    };

    const data = useMemo(() => {
        if (!reservationsListQueryInfo.data || !tablesListQueryInfo.data) {
            return null;
        }

        return {
            reservations: filterReservationsByCurrentDate(
                reservationsListQueryInfo.data.reservationList,
                date
            ),
            tables: tablesListQueryInfo.data,
            date,
        };
    }, [reservationsListQueryInfo.data, tablesListQueryInfo.data, date]);

    return {
        ...reservationsListQueryInfo,
        data,
        actions: {
            handlePrevious,
            handleToday,
            handleNext,
        },
    };
};
