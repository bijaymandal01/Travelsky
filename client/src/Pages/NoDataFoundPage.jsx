import { useNavigate } from "react-router-dom";

export default function NoDataFoundPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center">


        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Route Not Found
        </h1>

        <p className="text-slate-600 mb-8">
          We couldn't find one or both locations.
        </p>
                <div className="my-8 flex justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            ← Back to Home
          </button>

        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-left">

          <h2 className="font-semibold text-red-700 mb-3">
            Possible reasons
          </h2>

          <ul className="space-y-2 text-slate-700">

            <li>
              • The city or district name contains a spelling mistake.
            </li>

            <li>
              • The entered location is not a valid Indian city or district.
            </li>

            <li>
              • Our location service is temporarily unavailable due to high traffic.
            </li>

          </ul>

        </div>

        <div className="mt-6 bg-slate-50 rounded-2xl p-5 text-left">

          <h2 className="font-semibold text-slate-800 mb-3">
            Try searching with
          </h2>

          <div className="grid sm:grid-cols-2 gap-2 text-slate-600">

            <div>Delhi</div>
            <div>Dhanbad, Jharkhand</div>
            <div>Bengaluru, Karnataka</div>

          </div>

        </div>


      </div>

    </div>
  );
}