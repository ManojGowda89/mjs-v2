import { createApp } from '../mjs/server.config.js';

const { app, PORT } = createApp();


  app.get('/api/hello', (req, res) => {
    const { name } = req.query;
    res.json({ message: 'Hello Manoj Gowsdfsfda ' + name });
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
