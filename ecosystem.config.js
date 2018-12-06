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
      host: '118.193.175.253',
      ref: 'origin/master',
      repo: 'git@github.com:wmui/essay.git',
      path: '/www/essay',
      'post-deploy': 'yarn && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
