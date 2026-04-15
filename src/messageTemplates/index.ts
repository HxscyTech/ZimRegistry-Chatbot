export const errorMessageTemplate = (): string => {
    const message = `*Welcome to ZimRegister*
                    
Hello! I am your digital assistant for the Registrar General's office. I can help you begin your civil registration process from your phone.

Send a Hi or hi to get started.`

    return message
};

export const welcomeMessageTemplate = (): string => {
    const message = `🏛️ *ZimRegister Assistant*\n\n` +
    `Welcome! Please type one of the options below to begin your application:\n\n` +
    `1 *Register Birth*\n` +
    `2 *Register ID*\n` +
    `3 *Verify Status*\n\n` +
    `_Powered by HxscyTech_`;

    return message;
};

export const childNameTemplate = (): string => {
    const message = `📝 *ZimRegister Form*\n\n` +
    `*Step 1*: Please type the *Child's Full Name*\n\n.` +
    `_Powered by HxscyTech_`;
    return message;
};

export const motherIDTemplate = (): string => {
    const message = `📝 *ZimRegister Form*\n\n` +
    `*Step 2*: Please type the *Mother's National Identification Number (00-0000000Z00)*\n\n.` +
    `_Powered by HxscyTech_`;
    return message;
};

export const hospitalCardTemplate = (): string => {
    const message = `📝 *ZimRegister Form*\n\n` +
    `*Step 3*: Please send a clear picture of the *Hospital Card*\n\n.` +
    `_Powered by HxscyTech_`;
    return message;
};


export const birthConfirmationTemplate = (name: string, motherId: string, tracking: string): string => {
    const message = `📝 *ZimRegister Form*\n\n*Step 4*: Please confirm your details*\n\n.` +
    `*Name*: ${name}\n` +
    `*Mother's ID*: ${motherId}\n\n` +
    `Your tracking ID is ${tracking}` +
    `Type *Ok* to confirm and type *Menu* to return to Main Menu\n\n` +
    `_Powered by HxscyTech_`;
    return message;
};

