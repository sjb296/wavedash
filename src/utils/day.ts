/**
 * Takes a day position and returns the day of the week as a three letter string.
 * 
 * @param dayPos The day as returned by Date.getDay()
 * @returns The day of the week as a three letter string
 */
const day = (dayPos: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[dayPos]
}

export default day