import React from 'react';
import { Section } from '../../components/Section/Section';
import { SearchByPhoneNumberForm } from './components/SearchByPhoneNumberForm';
import { ReservationsList } from '../addReservation/components/ReservationsList';
import { useSearchScreen } from './hooks/useSearchScreen';

export const SearchScreen = () => {
    const { data } = useSearchScreen({ mobileNumber: '' });

    return (
        <Section title='Search By Phone Number'>
            <SearchByPhoneNumberForm />

            {data !== null && data.reservation && (
                <ReservationsList reservations={data.reservation} />
            )}
        </Section>
    );
};

// {data.reservation[0] === 'No reservations found' ? (
//                 <h4>{data.reservation[0]}</h4>
//             ) : (
//                 <ReservationsList reservations={data.reservation} />
//             )}
