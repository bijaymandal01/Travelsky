import posthog from "posthog-js";
// require("dotenv").config()
console.log(import.meta.env.VITE_POSTHOG_KEY)
// console.log( "process_env " +process.env.VITE_POSTHOG_KEY);
posthog.init(
  import.meta.env.VITE_POSTHOG_KEY,
  {
    api_host: "https://us.i.posthog.com",

    capture_pageview: true,

    session_recording: {
      maskAllInputs: true,
    },
  }
);

export default posthog;