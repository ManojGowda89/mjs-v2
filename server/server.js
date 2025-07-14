import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../app/webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
let compiler; 
if (process.env.NODE_ENV !== 'production') {
  compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(compiler));
}


app.get('/api/hello', (req, res) => {
console.log(process.env.PORT)
    const { name } = req.query;
  res.json({ message: 'Hello sdsfsdfdffrom backensdfd'+ name  });

});


app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();

  if (compiler) {
    const fs = compiler.outputFileSystem;
    const filePath = path.join(config.output.path, 'index.html');
    fs.readFile(filePath, (err, result) => {
      if (err) return next(err);
      res.set('content-type', 'text/html');
      res.send(result);
    });
  } else {
    // For production - serve from actual file system
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
