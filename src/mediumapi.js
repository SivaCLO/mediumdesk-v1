'use strict';
const httpTransport = require('https');

const authorId = 'xxx';
const authToken = 'xxx';

exports.publish = (title, content, contentFormat, tags, callback) => {
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.medium.com',
        port: '443',
        path: '/v1/users/' + authorId + '/posts',
        method: 'POST',
        headers: {
          "Accept-Charset":"utf-8",
          "Authorization":"Bearer " + authToken,
          "Content-Type":"application/json",
          "Accept":"application/json"
        }
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';

        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ?
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

            callback(null, res.statusCode, res.headers, responseStr);
        });

    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });

		const body = {
			"contentFormat": contentFormat,
			"title": title,
			"content": content,
			"tags": tags,
			"publishStatus": "draft"
		};

    request.write(JSON.stringify(body));
    request.end();
};
