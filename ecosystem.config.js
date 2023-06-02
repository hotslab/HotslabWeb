module.exports = {
  apps: [{
    name: "hotslab",
    script: "./server.js",
    watch: true,
    instances: "-1",
    env: {
      "NODE_ENV": "production",
    }
  }]
}
