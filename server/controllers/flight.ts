import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

const getFlights = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { airline, route, sort, filterMode, scheduleDate } = req.query;

    console.log(req.query)

    let url = '';

    if (filterMode === "true") {
        url = `${process.env.FLIGHTS_API_URL}/flights?airline=${airline}&route=${route}&includedelays=false&sort=${sort}&scheduleDate=${scheduleDate}`;
    }
    else {
        url = `${process.env.FLIGHTS_API_URL}/flights?includedelays=false&sort=${sort}&scheduleDate=${scheduleDate}`;
    }


    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'ResourceVersion': 'v4',
            'app_id': process.env.FLIGHTS_APP_ID as string,
            'app_key': process.env.FLIGHTS_APP_KEY as string
        }
    });
    const data: any = await response.json();

    res.status(200).json({
        flights: data.flights
    });

})


export { getFlights }