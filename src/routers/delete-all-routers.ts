import {Request, Response, Router} from "express";
import {blogs} from "./blogs-router";
import {posts} from "./posts-router";

export const deleteAllRouter = Router()
deleteAllRouter.delete('/testing/all-data', (req: Request, res: Response ) => {
    let arr: any[]  = []
    res.send(204)
})

