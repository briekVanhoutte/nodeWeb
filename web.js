var http = require('http'); // Import Node.js core module


var server = http.createServer(function (req, res) {   
    if (req.url == '/') { 
        
        res.writeHead(200, { 'Content-Type': 'text/html' });   
        res.write('<html><body><p>' );
        let rawData = ''

        http.get('http://product-service/',(resp) => {
            
            resp.on('data', chunk => {
                rawData += chunk
            })
            
            resp.on('end', () => {
                const parsedData = JSON.parse(rawData)
                res.write(parsedData.products.join());
                res.write('</p></body></html>');
                res.end();
            })
        });
    }
    else
        res.end('Invalid Request!');
});

server.listen(8080); 