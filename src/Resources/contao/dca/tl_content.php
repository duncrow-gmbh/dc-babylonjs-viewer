<?php
use Contao\CoreBundle\DataContainer\PaletteManipulator;
// contao/dca/tl_content.php

//$GLOBALS['TL_DCA']['tl_content']['config']['onload_callback'][] = array('CallbackLoading', 'loadFile');

$GLOBALS['TL_DCA']['tl_content']['palettes']['babylonjs_viewer_content_element'] = '
{dc_babylonjs_type_legend},headline,type;
';
//{text_legend),text,url,singleSRC, markdownSource, multiSRC;

$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings'] = array
(
    'exclude' => true,
    'inputType' => 'text',
    'eval' => array('mandatory'=>false, 'tl_class'=>'hidden'),
    'sql' => "text NULL"
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_files'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>true, 'fieldType'=>'checkbox', 'isSortable' => true, 'files'=>true, 'extensions' => 'glb,gltf,stl,obj, jpg,png,mtl'),
    'sql'                     => "blob NULL",
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_material_files'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>false, 'isSortable' => true, 'files'=>true, 'extensions' => 'glb'),
    'sql'                     => "blob NULL",
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_gui_file'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>false, 'isSortable' => true, 'files'=>true, 'extensions' => 'json'),
    'sql'                     => "blob NULL",
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_markers_file'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>false, 'isSortable' => true, 'files'=>true, 'extensions' => 'json'),
    'sql'                     => "blob NULL",
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_accoridion_file'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>false, 'isSortable' => true, 'files'=>true, 'extensions' => 'json'),
    'sql'                     => "blob NULL",
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_camera'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>false, 'isSortable' => true, 'files'=>true, 'extensions' => 'json'),
    'sql'                     => "blob NULL",
);
$GLOBALS['TL_DCA']['tl_content']['fields']['dc_viewer_settings_environment'] = array
(
    'exclude'                 => true,
    'inputType'               => 'fileTree',
    'eval'                    => array('multiple'=>false, 'isSortable' => true, 'files'=>true, 'extensions' => 'json'),
    'sql'                     => "blob NULL",
);

PaletteManipulator::create()
    ->addLegend('dc_babylonjs_viewer_legend', 'type_legend', PaletteManipulator::POSITION_AFTER)
    ->addField('dc_viewer_settings', 'dc_babylonjs_viewer_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('dc_viewer_settings_files', 'dc_babylonjs_viewer_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('dc_viewer_settings_material_files', 'dc_babylonjs_viewer_legend', PaletteManipulator::POSITION_APPEND)
    ->addLegend('dc_babylonjs_viewer_legend2', 'type_legend', PaletteManipulator::POSITION_AFTER)
    ->addField('dc_viewer_settings_gui_file', 'dc_babylonjs_viewer_legend2', PaletteManipulator::POSITION_APPEND)
    ->addField('dc_viewer_settings_accoridion_file', 'dc_babylonjs_viewer_legend2', PaletteManipulator::POSITION_APPEND)
    ->addField('dc_viewer_settings_markers_file', 'dc_babylonjs_viewer_legend2', PaletteManipulator::POSITION_APPEND)
    ->addField('dc_viewer_settings_camera', 'dc_babylonjs_viewer_legend2', PaletteManipulator::POSITION_APPEND)
    ->addField('dc_viewer_settings_environment', 'dc_babylonjs_viewer_legend2', PaletteManipulator::POSITION_APPEND)
    ->applyToPalette('babylonjs_viewer_content_element', 'tl_content');

// $GLOBALS['TL_DCA']['tl_content']['palettes']['__selector__'][] = 'dc_viewer_settings,dc_viewer_settings_files,dc_viewer_settings_material_files,dc_viewer_settings_gui_file,dc_viewer_settings_accoridion_file,dc_viewer_settings_markers_file,dc_viewer_settings_camera,dc_viewer_settings_environment';

//$this->Database
//if (TL_MODE == 'BE' && isset($GLOBALS['TL_DCA']['tl_content']['palettes']['babylonjs_viewer_content_element']))
//{
//    $GLOBALS['TL_JAVASCRIPT'][] = './bundles/contaobabylonjsviewer/js/dc-bsj-settings.js';
//}


