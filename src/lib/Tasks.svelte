<script lang="ts">
	import { isAuthenticated, user, user_tasks, tasks, loging } from '$lib/store';
	import TaskItem from '$lib/TaskItem.svelte';

	function login() {
		$loging = !$loging;
	}

	let newTask: string;
	let inputFocus: HTMLInputElement;

	function addItem() {
		let newTaskObject = {
			id: genRandom(),
			description: newTask,
			completed: false,
			user: $user.email as string
		};

		let updatedTasks = [...$tasks, newTaskObject];

		tasks.set(updatedTasks);

		newTask = '';
		inputFocus.focus();
	}

	function genRandom(length = 7) {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i)
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	}
	const onKeyPress = (event: { charCode: number }) => {
		if (event.charCode === 13) addItem();
	};
</script>

{#if !$isAuthenticated}
	<div class=" w-full max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mt-12 px-4 mx-auto">
		<div class="flex flex-wrap -mx-4">
			<div class="row relative w-full px-4">
				<div class="sm:px-8 sm:py-16 px-4 py-8 mb-8 bg-gray-200 rounded">
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
	<div class="  w-full max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mt-12 px-4 mx-auto">
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
					bind:this={inputFocus}
					on:keypress={onKeyPress}
					class="form-control focus:border-4 focus:border-blue-500 focus:text-gray-800 focus:outline-none text-gray-700 block w-full h-9 px-3 py-2 leading-6 bg-white bg-clip-padding border-solid border-4 border-gray-400 rounded"
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

<style>
	@media only screen and (min-width: 768px) {
		.row {
			margin-left: 8.33333%;
			flex: 0 0 83.33333%;
			max-width: 83.33333%;
		}

		.col {
			flex: 0 0 50%;
			max-width: 50%;
		}
	}

	.form-control {
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}
</style>
