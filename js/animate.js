function animate(obj, target, callback) {
    //console.log(callback);callback = function() {} 調用的時候 callback()

    //先清除當前的定時器 只保留當前的一個定時器執行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //步長值 寫到定時器的裡面
        //把我們步長值改為整數 不要出現小數的問題
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止動畫 (本質是停止定時器)
            clearInterval(obj.timer);
            //回調函數寫到定時器結束裡面
            // if (callback) {
            //     //調用函數
            //     callback();
            // }
            callback && callback();
        }
        //把每次+1的步長值 改為一個慢慢變小的值 步長公式:(目標值 - 現在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}