import day from "../../utils/day"
import month from "../../utils/month"
import nth from "../../utils/nth"

/**
 * Groups a date into its day of the week, month, and day of the month.
 * Made to be used in a Carousel component for less janky scrolling than
 * having each component be in a separate carousel.
 * @param date The date value the month, day and date are extracted from
 */
const DateGroup = ({ date }: { date: Date }) => {
  return (
    <div className="flex flex-col">
      <div className="text-sm text-slate-400 -mb-1.5">{month(date.getMonth())}</div>
      <div className="text-lg font-medium -mb-1.5">{day(date.getDay())}</div>
      <div>{nth(date.getDate())}</div>
    </div>
  )
}

export default DateGroup