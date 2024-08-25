<script lang="ts">
	let { variable }: { variable: number } = $props();
</script>

<div class="number">
	<span>My number is {variable}!</span>
</div>

<style>
	.number {
		color: red;
	}
</style>
