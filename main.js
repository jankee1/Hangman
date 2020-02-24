class Main {
    constructor() {
        this.methods = new AllMethods();
        this.run();
    }
    
    run() {
        this.methods.newWord();
        this.methods.useDisplayedKeyboard();
        this.methods.useDeviceKeyboard();
        this.methods.getAnotherWordBtn();
        this.methods.nextWordAfterWinOrLoseBtn();
        this.methods.hintBtn();
        console.log(this.methods.selectedWord);
    }
    
}
const App = new Main();
