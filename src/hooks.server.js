import { sequence } from '@sveltejs/kit/hooks';
import { auth } from '$db/fake_auth';

async function logger({ event, resolve }) {
	const start_time = Date.now();
	// wait for all other hooks to resolve then run this resolve last
	const response = await resolve(event);

	console.log(`${Date.now() - start_time}ms ${event.request.method} ${event.url.pathname}`);

	return response;
}

function authorize({ event, resolve }) {
	const user = auth();
	event.locals.user = user;
	return resolve(event);
}

// the `handle` hook handles fetch
export const handle = sequence(logger, authorize);

// export async function handle({event,resolve}){
//   return resolve(event)
// }

// intercepting fetch requests
// export function handleFetch({ request, fetch }) {
// 	return fetch(request);
// }

// export function handleError({ error, event }) {
// 	// you can use the event prop to log data about what has happened
// 	return { message: "Oops, i'm intercepting", code: error.code };
// }
