const startbtn= document.querySelector("#start")
const stopbtn = document.querySelector("#stop")
let hex="ABCDEF0123456789"
let Interval;
function changecolor(){
    Interval=setInterval(function (){
        let color = "#"
        for( let i =0;i<6;i++){
            color+=hex[Math.floor(Math.random()*15)];
            document.body.style.backgroundColor=color;
        }
    },1000)
}
startbtn.addEventListener("click",changecolor);
stopbtn.addEventListener("click",function(){
    clearInterval(Interval)
})