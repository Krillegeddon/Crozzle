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

    isCorrectLetter(letter: string): boolean {
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

    isFaultyLetter(letter: string): boolean {
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

        if (!this.isCorrectLetter(letter))
            this.correctLetters.push(letter);
    }

    getLetter(x: number, y: number): string {
        return (this.letters[x + y * 20]);
    }

    populateGrid() {
        this.letters = [];

        this.maxX = 0;
        this.maxY = 0;
        this.setLetter(6, 0, "V");
        this.setLetter(6, 1, "I");
        this.setLetter(6, 2, "S");
        this.setLetter(6, 3, "I");
        this.setLetter(6, 4, "R");

        this.setLetter(4, 4, "T");
        this.setLetter(4, 5, "O");
        this.setLetter(4, 6, "K");
        this.setLetter(4, 7, "I");
        this.setLetter(4, 8, "G");

        this.setLetter(2, 2, "S");
        this.setLetter(2, 3, "K");
        this.setLetter(2, 4, "A");
        this.setLetter(2, 5, "T");
        this.setLetter(2, 6, "A");

        this.setLetter(0, 3, "U");
        this.setLetter(0, 4, "T");
        this.setLetter(0, 5, "E");

        this.setLetter(0, 4, "T");
        this.setLetter(1, 4, "R");
        this.setLetter(2, 4, "A");
        this.setLetter(3, 4, "K");
        this.setLetter(4, 4, "T");
        this.setLetter(5, 4, "O");
        this.setLetter(6, 4, "R");
    }

    /*
    .0123456
   0.      V
   1.      I
   2.  S   S
   3.U K   I
   4.TRAKTOR    
   5.E T O
   6.  A K
   7.    I
   8.    G
    */
}