const express = require('express');
const connect = require('./config/database');


const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');
const Tweet = require('./models/tweet');

app.listen(3000, async () =>{

    console.log('Server started');
    await connect();
    console.log('Mongodb connected');

    const tweets = await Tweet.find({
        content: ['1234567']
    });
    console.log(tweets);
});
