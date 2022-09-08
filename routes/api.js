//TODO: encrypt passwords
//TODO: sanitize user input

'use strict';

const { Thread, Reply, Parent, Child } = require('../schema');
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
  //.get(({params: { boardName }}, res) => {
  .get( (req, res) => {
    APIHelper.getBoard(req.params.board)
    //TODO: removing sensitive data not working
      .then( threads => APIHelper.removeSensitiveDataFromArray(threads))
      .then( (threads) => {
        return threads.map((thread) => {
          const replies = thread.replies;
          thread.replies = APIHelper.removeSensitiveDataFromArray(replies);
          console.log(thread.replies[0])
          return thread;
        })
      })
      .then( (trimmedThreads) => {
        console.log(trimmedThreads);
        res.json(trimmedThreads);
      })
  })
  .post((req, res) => {
    //create new thread
    APIHelper.createThread(req)
      .then(() => {
        //redirect to board of thread
        res.redirect(`/b/${req.params.board}/`);
      })
      .catch(err => console.error(err));
  })
  .put( async (req, res) => {
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
    }
  })
  //TODO:
  .delete(async (req,res) => {
    //delete thread
    //res.send('id not valid');
    //res.send('incorrect password);
    //res.send('success');
    try{
      const thread = await Thread.findById(req.body.thread_id);
      if(!thread){
        res.send('id not valid');
        return;
      }

      if(thread.delete_password === req.body.delete_password){
        thread.remove();

        res.send('success');
        return;
      } else {
        res.send('incorrect password');
      }
    }
    catch{
      console.log(err);
    }
  });
  
app.route('/api/replies/:board')
  /**
   * view a single thread with all replies
   */
  .get(async (req,res) => {
    console.log(req.query);
    //if thread_id query, send entire thread with all replies
    await Thread.findById(req.query.thread_id)
      .then((thread) => APIHelper.removeSensitiveData(thread))
      .then((thread) => {
        //TODO: not working
        thread.replies = APIHelper.removeSensitiveDataFromArray(thread.replies)
        return thread;
      })
      .then((trimmedThreads) => {
        console.log(trimmedThreads);
      })
  })
  /**
   * create new reply
   */
  //TODO: try to use findOneAndUpdate()
  .post(async (req,res) => {
    console.log(req.params);
    console.log(req.body); //thread_id, text, delete_password
    
    const newReply = APIHelper.createReply(req);
    console.log(newReply);

    const currentThread = await Thread.findById(req.body.thread_id);
    currentThread.bumped_on = new Date().toISOString();
    //save reply to beginning of array
    currentThread.replies.unshift(newReply);
    currentThread.replycount = currentThread.replies.length;
    await currentThread.save();
    
    //redirect page to full thread page
    res.redirect('/b/'+req.params.board+'/'+req.body.thread_id);
  })
  /**
   * reporting a reply
   */
  .put((req,res) => {
    //res.send('id not valid');
    
    //res.send('success');
  })
  /**
   * deleting a reply
   */
  .delete((req, res) => {
    //res.send('id not valid');
    //res.send('success');
  });

};
