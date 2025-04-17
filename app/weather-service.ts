// This would be implemented as an Angular Service in Angular
// In Next.js, we're implementing it as a utility function

export async function getTorontoWeather(apiKey: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&units=metric&appid=${apiKey}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching weather:", error)
    throw error
  }
}
