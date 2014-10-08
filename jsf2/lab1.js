/* LAB 1: A Trip to Woodland Park Zoo
 Welcome to Lab 1 =)

 Be sure to read all the comments!

 All of the instructions are inline with the assignment below. Look for the word
 TODO in comments.  Each TODO will have a description of what is required.

 Save this file wherever you like. To run it, navigate (in the terminal) to
 wherever you saved it, and type:
  node lab1.js

 Instructions for turning this lab in are in the assignment description in
 Canvas.

 I'm happy to answer any questions at: mel@codefellows.org. I will post the
 questions i receive and the answers i give to a discussion group in Canvas.
*/

/* ----------------- Helper ------------------------------------------------
 We're going to skip ahead a little bit in the curriculum and take a look at a
function. This function is going to help us sanity-check our code as we write.
*/

function assert(expression, failureMessage) {
  /* jshint ignore:start */
  expression || console.log('assertion failure: ', failureMessage);
  /* jshint ignore:end */
}

/*
 An assertion is something we expect to be true about the state of the program
 at the point where the assertion is made.

 Remember, state is the values of all the data.

 Notice: I'm using short-circuiting in the assert method. I only print out the
 failure message if our assertion is incorrect.

 Here are some examples for how to use the assert method:
*/
assert(1 === 1);
assert(1 === 2, 'this is an assertion failure example. 1===2');

/*
 TODO: 4 points
 Use assert twice. Use any expressions that coerce at least one of their
 operands, such as ("2"+2)==="22" (but more creative).  Make one pass and one
 fail. In the failure message, describe why it failed. Each example is worth 2
 points.
*/
assert([] ^ '', 'Both operands of [] ^ \'\' are coerced into numerical 0, ' +
  'though they have different truthy/falsy values.');

assert(0 + [] != 0 + function() {},
  'Empty array and empty function are coerced into different strings.');

/* ----------------- Meerkats -------------------------------------------------
 Meerkats make a sort of chirping noise (according to my 30 seconds of research)
 We're going to translate two sentences into meerkat speech.
*/

var sentence1 = 'More food please.';
var sentence2 = 'Come over here so you can scratch my belly.';

/*
 TODO: 10 points
 Your goal is to replace the words in the above sentences with "chirp"
 The assertions at the end of this section should pass.
 Use two different kinds of loops to implement this.
 HINT: the "split" method on String will be useful.
*/
var wordsInSentence; // Array of words in a sentence.
var i;

// for loop (sentence1)
wordsInSentence = sentence1.split(' ');

for (i = 0; i < wordsInSentence.length; i++) {
  wordsInSentence[i] = 'chirp';
}

sentence1 = wordsInSentence.join(' ') + '.';

// while loop (sentence2)
wordsInSentence = sentence2.split(' ');
sentence2 = '';

while (wordsInSentence.length > 0) {
  sentence2 += 'chirp ';
  wordsInSentence.pop();
}

sentence2 = sentence2.trim() + '.';

assert(sentence1 === 'chirp chirp chirp.', 'sentence 1 should have 3 chirps');
assert(sentence2 === 'chirp chirp chirp chirp chirp chirp chirp chirp chirp.',
  'sentence 2 should have 9 chirps');

/* ----------------- Favorite Animals ----------------------------------------
 The zoo is closing in 20 minutes. You still haven't seen your four favorite
 animals. You only have time for one. Use Math.random() to pick which animal
 to see next. http://www.w3schools.com/jsref/jsref_random.asp
 Hint: read the whole Math.random description on that page and try the examples
*/

var favoriteAnimals = ['elephant', 'penguin', 'eagle', 'camel'];
var nextAnimal;

// TODO: 8 points
// Assign one of your favorite animals to nextAnimal using Math.random() to pick
var indexRandom = Math.floor(Math.random() * favoriteAnimals.length);

nextAnimal = favoriteAnimals[indexRandom];
console.log('Next animal: ' + nextAnimal);

assert(nextAnimal, 'assign something to nextAnimal');

/* ----------------- Hungry Lion ----------------------------------------
 As long as the lion is well-fed, he doesn't take too much heed of the
 humans that pass through. Unfortunately, the new caretaker is a little
 absent minded.

 The lion needs 4 meals per day on average to stay happy. You're going to
 figure out how many days it took before the lion decided to supplement his
 diet with the caretaker.
*/
var mealsPerDay = [5, 4, 3, 6, 2, 4, 3, 4, 5, 1]; // number of times the new caretaker
                                                  // fed the lion. one array entry per day
var tooHungryDay;

/* TODO 10 points
 Cycle through the days in mealsPerDay. At each day, print out the average
 number of meals/day the lion got since the new caretaker started.
 tooHungryDay should receive the number of days before the lion started
 pondering protein supplements (the first day the average dips below 4 meals)
*/
var totalMeals = 0; // Number of meals since day 1.
var day;            // 1 for the first day.
var averageMeals;   // Average number of meals.
var i;

for (i = 0; i < mealsPerDay.length; i++) {
  totalMeals += mealsPerDay[i];
  day = i + 1;
  averageMeals = totalMeals / day;
  console.log('Day ' + day + ': ' + averageMeals.toFixed(1) + ' meals/day');

  if (!tooHungryDay && averageMeals < 4) {
    tooHungryDay = day;
  }
}

console.log('First day average dips below 4 meals: Day ' + tooHungryDay);

assert(tooHungryDay, 'don\'t forget to assign the answer to tooHungryDay');
assert(tooHungryDay < 10, 'the lion is too hungry before the end of the array');

/* ----------------- Code Style ----------------------------------------
 TODO: 10 points
 Now, we're going to use two tools: jshint and jscs, to check our code for
 best-practices and style consistency.
 read about basic usage here: http://www.jshint.com/docs/
 and here: https://www.npmjs.org/package/jscs.
 install them with:
  npm install jscs -g
  npm install jshint -g
 and run them using:
  jshint lab1.js
  jscs -p google lab1.js
 error and warning descriptions will be printed in the terminal.
 to get full points, correct all the errors in your code. this is a new
 topic, so we'll go over this a little bit on Tuesday.
*/
