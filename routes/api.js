'use strict';

const APIHelper = require('./api-helper');

module.exports = function (app) {
  
app.route('/api/threads/:board')
  .get(({params: { board }},res) => {
    //return board with 10 recent thread limit and threads with recent 3 replies limit
    APIHelper.getBoard(board)
      .then((threads) => {
        res.json(threads);
      })
      .catch((err) => {
        console.error(err);
      })
    //res.json
  })
  .post((req,res) => {
    //create new thread
    //redirect to board of thread
    res.redirect(`/b/${req.params.board}`);
  })
  .put((req,res) => {
    //res.send('id not valid');
    //res.send('reported');
  })
  .delete((req,res) => {
    //res.send('id not valid');
    //res.send('success');
  });
  
app.route('/api/replies/:board')
  .get((req,res) => {
    //res.json
  })
  .post((req,res) => {
    //res.redirect('/b/'+board+'/'+thread_id);
  })
  .put((req,res) => {
    //res.send('id not valid');
    //res.send('success');
  })
  .delete((req, res) => {
    //res.send('id not valid');
    //res.send('success');
  });

};
