import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, "../../.env")});

const mandatoryVariables = [
    "PORT",
    "APP_ENV",
    "WHATSAPP_VERIFICATION_TOKEN",
    "WHATSAPP_API_TOKEN"
];

const missingVariables = mandatoryVariables.filter((variable) => !process.env[variable]);

if(missingVariables.length > 0) {
    const variableString = JSON.stringify(missingVariables);
    console.log(`Environment variable(s) 
        ${variableString.substring(1, variableString.length - 1)} 
        
are required if running on local environment`);

    process.exit(1);
};


const config = {
    PORT: process.env.PORT,
    APP_ENV: process.env.APP_ENV,
    WHATSAPP_VERIFICATION_TOKEN: process.env.WHATSAPP_VERIFICATION_TOKEN,
    WHATSAPP_API_TOKEN: process.env.WHATSAPP_API_TOKEN,
};

export default config;