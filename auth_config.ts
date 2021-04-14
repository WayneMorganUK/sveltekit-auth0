import type { Auth0ClientOptions } from "@auth0/auth0-spa-js";


const config:Auth0ClientOptions = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
    client_id: import.meta.env.VITE_APP_CLIENT_ID as string
  };
  
  export default config;