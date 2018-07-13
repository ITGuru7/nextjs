const express = require("express");
const next = require("next");
const port =
  parseInt(process.env.PORT, 10) || process.env.NODE_ENV === "production"
    ? 5000
    : 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { join } = require("path");

app.prepare().then(() => {
  const server = express();
  server.use("/", express.static("static"));
  server.use(
    "/service-worker.js",
    express.static(join(__dirname, ".next", "/service-worker.js"))
  );

  server.get("/blog/:slug", (req, res) => {
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    return app.render(req, res, "/blog", { slug: req.params.slug });
  });
  server.get("/blog", (req, res) => {
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    return app.render(req, res, "/blog", { slug: null });
  });

  server.get("*", (req, res) => {
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready`);
  });
});
