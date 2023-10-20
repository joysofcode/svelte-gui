<script lang="ts">
	export let controls

	const entries: any = Object.entries($controls)
	const isNotEmpty = entries.length > 0

	const is = {
		number: (value: any) => typeof value === 'number',
		boolean: (value: any) => typeof value === 'boolean',
		text: (value: any) => typeof value === 'string' && !value.startsWith('#'),
		color: (value: any) => typeof value === 'string' && value.startsWith('#'),
		range: (value: any) => typeof value === 'object',
	}

	function updateControls(e: Event) {
		let { value, type, dataset, checked, step, min, max } = e.target as HTMLInputElement
		let key = dataset.key!

		switch (type) {
			case 'range':
				if (e.type === 'wheel') {
					let direction = (e as WheelEvent).deltaY < 0 ? 'up' : 'down'

					if (direction === 'up') {
						$controls[key].value < max && ($controls[key].value += +step)
					} else {
						$controls[key].value > min && ($controls[key].value -= +step)
					}
				} else {
					$controls[key].value = +value
				}
				break

			case 'checkbox':
				$controls[key] = checked
				break

			case 'number':
				$controls[key] = +value
				break

			default:
				$controls[key] = value
		}
	}
</script>

{#if isNotEmpty}
	<div class="gui">
		{#each entries as [label, value]}
			{#if is.number(value)}
				<label>
					{label}
					<input
						on:change={updateControls}
						on:wheel={updateControls}
						value={$controls[label]}
						data-key={label}
						type="number"
					/>
				</label>
			{/if}

			{#if is.boolean(value)}
				<label>
					{label}
					<input
						on:change={updateControls}
						data-key={label}
						checked={$controls[label]}
						type="checkbox"
					/>
				</label>
			{/if}

			{#if is.text(value)}
				<label>
					{label}
					<input on:input={updateControls} data-key={label} value={$controls[label]} type="text" />
				</label>
			{/if}

			{#if is.range(value)}
				<label>
					{label}
					<input
						on:input={updateControls}
						on:wheel={updateControls}
						data-key={label}
						value={$controls[label].value}
						min={$controls[label].min}
						max={$controls[label].max}
						step={$controls[label].step}
						type="range"
					/>
				</label>
			{/if}

			{#if is.color(value)}
				<label>
					{label}
					<input on:input={updateControls} value={$controls[label]} data-key={label} type="color" />
				</label>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.gui {
		position: absolute;
		top: var(--gui-position-top, 40px);
		right: var(--gui-position-right, 40px);
		bottom: var(--gui-position-bottom);
		left: var(--gui-position-left);
		display: grid;
		gap: 1.5rem;
		padding: 1rem;
		color: var(--gui-txt-clr, hsl(220 10% 80%));
		background-color: var(--gui-bg-clr, hsl(220 10% 14%));
		border: 1px solid hsl(220 10% 18%);
		border-radius: 8px;
		box-shadow: 1px 1px 10px hsl(0 0% 0% / 10%);

		& label {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
			align-items: center;
			justify-items: start;
			font-weight: 700;

			&:not(:last-child) {
				padding-block-end: 1.5rem;
				border-bottom: 1px solid hsl(220 10% 20%);
			}

			& input:not([type='checkbox']) {
				width: 80px;
				height: 40px;
				text-align: center;
				cursor: pointer;
			}
		}
	}
</style>
