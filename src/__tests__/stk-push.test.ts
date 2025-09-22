import dotenv from 'dotenv';
dotenv.config(); // Load .env file

import { Mpesa, IStkPushRequest } from '../index';

describe('Mpesa STK Push', () => {
  const config = {
    consumerKey: process.env.CONSUMER_KEY!,
    consumerSecret: process.env.CONSUMER_SECRET!,
    shortCode: process.env.BUSINESS_SHORT_CODE!,
    passkey: process.env.PASS_KEY!,
    environment: 'sandbox' as const,
    callbackUrl: process.env.CALLBACK_URL,
  };

  // Log config for debugging
  console.log('Test Config:', {
    consumerKey: config.consumerKey?.substring(0, 5) + '...' || 'undefined',
    consumerSecret: config.consumerSecret?.substring(0, 5) + '...' || 'undefined',
    shortCode: config.shortCode || 'undefined',
    passkey: config.passkey?.substring(0, 5) + '...' || 'undefined',
    callbackUrl: config.callbackUrl || 'undefined',
    environment: config.environment,
  });

  const mpesa = new Mpesa(config);

  test('should initiate STK Push', async () => {
    const request: IStkPushRequest = {
      phoneNumber: '254708374149', // Use sandbox test number
      amount: 1, // Use 1 for sandbox testing
      accountReference: 'Test123', // Fixed typo
      transactionDesc: 'Testing library',
    };

    const response = await mpesa.stkPush().stkPush(request);
    expect(response.ResponseCode).toBe('0');
    expect(response.CheckoutRequestID).toBeDefined();
  });

  test('should throw on invalid phone number', async () => {
    const request: IStkPushRequest = {
      phoneNumber: '12345',
      amount: 5,
    };
    await expect(mpesa.stkPush().stkPush(request)).rejects.toThrow('Invalid phone number format');
  });
});