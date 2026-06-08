import React from 'react'

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

      <div className="text-center">

        <h1 className="text-8xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-semibold text-slate-800 mt-4">
          Route Not Found
        </h2>

        <p className="text-slate-600 mt-4 max-w-md mx-auto">
          Looks like you've taken a wrong turn.
          The route you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Back To Home
        </Link>

      </div>

    </div>
  );
}