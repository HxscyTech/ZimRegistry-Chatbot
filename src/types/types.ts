import { Types } from "mongoose";

export interface IWebHookNotification {
    object: string,
    entry: IEntry[]
};

export interface IEntry {
    id: string,
    changes: IChanges[]
};

export interface IChanges {
    value: IValue,
    field: string,
};

export interface IValue {
    messaging_product: string,
    metadata: MetaData,
    contacts: IContacts[],
    messages?: IMessages[],
};

export interface MetaData {
    display_phone_number: string,
    phone_number_id: "string"
};

export interface IContacts {
    profile: IProfile,
    wa_id: string,
};

export interface IProfile {
    name: string
};

export interface IMessages {
    from: string,
    id: string,
    timestamp: string,
    text: IMessageNotificationPayload,
    interactive?: InteractiveListReplyNotifications,
    image?: ImageReplyPayload,
    type: string,
};

export interface IMessageNotificationPayload {
    body: string,
};

export interface FacebookAPIError {
  response: {
    data: {
      error: {
        message: string;
        fbtrace_id?: string;
        error_data?: {
          details?: string;
        };
      };
    };
  };
}



export type InteractivePayLoad =
  | InteractiveNfmReplyNotification
  | InteractiveListReplyNotifications
export interface InteractiveNfmReplyNotification {
  nfm_reply: Nfm_Reply;
  type: "nfm_reply";
}

export interface InteractiveListReplyNotifications {
  list_reply: {
    id: string; //unique identifier of the list message eplied to"list_reply_id",
    title: string;
    description: string; //  "list_reply_description"
  };
  type: "list_reply";
}

export interface ImageReplyPayload {
  mime_type: string,
  sha256: string,
  id: string,
  url: string
}

export interface Nfm_Reply {
  response_json: string;
  body: "Sent";
  name: "flow";
}

export interface ISession {
  _id: Types.ObjectId,
  phoneNumber: string,
  currentStep: string,
};