export const fetchWithException = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json();

        if (errorData) {
            throw new Error(errorData.error);
        } else {
            const error = new Error(`HTTP error! Status: ${response.status}`);
            error.response = response;
            throw error;
        }
    }

    return response.json();
};
