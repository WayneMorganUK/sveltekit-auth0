import { writable, derived } from "svelte/store";

import type { Auth0Client } from '@auth0/auth0-spa-js';

export const isAuthenticated = writable(false);
export const user = writable({} as User)
export const popupOpen = writable(false);
export const error = writable('');
export const loging = writable(false);
export const auth0Client = writable({} as Auth0Client)


export const tasks = writable([]);

export const user_tasks = derived([tasks, user], ([$tasks, $user]) => {
  let logged_in_user_tasks = [];

  if ($user && $user.email) {
    logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email);
  }

  return logged_in_user_tasks;
});
