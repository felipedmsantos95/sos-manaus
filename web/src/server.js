const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'home', 'deploy', 'frontend','sos-manaus' ,'web','build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,'home', 'deploy','frontend','sos-manaus','web','build', 'index.html'));
});

app.listen(9000);
