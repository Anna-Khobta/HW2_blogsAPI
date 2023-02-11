import express, {NextFunction, Request, Response} from 'express'

import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";

// create express app
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())



app.use('/', blogsRouter)
app.use('/', postsRouter)

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})