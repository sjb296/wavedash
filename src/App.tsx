import { useCallback, useEffect, useRef, useState } from "react"
import { fetchWeatherApi } from "openmeteo"
import "./App.css"
import Carousel from "./components/Carousel/Carousel"
import Nav from "./components/Nav/Nav"
import StarRating from "./components/StarRating/StarRating"
import bearingToDirection from "./utils/bearingToDirection"
import BearingArrow from "./components/BearingArrow/BearingArrow"
import precipitationToIcon from "./utils/precipitationToIcon"
import nth from "./utils/nth"
import day from "./utils/day"
import month from "./utils/month"

type Location = {
  latitude: number
  longitude: number
} | null

type Forecast = {
  daily: {
    time: Date[]
    weatherCode: Float32Array
    temperature2mMax: Float32Array
    temperature2mMin: Float32Array
    precipitationProbabilityMean: Float32Array
    windSpeed10mMax: Float32Array
    windGusts10mMax: Float32Array
    windDirection10mDominant: Float32Array
  }
} | null

const App = () => {
  // States
  const [location, setLocation] = useState<Location>(null)
  const [error, setError] = useState<string | null>(null)
  const [forecast, setForecast] = useState<Forecast>(null)

  // Refs
  const carouselsRef = useRef<HTMLDivElement[]>([])

  /**
   * Register a carousel element to the carouselsRef reference. This will
   * be called during the declaration of <Carousel>s, for example
   * ```
   * <Carousel
   *   ref={(el) => registerCarousel(el)}
   *   onScroll={(e) => handleCarouselScroll(e.target)}
   *   items={...}
   * />
   * ```
   * 
   */
  const registerCarousel = useCallback((el: HTMLDivElement | null) => {
    if (el && !carouselsRef.current.includes(el)) {
      carouselsRef.current.push(el)
    }
  }, [])

  const handleCarouselScroll = (scrollingElement: HTMLDivElement) => {
    const scrollLeft = scrollingElement.scrollLeft

    // Synchronize scroll positions
    carouselsRef.current.forEach((carousel) => {
      if (carousel !== scrollingElement) {
        carousel.scrollLeft = scrollLeft
      }
    })
  }

  /**
   * Gets the user's location using the browser's geolocation API.
   */
  const getLocation = () => {
    console.log("Get location")
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => { setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }) },
      (err: GeolocationPositionError) => { setError(err.message) }
    )
  }

  /**
   * Gets the weather forecast for the coming week from Open Meteo. This is
   * a useCallback function that runs when the user's location has been
   * successfully retrieved.
   * 
   * Partially generated by https://open-meteo.com/en/docs
   */
  const getForecast = useCallback(async () => {
    if (location) {
      const params = {
        "latitude": location.latitude,
        "longitude": location.longitude,
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_mean", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"],
        "wind_speed_unit": "kn",
        "timezone": "auto",
        "forecast_days": 14,
      }
      const url = "https://api.open-meteo.com/v1/forecast"
      // const url = "https://api.open-meteo.com/v1/forecasnldkalksdhdalsst" // malformed
      const responses = await fetchWeatherApi(url, params)

      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      // const timezone = response.timezone();
      // const timezoneAbbreviation = response.timezoneAbbreviation();
      // const responseLatitude = response.latitude();
      // const responseLongitude = response.longitude();

      const daily = response.daily()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          weatherCode: daily.variables(0)!.valuesArray()!,
          temperature2mMax: daily.variables(1)!.valuesArray()!,
          temperature2mMin: daily.variables(2)!.valuesArray()!,
          precipitationProbabilityMean: daily.variables(3)!.valuesArray()!,
          windSpeed10mMax: daily.variables(4)!.valuesArray()!,
          windGusts10mMax: daily.variables(5)!.valuesArray()!,
          windDirection10mDominant: daily.variables(6)!.valuesArray()!,
        },
      };

      // `weatherData` now contains a simple structure with arrays for datetime and weather data
      for (let i = 0; i < weatherData.daily.time.length; i++) {
        console.log(
          weatherData.daily.time[i].toISOString(),
          weatherData.daily.weatherCode[i],
          weatherData.daily.temperature2mMax[i],
          weatherData.daily.temperature2mMin[i],
          weatherData.daily.precipitationProbabilityMean[i],
          weatherData.daily.windSpeed10mMax[i],
          weatherData.daily.windGusts10mMax[i],
          weatherData.daily.windDirection10mDominant[i]
        );
      }

      console.log("Weather data: ", weatherData)
      setForecast(weatherData)
    } else {
      console.error("No location found!")
      setError("Failed to fetch forecast data: No location found!")
    }
  }, [location])

  // Get forecast when location changes
  useEffect(() => {
    if (location) {
      getForecast()
    }
  }, [location, getForecast])

  // Get forecast on first load
  useEffect(() => {
    getLocation()
  }, [])

  return (
    <>
      <Nav />
      {/* At-a-glance day 5 star ratings for sailing and swimming */}
      <div className="card">
        <h1 className="text-xl font-bold">
          Good {new Date().getHours() < 12 ? "morning" : "afternoon"}.
        </h1>
        <p className="text-sm text-slate-400">Here's an overview of the week's weather.</p>

        {/* Sample carousels */}
        <h2 className="text-lg font-medium -mb-2">Sailing</h2>
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={[<StarRating stars={3.5} />, <StarRating stars={2.5} />, <StarRating stars={5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={2.5} />, <StarRating stars={5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />,]}
        />

        <h2 className="text-lg font-medium -mb-2">Swimming</h2>
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={[<StarRating stars={3.5} />, <StarRating stars={1} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={2.5} />, <StarRating stars={5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />, <StarRating stars={3.5} />,]}
        />
      </div>

      {/* Double small previews (temp icons here) */}
      {/* <div className="double-card flex flex-row w-11/12 lg:w-1/2 gap-3">
        <div><FaTemperatureHalf className="h-24 text-blue-500" /></div>
        <div><FaWind className="h-24 text-blue-500" /></div>
      </div> */}

      {/* Main weather forecast section */}
      <div className="card text-center">
        {/* <button className="btn-secondary" onClick={getLocation}>Get location</button> */}

        <h1 className="text-xl font-bold text-start">
          Daily forecast
        </h1>

        <hr className="mt-2" />

        {/* 
          *
          * DATES 
          *
          */}
        {/* Months */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          className="text-lg -mb-3"
          items={
            forecast != undefined ? Array.from(forecast?.daily.time).map(item => <div className="text-sm text-slate-400">{month(item.getMonth())}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Days of the week */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          className="text-lg -mb-3"
          items={
            forecast != undefined ? Array.from(forecast?.daily.time).map(item => <div className="font-medium">{day(item.getDay())}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Dates */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.time).map(item => <div>{nth(item.getDate())}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* 
          *
          * TEMPERATURES 
          *
          */}
        <p className="text-start text-sm text-slate-400 font-bold">Temperature</p>
        {/* Max temperature */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.temperature2mMax).map(item => <div>{item.toFixed(1) + "°"}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Min temperature */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.temperature2mMin).map(item => <div className="text-sm text-slate-400">{item.toFixed(1) + "°"}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* 
          *
          * RAIN 
          *
          */}
        <p className="text-start text-sm text-slate-400 font-bold">Precipitation</p>
        {/* Sun/cloud/rain icon */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.precipitationProbabilityMean).map(item => <div className="text-2xl">{precipitationToIcon(item)}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Rain probability */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.precipitationProbabilityMean).map(item => <div className="text-sm">{item.toFixed(1)}%</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* 
          *
          * WIND 
          *
          */}
        <p className="text-start text-sm text-slate-400 font-bold">Wind</p>
        {/* Wind direction arrow */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          className="-mb-4"
          items={
            forecast != undefined ? Array.from(forecast?.daily.windDirection10mDominant).map(item => <BearingArrow bearing={item} size={30} />) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Wind direction string */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.windDirection10mDominant).map(item => <div>{bearingToDirection(item)}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Wind max */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.windSpeed10mMax).map(item => <div>{item.toFixed(1)}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* Wind gusts */}
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.windGusts10mMax).map(item => <div className="text-sm text-slate-400">{item.toFixed(1)}</div>) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* {
          forecast
          && (
            <p className="overflow-scroll">
              Forecast response: {JSON.stringify(forecast)}
            </p>
          )
          || (
            <div className="animate-pulse my-2">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
            </div>
          )
        } */}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </>
  )
}

export default App
