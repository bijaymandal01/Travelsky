const apiLogger = (apiName, error, extra = {}) => {

    console.log("\n==============================");
    console.log(`${apiName} FAILED`);

    Object.entries(extra).forEach(
        ([key, value]) => {
            console.log(`${key}:`, value);
        }
    );

    console.log(
        "Status:",
        error.response?.status
    );

    console.log(
        "Code:",
        error.code
    );

    console.log(
        "Message:",
        error.message
    );

    console.log(
        "Response:",
        error.response?.data
    );

    console.log("==============================\n");

};

module.exports = apiLogger;