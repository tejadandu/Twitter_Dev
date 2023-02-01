import {TweetRepository, HashtagRepository} from '../repository/index.js'

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g)
        tags = tags.map((tag) => tag.substring(1)); // this regex extracts hashtags
        const tweet = await this.tweetRepository.create(data);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = tags.filter(tag => !alreadyPresentTags.includes(tag));
        let newTags = titleOfPresentTags.map(tag => {
            return {
                title:tag, tweets:[tweet.id]
            }
        });
        await this.hashtagRepository.bulkCreate(newTags);

        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        // todo create hashtags and added here
        /*
        * 1. bulkcreate in mongoose
        * 2. filter title of hashtag based on multiple tags
        * 3. how to add tweet id inside the all the hashtags
        * 4.
        */
        return tweet;

    }
}

export default TweetService;
