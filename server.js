const express = require("express");
const next = require("next");
const raven = require("raven");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { join } = require("path");

app.prepare().then(() => {
  const server = express();

  // Must configure raven before doing anything else with it
  raven
    .config("https://2c77ccb753274fac9e62c5f441fda415@sentry.io/1190322", {
      autoBreadcrumbs: true,
      captureUnhandledRejections: true,
      stacktrace: true
    })
    .install(function(err, sendErr, eventId) {
      if (!sendErr) {
        console.log(
          "Successfully sent fatal error with eventId " +
            eventId +
            " to Sentry:"
        );
        console.error(err.stack);
      }
      console.log("This is thy sheath; there rust, and let me die.");
      process.exit(1);
    });

  // The request handler must be the first middleware on the app
  server.use(raven.requestHandler());

  server.use("/", express.static("static"));
  server.use(
    "/service-worker.js",
    express.static(join(__dirname, ".next", "/service-worker.js"))
  );
  server.get("*", (req, res) => handle(req, res));

  // The error handler must be before any other error middleware
  server.use(raven.errorHandler());

  // Optional fallthrough error handler
  server.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready`);
  });
});
