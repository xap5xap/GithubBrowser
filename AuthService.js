import { Buffer } from 'buffer';

class AuthService {
    login(creds, cb) {
        var b = new Buffer(`${creds.username}:${creds.password}`);
        var encodedAuth = b.toString('base64');
        console.log('encodedAuth', encodedAuth);
        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
            .then((response) => {
                console.log('response', response);
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                console.log('results', results);
                return cb({ success: true })
            })
            .catch((err) => {
                console.log('logon failed: ' + err);
                return cb(err);
            });

    }
}

module.exports = new AuthService();