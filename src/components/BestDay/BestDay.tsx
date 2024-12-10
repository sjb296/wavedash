import Forecast from "../../types/Forecast"
import argmax from "../../utils/argmax"
import DateGroup from "../Carousel/DateGroup"
import StarRating from "../StarRating/StarRating"

const BestDay = ({ forecast, sailing }: { forecast: Forecast | null, sailing: boolean }) => {
  if (sailing) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-md font-semibold text-start">Best for sailing</h1>
        <div className="flex flex-row justify-center items-center gap-3">

          { // Render a skeleton if the forecast is not available
            forecast !== undefined ?
              <>
                <DateGroup date={forecast?.daily.time[argmax(forecast?.daily.sailingRatings)] as Date} />
                <StarRating stars={Math.max(...forecast?.daily.sailingRatings as number[])} />
              </> :
              <>
                {/* Skeletons */}
                {/* Date group */}
                <div className="flex flex-col gap-1">
                  <div
                    className="h-4 w-12 bg-gray-300 rounded-md animate-pulse mx-2"
                  />
                  <div
                    className="h-4 w-12 bg-gray-300 rounded-md animate-pulse mx-2"
                  />
                  <div
                    className="h-4 w-12 bg-gray-300 rounded-md animate-pulse mx-2"
                  />
                </div>
                {/* Star rating */}
                <div
                  className="h-4 w-14 bg-gray-300 rounded-md animate-pulse mx-2"
                />
              </>
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-md font-semibold text-start">Best for a swim</h1>
        <div className="flex flex-row justify-center items-center gap-3">
          <DateGroup date={forecast?.daily.time[argmax(forecast?.daily.swimmingRatings)] as Date} />
          <StarRating stars={Math.max(...forecast?.daily.swimmingRatings as number[])} />
        </div>
      </div>
    )
  }
}

export default BestDay