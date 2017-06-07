import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';
import * as _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                console.log('err multiget', err);
                return cb(err);
            }
            if (!val) {
                return cb();
            }
            console.log('val[0]', val[0]);
            console.log('val[1]', val[1]);

            let zippedObject={};
            zippedObject[authKey] = val[0][1];
            zippedObject[userKey] = val[1][1];
            console.log('zippedObject', zippedObject);
            if (!zippedObject[authKey]) {
                return cb();
            }
            let authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObject[authKey]
                },
                user: JSON.parse(zippedObject[userKey])
            };
            console.log('va a llamr', authInfo);
            return cb(null, authInfo);
        });
    }

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
                AsyncStorage.multiSet([
                    [authKey, encodedAuth],
                    [userKey, JSON.stringify(results)]
                ], err => {
                    if (err) {
                        console.log('err', err);
                        throw err;
                    }
                    return cb({ success: true })

                });

            })
            .catch((err) => {
                console.log('logon failed: ' + err);
                return cb(err);
            });

    }
}

module.exports = new AuthService();