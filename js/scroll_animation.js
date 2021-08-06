var visibleY = function(el){
    var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height, 
      el = el.parentNode;
    do {
      rect = el.getBoundingClientRect();
      if (top <= rect.bottom === false) return false;
      // Check if the element is out of view due to a container scrolling
      if ((top + height) <= rect.top) return false
      el = el.parentNode;
    } while (el != document.body);
    // Check its within the document viewport
    return top <= document.documentElement.clientHeight;
};

window.addEventListener("load",function(){
    var sheet = document.createElement('style')
    sheet.innerHTML = ".hidden {visibility: hidden;}";
    document.body.appendChild(sheet);

    document.querySelectorAll("[anmt]").forEach(elm=>{
        if(!elm.classList.contains("hidden")) elm.classList.add("hidden")
        if (visibleY(elm) === true) {
            if(elm.classList.contains(elm.getAttribute("anmt"))) return;
            if(!elm.classList.contains("animate__animated")) elm.classList.add("animate__animated")
            elm.classList.remove("hidden")
            elm.classList.add(elm.getAttribute("anmt"))
        }
    })
    document.addEventListener("scroll", ()=>{
        document.querySelectorAll("[anmt]").forEach(elm=>{
            if (visibleY(elm) === true) {
                if(elm.classList.contains(elm.getAttribute("anmt"))) return;
                if(!elm.classList.contains("animate__animated")) elm.classList.add("animate__animated")
                elm.classList.remove("hidden")
                elm.classList.add(elm.getAttribute("anmt"))
            }
        })
    })
})