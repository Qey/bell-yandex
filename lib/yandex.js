// Load modules


// Declare internals

var internals = {};


exports = module.exports = function (options) {

    return {
        protocol: 'oauth2',
        auth: 'https://oauth.yandex.ru/authorize',
        token: 'https://oauth.yandex.ru/token',
        scope: [],
        scopeSeparator: ',',
        headers: { 'User-Agent': 'hapi-bell-ya' },
        profile: function (credentials, params, get, callback) {

            var query = {
                oauth_token: params.access_token
            };

            get('https://login.yandex.ru/info', query, function (profile) {
                credentials.profile = {
                    id: profile.id,
                    displayName: profile.real_name,
                    name: {
                        first: profile.first_name,
                        last: profile.last_name
                    },
                    email: profile.default_email,
                    raw: profile
                };

                return callback();
            });
        }
    };
};
