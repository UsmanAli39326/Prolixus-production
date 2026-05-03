/**
 * Strips HTML tags from a string and returns plain text
 * @param {string} html - HTML string to strip
 * @returns {string} - Plain text without HTML tags
 */
export const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Formats a date string or Date object into a standardized string.
 * @param {string|Date} date - The date to format.
 * @param {'date'|'time'|'datetime'|'year'|'long'} type - The format type.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date, type = 'date') => {
    if (!date) return "—";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "—";

    // Standardizing on German locale
    const locale = 'en-US';

    switch (type) {
        case 'date':
            return d.toLocaleDateString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }); // DD.MM.YYYY
        case 'time':
            return d.toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit'
            }); // HH:mm
        case 'datetime':
            return d.toLocaleString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }); // DD.MM.YYYY, HH:mm
        case 'year':
            return d.getFullYear().toString(); // YYYY
        case 'long':
            return d.toLocaleString(locale, {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }); // z.B. Donnerstag, 26. Oktober 2023, 10:30
        default:
            return d.toLocaleDateString(locale);
    }
};
