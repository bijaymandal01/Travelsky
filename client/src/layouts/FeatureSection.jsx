import React from 'react'

export default function FeatureSection() {
  const features = [
    {
      icon: "🌧",
      title: "Rain Alerts",
      description:
        "Identify rainfall zones along your route before departure.",
    },
    {
      icon: "👁️",
      title: "Visibility Insights",
      description:
        "Spot low-visibility areas caused by fog, rain, or haze.",
    },
    {
      icon: "🌡️",
      title: "Temperature Tracking",
      description:
        "Monitor temperature changes throughout your journey.",
    },
    {
      icon: "📍",
      title: "Journey Timeline",
      description:
        "View weather conditions district by district.",
    },
    {
      icon: "⚠️",
      title: "Travel Risk Score",
      description:
        "Get a quick overview of route weather risks.",
    },
    {
      icon: "🛣️",
      title: "Route Weather Intelligence",
      description:
        "Forecast weather across your entire journey, not just the destination.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What TravelSky Provides
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Everything you need to understand weather conditions
            across your entire route before you begin your journey.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}