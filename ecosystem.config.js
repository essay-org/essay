module.exports = {
  apps: [
    {
      name: 'essay',
      script: 'server/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '116.196.17.78',
      ref: 'origin/master',
      repo: 'git@github.com:wmui/essay.git',
      path: '/root/essay',
      'post-deploy': 'yarn && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
