let x = 0; 
let y = 0;
let uip = [];
let score = 0;
let arr = [
    ["Which of the following commands is used to create a database in MySQL?",
        "CREATE DATABASE database_name;",
        "NEW DATABASE database_name;",
        "MAKE DATABASE database_name;",
        "BEGIN DATABASE database_name;"],
    ["What is the purpose of the SELECT statement in SQL?",
        "To insert data into a table.",
        "To update data in a table.",
        "To retrieve data from a table.",
        "To delete data from a table."],
    ["Which SQL clause is used to filter the results of a SELECT query?",
        "HAVING",
        "WHERE",
        "FILTER",
        "LIMIT"],
    ["Which of the following is useed to retrieve the first 10 seconds from a table in MySQL?",
        "LIMIT 10",
        "TOP 10",
        "FETCH 10",
        "FIRST 10"],
    ["What is the purpose of the 'PRIMARY KEY' in MySQL?",
        "It creates a foreign key reference.",
        "It allows duplicate values in a column.",
        "It increases the storage capacity of a column.",
        "It ensures that each row in a table is unique."],
    ["Which of the following is true about JOIN in MySQL?",
        "It is used to merge two colums into one.",
        "It is used to combine rows from two or more tables based on a related column.",
        "It is used to update values in multiple tables.",
        "It is used to delete rows from a table."],
    ["Which SQL statement is used to modify an exisiting column in a table?",
        "UPDATE COLUMN",
        "CHANGE COLUMN",
        "ALTER TABLE",
        "MODIFY COLUMN"],
    ["Which function is used to find the number of rows in a table in MySQL?",
        "COUNT()",
        "ROWS()",
        "SUM()",
        "TOTAL()"],
    ["Which clause is MySQL is used to group rows based on a specific column?",
        "ORDER BY",
        "GROUP BY",
        "HAVING",
        "JOIN"],
    ["Which data type in MySQL is used to store variable-length strings?",
        "CHAR",
        "TEXT",
        "VARCHAR",
        "STRING"],
    ["Which of the following commands is used to delete a table in MySQL?",
        "DROP TABLE table_name;",
        "DELETE TABLE table_name;",
        "REMOVE TABLE table_name;",
        "CLEAR TABLE table_name;"],
    ["Which of the following is used to modify data in a MySQL table?",
        "INSERT",
        "DELETE",
        "CHANGE",
        "UPDATE"],
    ["Which type of JOIN returns all records when there is a match in one of the tables?",
        "INNER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN",
        "OUTER JOIN"],
    ["What is the default port number used by MySQL?",
        "8000",
        "5432",
        "1433",
        "3306"],
    ["Which function is used to return the current date and time in MySQL?",
        "GETDATE()",
        "CURRENT_TIMESTAMP()",
        "NOW()",
        "TODAY()"]
];

const ans = [
    "op1",  // "Which of the following commands is used to create a database in MySQL?"
    "op3",  // "What is the purpose of the SELECT statement in SQL?"
    "op2",  // "Which SQL clause is used to filter the results of a SELECT query?"
    "op1",  // "Which of the following is used to retrieve the first 10 seconds from a table in MySQL?"
    "op4",  // "What is the purpose of the 'PRIMARY KEY' in MySQL?"
    "op2",  // "Which of the following is true about JOIN in MySQL?"
    "op3",  // "Which SQL statement is used to modify an existing column in a table?"
    "op1",  // "Which function is used to find the number of rows in a table in MySQL?"
    "op2",  // "Which clause in MySQL is used to group rows based on a specific column?"
    "op3",  // "Which data type in MySQL is used to store variable-length strings?"
    "op1",  // "Which of the following commands is used to delete a table in MySQL?"
    "op4",  // "Which of the following is used to modify data in a MySQL table?"
    "op2",  // "Which type of JOIN returns all records when there is a match in one of the tables?"
    "op4",  // "What is the default port number used by MySQL?"
    "op3"   // "Which function is used to return the current date and time in MySQL?"
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