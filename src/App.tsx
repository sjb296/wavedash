import { useCallback, useEffect, useRef, useState } from "react"
import { fetchWeatherApi } from "openmeteo"
import "./App.css"
import Carousel from "./components/Carousel/Carousel"
import Nav from "./components/Nav/Nav"
import StarRating from "./components/StarRating/StarRating"
import DateGroup from "./components/Carousel/DateGroup"
import TempGroup from "./components/Carousel/TempGroup"
import RainGroup from "./components/Carousel/RainGroup"
import WindGroup from "./components/Carousel/WindGroup"
import zip from "./utils/zip"
import indicesArray from "./utils/indicesArray"
import calcStarRating from "./utils/calcStarRating"
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"

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

  // Values
  const forecastDays = 14;

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

  /**
   * Handles the scrolling of carousels. This is used to synchronize the scroll positions of carousels.
   * @param scrollingElement The element that is being scrolled
   */
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
        "forecast_days": forecastDays,
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
      {/* hide content until the data comes through or an error occurs */}
      {
        forecast || error
          ? <></>
          : <LoadingScreen />
      }

      <Nav />

      {/* "This app is designed for phones" message */}
      <div className="card hidden md:block">
        <p className="text-md text-pink-700">
          <b>Notice:</b> This app is designed for mobile devices, and will function on larger screens,
          but look best on smaller ones. Try it on your phone!
        </p>
      </div>

      {/* 
        *
        * RATINGS
        *
        */}
      <div className="card">
        <h1 className="text-xl font-bold">
          Good {new Date().getHours() < 12 ? "morning" : "afternoon"}.
        </h1>
        <p className="text-sm text-slate-400">Here's an overview of the week's weather.</p>

        <h2 className="text-lg font-medium -mb-2">Sailing</h2>
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined
              // Map over the whole forecast, using an array of [0..forecastDays-1]
              // to index into the forecast
              ? indicesArray(forecastDays).map(
                idx => <StarRating
                  stars={
                    calcStarRating(
                      true,
                      forecast?.daily.windSpeed10mMax[idx],
                      forecast?.daily.precipitationProbabilityMean[idx],
                      forecast?.daily.temperature2mMax[idx],
                      forecast?.daily.temperature2mMin[idx]
                    )
                  }
                  dayOfWeek={forecast?.daily.time[idx].getDay()}
                />
              )
              : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        <h2 className="text-lg font-medium -mb-2">Swimming</h2>
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined
              // Map over the whole forecast, using an array of [0..forecastDays-1]
              // to index into the forecast
              ? indicesArray(forecastDays).map(
                idx => <StarRating
                  stars={
                    calcStarRating(
                      false,
                      forecast?.daily.windSpeed10mMax[idx],
                      forecast?.daily.precipitationProbabilityMean[idx],
                      forecast?.daily.temperature2mMax[idx],
                      forecast?.daily.temperature2mMin[idx]
                    )
                  }
                  dayOfWeek={forecast?.daily.time[idx].getDay()}
                />
              )
              : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

      </div>

      {/* Double small previews (temp icons here) - maybe put best days in here */}
      {/* <div className="double-card flex flex-row w-11/12 lg:w-1/2 gap-3">
        <div>aaa</div>
        <div>aaa</div>
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
        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined ? Array.from(forecast?.daily.time).map(item => <DateGroup date={item} />) : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* 
          *
          * TEMPERATURES 
          *
          */}
        <p className="text-start text-sm text-slate-400 font-bold">Temperature (°C)</p>

        <Carousel
          ref={(el) => registerCarousel(el)}
          onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)}
          items={
            forecast != undefined
              // Zip together min and max temperatures
              ? zip(
                Array.from(forecast?.daily.temperature2mMax),
                Array.from(forecast?.daily.temperature2mMin)
              ).map(([max, min]) => <TempGroup max={max} min={min} />)
              : [<code className="hidden">Error: forecast undefined!</code>]
          }
        />

        {/* 
          *
          * RAIN 
          *
          */}
        <p className="text-start text-sm text-slate-400 font-bold">Rain</p>

        <Carousel ref={(el) => registerCarousel(el)} onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)} items={
          forecast != undefined
            ? Array.from(forecast?.daily.precipitationProbabilityMean).map(
              item => <RainGroup precipitationProbabilityMean={item} />
            )
            : [<code className="hidden">Error: forecast undefined!</code>]
        } />

        {/* 
          *
          * WIND 
          *
          */}
        <p className="text-start text-sm text-slate-400 font-bold">Wind (kt)</p>

        <Carousel ref={(el) => registerCarousel(el)} onScroll={(e) => handleCarouselScroll(e.target as HTMLDivElement)} items={
          forecast != undefined
            ? indicesArray(forecastDays).map(
              idx => <WindGroup
                bearing={forecast?.daily.windDirection10mDominant[idx]}
                maxSpeed={forecast?.daily.windSpeed10mMax[idx]}
                gusts={forecast?.daily.windGusts10mMax[idx]}
              />
            )
            : [<code className="hidden">Error: forecast undefined!</code>]
        } />

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
