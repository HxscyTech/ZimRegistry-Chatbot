import { Schema, model, Types } from "mongoose";

const hospitalDocumentImageSchema = new Schema({
    applicant: {
        type: Types.ObjectId,
        ref: 'BirthApplication'
    },
    image: {
        type: Types.Buffer,
        required: [true, "Image not provided"]
    }
}, {
    timestamps: true,
});

const HospitalDocument = model("HospitalImage", hospitalDocumentImageSchema);
export default HospitalDocument;
