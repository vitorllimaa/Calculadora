class CalcControlle {


    constructor() {

        this._lastOperation = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._timeEl = document.querySelector("#hora");
        this._dateEl = document.querySelector("#data");
        this._currentDate;
        this.initialize();
        this.initButtonEvents();
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.setDisplayToDisplay();

    }
    setDisplayDateTime() {
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearall() {

        this._operation = [];
        this.setDisplayToDisplay();

    }

    cleanEntry() {
        this._operation.pop();
        this.setDisplayToDisplay();
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return (['+', '-', '/', '*', '%'].indexOf(value) > -1);

    }

    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {

            this.cal();


        } else {

        }


    }

    getResult() {
        return eval(this._operation.join(""));

    }

    cal() {

        let last = '';

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
                
        }
        
        let result = this.getResult();

        if (last == '%') {

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];
            if (last) this._operation.push(last);

        }

        this.setDisplayToDisplay();



    }
    setDisplayToDisplay() {

        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        if (!lastNumber) lastNumber = 0;
        this.displaycalc = lastNumber;


    }


    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if (isNaN(value)) {

                console.log(value);

            } else {
                this.pushOperation(value);
                this.setDisplayToDisplay();
            }


        } else {


            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setDisplayToDisplay();

            }

        }

    }

    seterro() {
        this.displaycalc = "Error";
    }
    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearall();
                break;
            case 'ce':
                this.cleanEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.cal();
                break;
            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;


            default:
                this.setError();

                break;

        }
    }


    initButtonEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = (btn.className.baseVal.replace("btn-", ""));

                this.execBtn(textBtn);

            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";

            });

        });
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl;
    }
    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displaycalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displaycalc(valor) {
        this._displayCalcEl.innerHTML = valor;
    }

    get currentDate() {
        return new Date();
    }
    set currentDate(valor) {
        this.currentDate = valor;
    }
}


    // setTimeout(() => {
    //     clearInterval(Interval);
    // }, 10000);