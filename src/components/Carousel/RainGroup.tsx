import precipitationToIcon from "../../utils/precipitationToIcon"

/**
 * Groups rain data into an icon and percentage.
 * Made to be used in a Carousel component for less janky scrolling than
 * having each component be in a separate carousel.
 * @param precipitationProbabilityMean The probability of precipitation as a percentage
 */
const RainGroup = (
  {
    precipitationProbabilityMean, weatherCode
  }: {
    precipitationProbabilityMean: number,
    weatherCode: number
  }) => {

  let warning = null
  let icon = null
  if (weatherCode === 5) {
    warning = "MIST"
    icon = "🌫️"
  } else if (weatherCode === 6) {
    warning = "FOG"
    icon = "🌫️"
  } else if (weatherCode === 19 || weatherCode === 20 || weatherCode === 21) {
    warning = "Hail"
    icon = "☔️"
  } else if (weatherCode === 22 || weatherCode === 23 || weatherCode === 24) {
    warning = "L.Snow"
    icon = "🌨️"
  } else if (weatherCode === 25 || weatherCode === 26 || weatherCode === 27) {
    warning = "H.Snow"
    icon = "❄️"
  } else if (weatherCode === 28 || weatherCode === 29 || weatherCode === 30) {
    icon = "🌩️"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">{icon || precipitationToIcon(precipitationProbabilityMean)}</div>
      <div className={"text-sm" + (warning ? " text-red-600 font-extrabold" : "")}>
        {warning || `${precipitationProbabilityMean.toFixed(1)}%`}
      </div>
    </div>
  )
}

export default RainGroup