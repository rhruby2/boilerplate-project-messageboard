const {Thread, Reply} = require('../schema');

class apiHelper {
    /**
     * 
     * @param {[Thread] | [Reply]} arr 
     * @return {[Object]}
     */
    static removeSensitiveData = (model) => {
        console.log(typeof model);
        let obj = model;
        //nested Reply models in Thread models are already converted into Objects
        if(typeof model !== 'object'){
            obj = model.toObject();
        }
        delete obj.delete_password;
        delete obj.reported;
  
        return obj;
    }

    static removeSensitiveDataFromArray = (arr) => {
        return arr.map((model) => {
            return this.removeSensitiveData(model);
        });
    }
    /**
     * @returns {[Thread]} Thread documents
     */
    static getMockThreads = () => {
        return [
            {
                _id: "t00",
                board: "general",
                text: "mock thread text",
                created_on: new Date(Date.now()).toISOString(),
                bumped_on: new Date(Date.now()).toISOString(),
                reported: false,
                replycount: 2,
                replies: [
                    {
                        _id: "r00",
                        text: "mock reply text",
                        delete_password: "r00",
                        created_on: new Date(Date.now()).toISOString(),
                        reported: false
                    },
                    {
                        _id: "r01",
                        text: "mock reply text",
                        delete_password: "r00",
                        created_on: new Date(Date.now()).toISOString(),
                        reported: false
                    }
                ],
                delete_password: "t00"
            },
            {
                _id: "t01",
                board: "general",
                text: "mock thread text",
                created_on: new Date(Date.now()).toISOString(),
                bumped_on: new Date(Date.now()).toISOString(),
                reported: false,
                replycount: 2,
                replies: [
                    {
                        _id: "r00",
                        text: "mock reply text",
                        delete_password: "r00",
                        created_on: new Date(Date.now()).toISOString(),
                        reported: false
                    },
                    {
                        _id: "r01",
                        text: "mock reply text",
                        delete_password: "r00",
                        created_on: new Date(Date.now()).toISOString(),
                        reported: false
                    }
                ],
                delete_password: "t01"
            }
        ]
    }

    /**
     * 
     * @param {[Thread]} thread Thread documents
     * @returns {[Thread]} Thread documents
     */
    static modifyThreads = (threads) => {
        //change all dates to UTC Strings
        return threads.map((thread) => {
            thread.date = new Date(thread.date).toISOString();
            thread.replies.map((reply) => {
                reply.created_on = new Date(reply.created_on).toISOString();
                return reply;
            });
            return thread;
        })
    }

    static getBoard = async (boardName) => {
        //mongoose returns in insertion order which is not a reliable sort, therefore defining sort
        //console.log("api-helper.js/getBoard(): returning Mock Threads");
        //const threads = await Thread.find({board: boardName}).sort({bumped_on: 'desc'}).limit(10).exec();
        //console.log(threads);
        return await Thread.find({board: boardName}).sort({bumped_on: 'desc'});

        //for each thread, get 3 most recent replies
        //return this.getMockThreads();
    }
   
    static createThread = async (req) => {
        const newThread = await Thread.create({
            board: req.body.board || req.params.board,
            text: req.body.text,
            delete_password: req.body.delete_password
        })

        return newThread;
    }

    //TODO:
    static createReply = (req) => {
        const newReply = new Reply({
            //thread_id, text, delete_password
            thread_id: req.body.thread_id,
            text: req.body.text,
            delete_password: req.body.delete_password,
        });

        return newReply;
    }
}

module.exports = apiHelper;