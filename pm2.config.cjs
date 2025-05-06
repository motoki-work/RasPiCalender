module.exports = {
    apps: [
      {
        name: "calender",
        script: "server.js",
        autorestart: true,
        restart: "on-failure",
        error_file: "./logs/err.log",
        out_file: "./logs/out.log",
        // ここでポート指定
        env: {
            PORT: 5173,
        },
      },
    ],
  };