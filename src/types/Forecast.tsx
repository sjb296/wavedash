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
    sailingRatings: number[]
    swimmingRatings: number[]
  },
  locality: string | null,
  principalSubdivision: string | null,
} | null

export default Forecast