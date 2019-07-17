/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const createTweetElement = function(tweet) {

  // simplifying the timestamp:
  let timeStamp;
  let timeToday = new Date();
  let timeCreated = tweet.created_at;
  let tweetAge = (Math.floor(timeToday - timeCreated) / 1000 / 60 / 60 / 24);

  if (tweetAge > 365 && tweetAge % 365 !== 0) {
    timeStamp = `${(tweetAge / 365).toFixed(0)} years ${(tweetAge % 365).toFixed(0)} days ago`;
  } else if (tweetAge > 365 && tweetAge % 365 === 0) {
    timeStamp = `${(tweetAge / 365).toFixed(0)} years ago`;
  } else {
    timeStamp = `${(tweetAge).toFixed(0)} days ago`;
  }

  // creating the new article template:
  let $tweet = `
  <article class='tweets'>
  <header>
  <img src=${tweet.user.avatars}>
  <h4 class='name'>${tweet.user.name}</h4>
  <h4 class='userName'>${tweet.user.handle}</h4>
  </header>
  
  <section class='tweet-text'>
  <p>${tweet.content.text}</p>
  </section>
  
  <footer>
  <hr>
  <time>${timeStamp}</time>
  <div class='icons'>
  <img src='/images/flag.png'>
  <img src='/images/cache.png'>
  <img src='/images/favorite.png'>
  </div>
  </footer>
  </article> `;
  
  return $tweet;
};


// appending each new tweet-html-article to the main section:
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.container').append(createTweetElement(tweet));
  }
};


// wrap in 'document.ready' for the tweet sections to render properly:
$(document).ready(function() {
  renderTweets(tweetData);
});




/************* Form Submission Using JQuery *************/

$(document).ready(function() {
  $('#composeTweet').submit(function(event) {
    event.preventDefault();
    
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
    .then(function(data) {
      console.log('post submitted');
    })

  });
});



