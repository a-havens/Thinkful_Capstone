import React from 'react';

export const Button = ({
    className = 'btn btn-dark mb-3',
    type = 'button',
    title,
    ...rest
}) => (
    <button className={className} type={type} {...rest}>
        {title}
    </button>
);
