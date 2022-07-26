import { Grid } from "$lib/PlayGround";
import { allWordsSE } from "$lib/se";
import { allWordsEN_US } from "$lib/en_us";
import type { RequestHandler } from "@sveltejs/kit";
import fs from 'fs'

var validLetters: string;
function IsValidLetter(letter: string): boolean {
    for (var i = 0; i < validLetters.length; i++) {
        if (validLetters.charAt(i).toUpperCase() == letter.toUpperCase()) return true;
    }
    return false;
}

function IsContainingOnlyValidLetters(word: string): boolean {
    for (var i = 0; i < word.length; i++) {
        if (!IsValidLetter(word.charAt(i))) return false;
    }
    return true;
}

function CountCommonLetters(one: string, two: string): number {
    var count = 0;
    var alreadyCountedLetters = new Array<string>();
    for (var i = 0; i < one.length; i++) {
        for (var j = 0; j < two.length; j++) {
            if (one[i] == two[j]) {
                if (alreadyCountedLetters.find(p => p == one[i])) {
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
        if (!IsContainingOnlyValidLetters(word))
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
    if (!IsContainingOnlyValidLetters(word))
        return false;
    //if (word.length == 8) return true;
    if (word.length >= 7 && word.length <= 8) {
        return true;
    }
    return false;
}

function GetHorizontalWord(allWords: Array<string>): string {
    var startIndex = Math.round(Math.random() * allWords.length);
    for (var i = startIndex; i < allWords.length; i++) {
        var word = allWords[i].trim();
        if (IsValidHorizontal(word)) {
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


function GetPlayGround(allWords: Array<string>, validLetters: string): Grid {
    var grid = new Grid();
    grid.maxX = 0;
    grid.validLetters = validLetters;

    var horizontalWord = GetHorizontalWord(allWords);
    //var horizontalWord = "svartare";
    //console.log("GetPlayGround");

    var vw1 = GetVerticalWord(horizontalWord.charAt(0), horizontalWord, allWords);
    var vw2 = GetVerticalWord(horizontalWord.charAt(2), horizontalWord, allWords);
    var vw3 = GetVerticalWord(horizontalWord.charAt(4), horizontalWord, allWords);
    var vw4 = GetVerticalWord(horizontalWord.charAt(6), horizontalWord, allWords);
    // var vw1 = "spikar";
    // var vw2 = "våldta";
    // var vw3 = "simtag";
    // var vw4 = "löpare";

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

    PutVeritcalWord(vw1, 0, maxIndex - i1, grid);
    PutVeritcalWord(vw2, 2, maxIndex - i2, grid);
    PutVeritcalWord(vw3, 4, maxIndex - i3, grid);
    PutVeritcalWord(vw4, 6, maxIndex - i4, grid);

    PutHorizontalWord(horizontalWord, maxIndex, grid);

    return grid;
}

import { browser, dev, prerendering } from '$app/env';

export const POST: RequestHandler = async (event) => {
    console.log("Hej " + browser);

    var req = await event.request.json();
    console.log(req);

    var wl = allWordsSE;
    if (req.language == "Svenska") {
        validLetters = "abcdefghijklmnopqrstuvwxyzåäö";
        wl = allWordsSE;
    }
    if (req.language == "English US") {
        validLetters = "abcdefghijklmnopqrstuvwxyz";
        wl = allWordsEN_US
    }

    var resp: Array<any> = [];

    var resp: Array<any> = [];

    // https://www.mit.edu/~ecprice/wordlist.10000

    // console.log("LÄSA FIL!");
    // var allWordsStr = fs.readFileSync("C:\\_Git\\Crozzle\\src\\lib\\en_us1.txt", "utf-8").toString();
    // var allWords = allWordsStr.split("\n");
    // console.log(allWords.length);
    // var bb = ""
    // for (var i = 0; i < allWords.length; i++) {
    //     if (bb != "") bb += ",\n";
    //     bb += "    \"" + allWords[i].trim() + "\"";
    // }
    // bb = "export let allWordsEN_US = [" + bb;
    // bb += "]";
    // fs.writeFileSync("C:\\_Git\\Crozzle\\src\\lib\\en_us.ts", bb);



    //while (true) {
    for (var i = 0; i < 1000; i++) {

        var pg = GetPlayGround(wl, validLetters);

        if (pg.maxX <= 0) {
            console.log("KUNDE INTE HITTA");
            continue;
        }

        var w = "";
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                w += pg.getLetter(x, y) ?? " ";
            }
            w += "\n";
        }

        console.log(pg.selectedLetters);

        var da = { s: w, validLetters: pg.validLetters };
        console.log("endpoint:" + JSON.stringify(da));
        console.log(da.validLetters);

        return {
            status: 200,
            body: JSON.stringify(da)
        }
    }
};
