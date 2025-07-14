// mjs/server.config.js
import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './mjs.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createApp = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Logging
  app.use(morgan('dev'));

  // Public assets
  app.use(express.static(path.join(__dirname, '../public')));

  let compiler;

  if (process.env.NODE_ENV !== 'production') {
    compiler = webpack(config);

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
      })
    );
    app.use(webpackHotMiddleware(compiler));
  } else {
    // Production build static files
    app.use(express.static(path.join(__dirname, '../dist')));
  }
  // React catch-all
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();

    if (compiler) {
      const fs = compiler.outputFileSystem;
      const filePath = path.join(config.output.path, 'index.html');
      fs.readFile(filePath, (err, result) => {
        if (err) return next(err);
        res.set('Content-Type', 'text/html');
        res.send(result);
      });
    } else {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    }
  });

  return { app, PORT };
};
