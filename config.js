import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API ='http://localhost:3243/api'
export const APP_NAME = publicRuntimeConfig.APP_NAME
export const FRONTEND_PDF_URL = publicRuntimeConfig.PRODUCTION ? 'http://www.plusifics.com:3243/public/images/frontendpdflogo' : 'http://localhost:3243/public/images/frontendpdflogo'