let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["What is the purpose of 'self' keyword in Python?",
        "Refers to the class itself.",
        "Refers to an instance of the class.",
        "Refers to the parent class.",
        "Refers to the global scope."],
    ["Which of the following is true about Python's @staticmethod decorator?",
        "It can access the instance and class variables.",
        "It is only used for class methods.",
        "It cannot access the instance or class variables.",
        "It can modify the class state."],
    ["Which of the following is a Python tuple?",
        "(1,2,3)",
        "[1,2,3]",
        "{1,2,3}",
        "1,2,3"],
    ["How do you handle exceptions in Python?",
        "Using 'catch' blocks.",
        "Using 'raise' statements.",
        "Using 'error' statements.",
        "Using 'try' and 'except' blocks."],
    ["Which of the following statements is true about the 'local' keyword in Python?",
        "The 'local' keyword in Python is used to declare variables that are local to the current function scope.",
        "The 'local' keyword is used to explicitly specify the scope of a variable outside of functions.",
        "Python does not have a 'local' keyword, but it uses function scope to manage local variables.",
        "The 'local' keyword is used to define variables that are globally accessible within a module."],
    ["Which Python data type is immutable?",
        "list",
        "set",
        "dict",
        "tuple"],
    ["What does the 'global' keyword do in Python?",
        "Makes a variable available in the global scope.",
        "Declares a variable in the global scope.",
        "Makes a function global",
        "Imports global modules",],
    ["Which of the following is used to define a function in Python?",
        "function my_function():",
        "def my_function():",
        "function my_function():",
        "def my_function:"],
    ["What is the purpose of the 'lambda' function in Python?",
        "It defines a recursive function.",
        "It creates an anonymous function.",
        "It handles exceptions.",
        "It imports a module."],
    ["How do you add an element to a Python set?",
        "set.add()",
        "set.append()",
        "set.insert()",
        "set.push()"],
    ["What is the difference between '==' and 'is' in Python?",
        "'==' compares the object identity, while 'is' compares the values.",
        "'==' compares the values, while 'is' compares the object identity.",
        "Both '==' and 'is' compare object identities.",
        "'==' and 'is' are the same."],
    ["Which of the following functions in Python returns a generator?",
        "range()",
        "list()",
        "dict()",
        "tuple()"],
    ["Which function is used to get the length of a list in Python?",
        "length()",
        "size()",
        "len()",
        "count()"],
    ["What is the result of the expression 'Hello'.upper() in Python?",
        "'HELLO'",
        "'hello'",
        "'Hello'",
        "Error"],
    ["What is the purpose of the '_init_()' method in Python?",
        "It initializes an object's attributes.",
        "It initializes the class variables.",
        "It sets default values for an object.",
        "It initializes the class itself."]
];

const ans = [
    "op2",  // "What is the purpose of 'self' keyword in Python?"
    "op3",  // "Which of the following is true about Python's @staticmethod decorator?"
    "op1",  // "Which of the following is a Python tuple?"
    "op4",  // "How do you handle exceptions in Python?"
    "op3",  // "Which of the following statements is true about the 'local' keyword in Python?"
    "op4",  // "Which Python data type is immutable?"
    "op1",  // "What does the 'global' keyword do in Python?"
    "op2",  // "Which of the following is used to define a function in Python?"
    "op2",  // "What is the purpose of the 'lambda' function in Python?"
    "op1",  // "How do you add an element to a Python set?"
    "op2",  // "What is the difference between '==' and 'is' in Python?"
    "op1",  // "Which of the following functions in Python returns a generator?"
    "op3",  // "Which function is used to get the length of a list in Python?"
    "op1",  // "What is the result of the expression 'Hello'.upper() in Python?"
    "op1"   // "What is the purpose of the '_init_()' method in Python?"
];


function reset(){
    let options = document.querySelectorAll('input[type="radio"]');
    options.forEach(option => {
        option.checked = false;
    });
}

function ques(){ 
    if(x==15){
        submit();
        return;
    }
    if (x <= 14){ 
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