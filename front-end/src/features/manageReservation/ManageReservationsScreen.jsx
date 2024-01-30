import React from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../../components/Section/Section';
import { ReservationForm } from './components/ReservationsForm';

export const ManageReservationsScreen = ({ title, isEditing }) => {
    const { reservation_id } = useParams();

    return (
        <Section title={title}>
            <ReservationForm
                reservation_id={isEditing ? reservation_id : undefined}
            />
        </Section>
    );
};
