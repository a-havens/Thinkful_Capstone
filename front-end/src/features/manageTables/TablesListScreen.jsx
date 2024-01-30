import React from 'react';
import { useTablesQuery } from './api/useTablesQuery';
import { TableList } from './components/TableList';

export const TablesListScreen = () => {
    const { data: tables } = useTablesQuery();

    if (!tables) {
        return null;
    }

    return (
        <div>
            <TableList tables={tables} />
        </div>
    );
};
