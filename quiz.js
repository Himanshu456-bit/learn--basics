let fname = '';
let lname = '';
let age = '';
let lang = '';
function myFunc(){
    fname = document.querySelector('#fn').value;
    lname = document.querySelector('#ln').value;
    age = document.querySelector('#age').value;
    lang = document.querySelector('#lang').value;
    if(lang=='C'){
        window.location.href = 'cq.html';
    }else if(lang=='JavaScript'){
        window.location.href = 'jsq.html';
    }else if(lang=='JAVA'){
        window.location.href = 'javaq.html';
    }else if(lang=='HTML'){
        window.location.href = 'htmlq.html';
    }else if(lang=='CSS'){
        window.location.href = 'cssq.html';
    }else if(lang=='Python'){
        window.location.href = 'pyq.html';
    }else if(lang=='MySQL'){
        window.location.href = 'mysq.html';
    }else if(lang=='None'){
        window.alert("Please select a Language to continue");
    }
}
