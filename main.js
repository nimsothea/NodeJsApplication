/**
 * Scapegoat
 * https://github.com/brentertz/scapegoat
 *
 * Copyright (c) 2014 Brent Ertz
 * Licensed under the MIT license.
 */

var chars = {
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': '\'',
    '&lt;': '<',
    '&gt;': '>'
};

/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */
module.exports = {
    escape: function (html) {
        if (!html) {
            return '';
        }

        var values = Object.keys(chars).map(function (key) {
            return chars[key];
        });
        var re = new RegExp('(' + values.join('|') + ')', 'g');

        return String(html).replace(re, function (match) {
            for (var key in chars) {
                if (chars.hasOwnProperty(key) && chars[key] === match) {
                    return key;
                }
            }
        });
    },
    /**
     * Unescape special characters in the given string of html.
     *
     * @param  {String} html
     * @return {String}
     */
    unescape: function (html) {
        if (!html) {
            return '';
        }

        var re = new RegExp('(' + Object.keys(chars).join('|') + ')', 'g');

        return String(html).replace(re, function (match) {
            return chars[match];
        });
    }
};

var scapegoat = require('scapegoat')
escape = scapegoat.escape,
        unescape = scapegoat.unescape;

var html = '<h1>Hello World</h1>',
        escaped = escape(html),
        unescaped = unescape(escaped);

console.log('html', html, 'escaped', escaped, 'unescaped', unescaped);

/*
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    
    if ('firstname' in params && 'lastname' in params) {
        res.write('Your name is ' + params['firstname'] + ' ' + params['lastname']);
    }
    else {
        res.write('You do have a first name and a last name, don\'t you?');
    }
    
    res.end();
});

server.listen(8080);
*/