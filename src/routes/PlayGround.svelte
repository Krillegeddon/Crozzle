<script lang="ts">
	import { Grid } from '$lib/PlayGround';
	import { GetPlayground } from './GetPlayground.json';

	var grid: Grid;
	var isSetup: boolean = false;

	// async function GetGrid() {
	// 	var url = 'http://localhost:5173/GetPlayground.json';

	// 	const f = await fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json; charset=utf-8'
	// 		}
	// 	});

	// 	let r = await f.text();

	// 	var grid2 = new Grid();

	// 	console.log('Frontend:\n' + r);

	// 	var w = '';
	// 	for (var y = 0; y < 20; y++) {
	// 		for (var x = 0; x < 20; x++) {
	// 			if (r.charAt(x + y * 21) != ' ') grid2.setLetter(x, y, r.charAt(x + y * 21).toUpperCase());
	// 			w += r.charAt(x + y * 21);
	// 		}
	// 		w += '\n';
	// 	}
	// 	grid = grid2;
	// }

	function GetGrid() {
		var r = GetPlayground();
		var grid2 = new Grid();

		var w = '';
		for (var y = 0; y < 20; y++) {
			for (var x = 0; x < 20; x++) {
				if (r.charAt(x + y * 21) != ' ') grid2.setLetter(x, y, r.charAt(x + y * 21).toUpperCase());
				w += r.charAt(x + y * 21);
			}
			w += '\n';
		}
		grid = grid2;
	}

	GetGrid();

	var columns = new Array<number>();
	var rows = new Array<number>();

	$: Setup(grid);

	function Setup(gridx: Grid) {
		if (gridx == null) return;
		if (isSetup) return;
		for (let i = 0; i <= grid.maxX; i++) {
			columns.push(i);
		}
		for (let i = 0; i <= grid.maxY; i++) {
			rows.push(i);
		}
		isSetup = true;
	}

	function isLetterBox(column: number, row: number, selectedLetters: string): boolean {
		if (grid.getLetter(column, row)) return true;
		else return false;
	}

	function isPerfect(column: number, row: number, selectedLetters: string): boolean {
		var letter = grid.getLetter(column, row);
		if (!letter) return false;
		for (var i = 0; i < selectedLetters.length; i++) {
			if (selectedLetters.charAt(i).toUpperCase() == letter.toUpperCase()) return true;
		}
		return false;
	}

	function handleKeydown(event: any) {
		if (grid.isValidLetter(event.key)) grid.selectedLetters += event.key;
	}

	function addLetter(letter: string) {
		if (grid.isValidLetter(letter)) grid.selectedLetters += letter;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if grid}
	<!-- <input type="text" bind:value={grid.selectedLetters} /> -->
	<table style="width:100%">
		<tr>
			<td align="center" style="align:center;">
				<h1>CROZZLE</h1>

				<table>
					{#each rows as row}
						<tr>
							{#each columns as column}
								<td
									class:letterbox={isLetterBox(column, row, grid.selectedLetters)}
									class:letterbox-perfect={isPerfect(column, row, grid.selectedLetters)}
								>
									{#if isPerfect(column, row, grid.selectedLetters)}
										{grid.getLetter(column, row) ?? ''}
									{/if}
								</td>{/each}
						</tr>
					{/each}
				</table>
				<div style="width:300px;margin-top:40px;">
					{#each grid.getValidLetters() as validLetter}
						<div
							style="cursor:pointer"
							on:click={() => addLetter(validLetter)}
							class="letterbox-keyboard"
							class:letterbox-perfect={grid.isCorrectLetter(grid.selectedLetters, validLetter)}
							class:letterbox-error={grid.isFaultyLetter(grid.selectedLetters, validLetter)}
						>
							{validLetter}
						</div>
					{/each}
				</div>
			</td></tr
		>
	</table>
{/if}

<style>
	body {
		font-family: sans-serif;
		background-color: #111111;
		color: white;
	}
	* {
		color: silver;
		font-family: sans-serif;
		background-color: #111111;
	}
	.letterbox {
		border: 1px #555555 solid;
		color: white;
		height: 20px;
		width: 20px;
		font-size: 18px;
		color: white;
	}
	.letterbox-perfect {
		border: 1px #555555 solid;
		color: white;
		background-color: green;
		height: 20px;
		width: 20px;
		text-align: center;
	}
	.letterbox-error {
		display: inline-block;
		border: 1px #555555 solid;
		background-color: red;
		color: white;
		height: 20px;
		width: 20px;
		text-align: center;
	}
	.letterbox-keyboard {
		display: inline-block;
		border: 1px #555555 solid;
		height: 20px;
		width: 20px;
		text-align: center;
		margin: 2px;
		font-size: 20px;
		color: white;
	}
	.letterbox-keyboard-perfect {
		border: 1px #555555 solid;
		background-color: lightgreen;
	}
	.letterbox-keyboard-error {
		border: 1px #555555 solid;
		background-color: red;
		color: white;
	}
</style>
