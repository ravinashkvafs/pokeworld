import { Response } from "express";

module.exports = {
    send: (res: Response, message: string, data: any) => {
        return res.status(200).json({ success: true, message, data: data || {} });
    },
    sendError: (res: Response, status: number, message: string, error: any) => {
        var now: Date = new Date();
        const sendObj: object = { success: false, message, error: error || {}, date: new Date(now.getTime() + (330 * 60 * 1000)) };
        return res.status(status).json(sendObj);
    },
    sendFile: (res: Response, filePath: string, fileName: string) => {
        return res.status(200).download(filePath, fileName);
    }
};