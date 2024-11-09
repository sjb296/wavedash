import { ReactNode } from 'react';

const Carousel = ({ items }: { items: Array<ReactNode> }) => {

  return (
    <div className="relative flex items-center card-invis p-0 mx-0 scrollbar-hide">
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent pointer-events-none" />

      {/* Content container */}
      <div
        className="flex overflow-x-scroll scrollbar-hide w-full px-2"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none" />    </div>
  );
};

export default Carousel;
