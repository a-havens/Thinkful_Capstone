import React from 'react';
import { useDeleteTableMutation } from '../api/useDeleteTableMutation';
import { Button } from '../../../components/Button/Button';

export const TableList = ({ tables }) => {
    const { mutate } = useDeleteTableMutation();

    const finishTable = (event, table_id) => {
        event.preventDefault();

        if (
            window.confirm(
                'Is this table ready to seat new guests? This cannot be undone.'
            )
        ) {
            const abortController = new AbortController();
            mutate(table_id);
        }
    };

    const displayTables = tables.data.map((table, index) => {
        if (table.status === 'occupied' || table.reservation_id) {
            return (
                <tr key={index}>
                    <td>{table.table_id}</td>
                    <td>{table.table_name}</td>
                    <td>{table.capacity}</td>
                    <td>{table.reservation_id}</td>
                    <td>
                        <p data-table-id-status={table.table_id}>Occupied</p>
                    </td>
                    <td>
                        <Button
                            title='Finish'
                            data-table-id-finish={table.table_id}
                            className='btn btn-outline-primary'
                            onClick={(event) =>
                                finishTable(event, table.table_id)
                            }
                        />
                    </td>
                </tr>
            );
        } else {
            return (
                <tr key={index}>
                    <td>{table.table_id}</td>
                    <td>{table.table_name}</td>
                    <td>{table.capacity}</td>
                    <td>{table.reservation_id}</td>
                    <td>
                        <p
                            className='col'
                            data-table-id-status={table.table_id}
                        >
                            Free
                        </p>
                    </td>
                    <td></td>
                </tr>
            );
        }
    });

    return (
        <table className='table table-striped table-bordered'>
            <thead className='thread-dark'>
                <tr>
                    <th>Table ID</th>
                    <th>Table Name</th>
                    <th>Capacity</th>
                    <th>Reservation ID</th>
                    <th>Occupied</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{displayTables}</tbody>
        </table>
    );
};
