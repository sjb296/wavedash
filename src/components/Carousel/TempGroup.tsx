/**
 * Groups temperature data into a max and min.
 * Made to be used in a Carousel component for less janky scrolling than
 * having each component be in a separate carousel.
 * @param max The maximum temperature
 * @param min The minimum temperature
 */
const TempGroup = ({ max, min }: { max: number, min: number }) => {
  return (
    <div className="flex flex-col items-center">
      <div>{max.toFixed(1) + "°"}</div>
      <div className="text-sm text-slate-400">{min.toFixed(1) + "°"}</div>
    </div>
  )
}

export default TempGroup