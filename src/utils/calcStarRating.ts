/**
 * Calculates a star rating for a given day based on wind, rain chance and temperature.
 * This is fed to the `StarRating` component.
 * 
 * **Details of how exactly the ratings are decided are totally made up by myself
 * and subject to change at any time!**
 * @param sailing Whether the user is sailing or swimming (`true` = sailing)
 * @param windSpeed10mMax The maximum wind speed in knots
 * @param precipitationProbabilityMean The probability of precipitation as a percentage
 * @param temperature2mMax The maximum temperature in degrees Celsius
 * @param temperature2mMin The minimum temperature in degrees Celsius
 * @returns The star rating for the given day, out of 5
 */
const calcStarRating = (
    sailing: boolean,
    windSpeed10mMax: number,
    precipitationProbabilityMean: number,
    temperature2mMax: number,
    temperature2mMin: number
) => {
    let starRating = 0

    // Temperature
    const temperature2mMean = (temperature2mMax + temperature2mMin) / 2
    if (temperature2mMean > 20) {
        // Best
        starRating += 1.5
    } else if (temperature2mMean > 12 && temperature2mMean < 20) {
        starRating += 0.5
    } // Anything lower is a bit cold

    // Rain
    if (precipitationProbabilityMean < 10) {
        // Low chance of rain
        starRating += 2.0
    } else if (precipitationProbabilityMean > 10 && precipitationProbabilityMean < 25) {
        // Medium chance of rain
        starRating += 0.5
    }

    // Wind (kt)
    // This is programmed to my own taste
    if (sailing) {
        // Sailing
        if (windSpeed10mMax > 8 && windSpeed10mMax <= 12) {
            // Good wind for a chill time
            starRating += 1.0
        } else if (windSpeed10mMax > 7 && windSpeed10mMax <= 8) {
            // 7/8 knots is okay wind for a dinghy if on the low side
            starRating += 0.5
        } else if (windSpeed10mMax > 12 && windSpeed10mMax <= 16) {
            // Best wind
            starRating += 1.5
        } else if (windSpeed10mMax > 22 && windSpeed10mMax <= 25) {
            starRating -= 3.0
        } else if (windSpeed10mMax > 25) {
            // Probably going to tear the boat apart
            starRating -= 999.0
        }
    } else {
        // Swimming
        if (windSpeed10mMax < 5) {
            // Best wind
            starRating += 1.5
        } else if (windSpeed10mMax >= 5 && windSpeed10mMax < 8) {
            // Okay wind
            starRating += 0.5
        } else if (windSpeed10mMax >= 8 && windSpeed10mMax < 15) {
            starRating -= 0.5
        } else if (windSpeed10mMax >= 15 && windSpeed10mMax < 22) {
            starRating -= 1.5
        } else if (windSpeed10mMax > 20) {
            // Horrendous
            starRating -= 999.0
        }
    }

    // console.log("Wind speed: ", windSpeed10mMax)
    // console.log("Precipitation: ", precipitationProbabilityMean)
    // console.log("Temperature: ", temperature2mMean)
    // console.log(starRating)
    return starRating
}

export default calcStarRating