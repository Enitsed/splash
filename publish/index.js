(function () {
    "use strict";
    visibleTextOnTime();
})();

function visibleTextOnTime() {
    let time = {
        midnight: 0,
        daytime: 8,
        evening: 18
    };

    let nowTime = new Date().getHours();

    if (nowTime >= time.evening) {
        // evening
        console.log("evening");
        $('.evening').show();
    } else if (nowTime >= time.daytime && nowTime < time.evening) {
        // daytime
        console.log("daytime");
        $('.daytime').show();
    } else if (nowTime >= time.midnight) {
        // midnight
        console.log("midnight");
        $('.midnight').show();
    }
}
