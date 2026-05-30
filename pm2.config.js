module.exports = {
  apps: [{
    name: "slovbal",
    script: "npm",
    args: "start",
    env: { PORT: 3002, NODE_ENV: "production" }
  }]
}