export interface IMpesaConfig{
    consumerKey:string;
    consumerSecret:string;
    shortCode:string;
    passkey:string;
    environment:"sandbox" |"production";
    callbackUrl?:string

}

export interface IStkPushRequest{
    phoneNumber:string;
    amount:number;
    accountReference?:string;
    transactionDesc?:string;
    callbackUrl?:string
}

export interface IStkPushResponse{
    MerchantRequestID:string;
    CheckoutRequestID:string;
    ResponseCode:string;
    Responseescription:string;
    CustomerMessage:string
}