const {Thread, Reply} = require('../schema');

class apiHelper {
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
        console.log('getBoard()');
        //insertion order is not a reliable sort, therefore defining sort
        return this.getMockThreads();
        //return await Thread.find({board: boardName}).sort({bumped_on: 'desc'}).limit(10).exec();
    }

    
    static createThread = (req) => {
        
    }
}

module.exports = apiHelper;