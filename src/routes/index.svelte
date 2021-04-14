<script as ts>
	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { isAuthenticated, user, user_tasks, tasks } from '$lib/store';
	import TaskItem from '$lib/TaskItem.svelte';

	let auth0Client;
	let newTask;

	onMount(async () => {
		auth0Client = await auth.createClient();

		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client);
	}

	function logout() {
		auth.logout(auth0Client);
	}

	function addItem() {
		let newTaskObject = {
			id: genRandom(),
			description: newTask,
			completed: false,
			user: $user.email
		};

		console.log(newTaskObject);

		let updatedTasks = [...$tasks, newTaskObject];

		tasks.set(updatedTasks);

		newTask = '';
	}

	function genRandom(length = 7) {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i)
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	}
</script>

<main>
	<!-- App Bar -->
	<nav class="relative flex items-center px-4 py-2 flex-row flex-nowrap justify-start bg-gray-700">
		<a class="inline-block py-1 mr-4 text-xl whitespace-nowrap text-white" href="/">Task Manager</a>
		<button
			class="text-white text-opacity-50 border-white border-opacity-10 hidden cursor-pointer px-1 py-3 text-xl bg-transparent border-transparent border-solid border-2 leading-4"
			type="button"
			data-toggle="collapse"
			data-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="img inline-block w-6 h-6 align-middle" />
		</button>
		<div class="flex-grow flex items-center flex-auto" id="navbarText">
			<div class="flex flex-row pl-0 mb-0 list-none mr-auto">
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

	<!-- Application -->
	{#if !$isAuthenticated}
		<div class=" w-full max-w-6xl mt-12 px-4 mx-auto">
			<div class="flex flex-wrap -mx-4">
				<div class="row relative w-full px-4">
					<div class=" px-8 py-16 mb-8 bg-gray-200 rounded">
						<h1 class=" text-6xl font-light mb-2 leading-5! mt-0">Task Management made Easy!</h1>
						<p class="text-xl font-light mt-0 mb-4">Instructions</p>
						<ul class="pl-10 mt-0 mb-4">
							<li class="list-disc">Login to start &#128272;</li>
							<li class="list-disc">Create Tasks &#128221;</li>
							<li class="list-disc">Tick off completed tasks &#9989;</li>
						</ul>
						<a
							class="mx-auto cursor-pointer bg-blue-500 border-blue-500 text-lg leading-6! inline-block font-normal align-middle text-center border-2 border-solid border-transparent px-4 py-2 rounded"
							href="/"
							role="button"
							on:click={login}>Log In</a
						>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class=" mt-12 max-w-6xl w-full px-4 mx-auto " id="main-application">
			<div class="flex flex-wrap -mx-4">
				<div class="col relative w-full px-4">
					<ul class="flex flex-col pl-0 mb-0 rounded mt-0">
						{#each $user_tasks as item (item.id)}
							<TaskItem task={item} />
						{/each}
					</ul>
				</div>
				<div class="col relative w-full px-4 ">
					<input
						class="form-control focus:shadow-md focus:border-blue-500 focus:text-gray-800 focus:outline-none text-gray-700 block w-full h-9 px-3 py-2 leading-6 bg-white bg-clip-padding border-solid border-2 border-gray-400 rounded"
						bind:value={newTask}
						placeholder="Enter New Task"
					/>
					<br />
					<button
						type="button"
						class="mx-auto cursor-pointer bg-blue-500 border-blue-500 text-lg leading-6! inline-block font-normal align-middle text-center border-2 border-solid border-transparent px-4 py-2 rounded"
						on:click={addItem}
					>
						Add Task
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	.row {
		margin-left: 8.33333%;
		flex: 0 0 83.33333%;
		max-width: 83.33333%;
	}
	.col {
		flex: 0 0 50%;
		max-width: 50%;
	}
	.form-control {
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.img {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
	}
</style>
