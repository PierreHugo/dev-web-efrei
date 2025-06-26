import * as msal from "@azure/msal-browser";

const requestedScopes = {
  scopes: ["User.Read"],
};
console.log("Client ID utilisé =>", import.meta.env.VITE_OAUTH_CLIENT_ID);
console.log("Redirect URI =>", "http://localhost:5173/");
const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
});

async function initializeMsal() {
  if (!msalInstance.getActiveAccount()) {
    await msalInstance.initialize();
  }
}

export async function signInAndGetUser() {
  await initializeMsal();

  const authResult = await msalInstance.loginPopup({
    ...requestedScopes,
    prompt: "select_account",
  });
  msalInstance.setActiveAccount(authResult.account);
  return authResult.account;
}

export async function getToken() {
  await initializeMsal();

  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw new Error("No active account! Please sign in first.");
  }

  const response = await msalInstance.acquireTokenSilent({
    ...requestedScopes,
    account: account,
  });

  return response.accessToken;
}

export function signOut() {
  msalInstance.logoutPopup();
}
