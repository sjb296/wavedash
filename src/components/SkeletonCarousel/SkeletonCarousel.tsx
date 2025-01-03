import Carousel from "../Carousel/Carousel"

const SkeletonCarousel = ({ rows, cols, className }: { rows: number, cols: number, className?: string }) => {
  // Create an array of skeleton elements
  const skeletonItems = Array.from({ length: cols }).map(() => (
    <div className="flex flex-col gap-1">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-4 w-1/1 bg-gray-300 dark:bg-slate-800 rounded-md animate-pulse mx-2"
        />
      ))}
    </div>
  ))

  return (
    <Carousel
      items={skeletonItems}
      className={className}
    />
  )
}

export default SkeletonCarousel