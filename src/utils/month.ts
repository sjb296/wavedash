/**
 * Returns the month name for a given month number as a three letter string.
 * 
 * @param month The month number (0-11)
 * @returns The month name as a three letter string
 */
const month = (month: number) => {
    return [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][month]
}

export default month