var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var message;
var filename;

http.createServer(function(req, res){
    if(req.url == '/'){
        fs.readFile('./index.html', null , function(err, data){
            if(err) {
                res.writeHead(404);
                res.write('File not Found');
            } else {
                res.write(data);
            }
            res.end();
        })
        fs.readFile('./test.txt', function(err, data){
            if(err) console.log(err);
            else {
                console.log(data.toString());
            }
        })
        if(req.method == 'POST', res){
            var body = '';
            var post = '';
            req.on('data', function(data){
                body += data;
                message = qs.parse(body);
                message = message.text;

                // return message;
                // fs.writeFile('./test.txt', post , function(err){
                //     if(err){
                //         return console.log(err);
                //     }
                //     console.log('File saved');
                // })
            })
        }
    }

    if(req.url == '/download'){
        filename = message.slice(0,5);
        res.writeHead(200, {'Content-Type': 'text/document', 'Content-Disposition': 'attachment; filename='+ filename +'.txt'});
        console.log('###### /download ######3', message);
        res.write(message);
        res.end();
        console.log('Download');
    }

    if(req.url == '/upload'){
        if(req.method == 'POST'){
            var body = '';
            req.on('data', function(data){
                body += data;
                var x = body.length - 46;
                body = body.slice(142, x);
                console.log('############### Data ##########', body);
                res.writeHead(200)
                res.end(body);
            })
        }
    }
}).listen(2000);

console.log('server running');