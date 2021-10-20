import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken';

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).json({
            errorCode: "token.invalid"
        })
    }

    // Bearer 234asd78dSS23473as3s
    // [0] Bearer
    // [1] 234asd78dSS23473as3s
    const [, token] = authToken.split(" ")

    try {

        const {sub} = verify(token, process.env.JWT_SECRET) as IPayload
        req.user_id = sub

        return next()

    } catch (err) {

        return res.status(401).json({errorCode: "token.expired"})
    }
}