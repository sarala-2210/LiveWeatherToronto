"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Sun, CloudRain } from "lucide-react"
import WeatherDisplay from "@/components/weather-display"
import AboutUs from "@/components/about-us"
import OurServices from "@/components/our-services"
import OurCustomers from "@/components/our-customers"

export default function Home() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      // Format date for Toronto time zone (Eastern Time)
      const options = {
        timeZone: "America/Toronto",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }

      // Format the date in Toronto time
      const formatter = new Intl.DateTimeFormat("en-CA", options)
      const parts = formatter.formatToParts(now)

      // Build the formatted date string in YYYY-MM-DD HH:MM:SS format
      const year = parts.find((part) => part.type === "year")?.value || ""
      const month = parts.find((part) => part.type === "month")?.value || ""
      const day = parts.find((part) => part.type === "day")?.value || ""
      const hour = parts.find((part) => part.type === "hour")?.value || ""
      const minute = parts.find((part) => part.type === "minute")?.value || ""
      const second = parts.find((part) => part.type === "second")?.value || ""

      const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      setCurrentDateTime(formattedDateTime)

      // Get Toronto time for greeting
      const torontoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }))
      const hours = torontoTime.getHours()

      if (hours < 12) {
        setGreeting("Good Morning")
      } else if (hours < 18) {
        setGreeting("Good Afternoon")
      } else {
        setGreeting("Good Evening")
      }
    }

    // Update immediately
    updateDateTime()

    // Update every second
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      {/* Colorful Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white text-blue-600 p-2 rounded-full mr-3">
                <Sun className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">TechVision Solutions</h1>
                <p className="mt-1 text-blue-100">IT Consulting Services in Toronto</p>
              </div>
            </div>

            {/* Highlighted Time Display */}
            <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-white/30 transition-all hover:bg-white/30">
              <div className="text-center">
                <div className="text-sm font-medium text-blue-100">{greeting} (Toronto Time)</div>
                <div className="flex items-center justify-center mt-1">
                  <Clock className="h-5 w-5 text-yellow-300 animate-pulse mr-2" />
                  <span className="text-xl font-mono font-bold tracking-wider">{currentDateTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Updated Layout */}
      <div className="container mx-auto px-4 py-8">
        {/* Weather Highlight Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
            <CloudRain className="mr-2 h-6 w-6 text-blue-600" />
            Current Weather
          </h2>
          <div className="max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
            <WeatherDisplay />
          </div>
        </div>

        {/* Colorful Divider */}
        <div className="relative h-1 my-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Content Tabs with Updated Styling */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Learn More About Us</h2>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-blue-100 p-1 rounded-xl">
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg"
              >
                About Us
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg"
              >
                Our Services
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg"
              >
                Our Customers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <Card className="p-6 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <AboutUs />
              </Card>
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <Card className="p-6 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <OurServices />
              </Card>
            </TabsContent>
            <TabsContent value="customers" className="mt-6">
              <Card className="p-6 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <OurCustomers />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Colorful Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white mt-12 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">TechVision Solutions</h2>
              <p className="text-blue-300 mt-1">IT Consulting Excellence</p>
              <div className="mt-3 flex items-center justify-center md:justify-start space-x-4">
                <a href="#" className="text-white hover:text-blue-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-blue-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-blue-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-6 md:mt-0 text-center md:text-right">
              <p className="text-blue-300">© {new Date().getFullYear()} TechVision Solutions. All rights reserved.</p>
              <p className="mt-2 text-sm text-blue-400">265 Yorkland Blvd, Toronto, ON</p>
              <p className="text-sm text-blue-400">contact@techvision.com</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
