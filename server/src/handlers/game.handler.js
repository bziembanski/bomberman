const timeLimit = 10.0;
let time = timeLimit;
let old;
let interval;

function startTimer(server){
    server.io.emit("timer", timeLimit.toFixed(1));
    old = undefined;

    setTimeout(()=>{
        interval = setInterval(() => {
            if(!old){
                old = new Date().getTime();
            }

            const newer = new Date().getTime();
            time = (timeLimit - (newer - old) / 1000).toFixed(1);

            if (parseFloat(time) <= 0) {
                clearInterval(interval);
                time = "bang bang"
            }

            server.io.emit("timer", time);
        }, 100);
    }, 2000);
}
module.exports = {
    interval,
    startTimer
}