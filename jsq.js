let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["Which of the following is used to define a function in JavaScript?",
        "function myFunc() {}",
        "def myFunc() {}",
        "func myFunc() {}",
        "myFunc function() {}"],
    ["What is the 'this' keyword in JavaScript?",
        "Refers to the current function",
        "Refers to the global object",
        "Refers to the object calling the method",
        "Refers to the function's return value"],
    ["Which of the following is used to define a constant in JavaScript?",
        "let",
        "const",
        "var",
        "final"],
    ["What does typeof operator do in JavaScript?",
        "It checks the type of a variable at runtime.",
        "It converts the variable to a string.",
        "It initializes the variable.",
        "It declares a new variable."],
    ["What does bind() method do in JavaScript?",
        "It binds an event handler to an element.",
        "It changes the value of 'this' for a function.",
        "It attaches a variable to a function.",
        "It binds two functions together."],
    ["What is the purpose of the 'async' keyword in JavaScript?",
        "It defines an asynchronous function.",
        "It synchronizes the execution of functions.",
        "It sets the function to return a promise.",
        "It pauses the function's execution."],
    ["Which of the following will cause an error in JavaScript?",
        "var x = 10;",
        "let y = 'hello'",
        "const z = 20;",
        "x = 15; where x is declared as const"],
    ["What does JSON.parse() do in JavaScript?",
        "It converts a JavaScript object to JSON format.",
        "It parses JSON data and converts it into a JavaScript object.",
        "It checks if the JSON is valid.",
        "It converts an object into a string."],
    ["What does console.log() do in JavaScript?",
        "Displays an error in the browser's console.",
        "Logs output to the console.",
        "Logs data to a file.",
        "Prints to the page's body."],
    ["Which of the following is true about promises in JavaScript?",
        "A promise can have multiple states (pending,resolved,rejected).",
        "A promise can only be resolved once.",
        "Promises are only used for asynchronous operations.",
        "Promises cannot be chained together."],
    ["Which of the following can be used to iterate over an array in JavaScript?",
        "forEach()",
        "map()",
        "for loop",
        "All of the above"],
    ["What is the purpose of setTimeout() in JavaSCript?",
        "It executes a function at a specified time.",
        "It sets the execution time for a function",
        "It sets a timer for the execution of a function.",
        "It delays the function execution inedefinitely."],
    ["What is the difference between null and undefined in JavaScript?",
        "null represents an absence of value, undefined represents a declared but uninitialized variable.",
        "Both represent absence of a value.",
        "undefined is used for objects, null is used for primitives.",
        "There is no difference."],
    ["Which of the following is used to create an object in JavaScript?",
        "let obj = {}",
        "let obj = Object();",
        "let obj = new Object();",
        "All of the above"],
    ["What is an example of event delegation in JavaScript?",
        "Attaching a handler to a parent element and capturing events from children.",
        "Using multiple event listeners on each element.",
        "Changing the event target dynamically.",
        "Directly calling a function when an event occurs."]
];

// Define the correct answers for each question based on the options in arr.
const ans = [
    'op1',  // "function myFunc() {}" (correct answer for question 1)
    'op3',  // "Refers to the object calling the method" (correct answer for question 2)
    'op2',  // "const" (correct answer for question 3)
    'op1',  // "It checks the type of a variable at runtime." (correct answer for question 4)
    'op2',  // "It changes the value of 'this' for a function." (correct answer for question 5)
    'op1',  // "It defines an asynchronous function." (correct answer for question 6)
    'op4',  // "x = 15; where x is declared as const" (correct answer for question 7)
    'op2',  // "It parses JSON data and converts it into a JavaScript object." (correct answer for question 8)
    'op2',  // "Logs output to the console." (correct answer for question 9)
    'op1',  // "A promise can have multiple states (pending, resolved, rejected)." (correct answer for question 10)
    'op4',  // "All of the above" (correct answer for question 11)
    'op1',  // "It executes a function at a specified time." (correct answer for question 12)
    'op1',  // "null represents an absence of value, undefined represents a declared but uninitialized variable." (correct answer for question 13)
    'op3',  // "let obj = new Object();" (correct answer for question 14)
    'op1'   // "Attaching a handler to a parent element and capturing events from children." (correct answer for question 15)
];


function reset(){
    let options = document.querySelectorAll('input[type="radio"]');
    options.forEach(option => {
        option.checked = false;
    });
}

function ques() { 
    if(x==15){
        submit();
        return;
    }
    if (x <= 14) { 
        
        /*const correctAnswers = [
            'int *ptr', 
            'It allows a variable to retain its value across function calls', 
            'It deallocates memory', 
            'The size of operand in bytes', 
            'Function pointers store the memory address of a function.', 
            'Garbage Value', 
            '#define macro_name(value)', 
            'Using a null pointer to reference memory.', 
            'return value;', 
            'Includes a library in the code.', 
            'All of the above', 
            'Prevents modifying a variable.', 
            'Undefined behavior', 
            'fgets()', 
            'Arrays in C are passed by reference to functions.'
        ];*/

        document.getElementById('qn').innerHTML = `Q${x+1}. ${arr[x][0]}`;
        document.getElementById('op1').innerHTML = arr[x][1];
        document.getElementById('op2').innerHTML = arr[x][2];
        document.getElementById('op3').innerHTML = arr[x][3];
        document.getElementById('op4').innerHTML = arr[x][4];

        let rx = document.querySelectorAll('input[name="a"]');
        rx.forEach(option=> {
            if(option.checked){
                uip.push(option.value);
            }
        });

        x++;
    }
    
    reset();
}
ques();
let timeInSeconds = 300;
const timer = document.getElementById('min');
const updateTimer = () => {
        let minutes = String(Math.floor(timeInSeconds / 60)).padStart("2",0);
        let seconds = String(Math.floor(timeInSeconds%60)).padStart("2",0);
        timer.textContent = `${minutes}:${seconds}`;
        if(timeInSeconds>0){
            timeInSeconds--;
        }else{
            clearInterval(interval);
        }
        if(minutes=='00' && seconds=='00'){
            document.getElementById('min').innerHTML = '00:00';
            submit();
        }
};
const interval = setInterval(updateTimer, 1000);

function submit(){
    let kx = document.querySelectorAll('input[name="a"]');
        kx.forEach(option=> {
            if(option.checked){
                uip.push(option.value);
            }
        });
    for(let i=0;i<uip.length;i++){
        if(uip[i]==ans[i]){
            score+=1;
        }
    }
    document.body.innerHTML = `<div class="group">
                                    <div id="gpl">
                                        <div id="pp">
                                            <div class='exe'>Score.exe</div>
                                            <div class="options">
                                                <div class="opt1">-</div>
                                                <div class="opt2">x</div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="ingpl">
                                            <div id="msg3">${score}/15</div>
                                        </div>
                                        <div class="kbs"><div id="msg1">Thank you so much for taking the time to complete the quiz! We hope you enjoyed the experience and learned something new. If you're up for more challenges, be sure to check out our other quizzes — there's always something fun and exciting waiting for you. Keep testing your knowledge and have fun while doing it!</div></div>
                                        <div id="clk">
                                            <button id="ret" onclick="quiz.html"><a href="quiz.html">Try Again</a></button>
                                        </div>
                                    </div>
                                </div>`;
}