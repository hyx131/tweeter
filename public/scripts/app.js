/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
    $('.post-list').prepend(createTweetElement(tweet));
  }
};




/************* Form Submission Using JQuery *************/

$(document).ready(function() {
  $('#compose-tweet').submit(function(event) {
    event.preventDefault();

    if(($('textarea').val()).length === 0) {
      alert(`Cannot tweet an empty hum!`);
    } else if (($('textarea').val()).length > 140) {
      alert(`Too long of a hhhhuuummmmmm!`);
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()
      })
      .then(function(data) {
        $('textarea').val(''); //REMINDER: empty out the textarea and reset the counter once the data has been successfully sent to server
        $('.counter').text(140);
        loadtweets(renderTweets); //REMINDER: call GET funtion here to render the page view
      })
    }
    
  });
});



/************* Get Request Using Ajax & JQuery *************/

const loadtweets = function(cb) {
  $(document).ready(function() {
    $.ajax('/tweets', {
      method: 'GET'
    })
    .then(function(data) {
      $('.post-list').html(''); //REMINDER: empty out the tweet container after successfull GET of the data, but before rendering the data bacause data in this case includes the entire tweet history, not emptying it out will cause replications of posts on the page
      cb(data);
    })
  })
};

$(document).ready(function() {
  loadtweets(renderTweets);
});
