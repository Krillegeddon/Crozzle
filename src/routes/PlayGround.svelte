<script lang="ts">
	import { Grid } from '$lib/PlayGround';
	var grid = new Grid();
	grid.populateGrid();
	console.log(grid);

	var columns = new Array<number>();
	var rows = new Array<number>();
	for (let i = 0; i <= grid.maxX; i++) {
		columns.push(i);
	}
	for (let i = 0; i <= grid.maxY; i++) {
		rows.push(i);
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

	function getFaultyLetters(selectedLetters: string): Array<string> {
		var ret = new Array<string>();
		for (var i = 0; i < selectedLetters.length; i++) {
			if (!grid.isCorrectLetter(selectedLetters.charAt(i).toUpperCase()))
				ret.push(selectedLetters.charAt(i).toUpperCase());
		}

		return ret;
	}
</script>

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
<div style="width:300px">
	{#each grid.getValidLetters() as validLetter}
		<div
			class="letterbox-keyboard"
			class:letterbox-perfect={grid.isCorrectLetter(validLetter)}
			class:letterbox-error={grid.isFaultyLetter(validLetter)}
		>
			{validLetter}
		</div>
	{/each}
</div>

<input type="text" bind:value={grid.selectedLetters} />

<style>
	.letterbox {
		border: 1px silver solid;
		height: 20px;
		width: 20px;
	}
	.letterbox-perfect {
		border: 1px silver solid;
		background-color: lightgreen;
		height: 20px;
		width: 20px;
		text-align: center;
	}
	.letterbox-error {
		display: inline-block;
		border: 1px silver solid;
		background-color: red;
		color: white;
		height: 20px;
		width: 20px;
		text-align: center;
	}
	.letterbox-keyboard {
		display: inline-block;
		border: 1px silver solid;
		height: 20px;
		width: 20px;
		text-align: center;
		margin: 2px;
	}
	.letterbox-keyboard-perfect {
		display: inline-block;
		border: 1px silver solid;
		background-color: lightgreen;
		height: 20px;
		width: 20px;
		text-align: center;
		margin: 2px;
	}
	.letterbox-keyboard-error {
		display: inline-block;
		border: 1px silver solid;
		background-color: red;
		color: white;
		height: 20px;
		width: 20px;
		text-align: center;
		margin: 2px;
	}
</style>
