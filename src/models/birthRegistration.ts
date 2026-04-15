import { Schema, model, Types } from "mongoose";
import { nanoid } from "nanoid";

const birthRegistrationSchema = new Schema({
    childId: {
        type: String,
        default: () => nanoid(10)
    },
    fullName: {
        type: String,
        required: true,
        maxlength: [60, "First name must not exceed 60 characters"]
    },
    mothersIdNumber: {
        type: String,
        maxlength: [13, "National ID Number must not exceed 13 characters"]
    },
    hospitalDocument: {
        type: Buffer,
    },
    status: {
        type: String,
        enums: ["Pending", "Rejected", "Collected"],
        default: "Pending"
    },
}, {
    timestamps: true,
});

const BirthApplication = model("BirthApplication", birthRegistrationSchema);
export default BirthApplication;