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
  let warning = ""
  if (weatherCode === 5) {
    warning = "MIST"
  } else if (weatherCode === 6) {
    warning = "FOG"
  }
  return (
    <div className="flex flex-col items-center">
      {
        warning // Mist or fog
          ? <><div className="text-2xl">⚠️</div>
            <div className="text-sm text-red-500 font-extrabold">{warning}</div></>
          : <><div className="text-2xl">{precipitationToIcon(precipitationProbabilityMean)}</div>
            <div className="text-sm">{precipitationProbabilityMean.toFixed(1)}%</div></>
      }
    </div>
  )
}

export default RainGroup