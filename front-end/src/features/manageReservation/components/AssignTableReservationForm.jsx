import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FormSelect } from '../../components/FormSelect';
import { useUpdateTableMutation } from '../../manageTables/api/useUpdateTableMutation';
import { useForm } from '../../../hooks/useForm';
import { Button } from '../../../components/Button/Button';
import { useTablesQuery } from '../../manageTables/api/useTablesQuery';
import { ErrorState } from '../../../components/Error/ErrorState';

export const AssignTableReservationForm = () => {
    const { reservation_id } = useParams();

    const location = useLocation();

    const { state: locationState } = location;

    const {
        data: tables,
        isError: isTablesQueryError,
        error: tablesQueryError,
    } = useTablesQuery();

    const {
        mutate: seatTable,
        isError: isUpdateTableMutationError,
        error: updateTableMutationError,
    } = useUpdateTableMutation();

    const { formState: tableId, setFormState } = useForm('');

    const history = useHistory();

    const handleChange = (e) => setFormState(e.target.value);

    if (!tables) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (tableId === '') {
            seatTable({
                table_id: tables.data[0].table_id,
                reservation_id: reservation_id,
            });
        } else {
            seatTable({
                table_id: tableId,
                reservation_id: reservation_id,
            });
        }
    };

    return (
        <>
            {(isTablesQueryError || isUpdateTableMutationError) && (
                <ErrorState
                    error={tablesQueryError || updateTableMutationError}
                />
            )}
            <form onSubmit={handleSubmit}>
                <FormSelect
                    id='table_id'
                    data={tables}
                    labelHtml='table_id'
                    label='Table Number'
                    className='form-control'
                    name='table_id'
                    onChange={handleChange}
                    value={tableId}
                />
                <Button title='Submit' type='submit' />
                <Button
                    title='Cancel'
                    onClick={() =>
                        history.push({
                            pathname: '/dashboard',
                            state: locationState,
                        })
                    }
                />
            </form>
        </>
    );
};
