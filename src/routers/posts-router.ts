
import {Request, Response, Router} from "express";
import {authorizationMiddleware} from "../middlewares/authorization";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

import {titleValidation, shortDescriptionValidation, contentValidation, idValidation} from "../middlewares/posts-validations";

import {blogs} from "./blogs-router";

export const postsRouter = Router({})

export let posts: any[] = []




postsRouter.post('/posts',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    (req: Request, res: Response ) => {

        let findBlogID = blogs.find(p => +p.id === +(req.body.blogId)) // вынести отдельно строку? повторяется!

        if (findBlogID) {
            const newPost = {
                id: (+(new Date())).toString(),
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId,
                blogName: findBlogID?.name!

            }
            posts.push(newPost)
            res.status(201).send(newPost)
        } else {
            return res.send(404)

        }
    })


postsRouter.get('/posts',
    (req: Request, res: Response ) => {
        res.status(200).send(posts)
    })


postsRouter.get('/posts/:id', (req: Request, res: Response ) => {

    let findPostID = posts.find(p => +p.id === +req.params.id)

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

        let findBlogID = blogs.find(p => +p.id === +(req.body.blogId) )

        let findUpdatedPost = posts.find(p => +p.id === +req.params.id)

        if (findBlogID) {
            if (findUpdatedPost) {
                findUpdatedPost.id = (+req.params.id).toString(),
                    findUpdatedPost.title = req.body.title,
                    findUpdatedPost.shortDescription = req.body.shortDescription,
                    findUpdatedPost.content = req.body.content,
                    findUpdatedPost.blogId = req.body.blogId,
                    findUpdatedPost.blogName = findBlogID?.name!

                posts.push(findUpdatedPost)
                res.sendStatus(204)
            }
        }
        return res.sendStatus(404)
        }
)


postsRouter.delete('/posts/:id',
    authorizationMiddleware,
    (req: Request, res: Response ) => {

        let findPostID = posts.find(p => +p.id === +req.params.id)

            if (findPostID) {
                for (let i = 0; i < posts.length; i++) {
                    if (+posts[i].id === +req.params.id) {
                        posts.splice(i, 1);
                        res.send(204)
                        return;
                    }
                }
            }
    res.send(404)
})

