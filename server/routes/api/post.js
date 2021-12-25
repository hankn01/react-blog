import express from 'express'

// Model

import Post from '../../models/post'

const router = express.Router()


//api/post
router.get('/', async(req, res)=> {
    const postFindResult = await Post.find() //server가 Post를 모두 찾을 때까지 대기함.
console.log(postFindResult, "All Post Get");
res.json(postFindResult)

})

router.post('/', async(req, res, next) =>{
    try{
        console.log(req, "Request")
        const {title, contents, fileUrl, creator} = req.body
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator,
        });
res.json(newPost);
    } catch(e) {
        console.log(e);
    }
});

export default router;
//export const router = () => {}