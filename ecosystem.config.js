module.exports = {
  apps: [{
    name: "hotslab",
    script: "./server.js",
    watch: false,
    instances: 1,
    env: {
      "NODE_ENV": "production",
    }
  }]
}
