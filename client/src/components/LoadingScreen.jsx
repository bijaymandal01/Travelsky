import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [visibleSteps, setVisibleSteps] = useState(1);

  const steps = [
    "Location identified",
    "Route calculated",
    "checkpoints discovered",
    "Travel score calculated",
    "Generating dashboard...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps((prev) =>
        prev < steps.length ? prev + 1 : prev
      );
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-8 w-full max-w-2xl">

        <div className="flex items-center gap-3 mb-6">

          <div className="h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Planning Your Journey
            </h1>

            <p className="text-slate-500 text-sm">
              Analyzing route and weather conditions
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {steps.slice(0, visibleSteps).map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              {index === visibleSteps - 1 &&
              visibleSteps !== steps.length ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>

                  <span className="text-slate-700">
                    {step}
                  </span>
                </>
              ) : (
                <>
                  <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>

                  <span className="text-slate-700">
                    {step}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">

          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 transition-all duration-500"
              style={{
                width: `${(visibleSteps / steps.length) * 100}%`,
              }}
            />
          </div>

          <p className="text-center text-sm text-slate-500 mt-3">
            {Math.round(
              (visibleSteps / steps.length) * 100
            )}
            % Complete
          </p>

        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;