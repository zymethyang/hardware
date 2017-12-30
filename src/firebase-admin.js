const admin = require('firebase-admin');
var firebase = require("firebase");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "admin-e8a7b",
    clientEmail: "firebase-adminsdk-lq742@admin-e8a7b.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAEoKk5ubB9pWP\nvHpmdRU0xuTfiX1cUZQYjKmb7r70rVgnRhffPsWUC6MYaJ8ZAGgmRJL9XZXt3hI4\nX5tOrQZw+CZSJGAm7+aVtHkWTWHd3/2xhy8qMcg3w+/h2TP81assGH7613zJedFh\nII7thp36328ghA22TRrTOnKf6atmg3G0FLBaXeMVYWGkZGQBvYq0XAQeGOcZaDr5\njnWAbqykyd6iRbOTR2X2TLeDA5WiE01kmi9WfCgxxTGyjUX35TWOROE5sDOZQEpW\nphUxYSSnV8PBO3keC5r/1qzqwqt085xNET6I3gHy7zT6IqidAUnRy8T10Ge8GRna\npmpvMUfzAgMBAAECggEADhmNw6M7r2N1qT6R0bGoo94x8QL70+odMAwra0oEdJvB\nC+kGWZoXEP4ls+YCP+iavKxuCfFzzyltNvw1v3nOLj7ZOVB4SoNz7ut3tB5sH8iQ\nrBabbMKIyyc0FeVG/rmEvlDyCWIGRBgQOcwVEfS+5iq+0qk/BHH2lSkGPxz9OyIs\nP3Y74JnT5E4P1Ar7PVPRcVfTqQ3pAlqySrpeznY2ZMMmTOYfCuiwnOwIxd5l/Npq\nG5U6zU3xwZowGn3bV9kJlP01adowgQHpbNmHW8kOwXgI7p1FUn+wBx/SQ10N4ZZY\nPxR4CNaSghl+6IYr3NMWhfen6j6GiJa5DAlw6VDPWQKBgQD9Q9z569mdrE+ktyYe\npOFhZ773RaUdiEfXJMaSJot4zcAU8UI1EElONK4DO+5ovBokYEtWfmy5mw7lRuvb\nzuvtu6TdDBjvBF0VR8eulSRO7oevWKB/UqbP42PKV7X2pRcekvmALJHuXMSmABHX\nrZ4edebvryQLFv3lgJUwGuuEXQKBgQDCJXuy4BXibiB4cCdEws9ZgA327cJ7z5zD\niS92VHV9AcqRw4I/MENYpEQZ+ER86jVzaA+3xXMlm1gu57i65b9dGxwwtnjCQaSN\n7w0AvzqEmYkgqnhkSGMCaGOy/lww64Tp/VBau4Nl3m1Wn/l9LjuPxBJ+pzqAV/1E\nD91ZeIY4jwKBgQCDNr+r9BeA6x8wNXtYcRAbyQZVUg3jqRGfU3xViAbGhcK4lu44\nU8HG9OAa6NfyB1J7+i/OFh36Y21qOD5GWYQ+XPNjWrsoSlh3iALaXoa7JjXCEObG\nUGoAVs0CrkKmEI5T1s3RLEZG+mUfo/WaimbbXTZSg6jm3fiZCO9CRxAyOQKBgAp4\nFvmIV+XD5oBYG+X7U08SNq6QF6KxiVSJ+0M4PrWk+RVvI4Dgy2DmSr3Tw22w+3zj\nqaVRQmpOvCybVjzN0snkglqmHFDtVUBKGbtmlHM+DET0rFVMCfrBQk8OpE4HBT3Q\n6RpbbjR6EA9RxRRY/+E6w3yM6/yrwf5/lIIUm7hFAoGAeN3YpNlCRMHhnbLs2l79\n+dh6st1EINKiXtwaMkZOtydarhhyRXQ3cqN7uKMFItzGj+BDeN6WkRabqIMJlm0b\nJ9Qh3k1NLjKKpLjQgODS4sQSEhKm71SS+EM0BJVKARC5dknE7XDCqvsiR1m9K09V\nWD3vUL6KrmDsZY1pPm7qstk=\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://admin-e8a7b.firebaseio.com"
});

module.exports = admin;

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyCIIHryAuKXee04I8YuXTffFZd262msz_g",
  authDomain: "admin-e8a7b.firebaseapp.com",
  databaseURL: "https://admin-e8a7b.firebaseio.com",
  storageBucket: "admin-e8a7b.appspot.com"
};
firebase.initializeApp(config);
module.exports = firebase;

console.log('Firebase Admin Initialized');


