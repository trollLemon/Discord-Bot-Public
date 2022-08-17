//pm2 config file
module.exports = {
  apps: [
    {
      name: "the funny bot",
      script: "main/index.js",
      exec_mode: "cluster_mode",
      max_memory_restart: "500M",
      cron_restart: "0 0 * * * ",
    },
  ],
};
