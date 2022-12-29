#!/bin/sh

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source "$SCRIPT_DIR/verify-arguments.sh"

# Change directory to the root of the project
cd "$SCRIPT_DIR/../.."

verify_arguments_are_set ("DB_TYPE" "DB_HOST" "DB_PORT" "DB_NAME" "DB_USER" "DB_PASSWORD" "PORT" "SERVER_IP" "SSH_PRIVATE_KEY")

# Create .env file with all the relevant environment variables
echo "DB_TYPE=$DB_TYPE
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
PORT=$PORT
NODE_ENV=$NODE_ENV
ORM_LOGGING=$ORM_LOGGING
ORM_MIGRATION_RUN=$ORM_MIGRATION_RUN
REDIS_HOST=$REDIS_HOST
REDIS_PORT=$REDIS_PORT
REDIS_LOGGING=$REDIS_LOGGING
SESSION_SECRET=$SESSION_SECRET" > .env

# Build the nest app
npm run build

# SFTP the dist folder and .env file to the server
# NOTE: on the first deploy, you will need to ssh into the server and manually start pm2 with the following command:
# pm2 start dist/src/main.js --watch
# On all subsequent deploys (as long as the server hasn't shut down or been restarted), pm2 will pick up on the file changes and restart the app automatically
sftp -i "$SSH_PRIVATE_KEY" -o StrictHostKeyChecking=no "$SERVER_IP" <<EOF
put -r dist
put .env
EOF

