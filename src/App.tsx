import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import { FaWind, FaTemperatureHalf } from 'react-icons/fa6'

function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <Nav />
      {/* Briefing text detailing what days are good for swimming or sailing */}
      <div className="card">
        <h1 className="text-2xl font-bold">Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}</h1>
        <p>
          This is the Wavedash app. Here is some sample text to be viewed on screens of varying sizes to test
          my use of Tailwind breakpoints.
        </p>
      </div>

      {/* Double small previews (temp icons here) */}
      <div className="double-card flex flex-row w-11/12 lg:w-1/2 gap-3">
        <div><FaTemperatureHalf className="h-24 text-blue-500" /></div>
        <div><FaWind className="h-24 text-blue-500" /></div>
      </div>

      {/* Main weather forecast section */}
      <div className="card">
        <p>
          Here are some buttons. Everybody loves buttons.
        </p>
        <div className="flex justify-center">
          <button onClick={() => setCount((count) => count + 1)}
            className="btn-primary">
            <code>count</code> is {count}
          </button>
          <button onClick={() => setCount(() => 1)}
            className="btn-secondary">
            Reset
          </button>
        </div>
        <p>Woo, buttons! Never gets old.</p>
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
