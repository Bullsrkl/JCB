import { useState, useEffect } from "react";

export default function JCBHourMeterApp() {
  const [startMeter, setStartMeter] = useState(() => localStorage.getItem("startMeter") || "");
  const [endMeter, setEndMeter] = useState(() => localStorage.getItem("endMeter") || "");
  const [hourlyRate, setHourlyRate] = useState(() => localStorage.getItem("hourlyRate") || "");
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("startMeter", startMeter);
    localStorage.setItem("endMeter", endMeter);
    localStorage.setItem("hourlyRate", hourlyRate);
  }, [startMeter, endMeter, hourlyRate]);

  const calculate = () => {
    const start = parseFloat(startMeter);
    const end = parseFloat(endMeter);
    const rate = parseFloat(hourlyRate);
    if (isNaN(start) || isNaN(end) || isNaN(rate) || start >= end) return;

    const hoursDecimal = end - start;
    const hours = Math.floor(hoursDecimal);
    const minutes = Math.round((hoursDecimal - hours) * 60);
    const amount = hoursDecimal * rate;

    setTotalHours(hours);
    setTotalMinutes(minutes);
    setTotalAmount(amount.toFixed(2));
  };

  const reset = () => {
    setStartMeter("");
    setEndMeter("");
    setHourlyRate("");
    setTotalHours(0);
    setTotalMinutes(0);
    setTotalAmount(0);
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-yellow-400">JCB Hour Meter Calculator</h1>
        <div className="space-y-4 mt-4">
          <input type="number" placeholder="Start Meter" value={startMeter} onChange={(e) => setStartMeter(e.target.value)} className="w-full p-2 rounded-lg bg-gray-700 text-white" />
          <input type="number" placeholder="End Meter" value={endMeter} onChange={(e) => setEndMeter(e.target.value)} className="w-full p-2 rounded-lg bg-gray-700 text-white" />
          <input type="number" placeholder="Hourly Rate (₹)" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="w-full p-2 rounded-lg bg-gray-700 text-white" />
          <button onClick={calculate} className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg font-bold">Calculate</button>
          <div className="bg-gray-700 p-4 rounded-lg text-left">
            <p><strong>Total Time:</strong> {totalHours} Hours {totalMinutes} Minutes</p>
            <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          </div>
          <button onClick={reset} className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-lg font-bold">Reset</button>
        </div>
      </div>
    </div>
  );
}
