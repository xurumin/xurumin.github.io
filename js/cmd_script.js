var isClicked = false
        const copyToClipboard = (str, elm, event) => {
            const el = document.createElement('textarea');
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            
            var copyMsg = document.createElement("div")
            copyMsg.id = "copyMsg"
            copyMsg.innerHTML = "Copiado!"
            copyMsg.style.position = "absolute"
            copyMsg.style.display = "inline"
            // copyMsg.style.top = "0px"
            copyMsg.style.top = `${event.pageY-35}px`
            copyMsg.style.left = `${event.pageX-20}px`
            
            if(!isClicked){
                document.getElementById("pcomandos").appendChild(copyMsg)
                setTimeout(()=>{
                    isClicked = false
                    document.getElementById("pcomandos").removeChild(copyMsg)
                }, 700)

            }
            
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
            videos: {
                title: "Vídeos",
                url: "https://raw.githubusercontent.com/xurumin/aboutme/main/help/ptbr/website/commands/videos.json"
            },
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
            if(!command_list[tag]) tag="music"

            document.getElementById("mycnt").innerHTML = "Carregando comandos..."

            await changeCategory(tag)

            const command = command_list[tag]

            document.getElementById("btn_cat").innerHTML = `${command.title} <i class="fas fa-chevron-down"></i>`

            var response = JSON.parse(await httpGetAsync(command.url))
            document.getElementById("mycnt").innerHTML = ""
            for(var cmd of response){
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
            showCategory(tag)
        }


        function generateCommand(cmd) {
            var examples = ""
            var nsfw = ""
            if(cmd.tags){
                if(cmd.tags.includes("nsfw")){
                    nsfw = "nsfw"
                }
            }

            for (var elm of cmd.examples) {
                examples +=
                    `<li onclick="copyToClipboard(this.innerHTML, this, event)" title="Clique para copiar"">x!${elm}</li>\n`
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

        window.addEventListener("load", async function(){
            await start();
            showCategory(window.location.href.split("#")[1] || "music");
        })
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