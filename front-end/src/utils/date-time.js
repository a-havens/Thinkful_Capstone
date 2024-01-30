const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instances.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
export const asDateString = (date) => {
    return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
        .toString(10)
        .padStart(2, '0')}-${date.getDate().toString(10).padStart(2, '0')}`;
};

export const convertFormattedDate = (inputDate) => {
    const parsedDate = new Date(inputDate);

    // Get the year, month, and day from the parsed date
    const year = parsedDate.getUTCFullYear();
    const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');

    // Format the date to 'YYYY-MM-DD'
    return year + '-' + month + '-' + day;
};

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
export const formatAsDate = (dateString) => {
    return dateString.match(dateFormat)[0];
};

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param timeString
 *  HH:MM:SS time string
 * @returns {*}
 *  the specified time string formatted as YHH:MM.
 */
export const formatAsTime = (timeString) => {
    return timeString.match(timeFormat)[0];
};

/**
 * Today's date as YYYY-MM-DD.
 * @returns {string}
 *  the today's date formatted as YYYY-MM-DD
 */
export const today = () => {
    return asDateString(new Date());
};

/**
 * Subtracts one day from the specified date and returns it as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {string}
 *  the date one day prior to currentDate, formatted as YYYY-MM-DD
 */
export const previous = (currentDate) => {
    const [year, month, day] = currentDate.split('-');
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);
    return asDateString(date);
};

/**
 * Adds one day to the specified date and returns it as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {string}
 *  the date one day after currentDate, formatted as YYYY-MM-DD
 */
export const next = (currentDate) => {
    const [year, month, day] = currentDate.split('-');
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    return asDateString(date);
};
