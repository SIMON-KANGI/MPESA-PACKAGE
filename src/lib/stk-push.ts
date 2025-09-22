 import axios from 'axios'
 import { IMpesaConfig, IStkPushRequest, IStkPushResponse } from '../types'
import { MpesaAuth } from './auth';

 export class MpesaStkPush{
    private config:IMpesaConfig;
    private auth:MpesaAuth;

    constructor(config:IMpesaConfig){
        this.config=config;
        this.auth= new MpesaAuth(config)
    }

    private getTimeStamp():string{
        return new Date().toISOString().slice(0,19).replace(/[-:T]/g, "").slice(0,14)
    }
    private getPassword(timeStamp:string):string{
        return Buffer.from(`${this.config.shortCode}${this.config.passkey}${timeStamp}`).toString('base64')
    }
    async stkPush(request:IStkPushRequest):Promise<IStkPushResponse>{

        let phone=request.phoneNumber.replace(/\D/g,'');
        if(phone.startsWith('0')){
            phone=`254${phone.slice(1)}`
        }else if (phone.startsWith('+254')){
            phone=phone.slice(1)
        }else if(!phone.startsWith("254")){
            throw new Error("Invalid phone number format. Use 07xxxxxx or 2547xxxxxx")
        }

        const amount= Math.floor(request.amount);
        if(amount<=0){
            throw new Error("Amount must be a positive number")
        }

        const accessToken=await this.auth.getAccessToken();
        const timeStamp=this.getTimeStamp()
        const password= this.getPassword(timeStamp)


        const payload={
            BusinessShortCode:this.config.shortCode,
            Password:password,
            Timestamp:timeStamp,
            TransactionType:"CustomerPayBillOnline",
            Amount:amount,
            PartyA:phone,
            PartyB:this.config.shortCode,
            PhoneNumber:phone,
            CallBackURL:request.callbackUrl ||this.config.callbackUrl,
            AccountReference:request.accountReference ||"Payment",
            TransctionDesc:request.transactionDesc ||"Payment"
        }

        const url =this.config.environment==="production"
        ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

        try{
            const response= await axios.post(url, payload,{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    'Content-Type':"application/json"
                }
            })
            return response.data
        }catch(error:any){
            throw new Error(`STK Push failed: ${error.response?.data.errorMessage ||error.message}`)
        }

    }

 }