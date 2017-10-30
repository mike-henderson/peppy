var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || '';
var rtm = new RtmClient(bot_token);
var bot = {};

var slides = Array(
  "https://mike-henderson.github.io/peppy/assets/pep-amazing-work.png",
  "https://mike-henderson.github.io/peppy/assets/pep-arent-alone.png",
  "https://mike-henderson.github.io/peppy/assets/pep-be-the-lynchpin.png",
  "https://mike-henderson.github.io/peppy/assets/pep-best-we-can.png",
  "https://mike-henderson.github.io/peppy/assets/pep-chase-something-matters.png",
  "https://mike-henderson.github.io/peppy/assets/pep-cocky.png",
  "https://mike-henderson.github.io/peppy/assets/pep-context-helpful.png",
  "https://mike-henderson.github.io/peppy/assets/pep-control-control.png",
  "https://mike-henderson.github.io/peppy/assets/pep-control-react.png",
  "https://mike-henderson.github.io/peppy/assets/pep-expert.png",
  "https://mike-henderson.github.io/peppy/assets/pep-face-to-face.png",
  "https://mike-henderson.github.io/peppy/assets/pep-forgiveness-later.png",
  "https://mike-henderson.github.io/peppy/assets/pep-get-beat.png",
  "https://mike-henderson.github.io/peppy/assets/pep-get-out-of-way.png",
  "https://mike-henderson.github.io/peppy/assets/pep-give-a-crap.png",
  "https://mike-henderson.github.io/peppy/assets/pep-grass-greener.png",
  "https://mike-henderson.github.io/peppy/assets/pep-great-communication.png",
  "https://mike-henderson.github.io/peppy/assets/pep-nobody-half-truth.png",
  "https://mike-henderson.github.io/peppy/assets/pep-outlet.png",
  "https://mike-henderson.github.io/peppy/assets/pep-own-medicine.png",
  "https://mike-henderson.github.io/peppy/assets/pep-people-in-this-room.png",
  "https://mike-henderson.github.io/peppy/assets/pep-permission-fail.png",
  "https://mike-henderson.github.io/peppy/assets/pep-prep-adaptable.png",
  "https://mike-henderson.github.io/peppy/assets/pep-spirt-animal.png",
  "https://mike-henderson.github.io/peppy/assets/pep-stick.png",
  "https://mike-henderson.github.io/peppy/assets/pep-surprises.png",
  "https://mike-henderson.github.io/peppy/assets/pep-winging-it.png",
  "https://mike-henderson.github.io/peppy/assets/pep-you-got-this.png"
);
/**
    Subscribe to authentication event. If you receive this event your bot has been successfully authenticated.
    Couple of useful information can be found in the callback data. In particular your bot's ID and NAME.
*/
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    let self = rtmStartData.self;
    bot.id = self.id;
    bot.name = self.name
    console.log(`Logged in as ${bot.name} of team ${rtmStartData.team.name}`);
});

/**
    Subscribe to all messages in all channels your bot is invited to and direct messages sent to your bot.
    Note that this does not include checking whether a user send a message to your bot.
    For instance it does to check if the message mentions your bot's name.
*/
rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    var text = " " + message.text;
    if(text.includes("pep")){
      var slide = slides[Math.floor(Math.random()*slides.length)];
      rtm.sendMessage(`${slide}`, message.channel);
    }
    
});

rtm.start();