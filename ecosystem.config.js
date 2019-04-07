const config = require('./server/config')

module.exports = {
    apps: [
        {
            name: 'Essay',
            script: 'server/index.js',
            env: {
                COMMON_VARIABLE: 'true',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
    deploy: {
        production: {
            user: 'root',
            ref: 'origin/master',
            host: config.pm2.host,
            repo: config.pm2.repo,
            path: config.pm2.path,
            'post-deploy': 'yarn && npm run build && pm2 reload ecosystem.config.js --env production',
        },
    },
}
