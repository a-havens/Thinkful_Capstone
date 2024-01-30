import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormInput } from '../../components/FormInput';
import { Button } from '../../../components/Button/Button';
import { useCreateTableMutation } from '../api/useCreateTableMutation';
import { useForm } from '../../../hooks/useForm';

export const TableForm = () => {
    const { formState, setFormState } = useForm({
        table_name: '',
        capacity: '',
    });

    const { mutate: postTable } = useCreateTableMutation();

    const history = useHistory();

    const handleChange = ({ target }) =>
        setFormState({
            ...formState,
            [target.name]: target.value,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        postTable({
            form: {
                ...formState,
                capacity: parseInt(formState.capacity, 10),
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label='Table Name'
                labelHtml='table_name'
                id='table_name'
                name='table_name'
                onChange={handleChange}
                required='required'
                value={formState.table_name}
            />

            <FormInput
                id='capacity'
                type='number'
                label='Table Capacity'
                labelHtml='capacity'
                name='capacity'
                onChange={handleChange}
                required
                value={formState.capacity}
            />

            <Button title='Submit' type='submit' />
            <Button title='Cancel' onClick={() => history.goBack()} />
        </form>
    );
};
