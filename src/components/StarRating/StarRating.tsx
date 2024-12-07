import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"
import day from "../../utils/day";

const StarRating = ({ stars, dayOfWeek }: { stars: number, dayOfWeek: number }) => {
  const numFullStars = Math.floor(stars);
  const numHalfStars = stars % 1 >= 0.5 ? 1 : 0;
  const numEmptyStars = 5 - numFullStars - numHalfStars;

  return (
    <div className="text-center py-1">
      {/* {numFullStars},{numHalfStars},{numEmptyStars} */}
      <p className="text-sm lg:text-lg font-medium text-main-text-color">{day(dayOfWeek)}</p>
      <div className="flex justify-center flex-wrap px-2 text-md lg:text-2xl text-yellow-500">
        {[...Array(numFullStars)].map((_, i) => (
          <div key={i} className="-mx-1"><FaStar /></div>
        ))}
        {[...Array(numHalfStars)].map((_, i) => (
          <div key={i} className="-mx-1"><FaStarHalfStroke /></div>
        ))}
        {[...Array(numEmptyStars)].map((_, i) => (
          <div key={i} className="-mx-1"><FaRegStar /></div>
        ))}
      </div>
    </div>
  )
}

export default StarRating