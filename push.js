var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey":"BKRE1XrF7bTHCUpzyp7fAZql6u4rmJ5I5tgdDAK7j1s5nzxPdZAX2-LfumCNI_7_SkMg-Gk-pdp5UA2uFnKiEbI",
   "privateKey":"mF0y0Ihz2LT1WapbY2D_xbpfggtkoO3V1yZflODPpK4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dVdoevLxqfk:APA91bF1LgBIcKu4JmWVpiZwtN-uUIrNJ_FfwmDzbxmRIJkOIHENhPWZSTq17tF4S9q9nANP_0gj40Fpl7CdsVDgg2-bY9kokwCFwkvSEf8JymfaWgqJf1O4t4RyPEvODQfHh5gSJYkr",
   "keys": {
       "p256dh": "BB1mD++6VyJXwwQkAEB2epevBBVbYW19IHYvcYnL+svzVo/ChCGck+bG15MeXxcDg1of+rgy6lI/aDZQn5zkUhU=",
       "auth": "FVhONK7LYyEDpXMiSgUodg=="
   }
};
var payload = 'Selamat Datang di Aplikasi Sepak Bola Liga Inggris';
 
var options = {
   gcmAPIKey: '489407451958',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);