import { Request, Response } from "express";
import { IWebHookNotification } from "../../types/types";
import { StatusCodes } from "http-status-codes";
import { handleTextMessage, handleImageMessage } from "../whatsapp/conversation";
import logger from "../../services/logger";

export const incomingMessages = async (req: Request, res: Response) => {
    try{
        const body: IWebHookNotification = req.body;
    
        if(!body.entry) {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: "Request body not found" })
        }
    
      
        const messages = body.entry[0]?.changes[0]?.value.messages
    
        if(messages) {
            const phoneNumber = messages[0]?.from;
            const messageType = messages[0]?.type;
    
            switch(messageType) {
                case "text":
                    const textMessage = messages[0]?.text.body;
                    {   
                        if(phoneNumber && textMessage) {
                            logger.info(`[ INCOMING_TEXT_MESSAGE ] Receiving from ${phoneNumber}`);
                            handleTextMessage( phoneNumber, textMessage);
                        }
                    }
                    break;
                case "image":
                    const imageMessage = messages[0]?.image;
                    {   
                        if(phoneNumber && imageMessage) {
                            logger.info(`[ INCOMING_IMAGE_MESSAGE ] Receiving from ${phoneNumber}`);
                            handleImageMessage(phoneNumber, imageMessage)
                        }
                    }
            }

            return res.status(StatusCodes.OK).send({ success: true });
        }
    } catch(error: any) {
        logger.error(`[ WEBHOOK_ERROR ] ${error.message}`);
    
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false });
    }
};

