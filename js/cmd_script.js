window.mobileCheck = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
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

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {
        top: _y,
        left: _x
    };
}


var isClicked = false
const copyToClipboard = (str, elm, event) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);


    // var copyMsg = document.createElement("div")
    // copyMsg.id = "copyMsg"
    // copyMsg.innerHTML = "Copiado!"
    // copyMsg.style.position = "absolute"
    // copyMsg.style.display = "inline"
    // // copyMsg.style.top = "0px"
    // copyMsg.style.top = `${event.pageY-35}px`
    // copyMsg.style.left = `${event.pageX-20}px`

    // if (!isClicked) {
    //     document.getElementById("pcomandos").appendChild(copyMsg)
    //     setTimeout(() => {
    //         isClicked = false
    //         document.getElementById("pcomandos").removeChild(copyMsg)
    //     }, 700)

    // }

    isClicked = true
};

var command_list = {
    music: {
        title: "Música",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/music.json"
    },
    podcast: {
        title: "Podcast",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/podcast.json"
    },
    memes: {
        title: "Memes",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/memes.json"
    },
    image: {
        title: "Imagens",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/image.json"
    },
    // videos: {
    //     title: "Vídeos",
    //     url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/videos.json"
    // },
    gifs: {
        title: "Gifs",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/gifs.json"
    },
    games: {
        title: "Jogos",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/games.json"
    },
    notifications: {
        title: "Notificações",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/notifications.json"
    },
    social: {
        title: "Social",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/social.json"
    },
    general: {
        title: "Gerais",
        url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/general.json"
    }
}

function httpGetAsync(theUrl) {
    return new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                resolve(xmlHttp.responseText)
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    })
}
var lastSelected = ""

async function showCategory(tag) {
    if (!command_list[tag]) tag = "music"

    document.getElementById("mycnt").innerHTML = "Carregando comandos..."

    await changeCategory(tag)

    const command = command_list[tag]

    document.getElementById("btn_cat").innerHTML = `${command.title} <i class="fas fa-chevron-down"></i>`

    var response = JSON.parse(await httpGetAsync(command.url))
    document.getElementById("mycnt").innerHTML = ""
    for (var cmd of response) {
        var temp = generateCommand(cmd)
        document.getElementById("mycnt").innerHTML += temp
    }
}

async function changeCategory(tag) {
    if ((document.getElementById(`cmd_${tag}`).getAttribute("selected") != null) || (document
            .getElementById(`m_cmd_${tag}`).getAttribute("selected") != null)) return;

    document.getElementById(`cmd_${lastSelected}`).removeAttribute("selected")
    document.getElementById(`cmd_${tag}`).setAttribute("selected", "")


    $('#category_modal').modal('hide')

    document.getElementById(`m_cmd_${lastSelected}`).removeAttribute("selected")
    document.getElementById(`m_cmd_${tag}`).setAttribute("selected", "")

    lastSelected = tag
    document.getElementById("mycnt").innerHTML = "Carregando comandos..."
    await showCategory(tag)


    clickToCopy()
}


function generateCommand(cmd) {
    var examples = ""
    var nsfw = ""
    if (cmd.tags) {
        if (cmd.tags.includes("nsfw")) {
            nsfw = "nsfw"
        }
    }

    for (var elm of cmd.examples) {
        examples +=
            `<li class="cmd_click_to_copy" onclick="copyToClipboard(this.innerHTML, this, event)" title="Clique para copiar"">x!${elm}</li>\n`
    }
    var template = `<div class="command ${nsfw}" anm2t="animate__fadeInUp" id="${cmd.name}">
                        <div class="row justify-content-between align-items-center strt" onclick="showDet('${cmd.name}')">
                            <div class="col-10 col-md-10 top">
                                <div class="col-12 cmd_title">${cmd.name}</div>
                                <div class="col-12 cmd_description">${cmd.description}</div>
                            </div>
                            <span class="nsfw_tag">🔞 NSFW</span>
                            <div class="col-2 cmd_show">
                                <i class="fas fa-arrow-down"></i>
                            </div>
                       </div>
                        <div class="row justify-content-between align-items-center detail hide">
                            <div class="col-12 col-md open">
                                <p class="aliases_title">Sinônimos:</p>
                                <p class="aliases">${cmd.aliases.join(", ")}</p>

                                <p class="exmp">Exemplos:</p>
                                <ul>
                                    ${examples}
                                </ul>
                            </div>
                        </div>
                    </div>`

    return template
}

// $(document).ready(async () => {
//     //run()
//     await start();
//     showCategory(window.location.href.split("#")[1] || "music");
// })

window.addEventListener("load", async function () {
    await start();
    await showCategory(window.location.href.split("#")[1] || "music");

    clickToCopy()

})



function clickToCopy(){
    document.querySelectorAll(".cmd_click_to_copy").forEach(element => {
        var copyMsg = document.createElement("div")
        copyMsg.id = "copyMsg"
        copyMsg.innerHTML = "Clique para copiar!"
        copyMsg.style.position = "absolute"
        copyMsg.style.display = "inline"
        copyMsg.style.display = "none"

        document.getElementById("pcomandos").appendChild(copyMsg)

        var isMouseUp = false
        element.addEventListener("mouseover", function (event) {
            isMouseUp = true
            copyMsg.innerHTML = "Clique para copiar!"
            copyMsg.style.display = "inline"
            copyMsg.style.top = `${getOffset(element).top-30}px`
            copyMsg.style.left = `${(event.clientX - 5 - (copyMsg.offsetWidth/2))}px`

        })
        element.addEventListener("mouseout", throttle(function (cmd) {
            if (!isMouseUp) return;
            isMouseUp = false;
            copyMsg.style.display = "none"
        }, 1000))
        element.addEventListener("mousedown", function (event) {
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
}

function start() {
    var i = 0
    for (var index in command_list) {
        const category = command_list[index]
        if (i == 0) {
            lastSelected = index
            //computer
            document.getElementById("cmd_cat").innerHTML += (
                `<li id="cmd_${index}" onclick="changeCategory('${index}')" selected>${category.title}</li>`
            )

            //mobile
            document.getElementById("modal_cnt").innerHTML += (
                `<li id="m_cmd_${index}" onclick="changeCategory('${index}')" selected>${category.title}</li>`
            )
        } else {
            //computer
            document.getElementById("cmd_cat").innerHTML += (
                `<li id="cmd_${index}" onclick="changeCategory('${index}')">${category.title}</li>`)

            //mobile
            document.getElementById("modal_cnt").innerHTML += (
                `<li id="m_cmd_${index}" onclick="changeCategory('${index}')">${category.title}</li>`
            )
        }
        i += 1;
    }
}

function showDet(elm_id) {

    // document.querySelectorAll("#mycnt .command .row.detail").forEach(element => {
    //     if(!element.classList.contains("hide")){
    //         // element.classList.add("hide")
    //     }
    // })

    var elm = document.getElementById(elm_id);

    if (!elm.getElementsByClassName("detail")[0].classList.contains("hide")) {
        elm.getElementsByClassName("cmd_show")[0].getElementsByClassName("fas")[0].classList.remove("rotated")
        // elm.getElementsByClassName("cmd_show")[0].getElementsByClassName("fas")[0].classList.add("initial")
        return elm.getElementsByClassName("detail")[0].classList.add("hide");

    }
    elm.getElementsByClassName("cmd_show")[0].getElementsByClassName("fas")[0].classList.add("rotated")
    // elm.getElementsByClassName("cmd_show")[0].getElementsByClassName("fas")[0].classList.remove("initial")
    return elm.getElementsByClassName("detail")[0].classList.remove("hide");
}