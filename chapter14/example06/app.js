var app = require('express').createServer()
, twitter = require('ntwitter')
, io = require('socket.io').listen(app)
, love = 0
, hate = 0
, total = 0

app.listen(3000);

var twit = new twitter({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token_key: 'YOUR_ACCESS_TOKEN_KEY',
  access_token_secret: 'YOUR_ACCESS_TOKEN_KEY'
});

twit.stream('statuses/filter', { track: ['love', 'hate'] }, function(stream) {
  stream.on('data', function (data) {
    if (data.text) { 
      if (data.text.indexOf('love') != -1) {
        love++
        total++
        if ((love % 82) == 0){
          io.sockets.volatile.emit('lover', { 
            user: data.user.screen_name, 
            text: data.text,
            avatar: data.user.profile_image_url_https
          });
        }
      }
      if (data.text.indexOf('hate') != -1) {
        hate++
        total++
        if ((hate % 18) == 0){
          io.sockets.volatile.emit('hater', { 
            user: data.user.screen_name, 
            text: data.text,
            avatar: data.user.profile_image_url_https
          });
        }
      }
      io.sockets.volatile.emit('percentages', { 
        love: (love/total)*100,
        hate: (hate/total)*100
      });
    }
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

