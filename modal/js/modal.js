function Modal(options,confirmFn,cancelFn) {
    this.instance = null; //模态框实例，用于控制单例
    this.modal = null; //模态框对象
    this.title = options.title
    this.content = options.content;
    this.createModal = function() {
        var self = this;
        self.modal = document.createElement('div');
        self.modal.className = "modal";
        self.modal.innerHTML = `<div class="modal_mask"></div>
        <div class="modal_content">
            <div class="modal_header">
                <button class="modal_close">x</button>
                <h4 class="modal_title">${self.title}</h4>
            </div>
            <div class="modal_body">${self.content}</div>
            <div class="modal_footer">
                <button class="btn modal_cancel">取消</button>
                <button class="btn modal_save">确定</button>
            </div>
        </div>`;
        document.body.appendChild(self.modal);
        //点击关闭按钮，关闭模态框
        document.querySelector('.modal_close').onclick = function() {
            self.instance = null;
            self.$closeModal()
        }
        //点击取消按钮
        document.querySelector('.modal_cancel').onclick = function () {
            if(cancelFn){
                cancelFn.apply(self, arguments);
            }
            self.$closeModal();
        }
        //点击确定按钮
        document.querySelector('.modal_save').onclick = function () {
            if (confirmFn) {
                confirmFn.apply(self, arguments);
            }
             self.$closeModal();
        }
        return self.modal;
    };

    this.getSingle = function(fn) { //保证只能创建一个
        var self = this;
        return function() {
            return self.instance || (self.instance = fn.apply(self, arguments));
        }

    }
    //显示模态框
    this.$openModal = this.getSingle(this.createModal);
    this.$openModal();//创建实例对象时，直接调用
    //关闭模态框
    this.$closeModal = function() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.instance = null;
        }

    }


}


