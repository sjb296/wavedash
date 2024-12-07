import precipitationToIcon from "../../utils/precipitationToIcon"

/**
 * Groups rain data into an icon and percentage.
 * Made to be used in a Carousel component for less janky scrolling than
 * having each component be in a separate carousel.
 * @param precipitationProbabilityMean The probability of precipitation as a percentage
 */
const RainGroup = ({ precipitationProbabilityMean }: { precipitationProbabilityMean: number }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">{precipitationToIcon(precipitationProbabilityMean)}</div>
      <div className="text-sm">{precipitationProbabilityMean.toFixed(1)}%</div>
    </div>
  )
}

export default RainGroup