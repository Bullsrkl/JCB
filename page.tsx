"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [startMeter, setStartMeter] = useState("")
  const [endMeter, setEndMeter] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [totalHours, setTotalHours] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [meterPoints, setMeterPoints] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    // Load data from local storage
    const savedData = localStorage.getItem("jcbHourMeterData")
    if (savedData) {
      const { startMeter, endMeter, hourlyRate } = JSON.parse(savedData)
      setStartMeter(startMeter)
      setEndMeter(endMeter)
      setHourlyRate(hourlyRate)
    }
  }, [])

  useEffect(() => {
    // Save data to local storage
    localStorage.setItem("jcbHourMeterData", JSON.stringify({ startMeter, endMeter, hourlyRate }))

    // Calculate results
    const start = Number.parseFloat(startMeter) || 0
    const end = Number.parseFloat(endMeter) || 0
    const rate = Number.parseFloat(hourlyRate) || 0

    const points = Math.max(end - start, 0)
    setMeterPoints(points)

    const hours = Math.floor(points)
    const minutes = Math.round((points - hours) * 60)
    setTotalHours(hours)
    setTotalMinutes(minutes)

    setTotalAmount(points * rate)
  }, [startMeter, endMeter, hourlyRate])

  const resetData = () => {
    setStartMeter("")
    setEndMeter("")
    setHourlyRate("")
    localStorage.removeItem("jcbHourMeterData")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">JCB Hour Meter</h1>
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl">
          <InputField label="Start Meter" value={startMeter} onChange={setStartMeter} />
          <InputField label="End Meter" value={endMeter} onChange={setEndMeter} />
          <InputField label="Hourly Rate (₹)" value={hourlyRate} onChange={setHourlyRate} />

          <ResultDisplay label="Total Time" value={`${totalHours}h ${totalMinutes}m`} />
          <ResultDisplay label="Meter Points" value={meterPoints.toFixed(2)} />
          <ResultDisplay label="Total Amount" value={`₹${totalAmount.toFixed(2)}`} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:bg-yellow-500"
            onClick={resetData}
          >
            Reset
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

const InputField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 text-white px-3 py-2 transition duration-300 ease-in-out"
    />
  </div>
)

const ResultDisplay = ({ label, value }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm">{label}:</span>
    <span className="font-bold text-yellow-400">{value}</span>
  </div>
)
