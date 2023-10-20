<script lang="ts">
	import { GUI, guiControls } from '$lib/gui'

	const gui = guiControls({
		x: 200,
		y: 200,
		radius: 100,
		color: '#17191c',
		stroke: '#00ffcc',
		size: 4,
		dash: { value: 0, min: 0, max: 1.1, step: 0.01 },
		offset: { value: 0, min: 0, max: 1.1, step: 0.01 },
	})
</script>

<GUI controls={gui} />

<svg width="800" height="800" viewBox="0 0 400 400">
	<circle
		cx={$gui.x}
		cy={$gui.y}
		r={$gui.radius}
		fill={$gui.color}
		stroke={$gui.stroke}
		stroke-width={$gui.size}
		stroke-dasharray={$gui.dash.value}
		stroke-dashoffset={$gui.offset.value}
		pathLength="1"
	/>
</svg>
