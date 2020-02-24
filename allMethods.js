class AllMethods {
    constructor() {
        this.words = new WordsList()
        this.hangmanElements = document.querySelectorAll('.hanging-tree');
        this.hangmanContainer = document.querySelector('.hangman-elements');
        this.winnerDiv = document.querySelector('.winner');
        this.looserDiv = document.querySelector('.looser');
        this.selectedWord = '';
        this.elementIndex = 0; //index of particular element of hangman
        this.hintsToUse = 3;
    }
    
// drawing of word
    getRandomWord() {
        const wordsList = this.words.listOfWords
        const rndNum = Math.floor((Math.random() * wordsList.length));
        this.selectedWord = wordsList[rndNum].toUpperCase();
    }
    printEmptySpaces() {
        let printWord = '';
        document.querySelector('.word-to-guess').style = `grid-template-columns: repeat(${this.selectedWord.length}, 35px)`;
        for(let letter of this.selectedWord)
            printWord += `<input type="text" maxlength="1" class="word-letters">`;
        document.querySelector('.word-to-guess').innerHTML = printWord;
    }
    
// keyboards
    useDeviceKeyboard() {
        window.addEventListener('keydown', this.printByPress.bind(this))
    }
    useDisplayedKeyboard() {
        const keys = document.getElementsByTagName('button');
        Array.from(keys).forEach(btn => { btn.addEventListener('click', this.printByClick.bind(this))})
    }
    
// printing letter
    printByClick(e) {
        if(e.target.classList.contains('keyboard-alphabet')) {
            const clicked = e.target.innerText;
            this.printLetter(clicked)
        }
    }
    printByPress(e) {
        const keyCodesRange = [65, 90]; //scope of keyCodes of letters on keaybord
        const btnKeyCode = e.keyCode;
        const btnToPrint = e.key.toUpperCase();
        
        if(btnKeyCode >= keyCodesRange[0] && btnKeyCode <= keyCodesRange[1])
            this.printLetter(btnToPrint)
    }
    printLetter(input) {
        const chosenWord = this.selectedWord;
        const wordToGuess = document.querySelectorAll('.word-letters');
        
        if(Array.from(chosenWord).includes(input)) {
            Array.from(chosenWord).map((letter, index) => {if(letter === input) wordToGuess[index].value = input})
            console.log(chosenWord);
            }
        else {
            this.addElementToHangingTree(this.elementIndex);
            this.elementIndex++;
            console.log(this.elementIndex)
        }
        this.winner();
        this.looser();
    }
    
// hanging-tree elements
    addElementToHangingTree(elementIndex) {
        
        Array.from(this.hangmanElements).map((item, i) => {
             if(elementIndex == 0)
                 this.showHangmanContainer();
             if(i == elementIndex)
                 item.style.display = 'block';
         })
    }
    hideHangmanElements() {
        
//        hangmanContainer.style.position = 'relative';
        this.hangmanContainer.style = 'left: -3000px';
        this.hangmanElements.forEach(item => item.style.display = 'none');
    }
    showHangmanContainer() {
        const hangmanContainer = document.querySelector('.hangman-elements');
        
//        hangmanContainer.style.position = 'relative';
        this.hangmanContainer.style = 'left:0';
    }
    
// win or lose
    winner() {
        const chosenWord = this.selectedWord;
        const wordToGuess = document.querySelectorAll('.word-letters');
        let counter = 0;
        for(let l in chosenWord) 
            if(chosenWord[l] === wordToGuess[l].value) counter++;
        
        if(counter === chosenWord.length) {
            console.log('winner');
            this.displayWinnerDiv();
        }
    }
    looser() {
        if(this.elementIndex === this.hangmanElements.length) {
            console.log('looser');
            this.displayLooserDiv();
        }
    }
    displayLooserDiv() {
        this.looserDiv.style = 'top: 0';
    }
    displayWinnerDiv() {
        this.winnerDiv.style = 'top: 0';
    }
    
// Buttons
    getAnotherWordBtn() {
        document.querySelector('.draw-word-btn').addEventListener('click', ()=> {
            this.newWord();
            console.log(this.selectedWord);
        })
    }
    hintBtn() {
        document.querySelector('.hint').addEventListener('click', () => {
            if(this.hintsToUse >= 1) {
                const chosenWord = this.selectedWord;
                const wordToGuess = document.querySelectorAll('.word-letters');
                let emptyIndex = []
                for(let l in chosenWord) {
                    if(chosenWord[l] !== wordToGuess[l].value)
                        emptyIndex.push(Array.from(wordToGuess).indexOf(wordToGuess[l]));
                }
                const rndNum = Math.floor((Math.random() * emptyIndex.length));
                const hintLetter = chosenWord[emptyIndex[rndNum]];
                this.printLetter(hintLetter);
                console.log(this.hintsToUse)
                this.hintsToUse--;
                this.printLeftHints(this.hintsToUse);
                }
            })
    }
    printLeftHints(num) {
        const hintsDiv = document.querySelector('.hints-left')
        hintsDiv.innerHTML = '';
        
        for(let i = 0; i < num; i++)
            hintsDiv.innerHTML += '<i class="fa fa-heart fa-3x hints-heart" aria-hidden="true"></i>';
    }
    nextWordAfterWinOrLoseBtn() {
        const nexWordBtns = document.querySelectorAll('.next-word-btn');
        
        nexWordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
            this.newWord();
            this.winnerDiv.style = 'top: -6000vh';
            this.looserDiv.style = 'top: -6000vh';
            console.log(this.selectedWord);
            })
        })
    }
    
// Collected methods to run
    newWord() {
        this.getRandomWord(); // runs the method and drawing for random word
        this.printEmptySpaces();
        this.hideHangmanElements();
        this.elementIndex = 0;
        this.hintsToUse = 3;
        this.printLeftHints(this.hintsToUse);
    }    

}
