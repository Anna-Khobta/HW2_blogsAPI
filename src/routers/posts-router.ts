
import {NextFunction, Request, Response, Router} from "express";
import {body, check, header, validationResult} from "express-validator";
import {authorizationMiddleware} from "../middlewares/authorization";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

import {blogs, blogsRouter} from "./blogs-router";
//import {deleteAllRouter} from "./delete-all-routers";

export const postsRouter = Router({})

export let posts: any[] = []


const titleValidation = body('title')
    .trim().not().isEmpty().withMessage("The title is empty")
    .isLength({max:10}).withMessage("The maximum length is 30")
// 30

const shortDescriptionValidation = body('shortDescription')
    .trim().not().isEmpty().withMessage("The description is empty")
    .isLength({max:100}).withMessage("The maximum length is 100")

// 100

const contentValidation = body('content')
    .trim().not().isEmpty().withMessage("The content is empty")
    .isLength({max:1000}).withMessage("The maximum length is 1000")
// 1000



const idValidation = body('blogId')
    .trim().not().isEmpty().withMessage("The blogId is empty")


/*
const idContainsValidation = body('blogId')
    .custom((value, {req}) => {
        let findBlogID = blogs.find(p => p.id === +(req.body.blogId) )
        if (!findBlogID) {
            throw new Error("Error with blogID")
        }// Indicates the success of this synchronous custom validator
        return true;
    })
*/


const idContainsValidation = body('blogId')
    .custom((value, {req}) => {
        let findBlogID = blogs.find(p => p.id === +(req.body.blogId) )
        if (!findBlogID) {
            throw new Error("Error with blogID")
        }// Indicates the success of this synchronous custom validator
        return true;
    })



postsRouter.post('/posts',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    (req: Request, res: Response ) => {

        let findBlogID = blogs.find(p => p.id === +(req.body.blogId) ) // вынести отдельно строку? повторяется!
        const newPost = {
            id: new Date(),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: findBlogID?.name!

        }
        posts.push(newPost)
        res.status(201).send(newPost)
    }
)


postsRouter.get('/posts',
    (req: Request, res: Response ) => {
        res.status(200).send(posts)
    })


postsRouter.get('/posts/:id', (req: Request, res: Response ) => {

    let findPostID = posts.find(p => p.id === +req.params.id)

    if (findPostID) {
        return res.status(200).send(findPostID)
    } else {
        return res.send(404)
    }

})


postsRouter.put('/posts/:id',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    (req: Request, res:Response) => {

        let findBlogID = blogs.find(p => p.id === +(req.body.blogId) )

        let findUpdatedPost = posts.find(p => p.id === +req.params.id)

        if (findBlogID) {

        findUpdatedPost.id = +req.params.id,
            findUpdatedPost.title = req.body.title,
            findUpdatedPost.shortDescription = req.body.shortDescription,
            findUpdatedPost.content = req.body.content,
            findUpdatedPost.blogId = req.body.blogId,
            findUpdatedPost.blogName = req.body.blogId?.name!
        posts.push(findUpdatedPost)
        res.status(201).send(findUpdatedPost)
}
        return res.sendStatus(404)
        }
)


postsRouter.delete('/posts/:id',
    authorizationMiddleware,
    (req: Request, res: Response ) => {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === +req.params.id) {
            posts.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

