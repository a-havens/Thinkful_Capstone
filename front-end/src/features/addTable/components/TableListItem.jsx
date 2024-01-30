import React from 'react';
import { ErrorState } from '../../../components/Error/ErrorState';

export const TableListItem = ({
    table,
    table_name,
    capacity,
    status,
    error,
    onClick,
}) => (
    <div className='card mb-3'>
        {error && <ErrorState error={error} />}
        <h5 className='card-header'>Table {table_name}</h5>
        <div className='card-body'>
            <p>Capacity: {capacity}</p>
            <p data-table-id-status={table.table_id}>Status: {status}</p>
            {status === 'Free' ? null : (
                <button
                    data-table-id-finish={table.table_id}
                    className='btn btn-dark'
                    type='button'
                    onClick={onClick}
                >
                    Finish
                </button>
            )}
        </div>
    </div>
);
