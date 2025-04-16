let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["Which of the following is the correct way to declare a pointer in C?",
        "int ptr*",
        "pointer int",
        "int *ptr",
        "int* ptr"],
    ["What is the purpose of the 'static' keyword in C?",
        "It makes a variable accessible only within a function.",
        "It allows a variable to retain its value across function calls.",
        "It makes a variable accessible across different files.",
        "It initializes the variable with a default value."],
    ["Which of the following is a result of using the free() function in C?",
        "It allocates memory.",
        "It assigns a value to the pointer.",
        "It checks if the pointer is NULL.",
        "It deallocates memory."],
    ["What does the sizeof operator in C return?",
        "The memory address of the operand.",
        "The size of the operand in bytes.",
        "The size of operand in kilobytes.",
        "The total memory of the program."],
    ["Which of the following is true about function pointers in C?",
        "Function pointers store the memory address of a function.",
        "Function pointers cannot be passed as arguments.",
        "Function pointers can only point to functions that return void.",
        "Function pointers are automatically referenced."],
    ["What is the default value of an uninitialized variable in C?",
        "0",
        "NULL",
        "Garbage value",
        "Undefined behavior"],
    ["What is the correct way to define a macro in C?",
        "#macro macro_name(value)",
        "#define macro_name(value)",
        "#function macro_name(value)",
        "#variable macro_name(value)"],
    ["Which of the following will cause a segementation fault in C?",
        "Using a null pointer to reference memory.",
        "Accessing a variable inside a loop.",
        "Declaring a variable inside a function.",
        "Declaring constant."],
    ["Which of the following is a valid way to return a value from a function in C?",
        "value return;",
        "return to value;",
        "value;",
        "return value;"],
    ["What does the #include directive in C do?",
        "Includes another source file in the code.",
        "Includes a variable in the program.",
        "Includes a library in the code.",
        "Includes a function call."],
    ["Which of the following types are allowed in C as function arguments?",
        "Arrays",
        "Strings",
        "Pointers",
        "All of the above"],
    ["What does const keyword do in C?",
        "Prevents modifying a variable.",
        "Makes a variable dynamic.",
        "Makes a variable thread-safe.",
        "Makes the variable private."],
    ["What is the result of dividing by zero in C?",
        "0",
        "Undefined behavior",
        "Infinity",
        "Program crashes with an error message."],
    ["Which function in C is used to read a string from user input?",
        "scanf()",
        "gets()",
        "fgets()",
        "input()"],
    ["Which of the following statements about arrays in C is true?",
        "Arrays in C are passed by reference to functions.",
        "Arrays can hold elements of different data types.",
        "Arrays cannot be passed to functions.",
        "Arrays can only hold a fixed number of elements."]
];

const ans = [
    "op3",  // int *ptr
    "op2",  // It allows a variable to retain its value across function calls.
    "op4",  // It deallocates memory.
    "op2",  // The size of the operand in bytes.
    "op1",  // Function pointers store the memory address of a function.
    "op3",  // Garbage value
    "op2",  // #define macro_name(value)
    "op1",  // Using a null pointer to reference memory.
    "op4",  // return value;
    "op3",  // Includes a library in the code.
    "op4",  // All of the above
    "op1",  // Prevents modifying a variable.
    "op2",  // Undefined behavior
    "op3",  // fgets()
    "op1"   // Arrays in C are passed by reference to functions.
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
            alert("Time's up");
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