export interface IMpesaConfig {
    consumerKey: string;
    consumerSecret: string;
    shortCode: string;
    passKey: string;
    environment: "sandbox" | "production";
    callbackUrl?: string;
}
export interface IStkPushRequest {
    phoneNumber: string;
    amount: number;
    accontReference?: string;
    transactionDesc?: string;
    callbackUrl?: string;
}
export interface IStkPushResponse {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResponseCode: string;
    Responseescription: string;
    CustomerMessage: string;
}
