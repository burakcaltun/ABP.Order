import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Order',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44357/',
    redirectUri: baseUrl,
    clientId: 'Order_App',
    responseType: 'code',
    scope: 'offline_access Order',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44357',
      rootNamespace: 'Ag.Order',
    },
  },
} as Environment;
