const zxr = ['#head1','#head2','#head3','#head4'];
zxr.forEach(function(val){
    const ad = document.querySelector(val);
    ad.classList.add("dark-head");
})

const st = document.querySelector(".st");
st.classList.add('dark-st');

const proj = ["#pj1","#pj2","#pj3","#pj4","#pj5","#pj6","#pj7"];
proj.forEach(function(val){
    const fg = document.querySelector(val);
    fg.classList.add('dark-proj');
})

const col = [".p1",".p2",".p3",".p4",".p5"];
col.forEach(function(val){
    const seq = document.querySelector(val);
    seq.classList.add('seq-dark');
})

function change(){
    const cur_thm = localStorage.getItem("DLbtn");
    const classes = ['.st','.top','.btn','.bio','.sch','.skills','.grp','.myp'];
    const head = ['#head1','#head2','#head3','#head4'];
    if(cur_thm === 'dark'){
        const st = document.querySelector(".st");
        st.classList.remove('dark-st');
        st.classList.add('light-st');
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        head.forEach(function(val){
            let apple = document.querySelector(val);
            apple.classList.remove('dark-head');
            apple.classList.add('light-head');
        })
        proj.forEach(function(val){
            let kgf = document.querySelector(val);
            kgf.classList.remove('dark-proj');
            kgf.classList.add('light-proj');
        })
        col.forEach(function(val){
            const seq = document.querySelector(val);
            seq.classList.remove('seq-dark');
            seq.classList.add('seq-light');
        })
        classes.forEach(function(val){
            let abc = document.querySelector(val);
            abc.classList.remove('dark');
            abc.classList.add('light');
        })
        localStorage.setItem("DLbtn","light");
        document.getElementById('DLbtn').innerHTML = "Dark";
    }else if(cur_thm === 'light'){
        const st = document.querySelector(".st");
        st.classList.remove('light-st');
        st.classList.add('dark-st');
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        head.forEach(function(val){
            let apple = document.querySelector(val);
            apple.classList.remove('light-head');
            apple.classList.add('dark-head');
        })
        proj.forEach(function(val){
            let kgf = document.querySelector(val);
            kgf.classList.remove('light-proj');
            kgf.classList.add('dark-proj');
        })
        col.forEach(function(val){
            const seq = document.querySelector(val);
            seq.classList.remove('seq-light');
            seq.classList.add('seq-dark');
        })
        classes.forEach(function(val){
            let abc = document.querySelector(val);
            abc.classList.remove('light');
            abc.classList.add('dark');
        })
        localStorage.setItem("DLbtn","dark");
        document.getElementById('DLbtn').innerHTML = "Light";
    }
}