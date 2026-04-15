import axios from "axios";
import config from "../../config/environment";
import logger from "../../services/logger";

const messagesURI = `https://graph.facebook.com/v25.0/${config.WHATSAPP_PHONE_NUMBER_ID}/messages`;

const FLAG = "[ OUTGOING_MESSAGE ]";

export const sendFreeFormMessage = async (to: string, message: any) => {
    try {
        await axios.post(messagesURI,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: to,
                type: "text",
                text: {
                    preview_url: false,
                    body: message
                }
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${config.WHATSAPP_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        logger.info(`${FLAG} Sending registrar_welcome to (${to})`);
    } catch (error: any) {
        console.error('Free-form Error:', error.response?.data || error.message);
    }
};


export const sendZimRegisterMenu = async (to: string) => {
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "interactive",
    interactive: {
      type: "list",
      header: { type: "text", text: "Welcome to ZimRegister" },
      body: { text: "Hello! I am your digital assistant for the Registrar General's Office. I can help you begin your civil registration process from your phone." },
      footer: { text: "Powered by HxscyTech" },
      action: {
        button: "Select Service",
        sections: [
          {
            title: "New Applications",
            rows: [
              { id: "new_birth", title: "Birth Certificate", description: "Register a newborn child" },
              { id: "new_id", title: "National ID", description: "Apply for a first-time ID" }
            ]
          },
          {
            title: "Support",
            rows: [
              { id: "check_status", title: "Check Status", description: "Track an existing application" }
            ]
          }
        ]
      }
    }
  };

  await axios.post(messagesURI, data, { headers: { Authorization: `Bearer ${config.WHATSAPP_API_TOKEN}` } });
};

export const sendWhatsApp = async (to: string, body: string) => {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: {
      body
    }
  };

  await axios.post(messagesURI, data, { 
    headers: { Authorization: `Bearer ${config.WHATSAPP_API_TOKEN}` } 
  });
};
