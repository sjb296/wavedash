/**
 * Takes a bearing in degrees and returns the corresponding direction.
 *
 * @param bearing number in degrees
 * @returns string representing direction (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW)
 */
const bearingToDirection = (bearing: number): string => {
    const directions = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ]
    return directions[Math.round((bearing + 11.25) / 22.5) % 16]
}

export default bearingToDirection