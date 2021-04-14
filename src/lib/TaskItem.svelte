<script>
	import { tasks } from '$lib/store';
	export let task = {};

	let isChecked;

	function taskDone() {
		let updatedTasks = $tasks.map((currentTask) => {
			if (currentTask.id === task.id) {
				currentTask.completed = isChecked;
				return currentTask;
			}
			return currentTask;
		});

		tasks.set(updatedTasks);
	}
</script>

<main class="block">
	<li
		class="relative block py-3 px-5 bg-white border-solid border-2 border-black border-opacity-10 "
	>
		<input
			type="checkbox"
			class="form-check-input absolute mt-1 -ml-5 overflow-visible"
			id="exampleCheck1"
			bind:checked={isChecked}
			on:change={() => taskDone()}
		/>
		<span class:completed={task.completed}>{task.description}</span>
	</li>
</main>

<style>
	.completed {
		color: red;
		text-decoration: line-through;
	}
</style>
