// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

//initialise optionsArray

var selectedOptions = [0, 0, 0, 0]
var availableOptions = ["u", "l", "n", "s"]

// check to see if each option appears atleast once, if not, return true
function complianceCheckFailed(optionsArr, arrToCheck){

  var hasOption = true;

  for (option of optionsArr){
    if (!arrToCheck.includes(option)) hasOption = false; 
  }

  return !hasOption;
}

// Function for getting a random number from 0 to range
function getRandom(range) {

  return Math.floor(Math.random() * range)
}

//make the array out of the options chosen
function generateSubArray(length, optionsArr) {
  var pwArray = []
  for (let i = 0; i < length; i++) {
    pwArray.push(optionsArr[getRandom(optionsArr.length)]);
  }
  return pwArray;
}

//Add form submission event handler

function handle_generate(event) {

  event.preventDefault();

  // get a nodelist of the checkboxes
  var checkboxes = document.querySelectorAll(".pw-option");
  console.log(checkboxes);

  // initialise clickedBoxes to 0 for validation
  var clickedBoxes = 0;
  var pwArray = [];
  // check if atleast one box has been checked and set the selectedOptions array
  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked == true) {
      clickedBoxes += 1;
      selectedOptions[i] = 1;
    } else { selectedOptions[i] = 0; }
  })

  // if not alert the user and end the function with an empty return
  if (clickedBoxes === 0) {
    alert("Please select at least one character type")
    return;
  }

  // get the value of the desired password length parsed to an integer
  var passwordLength = parseInt(document.querySelector("#pw-length").value);

  var computedOptions = [];

  //make an array of the chosen character sets
  for (let i = 0; i < 4; i++) {
    if (selectedOptions[i] === 1) {
      computedOptions.push(availableOptions[i])
    }
  }

  // setup the midpoint-array of only char types ensuring that each char type appears atleast once
  if (clickedBoxes >= 1) {
    while (complianceCheckFailed(computedOptions, pwArray)){
    pwArray = generateSubArray(passwordLength, computedOptions);
    }};

  // now replace each entry with a random entry from its options array

  for (let i = 0; i < pwArray.length; i++){
    switch(pwArray[i]){
      case 'u':
        pwArray[i] = upperCasedCharacters[getRandom(upperCasedCharacters.length)];
        break;
      case 'l':
        pwArray[i] = lowerCasedCharacters[getRandom(lowerCasedCharacters.length)];
        break;
      case 'n':
        pwArray[i] = numericCharacters[getRandom(numericCharacters.length)];
        break;
      case 's':
        pwArray[i] = specialCharacters[getRandom(specialCharacters.length)];
        break;
      default:
        break;
    }
  }


  // convert the array to a string
  var resultStr = "";
  for (let i = 0; i < pwArray.length; i++){
    resultStr += pwArray[i];
  };

  // select the password display
  var passwordText = document.querySelector('#password');

  //display the result
  passwordText.value = resultStr;
}
