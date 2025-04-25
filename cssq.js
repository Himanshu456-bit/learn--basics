let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["What is the default value of the position property in CSS?",
        "absolute",
        "relative",
        "fixed",
        "static"],
    ["Which CSS property is used to change the font of an element?",
        "text-font",
        "font-style",
        "font-family",
        "font-type"],
    ["What is the correct syntax for applying a background color in CSS?",
        "background-color:#ffffff;",
        "background : color: #ffffff;",
        "background color=#ffffff;",
        "background-color = #ffffff;"],
    ["Which CSS selector i s used to select an element with a specific ID?",
        ".",
        "#",
        "*",
        "::"],
    ["What does the z-index property in CSS control?",
        "The vertical position of an element.",
        "The width of an element.",
        "The size of the font.",
        "The stacking order of elements."],
    ["Which property is used to control the spacing between words in CSS?",
        "letter-spacing",
        "word-spacing",
        "line-height",
        "margin-spacing"],
    ["Which of the following CSS properties is used to make text bold?",
        "font-weight: bold;",
        "font-style: bold;",
        "text-weight: bold;",
        "font-type: bold;"],
    ["Which CSS property is used to add space between an element's border and its content?",
        "margin",
        "border-spacing",
        "padding",
        "space-between"],
    ["What is the effect of the 'display: none;' property in CSS?",
        "It hides the element but still takes up space.",
        "It hides the element but keeps it in the document flow.",
        "It makes the element visible.",
        "It makes the element invisible and removes it from the document flow."],
    ["What does the overflow property control in CSS?",
        "The visibility of content that overfows its container.",
        "The size of the container.",
        "The color of overflowing content.",
        "The height of the content."],
    ["Which CSS property is used to define the amount of space between elements ina flex container?",
        "justify-content",
        "align-items",
        "gap",
        "flex-gap"],
    ["Which CSS property is used to create rounded corners for elements?",
        "border-radius",
        "corner-radius",
        "round-corners",
        "rounded-border"],
    ["How can you apply a style to all 'p' elements inside a 'div'?",
        "div p {}",
        "p div {}",
        "div + p {}",
        "div > p {}"],
    ["What does the @media rule in CSS allow you to do?",
        "Apply styles for different screen sizes or devices.",
        "Import external CSS files.",
        "Create animations.",
        "Define a media query for printing."],
    ["Which of the following CSS properties is used to align text to the center?",
        "align-text: center;",
        "text-align: middle;",
        "text-align: center;",
        "vertical-align: center;"]
];

const ans = [
    "op4",  // "What is the default value of the position property in CSS?"
    "op3",  // "Which CSS property is used to change the font of an element?"
    "op1",  // "What is the correct syntax for applying a background color in CSS?"
    "op2",  // "Which CSS selector is used to select an element with a specific ID?"
    "op4",  // "What does the z-index property in CSS control?"
    "op2",  // "Which property is used to control the spacing between words in CSS?"
    "op1",  // "Which of the following CSS properties is used to make text bold?"
    "op3",  // "Which CSS property is used to add space between an element's border and its content?"
    "op4",  // "What is the effect of the 'display: none;' property in CSS?"
    "op1",  // "What does the overflow property control in CSS?"
    "op3",  // "Which CSS property is used to define the amount of space between elements in a flex container?"
    "op1",  // "Which CSS property is used to create rounded corners for elements?"
    "op4",  // "How can you apply a style to all <p> elements inside a <div>?"
    "op1",  // "What does the @media rule in CSS allow you to do?"
    "op3"   // "Which of the following CSS properties is used to align text to the center?"
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