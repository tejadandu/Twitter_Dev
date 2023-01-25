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
    // const tweet = await tweetRepo.getAll(2, 4);
    // console.log(tweet[1].contentWithEmail);
    const tweet = await tweetRepo.create({content: 'With hooks'});
    console.log(tweet);
});
