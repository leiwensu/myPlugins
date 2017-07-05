var strategies = {
    isNonEmpty: function(value, errmsg) {
        if (value == '') {
            return errmsg;
        }
    },
    minLength: function(value, length, errmsg) {
        if (value.length < length) {
            return errmsg;
        }
    },
    isNumber: function(value,errmsg) {// 检查字符串是否是数字
        var reg = /^\d+$/;
        if (!reg.test(value)) {
           return errmsg;
        }
    },
    isMobile: function(value, errmsg) {// 检查字符串是否为合法手机号码
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (!reg.test(value)) {
            return errmsg;
        }
    },
    isEmail: function(value,errmsg) { // 检查字符串是否为合法Email地址
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        // var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!reg.test(value)) {
           return errmsg;
        }
    },
    isPostcode: function(value,errmsg) {// 检查字符串是否为合法邮政编码
        // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
        var reg = /^[1-9]\d{5}$/g;
        // var reg = /^[1-9]\d{5}(?!\d)$/;
        if (!reg.test(value)) {
            return errmsg;
        }
    },
    isURL: function(value,errmsg) { // 检查字符串是否为合法URL
        var reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
        if (!reg.test(value)) {
            return errmsg;
        }
    },
    isIDcard: function(value,errmsg) {// 检查字符串是否为合法身份证号码
        var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
           return errmsg;
        }
    },
}

var Validator = function() {
    this.cache = [];
};

Validator.prototype.add = function(dom, rules) {
    var self = this;
    for (var i = 0; i<rules.length;i++) {
        (function(rule) {
            var strategyAry = rule.strategy.split(':');
            var errorMsg = rule.errorMsg;
            self.cache.push(function() {
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(dom, strategyAry);
            });
        })(rules[i])
    }
};

Validator.prototype.start = function() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errorMsg = validatorFunc();
        if (errorMsg) {
            return errorMsg;
        }
    }
};
