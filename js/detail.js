window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big')

    // 1.當我們滑鼠經過 preview_img 就顯示和隱藏 mask 遮擋層 和 big 大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    // 2.滑鼠移動的時候 讓黃色的盒子跟著滑鼠來走
    preview_img.addEventListener('mousemove', function(e) {
        // (1)先計算出滑鼠在盒子內的座標
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // (2) 減去盒子高度300 的一半 是 150 就是我們mask 的最終 left 和 top 值了
        // (3) mask移動的距離
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;

        // (4) 如果X座標小於0 就讓他停在0 的位置

        var maskMax = preview_img.offsetWidth - mask.offsetWidth; // 遮罩的最大移動距離
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= preview_img.offsetWidth - mask.offsetWidth) {
            maskX = preview_img.offsetWidth - mask.offsetWidth;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= preview_img.offsetHeight - mask.offsetHeight) {
            maskY = preview_img.offsetHeight - mask.offsetHeight;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 3.大圖片的移動距離 = 遮罩移動距離 * 大圖片最大移動距離 / 遮罩的最大移動距離

        var bigImg = document.querySelector('.bigImg') //大圖
        var bigMax = bigImg.offsetWidth - big.offsetWidth; //大圖片最大移動距離
        var bigX = maskX * bigMax / maskMax; // 大圖片的移動距離 X 
        var bigY = maskY * bigMax / maskMax; // 大圖片的移動距離 Y
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';



    })
})