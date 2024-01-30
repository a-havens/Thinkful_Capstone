import React from 'react';

export const FormSelect = ({ labelHtml, label, data, ...rest }) => {
    return (
        <div className='form-group'>
            <label htmlFor={labelHtml}>{label}</label>

            <select {...rest}>
                <option value=''>-- Select a Table --</option>

                {data.map((table) => (
                    <option key={table.table_id} value={table.table_id}>
                        {table.table_name} - {table.capacity}
                    </option>
                ))}
            </select>
        </div>
    );
};
