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
        if (x > this.maxX) this.maxX = x;
        if (y > this.maxY) this.maxY = y;
        this.letters[x + y * 20] = letter;

        if (!this.isCorrectLetter("dummy", letter))
            this.correctLetters.push(letter);
    }

    getLetter(x: number, y: number): string {
        return (this.letters[x + y * 20]);
    }


}