import Vue from 'vue';


/**
 * 图片预加载方法
 */
export const preLoad = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();

    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  })
}

/**
 * 异步上传文件
 * @type {Object}
 */
export const xhr4File = function() {
  this.xhr = new XMLHttpRequest();
}

xhr4File.prototype = {
  init(cfg) {
    this.cfg = cfg;
  },

  send(file) {
    this.xhr = new XMLHttpRequest();
    this.xhr.open('post', this.cfg.url, true);
    this.bindEvents();
    this.xhr.send(file);
  },

  bindEvents() {
    this.progress();
    this.load();
  },

  progress() {
    var onProgress = this.cfg.onProgress;

    if (onProgress) {
      this.xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
          var p = parseInt(e.loaded / e.total * 100);
          if (p > 15 && p < 100) {
            onProgress(p);
          }
        }
      }, false);
    }
  },

  load() {
    var xhr = this.xhr,
      that = this,
      onLoad = this.cfg.onLoad;

    xhr.addEventListener('load', function(r) {
      if (this.readyState == 4 && this.status == 200) {
        try {
          var json = JSON.parse(xhr.responseText);
        } catch (e) {
          var json = {
            'code': 500,
            message: '服务器异常，请重试'
          };
        }

        if (json.code == 200) {
          onLoad && onLoad(json);
        } else {
          that.error(json);
        }
      } else {
        that.error({
          message: '网络异常，请重试'
        });
      }
    })
  },

  error(msg) {
    var onError = this.cfg.onError;

    onError && onError(msg);
  }
}

export const erlize = function(url) {
  var result = {};

  url = url.substr(url.indexOf("?") + 1);
  var args = url.split("&");
  for (var i = 0, len = args.length; i < len; i++) {
    var arg = args[i];
    var item = arg.split('=');
    result[item[0]] = item[1];
  }
  return result;
};

export const formatParams = (data) => {
  const arr = [];

  for (let name of Object.keys(data)) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  return arr.join('&');
}

export const cursorPosition = {
  get: function(textarea) {
    var rangeData = {
      text: "",
      start: 0,
      end: 0
    };

    if (textarea.setSelectionRange) { // W3C  
      textarea.focus();
      rangeData.start = textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
    } else if (document.selection) { // IE
      textarea.focus();
      var i,
        oS = document.selection.createRange(),
        // Don't: oR = textarea.createTextRange()
        oR = document.body.createTextRange();
      oR.moveToElementText(textarea);

      rangeData.text = oS.text;
      rangeData.bookmark = oS.getBookmark();

      // object.moveStart(sUnit [, iCount]) 
      // Return Value: Integer that returns the number of units moved.
      for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
        // Why? You can alert(textarea.value.length)
        if (textarea.value.charAt(i) == '\r') {
          i++;
        }
      }
      rangeData.start = i;
      rangeData.end = rangeData.text.length + rangeData.start;
    }

    return rangeData;
  },

  set: function(textarea, rangeData) {
    var oR, start, end;
    if (!rangeData) {
      alert("You must get cursor position first.")
    }
    textarea.focus();
    if (textarea.setSelectionRange) { // W3C
      textarea.setSelectionRange(rangeData.start, rangeData.end);
    } else if (textarea.createTextRange) { // IE
      oR = textarea.createTextRange();

      // Fixbug : ues moveToBookmark()
      // In IE, if cursor position at the end of textarea, the set function don't work
      if (textarea.value.length === rangeData.start) {
        //alert('hello')
        oR.collapse(false);
        oR.select();
      } else {
        oR.moveToBookmark(rangeData.bookmark);
        oR.select();
      }
    }
  },

  add: function(textarea, rangeData, text) {
    var oValue, nValue, oR, sR, nStart, nEnd, st;
    this.set(textarea, rangeData);

    if (textarea.setSelectionRange) { // W3C
      oValue = textarea.value;
      nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
      nStart = nEnd = rangeData.start + text.length;
      st = textarea.scrollTop;
      textarea.value = nValue;
      // Fixbug:
      // After textarea.values = nValue, scrollTop value to 0
      if (textarea.scrollTop != st) {
        textarea.scrollTop = st;
      }
      textarea.setSelectionRange(nStart, nEnd);
    } else if (textarea.createTextRange) { // IE
      sR = document.selection.createRange();
      sR.text = text;
      sR.setEndPoint('StartToEnd', sR);
      sR.select();
    }
  }
}