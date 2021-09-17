window.onload = function() {
    var regTel = /^09\d{8}$/; //手機號碼的RegExp
    var regLine = /^[a-z\d]{6,120}$/
    var regUname = /^[\u4e00-\u9fa5]{2,8}$/
    var regSms = /^\d{6}$/;
    var regPwd = /^[a-zA-Z\d_-]{6,16}$/
    var tel = document.querySelector('#tel');
    var line = document.querySelector('#line');
    var uname = document.querySelector('#uname');
    var sms = document.querySelector('#sms');
    var pwd = document.querySelector('#pwd');
    var rePwd = document.querySelector('#repwd');

    regexp(tel, regTel); //手機驗證
    regexp(line, regLine); //LINE驗證
    regexp(uname, regUname); //暱稱驗證
    regexp(sms, regSms); //簡訊驗證
    regexp(pwd, regPwd); //密碼驗證
    //表單驗證的函數
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                // console.log('正確');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您輸入正確';
            } else {
                // console.log('不正確');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正確，請重新輸入';
            }
        }
    }
    rePwd.onblur = function() {
        if (this.value == pwd.value) {
            // console.log('正確');
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您輸入正確';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>密碼輸入不一致';
        }
    }
}