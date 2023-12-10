module.exports = {
  apps: [
    {
      name: "12-factor-V1",
      script: "./dist/server.js",
      instances: 2,
      exec_mode: "cluster",
      watch: true,
      increment_var: "PORT",
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
    },
    {
      name: "12-factor-V2",
      script: "./dist/server.js",
      instances: 2,
      exec_mode: "cluster",
      watch: true,
      increment_var: "PORT",
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
    },
  ],
};
