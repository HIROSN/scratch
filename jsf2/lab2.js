/*********************************************************
LAB 2: Campy Sci-fi

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below. Look for
the word TODO in comments.  Each TODO will have a description of what
is required.

Save this file wherever you like. To run it, navigate (in the
terminal) to wherever you saved it, and type: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: Body Swap. 24 points.
//*********************************************************

function Person (gender, occupation, interest) {
  // TODO: modify this constructor to create objects
  // with several properties, some of which model physical
  // attributes, and some of which model mental attributes.
  // Examples might include height (physical) and favorite
  // book (mental). It should take arguments so that each
  // object it creates can be unique.
  this.gender = gender;
  this.occupation = occupation;
  this.interest = interest;
}

// the parameters a and b are Person objects
function bodySwap(a, b) {
  // TODO: swap all the mental attributes of person a and person b
  var occupation = a.occupation;
  var interest = a.interest;
  a.occupation = b.occupation;
  a.interest = b.interest;
  b.occupation = occupation;
  b.interest = interest;
}

// TODO: give kirk some unique attributes
var kirk = new Person('male', 'officer', 'explorer');

// TODO: give drLester some unique attributes
var drLester = new Person('female', 'scientist', 'research');

// TODO: write two assertions, one about kirk and one about drLester
// anything that should be true at this point about them
assert(kirk.interest === 'explorer', 'is kirk alive?');
assert(drLester.occupation === 'scientist', 'drLester to command a starship');

bodySwap(kirk, drLester);

// TODO: write two more assertions, one about kirk and one about
// drLester. test for things that should have changed during the
// call to bodySwap
assert(kirk.interest === 'research', 'kirk is the captain');
assert(drLester.occupation === 'officer', 'drLester made the discovery');

//*********************************************************
// PROBLEM 2: The Blob. 24 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 it's meteorite. At first, the blob could only find and consume
 pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became five % faster.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       1.05/hour
        2          |       1.1025/hour
        3          |       1.1576/hour

 Use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
var hoursSpent = 0;
var rateOfConsumption = 1;
var personsConsumed;

for (personsConsumed = 0; personsConsumed < 1000; personsConsumed++) {
  hoursSpent += 1 / rateOfConsumption;
  rateOfConsumption *= 1.05;
}

// TODO: assign me the value of the above calculation
var hoursSpentInDowington = hoursSpent;
console.log('Hours spent in Dowington:', +hoursSpent.toFixed(4));

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze it's way through that town.

function hoursToOoze(population, peoplePerHour) {
  // TODO: implement me based on the instructions above
  var hoursSpent = 0;
  var rateOfConsumption = peoplePerHour || 1;
  var personsConsumed;

  for (personsConsumed = 0; personsConsumed < population; personsConsumed++) {
    if (hoursSpent + 1 / rateOfConsumption > hoursSpent) {
      hoursSpent += 1 / rateOfConsumption;
      rateOfConsumption *= 1.05;
    }
    else {
      break;
    }
  }

  return hoursSpent;
}

assert(hoursToOoze(0) === 0, 'no people means no time needed.');
assert(hoursToOoze(1000) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(hoursToOoze(1) === 1, 'one hour to consume one person.');

assert(hoursToOoze(2) === 1 + 1 / 1.05,
  '1.9523809523809523 hours to consume 2 people');

assert(hoursToOoze(3) === 1 + 1 / 1.05 + 1 / 1.1025,
  '2.8594104308390023 hours to consume 3 people');

assert(hoursToOoze(700) === hoursToOoze(1000), 'after consuming about 695 ' +
  'people, time spent until the next person is small enough to ignore.');

function hoursToOozeRecursion(population, peoplePerHour) {
  if (population > 0) {
    peoplePerHour = peoplePerHour || 1;

    return 1 / peoplePerHour +
      hoursToOozeRecursion(population - 1, peoplePerHour * 1.05);
  }

  return 0;
}

assert(
  +hoursToOozeRecursion(1000).toFixed(4) === +hoursToOoze(1000).toFixed(4),
  [hoursToOozeRecursion(1000), hoursToOoze(1000)]);

assert(hoursToOozeRecursion(1000) !== hoursToOoze(1000),
  [hoursToOozeRecursion(1000), hoursToOoze(1000), 'this is pain']);

//*********************************************************
// PROBLEM 3: Universal Translator. 22 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (homePlanet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.language = language;

  // sb is a SentientBeing object
  this.sayHello = function(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
    console.log(hello[this.language]);
    return hello[sb.language];
  };
}

// TODO: create three SentientBeings, one for each language in the
// 'hello' object above.
var klingon = new SentientBeing('Qo\'noS', 'klingon'); // TODO: fix me
var romulan = new SentientBeing('Romulus', 'romulan'); // TODO: fix me
var human = new SentientBeing('Earth', 'federation standard'); // TODO: fix me

assert(human.sayHello(klingon) === 'nuqneH',
  'the kligon should hear nuqneH');
// TODO: write five more assertions, to complete all the possible
// greetings between the three sentient beings you created above.
assert(romulan.sayHello(klingon) === 'nuqneH',
  'the kligon should hear nuqneH');

assert(human.sayHello(romulan) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert(klingon.sayHello(romulan) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert(romulan.sayHello(human) === 'hello',
  'the human should hear hello');

assert(klingon.sayHello(human) === 'hello',
  'the human should hear hello');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
//  jshint lab2.js
//  jscs -p google lab2.js
//*********************************************************
