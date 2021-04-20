<script lang="ts">
	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { isAuthenticated, user, auth0Client } from '$lib/store';

	onMount(async () => {
		$auth0Client = await auth.createClient();
		isAuthenticated.set(await $auth0Client.isAuthenticated());
		user.set(await $auth0Client.getUser());
	});

	function login() {
		auth.loginWithPop($auth0Client);
	}
	function logout() {
		auth.logout($auth0Client);
	}
	// $: if ($loging) {
	// 	login();
	// }
</script>

<nav
	class=" relative flex flex-wrap items-center px-4 py-2 md:flex-row md:flex-nowrap justify-between md:justify-start bg-gray-700"
>
	<a class="inline-block py-1 mr-4 text-xl whitespace-nowrap text-white" href="/">Task Manager</a>
	<button
		on:click={logout}
		class="text-white text-opacity-50 border-white border-opacity-10 md:hidden cursor-pointer px-1 py-3 text-xl bg-transparent border-transparent border-solid border-2 leading-4"
		type="button"
		data-toggle="collapse"
		data-target="#navbarText"
		aria-controls="navbarText"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<span class="img inline-block w-6 h-6 align-middle" />
	</button>
	<div class="flex-grow hidden md:flex items-center flex-auto" id="navbarText">
		<div class="flex flex-col md:flex-row pl-0 mb-0 list-none mr-auto">
			{#if $isAuthenticated}
				<span class="text-white">&nbsp;&nbsp;{$user.name} ({$user.email})</span>
			{:else}<span>&nbsp;</span>{/if}
		</div>
		<span class="text-white text-opacity-50 inline-block py-2">
			<ul class="mb-0 pl-0 list-none float-right flex flex-row">
				{#if $isAuthenticated}
					<li class="list-none text-white text-opacity-50">
						<a
							class="text-white text-opacity-50 block p-2 no-underline bg-transparent"
							href="/"
							on:click={logout}>Log Out</a
						>
					</li>
				{:else}
					<li class="list-none text-white text-opacity-50">
						<a
							class="text-white text-opacity-50 block p-2 no-underline bg-transparent"
							href="/"
							on:click={login}>Log In</a
						>
					</li>
				{/if}
			</ul>
		</span>
	</div>
</nav>

<style>
	.img {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
	}
</style>
