import {Request, Response, Router} from "express";


let blogs: any[] = [{
    "id": 1,
    "name": "Anna",
    "description": "something",
    "websiteUrl": "string"
}]

const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
let error: { errorsMessages: any[] } = {errorsMessages: []}

export const blogsRouter = Router({})

blogsRouter.get('/blogs', (req: Request, res: Response ) => {
    res.status(200).send(blogs)
})

blogsRouter.post('/blogs', (req: Request, res: Response ) => {

    let elemRes = req.body.availableResolutions
    const hasAllElems = elemRes.every( (elem:any) => resolutions.includes(elem) )

    if (error.errorsMessages.length > 0) {
        error.errorsMessages.splice(0, error.errorsMessages.length)
    }
    if (!req.body.title || req.body.title.length > 40 ) {
        error.errorsMessages.push({
            "message": "The title is wrong.",
            "field": "title"
        })
    }
    if (!req.body.author || req.body.author.length > 20) {
        error.errorsMessages.push({
            "message": "The author is wrong.",
            "field": "author"
        })
    }
    if (hasAllElems === false) {
        error.errorsMessages.push({
            "message": "The availableResolutions is wrong.",
            "field": "availableResolutions"
        })
    }

    if (error.errorsMessages.length > 0)
        return res.status(400).send(error)

    else {
        const newlyCreatedVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: (new Date().toISOString()),
            publicationDate: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
            availableResolutions: req.body.availableResolutions
        }
        blogs.push(newlyCreatedVideo)
        res.status(201).send(newlyCreatedVideo)
    }
})

blogsRouter.get('/blogs/:id', (req: Request, res: Response ) => {

    let findVideo = blogs.find(p => p.id === +req.params.id)

    if (findVideo) {
        return res.status(200).send(findVideo)
    } else {
        return res.send(404)
    }

})

blogsRouter.put('/blogs/:id', (req: Request, res:Response) => {
    let findVideo = blogs.find(p => p.id === +req.params.id)

    let elemRes = req.body.availableResolutions
    const hasAllElems = elemRes.every( (elem:any) => resolutions.includes(elem) );

    if (error.errorsMessages.length > 0) {
        error.errorsMessages.splice(0, error.errorsMessages.length)
    }

    if (findVideo) {
        if (!req.body.title || req.body.title.length > 40) {
            error.errorsMessages.push({
                "message": "The title is wrong",
                "field": "title"
            })
        }
        if (!req.body.author || req.body.author.length > 20) {
            error.errorsMessages.push({
                "message": "The author is wrong.",
                "field": "author"
            })
        }
        if (hasAllElems === false) {
            error.errorsMessages.push({
                "message": "The availableResolutions is wrong.",
                "field": "availableResolutions"
            })
        }
        if (req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1) {
            error.errorsMessages.push({
                "message": "The minAgeRestriction is wrong.",
                "field": "minAgeRestriction"
            })
        }
        if (typeof req.body.canBeDownloaded === 'string') {
            error.errorsMessages.push({
                "message": "The canBeDownloaded is wrong.",
                "field": "canBeDownloaded"
            })
        }
        if (typeof req.body.publicationDate === 'number') {
            error.errorsMessages.push({
                "message": "The publicationDate is wrong.",
                "field": "publicationDate"
            })
        }
        if (error.errorsMessages.length > 0)
            return res.status(400).send(error)


        else {
            findVideo.id = +req.params.id,
                findVideo.title = req.body.title,
                findVideo.author = req.body.author,
                findVideo.canBeDownloaded = req.body.canBeDownloaded || findVideo.canBeDownloaded,
                findVideo.minAgeRestriction  = req.body.minAgeRestriction || findVideo.minAgeRestriction,
                findVideo.createdAt  = findVideo.createdAt || findVideo.minAgeRestriction,
                findVideo.publicationDate  = req.body.publicationDate || findVideo.publicationDate,
                findVideo.availableResolutions  = req.body.availableResolutions || findVideo.availableResolutions
            blogs.push(findVideo)
            res.sendStatus(204)
        }
    }
    return res.sendStatus(404)
})

// через find index, delete
blogsRouter.delete('/blogs/:id', (req: Request, res: Response ) => {
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === +req.params.id) {
            blogs.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

blogsRouter.delete('/testing/all-data', (req: Request, res: Response ) => {
    blogs.splice(0, blogs.length)
    res.send(204)
})