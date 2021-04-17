import createAuth0Client, { Auth0Client, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "$lib/store";

async function createClient(): Promise<Auth0Client> {
  const auth0Client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
    client_id: import.meta.env.VITE_APP_CLIENT_ID as string
  });

  return auth0Client;
}

async function loginWithPopup(client_id: Auth0Client, options?: PopupLoginOptions): Promise<void> {
  popupOpen.set(true);
  try {
    await client_id.loginWithPopup(options);

    user.set(await client_id.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client_id: Auth0Client): void {
  return client_id.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;