import { MpesaStkPush } from "./lib/stk-push";
import { IMpesaConfig } from "./types";

export class Mpesa{
    private config:IMpesaConfig;

    constructor(config:IMpesaConfig){
        if(!config.consumerKey ||!config.consumerSecret ||!config.shortCode ||!config.passkey){
            throw new Error('Missing required configurations :consumerKey, consumerSecret, shortCode, passkey')
        }
        this.config={ ...config, environment: config.environment ?? 'sandbox', }
    }

    stkPush(){
        return new MpesaStkPush(this.config)
    }
}

export * from  "./types"