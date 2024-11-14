import { useState } from 'react'
import './App.css'
import Carousel from './components/Carousel/Carousel'
import Nav from './components/Nav/Nav'
import StarRating from './components/StarRating/StarRating'

type Location = {
  latitude: number
  longitude: number
} | null

const App = () => {
  const [location, setLocation] = useState<Location>(null);
  const [error, setError] = useState<string | null>(null);

  // Get weather info for the coming week here in App.
  const getLocation = () => {
    console.log("Get location")
    navigator.geolocation.getCurrentPosition(
      position => { setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }) },
      err => { setError(err.message) }
    )
  }

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
      <div className="card text-center">
        <button className="btn-secondary" onClick={getLocation}>Get location</button>
        {location && (
          <p>
            Lat: {location.latitude}, Lon: {location.longitude}
          </p>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </>
  )
}

export default App
