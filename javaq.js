let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["What is the default value of a boolean in Java?",
        "true",
        "false",
        "0",
        "null"],
    ["What is the difference between '==' and .equals() in Java?",
        "'==' compares references, while .equals() compares values.",
        "Both compare values.",
        "'==' compares values, while .equals() compares references.",
        ".equals() is used only for primitive types."],
    ["Which of the following is true about the 'super' keyword in Java?",
        "It refers to the current object.",
        "It is used to invoke a superclass constructor.",
        "It refers to the parent class.",
        "It is used to override a method."],
    ["Which of the following is a valid way to create a thread in Java?",
        "Extending the Thread class.",
        "Implementing the Runnable interface.",
        "Using Thread.start() directly.",
        "Both A and B."],
    ["Which method is used to start a thread in Java?",
        "start()",
        "run()",
        "begin()",
        "init()"],
    ["What is a 'checked exception' in Java?",
        "An exception that is checked at runtime.",
        "An exception that occurs due to logic errors.",
        "An exception that must be decalred or handled.",
        "An exception that is ignored by the compiler."],
    ["Which of the following is true about the 'final' keyword in Java?",
        "It can be applied to variables, methods and classes.",
        "It only applies to methods.",
        "It only applies to classes.",
        "It is used for creating constants."],
    ["Which method is used to terminate a thread in Java?",
        "stop()",
        "exit()",
        "terminate()",
        "interrupt()"],
    ["What is the purpose of the 'synchronized' keyword in Java?",
        "To avoid deadlock.",
        "To restrict access to a resource by multiple threads.",
        "To optimize code execution.",
        "To make a variable accessible to all threads."],
    ["Which of the following statements is true about Java's 'String' class?",
        "String objects are mutable in Java.",
        "String objects are immutable in Java.",
        "String objects are both mutable and immutable in Java.",
        "String objects are not used in Java."],
    ["Which of the following is true about Java's access modifiers?",
        "'public' gives access only to the same class.",
        "'private' restricts access to the same class only.",
        "'protected' gives access to different packages.",
        "'default' is accessible only within the package."],
    ["What is the main purpose of the 'main()' method in Java?",
        "To initialize the program's variables.",
        "To begin execution of the Java program.",
        "To load external libraries.",
        "To create an instance of the class."],
    ["Which of the following is used to handle multiple exceptions in Java?",
        "try block",
        "catch block",
        "finally block",
        "throw block"],
    ["What is an interface in Java?",
        "A blueprint for classes with methods that can be implemented.",
        "A class that implements methods.",
        "A class that defines constructor behavior.",
        "A type of data structure."],
    ["Which of the following is an example of a 'StringBuilder' method",
        "append()",
        "insert()",
        "delete()",
        "All of the above"]
];

const ans = ["op3","op1","op3","op4","op1","op3",
    "op1","op4","op2","op2","op4","op2","op1","op1","op4"];

    
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