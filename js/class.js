"use strict";

let main = document.querySelector(".main");

class Options {
    constructor(height, width, bg, fontSize, textAlign, text) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
        this.text = text;
    }
    createDiv() {
       let div = document.createElement('div');
       div.style.height = this.height;
       div.style.width = this.width;
       div.style.backgroundColor = this.bg;
       div.style.fontSize = this.fontSize;
       div.style.textAlign = this.textAlign;
       div.textContent = this.text;
       document.body.appendChild(div);
    }
}

var Block = new Options(200, 300, "#000000", "20px", "center", "Lorem Ipsum Dolor");

Block.createDiv();