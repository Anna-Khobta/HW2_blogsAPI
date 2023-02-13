
import {NextFunction, Request, Response} from "express";
import {blogs, blogsRouter} from "../routers/blogs-router";
import {posts} from "../routers/posts-router";


export const checkBlogIDPostID = ((req: Request, res:Response, next:NextFunction) => {

    let findBlogID = blogs.find(p => +p.id === +(req.body.blogId) )

    let findPostID = posts.find(p => +p.id === +req.params.id)

    if (findBlogID) {
        if (findPostID) {
            next()
        } else {
            return res.send(404)
        }
    }
})



