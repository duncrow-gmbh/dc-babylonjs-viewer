(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.window = global.window || {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class DCHtmlElement {
        constructor(className, id, innerHtml, htmlElementSettings, htmlElementType = 'div') {
            this.children = [];
            var dcHtmlElement = document.createElement(htmlElementType);
            if (className) {
                dcHtmlElement.className = className;
            }
            if (id) {
                let htmlId = id.toLocaleLowerCase().replace(/\W/g, '-');
                dcHtmlElement.id = htmlId;
            }
            if (innerHtml) {
                dcHtmlElement.innerHTML = innerHtml;
            }
            if (htmlElementSettings === null || htmlElementSettings === void 0 ? void 0 : htmlElementSettings.attributes) {
                htmlElementSettings.attributes.forEach(attribute => {
                    dcHtmlElement.setAttribute(attribute[0], attribute[1]);
                });
            }
            this.element = dcHtmlElement;
        }
        innerHtml(text) {
            this.element.innerHTML = text;
        }
        addClass(className) {
            this.element.classList.add(className);
        }
        hasClass(className) {
            return this.element.classList.contains(className);
        }
        removeClass(className) {
            this.element.classList.remove(className);
        }
        addChild(childElement) {
            if (Array.isArray(childElement)) {
                this.children.push(...childElement);
                childElement.forEach(child => {
                    this.element.appendChild(child.element);
                    child.parent = this;
                });
            }
            else {
                this.children.push(childElement);
                childElement.parent = this;
                this.element.appendChild(childElement.element);
            }
        }
        getChildren(classname = "", attribute = null, results = []) {
            let findChildren = [];
            for (let i = 0; i < this.children.length; i++) {
                this.filterElements(this.children[i], findChildren, classname, attribute);
            }
            return findChildren;
        }
        filterElements(child, results = [], classname, attribute = null) {
            if (classname && attribute
                && (classname && child.element.classList.contains(classname))
                && (attribute && child.element.getAttribute(attribute.attribute) == attribute.searchValue)) {
                results.push(child);
            }
            else if (classname && !attribute && child.element.classList.contains(classname)) {
                results.push(child);
            }
            else if (attribute && !classname && child.element.getAttribute(attribute.attribute) == attribute.searchValue) {
                results.push(child);
            }
            if (child.children) {
                for (let subChild of child.children) {
                    this.filterElements(subChild, results, classname, attribute);
                }
            }
        }
        setDisable(disable = true) {
            if (disable) {
                this.element.classList.add('disabled');
            }
            else {
                this.element.classList.remove('disabled');
            }
        }
        fadeIn() {
            return this.fading(true);
        }
        fadeOut() {
            return this.fading(false);
        }
        fading(fadeIn) {
            window.clearInterval(this._fadeIntervall);
            let opacity = Number(this.element.style.opacity);
            return new Promise((resolve, reject) => {
                if (typeof this.element != 'undefined' && typeof this.element.style != 'undefined') {
                    var increment = 0.05;
                    this._fadeIntervall = window.setInterval(() => {
                        opacity = opacity + ((fadeIn) ? (+increment) : (-increment));
                        this.element.style.opacity = opacity.toString();
                        if ((fadeIn && opacity >= 1) || (!fadeIn && opacity <= 0)) {
                            this.element.style.opacity = ((fadeIn) ? 1 : 0).toString();
                            window.clearInterval(this._fadeIntervall);
                            resolve(true);
                        }
                    }, 75);
                }
                else {
                    console.error('button not found');
                    reject('error, button not found');
                }
            });
        }
        setHidden(hidden = true, fade = false) {
            if (hidden) {
                this.element.classList.add('start-hiding');
                if (fade) {
                    this.fadeOut().then((value) => {
                        this.element.classList.add('hidden');
                        this.element.classList.remove('start-hiding');
                    });
                }
                else {
                    this.element.classList.add('hidden');
                    this.element.classList.remove('start-hiding');
                }
            }
            else {
                this.element.classList.add('start-showing');
                this.element.classList.remove('hidden');
                if (fade) {
                    this.fadeIn().then((value) => {
                        this.element.classList.remove('start-showing');
                    });
                }
                else {
                    this.element.classList.remove('start-showing');
                }
            }
        }
    }

    exports.DC_GUI_CLICK_TYPES = void 0;
    (function (DC_GUI_CLICK_TYPES) {
        DC_GUI_CLICK_TYPES["material"] = "material";
        DC_GUI_CLICK_TYPES["toggle"] = "toggle";
        DC_GUI_CLICK_TYPES["switchObject"] = "switchObject";
        DC_GUI_CLICK_TYPES["process"] = "process";
        DC_GUI_CLICK_TYPES["text"] = "text";
        DC_GUI_CLICK_TYPES["button"] = "button";
        DC_GUI_CLICK_TYPES["filter"] = "filter";
        DC_GUI_CLICK_TYPES["search"] = "search";
    })(exports.DC_GUI_CLICK_TYPES || (exports.DC_GUI_CLICK_TYPES = {}));
    class DCGuiClick {
    }

    class DCAccordion {
        constructor() {
            this._clickCallback = null;
        }
        get accordionMainContainer() {
            return this._accordionMainContainer;
        }
        reset() {
            var _a;
            if ((_a = this._accordionMainContainer) === null || _a === void 0 ? void 0 : _a.element) {
                this._accordionMainContainer.element.replaceChildren();
                delete (this._accordionMainContainer);
            }
        }
        addClass(className) {
            this._accordionMainContainer.element.classList.add(className);
        }
        removeClass(className) {
            this._accordionMainContainer.element.classList.remove(className);
        }
        toggleVisibleButton(button) {
            if (button.parent.parent.element.classList.contains('dc-ac-toggle')) {
                let toggleClass = 'toggle-hide';
                let iconVisible = "<span class='dc-icons-eye-visible'></span>";
                let iconInvisible = "<span class='dc-icons-eye-invisible'></span>";
                if (button.parent.parent.element.classList.contains(toggleClass)) {
                    button.parent.parent.element.classList.remove(toggleClass);
                    button.innerHtml(iconVisible);
                    button.removeClass(toggleClass);
                }
                else {
                    button.parent.parent.element.classList.add(toggleClass);
                    button.innerHtml(iconInvisible);
                    button.addClass(toggleClass);
                }
            }
        }
        createAccordion(parentContainer, accordionList, processIndex, stepIndex, clickCallback = null) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    this.reset();
                    this._clickCallback = clickCallback;
                    this._accordionList = accordionList.processes;
                    this._filterCategories = accordionList.filterCategories;
                    this._breadcrumbs = accordionList.breadcrumbs;
                    this._searchOption = accordionList.search;
                    this._accordionMainContainer = new DCHtmlElement('dc-accordion-main-container');
                    let accordionMainContainerInner = new DCHtmlElement('dc-accordion-main-container-inner');
                    parentContainer.appendChild(this._accordionMainContainer.element);
                    this._accordionMainContainer.addChild(accordionMainContainerInner);
                    if (this._searchOption) {
                        let searchContainer = new DCHtmlElement('dc-accordion-search-container');
                        let attributesInput = [
                            ['type', 'text'],
                        ];
                        let attributesButton = [
                            ['type', 'button'],
                        ];
                        let searchInput = new DCHtmlElement('dc-accordion-search-input', '', undefined, { attributes: attributesInput }, 'input');
                        let input = searchInput.element;
                        let searchButton = new DCHtmlElement('dc-accordion-search-button', '', '<span class="dc-icons-magnifying"></span>', { attributes: attributesButton }, 'button');
                        let button = searchButton.element;
                        button.addEventListener('click', (event) => {
                            this.createClickCallback(null, exports.DC_GUI_CLICK_TYPES.search, button.className, input.value);
                        });
                        searchContainer.addChild([searchInput, searchButton]);
                        accordionMainContainerInner.addChild(searchContainer);
                    }
                    this.createFilter(accordionMainContainerInner);
                    let saveActiveItemDataIndex = '';
                    let imgPromiseList = [];
                    this._accordionList.forEach((stepParent, index) => {
                        if (index == processIndex) {
                            let accordionContainer = new DCHtmlElement('dc-accordion-container', stepParent.name);
                            accordionMainContainerInner.addChild(accordionContainer);
                            stepParent.steps.forEach((step, indexSteps) => {
                                let optionIds = (Array.isArray(step.optionId)) ? step.optionId.join(',') : step.optionId;
                                let breadcrumbFilterCategories = (Array.isArray(step.filterCategories)) ? step.filterCategories.join(',') : step.filterCategories;
                                let dataIndex = 'dc-ac-' + index.toString() + '-' + indexSteps.toString();
                                if (stepIndex != null && indexSteps === stepIndex) {
                                    saveActiveItemDataIndex = dataIndex;
                                }
                                let attributes = [];
                                attributes.push(['data-index', dataIndex]);
                                if (optionIds) {
                                    attributes.push(['data-object-id', optionIds]);
                                }
                                if (breadcrumbFilterCategories) {
                                    attributes.push(['data-categories', breadcrumbFilterCategories]);
                                }
                                if (typeof step.breadcrumbActive !== 'undefined' && step.breadcrumbActive) {
                                    attributes.push(['data-breadcrumb', step.breadcrumbActive]);
                                }
                                let acItem = new DCHtmlElement('dc-accordion-item ' + ((step.toggle) ? 'dc-ac-toggle' : '') + ((typeof step.breadcrumbActive !== 'undefined' && step.breadcrumbActive) ? 'dc-accordion-breadcrumb-parent' : ''), '', '', { attributes: attributes });
                                let acHeadline = new DCHtmlElement('dc-accordion-headline', '', step.title);
                                let acToggleButton;
                                if (step.toggle) {
                                    let toggleClass = 'toggle-hide';
                                    let iconVisible = "<span class='dc-icons-eye-visible'></span>";
                                    acToggleButton = new DCHtmlElement('dc-accordion-toggle-button', '', iconVisible, ((optionIds) ? { attributes: [['data-object-id', optionIds]] } : null));
                                    acHeadline.addChild(acToggleButton);
                                    acToggleButton.element.addEventListener('click', (evt) => {
                                        evt.preventDefault();
                                        evt.stopPropagation();
                                        if (step.toggle && acHeadline.parent.element.classList.contains('dc-ac-toggle')) {
                                            this.toggleVisibleButton(acToggleButton);
                                            this.createClickCallback(acItem, exports.DC_GUI_CLICK_TYPES.toggle, optionIds, (acHeadline.parent.element.classList.contains(toggleClass)) ? 'hidden' : 'visible');
                                        }
                                    });
                                }
                                acItem.addChild([acHeadline]);
                                this.createBreadcrumbs(step, acItem);
                                if (step.desc || step.materials) {
                                    let acDescription = new DCHtmlElement('dc-accordion-description');
                                    let acDescriptionInner = new DCHtmlElement('dc-accordion-description-inner', '', step.desc);
                                    acDescription.addChild(acDescriptionInner);
                                    if (step.optionId) {
                                        if (step.materials) {
                                            let acMaterialList = new DCHtmlElement('dc-accordion-material-container');
                                            step.materials.forEach(material => {
                                                let acMaterialItem = new DCHtmlElement('dc-accordion-material-item');
                                                let prefix = "dc-material-overlay-";
                                                if (typeof material.overlay !== "undefined") {
                                                    let overlayClasses = material.overlay.split(' ');
                                                    overlayClasses = overlayClasses.map(className => prefix + className);
                                                    acMaterialItem.element.classList.add(...overlayClasses);
                                                }
                                                acMaterialItem.element.style.background = material.background;
                                                let innerHtml = '<div class="dc-material-name">' + material.title + '</div>';
                                                if (typeof material.price !== 'undefined' && !Number.isNaN(material.price)) {
                                                    innerHtml += '<div class="dc-price">' + material.price + '</div>';
                                                }
                                                acMaterialItem.innerHtml(innerHtml);
                                                acMaterialList.addChild(acMaterialItem);
                                                acMaterialItem.element.addEventListener('click', (evt) => {
                                                    acMaterialList.children.forEach(material => {
                                                        if (material == acMaterialItem) {
                                                            material.addClass('active');
                                                        }
                                                        else {
                                                            material.removeClass('active');
                                                        }
                                                    });
                                                    let type = (material.type) ? material.type : exports.DC_GUI_CLICK_TYPES.material;
                                                    this.createClickCallback(acItem, type, optionIds, material.action);
                                                });
                                            });
                                            acDescription.addChild(acMaterialList);
                                        }
                                    }
                                    imgPromiseList.push(this.imgHandler(acDescriptionInner, acDescription));
                                    acItem.addChild([acDescription]);
                                }
                                else {
                                    acHeadline.addClass('dc-ac-item-disable');
                                }
                                acHeadline.element.addEventListener('click', (evt) => {
                                    if (!acHeadline.hasClass('dc-ac-item-disable')) {
                                        this.createClickCallback(acItem, exports.DC_GUI_CLICK_TYPES.process);
                                        this.toggleActive(dataIndex);
                                    }
                                    if (acItem.hasClass('dc-ac-toggle') && acHeadline.hasClass('dc-ac-item-disable')) {
                                        acToggleButton.element.click();
                                    }
                                });
                                accordionContainer.addChild(acItem);
                            });
                        }
                    });
                    if (saveActiveItemDataIndex) {
                        this.toggleActive(saveActiveItemDataIndex);
                    }
                    Promise.all(imgPromiseList)
                        .then((fetchList) => {
                        resolve(true);
                    });
                });
            });
        }
        createClickCallback(accordionElement, type, id, value) {
            if (this._clickCallback) {
                let returnObject = {};
                returnObject.id = id;
                returnObject.type = type;
                if (value) {
                    returnObject.value = value;
                }
                if (accordionElement) {
                    let returnDataAttributes = {};
                    var attributes = [].filter.call(accordionElement.element.attributes, at => /^data-/.test(at.name));
                    attributes.forEach(attr => {
                        returnDataAttributes[attr.name.replace('data-', '')] = attr.value;
                    });
                    if (!id && typeof returnDataAttributes['index'] !== 'undefined') {
                        returnObject.id = returnDataAttributes['index'];
                    }
                    returnObject.data = returnDataAttributes;
                    returnObject.accordion = accordionElement.element;
                }
                this._clickCallback(returnObject);
            }
        }
        createBreadcrumbs(step, acItem) {
            if (typeof step.breadcrumbActive !== 'undefined' && step.breadcrumbActive) {
                let row = new DCHtmlElement('dc-accordion-row');
                let activeBreadcrumb = this._breadcrumbs.find(x => x.id == step.breadcrumbActive);
                let breadcrumblist = [];
                if (typeof activeBreadcrumb !== 'undefined') {
                    breadcrumblist.push(activeBreadcrumb);
                    let parent = activeBreadcrumb.parent;
                    while (typeof parent === 'string' && parent) {
                        let parentBreadcrumb = this._breadcrumbs.find(x => x.id == parent);
                        if (typeof parentBreadcrumb !== 'undefined') {
                            breadcrumblist.push(parentBreadcrumb);
                            parent = parentBreadcrumb.parent;
                        }
                        else {
                            parent = undefined;
                        }
                    }
                }
                if (breadcrumblist.length) {
                    breadcrumblist.reverse().forEach(breadcrumb => {
                        let breadcrumbClass = 'dc-accordion-breadcrumb';
                        if (step.breadcrumbActive.includes(breadcrumb.id)) {
                            breadcrumbClass += ' active';
                        }
                        row.addChild(new DCHtmlElement(breadcrumbClass, '', breadcrumb.title));
                    });
                    acItem.addChild([row]);
                }
            }
        }
        createFilter(accordionMainContainerInner) {
            if (typeof this._filterCategories !== 'undefined' && this._filterCategories && this._filterCategories.length) {
                let style = "<style>";
                let filterContainer = new DCHtmlElement('dc-accordion-filter-container dc-accordion-row');
                this._filterCategories.forEach(cat => {
                    style += ".dc-accordion-item[data-categories=" + cat.name + "] .dc-accordion-breadcrumb.active, ";
                    style += ".dc-accordion-item[data-categories=" + cat.name + "].active .dc-accordion-headline:before, ";
                    style += ".dc-accordion-item[data-categories=" + cat.name + "].active:before, ";
                    style += ".dc-accordion-item[data-categories=" + cat.name + "]:hover:before, ";
                    style += ".dc-accordion-item[data-categories=" + cat.name + "]:hover .dc-accordion-headline:before  {";
                    style += "background : " + cat.color + ' !important;';
                    style += "}";
                    let attributes = [
                        ['style', 'background:' + cat.color + ';'],
                        ['data-filter-categorie', cat.name]
                    ];
                    let filterItem = new DCHtmlElement('dc-accordion-filter-item', '', cat.text, { attributes: attributes });
                    filterItem.element.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        filterContainer.children.forEach(x => {
                            if (x == filterItem && !filterItem.hasClass('active')) {
                                x.addClass('active');
                            }
                            else {
                                x.removeClass('active');
                            }
                        });
                        this.createClickCallback(null, exports.DC_GUI_CLICK_TYPES.filter, cat.name, filterItem.hasClass('active').toString());
                    });
                    filterContainer.addChild(filterItem);
                });
                style += "</style>";
                let stylingContainer = new DCHtmlElement('dc-accordion-styling-container', '', style);
                accordionMainContainerInner.addChild([filterContainer, stylingContainer]);
            }
        }
        imgHandler(acDescriptionInner, acDescription) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    setTimeout(function () {
                        const promises = Array.from(acDescriptionInner.element.querySelectorAll('img')) // get all images
                            .map((img) => {
                            if (img.complete) {
                                return Promise.resolve(); // Check if the image already loaded. Maybe it's been too fast
                            }
                            return new Promise((resolve, reject) => {
                                img.onload = resolve; // it resolves when it loads
                                img.onerror = reject; // avoids infinite waiting
                            });
                        });
                        Promise.all(promises)
                            .then(() => {
                            acDescription.element.style.maxHeight = acDescription.element.scrollHeight + 50 + 'px';
                            resolve(true);
                        })
                            .catch(() => {
                        });
                    }, 10);
                });
            });
        }
        resetAccordionDescriptionHeight() {
            if (this._accordionMainContainer && typeof this._accordionMainContainer.element !== 'undefined') {
                let descriptions = this._accordionMainContainer.getChildren('.dc-accordion-description');
                descriptions.forEach((description) => {
                    var desc = description.element;
                    desc.style.maxHeight = desc.scrollHeight + 100 + 'px';
                });
            }
        }
        toggleActive(dataIndex = null, objectId = null, value = false, forceScrollInView = false) {
            let children = this._accordionMainContainer.getChildren('dc-accordion-item');
            if (typeof children !== 'undefined' && children && children.length) {
                children.forEach(accordionItem => {
                    if ((dataIndex && accordionItem.element.getAttribute('data-index') == dataIndex)
                        || (objectId && accordionItem.element.getAttribute('data-object-id') == objectId)) {
                        if (accordionItem.element.classList.contains('active') && !value) {
                            accordionItem.element.classList.remove('active');
                        }
                        else {
                            accordionItem.element.classList.add('active');
                            if (forceScrollInView) {
                                accordionItem.element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                            }
                        }
                    }
                    else {
                        accordionItem.element.classList.remove('active');
                    }
                });
            }
        }
    }

    class DCHelper {
        convertCamelCase(str) {
            if (!str) {
                return null;
            }
            return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        }
        copyContent(copyText) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    try {
                        if (typeof navigator.clipboard !== 'undefined') {
                            navigator.clipboard.writeText(copyText);
                            resolve(copyText);
                        }
                        else {
                            reject('Navigator.clipboard is undefined');
                            console.error('Failed to copy: ', 'Navigator.clipboard is undefined (browser settings or try using https');
                        }
                    }
                    catch (err) {
                        reject(err);
                        console.error('Failed to copy: ', err);
                    }
                });
            });
        }
    }

    class DCButtons {
        constructor() {
            this._clickCallback = null;
            this._helper = new DCHelper();
            this._buttonsMainContainer = [];
        }
        createButtons(parentContainer, buttonJson, positionKey = "buttonsPosition", clickCallback = null, clickAction = null) {
            this._clickCallback = clickCallback;
            let buttonsContainer = new DCHtmlElement('dc-buttons-main-container');
            this._buttonsMainContainer.push(buttonsContainer);
            parentContainer.appendChild(buttonsContainer.element);
            let buttonPositions = buttonJson[positionKey];
            Object.keys(buttonPositions).forEach(key => {
                let positionItems = buttonPositions[key];
                if (positionItems) {
                    let btnItemPositionContainer = new DCHtmlElement('dc-buttons-position dc-buttons-' + this._helper.convertCamelCase(key));
                    buttonsContainer.addChild(btnItemPositionContainer);
                    positionItems.forEach(item => {
                        let buttonType = this._helper.convertCamelCase(item);
                        let button = new DCHtmlElement('dc-button-item dc-button-type-' + buttonType);
                        btnItemPositionContainer.addChild(button);
                        if (item == 'copy' || item == 'share') {
                            let buttonShareContainer = new DCHtmlElement('dc-button-share-container');
                            button.addChild(buttonShareContainer);
                            button.element.addEventListener('click', (evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                if (buttonShareContainer.element.classList.contains('show')) {
                                    buttonShareContainer.element.classList.remove('show');
                                }
                                else {
                                    buttonShareContainer.element.classList.add('show');
                                }
                            });
                            let buttonShare = new DCHtmlElement('dc-button-item dc-button-item-share dc-button-share-type-copy');
                            buttonShareContainer.addChild(buttonShare);
                            let urlCopy = location.href.replace(location.hash, "") + ((parentContainer.id) ? '#' + parentContainer.id : '');
                            buttonShare.element.innerHTML = '<span>' + urlCopy + '</span>';
                            buttonShare.element.addEventListener('click', (e) => {
                                this._helper.copyContent(urlCopy).then(text => {
                                    console.log('url copied', text);
                                }, error => {
                                    console.log('errorcoping', error);
                                });
                            });
                        }
                        else {
                            button.element.addEventListener('click', (evt) => {
                                if (clickAction) {
                                    clickAction({ type: exports.DC_GUI_CLICK_TYPES.button, value: buttonType });
                                }
                                if (this._clickCallback) {
                                    this._clickCallback({ type: exports.DC_GUI_CLICK_TYPES.button, value: buttonType });
                                }
                            });
                        }
                    });
                }
            });
        }
        addClass(className) {
            this._buttonsMainContainer[0].element.classList.add(className);
        }
        removeClass(className) {
            this._buttonsMainContainer[0].element.classList.remove(className);
        }
        setButtonAttribute(buttonTypeName = null, disable = false, hide = false, fade = false) {
            if (Array.isArray(buttonTypeName)) {
                buttonTypeName.forEach(buttonName => {
                    this.setButtonAttributeLoop(buttonName, disable, hide, fade);
                });
            }
            else {
                this.setButtonAttributeLoop(buttonTypeName, disable, hide, fade);
            }
        }
        setButtonAttributeLoop(buttonName, disable = false, hide = false, fade = false) {
            let buttonType = this._helper.convertCamelCase(buttonName);
            this._buttonsMainContainer.forEach(buttonContainer => {
                let findButtons = buttonContainer.getChildren((buttonType) ? 'dc-button-type-' + buttonType : 'dc-button-item');
                if (findButtons.length) {
                    findButtons.forEach(button => {
                        button.setDisable(disable);
                        button.setHidden(hide, fade);
                    });
                }
            });
        }
    }

    class DCLighbox {
        constructor(querySelector) {
            let body = document.querySelector('body');
            let images = document.querySelectorAll(querySelector);
            document.createElement('div');
            this._dcLightbox = new DCHtmlElement('dc-lightbox-wrapper');
            let dcLightboxInner = new DCHtmlElement('dc-lightbox-inner');
            let dcLightboxImagecontainer = new DCHtmlElement('dc-lightbox-image-container');
            let closeIcon = new DCHtmlElement('dc-lightbox-close dc-icons-close');
            this._dcLightbox.addChild(dcLightboxInner);
            dcLightboxInner.addChild([closeIcon, dcLightboxImagecontainer]);
            this.closeLightboxEvent(this._dcLightbox);
            this.closeLightboxEvent(closeIcon);
            dcLightboxInner.element.addEventListener('click', function (element) {
                element.preventDefault();
                element.stopPropagation();
            });
            images.forEach((image) => {
                var clickWrapper = document.createElement('div');
                this.wrap(image, clickWrapper);
                clickWrapper.classList.add('dc-lightbox-image');
                clickWrapper.addEventListener('click', (e) => {
                    body.appendChild(this._dcLightbox.element);
                    let clonedImg = image.cloneNode(true);
                    dcLightboxImagecontainer.innerHtml("");
                    dcLightboxImagecontainer.element.appendChild(clonedImg);
                });
            });
        }
        closeLightboxEvent(emitter) {
            emitter.element.addEventListener('click', (e) => {
                this._dcLightbox.element.remove();
            });
        }
        wrap(el, wrapper) {
            if (el && el.parentNode) {
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            }
        }
    }

    class DCGui {
        constructor(containerId, jsonObjStepsPath, jsonObjButtonsPath, language = 'de', processIndex = 0, stepIndex = 0, clickCallback = null, accordionCreationFinished = null) {
            this.isNaviagtionHidden = false;
            this._clickCallback = null;
            this.disableFullscreenEvent = false;
            this.clickAccordionReturnEvent = (clickedDataIndex) => {
                if (clickedDataIndex.type == exports.DC_GUI_CLICK_TYPES.filter) {
                    this.filterCategorie(clickedDataIndex.id, clickedDataIndex.value);
                }
                if (clickedDataIndex.type == exports.DC_GUI_CLICK_TYPES.search) {
                    this.filterSearch(clickedDataIndex.value);
                }
                this._clickCallback(clickedDataIndex);
            };
            this.checkClickCallback = (clickedDataIndex) => {
                if (!this.disableFullscreenEvent && clickedDataIndex.value === 'fullscreen') {
                    this.fullscreen();
                }
                if (clickedDataIndex.value === 'menu' || clickedDataIndex.value === 'menu-mobile') {
                    this.toggleNavigation();
                }
            };
            this.fullscreenToggler = (event) => {
                if (this.fullscreenToggle) {
                    this.fullscreenToggle(this._fullscreenContainer, this.isFullscreen());
                }
            };
            this._clickCallback = clickCallback;
            this._accordion = new DCAccordion();
            this._buttons = new DCButtons();
            this._buttonsAccordion = new DCButtons();
            this._stepJson = {};
            let container = (typeof containerId === "string") ? document.querySelector(containerId) : containerId;
            this._container = (container) ? container : document.querySelector('body');
            this._fullscreenContainer = this._container;
            this.loadConfigFiles(jsonObjStepsPath, jsonObjButtonsPath, language, processIndex, stepIndex, accordionCreationFinished);
            document.addEventListener('fullscreenchange', this.fullscreenToggler);
            document.addEventListener('webkitfullscreenchange', this.fullscreenToggler);
            document.addEventListener('mozfullscreenchange', this.fullscreenToggler);
            document.addEventListener('MSFullscreenChange', this.fullscreenToggler);
            let lasche = new DCHtmlElement('dc-scroll-flap');
            setTimeout(() => {
                this._container.appendChild(lasche.element);
            }, 0);
        }
        setFullscreenContainer(containerEl) {
            this._fullscreenContainer = (typeof containerEl === "string") ? document.querySelector(containerEl) : containerEl;
        }
        getFullscreenContainer() {
            return this._fullscreenContainer;
        }
        get accordion() {
            return this._accordion;
        }
        loadConfigFiles(jsonObjStepsPath, jsonObjButtonsPath, language, processIndex, stepIndex, accordionCreationFinished = null) {
            return __awaiter(this, void 0, void 0, function* () {
                let accordionJsonLoader;
                if (jsonObjStepsPath) {
                    accordionJsonLoader = new Promise((resolve, reject) => {
                        if (jsonObjStepsPath && typeof jsonObjStepsPath == "string") {
                            accordionJsonLoader = fetch(jsonObjStepsPath)
                                .then((response) => response.json())
                                .then((json) => {
                                this._stepJson = json;
                                this.createAccordion(this._stepJson[language], processIndex, stepIndex).then(() => {
                                    resolve(true);
                                });
                            });
                        }
                        else if (jsonObjStepsPath) {
                            this._stepJson = jsonObjStepsPath;
                            return this.createAccordion(this._stepJson[language], processIndex, stepIndex).then(() => {
                                resolve(true);
                            });
                        }
                    });
                }
                let buttonsJsonLoader;
                if (jsonObjButtonsPath && typeof jsonObjButtonsPath == "string") {
                    buttonsJsonLoader = fetch(jsonObjButtonsPath)
                        .then((response) => response.json())
                        .then((jsonButton) => {
                        this._buttonJson = jsonButton;
                        this.createButtons(this._buttonJson);
                    });
                }
                else if (jsonObjButtonsPath) {
                    this._buttonJson = jsonObjButtonsPath;
                    this.createButtons(this._buttonJson);
                }
                let fetchList = [];
                if (accordionJsonLoader) {
                    fetchList.push(accordionJsonLoader);
                }
                if (buttonsJsonLoader) {
                    fetchList.push(buttonsJsonLoader);
                }
                yield Promise.all(fetchList)
                    .then((fetchList) => {
                    new DCLighbox('.dc-accordion-item img');
                    if (this._buttonJson && accordionJsonLoader) {
                        this.createButtons(this._buttonJson, this._accordion.accordionMainContainer.element, "accordionPosition");
                        this._container.classList.add('dc-exists-buttons');
                    }
                    if (jsonObjButtonsPath && !jsonObjStepsPath) {
                        this._buttons.addClass('dc-fullwidth');
                        accordionCreationFinished(this);
                    }
                    if (jsonObjStepsPath) {
                        this._container.classList.add('dc-exists-accordion');
                        setTimeout(() => {
                            accordionCreationFinished(this);
                        }, 5);
                    }
                })
                    .catch(err => console.error(err));
            });
        }
        reloadAccordion(language = 'de', processIndex = 0, stepIndex = 0) {
            this.createAccordion(this._stepJson[language], processIndex, stepIndex);
        }
        resetAccordion() {
            if (this._accordion) {
                this._accordion.resetAccordionDescriptionHeight();
            }
        }
        createAccordion(accordionList, processIndex, stepIndex) {
            return __awaiter(this, void 0, void 0, function* () {
                return this._accordion.createAccordion(this._container, accordionList, processIndex, stepIndex, this.clickAccordionReturnEvent);
            });
        }
        filterCategorie(categorieId, showOnlyFilteredItems = "true") {
            this.resetFilterSearch(2);
            let findChild = this._accordion.accordionMainContainer.getChildren('dc-accordion-item', { attribute: 'data-categories', searchValue: categorieId });
            if (showOnlyFilteredItems == "true" && typeof findChild !== 'undefined' && findChild && findChild.length) {
                this._accordion.accordionMainContainer.getChildren('dc-accordion-item').forEach(child => {
                    if (typeof findChild.find(x => x == child) != 'undefined') {
                        child.removeClass('hidden');
                    }
                    else {
                        child.addClass('hidden');
                    }
                });
            }
            else {
                this._accordion.accordionMainContainer.getChildren('dc-accordion-item').forEach(child => {
                    child.removeClass('hidden');
                });
            }
        }
        resetFilterSearch(type = 0) {
            if (type === 0) {
                this._accordion.accordionMainContainer.getChildren('dc-accordion-item').forEach(child => {
                    child.removeClass('hidden');
                });
            }
            if (type === 0 || type === 1) {
                this._accordion.accordionMainContainer.getChildren('dc-accordion-filter-item').forEach(child => {
                    child.removeClass('active');
                });
            }
            if (type === 0 || type === 2) {
                this._accordion.accordionMainContainer.getChildren('dc-accordion-search-input').forEach(child => {
                    child.element.value = "";
                });
            }
        }
        filterSearch(searchValue) {
            let allChildren = this._accordion.accordionMainContainer.getChildren('dc-accordion-item');
            this.resetFilterSearch(1);
            allChildren.forEach(child => {
                if (!searchValue || searchValue.length < 3 || child.element.textContent.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
                    child.removeClass('hidden');
                }
                else {
                    child.addClass('hidden');
                }
            });
        }
        createButtons(buttons, container = this._container, positionKey = "buttonsPosition") {
            this._buttons.createButtons(container, buttons, positionKey, this._clickCallback, this.checkClickCallback);
        }
        disableButtons(buttonType) {
            this._buttons.setButtonAttribute(buttonType, true);
        }
        enableButtons(buttonType) {
            this._buttons.setButtonAttribute(buttonType, false);
        }
        hideButtons(buttonType, fade = true) {
            this._buttons.setButtonAttribute(buttonType, null, true, fade);
        }
        showButtons(buttonType, fade = true) {
            this._buttons.setButtonAttribute(buttonType, null, false, fade);
        }
        /**
         * Disable one accordion item per index or disable the whole accordion
         * @param accordionIndex Index of accordion item (data-index) | set "null" for the whole accordion element
         * @param objectId ObjectId (data-object-id)| set "null" for the whole accordion element
         */
        disableAccordion(accordionIndex = null, objectId = null) {
            return;
        }
        /**
         * Enable one accordion item per index or enable the whole accordion
         * @param accordionIndex Index of accordion item | set "null" for the whole accordion element
         * @param objectId ObjectId (data-object-id)| set "null" for the whole accordion element
         */
        enableAccordion(accordionIndex = null, objectId = null) {
            return;
        }
        getAccordions(searchTerm, dataType) {
            let returnObject = [];
            let children = this.accordion.accordionMainContainer.getChildren(null, { attribute: ('data-' + dataType), searchValue: searchTerm });
            if (typeof children !== 'undefined' && children.length) {
                children.forEach(child => {
                    let returnDataAttributes = {};
                    var attributes = [].filter.call(child.element.attributes, at => /^data-/.test(at.name));
                    attributes.forEach(attr => {
                        returnDataAttributes[attr.name.replace('data-', '')] = attr.value;
                    });
                    returnObject.push({
                        "data": returnDataAttributes,
                        "accordion": child.element
                    });
                });
            }
            return returnObject;
        }
        fullscreen() {
            if (!document.fullscreenElement) {
                this._fullscreenContainer.requestFullscreen().then(() => {
                }).catch((err) => console.error(err));
            }
            else {
                document
                    .exitFullscreen()
                    .then(() => {
                })
                    .catch((err) => console.error(err));
            }
        }
        isFullscreen() {
            return !!document.fullscreenElement;
        }
        toggleAccordionActive(dataIndex = null, objectId = null, value = true) {
            if (this.isNaviagtionHidden) {
                this.toggleNavigation(false);
                setTimeout(() => {
                    this._accordion.toggleActive(dataIndex, objectId, value, true);
                }, 200);
            }
            else {
                this._accordion.toggleActive(dataIndex, objectId, value, true);
            }
        }
        toggle(id, hidden) {
            let searchId = Array.isArray(id) ? id.join(',') : id;
            let toggleElements = this._accordion.accordionMainContainer.getChildren('dc-accordion-toggle-button', { attribute: "data-object-id", searchValue: searchId });
            if (toggleElements.length) {
                toggleElements.forEach(element => {
                    if ((typeof hidden === "undefined" && !element.element.classList.contains('toggle-hide'))
                        || (hidden && !element.element.classList.contains('toggle-hide'))
                        || (!hidden && element.element.classList.contains('toggle-hide'))) {
                        this._accordion.toggleVisibleButton(element);
                    }
                });
            }
        }
        toggleNavigation(forceHide = null) {
            let body = document.querySelector('body');
            let className = 'hide-menu';
            let classNameMobile = 'hide-menu-mobile';
            if ((forceHide === null && (body.classList.contains(className) || body.classList.contains(classNameMobile))) ||
                (forceHide === false)) {
                body.classList.remove(className);
                body.classList.remove(classNameMobile);
                this.isNaviagtionHidden = false;
            }
            else if ((forceHide === null && !(body.classList.contains(className) || body.classList.contains(classNameMobile))) ||
                (forceHide === true)) {
                body.classList.add(className);
                body.classList.add(classNameMobile);
                this.isNaviagtionHidden = true;
            }
        }
    }

    class DCGuiOptions {
    }
    class DCGuiOptionsProcesses {
    }
    class DCGuiOptionsSteps {
    }

    class DCHtmlElementSettings {
    }

    class DCGuiButtons {
    }
    var DC_GUI_BUTTONS;
    (function (DC_GUI_BUTTONS) {
        DC_GUI_BUTTONS["copy"] = "copy";
        DC_GUI_BUTTONS["cameraReset"] = "cameraReset";
        DC_GUI_BUTTONS["info"] = "info";
        DC_GUI_BUTTONS["ar"] = "ar";
        DC_GUI_BUTTONS["fullscreen"] = "fullscreen";
        DC_GUI_BUTTONS["menu"] = "menu";
        DC_GUI_BUTTONS["menuMobile"] = "menuMobile";
        DC_GUI_BUTTONS["playBegin"] = "playBegin";
        DC_GUI_BUTTONS["playEnd"] = "playEnd";
        DC_GUI_BUTTONS["play"] = "play";
        DC_GUI_BUTTONS["playNext"] = "playNext";
        DC_GUI_BUTTONS["playPrev"] = "playPrev";
        DC_GUI_BUTTONS["screenshot"] = "screenshot";
        DC_GUI_BUTTONS["mouseIconRotate"] = "mouseIconRotate";
    })(DC_GUI_BUTTONS || (DC_GUI_BUTTONS = {}));

    exports.DCAccordion = DCAccordion;
    exports.DCButtons = DCButtons;
    exports.DCGui = DCGui;
    exports.DCGuiButtons = DCGuiButtons;
    exports.DCGuiClick = DCGuiClick;
    exports.DCGuiOptions = DCGuiOptions;
    exports.DCGuiOptionsProcesses = DCGuiOptionsProcesses;
    exports.DCGuiOptionsSteps = DCGuiOptionsSteps;
    exports.DCHtmlElement = DCHtmlElement;
    exports.DCHtmlElementSettings = DCHtmlElementSettings;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
