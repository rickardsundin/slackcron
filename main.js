var fs = require('fs'),
    moment = require('moment'),
    Slack = require('slack-node');

// Read schedule from file
var schedule = require('./schedule.json');

// Read webhook uri from env
webhookUri = process.env.WEBHOOK_URI;

slack = new Slack();
slack.setWebhook(webhookUri);

setInterval(function() {
    dueMessages = schedule.messages.filter(isDue);
    dueMessages.forEach(notifyAndRemove);
}, 1000);

var notifyAndRemove = function(message) {
    notify(message);
    remove(message);
}

var notify = function(message){
    slack.webhook({
	username: schedule.username,
	text: "[" + message.at + "] " + message.text  
    }, function(err, response) {
	console.log(response);
    });
    console.log(message.text);
}
	    
var remove = function(message) {
    index = schedule.messages.find(function(element) {
	return element == message;
    });
    schedule.messages.splice(index, 1);
}

var isDue = function(element, index, array) {
    return moment(element.at, 'hh:mm').isBefore(moment());
}
