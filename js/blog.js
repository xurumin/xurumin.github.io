// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
window.addEventListener("load",function(){
   

    document.querySelectorAll(".command").forEach(element => {
        var copyMsg = document.createElement("div")
        copyMsg.id = "copyMsg"
        copyMsg.innerHTML = "Clique para copiar!"
        copyMsg.style.position = "absolute"
        copyMsg.style.display = "inline"
        copyMsg.style.display = "none" 

        document.getElementById("blog_content").appendChild(copyMsg)

        var isMouseUp = false
        element.addEventListener("mouseover", function(event){
            isMouseUp = true
            copyMsg.innerHTML = "Clique para copiar!"
            copyMsg.style.display = "inline" 
            copyMsg.style.top = `${getOffset(element).top-40}px`
            copyMsg.style.left = `${event.pageX - (copyMsg.offsetWidth/2)}px`

            
        })
        element.addEventListener("mouseout", throttle(function(cmd){
            if(!isMouseUp) return;
            isMouseUp = false;
            copyMsg.style.display = "none" 
        }, 1000))
        element.addEventListener("mousedown", function(event){
            const el = document.createElement('textarea');
            el.value = element.innerHTML;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            copyMsg.style.display = "inline" 
            copyMsg.innerHTML = "Copiado!"
            copyMsg.style.left = `${event.pageX - (copyMsg.offsetWidth/2)}px`
            
        })
    });
})