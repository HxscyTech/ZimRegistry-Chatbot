import { Schema, model } from "mongoose";

const birthCertificateRegistrationSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please provide first name"],
        minlength: [2, "First name must contain at least 2 characters"],
        maxlength: [20, "First name must not exceed 20 characters"]
    },
    secondName: {
        type: String,
        minlength: [2, "Second name must contain at least 2 characters"],
        maxlength: [20, "Second name must not exceed 20 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name"],
        minlength: [2, "Last name must contain at least 2 characters"],
        maxlength: [20, "Last name must not exceed 20 characters"],
    },
    hospitalOfBirth: {
        type: String,
        required: [true, "Please provide hospital of birth"],
        minlength: [5, "Name of hospital must contain at least 5 characters"],
        maxlength: [20, "Name of hospital must not exceed 20 characters"]
    },
    applicationStatus: {
        type: String,
        enums: ["Pending", "Rejected", "Approved"],
    },
}, {
    timestamps: true,
});

const BirthCertificateRegistration = model("BirthCertificateRegistration", birthCertificateRegistrationSchema);
export default BirthCertificateRegistration;