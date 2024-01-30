import { Input } from '../../components/Input/Input';
import React from 'react';

export const FormInput = ({ labelHtml, label, required = false, ...rest }) => (
    <div className='form-group'>
        <label htmlFor={labelHtml}>{label}</label>
        <Input required={required} {...rest} />
    </div>
);
