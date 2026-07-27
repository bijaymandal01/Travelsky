import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const facts = [
    "🌧️ Heavy rain can increase travel time by up to 30%.",
    "🌫️ Low visibility below 1 km makes driving more challenging.",
    "🚗 Checking weather before departure helps avoid unexpected delays.",
    "🛣️ TravelSky analyzes weather across your entire route.",
    "⛽ Planning fuel stops ahead can save valuable travel time.",
    "☀️ Afternoon heat can increase tire pressure.",
    "⚡ Strong winds can affect highway driving.",
    "🌦️ Route weather is more useful than destination weather.",
  ];

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(420%);
          }
        }

        .loading-bar {
          animation: loading 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

        <div className="w-full max-w-xl">

          <h1 className="text-3xl font-bold text-center text-slate-800">
            Preparing Your Journey
          </h1>

          <p className="text-center text-slate-500 mt-2">
            Analyzing your route and live weather...
          </p>

          {/* Rotating Travel Fact */}
          <div className="h-24 flex items-center justify-center mt-10">
            <p
              key={factIndex}
              className="text-center text-lg text-slate-700 font-medium transition-all duration-500 animate-pulse"
            >
              {facts[factIndex]}
            </p>
          </div>

          {/* Loading Bar */}
          <div className="mt-6 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className="loading-bar h-full w-1/3 rounded-full bg-blue-600"></div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-5 animate-pulse">
            Fetching live route & weather data...
          </p>

        </div>

      </div>
    </>
  );
};

export default LoadingScreen;