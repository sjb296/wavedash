import { forwardRef } from "react";

interface CarouselProps {
  items: React.ReactNode[]
  className?: string
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void // Add onScroll to props
}

/**
 * Scrolling carousel element with optional horizontal scroll synchronisation via forwardRef.
 * 
 * Any group of `Carousel`s which are passed the same ref and the same onScroll event
 * will scroll horizontally at the same time.
 * 
 * For example:
 * ```
 * <Carousel
 *   ref={(el) => registerCarousel(el)}
 *   onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
 *   items={...}
 * />
 * ```
 * Any `Carousels` not passed `ref` and `onScroll` will scroll seperately.
 * 
 * @param items The items to be displayed in the carousel
 * @param className CSS class list
 * @param onScroll Optional onScroll event handler
 * @param ref Optional ref
 */
const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ items, className, onScroll }, ref) => {
    return (
      <div
        className={"relative flex items-center card-invis p-0 mx-0 scrollbar-hide w-full " + (className ? className : "")}>
        {/* Left gradient overlay */}
        <div style={{ zIndex: 6 }} /* z-index higher than stars (whose max is 5) */
          className="absolute left-0 top-0 bottom-0 w-6 dark:w-9 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none " />

        {/* Content container */}
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex overflow-x-scroll scrollbar-hide w-full px-2"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-none carousel-element h-auto overflow-hidden"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right gradient overlay */}
        <div style={{ zIndex: 6 }} /* z-index higher than stars (whose max is 5) */
          className="absolute right-0 top-0 bottom-0 w-6 dark:w-9 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
      </div>
    )
  }
)

export default Carousel;
