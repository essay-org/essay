module.exports = {
  apps: [
    {
      name: 'essays',
      script: 'build/main.js',
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
      host: '118.193.175.253', // 服务器IP
      ref: 'origin/master',
      repo: 'git@github.com:wmui/essays.git',
      path: '/www/essays',
      'post-deploy': 'yarn && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
