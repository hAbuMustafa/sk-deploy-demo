<script>
	import { invalidateAll } from '$app/navigation';
	import { enhance, applyAction, deserialize } from '$app/forms';

	export let form;
	// $: console.log('form', form);

	async function handleFormSubmit(event) {
		const data = new FormData(this);
		const res = await fetch(this.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await res.text());
		if (result.type === 'success') {
			// Reloads all data
			await invalidateAll();
		}

		// populate form
		// redirect if redirect was thrown in the action
		// show error page if error was thrown
		applyAction(result);
	}
</script>

<!-- Fail -->
{#if form?.error_message}
	<p>
		{form.error_message}
	</p>
{/if}

<!-- Success -->
{#if form?.message}
	<p>
		{form.message}
	</p>
{:else}
	<!-- The use:enhance version -->
	<!-- <form
		use:enhance={({ formElement, formData, action, cancel }) => {
			// this whole function is optional, just for customizing the progressive enhancement options
			// `formElement` -> is the form element itself
			// `formData` -> formData object
			// `action`-> url form posts to
			// `cancel()` cancels the submission

			return ({ result, update }) => {
				// `result` -> `ActionResult` (success, failure, redirect, error) with status and data
				// `update()`-> runs all default `use:enhance` stuff
				update();
			};
		}}
		action="?/email"
		method="POST"
	> -->
	<form on:submit|preventDefault={handleFormSubmit}>
		<label>
			Name: <input type="text" required name="name" id="name" />
		</label>
		<label>
			Email: <input type="email" required name="email" id="email" />
		</label>
		<label>
			Message: <textarea required name="message" id="message" />
		</label>
		<button type="submit">Send</button>
	</form>
{/if}

<style>
	form {
		padding: 20px;
		display: flex;
		gap: 24px;
		flex-direction: column;
	}

	label {
		display: block;
	}
</style>
