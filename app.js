var googleapis = require('googleapis');
// var config = require('./config.js');
var app = require('express')();

// var CLIENT_ID = config.CLIENT_ID;
//   CLIENT_SECRET = config.CLIENT_SECRET,
//   REDIRECT_URL = config.REDIRECT_URL,
//   SCOPE = config.SCOPE,
//   REFRESH_TOKEN = config.REFRESH_TOKEN,
//   BLANK_FILE_ID = config.BLANK_FILE_ID;

// var auth = new googleapis.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

app.get('/', function (req, res) {
    res.send('hello world');
    //createDoc(res);
  });

app.listen(8080);

function createDoc(res) {
  googleapis.discover('drive', 'v2').execute(function (err, client) {
    auth.credentials = {
      refresh_token: config.REFRESH_TOKEN
    };

    client.drive.files
      .copy({
        title: 'New Post',
        fileId: BLANK_FILE_ID
      })
      .withAuthClient(auth).execute(function (err, doc) {
        if (err) {
          console.log("success!");
          res.send(ERROR_URL);
        } else {
          var newLink = doc["alternateLink"];
          var newFileId = doc["id"];
          updatePermissions(client, auth, newFileId, function() {res.send(newLink);});
        }
      });
  });
}

function updatePermissions(client, auth, fileId, callback) {
  var body = {
    'type': "anyone",
    'role': "writer"
  };
  var request = client.drive.permissions.insert(
    {'fileId': fileId},
    body
  );
  request.withAuthClient(auth).execute(function() {
    callback();
  });
}
