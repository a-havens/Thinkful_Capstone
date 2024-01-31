import React from 'react';
import { useTablesQuery } from './api/useTablesQuery';
import { TableList } from './components/TableList';
import { Section } from '../../components/Section/Section';

export const TablesListScreen = () => {
    const { data: tables } = useTablesQuery();

    if (!tables) {
        return null;
    }

    return (
        <Section>
            <TableList tables={tables} />
        </Section>
    );
};
