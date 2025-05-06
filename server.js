// server.js
import express from "express";
import { createRequestHandler } from "@remix-run/express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;


app.use("/assets", express.static(path.join(__dirname, "build/client/assets")));
app.use("/build", express.static(path.join(__dirname, "public/build")));
app.use(express.static("public"));

app.all(
  "/",
  createRequestHandler({
    build: require("./build/server/index.js"),
    mode: process.env.NODE_ENV || "production",
  })
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
