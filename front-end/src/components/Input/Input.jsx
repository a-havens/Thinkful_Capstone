export const Input = ({
    className = 'form-control',
    type = 'text',
    error,
    ...rest
}) => (
    <div className='input-group'>
        <input className={className} type={type} {...rest} />

        {error && (
            <div className='alert alert-danger m-2'>Error: {error.message}</div>
        )}
    </div>
);
