import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {

  const payload = JSON.stringify({
    from: "dhanbad",
    to: "ranchi",
    date: "2026-06-03",
    time: "18:19"
  });

  http.post(
    "http://localhost:5000/api/weather/travel",
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}