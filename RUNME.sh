#!/bin/bash
#this script starts the bot along with PM2
#PM2 ensures the bot runs again if it crashed unexpectably
RED='\033[0;36m'
NC='\033[0m'  
echo "starting up bot"
echo -e "run ${RED}'pm2 monit' ${NC}to see more logging stuff "
exec pm2 start ecosystem.config.js





