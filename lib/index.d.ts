import { MpesaStkPush } from "./lib/stk-push";
import { IMpesaConfig } from "./types";
export declare class Mpesa {
    private config;
    constructor(config: IMpesaConfig);
    stkPush(): MpesaStkPush;
}
export * from "./types";
