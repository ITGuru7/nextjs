const Raven = require("raven");

if (process.env.NODE_ENV === "production") {
  Raven.config("https://2c77ccb753274fac9e62c5f441fda415@sentry.io/1190322", {
    autoBreadcrumbs: true,
    captureUnhandledRejections: true
  }).install(function(err, sendErr, eventId) {
    if (!sendErr) {
      console.log(
        "Successfully sent fatal error with eventId " + eventId + " to Sentry:"
      );
      console.error(err.stack);
    }
    console.log("This is thy sheath; there rust, and let me die.");
    process.exit(1);
  });
}

module.exports = Raven;
