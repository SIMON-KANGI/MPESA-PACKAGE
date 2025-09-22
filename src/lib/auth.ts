import axios from "axios"
import { IMpesaConfig } from "../types"


export class MpesaAuth{
    private config :IMpesaConfig
    private accessToken:string |null=null
    private tokenExpiry:number=0;

    constructor(config:IMpesaConfig){
this.config=config
    }

    async getAccessToken():Promise<string>{
        if(this.accessToken &&this.tokenExpiry >Date.now() +1000){
            return this.accessToken
        }
        const url= this.config.environment=="production"?'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials':
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

        const auth= Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64')

        try{
            const response= await axios.get(url,{
                headers:{Authorization:`Basic ${auth}`},
            });
            if(!response.data.access_token){
                throw new Error("No access token in response")
            }
            this.accessToken=response.data.access_token;
            this.tokenExpiry=Date.now()+(response.data.expires_in *1000)-60000
            if(this.accessToken){
              return this.accessToken   
            }
            return ""
           

        }catch(error:any){
            throw new Error(`Failed to get access token:${error?.respnse?.data?.error ||error?.message}`)
        }
    }

}