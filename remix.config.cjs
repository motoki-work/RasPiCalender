// remix.config.js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "express",
  serverBuildPath: "build/server/index.js",
  future: {
    v2_dev: true,
    v2_routeConvention: true,
    v2_meta: true,
  },
};