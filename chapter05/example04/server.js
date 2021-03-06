var http = require('http')
, url = require('url');

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  switch(pathname) {
    case '/':
      res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Home Page\n')
    break;
    case '/about':
      res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('About Us\n')
    break;
    case '/redirect':
      res.writeHead(301, {
      'Location': '/'
    });
    res.end();
    break;
    default:
      res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('Page not found\n')
  }
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');
