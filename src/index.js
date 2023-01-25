const express = require('express');
const connect = require('./config/database');


const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

app.listen(3000, async () =>{

    console.log('Server started');
    await connect();
    console.log('Mongodb connected');
    // const tweet = await Tweet.create({
    //     content: 'Fourth tweet',

    // });
    // const tweets = await Tweet.find({userEmail: 'a@b.com'});
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getWithComments('63d0c1462d84b7d00877f5d2');
    console.log(tweet);


});
