/* eslint-disable @typescript-eslint/naming-convention */

// PM2 configuration file - see https://pm2.keymetrics.io/docs/usage/application-declaration/ and https://pm2.keymetrics.io/docs/usage/deployment/
module.exports = {
  // This piece is used on the remote server to run the app (this file is copied to the remote server by pm2 deploy)
  apps: [
    {
      name: 'dracarys-backend',
      script: 'dist/src/main.js',
    },
  ],

  // This piece is used on the local machine or ci/cd runner to deploy the app to the remote server
  // NOTE: to ensure consistency with automated deployments, any deployment names should match environment names in GitHub
  // To see existing environments, go to https://github.com/menklab/dracarys-backend/settings/environments
  deploy: {
    // "dev" is the environment name
    dev: {
      // SSH key path used to auth to the remote hosts, default to $HOME/.ssh
      // For developers - copy whatever ssh key you use to connect to the remote server to this path
      key: '~/.ssh/menklab/dracarys-backend',
      // SSH user for the remote hosts
      user: 'root',
      // SSH remote hosts
      host: ['174.138.109.81'],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: ['StrictHostKeyChecking=no'],
      // Branch from the remote to pull updates from. format: GIT remote/branch
      ref: 'origin/develop',
      // GIT remote
      repo: 'https://github.com/menklab/dracarys-backend.git',
      // path in the server that the repo will be cloned into
      path: '/var/www/dracarys-backend',
      // Pre-setup command or path to a script on your local machine
      'pre-setup': 'ls -la',
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      'post-setup': 'ls -la',
      // pre-deploy action
      'pre-deploy-local': "echo 'This is a local executed command'",
      // post-deploy action
      'post-deploy':
        'doppler secrets download --no-file --format env > .env; npm ci; npm run build; pm2 startOrRestart ecosystem.config.js --only dracarys-backend',
    },
  },
}
