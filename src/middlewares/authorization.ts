
import {NextFunction, Request, Response} from "express";
import {blogsRouter} from "../routers/blogs-router";

// authorization

export const authorizationMiddleware = ((req: Request, res:Response, next:NextFunction) => {

    // authentication middleware

    const auth = {login: 'admin', password: 'qwerty'} // can change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    }
    res.send(401) // custom message

})


