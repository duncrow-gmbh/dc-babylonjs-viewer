<?php
if (TL_MODE == 'BE')
{
//    $GLOBALS['TL_JAVASCRIPT']['jquery'] = './assets/jquery/js/jquery.min.js|static';
//    $GLOBALS['TL_JAVASCRIPT']['noconflict'] = './bundles/contaobabylonjsviewer/js/jquery-noconflict.min.js';
    $GLOBALS['TL_CSS'][] = './bundles/contaobabylonjsviewer/css/backend-style.css';
    $GLOBALS['TL_JAVASCRIPT'][] = './bundles/contaobabylonjsviewer/js/dc-bsj-settings.js';
}
