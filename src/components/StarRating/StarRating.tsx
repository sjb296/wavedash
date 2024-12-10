import { FaStar, FaStarHalf } from "react-icons/fa6"

import day from "../../utils/day";

/**
 * A component that renders a star rating for a given day. Star ratings are not
 * calculated from data here, but in `utils/calcStarRating.ts`.
 * @param stars The number of stars to display
 * @param dayOfWeek The day of the week to display the star rating for
 */
const StarRating = ({ stars, dayOfWeek }: { stars: number, dayOfWeek?: number }) => {
  if (stars < 0) {
    stars = 0
  }
  const numFullStars = Math.floor(stars);
  const numHalfStars = stars % 1 >= 0.5 ? 1 : 0;
  const numEmptyStars = 5 - numFullStars - numHalfStars;

  return (
    <div className="text-center py-1">
      {
        dayOfWeek !== undefined
          ? <p className="text-sm lg:text-lg font-medium text-main-text-color">{day(dayOfWeek)}</p>
          : <></>
      }
      <div className="flex justify-center flex-wrap px-2 text-md lg:text-2xl text-yellow-500">
        {/* Full stars */}
        {[...Array(numFullStars)].map((_, i) => (
          <div key={i} className="-mx-1 relative">
            <FaStar className="drop-shadow-md" />
          </div>
        ))}
        {/* Half star */}
        {[...Array(numHalfStars)].map((_, i) => (
          <div
            key={`half-${i}`}
            className="relative -mx-1 w-[1em] h-[1em] inline-block text-yellow-500"
          >
            {/* Background grey star */}
            <FaStar className="absolute inset-0 text-slate-300 drop-shadow-md" />
            {/* Overlay half star */}
            <FaStarHalf className="absolute inset-0" />
          </div>
        ))}
        {/* Empty stars */}
        {[...Array(numEmptyStars)].map((_, i) => (
          <div key={i} className="-mx-1 text-slate-300 drop-shadow-md">
            <FaStar />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StarRating