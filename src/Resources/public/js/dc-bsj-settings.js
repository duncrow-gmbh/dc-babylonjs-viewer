document.addEventListener("DOMContentLoaded", function(event) {
    var settingsField = $$('#ctrl_dc_viewer_settings');
    if(settingsField.length){

            var settingsCamera=  [
                //["radius","text", ""],
                ["minZ","number", "Camera near clip plane, Default: 0.1", 0.1],
                ["maxZ","number", "Camera far clip plane, Default: 1000", 1000],
                ["minZoom","number", "minimum Zoom, Default: 0.2", 0.2],
                ["maxZoom","number", "maximal Zoom, Default: 2", 2],
                ["upperVerticalAngelLimit","number", "In degrees like 45"],
                ["lowerVerticalAngelLimit","number", "In degrees like 45"],
                ["upperHorizontalAngelLimit","number", "In degrees like 45"],
                ["lowerHorizontalAngelLimit","number", "In degrees like -45"],
                ["panningSensibility","number", "Default: 1000"],
                ["wheelPrecision","number", "Default: 3"],
                ["useAutoRotationBehavior","boolean", "Activate object rotation"],
                ["rotationSpeed","number", "Rotation speed, Default: 0.1"]
            ];
            var settingsEnvironment = [
                ["createGround","boolean"],
                ["groundSize","number"],
                ["createSkybox","boolean"],
                ["skyboxSize","number"],
                ["skyboxColor","color", "set Black (0,0,0) to disable it"],
                ["groundColor","color", "set Black (0,0,0) to disable it"],
                // ["groundShadowLevel","text"],
                // ["setupImageProcessing","boolean"],
                // ["cameraContrast","text"],
                // ["cameraExposure","text"],
            ]
            var settingsOthers = [
                ["backgroundColor","color", "set Black (0,0,0) to disable it"],
                ["deactivateViewerOnStart","boolean"],
                ["highlightOnClick","boolean"],
                ["highlightColor","color", "set Black (0,0,0) to disable it"],
                ["focusOnHelperName", "text", "Enter the helpername for the infopoints. e.g. 'dc-helper' -> adds all variation like 001.dc-helper, dc-helper-helper-10, ..."],
                ["focusImagePath", "text", "URL to the focus image"],
                ["focusRadius", "number", "Set zoom to infopoint radius, e.g. 5"],
                ["toggleVisibilityList", "text", "show/hide able elements, comma separated, like 'object-top, object-bottom, object', or leave empty to detect automatically"],
                ["enableGuiVisibility","boolean"],
                ["enableGuiAnimations","boolean"],
                ["enableInteractButton","boolean"],
            ]

            var elements = [];
            var elementsRight = [];
            var elementsOthers = [];

            function writeData(){
                var checkArray = settingsCamera.concat(settingsEnvironment,settingsOthers);
                var data = [];
                for(let i = 0; i < checkArray.length; i++){
                    var name = checkArray[i][0];
                    var type = checkArray[i][1];
                    if(type == "number"){
                        if($$('#'+name)[0].value && !isNaN($$('#'+name)[0].value)){
                            $$('#'+name).removeClass('error');
                            data.push([name,$$('#'+name)[0].value])
                        }else if($$('#'+name)[0].value){
                            $$('#'+name).addClass('error');
                        }
                    }else if(type == "text"){
                        if($$('#'+name)[0].value){
                            $$('#'+name).removeClass('error');
                            data.push([name,$$('#'+name)[0].value])
                        }else if(!$$('#'+name)[0].value.length){
                           // $$('#'+name).addClass('error');
                        }
                    }
                    else if(type == "color"){
                        if($$('#'+name)[0].value && $$('#'+name)[0].value != '#000000'){
                            var color = convertColor($$('#'+name)[0].value);
                            if(color){
                                data.push([name,color]);
                            }
                        }
                    }
                    else if(type == "boolean"){
                        if($$('#'+name)[0].checked){
                            data.push([name,"true"]);
                        }else{
                            data.push([name,"false"]);
                        }
                    }
                }
                settingsField[0].value = JSON.stringify(data);
            }
            function createElements(settings){
                var elements = [];

                for(let i = 0; i < settings.length; i++){
                    var name = settings[i][0];
                    var type = settings[i][1];
                    var tooltip = settings[i][2];
                    var container = new Element('div', {'class' : 'dc-form-settings-container'});
                    var tooltip = new Element('div', {'class' : 'dc-form-tooltip','text':tooltip});
                    var label = new Element('label', {'class' : 'dc-form-settings-container', 'for': name, 'id': name+'-label', 'text': name});
                    var input;
                    if(type == "number"){
                        input = new Element('input',{'type': 'text', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                    }else if(type == "text"){
                        input = new Element('input',{'type': 'text', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                    }else if (type == "boolean"){
                        input = new Element('input',{'type': 'checkbox', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                    }else if (type == "color"){
                        input = new Element('input',{'type': 'color', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                    }
                    label.adopt(input);
                    container.adopt(label,tooltip);
                    elements.push(
                        container
                    );


                }
                return elements;
            }
            function convertColor(ev) {
                const color = ev
                const r = parseInt(color.substr(1,2), 16) / 255
                const g = parseInt(color.substr(3,2), 16) / 255
                const b = parseInt(color.substr(5,2), 16) / 255
                return (`(${r}, ${g}, ${b})`);
            }
            function componentToHex(c) {
                var hex = (c * 255).toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            }




            elements = createElements(settingsCamera);
            elementsRight  = createElements(settingsEnvironment);
            elementsOthers = createElements(settingsOthers);


            // create the form element
            var headlineCamera = new Element('h3', {'text' : 'Camera Settings'});
            var headlineEnvironment = new Element('h3', {'text' : 'Environment Settings'});
            var headlineOthers = new Element('h3', {'text' : 'Other Settings'});
            var row = new Element('div', {'class' : 'row'});
            var divLeft = new Element('div', {'class' : 'col-6'});
            var divRight = new Element('div', {'class' : 'col-6'});
            var form = new Element('form', {'class' : 'inplaceeditor-form'});

            divLeft.adopt(headlineCamera,elements);
            divRight.adopt(headlineEnvironment,elementsRight,headlineOthers,elementsOthers);
            row.adopt(divLeft,divRight);
            form.adopt(row);
            // put the form inside what ever container you user
            $$('#pal_dc_babylonjs_viewer_legend').adopt(form);

            var setSettingsOnInit = JSON.parse(settingsField[0].value);
            if(setSettingsOnInit){
                var checkArray = settingsCamera.concat(settingsEnvironment,settingsOthers);
                for(let i = 0; i < setSettingsOnInit.length; i++){
                    var elementIndex = checkArray.filter((x)=>x[0] == setSettingsOnInit[i][0]);
                    var type= "";
                    if(elementIndex.length){
                        type = elementIndex[0][1];
                    }

                    if(type == "number"){
                        $$('#'+setSettingsOnInit[i])[0].value = setSettingsOnInit[i][1];
                    }else if(type == "text"){
                        $$('#'+setSettingsOnInit[i])[0].value = setSettingsOnInit[i][1];
                    }else if(type=="boolean" && setSettingsOnInit[i][1] == "true"){
                        $$('#'+setSettingsOnInit[i])[0].checked = setSettingsOnInit[i][1];
                    }else if(type=="color"){
                        var rgbString = setSettingsOnInit[i][1];
                        var rgbArray = setSettingsOnInit[i][1].replace(')','').replace('(','').trim().replace(' ','').replace(' ','').split(',');
                        var hex = rgbToHex(parseFloat(rgbArray[0]),parseFloat(rgbArray[1]),parseFloat(rgbArray[2]));
                        $$('#'+setSettingsOnInit[i])[0].value = hex;
                    }
                }
            }


    }
});


