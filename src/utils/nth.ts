/**
 * Takes a number and returns the appropriate ordinal for that number.
 * For example, 1 -> 1st, 2 -> 2nd, 3 -> 3rd, etc.
 *
 * @param d A number to return the appropriate ordinal for
 * @returns A string representing the ordinal of the number
 */
const nth = (d: number) => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
        case 1: return d + "st"
        case 2: return d + "nd"
        case 3: return d + "rd"
        default: return d + "th"
    }
}

export default nth