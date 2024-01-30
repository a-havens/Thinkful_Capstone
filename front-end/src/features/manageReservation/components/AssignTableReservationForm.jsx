import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormSelect } from '../../components/FormSelect';
import { useUpdateTableMutation } from '../../addTable/api/useUpdateTableMutation';
import { useForm } from '../../../hooks/useForm';
import { Button } from '../../../components/Button/Button';
import { useTablesQuery } from '../../addTable/api/useTablesQuery';

export const AssignTableReservationForm = () => {
    const { reservation_id } = useParams();

    const { data: tables } = useTablesQuery();

    const { mutate: seatTable } = useUpdateTableMutation();

    const { formState, setFormState } = useForm('');

    const history = useHistory();

    const handleChange = ({ target }) => setFormState(target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        seatTable({
            table_id: formState,
            reservation_id,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormSelect
                id='table_id'
                data={tables}
                labelHtml='table_id'
                label='Table Number'
                className='form-control'
                name='table_id'
                onChange={handleChange}
                value={formState.table_id}
            />
            <Button title='Submit' type='submit' />
            <Button title='Cancel' onClick={() => history.goBack()} />
        </form>
    );
};
