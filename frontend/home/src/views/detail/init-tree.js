function findTopLevelHeader(treeArray) {
  var topLevelIndex = 0;
  var maxLevel = parseInt(getLevelNumber(treeArray[0]));

  if (maxLevel === 1) {
    return treeArray[0];
  }
  treeArray.forEach(function(item, index) {
    if (getLevelNumber(item) < maxLevel) {
      maxLevel = parseInt(getLevelNumber(item));
      topLevelIndex = index;
    }
  });

  // console.log(treeArray[topLevelIndex])
  return treeArray[topLevelIndex]
}

function getLevelNumber(category) {
  return parseInt(category.tagName.toString().charAt(1));
  // return parseInt(category.charAt(1));
}

function repeat(repeatStr, times) {
  var tempArray = [];
  repeatStr = repeatStr || '-';
  for (var i = 0; i < times; i++) {
    tempArray.push(repeatStr || '-');
  }

  return tempArray.join('')
}


function buildTree(treeArray, parentObject, printFlag) {
  var topLevelItem = findTopLevelHeader(treeArray);
  var subArray;
  var startIndex = 0;
  var endIndex = treeArray.indexOf(topLevelItem, startIndex);
  // console.log(endIndex, topLevelItem, parentObject)

  var obj;
  while (endIndex <= treeArray.length) {
    subArray = treeArray.slice(startIndex, endIndex);
    console.log(subArray);
    obj = {
      p: parentObject.n,
      n: topLevelItem,
      l: parentObject.l + 1,
      s: []
    };
    if (subArray.length == 0) {
      if (startIndex != 0) {
        printFlag && console.log(repeat('-', obj.l) + obj.n);
        parentObject.s.push(obj);
      }

    } else {
      printFlag && console.log(repeat('-', obj.l) + obj.n);
      parentObject.s.push(obj);
      buildTree(subArray, obj, printFlag);
    }

    startIndex = endIndex + 1;

    endIndex = treeArray.indexOf(topLevelItem, startIndex);
    console.log(endIndex)
    if (endIndex == -1) {
      endIndex = treeArray.length;
    }

    if (startIndex > endIndex) {
      var tp = startIndex;
      startIndex = endIndex;
      endIndex = tp;
    }
  }
}

var resutobject = {
  p: "",
  n: 'root',
  l: 1,
  s: []
};

export const tree = function(hs) {
  // buildTree(list, resutobject, true);

  if (hs.length < 2)
    return;
  var s = '';
  s += '<div style="clear:both"></div>';
  s += '<div class="cnblogs_toc">';
  s += '<p style="text-align:right;margin:0;"><span style="float:left;">目录<a href="#" title="系统根据文章中H1到H6标签自动生成文章目录">(?)</a></span><a href="#" onclick="javascript:return openct(this);" title="展开">[+]</a></p>';
  s += '<ol style="display:none;margin-left:14px;padding-left:14px;line-height:160%;">';
  var old_h = 0,
    ol_cnt = 0;
  for (var i = 0; i < hs.length; i++) {
    var h = parseInt(hs[i].tagName.substr(1), 10);
    if (!old_h)
      old_h = h;
    if (h > old_h) {
      s += '<ol>';
      ol_cnt++;
    } else if (h < old_h && ol_cnt > 0) {
      s += '</ol>';
      ol_cnt--;
    }
    if (h == 1) {
      while (ol_cnt > 0) {
        s += '</ol>';
        ol_cnt--;
      }
    }
    old_h = h;
    var tit = hs.eq(i).text().replace(/^\d+[.、\s]+/g, '');
    tit = tit.replace(/[^a-zA-Z0-9_\-\s\u4e00-\u9fa5]+/g, '');

    if (tit.length < 100) {
      s += '<li><a href="#t' + i + '">' + tit + '</a></li>';
      hs.eq(i).html('<a name="t' + i + '"></a>' + hs.eq(i).html());
    }
  }
  while (ol_cnt > 0) {
    s += '</ol>';
    ol_cnt--;
  }
  s += '</ol></div>';
  s += '<div style="clear:both"><br></div>';
  $(s).insertBefore($('#cnblogs_post_body'));
}