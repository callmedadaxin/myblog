import AlloyTouch from './alloy_touch.js';
import Transform from '../transformjs/transform.js';

var addEvent =  function(el, type, fn, capture) {
    if (type === "mousewheel" && document.mozHidden !== undefined) {
        type = "DOMMouseScroll";
    }
    el.addEventListener(type, function(event) {
        var type = event.type;
        if (type == "DOMMouseScroll" || type == "mousewheel") {
            event.delta = event.wheelDelta ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }

        if (event.delta) {
            fn.call(this, event);
        }
    }, capture || false);
};

function addClass(element, className) {

    if (element.classList) {
        className.split(' ').forEach(function(c) {
            element.classList.add(c);
        })
    } else {
        element.className += ' ' + className;
    }
}

function removeClass(element, className) {

    if (element.classList) {
        className.split(' ').forEach(function(c) {
            element.classList.remove(c);
        })
    } else {
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

var FullPage = function(selector,option) {
    this.parent = typeof selector === "string" ? document.querySelector(selector) : selector;
    this.parent.style.visibility = "visible";
    var noop = function () { };
    this.beginToPage = option.beginToPage || noop;
    this.leavePage = option.leavePage || noop;
    Transform(this.parent, true);
    this.stepLength = option.vertical ? window.innerHeight : window.innerWidth;

    var children = this.parent.childNodes,
        len = children.length,
        i = 0;
    this.length = 0;
    this.children = [];
    for (; i < len; i++) {
        var child = children[i];
        if (child.nodeType !== 3) {
            // child.style.height = this.stepLength + "px";
            this.length++;
            this.children.push({child:child,transitionChildren:child.querySelectorAll(".animated")});
        }
    }

    this.duration = option.duration;
    this.timeoutArr = [];
    this._transitionInit();

    var self = this;

    this.alloyTouch = new AlloyTouch({
        touch: this.parent,
        target: this.parent,
        vertical: option.vertical,
        property: option.vertical ? "translateY" : "translateX",
        min: (1 - this.length) * this.stepLength,
        max: 0,
        step: this.stepLength,
        inertia: false,
        bindSelf : true,
        touchEnd: function (evt, v, index) {

            var step_v = index * this.step * -1;
            var dx = v - step_v;

            if (v < this.min) {
                this.to(this.min);
            } else if (v > this.max) {
                this.to(this.max);
            } else if (Math.abs(dx) < 30) {
                this.to(step_v);

            }else if (dx > 0) {
               // this.to(step_v + this.step);
                self.prev();
            } else {
                self.next();
               // this.to(step_v - this.step);
            }
            return false;
        },
        animationEnd: function () {
            option.animationEnd.apply(this,arguments);
            self.moving = false;
        }
    });

    this.moving = false;

    addEvent(this.parent,"mousewheel" ,function (evt) {
        if(self.moving) return;
        self.moving = true;
        if(evt.delta>0 ){
            self.prev();
        }else {
            self.next();
        }
    });
};

FullPage.prototype = {
    _transitionInit:function(){
        var i = 1 ,
            len = this.children.length;
        for(;i<len;i++){
          this._outPage(i);
        }
        this._toPage(0);
    },
    _toPage:function(index){
        var ttcs = this.children[index].transitionChildren;
        var  i = 0;
        var tLen = ttcs.length;
        if (tLen > 0) {
            for (; i < tLen; i++) {
                var node = ttcs[i];
                var delay = parseInt(node.getAttribute("data-delay")) || 0;
                var showClass = node.getAttribute("data-show");
                var hideClass = node.getAttribute("data-hide");
                node.style.visibility = "hidden";
                var timeout = setTimeout((function(n,s,h){
                    return function(){
                        n.style.visibility = "visible";
                        s&&addClass(n,s);
                        h&&removeClass(n,h);
                    }
                })(node,showClass,hideClass),delay);
                this.timeoutArr.push(timeout);
            }
        }
    },
    _outPage:function(index){
        var ltcs = this.children[index].transitionChildren;
        var lLen = ltcs.length,
            i = 0;
        if (lLen > 0) {
            for (; i < lLen; i++) {
                var node = ltcs[i];
                var showClass = node.getAttribute("data-show");
                var hideClass = node.getAttribute("data-hide");
                hideClass&&addClass(node,hideClass);
                showClass&&removeClass(node,showClass);
            }
        }

        while (this.timeoutArr.length > 0) {
            clearTimeout(this.timeoutArr[0]);
            this.timeoutArr.shift();
        }
    },
    _transition: function (leaveIndex, toIndex) {
        this._outPage(leaveIndex);
        this. _toPage(toIndex);
    },
    next: function () {
        var index = this.alloyTouch.currentPage + 1;

        if (index > this.length - 1) {
            index = this.length - 1;
            this.moving = false;
            return;
        }
        this.to(index);
    },
    prev: function () {
        var index = this.alloyTouch.currentPage - 1;

        if (index < 0) {
            index = 0;
            this.moving = false;
            return;
        }
        this.to(index);
    },
    to: function (index) {

        this.leavePage.call(this, this.alloyTouch.currentPage);
        this.beginToPage.call(this, index);
        this._transition(this.alloyTouch.currentPage, index);
        this.alloyTouch.to(-1 * index * this.stepLength,this.duration);
    }
};

export default FullPage;
