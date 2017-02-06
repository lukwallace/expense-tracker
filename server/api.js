module.exports = (app) => {
  //Testing
  app.get('/', (req, res) => {
    res.json({data: 'Hello from the backend!'});
  });
};