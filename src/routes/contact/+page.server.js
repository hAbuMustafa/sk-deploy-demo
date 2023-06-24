import { fail } from '@sveltejs/kit';

export const actions = {
	// you can either have a `default` action, or multiple named actions. Here we opt in for named actions to use `email` and `test`.
	// You can use named actions in related forms by supplying `action` prop of the form to hold the name in this format `action="?/actionName"`
	email: async ({ locals, request }) => {
		if (!locals?.user?.roles?.includes('admin')) {
			return fail(401, {
				error_message: 'Un-Authorized'
			});
		}

		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const message = data.get('message');

		console.log(name, email, message);

		return { message: 'Email Sent!' };
	},
	test: () => {
		console.log('hit test action');
	}
};
