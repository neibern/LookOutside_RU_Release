//=============================================================================
// RPG Maker MZ - CT_Bolt's CTB_DisableTouchInputMZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 CT_Bolt's Disable Touch/Mouse Input[RMMZ]
 * @author CT_Bolt
 *
 * @param Default Touch Input Setting
 * @text Default Touch Input Setting
 * @desc Default Touch Input Setting (false = disabled)
 * @type boolean
 * @default true
 *
 * @command Change Touch Input
 * @text Change Touch Input
 * @desc Enable/Disable Touch Input
 *
 * @arg enabled
 * @text Enabled
 * @desc Is touch input enabled
 * @type boolean
 * @default true
 *
 *
 * @help CTB_DisableTouchInputMZ.js
 *
 * ***************** Description **********************
 * Use script call or plugin command to enable/disable touch input
 *
 * Script call:
 *   CTB.DisableTouchInputMZ.enabled = true
 *
 * ****************************************************
 *
 * History Log:
 *   v1.00 Initial Release (04/13/2022)
 *
 */
//=============================================================================
//=============================================================================
 
var CTB = CTB || {}; CTB.DisableTouchInputMZ  = CTB.DisableTouchInputMZ || {};
var Imported = Imported || {}; Imported["CTB_DisableTouchInputMZ"] = 1.00;

"use strict";
(($_$) => {
    const NAMESPACE   = 'DisableTouchInputMZ';
    const PLUGIN_NAME = 'CTB_' + NAMESPACE;
	
	function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.param = getPluginParameters();
	CTB.DisableTouchInputMZ.enabled = eval($_$.param['Default Touch Input Setting'])
	
	//*****************************************************************************
	// PluginManager
	//*****************************************************************************
		
	$_$.com = {
		['Change Touch Input']: function(args) {
			CTB.DisableTouchInputMZ.enabled = eval(args.enabled);
		}
	};
	PluginManager.registerCommand(PLUGIN_NAME, 'Change Touch Input', $_$.com['Change Touch Input']);

	// [Alias] TouchInput: update
	$_$['TouchInput.update'] = TouchInput.update;
	TouchInput.update = function() {
		if (CTB.DisableTouchInputMZ.enabled) {$_$['TouchInput.update'].apply(this, arguments);};
	};
	
})(CTB.DisableTouchInputMZ, this);

