const puppeteer = require('puppeteer');
//modifiers
/*let text = "Is this all there is?";
let pattern = /is/g; 
let result = text.match(pattern);
console.log(result);*/
//global match

let text = "Visit W3Schools";
let pattern = /w3schools/i;
let result = text.match(pattern);
console.log(result);
//case insensitive search for "is"

/*let text = 'Is this all there is';
let pattern = /^is/m;
let result = text.match(pattern);
console.log(result);*/
//mulitiline search for "is"

//groups
/*let text = "Is this all there is?";
let pattern = /[h]/g;
let result = text.match(pattern);
console.log(result);*/
//global search for the character "h" in a string

/*let text = "Is this all there is?";
let pattern = /[^h]/g;
let result = text.match(pattern);
console.log(result);*/
//global search for characters NOT inside the brackets [h]

/*let text = "123456789";
let pattern = /[1-4]/g;
let result = text.match(pattern);
console.log(result);*/
//global search for the numbers 1, 2, 3, 4 in a string

/*let text = "123456789";
let pattern = /[^1-4]/g;
let result = text.match(pattern);
console.log(result);*/
//global search for numbers that are NOT from 1 to 4

/*let text = "re, green, red, green, gren, gr, blue, yellow";
let pattern = /(red|green)/g;
let result = text.match(pattern);
console.log(result);*/
//global serach for any of the alternatives (red|green)

//metacharecters
/*let text = "That's hot!";
let pattern = /h.t/g;
let result = text.match(pattern);
console.log(result);*/
// global search for "h.t". starting h ending t

/*let text = "Give 100%!";
let pattern = /\w/g;
let result = text.match(pattern);
console.log(result);*/
//neglect the symbols, words and numbers only get

/*let text = "Give 100%!";
let pattern = /\W/g;
let result = text.match(pattern);
console.log(result);*/
// sapce and symbols only get

/*let text = "Give 100%!";
let pattern = /\d/g;
let result = text.match(pattern);
console.log(result);*/
//numbers (digits) only get

/*let text = "Give 100%!";
let pattern = /\D/g;
let result = text.match(pattern);
console.log(result);*/
//neglect digits and get character, symbols

/*let text = "Is this all there is?";
let pattern = /\s/g;
let result = text.match(pattern);
console.log(result);*/
//space only get

/*let text = "Is this all there is";
let pattern = /\S/g;
let result = text.match(pattern);
console.log(result);*/
//neglect space and get all letters

/*let text = "HELLO, LOOK AT YOU!";
let pattern = /\bLO/;
let result = text.search(pattern);
console.log(result);*/
//search for "LO" at the beginning of a word but get that position only

/*let text = "HELLO, LOOK AT YOU!";
let pattern = /\BLO/;
let result = text.match(pattern);
console.log(result);*/
//search for "LO" at last for a word and get position only

/*let text = "Visit W3Schools.\0Learn JavaScript.";
let pattern = /\0/;
let result = text.search(pattern);
console.log(result);*/
//it is showing position of "0"

/*let text = "Visit W3Schools.\nLearn JavaScript.";
let pattern = /\n/;
let result = text.search(pattern);
console.log(result);*/
//search for a newline character in a string

/*let text = "Visit W3Schools.\fLearn JavaScript.";
let pattern = /\f/;
let result = text.search(pattern);
console.log(result);*/
//search for a form feed character in a string

/*let text = "Visit W3Schools.\rLearn JavaScript.";
let pattern = /\r/;
let result = text.search(pattern);
console.log(result);*/
//position of "\r"

/*let text = "Visit W3Schools.\tLearn JavaScript.";
let pattern = /\t/;
let result = text.search(pattern);
console.log(result);*/
//position of "\t"

/*let text = "Visit W3Schools.\vLearn JavaScript.";
let pattern = /\v/;
let result = text.search(pattern);
console.log(result);*/
//position of "\v";

/*let text = "Visit W3Schools. Hello World!";
let pattern =/\127/g;
let result = text.match(pattern);
console.log(result);*/
// position

/*let text = "Visit W3Schools. Hello World!";
let pattern = /\x57/g;
let result = text.match(pattern);
console.log(result);*/

/*let text = "Visit W3Schools. Hello World!";
let pattern = /\u0057/g;
let result = text.match(pattern);
console.log(result);*/

//quantifier
/*let text = "Hellooo World! Hello W3Schools!";
let pattern = /o+/g;
let result = text.match(pattern);
console.log(result);*/
//global search for at least one "o"

//let text = "Hellooo World! Hello W3Schools!";
//let pattern = /lo*/g;
//let result = text.match(pattern);
//console.log(result);
//a global search for an "l", followed by zero or more "o" characters

/*let text = "1, 100 or 1000?";
let pattern =/10?/g;
let result = text.match(pattern);
console.log(result);*/
//a global search for a "1", followed by zero or one "0" characters

/*let text = "100, 1000 or 10000?";
let pattern = /\d{4}/g;
let result = text.match(pattern);
console.log(result);*/
//showing only "4" didits

/*let text = "100, 1000 or 10000?";
let pattern = /\d{3,4}/g;
let result = text.match(pattern);
console.log(result);*/
//showing "3","4" digits

/*let text = "100, 1000 or 10000?";
let pattern = /\d{3,}/g;
let result = text.match(pattern);
console.log(result);*/
// "3" digits ku mela varalam

/*let text = "Is this his";
let pattern =/is$/;
let result = text.match(pattern);
console.log(result);*/
//a search for "is" at the end of a string

/*let text = "Is this his";
let pattern = /^Is/g;
let result = text.match(pattern);
console.log(result);*/
//"Is" come beginning

/*let text = "Is this all there is";
let pattern = /is(?= all)/;
let result = text.match(pattern);
console.log(result);*/
//a search for "is" followed by "all"

/*let text = "Is this all there is";
let pattern = /is(?! all)/gi;
let result = text.match(pattern);
console.log(result);*/
//a global, case insensitive search for "is" not followed by "all"