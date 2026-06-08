import React from 'react'

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-slate-300">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>

            <h3 className="text-2xl font-bold text-white">
              TravelSky
            </h3>

            <p className="mt-4 text-sm leading-relaxed">
              Route Weather Intelligence for better travel
              planning. Forecast weather conditions across
              your entire journey before departure.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-sm">

              <Link
                to="/"
                className="hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="hover:text-white"
              >
                About
              </Link>

              <Link
                to="/services"
                className="hover:text-white"
              >
                Services
              </Link>

              <Link
                to="/docs"
                className="hover:text-white"
              >
                API Docs
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h4 className="font-semibold text-white mb-4">
              Project
            </h4>

            <div className="space-y-3 text-sm">

              <p>
                Built using React, Node.js,
                OpenRouteService, OSRM and
                Visual Crossing Weather API.
              </p>

              <p>
                Designed as a route weather
                intelligence platform.
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white mt-10 pt-6 text-center text-sm">

          <p>
            © {new Date().getFullYear()} TravelSky.
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}