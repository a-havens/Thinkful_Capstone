import React from 'react';
import { Section } from '../../components/Section/Section';
import { SearchByPhoneNumberForm } from './components/SearchByPhoneNumberForm';

export const SearchScreen = () => (
    <Section title='Search By Phone Number'>
        <SearchByPhoneNumberForm />
    </Section>
);
