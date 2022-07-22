import { Grid } from "$lib/PlayGround";
import { allWordsSE } from "$lib/se";
import type { RequestHandler } from "@sveltejs/kit";
import fs from 'fs'

function CountCommonLetters(one: string, two: string): number {
    var count = 0;
    var alreadyCountedLetters = new Array<string>();
    for (var i = 0; i < one.length; i++) {
        for (var j = 0; j < two.length; j++) {
            if (one[i] == two[j]) {
                if (alreadyCountedLetters.find(p => p == one[i])) {
                    //console.log(one[i] + " already counted!");
                    continue;
                }

                count++;
                alreadyCountedLetters.push(one[i]);
            }
        }
    }
    return count;
}

function IsLetterInWord(letter: string, word: string): boolean {
    for (var i = 0; i < word.length; i++) {
        if (letter.toUpperCase() == word.charAt(i).toUpperCase())
            return true;
    }
    return false;
}


function GetVerticalWord(letterToMatch: string, horizontalWord: string, allWords: Array<string>): string {
    var startIndex = Math.round(Math.random() * allWords.length);
    for (var i = startIndex; i < allWords.length; i++) {
        var word = allWords[i].trim();
        if (word.length < 3 || word.length > 7)
            continue;
        if (!IsLetterInWord(letterToMatch, word))
            continue;

        var numCommonLetters = CountCommonLetters(horizontalWord, word);
        var minCommonLetters = 0;
        if (word.length == 3) minCommonLetters = 2;
        if (word.length == 4) minCommonLetters = 2;
        if (word.length == 5) minCommonLetters = 3;
        if (word.length == 6) minCommonLetters = 3;
        if (word.length == 7) minCommonLetters = 4;
        if (numCommonLetters < minCommonLetters)
            continue;
        return allWords[i];
    }
    return "";
}

function IsValidHorizontal(word: string): boolean {
    if (word.length >= 7 && word.length <= 8) {
        //console.log("IsValidHoriz: " + word + ", " + word.length);
        return true;
    }
    return false;
}

function GetHorizontalWord(allWords: Array<string>): string {
    console.log("GetHorizontalWord");
    console.log(allWords.length);
    var startIndex = Math.round(Math.random() * allWords.length);
    for (var i = startIndex; i < allWords.length; i++) {
        var word = allWords[i].trim();
        if (IsValidHorizontal(word)) {
            //console.log("GetHorizontalWord: " + word + ", " + word.length);
            return word;
        }
    }
    return "traktor";
}

function PutVeritcalWord(word: string, x: number, y: number, grid: Grid) {
    for (var i = 0; i < word.length; i++) {
        grid.setLetter(x, i + y, word.charAt(i));
    }
}

function PutHorizontalWord(word: string, y: number, grid: Grid) {
    for (var i = 0; i < word.length; i++) {
        grid.setLetter(i, y, word.charAt(i));
    }
}


function GetPlayGround(allWords: Array<string>): Grid {
    var grid = new Grid();
    grid.maxX = 0;

    var horizontalWord = GetHorizontalWord(allWords);

    // console.log("--------------------------");
    // console.log(horizontalWord + "***");

    var vw1 = GetVerticalWord(horizontalWord.charAt(0), horizontalWord, allWords);
    var vw2 = GetVerticalWord(horizontalWord.charAt(2), horizontalWord, allWords);
    var vw3 = GetVerticalWord(horizontalWord.charAt(4), horizontalWord, allWords);
    var vw4 = GetVerticalWord(horizontalWord.charAt(6), horizontalWord, allWords);

    var i1 = vw1.indexOf(horizontalWord.charAt(0));
    var i2 = vw2.indexOf(horizontalWord.charAt(2));
    var i3 = vw3.indexOf(horizontalWord.charAt(4));
    var i4 = vw4.indexOf(horizontalWord.charAt(6));

    if (i1 < 0 || i2 < 0 || i3 < 0 || i4 < 0) {
        return grid;
    }

    var maxIndex = i1;
    if (i2 > maxIndex) maxIndex = i2;
    if (i3 > maxIndex) maxIndex = i3;
    if (i4 > maxIndex) maxIndex = i4;

    // console.log(i1 + ", " + i2 + ", " + i3 + ", " + i4);
    // console.log(maxIndex);

    PutVeritcalWord(vw1, 0, maxIndex - i1, grid);
    PutVeritcalWord(vw2, 2, maxIndex - i2, grid);
    PutVeritcalWord(vw3, 4, maxIndex - i3, grid);
    PutVeritcalWord(vw4, 6, maxIndex - i4, grid);

    PutHorizontalWord(horizontalWord, maxIndex, grid);

    //grid.maxX = 10;
    //console.log(grid);

    return grid;
}


export const GET: RequestHandler = async (event) => {
    var resp: Array<any> = [];

    // var allWordsStr = fs.readFileSync("C:\\_Git\\Crozzle\\src\\lib\\se_utf8.txt", "utf-8").toString();
    // var allWords = allWordsStr.split("\n");
    // var bb = ""
    // for (var i = 0; i < allWords.length; i++) {
    //     if (bb != "") bb += ",\n";
    //     bb += "    \"" + allWords[i].trim() + "\"";
    // }
    // bb = "export let allWordsSE = [" + bb;
    // bb += "]";
    // fs.writeFileSync("C:\\_Git\\Crozzle\\src\\lib\\se.ts", bb);

    while (true) {
        var pg = GetPlayGround(allWordsSE);

        var w = "";
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                w += pg.getLetter(x, y) ?? " ";
            }
            w += "\n";
        }

        // console.log(w);
        console.log("BACKEND: \n" + w);

        console.log(CountCommonLetters("eeeeeee", "e"));


        if (pg.maxX > 0) {
            return {
                status: 200,
                body: w
            }
        }
    }
};
