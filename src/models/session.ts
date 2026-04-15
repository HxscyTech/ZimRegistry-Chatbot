import { Schema, model } from "mongoose";
import { ISession } from "../types/types";

const sessionSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    currentStep: {
        type: String,
        default: 'START',
        enums: ['START', 'AWAITING_SERVICE','AWAITING_NAME', 'AWAITING_ID', 'AWAITING_DOC', 'COMPLETED']
    }
});

const Session = model<ISession>("Session", sessionSchema);
export default Session;