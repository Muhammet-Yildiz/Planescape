import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

const getDestinations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("destination page : ",req.query.page)
   
   const url = `${process.env.FLIGHTS_API_URL}/destinations?page=${req.query.page}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'ResourceVersion': 'v4',
            'app_id':  process.env.FLIGHTS_APP_ID as string,
            'app_key':  process.env.FLIGHTS_APP_KEY as string
        }
    });

    const data : any = await response.json() 

     res.status(200).json({
        destinations: [
            ...data.destinations  
        ]
    });
} )


export  {getDestinations}