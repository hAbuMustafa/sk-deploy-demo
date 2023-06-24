<script>
	export let data;
	$: ({ episode, user } = data);
</script>

<h1>{episode.title}</h1>
<h4>{user.email}</h4>

{@html episode.html}
