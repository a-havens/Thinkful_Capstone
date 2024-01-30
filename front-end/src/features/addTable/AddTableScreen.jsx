import React from 'react';
import { Section } from '../../components/Section/Section';
import { TableForm } from './components/TableForm';
// defines the New Reservation page
export const AddTableScreen = () => {
    console.log('rendering');

    return (
        <Section title='New Table'>
            <TableForm />
        </Section>
    );
};
