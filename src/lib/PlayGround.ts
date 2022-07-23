export class Grid {
    letters: string[] = [];
    maxX: number = 0;
    maxY: number = 0;
    correctLetters: string[] = [];
    validLetters: string = "abcdefghijklmnopqrstuvwxyzåäö";
    selectedLetters: string = "";

    getValidLetters(): Array<string> {
        var ret = new Array<string>();
        for (var i = 0; i < this.validLetters.length; i++) {
            var lett = this.validLetters.charAt(i).toUpperCase();
            ret.push(lett);
        }

        return ret;
    }

    isValidLetter(letter: string): boolean {
        for (var i = 0; i < this.validLetters.length; i++) {
            if (letter.toUpperCase() == this.validLetters.charAt(i).toUpperCase())
                return true;
        }

        return false;
    }


    isCorrectLetter(bb: any, letter: string): boolean {
        var isSelected = false;
        for (var j = 0; j < this.selectedLetters.length; j++) {
            if (this.selectedLetters.charAt(j).toUpperCase() == letter.toUpperCase()) {
                isSelected = true;
            }
        }

        if (!isSelected)
            return false;

        for (var i = 0; i < this.correctLetters.length; i++) {
            if (this.correctLetters[i] == letter)
                return true;
        }
        return false;
    }

    isFaultyLetter(bb: any, letter: string): boolean {
        var isSelected = false;
        for (var j = 0; j < this.selectedLetters.length; j++) {
            if (this.selectedLetters.charAt(j).toUpperCase() == letter.toUpperCase()) {
                isSelected = true;
            }
        }

        if (!isSelected)
            return false;

        for (var i = 0; i < this.correctLetters.length; i++) {
            if (this.correctLetters[i] == letter)
                return false;
        }
        return true;
    }



    setLetter(x: number, y: number, letter: string) {
        // if (!this.isCorrectLetter("dummy", letter)) {
        //     this.correctLetters.push(letter);
        // }

        if (x > this.maxX) this.maxX = x;
        if (y > this.maxY) this.maxY = y;
        this.letters[x + y * 20] = letter;

        for (var i = 0; i < this.correctLetters.length; i++) {
            if (this.correctLetters[i].toUpperCase() == letter.toUpperCase())
                return;
        }
        this.correctLetters.push(letter.toUpperCase());
    }

    getLetter(x: number, y: number): string {
        return (this.letters[x + y * 20]);
    }

    getNumberOfFails(bb: any) {
        var numFails = 0;
        for (var i = 0; i < this.selectedLetters.length; i++) {
            if (this.isFaultyLetter("fit", this.selectedLetters.charAt(i))) {
                numFails++;
            }
        }
        return numFails;
    }

    isLetterInSelected(letter: string): boolean {
        for (var i = 0; i < this.selectedLetters.length; i++) {
            if (letter.toUpperCase() == this.selectedLetters.charAt(i)) return true;
        }
        return false;
    }


    isSolved(bb: any): boolean {
        for (var i = 0; i < this.correctLetters.length; i++) {
            if (!this.isLetterInSelected(this.correctLetters[i])) return false;
        }

        return true;
    }

    isFailed(bb: any): boolean {
        return this.getNumberOfFails("aaa") >= 4;
    }

}