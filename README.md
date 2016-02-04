# Slackcron - cron for Slack

How to use:

- Create a new incoming webhook in Slack: https://my.slack.com/services/new/incoming-webhook
- Set environment variable WEBHOOK_URI to the uri that Slack gives you for your webhook
  ```export WEBHOOK_URI=https://hooks.slack.com/...```
- Edit schedule.json:
  - Set 'username' to a nice name for your bot (will default to 'incoming-webhook')
  - Add a list of messages with time-stamps
- Start the program
  ```node main.js```
  
Note: Upon start, the program will immediatley post all messages scheduled earlier than the current time.

  
