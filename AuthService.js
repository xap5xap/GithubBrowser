import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';
import * as _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                return cb(err);
            }
            if (!val) {
                return cb();
            }

            let zippedObject={};
            zippedObject[authKey] = val[0][1];
            zippedObject[userKey] = val[1][1];
            if (!zippedObject[authKey]) {
                return cb();
            }
            let authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObject[authKey]
                },
                user: JSON.parse(zippedObject[userKey])
            };
            return cb(null, authInfo);
        });
    }

    login(creds, cb) {
        var b = new Buffer(`${creds.username}:${creds.password}`);
        var encodedAuth = b.toString('base64');
        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
            .then((response) => {
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
                AsyncStorage.multiSet([
                    [authKey, encodedAuth],
                    [userKey, JSON.stringify(results)]
                ], err => {
                    if (err) {
                        throw err;
                    }
                    return cb({ success: true })

                });

            })
            .catch((err) => {
                return cb(err);
            });

    }
}

module.exports = new AuthService();