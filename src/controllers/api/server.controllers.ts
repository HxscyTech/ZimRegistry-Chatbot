import { Request, Response } from "express";
import BirthApplication from "../../models/birthRegistration";

const getBirthApplications = async(req: Request, res: Response) => {
    const applications = await BirthApplication.find({}, {hospitalDocument: false});
    res.status(200).json({ success: true, applications, results: applications.length });
};

export {
    getBirthApplications,
};