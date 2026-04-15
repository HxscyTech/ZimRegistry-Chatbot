import { ImageReplyPayload, InteractivePayLoad, ISession } from "../../types/types";
import { sendWhatsApp } from "../messages/outgoingMessages";
import { errorMessageTemplate, welcomeMessageTemplate, childNameTemplate, motherIDTemplate, hospitalCardTemplate, birthConfirmationTemplate } from "../../messageTemplates";
import Session from "../../models/session";
import BirthApplication from "../../models/birthRegistration";
import HospitalDocument from "../../models/hospitalDocument";
import logger from "../../services/logger";
import downloadWhatsAppMedia from "../../utils/downloadImage";
import { nanoid } from "nanoid";

const childId = nanoid(10);

export const handleTextMessage = async(phoneNumber: string, text: string) => {
    const message = text.trim();
    
    let session = await Session.findOne({phoneNumber});
    if(!session?.currentStep) session = await Session.create({phoneNumber});

    switch(session?.currentStep) {
        case "START":
            if(message === "hi" || message === "Hi") {
                session.currentStep = "AWAITING_SERVICE";
                await sendWhatsApp(phoneNumber, welcomeMessageTemplate());
                await session.save();
                break;
            } else {
                sendWhatsApp(phoneNumber, errorMessageTemplate());
                break;
            };
        case "AWAITING_SERVICE":
            if(message === "1") {
                session.currentStep = "AWAITING_NAME";
                await sendWhatsApp(phoneNumber, childNameTemplate());
                await session.save();
                break;
            }
            case "AWAITING_NAME":
                session.currentStep = "AWAITING_ID";
                await BirthApplication.create({fullName: message, childId, mothersIdNumber: ""});
            await sendWhatsApp(phoneNumber, motherIDTemplate());
            await session.save();
            break;
        case "AWAITING_ID":
            session.currentStep = "AWAITING_DOC";
            await BirthApplication.updateOne({childId}, {$set: { mothersIdNumber: message}});
            await sendWhatsApp(phoneNumber, hospitalCardTemplate());
            await session.save();
            break;
    }
}

export const handleImageMessage = async(from: string, image: ImageReplyPayload) => {
    const phoneNumber = from;

    let session = await Session.findOne({phoneNumber});
    if(!session?.currentStep) session = await Session.create({phoneNumber});

    if(session?.currentStep === "AWAITING_DOC") {
        session.currentStep = "COMPLETED";
        const media = await downloadWhatsAppMedia(image.id);
        await BirthApplication.updateOne({childId}, {$set: {hospitalDocument: media.buffer}});

        const application = await BirthApplication.findOne({childId});
        const tracking = childId;
        sendWhatsApp(phoneNumber, birthConfirmationTemplate(application?.fullName || "Unknown", application?.mothersIdNumber || "Unknown", tracking));
    }
}


/*export const handleInteractiveMessage = async(from: string, interactive: InteractivePayLoad) => {
    const phoneNumber = from;
    if (interactive.type === 'nfm_reply') {
        const flowData = JSON.parse(interactive.nfm_reply.response_json);
        
        console.log(phoneNumber, `Success! We have recorded the birth of ${flowData.child_full_name}. Please upload the Red Card now.`);
    }

    if(interactive.type === 'list_reply') {
        const serviceId = interactive.list_reply.id;
        if(serviceId=== "new_birth") {
            let session = await Session.findOne({phoneNumber});

            logger.info("[ NEW_BIRTH_REGISTRATION ]")

            switch(session?.currentStep) {
                case "START":
                    sendWhatsApp(phoneNumber, "📝 *ZimRegister Form*\n\nStep 1: Please type the *Child's Full Name*.");
                    session.currentStep = "AWAITING_NAME";
                    break;
                case "AWAITING_NAME":
                    sendWhatsApp(phoneNumber, "📝 *ZimRegister Form*\n\nStep 2: Please type the *Mother's National Identification Number (00-0000000Z00)*.")

            }
             
        };
    }
}*/
