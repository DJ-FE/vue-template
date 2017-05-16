/**
 * Created by zhengzk on 2017/4/21.
 */

/**
 * 获取浏览器url参数
 */
var urlParam = (function (window) {
  //匿名方法只对url执行一次解析
  var args;
  //解析search
  var result = window.location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
  if (result != null) {
    //将结果转换为 object
    args = {};
    for (var i = 0; i < result.length; i++) {
      var ele = result[i];
      var inx = ele.indexOf("=");
      args[ele.substring(1, inx)] = ele.substring(inx + 1);
    }
  }
  //返回function可多次调用
  return function (key) {
    if (key && args) { //如果传key值 则返回对应的value
      return args[key];
    }
    //默认返回全部
    return args;
  }
})(window)
/**
 * 添加url参数
 */
function addUrlPara (destiny, par, par_value) 
{ 
    var pattern = par+'=([^&]*)'; 
    var replaceText = par+'='+par_value; 
    if (destiny.match(pattern)) 
    { 
        var tmp = '/\\'+par+'=[^&]*/'; 
        tmp = destiny.replace(eval(tmp), replaceText); 
        return (tmp); 
    } 
    else 
    { 
        if (destiny.match('[\?]')) 
        { 
            return destiny+'&'+ replaceText; 
        } 
        else 
        { 
            return destiny+'?'+replaceText; 
        } 
    } 
    return destiny+'\n'+par+'\n'+par_value; 
}
/**
 * 自动吸顶
 */
function navLocation (eleId, parId) {
  let nav = document.querySelector(eleId)
  if (isSupportSticky()) {
    document.querySelector(parId).classList.add('sticky')
  } else {
    let onScroll = function () {
      let pnav = document.querySelector(parId)
      if(!pnav){
        return
      }
      let navOffsetY = pnav.offsetTop
      if (window.scrollY >= navOffsetY) {
        nav.classList.add('fixed')
      } else {
        nav.classList && nav.classList.remove('fixed')
      }
    }
    window.addEventListener('scroll', onScroll)
  }
}

/**
 * 判断是否支持 sticky
 */
function isSupportSticky () {
  let prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-']
  let stickyText = ''
  for (let i = 0; i < prefixTestList.length; i++) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky;'
  }

  let div = document.createElement('div')
  div.style.cssText = ' display:none; ' + stickyText
  document.body.appendChild(div)
  let isSupport = /sticky/i.test(window.getComputedStyle(div).position)
  document.body.removeChild(div)
  div = null
  return isSupport
}
/**
 * 判断空对象
 */
function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  
export default {
  /**
   * 拼接URL参数
   * @param t
   * @returns {string}
   */
  urlParameter: function(t) {
    t  = t || {}
    var e = [];
    for (var i in t)
      e.push(i + "=" + t[i]);
    return e.join("&")
  },
  /**
   * 获取浏览器url参数
   */
  urlParam: urlParam,
  /**
   * 添加url参数
   * @destiny url
   * @par 
   * @par_value 
   */
  addUrlPara:addUrlPara,
  /**
   * 判断fn是否是Function
   * @param fn Function
   * @returns {boolean}
   */
  isFunction(fn) {
    return '[object Function]' === Object.prototype.toString.call(fn);
  },
  /**
   * 判断是否是Object
   * @param obj
   * @returns {boolean}
   */
  isPlainObject(obj) {
    return !!obj
      && typeof obj === 'object'
      && obj.toString() === '[object Object]'
      && obj.constructor === Object;
  },
  isEmptyObject:isEmptyObject,
  navLocation:navLocation
}
