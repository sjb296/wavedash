import './App.css'
import Carousel from './components/Carousel/Carousel'
import Nav from './components/Nav/Nav'
import StarRating from './components/StarRating/StarRating'
// import { FaWind, FaTemperatureHalf } from 'react-icons/fa6'

const App = () => {
  return (
    <>
      <Nav />
      {/* At-a-glance day 5 star ratings for sailing and swimming */}
      <div className="card">
        <h1 className="text-xl font-bold">
          Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}.
        </h1>
        <p className="text-sm text-slate-400">Tap on a day to see more info below.</p>

        {/* Sample carousels */}
        <h2 className="text-lg font-bold">Sailing</h2>
        <Carousel items={[<StarRating stars={3.5} />, <StarRating stars={2.5} />, <StarRating stars={5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />,]} />

        <h2 className="text-lg font-bold">Swimming</h2>
        <Carousel items={[<StarRating stars={3.5} />, <StarRating stars={1} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />,]} />
      </div>

      {/* Double small previews (temp icons here) */}
      {/* <div className="double-card flex flex-row w-11/12 lg:w-1/2 gap-3">
        <div><FaTemperatureHalf className="h-24 text-blue-500" /></div>
        <div><FaWind className="h-24 text-blue-500" /></div>
      </div> */}

      {/* Main weather forecast section */}
      <div className="card">
        <img className="w-full" src="/images/sample-weather-design.png" alt="A sample weather forecast image." />
      </div>

      {/* Sample tide graph SVG
      <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "lightblue", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        <path d="M 0 200 Q 125 100 250 200 T 500 200 L 500 300 L 0 300 Z" fill="url(#blue-gradient)" />

        <path d="M 0 200 Q 125 100 250 200 T 500 200" stroke="cornflowerblue" stroke-width="3" fill="none" />

      </svg>
      */}
    </>
  )
}

export default App
