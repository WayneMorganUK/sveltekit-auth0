import createAuth0Client, { Auth0Client, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "$lib/store";

async function createClient(): Promise<Auth0Client> {
  const auth0Client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
    client_id: import.meta.env.VITE_APP_CLIENT_ID as string
  });
  return auth0Client;
}

async function loginWithPop(clientId:Auth0Client, options?: PopupLoginOptions): Promise<void> {
  popupOpen.set(true);
  try {
    await clientId.loginWithPopup(options);

    user.set(await clientId.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(clientId: Auth0Client): void {
  return clientId.logout();
}

const auth = {
  createClient,
  loginWithPop,
  logout
};

export default auth;