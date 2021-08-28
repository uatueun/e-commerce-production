window.addEventListener('load', function() {
    // 1.獲取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus')
    var focusWidth = focus.offsetWidth;

    // 2.滑鼠經過focus 就顯示或隱藏左右按鈕
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定時器變數
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            // 手動調用點擊事件
            arrow_r.click();
        }, 3000)

    })

    // 3.動態生成小圓圈 有幾張圖片就生成幾個小圓圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');

    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //創建一個小li
        var li = document.createElement('li');

        //紀錄當前小圈圈的索引號 通過自定義屬性來做
        li.setAttribute('index', i)

        //把li插入到ol內
        ol.appendChild(li);
        // 4.小圈圈的排他思想 可以直接在生成小圈圈的同時直接綁定點擊事件
        li.addEventListener('click', function() {
            // (1)所有li 清除 current 類名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // (2)當前的li 設置 current 類名
            this.className = 'current';

            // 5.點擊小圈圈 移動圖片 當然移動的是 ul
            // ul的移動距離 小圈圈的索引號 乘 圖片的寬度 注意是負值
            // 當我們點擊了某個li 就拿到當前li的索引號
            var index = this.getAttribute('index');
            //當點擊了某個小li 就要把這個li索引號給 num
            num = index;
            // 當我們點擊了某個li 就拿到當前li的索引號給 circle
            circle = index;
            //連寫
            // circle = num = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    // 把ol裡面的第一個小li設置類名為current
    ol.children[0].className = 'current';
    // 6. 克隆第一張圖片(li)放到ul最後面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 點擊右側按鈕 圖片滾動一張
    var num = 0;
    // circle 控制小圈圈的撥放
    var circle = 0;
    // flag 節流閥
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //關閉節流閥
            //如果走到最後複製的一張圖片 此時 我們的ul 要快速復原 left 改為0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打開節流閥
            });
            // 8.點擊右側按鈕 小圈圈跟隨一起變化 可以再聲明一個變數控制小圈圈的播放
            circle++;
            //如果circle == 4 說明走到最後克隆這張圖片了 就復原回第一張 0
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })

    // 9.左側按鈕作法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到最後複製的一張圖片 此時 我們的ul 要快速復原 left 改為0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 8.點擊右側按鈕 小圈圈跟隨一起變化 可以再聲明一個變數控制小圈圈的播放
            circle--;
            //如果circle < 0 第一張圖片 右鍵後小圈圈要改為第4個小圈圈(3)
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            //調用函數
            circleChange();
        }
    })


    function circleChange() {
        //先清除其他小圈圈的current類名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下當前的小圈圈的current類名
        ol.children[circle].className = 'current';
    }
    // 10.自動播放輪播圖
    var timer = setInterval(function() {
        // 手動調用點擊事件
        arrow_r.click();
    }, 3000)


})

//頁面滾動 jquery
$(function() {
    //當我們點擊了li 此時不需要執行 頁面滾動事件裡面的li 背景選擇 添加 current
    // 節流閥 互斥鎖
    var flag = true;
    // 1.顯示隱藏電梯導航
    var toolTop = $('.recommend').offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }

    }
    $(window).scroll(function() {
        toggleTool();
        //4.頁面滾動到某個內容區域 左側電梯導航li相應添加和刪除current類名
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i);
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    })

    // 2.點擊電梯導航頁面可以滾動到相應內容區域

    $('.fixedtool li').click(function() {
        flag = false;
        console.log($(this).index());

        //每次點擊小li 就需要計算出頁面該跳往的位置
        //選出對應索引號的內容區盒子 計算它的.offset().top
        var current = $('.floor .w').eq($(this).index()).offset().top;

        // 頁面動畫滾動效果
        $('body,html').stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });

        //3.點擊之後讓當前的li 添加current類名 兄弟移除current類名
        $(this).addClass('current').siblings().removeClass();
    })
})