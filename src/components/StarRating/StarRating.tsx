import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"

const StarRating = ({ stars }: { stars: number }) => {
  const numFullStars = Math.floor(stars);
  const numHalfStars = stars % 1 >= 0.5 ? 1 : 0;
  const numEmptyStars = 5 - numFullStars - numHalfStars;

  return (
    <div className="carousel-element text-center">
      {/* {numFullStars},{numHalfStars},{numEmptyStars} */}
      <p className="text-sm text-bold text-main-text-color">Day</p>
      <div className="flex justify-center flex-wrap px-2 text-xl text-yellow-500">
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