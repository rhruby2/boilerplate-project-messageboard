//TODO: encrypt passwords
//TODO: sanitize user input

'use strict';

const { Thread } = require('../schema');
const APIHelper = require('./api-helper');

module.exports = function (app) {


//Sample front-end
app.route('/b/:board/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/board.html');
  });
app.route('/b/:board/:threadid')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/thread.html');
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.route('/api/threads/:board')
  .get(({params: { board }},res) => {
    //TODO: return board with 10 recent thread limit and threads with recent 3 replies limit
    //do not send reported and delete_password
    APIHelper.getBoard(board)
      .then( threads => APIHelper.removeSensitiveData(threads))
      .then( (trimmedThreads) => {
        console.log(trimmedThreads);
        res.json(trimmedThreads);
      })
      .catch(err => console.error(err));
  })
  .post((req,res) => {
    //create new thread
    APIHelper.createThread(req)
      .then(() => {
        //redirect to board of thread
        res.redirect(`/b/${req.params.board}/`);
      })
      .catch(err => console.error(err));
  })
  .put(async ( req, res) => {
    //report thread
    console.log(req.body)
    try{
      const thread = await Thread.findById(req.body.thread_id);
      if(!thread){
        res.send('id not valid');
        return;
      }

      thread.reported = true;
      thread.save();
      console.log(thread);
      res.send('reported');
    }catch(err){
      console.log(err);
      res.send('id not valid');
    }
  })
  .delete((req,res) => {
    //delete thread
    //res.send('id not valid');
    //res.send('incorrect password);
    //res.send('success');
  });
  
app.route('/api/replies/:board')
  .get((req,res) => {
    //res.json
    //if thread_id query, send entire thread with all replies
  })
  .post((req,res) => {
    //res.redirect('/b/'+board+'/'+thread_id);
    //update bumped_on
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
