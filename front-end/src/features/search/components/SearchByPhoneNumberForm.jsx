import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { useForm } from '../../../hooks/useForm';
import { useSearchScreen } from '../hooks/useSearchScreen';
import { FormInput } from '../../components/FormInput';

// Search Form
export const SearchByPhoneNumberForm = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const { formState, setFormState } = useForm('');
    const { error, history } = useSearchScreen({ mobileNumber: formState });

    const onSubmit = (e) => {
        e.preventDefault();
        const formMobileNumber = new FormData(e.currentTarget).get(
            'mobile_number'
        );

        setFormState(formMobileNumber);
    };

    return (
        <form onSubmit={onSubmit}>
            <FormInput
                label='Mobile Number'
                labelHtml='mobile_number'
                name='mobile_number'
                id='mobile_number'
                placeholder="Enter a customer's phone number"
                onChange={({ target }) => setMobileNumber(target.value)}
                required
                value={mobileNumber}
                error={error}
            />

            <Button title='Find' type='submit' />
            <Button title='Cancel' onClick={() => history.goBack()} />
        </form>
    );
};
