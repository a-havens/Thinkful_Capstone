import { useState } from 'react';

export const useForm = (initialFormState) => {
    const [formState, setFormState] = useState(initialFormState);

    const onSubmit = (e) => {
        e.preventDefault();

        // TODO: figure out if this is needed?
        const abortController = new AbortController();
    };

    return {
        formState,
        setFormState,
    };
};
