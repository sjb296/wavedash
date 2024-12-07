import bearingToDirection from "../../utils/bearingToDirection"
import BearingArrow from "../BearingArrow/BearingArrow"

/**
 * Groups wind data into an arrow, direction, and speed.
 * Made to be used in a Carousel component for less janky scrolling than
 * having each component be in a separate carousel.
 * @param bearing The direction in degrees
 * @param maxSpeed The maximum wind speed
 * @param gusts The maximum wind gusts
 */
const WindGroup = ({ bearing, maxSpeed, gusts }: { bearing: number, maxSpeed: number, gusts: number }) => {
  return (
    <div className="flex flex-col items-center">
      <BearingArrow bearing={bearing} arrowSize={30} />
      <div>{bearingToDirection(bearing)}</div>
      <div>{maxSpeed.toFixed(1)}</div>
      <div className="text-sm text-slate-400">{gusts.toFixed(1)}</div>
    </div>
  )
}

export default WindGroup