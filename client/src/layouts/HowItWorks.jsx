import React from 'react'

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Route",
      description:
        "Provide your departure city, destination, date, and time.",
    },
    {
      number: "02",
      title: "We Analyze The Journey",
      description:
        "TravelSky checks weather conditions of districts across the entire route.",
    },
    {
      number: "03",
      title: "Travel With Confidence",
      description:
        "Get travel scores, rain alerts, visibility warnings, and route insights.",
    },
  ];

  return (
    <section className="py-20 bg-blue-600">

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="mt-4 text-white max-w-2xl mx-auto">
            TravelSky makes route weather forecasting simple in just three steps.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200"
            >

              <div className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg mb-6">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}