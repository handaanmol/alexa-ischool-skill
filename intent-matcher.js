var Promise = require('bluebird');
var ResponseBuilder = require('./models/ResponseBuilder');

var courseService = require('./services/course-service');
var intentMatcher = dataStore => {
    switch (dataStore.intent) {
    case 'default.launch':
        return defaultLaunch(dataStore);
    case 'default.sessionended':
        return defaultSessionEnded(dataStore);
    case 'AMAZON.StopIntent':
        return AmazonStopIntent(dataStore);
    case 'AMAZON.CancelIntent':
        return AmazonCancelIntent(dataStore);
    case 'courseinfo':
        return courseinfo(dataStore);
    case 'courseinfoanswer':
        return courseinfoanswer(dataStore);
    case 'expertiseinfo':
        return expertiseinfo(dataStore);
    case 'expertiseinfoanswer':
        return expertiseinfoanswer(dataStore);
    case 'welcome':
        return welcome(dataStore);
    case 'projectinfo':
        return projectinfo(dataStore);
    default:
        return noIntentMatch(dataStore);
    }
};
var defaultLaunch = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'Welcome to ischool Self Service Kiosk. How may I help you today?'
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I did not get a reply. How could I help you today?'
        });
        resolve(dataStore);
    });
};
var defaultSessionEnded = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'Thank you.'
        });
        resolve(dataStore);
    });
};
var AmazonStopIntent = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'Thank you.'
        });
        resolve(dataStore);
    });
};
var AmazonCancelIntent = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'Thank you.'
        });
        resolve(dataStore);
    });
};
var noIntentMatch = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'I don\'t understand please be more specific.'
        });
        resolve(dataStore);
    });
};
var courseinfo = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'OK ! I can help you. Which course you are interested in ?'
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I am waiting for your reply. Tell me which course you are interested in ?'
        });
        resolve(dataStore);
    });
};

var courseinfoanswer = function (dataStore) {
    return new Promise((resolve, reject) => {
        var courseinfoRequest = courseService(dataStore.slots.coursename.value);
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: `OK ! ${dataStore.slots.coursename.value } has course id ${courseinfoRequest.courseId} which is taught by Professor ${courseinfoRequest.professorName} on ${courseinfoRequest.day} at ${courseinfoRequest.timing}. Can I help you with any other information?`
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I did not get your response. Do you need any other information from me? '
        });
        resolve(dataStore);
    });
};
var expertiseinfo = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'OK ! I can help you. Which skill or area are you seeking help for?'
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I am waiting for your reply. Tell me which skill or area you are interested in ?'
        });
        resolve(dataStore);
    });
};

var expertiseinfoanswer = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'OK ! I can help you. Which skill or area are you seeking help for?'
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I am waiting for your reply. Tell me which skill or area you are interested in ?'
        });
        resolve(dataStore);
    });
};

var welcome = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'Today on 5th December, we are having Sharktank Final with the Sharks sitting right here for Cloud Management Class, Wish my creators - Anmol, Tanushree and Sooraj, luck!. Do you need any other info?'
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I am waiting for your reply. Do you need any other info?'
        });
        resolve(dataStore);
    });
};

var projectinfo = function (dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: 'PlainText',
            text: 'This project is named Ask - Alexa Self-Service Kiosk. We are trying to solve the problems faced by students and staff at the university since change is inevitable. Can I help you with anything else?'
        }).addPrompt({
            promptType: 'PlainText',
            text: 'I am waiting for your reply. Can I help you with anything else?'
        });
        resolve(dataStore);
    });
};
module.exports = intentMatcher;