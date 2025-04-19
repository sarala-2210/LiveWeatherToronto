"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CloudRain, Thermometer, AlertTriangle, Sun, Cloud, Wind, Droplets, RefreshCw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WeatherData {
  main: {
    temp: number
    humidity: number
    feels_like: number
  }
  weather: {
    description: string
    icon: string
    main: string
  }[]
  wind: {
    speed: number
  }
  name: string
  timestamp?: string
}

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)
        setErrorDetails(null)

        console.log("Fetching weather data from API route...")

        // Add cache-busting parameter and ensure no caching
        const response = await fetch(`/api/weather?t=${new Date().getTime()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        })

        const data = await response.json()

        if (!response.ok) {
          console.error("API Error Response:", data)
          setError(`Error ${response.status}: ${data.error || "Unknown error"}`)
          setErrorDetails(data.details || data.message || "No additional details")
          setLoading(false)
          return
        }

        console.log("Weather data received:", data)
        setWeather(data)

        // Format the last updated time
        const now = new Date()
        const options = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }
        setLastUpdated(now.toLocaleTimeString("en-CA", options))

        setLoading(false)
      } catch (err) {
        console.error("Error fetching weather:", err)
        setError(`Client error: ${err.message}`)
        setLoading(false)
      }
    }

    fetchWeather()

    // Refresh weather data every 10 minutes
    const refreshInterval = setInterval(fetchWeather, 10 * 60 * 1000)

    return () => clearInterval(refreshInterval)
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

  // Get weather icon and background based on weather condition
  const getWeatherStyles = () => {
    if (!weather || !weather.weather[0])
      return {
        icon: <CloudRain className="h-8 w-8" />,
        bgClass: "from-blue-400 to-blue-600",
        textClass: "text-white",
      }

    const condition = weather.weather[0].main.toLowerCase()

    if (condition.includes("clear")) {
      return {
        icon: <Sun className="h-8 w-8 text-yellow-300" />,
        bgClass: "from-blue-400 to-blue-600",
        textClass: "text-white",
      }
    } else if (condition.includes("cloud")) {
      return {
        icon: <Cloud className="h-8 w-8 text-gray-200" />,
        bgClass: "from-gray-500 to-blue-600",
        textClass: "text-white",
      }
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return {
        icon: <CloudRain className="h-8 w-8 text-blue-200" />,
        bgClass: "from-blue-700 to-blue-900",
        textClass: "text-white",
      }
    } else {
      return {
        icon: <CloudRain className="h-8 w-8" />,
        bgClass: "from-blue-400 to-blue-600",
        textClass: "text-white",
      }
    }
  }

  const { icon, bgClass, textClass } = getWeatherStyles()

  if (error) {
    return (
      <Card className="overflow-hidden border-red-200 shadow-lg">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
          <CardTitle className="flex items-center text-white">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Weather Error
          </CardTitle>
        </div>
        <CardContent className="p-4">
          <div className="space-y-4">
            <p className="text-red-500">{error}</p>
            {errorDetails && (
              <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded overflow-auto max-h-24">{errorDetails}</div>
            )}
            <div className="flex justify-between items-center">
              <Button onClick={handleRetry} size="sm" className="bg-blue-500 hover:bg-blue-600">
                <RefreshCw className="h-4 w-4 mr-2" /> Retry
              </Button>
              <Button
                onClick={() => window.open("/api/debug-env", "_blank")}
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-600"
              >
                Check Environment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <div className={`bg-gradient-to-r ${bgClass} p-4`}>
        <CardTitle className={`flex items-center justify-between ${textClass}`}>
          <div className="flex items-center">
            {icon}
            <span className="ml-2">Toronto Weather</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetry}
            className="text-white hover:bg-white/20"
            title="Refresh weather data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </div>
      <CardContent className="p-0">
        {loading ? (
          <div className="space-y-2 p-4" data-testid="loading-skeleton">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6">
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Thermometer className="h-6 w-6 text-red-500 mr-2" />
                  <span className="text-4xl font-bold text-blue-900">{Math.round(weather?.main.temp || 0)}°C</span>
                </div>

                {weather?.weather[0] && (
                  <div className="mt-2 flex flex-col items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      className="h-16 w-16"
                    />
                    <span className="capitalize text-lg font-medium text-blue-800">
                      {weather.weather[0].description}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional weather details */}
            <div className="grid grid-cols-2 gap-2 p-4 bg-blue-50">
              <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Humidity</div>
                  <div className="font-medium">{weather?.main.humidity || 0}%</div>
                </div>
              </div>
              <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
                <Wind className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Wind</div>
                  <div className="font-medium">{Math.round((weather?.wind.speed || 0) * 3.6)} km/h</div>
                </div>
              </div>
              <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
                <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Feels Like</div>
                  <div className="font-medium">{Math.round(weather?.main.feels_like || 0)}°C</div>
                </div>
              </div>
              <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Updated</div>
                  <div className="font-medium text-sm">{lastUpdated}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
