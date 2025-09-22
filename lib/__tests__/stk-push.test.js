"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('Mpesa STK Push', () => {
    const mpesa = new index_1.Mpesa({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        shortCode: process.env.BUSINES_SHORT_CODE,
        passKey: process.env.PASSKEY,
        environment: 'sandbox',
        callbackUrl: process.env.CALLBACK_URL
    });
    test(`should initiate STK Push`, async () => {
        const request = {
            phoneNumber: '254797222488',
            amount: 10,
            accontReference: 'Test123',
            transactionDesc: "Testing library"
        };
        const response = await mpesa.stkPush().stkPush(request);
        expect(response.ResponseCode).toBe('0');
        expect(response.CheckoutRequestID).toBeDefined();
    });
    test('should throw an invalid phone number', async () => {
        const request = {
            phoneNumber: '12345',
            amount: 5
        };
        await expect(mpesa.stkPush().stkPush(request)).rejects.toThrow('Invalid phone number format');
    });
});
