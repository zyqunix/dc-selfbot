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


## Disclaimer

Discord is trademark of Discord Inc. and solely mentioned for the sake of descriptivity.
Mentioning it does not imply any affiliation with or endorsement by Discord Inc.
<details>
<summary>Using a selfbot violates Discord's terms of service</summary>

Selfbots are against Discord’s Terms of Service.

However, Discord is pretty indifferent about them and there are no known cases of users getting banned for using selfbots! So you should generally be fine if you don’t use plugins that implement abusive behaviour. But no worries, all inbuilt commands are safe to use!

Regardless, if your account is essential to you and getting disabled would be a disaster for you, you should probably not use this, just to be safe

Additionally, make sure not to use the selfbot in a server where you might get banned for it

</details>
