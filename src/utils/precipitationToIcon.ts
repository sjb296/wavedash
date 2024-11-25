/**
 * Takes a precipitation probability and returns a corresponding icon.
 *
 * @param precipitationProbability The probability of precipitation as a percentage
 * @returns An icon representing the probability of precipitation
 */
const precipitationToIcon = (precipitationProbability: number) => {
    if (precipitationProbability >= 40) {
        return "🌧️"
    } else if (precipitationProbability >= 20) {
        return "🌦️"
    } else if (precipitationProbability >= 10) {
        return "🌥️"
    } else if (precipitationProbability >= 5) {
        return "🌤️"
    } else {
        return "☀️"
    }
};

export default precipitationToIcon