document.addEventListener("DOMContentLoaded", function(event) {

    $$('#pal_dc_babylonjs_viewer_legend2 .widget h3').forEach(element => {
        element.addEventListener('click',(event)=>{
            if(element.closest('.widget').classList.contains('active')){
                element.closest('.widget').classList.remove('active'); 
            }else{
                element.closest('.widget').classList.add('active'); 
            }
        }); 
    })
    $$('#pal_dc_babylonjs_viewer_legend2 .widget input').forEach(input => {
        if(input.value){
            input.closest('.widget').classList.add('active'); 
        }
    }); 

    // function addcss(css){
    //     var head = document.getElementsByTagName('head')[0];
    //     var s = document.createElement('style');
    //     s.setAttribute('type', 'text/css');
    //     if (s.styleSheet) {   // IE
    //         s.styleSheet.cssText = css;
    //     } else {                // the world
    //         s.appendChild(document.createTextNode(css));
    //     }
    //     head.appendChild(s);
    //  }

    //  let css = `
        
    //  `;

    //  addcss(css); 



    
    var settingsField = $$('#ctrl_dc_viewer_settings');
    if(settingsField.length){

        /**
         * settingsOthers = array<
         *   [0] - id/name
         *   [1] - type "boolean", "text", "color", "number","select"
         *   [2] - Tooltip Text
         *   [3] - Default Value
    *        [4] - Select Options Value
         * >
         */
        /**
         *  ["zoomSelectedMesh","boolean"],  
         *  ["highlightOnClick","boolean"],
                ["highlightColor","color", "set Black (0,0,0) to disable it"], 
                ["toggleVisibilityList", "text", "show/hide able elements, comma separated, like 'object-top, object-bottom, object', or leave empty to detect automatically"],
                ["blackList", "text", "elements, comma separated, to hide"],
                ["showOnlyMeshlist", "text", "elements, comma separated, only visible at start"],
                ["cameraFocus", "text", "Meshlist, comma separated, for camera focus"],
         */
            var settingsOthers = [
               
                ["buttonsGuiDefault","boolean","Enable default Buttons GUI", true],
                ["backgroundColor", "color", "Overwrite Background Color"],
                ["sceneEnvironmentTextur", "text", "Path to EnvironmentTexture (.dds) ", "https://www.babylonjs.com/Assets/environment.dds"],
                ["environmentToCameraRotation","boolean", "Bind environment texture to camera rotation"],
                ["enableWebshop","boolean"],
                ["webshopStartPrice", "text", "startprice"],
                ["webshopButtonText", "text", "In den Einkaufswagen"],
                ["blackList", "text", "elements, comma separated, to hide"],
                ["rotationBehaviour", "select", "Set Rotation Behaviour", 'rotate-auto',
                    {'rotate-auto' : "Rotation Loop", 'rotate-once': 'Rotates until first User Interaction', 'rotate-none': 'Disable Rotation'}
                    
                ],
            ]; 
            var clearButtons = ["backgroundColor", "highlightColor"]; 

            var elements = [];
            var elementsRight = [];
            var elementsOthers = [];

            function writeData(){
                var checkArray = settingsOthers;
                var data = [];
                for(let i = 0; i < checkArray.length; i++){
                    var name = checkArray[i][0];
                    var type = checkArray[i][1];
                    var defaultValue = checkArray[i][2];
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
                           data.push([name,$$('#'+name)[0].value])
                        }
                    }else if(type == "select"){
                        console.log('sleec', $$('#'+name)[0].value); 
                        if($$('#'+name)[0].value){
                            $$('#'+name).removeClass('error');
                            data.push([name,$$('#'+name)[0].value])
                        }else if(!$$('#'+name)[0].value.length){
                           // $$('#'+name).addClass('error');
                           data.push([name,$$('#'+name)[0].value])
                        }
                    }
                    else if(type == "color"){
                        if($$('#'+name)[0].value && (!$$('#'+name+'-clear').length || $$('#'+name)[0].classList.contains('active')) ){
                            var color = convertColor($$('#'+name)[0].value);
                            if(color){
                                data.push([name,color]);
                            }
                        }else{
                            data.push([name,null]);
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
            function createElements(settings, clearButtons){
                var elements = [];

                for(let i = 0; i < settings.length; i++){
                    var name = settings[i][0];
                    var addClearButton = clearButtons.indexOf(name) > -1;
                    var type = settings[i][1];
                    var tooltip = settings[i][2];
                    var defaultValue = settings[i][3];
                    var selectValues = settings[i][4];
                    var container = new Element('div', {'class' : 'dc-form-settings-container'});
                    var tooltip = new Element('div', {'class' : 'dc-form-tooltip','text':tooltip});
                    var labelIcon = new Element('label', {'class' : 'dc-form-label-icon', 'for': name, 'id': name+'-label0'});
                    var label = new Element('label', {'class' : 'dc-form-label-container', 'for': name, 'id': name+'-label', 'html': '<span class="dc-from-text">'+name+'</span>'});
                    
                    let input;
                    if(type == "number"){
                        input = new Element('input',{'type': 'text', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                        if(defaultValue){
                            input.value = defaultValue;   
                        }
                    }else if(type == "text"){
                        input = new Element('input',{'type': 'text', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                        if(defaultValue){
                            input.value = defaultValue;   
                        }
                    }else if (type == "boolean"){
                        input = new Element('input',{'type': 'checkbox', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                        if(defaultValue ){
                            input.checked = 'checked';
                        }
                            
                    }else if (type == "select" && typeof selectValues !== 'undefined'){
                        input = new Element("select", {'id' : name, 'events': {
                            'change': function(e){
                                writeData();
                            },
                        }})
                        Object.keys(selectValues).forEach(key =>{
                            new Element("option", {
                                "value":key,
                                "text" : selectValues[key],
                                "selected" : (defaultValue == key)
                            }).inject(input);
                        });

                        if(defaultValue ){
                            input.value = defaultValue;
                        }
                            
                    }else if (type == "color"){
                        input = new Element('input',{'type': 'color', 'id' : name, 'events': {
                                'change': function(e){
                                    writeData();
                                },
                            }});
                        if(defaultValue){
                            input.value = defaultValue;   
                        }
                        if(addClearButton){
                            let clearLabelIcon = new Element('label', {'class' : 'dc-form-label-icon', 'for': name+'-clear', 'id': name+'-clear-label0'});
                            //  var label = new Element('label', {'class' : 'dc-form-label-container', 'for': name, 'id': name+'-label', 'html': '<span class="dc-from-text">'+name+'</span>'});
                            
                            let clearButton = new Element('input',{'class' : 'dc-form-input-clear', 'tooltip':'activateColor','type': 'checkbox', 'id' : name+'-clear', 'events': {
                                'change': (e) => {
                                    console.log('clicked: ', input, input.value, e); 
                                    let inputContainer = input.closest('.dc-form-settings-container'); 
                                    if(inputContainer){
                                        if(e.target.checked){
                                            input.classList.add('active'); 
                                            inputContainer.classList.add('dc-color-active'); 
                                        }else{
                                            input.classList.remove('active'); 
                                            inputContainer.classList.remove('dc-color-active'); 
                                        }

                                        writeData(); 
                                    }
                                },
                            }});
                            
                            // var clearButton = new Element('div', {'class' : 'dc-form-input-clear', 'html': '<span class="dc-form-icon-clear">✖</span>'});
                            // clearButton.addEventListener('click',(event)=>{
                            //     input.value = ""; 
                            //     input.checked = false;
                            //     console.log('clicked: ', input, input.value); 
                            // }); 
                            container.adopt(clearButton, clearLabelIcon);
                        }

                    }
                    
                    container.adopt(input,labelIcon,label,tooltip);
                    if((type == "text" || type == "number") &&  addClearButton){
                        var clearButton = new Element('div', {'class' : 'dc-form-input-clear', 'html': '<span class="dc-form-icon-clear">✖</span>'});
                        clearButton.addEventListener('click',(event)=>{
                            input.value = ""; 
                            console.log('clicked: ', input, input.value); 
                            writeData();
                        }); 
                        container.adopt(clearButton);
                    }
                    
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
            elementsOthers = createElements(settingsOthers, clearButtons);


            // create the form element
            var headlineOthers = new Element('h3', {'text' : 'Other Settings'});
            var row = new Element('div', {'class' : 'row'});
            var divRight = new Element('div', {'class' : 'col-12'});
            var divOptions = new Element('div', {'class' : 'col-12'});
            var form = new Element('form', {'class' : 'inplaceeditor-form'});

            divRight.adopt(headlineOthers,elementsOthers);
            row.adopt(divRight,divOptions);
            form.adopt(row);
            // put the form inside what ever container you user
            $$('#pal_dc_babylonjs_viewer_legend2').adopt(form);

            if(settingsField[0].value){
                var setSettingsOnInit = JSON.parse(settingsField[0].value);
                if(setSettingsOnInit){
                    var checkArray = settingsOthers;
                    for(let i = 0; i < setSettingsOnInit.length; i++){
                        var elementIndex = checkArray.filter((x)=>x[0] == setSettingsOnInit[i][0]);
                        var type= "";
                        if(elementIndex.length){
                            type = elementIndex[0][1];
                        }
                        let nameInput = '#'+setSettingsOnInit[i][0]; 
                        if(type == "number"){
                            $$(nameInput)[0].value = setSettingsOnInit[i][1];
                        }else if(type == "text"){
                            $$(nameInput)[0].value = setSettingsOnInit[i][1];
                        }else if(type=="boolean" ){
                            $$(nameInput)[0].checked = (setSettingsOnInit[i][1] == "true");
                        }else if(type=="select" ){
                            console.log('select: ', $$(nameInput)[0], setSettingsOnInit[i][1]); 
                            $$(nameInput)[0].value = setSettingsOnInit[i][1];
                        }else if(type=="color"){
                            if(setSettingsOnInit[i][1]){
                                var rgbString = setSettingsOnInit[i][1];
                                var rgbArray = setSettingsOnInit[i][1].replace(')','').replace('(','').trim().replace(' ','').replace(' ','').split(',');
                                var hex = rgbToHex(parseFloat(rgbArray[0]),parseFloat(rgbArray[1]),parseFloat(rgbArray[2]));
                                $$('#'+setSettingsOnInit[i])[0].value = hex;

                                $$(nameInput+'-clear')[0].checked = true;
                                $$(nameInput)[0].classList.add('active'); 
                                $$(nameInput+'-clear')[0].closest('.dc-form-settings-container').classList.add('dc-color-active'); 
                            }
                            
                        }
                    }
                }
            }
            writeData(); 
            
    }
});



