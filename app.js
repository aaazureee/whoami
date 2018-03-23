import express from 'express';

const app = express();
app.enable('trust proxy');
const regex = /\(.+?\)/; // find word in brackets

app.get('/', (req, res) => {
  let info = {};
  const userAgent = req.get('User-Agent');
  info['ip-address'] = req.ip;
  info.language = req.get('Accept-Language').match(/.+?,/)[0].replace(',', ''); // remove ,
  info.os = userAgent.match(regex)[0].replace(/\(|\)/g, ''); // remove brackets
  res.send(info);
});

app.use((req, res) => {
  res.status(404);
  res.send('404 Not Found.');
});

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log(`Express App is running on port ${listener.address().port}`)
);

