import {Request, Response, Router} from "express";
import {blogs} from "./blogs-router";
import {posts} from "./posts-router";

export const deleteAllRouter = Router()

let arr: any[]  = []
deleteAllRouter.delete('/testing/all-data', (req: Request, res: Response ) => {
    arr = []
    res.sendStatus(204)
})

