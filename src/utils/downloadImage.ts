import axios from 'axios';
import config from '../config/environment';

const downloadWhatsAppMedia = async (mediaId: string) => {
    try {
        //Getting the actual download URL from Meta
        const urlResponse = await axios.get(
            `https://graph.facebook.com/v21.0/${mediaId}`,
            {
                headers: { Authorization: `Bearer ${config.WHATSAPP_API_TOKEN}` }
            }
        );

        const downloadUrl = urlResponse.data.url;

        //Downloading the binary data (the actual image)
        const imageResponse = await axios.get(downloadUrl, {
            headers: { Authorization: `Bearer ${config.WHATSAPP_API_TOKEN}` },
            responseType: 'arraybuffer'
        });

        return {
            buffer: Buffer.from(imageResponse.data),
            mimeType: urlResponse.data.mime_type
        };
    } catch (error) {
        console.error("Media Download Error:", error);
        throw error;
    }
};

export default downloadWhatsAppMedia;