import express from 'express';
import { connect } from './config/database.js'
import bodyParser from 'body-parser';

import apiRoutes from './routes/index.js';

import { UserRepository, TweetRepository} from './repository/index.js';
import LikeService from './services/like-service.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.listen(3000, async () =>{

    console.log('Server started');
    await connect();
    console.log('Mongodb connected');

    const userRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    const tweets = await tweetRepo.getAll();
    const users = await userRepo.getAll();
    // const user = await userRepo.create({
    //     email: 'teja.dandu@gmail.com',
    //     password: '123456',
    //     name: 'Teja'
    // });
    const likeService = new LikeService();
    await likeService.toggleLike(tweets[0].id, 'Tweet', users[0].id);


});
