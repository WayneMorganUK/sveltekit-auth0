/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />


type User = {
    name:string;
    email: string;
  }

  interface Auth0Context {
    isAuthenticated: boolean;
    user: string;
    loading: boolean;
    popupOpen: boolean;
    loginWithPopup(options: PopupLoginOptions): Promise<void>;
    handleRedirectCallback(): Promise<RedirectLoginResult>;
    getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;
    loginWithRedirect(o: RedirectLoginOptions): Promise<void>;
    getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;
    getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;
    logout(o?: LogoutOptions): void;
  }