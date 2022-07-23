<script lang="ts">
	import { Grid } from '$lib/PlayGround';
	import { page } from '$app/stores';
	var grid: Grid;
	var isSetup: boolean = false;
	var showHelp = false;
	var errorMessage = 'Loading';
	var gridText: string;
	var showDebug: boolean = false;

	async function FetGrid(): Promise<string> {
		try {
			console.log($page.url.href);
			//const f = await fetch('http://localhost:5173/GetPlayground.json', {
			var url = $page.url.href + 'GetPlayground.json';
			console.log(url);
			const f = await fetch(url, {
				method: 'GET',
				headers: {}
			});

			//				'Content-Type': 'application/json; charset=utf-8'

			let r = await f.json();
			console.log('So you wanna cheat? Well, here is the correct puzzle: :-)');
			console.log(r.s);
			gridText = r.s;
			return r.s;
		} catch (e) {
			return 'fel';
		}
	}

	async function GetGrid() {
		//var r = GetPlayground();
		var r = await FetGrid();
		//r = 'hej';

		if (r.length != 420) {
			errorMessage = 'Something went wrong, try reloading the page';
			return;
		}

		console.log(r.length);

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
		errorMessage = '';
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
		if (grid.isFailed(letter)) return;
		if (grid.isSolved(letter)) return;
		if (grid.isValidLetter(event.key)) {
			var letter = event.key.toUpperCase();
			for (var i = 0; i < grid.selectedLetters.length; i++) {
				if (grid.selectedLetters.charAt(i).toUpperCase() == letter.toUpperCase()) return; //Already added
			}
			grid.selectedLetters += letter.toUpperCase();
		}
	}

	function addLetter(letter: string) {
		if (grid.isFailed(letter)) return;
		if (grid.isSolved(letter)) return;
		if (grid.isValidLetter(letter)) {
			for (var i = 0; i < grid.selectedLetters.length; i++) {
				if (grid.selectedLetters.charAt(i).toUpperCase() == letter.toUpperCase()) return; //Already added
			}
			grid.selectedLetters += letter.toUpperCase();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if !errorMessage}
	<!-- <input type="text" bind:value={grid.selectedLetters} /> -->
	<table style="width:100%">
		<tr>
			<td align="center" style="align:center;">
				<h1>
					CROZZLE <svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-patch-question"
						viewBox="0 0 16 16"
						style="cursor:pointer"
						on:click={() => (showHelp = !showHelp)}
					>
						<path
							d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"
						/>
						<path
							d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
						/>
						<path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
					</svg>
				</h1>
				<div class:hidden={!showHelp}>
					Välj bokstav för bokstav.<br />
					Ifall bokstaven ingår, så dyker den upp i korsordet med grön färg.<br />
					Ifall bokstaven inte ingår, så blir den rödmarkerad.<br />
					Spelet vinns när alla bokstäver är tagna.<br />
					Spelet förloras när man har fyra röda!<br /><br />
					Ha så skoj!<br />
					<br />
				</div>

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
				{#if grid.isFailed(grid.selectedLetters)}
					<div>
						<br />
						Attans, du förlorade!<br /><br />
						<button on:click={() => (grid.selectedLetters = '')}>Spela igen</button>
					</div>
				{/if}
				{#if grid.isSolved(grid.selectedLetters)}
					<div>
						<br />
						Grattis, du klarade det!<br /><br />
						<button on:click={() => GetGrid()}>Spela igen</button>
					</div>
				{/if}
				<br />
				<br />
				<svg
					style="cursor:pointer;"
					on:click={() => (showDebug = !showDebug)}
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-bug"
					viewBox="0 0 16 16"
				>
					<path
						d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"
					/>
				</svg>
				<div class:hidden={!showDebug}>
					<textarea rows="15" cols="15" style="font-family:courier"
						>{gridText.replace('\n', '\r\n')}</textarea
					>
				</div>
			</td>
		</tr>
	</table>
{:else}
	<span color="yellow;">{errorMessage}</span>
{/if}

<style>
	.hidden {
		display: none;
	}
	body {
		font-family: sans-serif;
		background-color: #111111;
		color: white;
	}
	* {
		color: white;
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
		height: 30px;
		width: 30px;
		text-align: center;
		margin: 2px;
		font-size: 30px;
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
