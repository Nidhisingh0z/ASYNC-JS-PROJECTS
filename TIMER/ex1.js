const btn = document.querySelector("#Stop");
const start = document.querySelector("#Start");
const h = document.querySelector("#display");
const add = document.querySelector("#addTime");

let count = 60;
let min = 0;
let Interval = null;

h.innerText = min + ":00";


start.addEventListener("click", function () {

    if (Interval !== null) {
        return;
    }

    Interval = setInterval(function () {

        count--;

        if (count < 0) {
            min++;
            count = 59;
        }

        h.innerText = min + ":" + count;

    }, 1000);
});


// STOP
btn.addEventListener("click", function () {

    clearInterval(Interval);
    Interval = null;

});


// ADD 5 SEC
add.addEventListener("click", function () {

    count += 5;

    if (count >= 60) {
        min += Math.floor(count / 60);
        count = count % 60;
    }

    h.innerText = min + ":" + count;
});