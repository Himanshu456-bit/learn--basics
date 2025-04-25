let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["Which of the following is correct regarding the 'meta' tag in HTML?",
        "It specifies the title of the document.",
        "It provides metadata such as the character set and viewport settings.",
        "It is used to define the body of the document.",
        "It defines the background color of the webpage."],
    ["What is the correct syntax to include an external CSS file in an HTML document?",
        'link rel="stylesheet" href="style.css"',
        'style href="style.css"',
        'css file="style.css"',
        'include src="style.css"'],
    ["What is the purpose of the alt attribute in an 'img' tag?",
        "It defines the image's width.",
        "It adjusts the image's display size.",
        "It provides alternative text for an image.",
        "It links the image to another web page."],
    ["Which HTML tag is used to define an internal hyperlink to another page in the same document?",
        "a",
        "link",
        "href",
        "navigation"],
    ["Which attribute in the 'audio' tag is used to control the volume of the audio?",
        "volume",
        "controls",
        "autoplay",
        "muted"],
    ["What is the correct HTML tag for inserting a line break?",
        "lb",
        "br",
        "break",
        "linebreak"],
    ["Which of the following HTML5 tags is used to specify navigation links?",
        "links",
        "navigation",
        "menu",
        "nav"],
    ["Which of the following is a valid HTML5 doctype declaration?",
        '!DOCTYPE html PUBLIC "-//W3C//DTD HTML5.0//EN"',
        "!DOCTYPE html",
        '!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.0//EN"',
        "!DOCTYPE html5"],
    ["Which tag is used to define a table in HTML?",
        "tab",
        "td",
        "table",
        "tabledata"],
    ["Which attribute in the 'form' tag specifies the URL where the form data will be submitted?",
        "action",
        "method",
        "target",
        "enctype"],
    ["Which of the following attributes is used to make a form input field required in HTML5?",
        "mandatory",
        "necessary",
        "compulsory",
        "required"],
    ["What is the purpose of the 'section' tag in HTML5?",
        "It defines a section in a document, often with a heading.",
        "It defines a sidebar for the page.",
        "IT creates a horizontal line.",
        "It adds metadata to the page."],
    ["Which of the following HTML tags is used to define a list of items that are unordered?",
        "ol",
        "ul",
        "li",
        "list"],
    ["Which HTML element is used to embed JavaScript into an HTML document?",
        "script",
        "js",
        "java",
        "embed"],
    ["Which tag is used to display a large heading in HTML?",
        "heading",
        "title",
        "h1",
        "header"]
];

const ans=[
    "op2",  // "Which of the following is correct regarding the <meta> tag in HTML?"
    "op1",  // "What is the correct syntax to include an external CSS file in an HTML document?"
    "op3",  // "What is the purpose of the alt attribute in an <img> tag?"
    "op1",  // "Which HTML tag is used to define an internal hyperlink to another page in the same document?"
    "op4",  // "Which attribute inn the <audio> tag is used to control the volume of the audio?"
    "op2",  // "What is the correct HTML tag for inserting a line break?"
    "op4",  // "Which of the following HTML5 tags is used to speicfy navigation links?"
    "op2",  // "Which of the following is a valid HTML5 doctype declaration?"
    "op3",  // "Which tag is used to define a table in HTML?"
    "op1",  // "Which attribute in the <form> tag specifies the URL where the form data will be submitted?"
    "op4",  // "Which of the following attributes is used to make a form input field required in HTML5?"
    "op1",  // "What is the purpose of the <section> tag in HTML5?"
    "op2",  // "Which of the following HTML tags is used to define a list of items that are unordered?"
    "op1",  // "Which HTML element is used to embed JavaSCript into an HTML document?"
    "op3"   // "Which tag is used to display a large heading in HTML?"
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