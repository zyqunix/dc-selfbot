# Discord.JS Selfbot
A simple selfbot written in JavaScript using the Discord.JS library running in Node.JS.


# Installation
## Prerequisites
1.[Node.JS](https://nodejs.org)
2. Your Discord Token and UserID
3. Put your Cookie in config.json -> "token": "<token here>", same with your ID (config.json -> "userId": "<id here>")

## Running
1. Open your Terminal/CMD in the directory of the selfbot
2. run `npm install` and wait for it to install dependencies
3.1 **Windows**: Open `BackgroundStart.vbs` to make it run as a background process, or run `start.bat` to make it run as a window
3.2 **Linux**: Run `chmod+x start.sh` and then `./start.sh` to run

# Custom Commands
Make .js files in `/commands/CATEGORY/` and use `TEMPLATE.j` to see the basic template
