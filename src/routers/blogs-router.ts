import {Request, Response, Router} from "express";
import {authorizationMiddleware} from "../middlewares/authorization";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

import {nameValidation, descriptionValidation, websiteUrlValidation} from "../middlewares/blogs-validations";

export const blogsRouter = Router({})

export let blogs: any[] = []


blogsRouter.get('/blogs',
    (req: Request, res: Response ) => {
    res.status(200).send(blogs)
})

blogsRouter.post('/blogs',
    authorizationMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response ) => {

        const newBlog = {
            id: (+(new Date())).toString(),
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl

        }
        blogs.push(newBlog)
        res.status(201).send(newBlog)
    }
)

blogsRouter.get('/blogs/:id', (req: Request, res: Response ) => {

    let findBlog = blogs.find(p => +p.id === +req.params.id)

    if (findBlog) {
        return res.status(200).send(findBlog)
    } else {
        return res.send(404)
    }

})

blogsRouter.put('/blogs/:id',
    authorizationMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res:Response) => {

        let findBlog = blogs.find(p => +p.id === +req.params.id)

        if (!findBlog) {
            return res.sendStatus(404)
        } else {
            findBlog.id = (+req.params.id).toString(),
                findBlog.name = req.body.name,
                findBlog.description = req.body.description,
                findBlog.websiteUrl = req.body.websiteUrl
            blogs.push(findBlog)
            return res.send(204)
        }
    })

blogsRouter.delete('/blogs/:id',
    authorizationMiddleware,
    (req: Request, res: Response ) => {
    for (let i = 0; i < blogs.length; i++) {
        if (+blogs[i].id === +req.params.id) {
            blogs.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})
