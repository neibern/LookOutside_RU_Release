/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/core/
 * @target MZ
 * @plugindesc Core CGMZ Plugin, should be placed above all other CGMZ Plugins.
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.24.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Description: This is the core CGMZ plugin which is used extensively
 * by other CGMZ plugins and is likely to be required.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ----------------------Checking for Updates----------------------------------
 * This plugin can automatically check if any CGMZ plugin you have is out of
 * date. To see out of date plugins, open the console while playtesting by
 * pressing F8.
 *
 * To enable this, turn Check for Updates parameter to true. The game will
 * *NOT* check for updates in deployed games, even if this parameter is true.
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Initialize
 * Re-initializes the CGMZ Core. Only use this if you know what you are doing!
 * Erases CGMZ data.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Core.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds some default parameters for [CGMZ] windows
 * that can scroll. Most [CGMZ] plugins also allow you to customize these
 * parameters individually, but this can be tedious if you want to adjust
 * the scrolling in multiple plugin windows. These new Core parameters will be
 * used as a default in case these parameters are not set in other plugins,
 * allowing a consistent scrolling experience across all windows in your game.
 *
 * Version 1.24.0
 * - Added defaults for scrolling windows
 *
 * @command Initialize
 * @desc Re-initializes some CGMZ Classes. Only call this if you know what you
 * are doing. Will reset all CGMZ Data as if you started a new game.
 *
 * @param Check for Updates
 * @type boolean
 * @desc Check for updates to CGMZ plugins on game start?
 * @default true
 *
 * @param Dev Tools on Start
 * @type boolean
 * @desc Open the dev tool console on game start?
 * @default false
 *
 * @param Show FPS Counter
 * @type boolean
 * @desc Show fps counter on game start?
 * @default false
 *
 * @param Fullscreen
 * @type boolean
 * @desc Go fullscreen on game start?
 * @default false
 *
 * @param Simulate Production Env
 * @type boolean
 * @desc If set to true, this will cause the game to think you are NOT playtesting even when launched in editor
 * @default false
 *
 * @param Force Locale
 * @desc Forces the game to use this locale type (if blank, will use the user's local locale type)
 *
 * @param Fallback Locale
 * @desc The locale type to fall back to for use in locale strings.
 * @default en-US
 *
 * @param CGMZ Defaults
 *
 * @param Scroll Speed
 * @parent CGMZ Defaults
 * @type number
 * @min 0
 * @desc Speed at which [CGMZ] windows scroll (if needed)
 * @default 1
 *
 * @param Scroll Wait
 * @parent CGMZ Defaults
 * @type number
 * @min 0
 * @desc Amount of time (in frames) to wait before beginning to scroll [CGMZ] windows
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent CGMZ Defaults
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch for [CGMZ] windows
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent CGMZ Defaults
 * @type boolean
 * @desc Determine if [CGMZ] windows should automatically scroll after so long of no user input
 * @default true
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/core/
 * @target MZ
 * @plugindesc Core CGMZ Plugin, debe colocarse por encima de todos los demás complementos CGMZ
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.24.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Descripción: Este es el plugin principal de CGMZ que otros plugin de CGMZ 
 * utilizan ampliamente y es probable que sea necesario.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Este plugin puede verificar automáticamente si algún complemento CGMZ que 
 * tienes está desactualizado. Para ver complementos desactualizados, abre la 
 * consola mientras prueba presionando F8. El juego no buscará actualizaciones 
 * en los juegos implementados.
 * -----------------------Comandos de Plugin-----------------------------------
 * Se admiten los siguientes comandos de complemento:
 * • Initialize
 * Reinicializa el CGMZ Core. Solo usa esto si sabes lo que ¡Tú lo estás
 * haciendo! Borra los datos de CGMZ.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Core.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds some default parameters for [CGMZ] windows
 * that can scroll. Most [CGMZ] plugins also allow you to customize these
 * parameters individually, but this can be tedious if you want to adjust
 * the scrolling in multiple plugin windows. These new Core parameters will be
 * used as a default in case these parameters are not set in other plugins,
 * allowing a consistent scrolling experience across all windows in your game.
 *
 * Version 1.24.0
 * - Added defaults for scrolling windows
 *
 * @command Initialize
 * @text Inicializar 
 * @desc Reinicializa algunas clases de CGMZ. Solo llama a esto si sabes lo que
 * estás haciendo. Restablecerá todos los datos de CGMZ como si comenzara un nuevo juego.
 *
 * @param Check for Updates
 * @text Buscar actualizaciones
 * @type boolean
 * @desc ¿Busca actualizaciones de los complementos de CGMZ al iniciar el juego?
 * @default true
 *
 * @param Dev Tools on Start
 * @text Herramientas de desarrollo al inicio
 * @type boolean
 * @desc ¿Abrir la consola de herramientas de desarrollo al iniciar el juego?
 * @default false
 *
 * @param Show FPS Counter
 * @text Mostrar contador de FPS
 * @type boolean
 * @desc ¿Mostrar contador de fps al inicio del juego?
 * @default false
 *
 * @param Fullscreen
 * @text Pantalla completa
 * @type boolean
 * @desc ¿Ir a pantalla completa al inicio del juego?
 * @default false
 *
 * @param Simulate Production Env
 * @text Simular entorno de producción
 * @type boolean
 * @desc Si se establece en verdadero, esto hará que el juego piense que NO estás probando incluso cuando se inicia en el editor.
 * @default false
 *
 * @param Force Locale
 * @desc Forces the game to use this locale type (if blank, will use the user's local locale type)
 *
 * @param Fallback Locale
 * @desc The locale type to fall back to for use in locale strings.
 * @default es
 *
 * @param CGMZ Defaults
 *
 * @param Scroll Speed
 * @parent CGMZ Defaults
 * @type number
 * @min 0
 * @desc Speed at which [CGMZ] windows scroll (if needed)
 * @default 1
 *
 * @param Scroll Wait
 * @parent CGMZ Defaults
 * @type number
 * @min 0
 * @desc Amount of time (in frames) to wait before beginning to scroll [CGMZ] windows
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent CGMZ Defaults
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch for [CGMZ] windows
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent CGMZ Defaults
 * @type boolean
 * @desc Determine if [CGMZ] windows should automatically scroll after so long of no user input
 * @default true
*/
var Imported = Imported || {};
Imported.CGMZ_Core = true;
var CGMZ = {};
CGMZ.Versions = {};
CGMZ.Versions["CGMZ Core"] = "1.24.0";
CGMZ.Core = {};
CGMZ.Core.parameters = PluginManager.parameters('CGMZ_Core');
CGMZ.Core.CheckForUpdates = (CGMZ.Core.parameters["Check for Updates"] === "true");
CGMZ.Core.ShowDevTools = (CGMZ.Core.parameters["Dev Tools on Start"] === "true");
CGMZ.Core.StartFullscreen = (CGMZ.Core.parameters["Fullscreen"] === "true");
CGMZ.Core.ShowFPSCounter = (CGMZ.Core.parameters["Show FPS Counter"] === "true");
CGMZ.Core.SimulateProductionEnv = (CGMZ.Core.parameters["Simulate Production Env"] === "true");
CGMZ.Core.AutoScroll = (CGMZ.Core.parameters["Auto Scroll"] === "true");
CGMZ.Core.ScrollSpeed = Number(CGMZ.Core.parameters["Scroll Speed"]);
CGMZ.Core.ScrollWait = Number(CGMZ.Core.parameters["Scroll Wait"]);
CGMZ.Core.ScrollDeceleration = parseFloat(CGMZ.Core.parameters["Scroll Deceleration"]);
CGMZ.Core.ForceLanguage = CGMZ.Core.parameters["Force Locale"];
CGMZ.Core.FallbackLanguage = CGMZ.Core.parameters["Fallback Locale"];
//=============================================================================
// CGMZ_Utils
//-----------------------------------------------------------------------------
// Utility functions used by the plugin
//=============================================================================
function CGMZ_Utils() {
	throw new Error("This is a static class");
}
//-----------------------------------------------------------------------------
// Calculate the average party level
//-----------------------------------------------------------------------------
CGMZ_Utils.calcAvgPartyLevel = function() {
	let avgLevel = 0;
	let totalActors = 0;
	for(const actor of $gameParty.members()) {
		avgLevel += actor._level;
		totalActors++;
	}
	return Math.max(0, Math.round(avgLevel / totalActors));
};
//-----------------------------------------------------------------------------
// Calculate the average battler level
//-----------------------------------------------------------------------------
CGMZ_Utils.calcAvgBattlerLevel = function() {
	let avgLevel = 0;
	let totalActors = 0;
	for(const actor of $gameParty.battleMembers()) {
		avgLevel += actor._level;
		totalActors++;
	}
	return Math.max(0, Math.round(avgLevel / totalActors));
};
//-----------------------------------------------------------------------------
// Takes a filepath of folder+filename and returns object with separate folder+filename
//-----------------------------------------------------------------------------
CGMZ_Utils.getImageData = function(fullPath, root) {
	const splitPath = fullPath.split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	return {folder: root + "/" + path + "/", filename: file};
};
//-----------------------------------------------------------------------------
// Takes a filepath of folder+filename and returns object with separate folder+filename
//-----------------------------------------------------------------------------
CGMZ_Utils.reportDimensions = function(width, height, groupName) {
	console.group(groupName);
	console.info(`Width: ${width}`);
	console.info(`Height: ${height}`);
	console.groupEnd(groupName);
};
//-----------------------------------------------------------------------------
// Take a JSON string and optional object to return when null. It also takes
// the plugin name that is trying to parse the JSON and an error message.
// If error, reports to console and returns the returnObjWhenError.
// If no error, returns the parsed JSON object.
//-----------------------------------------------------------------------------
CGMZ_Utils.parseJSON = function(jsonString, returnObjWhenError = null, errorPlugin = "[CGMZ] Core", suggestion = "Check JSON parameters.") {
	try {
		const obj = JSON.parse(jsonString);
		return obj;
	} catch(e) {
		this.reportError("Error parsing JSON: " + e, errorPlugin, suggestion);
	}
	return returnObjWhenError;
};
//-----------------------------------------------------------------------------
// Takes a JSON parameter with "Name", "Volume", "Pitch" and "Pan" and returns
// a sound effect object
//-----------------------------------------------------------------------------
CGMZ_Utils.parseSoundEffectJSON = function(seJSON, callingPlugin = "[CGMZ] Core") {
	const defaultSE = {Name:"",Volume:90,Pitch:100,Pan:0};
	const parsedSE = this.parseJSON(seJSON, defaultSE, callingPlugin, "You had a Sound Effect parameter with invalid JSON. It could not be read.");
	const se = {};
	se.name = parsedSE.Name;
	se.volume = Number(parsedSE.Volume);
	se.pitch = Number(parsedSE.Pitch);
	se.pan = Number(parsedSE.Pan);
	return se;
};
//-----------------------------------------------------------------------------
// Takes a JSON parameter with "Red", "Green", and "Blue" and returns
// a tone object
//
// In CGMZ plugins, tones with a -256 value for Red are ignored
//-----------------------------------------------------------------------------
CGMZ_Utils.parseToneJSON = function(toneJSON, callingPlugin = "[CGMZ] Core") {
	const defaultTone = {Red:-256,Green:0,Blue:0};
	const parseTone = this.parseJSON(toneJSON, defaultTone, callingPlugin, "You had a Tone parameter with invalid JSON. It could not be read.");
	const tone = {};
	tone.Red = Number(parseTone.Red);
	tone.Blue = Number(parseTone.Blue);
	tone.Green = Number(parseTone.Green);
	return tone;
};
//-----------------------------------------------------------------------------
// Takes a JSON parameter with "Duration" "Weak Magnitude" "Strong Magnitude" "Start Delay"
//
// In CGMZ plugins, Duration of 0 is ignored
//-----------------------------------------------------------------------------
CGMZ_Utils.parseRumbleJSON = function(rumbleJSON, callingPlugin = "[CGMZ] Core") {
	const defaultRumble = {startDelay:0,duration:0,weakMagnitude:0.0,strongMagnitude:0.0};
	const parseRumble = this.parseJSON(rumbleJSON, defaultRumble, callingPlugin, "You had a Rumble parameter with invalid JSON. It could not be read.");
	const rumble = {};
	rumble.startDelay = Number(parseRumble["Start Delay"]) || 0;
	rumble.duration = Number(parseRumble.Duration) || 0;
	rumble.weakMagnitude = parseFloat(parseRumble["Weak Magnitude"]) || 0.0;
	rumble.strongMagnitude = parseFloat(parseRumble["Strong Magnitude"]) || 0.0;
	return rumble;
};
//-----------------------------------------------------------------------------
// Parses a toast object from json
//-----------------------------------------------------------------------------
CGMZ_Utils.parseToast = function(json, callingPlugin = "[CGMZ] Core") {
	if(!json) return null;
	const ignored = ["Display","Sound Effect","Tone","Background Style","Windowskin","Width","Height"];
	const parsed = this.parseJSON(json, null, callingPlugin, "A toast parameter had invalid json and could not be read.");
	const toast = this.setupToast(parsed, callingPlugin);
	if(!toast) return null;
	for(const param of Object.keys(parsed)) {
		if(!ignored.includes(param)) toast[param] = parsed[param];
	}
	return toast;
};
//-----------------------------------------------------------------------------
// Takes a Parsed Toast parameter with possible toast common params and returns
// a toast object with common options set up as toast manager expects them
// Possible properties include:
// Display - Text - Either true or false, if false will not parse the toast and return null
// Sound Effect - See CGMZ_Utils.parseSoundEffectJSON
// Tone - See CGMZ_Utils.parseToneJSON
// Background Style - Text - Either Transparent, Dim, or Window
// Windowskin - Text - Path to windowskin image file
// Width - Number - The width in pixels of the toast
// Height - Number - The number of text lines that can fit in the window
// Any extra parameters will not be touched.
//-----------------------------------------------------------------------------
CGMZ_Utils.setupToast = function(parseToast, callingPlugin = "[CGMZ] Core") {
	if(!parseToast) return null;
	if(parseToast.Display === "false") return null; // If the toast object is not going to be used anyways, no need to continue parsing object
	const toast = {};
	if(parseToast.hasOwnProperty("Sound Effect")) toast.SE = this.parseSoundEffectJSON(parseToast["Sound Effect"], callingPlugin);
	if(parseToast.hasOwnProperty("Tone") && parseToast.Tone && !parseToast.Tone.includes("-256")) {
		toast.windowskinTone = parseToast.Tone;
	}
	if(parseToast.hasOwnProperty("Background Style")) toast.backgroundStyle = parseToast["Background Style"];
	if(parseToast.hasOwnProperty("Windowskin") && parseToast.Windowskin) toast.windowskin = this.getImageData(parseToast["Windowskin"], "img");
	if(parseToast.hasOwnProperty("Width") && parseToast.Width !== "0") toast.width = Number(parseToast["Width"]);
	if(parseToast.hasOwnProperty("Height") && parseToast.Height !== "0") toast.height = Number(parseToast["Height"]);
	return toast;
};
//-----------------------------------------------------------------------------
// Opens a URL in browser depending on environment
//-----------------------------------------------------------------------------
CGMZ_Utils.openURL = function(url) {
	(Utils.isNwjs()) ? require('nw.gui').Shell.openExternal(url) : window.open(url);
};
//-----------------------------------------------------------------------------
// Read a meta parameter, or return a default if none exists
//-----------------------------------------------------------------------------
CGMZ_Utils.readMeta = function(obj, param, notFoundReturnVal = undefined) {
	const meta = obj?.meta?.[param];
	return (meta) ? meta : notFoundReturnVal;
};
//-----------------------------------------------------------------------------
// Basic search of event page for a comment tag, only reads the first line of a comment
// If unique, it will return the find or null if nothing found.
// If not unique, it will return an array of all finds (or empty array if none).
//-----------------------------------------------------------------------------
CGMZ_Utils.readCommentBasic = function(commandList, searchVal, unique) {
	const finds = [];
	for(const command of commandList) {
		if(command.code === 108 && command.parameters[0].trim().includes(searchVal)) {
			finds.push(command.parameters[0].split(searchVal)[1]);
			if(unique) break;
		}
	}
	if(unique) return (finds.length > 0) ? finds[0] : null;
	return finds;
};
//-----------------------------------------------------------------------------
// Check if can get the user's language
//-----------------------------------------------------------------------------
CGMZ_Utils.canUseUserLanguage = function() {
	return !!(navigator && navigator.language);
};
//-----------------------------------------------------------------------------
// Get the user's language, default to "en-US" if no language detected
//-----------------------------------------------------------------------------
CGMZ_Utils.userLocale = function() {
	return (CGMZ.Core.ForceLanguage) ? CGMZ.Core.ForceLanguage : this.canUseUserLanguage() ? navigator.language : CGMZ.Core.FallbackLanguage;
};
//-----------------------------------------------------------------------------
// Creates a locale date string from a given date and in expected format
//-----------------------------------------------------------------------------
CGMZ_Utils.createDateText = function(format = 0, date = new Date(Date.now())) {
	const locale = this.userLocale();
	const options = this.makeDateOptions(format);
	return date.toLocaleString(locale, options);
};
//-----------------------------------------------------------------------------
// Make the options for the date string
//-----------------------------------------------------------------------------
CGMZ_Utils.makeDateOptions = function(format) {
	const options = {};
	switch(format) {
		case 0:
		case 1:
		case 2:
			options.day = "numeric";
			options.month = "numeric";
			options.year = "numeric";
			break;
		case 3:
		case 4:
			options.day = "numeric";
			options.month = "long";
			options.year = "numeric";
			break;
		case 5:
		case 6:
			options.day = "numeric";
			options.month = "short";
			options.year = "numeric";
			break;
		case 7:
		case 8:
			options.day = "numeric";
			options.month = "numeric";
			break;
		default:
			options.day = "numeric";
			options.month = "numeric";
			options.year = "numeric";
	}
	return options;
};
//-----------------------------------------------------------------------------
// Apply variance to a number
//-----------------------------------------------------------------------------
CGMZ_Utils.applyVariance = function(originalNum, varianceAmt) {
	if(varianceAmt < 2) return originalNum; // randomInt is exclusive so with 0 or 1 it would always return 0 anyways
	const sign = Math.random() < 0.5 ? -1 : 1;
	return originalNum + (Math.randomInt(varianceAmt) * sign);
};
//-----------------------------------------------------------------------------
// Apply variance to a number (addition only)
//-----------------------------------------------------------------------------
CGMZ_Utils.applyAddVariance = function(originalNum, varianceAmt) {
	if(varianceAmt < 2) return originalNum; // randomInt is exclusive so with 0 or 1 it would always return 0 anyways
	return originalNum + Math.randomInt(varianceAmt);
};
//-----------------------------------------------------------------------------
// Return a random integer within the given range
//-----------------------------------------------------------------------------
CGMZ_Utils.randomNumberInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//-----------------------------------------------------------------------------
// Returns a weighted result. Options should be an array of objects in the form:
// {result: object, weight: number}
// It will sum the weights together and return a result from within the weights
//
// It can optionally provide a separate return if the array is empty or there
// were no weights provided.
//-----------------------------------------------------------------------------
CGMZ_Utils.pickWeightedResult = function(options, exceptionReturn = null) {
    let totalWeight = 0;
	for(const ow of options) {
		totalWeight += ow.weight;
	}
	if(totalWeight === 0) return exceptionReturn;
	let resultWeight = Math.randomInt(totalWeight + 1);
	for(const opt of options) {
		resultWeight -= opt.weight;
		if(resultWeight <= 0) return opt.result;
	}
	this.reportError("Could not find weighted result from CGMZ_Utils.pickWeightedResult", "[CGMZ] Core", "This warning indicates a bug somewhere - please report this warning to the developer.");
	return options[options.length - 1].result;
};
//-----------------------------------------------------------------------------
// Takes a number and returns it's toLocaleString value
//-----------------------------------------------------------------------------
CGMZ_Utils.numberSplit = function(num) {
	const locale = this.userLocale();
	return num.toLocaleString(locale);
};
//-----------------------------------------------------------------------------
// Takes an amount of frames and gives back the time in hours:minutes:seconds
//-----------------------------------------------------------------------------
CGMZ_Utils.timeSplit = function(frameCount) {
	const temp = frameCount/60;
	const seconds = Math.floor(temp%60);
	const minutes = Math.floor(temp/60) % 60;
	const hours = Math.floor(temp/60/60) % 60;
	return hours.padZero(2) + ':' + minutes.padZero(2) + ':' + seconds.padZero(2);
};
//-----------------------------------------------------------------------------
// Look up data item given type and id
//-----------------------------------------------------------------------------
CGMZ_Utils.lookupItem = function(type, id) {
	switch(type) {
		case 'item': return $dataItems[id];
		case 'weapon': return $dataWeapons[id];
		case 'armor': return $dataArmors[id];
		case 'skill': return $dataSkills[id];
		case 'state': return $dataStates[id];
		case 'actor': return $dataActors[id];
		case 'class': return $dataClasses[id];
		case 'enemy': return $dataEnemies[id];
		case 'troop': return $dataTroops[id];
		case 'event': return $dataCommonEvents[id];
		case 'animation': return $dataAnimations[id];
		case 'tileset': return $dataTilesets[id];
		case 'mapInfo': return $dataMapInfos[id];
	}
	this.reportError("Item type setup incorrectly", "[CGMZ] Core", "Check item parameters set up through [CGMZ] plugins");
	return null;
};
//-----------------------------------------------------------------------------
// Compare 2 numbers
//-----------------------------------------------------------------------------
CGMZ_Utils.numberValueCompare = function(value1, value2, comparator) {
	switch(comparator) {
		case '=': return value1 === value2;
		case '!=': return value1 !== value2;
		case '>': return value1 > value2;
		case '>=': return value1 >= value2;
		case '<': return value1 < value2;
		case '<=': return value1 <= value2;
	}
	this.reportError(`Unknown comparator: ${comparator}`, "[CGMZ] Core", "Check number comparisons set up through [CGMZ] plugins");
	return false;
};
//-----------------------------------------------------------------------------
// Perform an operation on two numbers and return the result
//-----------------------------------------------------------------------------
CGMZ_Utils.performNumberOperation = function(value1, value2, operator) {
	try {
		switch(operator) {
			case '+': return value1 + value2;
			case '-': return value1 - value2;
			case '/': return value1 / value2;
			case '*': return value1 * value2;
			case '%': return value1 % value2;
			case '=': return value2;
		}
	} catch(e) {
		this.reportError(`Math error in statement: ${value1} ${operator} ${$value2}`, "[CGMZ] Core", "Check number operations set up through CGMZ plugins");
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Check if some object has any truthy property values
// If an object's values are all empty strings, 0s, or 0-length arrays it will
// return false, else it will return true.
//-----------------------------------------------------------------------------
CGMZ_Utils.isObjectPopulated = function(obj) {
	return Object.values(obj).some((val) => {
		if(Array.isArray(val)) return val.length > 0;
		return !!val;
	});
};
//-----------------------------------------------------------------------------
// Report an error to the console
//-----------------------------------------------------------------------------
CGMZ_Utils.reportError = function(error, origin, suggestion = "Update Plugins") {
	console.warn("Error in plugin: " + origin + "\nError description: " + error + "\nPossible solution: " + suggestion);
};
//-----------------------------------------------------------------------------
// Save file to filesystem
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.saveToLocalFile = function(folder, filename, ext, data, encoding = 'base64') {
	const dirPath = this.fileDirectoryPath(folder);
	const filePath = this.filePath(folder, filename, ext);
	const backupFilePath = filePath + "_";
	return new Promise((resolve, reject) => {
		this.fsMkdir(dirPath);
		this.fsUnlink(backupFilePath);
		this.fsRename(filePath, backupFilePath);
		try {
			this.fsWriteFile(filePath, data, encoding);
			this.fsUnlink(backupFilePath);
			resolve();
		} catch (e) {
			try {
				this.fsUnlink(filePath);
				this.fsRename(backupFilePath, filePath);
			} catch (e2) {
				//
			}
			reject(e);
		}
	});
};
//-----------------------------------------------------------------------------
// Get directory path
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fileDirectoryPath = function(folder) {
	const path = require("path");
	const base = path.dirname(process.mainModule.filename);
	return path.join(base, folder);
};
//-----------------------------------------------------------------------------
// Get file path
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.filePath = function(folder, filename, ext) {
	const dir = this.fileDirectoryPath(folder);
	return dir + filename + ext;
};
//-----------------------------------------------------------------------------
// Make directory (if no exists)
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsMkdir = function(path) {
	const fs = require("fs");
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
};
//-----------------------------------------------------------------------------
// Rename file if exists
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsRename = function(oldPath, newPath) {
	const fs = require("fs");
	if (fs.existsSync(oldPath)) {
		fs.renameSync(oldPath, newPath);
	}
};
//-----------------------------------------------------------------------------
// Unlink file
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsUnlink = function(path) {
	const fs = require("fs");
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};
//-----------------------------------------------------------------------------
// Write file
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsWriteFile = function(path, data, encoding) {
	const fs = require("fs");
	fs.writeFileSync(path, data, encoding);
};
//-----------------------------------------------------------------------------
// Get the bitmap from a sprite (with any sprite effects applied to bitmap)
//-----------------------------------------------------------------------------
CGMZ_Utils.getSpriteBitmapWithEffects = function(sprite, width, height) {
    const bitmap = new Bitmap(width, height);
    const renderTexture = PIXI.RenderTexture.create(width, height);
    if(sprite) {
        const renderer = Graphics.app.renderer;
        renderer.render(sprite, renderTexture);
        sprite.worldTransform.identity();
        const canvas = renderer.extract.canvas(renderTexture);
        bitmap.context.drawImage(canvas, 0, 0);
        canvas.width = 0;
        canvas.height = 0;
    }
    renderTexture.destroy({ destroyBase: true });
    bitmap.baseTexture.update();
    return bitmap;
};
//-----------------------------------------------------------------------------
// Linear Interpolation between 2 values
//-----------------------------------------------------------------------------
CGMZ_Utils.lerp = function(start, end, percent) {
	return (start + (end - start) * percent);
};
//-----------------------------------------------------------------------------
// Function to have an "ease in" effect for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpEaseIn = function(percent) {
	return (percent * percent);
};
//-----------------------------------------------------------------------------
// Function to flip a function for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpFlip = function(x) {
	return 1 - x;
};
//-----------------------------------------------------------------------------
// Function to have an "ease out" effect for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpEaseOut = function(percent) {
	const flippedPct = this.lerpFlip(percent);
	return this.lerpFlip(flippedPct * flippedPct);
};
//-----------------------------------------------------------------------------
// Function to have both an ease in and out effect for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpEaseInOut = function(percent) {
	return this.lerp(this.lerpEaseIn(percent), this.lerpEaseOut(percent), percent);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// This class stores data not saved for CGMZ plugins
//=============================================================================
function CGMZ_Temp() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initialize = function() {
	this._inputCurrentState = {};
	this._animationQueue = [];
	this.createPluginData();
	this.createMappedFunctions();
	this.registerPluginCommands();
	this.initEnvVariables();
	this.initCoreVariables();
	this.addWindowEventListeners();
};
//-----------------------------------------------------------------------------
// Set up environment variables
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initEnvVariables = function() {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl');
	if(gl) {
		this._maxCanvasSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
	} else {
		this._maxCanvasSize = 16384; // 2^14
	}
};
//-----------------------------------------------------------------------------
// Get the max canvas size
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getMaxCanvasSize = function() {
	return this._maxCanvasSize;
};
//-----------------------------------------------------------------------------
// Set up CGMZ core variables
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initCoreVariables = function() {
	this._idleCounter = 0;
	this._anyKeyPressed = false;
	this._lastGamePadIndex = null;
	this._lastGamePadId = null;
	this._lastInputType = null;
};
//-----------------------------------------------------------------------------
// Check the version of CGMZ plugins against most up to date from server
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkCGMZPluginVersions = function(jsonData) {
	let warned = false;
	let pluginName = "";
	jsonData.versions.forEach((version) => {
		if(CGMZ.Versions[version.name] && CGMZ.Versions[version.name].toString() !== version.version.toString()) {
			if(!warned) {
				console.warn("Warning! Out of date [CGMZ] Plugin(s) found:");
				warned = true;
			}
			pluginName = version.name;
			if(pluginName === "CGMZ Core") {
				pluginName = "Core";
			}
			const isPublic = !(version.version[0] === "A" || version.version[0] === "B");
			const urlMessage = isPublic ? "You can download an update from https://www.caspergaming.com/plugins/cgmz/" + version.url + "/" : "You can download an update from Patreon or Itch.io. Plugin Info available at: https://www.caspergaming.com/plugins/cgmz/" + version.url + "/";
			console.warn("[CGMZ] " + pluginName + " had a local version of " + CGMZ.Versions[version.name] + " but a server version of " + version.version + "\n" + urlMessage);
		}
	});
};
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createPluginData = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Update CGMZ Timers and other plugins
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.update = function() {
	this.updateTimers();
	this.updateIdleTimer();
};
//-----------------------------------------------------------------------------
// Update CGMZ Timers
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateTimers = function() {
	const timer = $cgmz.getEarliestTimer();
	if(timer && timer._frameCount < Graphics.frameCount) {
		$cgmz.executeEarliestTimer();
	}
};
//-----------------------------------------------------------------------------
// Update Idle Timer
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateIdleTimer = function() {
	if(!this._anyKeyPressed) this._idleCounter++;
};
//-----------------------------------------------------------------------------
// Reset Idle Timer to 0
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.resetIdleTimer = function() {
	this._idleCounter = 0;
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.registerPluginCommands = function() {
	PluginManager.registerCommand("CGMZ_Core", "Initialize", this.pluginCommandReinitialize);
};
//-----------------------------------------------------------------------------
// Reinitializes the plugin - Plugin Command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReinitialize = function() {
	$cgmzTemp.createPluginData();
	$cgmz.createPluginData();
};
//-----------------------------------------------------------------------------
// Report an error to the console
// Deprecated. Use CGMZ_Utils.reportError instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.reportError = function(error, origin, suggestion = "Update Plugins") {
	console.warn("Error in plugin: " + origin + "\nError description: " + error + "\nPossible solution: " + suggestion);
};
//-----------------------------------------------------------------------------
// Takes a filepath of folder+filename and returns object with separate folder+filename
// Deprecated. Use CGMZ_Utils.getImageData instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getImageData = function(imageLoc) {
	const splitPath = imageLoc.split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	return {folder: "img/" + path + "/", filename: file};
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and tries to approximate it to Hours, Minutes, or Seconds
// Does not go above days as a time unit.
// For example, 30 seconds would return [30, "seconds"]
//              45 minutes would return [45, "minutes"]
//              18 hours would return   [18, "hours"]
//              28 days would return    [28, "days"]
// If there is an error, it will return an empty array
// If forceApproximation is true, will round down to nearest even unit provided
// by approximateToUnitString
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.approximateTimeValue = function(seconds, forceApproximation, approximateToUnitString) {
	forceApproximation = forceApproximation || false;
	let value = [];
	if (forceApproximation) {
		value[0] = this.approximateTimeValueToUnit(seconds, approximateToUnitString);
		value[1] = approximateToUnitString;
	}
	else if (seconds >= 86400) { // 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60/24);
		value[1] = "Days";
	}
	else if (seconds >= 3600 && seconds < 86400) { // 3060 seconds in an hour, 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60);
		value[1] = "Hours";
	}
	else if (seconds >= 60 && seconds < 3600) { // 60 seconds in a minute, 3600 seconds in an hour
		value[0] = Math.floor(seconds/60);
		value[1] = "Minutes";
	}
	else if (seconds < 60) { // 60 seconds in a minute
		value[0] = seconds;
		value[1] = "Seconds";
	}
	return value;
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and approximates it to an amount of time units (minute, hour, day)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.approximateTimeValueToUnit = function(seconds, unitString) {
	switch(unitString) {
		case "Days": return Math.floor(seconds/60/60/24);
		case "Hours": return Math.floor(seconds/60/60);
		case "Minutes": return Math.floor(seconds/60);
		case "Seconds": return seconds;
	}
	const script = "[CGMZ] Core";
	const error = "Unrecognized unitString in approximateTimeValueToUnit()";
	CGMZ_Utils.reportError(error, script);
	return 0;
};
//-----------------------------------------------------------------------------
// Look up item given type and id
// Deprecated. Use CGMZ_Utils.lookupItem instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.lookupItem = function(type, id) {
	switch(type) {
		case 'item': return $dataItems[id];
		case 'weapon': return $dataWeapons[id];
		case 'armor': return $dataArmors[id];
	}
	CGMZ_Utils.reportError("Item type setup incorrectly", "CGMZ Core", "Check item parameters set up through CGMZ plugins");
	return null;
};
//-----------------------------------------------------------------------------
// Request a response from an API using fetch, and output response to custom
// function
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestResponse = function(url, func) {
	fetch(url).then(response => {
		if(response.status >= 200 && response.status < 300)
			return response.json();
		console.warn("Request error, received non-OK response: " + response.status);
	}).then(data => {
		func.call(this, data);
	}).catch((e) => { // JSON error
		console.warn('Error with response JSON: ', e);
	});
};
//-----------------------------------------------------------------------------
// Add listeners to window events
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.addWindowEventListeners = function() {
	const pf = { passive: false };
	document.addEventListener("mousedown", this.onAnyInput.bind(this));
	document.addEventListener("mousemove", this.onAnyInput.bind(this));
	document.addEventListener("mouseup", this.onAnyInput.bind(this));
	document.addEventListener("wheel", this.onAnyInput.bind(this), pf);
	document.addEventListener("touchstart", this.onAnyInput.bind(this), pf);
	document.addEventListener("touchmove", this.onAnyInput.bind(this), pf);
	document.addEventListener("touchend", this.onAnyInput.bind(this));
	document.addEventListener("touchcancel", this.onAnyInput.bind(this));
	document.addEventListener("keydown", this.onAnyInput.bind(this));
	document.addEventListener("keyup", this.onAnyInput.bind(this));
};
//-----------------------------------------------------------------------------
// Handler for any input detected
// event MAY be a gamepad, KeyboardEvent, MouseEvent, or TouchEvent
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onAnyInput = function(event) {
	this.resetIdleTimer();
};
//-----------------------------------------------------------------------------
// Update the last used gamepad - called when gamepad input detected
// Game pad button numbers to xbox controller buttons:
// 0 = A
// 1 = B
// 2 = X
// 3 = Y
// 4 = LB
// 5 = RB
// 6 = LT
// 7 = RT
// 8 = Back / Select
// 9 = Start
// 10 = Left Stick
// 11 = Right Stick
// 12 = DPAD Up
// 13 = DPAD Down
// 14 = DPAD Left
// 15 = DPAD Right
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateLastGamepad = function(gamepad) {
	this._lastGamePadId = gamepad.id;
	this._lastGamePadIndex = gamepad.index;
	this.onAnyInput(gamepad);
	this._lastInputType = "gamepad";
};
//-----------------------------------------------------------------------------
// Gets the last gamepad that input was detected for
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getLastGamepad = function() {
	if(navigator.getGamepads) {
        const gamepads = navigator.getGamepads();
        if(gamepads) return gamepads[this._lastGamePadIndex];
    }
	return null;
};
//-----------------------------------------------------------------------------
// Update gamepad release - called when no gamepad input detected
// This function will always be called even when there has been no gamepad
// input in a while
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateGamepadRelease = function(gamepad) {
	//
};
//-----------------------------------------------------------------------------
// Clear input
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.inputClear = function() {
	this._inputCurrentState = {};
};
//-----------------------------------------------------------------------------
// on key down
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onKeyDown = function(event) {
	let key = event.key;
	if(key) {
		this._inputCurrentState[key] = true;
		this.refreshForKeysDown();
		this._lastInputType = "keyboard";
	}
};
//-----------------------------------------------------------------------------
// on key up
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onKeyUp = function(event) {
	let key = event.key;
	if(key) {
		this._inputCurrentState[key] = false;
		this.refreshForKeysUp();
	}
};
//-----------------------------------------------------------------------------
// Refresh plugins on key down
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.refreshForKeysDown = function() {
	this._anyKeyPressed = true;
};
//-----------------------------------------------------------------------------
// Refresh plugins on key up
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.refreshForKeysUp = function() {
	this._anyKeyPressed = !Object.values(this._inputCurrentState).every(state => state !== true);
};
//-----------------------------------------------------------------------------
// is Key Pressed?
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isKeyPressed = function(key) {
	return this._inputCurrentState[key];
};
//-----------------------------------------------------------------------------
// Create mapped functions
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createMappedFunctions = function() {
	this._mappedFunctions = {}
};
//-----------------------------------------------------------------------------
// Call a mapped function
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.callMappedFunctions = function(funcName, args) {
	func = this._mappedFunctions[funcName];
	if(func) {
		func.call(this, args);
	}
};
//-----------------------------------------------------------------------------
// Request a map animation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestMapAnimation = function(imageData, x, y, frameWidth, frameHeight, animationSpeed, options = {}) {
	const request = {};
	request.bitmap = imageData;
	request.x = x;
	request.y = y;
	request.frameWidth = frameWidth;
	request.frameHeight = frameHeight;
	request.animationSpeed = animationSpeed;
	request.options = options;
	this._animationQueue.push(request);
};
//-----------------------------------------------------------------------------
// Retrieve a map animation request
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.retrieveMapAnimationRequest = function() {
	return this._animationQueue.shift();
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// This class contains some common methods for other CGMZ plugins.
//=============================================================================
function CGMZ_Core() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize CGMZ_Core
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initialize = function() {
	this._cgmzTimers = [];
	this.createPluginData();
};
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createPluginData = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Check if anything needs to be done after a saved game is loaded
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.onAfterLoad = function() {
	if(!this._cgmzTimers) this._cgmzTimers = [];
	this.deleteAfterLoad();
	this.patchAfterLoad();
	this.createAfterLoad();
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Any deletions needed after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.deleteAfterLoad = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Any patches needed after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.patchAfterLoad = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Any new data needed after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createAfterLoad = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Get earliest timer
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEarliestTimer = function() {
	if(this._cgmzTimers) return this._cgmzTimers[0];
	return null;
};
//-----------------------------------------------------------------------------
// Get all timers
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllTimers = function() {
	return this._cgmzTimers;
};
//-----------------------------------------------------------------------------
// Get timer by id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getTimerById = function(id) {
	return this._cgmzTimers.find(timer => timer._id === id);
};
//-----------------------------------------------------------------------------
// Request adding a timer, if valid will add the timer to the timer array
// sorted by each timer's frameCount
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.requestNewTimer = function(timer) {
	if(!timer) return;
	const existingTimer = this.getTimerById(timer._id);
	if(existingTimer) {
		existingTimer._frameCount = timer._frameCount;
	} else {
		this._cgmzTimers.push(timer);
	}
	this._cgmzTimers.sort((a, b) => (a._frameCount > b._frameCount) ? 1 : -1);
};
//-----------------------------------------------------------------------------
// Execute earliest timer
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.executeEarliestTimer = function() {
	timer = this._cgmzTimers.shift();
	if(timer) {
		$cgmzTemp.callMappedFunctions(timer._funcName, timer._args);
	}
};
//-----------------------------------------------------------------------------
// Execute timer by id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.executeTimerById = function(id) {
	for(let i = 0; i < this._cgmzTimers.length; i++) {
		if(this._cgmzTimers[i]._id === id) {
			const removedTimer = this._cgmzTimers.splice(i, 1)[0];
			$cgmzTemp.callMappedFunctions(removedTimer._funcName, removedTimer._args);
			break;
		}
	}
};
//=============================================================================
// CGMZ_Timer
//-----------------------------------------------------------------------------
// Handles a timer (by frame count)
//=============================================================================
function CGMZ_Timer() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Reputation
//-----------------------------------------------------------------------------
CGMZ_Timer.prototype.initialize = function(frameCount, id, funcName, args = {}) {
	this._id = id;
	this._frameCount = Graphics.frameCount + frameCount;
	this._funcName = funcName;
	this._args = args;
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add function for getting map name (unique to CGMZ plugins)
//=============================================================================
//-----------------------------------------------------------------------------
// Get CGMZ map name
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_getMapName = function() {
	let name = "Unknown";
	if($dataMap && $dataMap.meta && $dataMap.meta.cgmzname) {
		name = $dataMap.meta.cgmzname;
	}
	return name;
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Add call to CGMZ_Core after load
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if CGMZ_Core needs to do anything after load
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_GameSystem_onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
	alias_CGMZ_Core_GameSystem_onAfterLoad.call(this);
	$cgmz.onAfterLoad();
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMZ data. Also checks for out of date plugins
//=============================================================================
$cgmz = null;
$cgmzTemp = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmz variable
//-----------------------------------------------------------------------------
const CGMZ_Core_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	CGMZ_Core_createGameObjects.call(this);
	$cgmz = new CGMZ_Core();
	$cgmzTemp = new CGMZ_Temp();
};
//-----------------------------------------------------------------------------
// Save CGMZ data
//-----------------------------------------------------------------------------
const CGMZ_Core_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	const contents = CGMZ_Core_makeSaveContents.call(this);
	contents.cgmz = $cgmz;
	return contents;
};
//-----------------------------------------------------------------------------
// Load CGMZ data
//-----------------------------------------------------------------------------
const CGMZ_Core_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	CGMZ_Core_extractSaveContents.call(this, contents);
	contents.cgmz ? $cgmz = contents.cgmz : console.warn("Could not load CGMZ data!");
};
//=============================================================================
// SceneManager
//-----------------------------------------------------------------------------
// Update CGMZ_Core every frame
//=============================================================================
//-----------------------------------------------------------------------------
// Update CGMZ_Core
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
	alias_CGMZ_Core_SceneManager_updateMain.call(this);
	if($cgmzTemp) $cgmzTemp.update();
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Opens dev tools on startup if test play and plugin parameter is configured
//=============================================================================
//-----------------------------------------------------------------------------
// Also open dev tool console if user wishes
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	alias_CGMZ_Core_Scene_Boot_start.apply(this, arguments);
	if($gameTemp.isPlaytest() && CGMZ.Core.ShowDevTools) {
		SceneManager.showDevTools();
	}
	if($gameTemp.isPlaytest() && CGMZ.Core.ShowFPSCounter) {
		Graphics._switchFPSCounter();
	}
	if(CGMZ.Core.StartFullscreen) {
		Graphics._requestFullScreen();
	}
	if($gameTemp.isPlaytest() && CGMZ.Core.CheckForUpdates) {
		const url = 'https://www.caspergaming.com/api/public/cgmz/v2/versions/';
		$cgmzTemp.requestResponse(url, $cgmzTemp.checkCGMZPluginVersions);
	}
};
//=============================================================================
// CGMZ_Window_Scrollable
//-----------------------------------------------------------------------------
// Window used by CGMZ Scripts to allow for more info to be shown than would
// otherwise fit and also scroll automatically to show info.
// A mix between the default Window_Scrollable and Window_Selectable with the
// functionality of: handlers (selectable), vertical scrolling (scrollable).
//=============================================================================
function CGMZ_Window_Scrollable() {
	this.initialize(...arguments);
}
CGMZ_Window_Scrollable.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Scrollable.prototype.constructor = CGMZ_Window_Scrollable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.initialize = function(rect, heightMultiplier, scrollWait = CGMZ.Core.ScrollWait, scrollSpeed = CGMZ.Core.ScrollSpeed,
													   autoscroll = CGMZ.Core.AutoScroll, deceleration = CGMZ.Core.ScrollDeceleration) {
	Window_Base.prototype.initialize.call(this, rect);
	this._handlers = {};
	this._scroll = false;
	this._autoScroll = autoscroll;
	this._scrollTouching = false;
	this._scrollLastTouchY = 0;
	this._scrollAccelY = 0;
	this._scrollMode = 0; // 0 = down, 1 = up
	this._scrollTimer = 0;
	this._scrollWait = scrollWait;
	this._scrollSpeed = scrollSpeed;
	this._decelerationRate = deceleration;
	this._neededHeight = 0;
	this._windowHeight = rect.height;
	this._heightMultiplier = heightMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Get contents height
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.contentsHeight = function() {
	let height = this._windowHeight * this._heightMultiplier;
	if(height > $cgmzTemp.getMaxCanvasSize()) {
		height = $cgmzTemp.getMaxCanvasSize();
	}
	return height;
};
//-----------------------------------------------------------------------------
// If refresh is requested
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.requestRefresh = function() {
	this.refresh();
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processHandling = function() {
	if (this.isActive()) {
		if (this.isCancelEnabled() && (Input.isRepeated('cancel') || TouchInput.isCancelled())) {
			this.processCancel();
		}
	}
};
//-----------------------------------------------------------------------------
// Process Cancel
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processCancel = function() {
	SoundManager.playCancel();
	this.updateInputData();
	this.deactivate();
	this.callCancelHandler();
};
//-----------------------------------------------------------------------------
// Update Input Data
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateInputData = function() {
	Input.update();
	TouchInput.update();
};
//-----------------------------------------------------------------------------
// Call Cancel Handler
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.callCancelHandler = function() {
	this.callHandler('cancel');
};
//-----------------------------------------------------------------------------
// Updates for scroll (if needed)
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.processHandling();
	this.updateArrows();
	if(this._scroll) {
		this.processGamepad();
		this.processArrowKeys();
		this.processWheel();
		this.processTouch();
		this.updateScrollAccel();
		if(this._autoScroll) {
			if(this._scrollTimer > this._scrollWait) {
				this.updateScroll();
			}
			this._scrollTimer += 1;
		}
	}
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateArrows = function() {
	this.downArrowVisible = (this.origin.y + this._windowHeight < this._neededHeight && this._scroll);
	this.upArrowVisible = this.origin.y > 0;
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateScroll = function() {
	if(this.origin.y + this._windowHeight >= this._neededHeight && this._scrollMode == 0) {
		this._scrollMode = 1; // Scroll up
		this._scrollTimer = 0;
	}
	else if(this.origin.y <= 0 && this._scrollMode == 1) {
		this._scrollMode = 0; // Scroll down
		this._scrollTimer = 0;
	}
	else {
		const speed = (this._scrollMode == 1) ? -this._scrollSpeed : this._scrollSpeed;
		this.processScroll(speed);
	}
};
//-----------------------------------------------------------------------------
// Process Arrow Key Input
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processArrowKeys = function() {
	if(this.isActive()) {
		if(Input.isPressed('down')) {
			this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
		} else if(Input.isPressed('up')) {
			this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Process Gamepad right stick inputs
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processGamepad = function() {
	const gamepad = $cgmzTemp?.getLastGamepad();
	if(gamepad && gamepad.axes && gamepad.axes.length > 3) {
		const threshold = 0.5;
		const down = (gamepad.axes[3] > threshold);
		const up = (gamepad.axes[3] < -threshold);
		if(down) {
			this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
		} else if(up) {
			this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Process Wheel Input
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processWheel = function() {
	if (this.isActive()) {
		const threshold = 20;
		if (TouchInput.wheelY >= threshold) {
			this.processScroll(this._scrollSpeed*20);
			this._scrollTimer = 0;
		}
		if (TouchInput.wheelY <= -threshold) {
			this.processScroll(-this._scrollSpeed*20);
			this._scrollTimer = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Process Touch Scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processTouch = function() {
	if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
		this.onTouchScrollStart();
	}
	if (this._scrollTouching) {
		this._scrollTimer = 0;
		if (TouchInput.isReleased()) {
			this.onTouchScrollEnd();
		} else if (TouchInput.isMoved()) {
			this.onTouchScroll();
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if window has been touched inside the window frame
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isTouchedInsideFrame = function() {
	const touchPos = new Point(TouchInput.x, TouchInput.y);
	const localPos = this.worldTransform.applyInverse(touchPos);
	return this.innerRect.contains(localPos.x, localPos.y);
};
//-----------------------------------------------------------------------------
// Processing for when window is touched
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScrollStart = function() {
	this._scrollTouching = true;
	this._scrollLastTouchY = TouchInput.y;
	this.setScrollAccel(0, 0);
};
//-----------------------------------------------------------------------------
// Handling for current scroll via touch
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScroll = function() {
	const accelY = this._scrollLastTouchY - TouchInput.y;
	this.setScrollAccel(accelY);
	this._scrollLastTouchY = TouchInput.y;
};
//-----------------------------------------------------------------------------
// Processing for letting go of touch scroll
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScrollEnd = function() {
	this._scrollTouching = false;
};
//-----------------------------------------------------------------------------
// Update Scroll Acceleration
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateScrollAccel = function() {
	if(this._scrollAccelY !== 0) {
		this.processScroll(this._scrollAccelY);
		this._scrollAccelY *= this.getDecelerationRate();
		if(Math.abs(this._scrollAccelY) < 1) {
			this._scrollAccelY = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Get deceleration rate
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.getDecelerationRate = function() {
	return this._decelerationRate;
};
//-----------------------------------------------------------------------------
// Set x and y acceleration for scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setScrollAccel = function(y) {
	this._scrollAccelY = y;
};
//-----------------------------------------------------------------------------
// Process scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processScroll = function(scrollAmount) {
	if(this.origin.y + this._windowHeight + scrollAmount > this._neededHeight) {
		this.origin.y = this._neededHeight - this._windowHeight;
	}
	else if(this.origin.y + scrollAmount < 0) {
		this.origin.y = 0;
	}
	else {
		this._scrollMode = (scrollAmount < 0) ? 1 : 0;
		this.origin.y += scrollAmount;
	}
};
//-----------------------------------------------------------------------------
// Check if needs to scroll (might change after drawing contents because bitmap)
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.checkForScroll = function() {
	if(this._neededHeight > this._windowHeight) {
		this._scroll = true;
	}
};
//-----------------------------------------------------------------------------
// Reset variables for new object
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setupWindowForNewEntry = function() {
	this.origin.y = 0;
	this._scrollTimer = 0;
	this._scrollMode = 0;
	this._neededHeight = 0;
	this._scrollLastTouchY = 0;
	this._scrollAccelY = 0;
	this._scroll = false;
	this._scrollTouching = false;
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Check if window is active
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isActive = function() {
	return this.active;
};
//-----------------------------------------------------------------------------
// Set Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setHandler = function(symbol, method) {
	this._handlers[symbol] = method;
};
//-----------------------------------------------------------------------------
// check if is handled same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isHandled = function(symbol) {
	return !!this._handlers[symbol];
};
//-----------------------------------------------------------------------------
// Call Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.callHandler = function(symbol) {
	if (this.isHandled(symbol)) {
		this._handlers[symbol]();
	}
};
//-----------------------------------------------------------------------------
// Check if cancel handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isCancelEnabled = function() {
	return this.isHandled('cancel');
};
//=============================================================================
// CGMZ_Window_HorzScrollable
//-----------------------------------------------------------------------------
// Window that inherits from CGMZ_Window_Scrollable with the difference that it
// allows horizontal scrolling instead of vertical scrolling.
//=============================================================================
function CGMZ_Window_HorzScrollable() {
	this.initialize(...arguments);
}
CGMZ_Window_HorzScrollable.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_HorzScrollable.prototype.constructor = CGMZ_Window_HorzScrollable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.initialize = function(rect, widthMultiplier, scrollWait = CGMZ.Core.ScrollWait, scrollSpeed = CGMZ.Core.ScrollSpeed,
													   autoscroll = CGMZ.Core.AutoScroll, deceleration = CGMZ.Core.ScrollDeceleration) {
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, 1, scrollWait, scrollSpeed, autoscroll, deceleration);
	this._scrollLastTouchX = 0;
	this._scrollAccelX = 0;
	this._neededWidth = 0;
	this._windowWidth = rect.width;
	this._widthMultiplier = widthMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Get contents width
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.contentsWidth = function() {
	let width = this._windowWidth * this._widthMultiplier;
	if(width > $cgmzTemp.getMaxCanvasSize()) {
		width = $cgmzTemp.getMaxCanvasSize();
	}
	return width;
};
//-----------------------------------------------------------------------------
// If refresh is requested
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.requestRefresh = function() {
	this.refresh();
	this._neededWidth += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.updateArrows = function() {
	this.downArrowVisible = (this.origin.x + this._windowWidth < this._neededWidth && this._scroll);
	this.upArrowVisible = this.origin.x > 0;
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.updateScroll = function() {
	if(this.origin.x + this._windowWidth >= this._neededWidth && this._scrollMode == 0) {
		this._scrollMode = 1; // Scroll left
		this._scrollTimer = 0;
	}
	else if(this.origin.x <= 0 && this._scrollMode == 1) {
		this._scrollMode = 0; // Scroll right
		this._scrollTimer = 0;
	}
	else {
		const speed = (this._scrollMode == 1) ? -this._scrollSpeed : this._scrollSpeed;
		this.processScroll(speed);
	}
};
//-----------------------------------------------------------------------------
// Process Arrow Key Input
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.processArrowKeys = function() {
	if(this.isActive()) {
		if(Input.isPressed('right')) {
			this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
		}
		if(Input.isPressed('left')) {
			this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Process Gamepad right stick inputs
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.processGamepad = function() {
	const gamepad = $cgmzTemp?.getLastGamepad();
	if(gamepad && gamepad.axes && gamepad.axes.length > 3) {
		const threshold = 0.5;
		const left = (gamepad.axes[2] > threshold);
		const right = (gamepad.axes[2] < -threshold);
		if(left) {
			this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
		} else if(right) {
			this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Processing for when window is touched
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.onTouchScrollStart = function() {
	this._scrollTouching = true;
	this._scrollLastTouchX = TouchInput.x;
	this.setScrollAccel(0);
};
//-----------------------------------------------------------------------------
// Handling for current scroll via touch
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.onTouchScroll = function() {
	const accelX = this._scrollLastTouchX - TouchInput.x;
	this.setScrollAccel(accelX);
	this._scrollLastTouchX = TouchInput.x;
};
//-----------------------------------------------------------------------------
// Update Scroll Acceleration
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.updateScrollAccel = function() {
	if(this._scrollAccelX !== 0) {
		this.processScroll(this._scrollAccelX);
		this._scrollAccelX *= this.getDecelerationRate();
		if(Math.abs(this._scrollAccelX) < 1) {
			this._scrollAccelX = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Set x acceleration for scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.setScrollAccel = function(x) {
	this._scrollAccelX = x;
};
//-----------------------------------------------------------------------------
// Process scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.processScroll = function(scrollAmount) {
	if(this.origin.x + this._windowWidth + scrollAmount > this._neededWidth) {
		this.origin.x = this._neededWidth - this._windowWidth;
	}
	else if(this.origin.x + scrollAmount < 0) {
		this.origin.x = 0;
	}
	else {
		this._scrollMode = (scrollAmount < 0) ? 1 : 0;
		this.origin.x += scrollAmount;
	}
};
//-----------------------------------------------------------------------------
// Check if needs to scroll (might change after drawing contents because bitmap)
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.checkForScroll = function() {
	if(this._neededWidth > this._windowWidth) {
		this._scroll = true;
	}
};
//-----------------------------------------------------------------------------
// Reset variables for new object
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.setupWindowForNewEntry = function() {
	this.origin.x = 0;
	this._scrollTimer = 0;
	this._scrollMode = 0;
	this._neededWidth = 0;
	this._scrollLastTouchX = 0;
	this._scrollAccelX = 0;
	this._scroll = false;
	this._scrollTouching = false;
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Refresh "up" (left) and "down" (right) arrows
// Note: variable names not changed to reuse inherited code.
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype._refreshArrows = function() {
	const w = this._width;
	const h = this._height;
	const p = 24;
	const q = p / 2;
	const sx = 96 + p;
	const sy = 0 + p;
	this._downArrowSprite.bitmap = this._windowskin;
	this._downArrowSprite.anchor.x = 0.5;
	this._downArrowSprite.anchor.y = 0.5;
	this._downArrowSprite.setFrame(sx + p + q, sy + q, q, p);
	this._downArrowSprite.move(w - q, h / 2);
	this._upArrowSprite.bitmap = this._windowskin;
	this._upArrowSprite.anchor.x = 0.5;
	this._upArrowSprite.anchor.y = 0.5;
	this._upArrowSprite.setFrame(sx, sy + q, q, p);
	this._upArrowSprite.move(q, h / 2);
};
//=============================================================================
// CGMZ_Window_Selectable
//-----------------------------------------------------------------------------
// Window used by CGMZ Scripts to allow for categories within a selectable
// window which are expandable/minimizable. It also allows each item to
// define its own width/height, which may vary per item.
//=============================================================================
function CGMZ_Window_Selectable() {
	this.initialize(...arguments);
}
CGMZ_Window_Selectable.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_Selectable.prototype.constructor = CGMZ_Window_Selectable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._category = null;
	this._data = [];
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.item = function() {
	if(this._data && this.index() >= 0) return this._data[this.index()];
	return null;
};
//-----------------------------------------------------------------------------
// Level Adjustment for width / x offset
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.levelAdjustment = function(level) {
	return level * 8;
};
//-----------------------------------------------------------------------------
// Change width by index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemWidth = function(index) {
	if(this._data[index] && this._data[index].hasOwnProperty("width")) {
		return this._data[index].width;
	}
	if(this._data[index] && this._data[index].hasOwnProperty("level")) {
		return Window_Selectable.prototype.itemWidth.call(this) - this.levelAdjustment(this._data[index].level);
	}
	return Window_Selectable.prototype.itemWidth.call(this);
};
//-----------------------------------------------------------------------------
// Change height by index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemHeight = function(index = -1) {
	if(index >= 0 && this._data && this._data[index] && this._data[index].hasOwnProperty("height")) {
		return this._data[index].height;
	}
	if(index >= 0 && this._data && this._data[index] && this._data[index].hasOwnProperty("heightMultiplier")) {
		return Window_Base.prototype.itemHeight.call(this) * this._data[index].heightMultiplier + 8;
	}
	return Window_Selectable.prototype.itemHeight.call(this);
};
//-----------------------------------------------------------------------------
// Get item height of previous entries
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemHeightOfIndex = function(index) {
	let height = 0;
	for(i = 0; i < index; i++) {
		height += this.itemHeight(i);
	}
	return height;
};
//-----------------------------------------------------------------------------
// Get contents height
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.contentsHeight = function() {
	return this.innerHeight + this.itemHeight() * 2;
};
//-----------------------------------------------------------------------------
// Get overall height
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.overallHeight = function() {
	return this.itemHeightOfIndex(this.maxItems());
};
//-----------------------------------------------------------------------------
// Get top row
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.topRow = function() {
	if(this.scrollY() === 0) return 0;
	for(let i = 0; i < this.maxItems(); i++) {
		if(this.itemHeightOfIndex(i+1) > this.scrollY()) {
			return i;
		}
	}
	// If above fails, fall back to a rough estimate of the top row
	return this.itemHeightOfIndex(this.index()) - this.innerHeight;
};
//-----------------------------------------------------------------------------
// Get item rect
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemRect = function(index) {
	const level = (this._data && this._data[index] && this._data[index].hasOwnProperty('level')) ? this._data[index].level : 0;
	const maxCols = this.maxCols();
	const itemWidth = this.itemWidth(index);
	const itemHeight = this.itemHeight(index);
	const colSpacing = this.colSpacing();
	const rowSpacing = this.rowSpacing();
	const col = index % maxCols;
	const row = Math.floor(index / maxCols);
	const x = (col * itemWidth + colSpacing / 2 - this.scrollBaseX()) + this.levelAdjustment(level);
	const y = this.itemHeightOfIndex(index) + rowSpacing / 2 - this.scrollBaseY();
	const width = itemWidth - colSpacing;
	const height = itemHeight - rowSpacing;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Ensure Cursor is Visible
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.ensureCursorVisible = function(smooth) {
	if (this._cursorAll) {
		this.scrollTo(0, 0);
	} else if (this.innerHeight > 0 && this.row() >= 0) {
		const scrollY = this.scrollY();
		const itemTop = this.itemHeightOfIndex(this.index());
		const itemBottom = itemTop + this.itemHeight(this.index());
		const scrollMin = itemBottom - this.innerHeight;
		if (scrollY > itemTop) {
			if (smooth) {
				this.smoothScrollTo(0, itemTop);
			} else {
				this.scrollTo(0, itemTop);
			}
		} else if (scrollY < scrollMin) {
			if (smooth) {
				this.smoothScrollTo(0, scrollMin);
			} else {
				this.scrollTo(0, scrollMin);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Pass index to drawing background rect for color differentiation
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	this.drawBackgroundRect(rect, index);
};
//-----------------------------------------------------------------------------
// Look for color property on index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.drawBackgroundRect = function(rect, index) {
	const item = this.getPreviousCategoryItem(index);
	this.setNewCategory(item);
	if(!this._category) {
		Window_Selectable.prototype.drawBackgroundRect.call(this, rect);
		return;
	}
	const c1 = this._category._color1;
	const c2 = this._category._color2;
	const x = rect.x;
	const y = rect.y;
	const w = rect.width;
	const h = rect.height;
	this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
	this.contentsBack.strokeRect(x, y, w, h, c1);
};
//-----------------------------------------------------------------------------
// Get the closest category with index smaller than current index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.getPreviousCategoryItem = function(index) {
	for(let i = index; i >= 0; i--) {
		const item = this._data[i];
		if(item && item.isCategory) {
			return item;
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get the closest category with index smaller than current index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.processOk = function() {
	const item = this.item();
	if(item && item.isCategory) {
		this.handleCategorySelection(item);
		this.playOkSound();
	} else {
		Window_Selectable.prototype.processOk.call(this);
	}
};
//-----------------------------------------------------------------------------
// Set new category. Used by individual instances to set category.
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.setNewCategory = function(item) {
	this._category = item;
};
//-----------------------------------------------------------------------------
// Handling for when category is selected and OK press occurs
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.handleCategorySelection = function(item) {
	// Used by plugins to minimize / expand category
};
//-----------------------------------------------------------------------------
// Always handle OK
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.isOkEnabled = function() {
	return true;
};
//=============================================================================
// Window
//-----------------------------------------------------------------------------
// Create the CGMZ Options object
//=============================================================================
//-----------------------------------------------------------------------------
// Also create the cgmz window options object
//-----------------------------------------------------------------------------
const alias_CGMZCore_Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
	alias_CGMZCore_Window_initialize.apply(this, arguments);
	this.CGMZ_createWindowOptions();
};
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
Window.prototype.CGMZ_createWindowOptions = function() {
	this.cgmzOpts = {};
	this.cgmzOpts.animatedRegions = [];
};
//=============================================================================
// Window_Base
//-----------------------------------------------------------------------------
// Adding functions for CGMZ Windows. Drawing gauges and text processing
// Change core setting functions to check for CGMZ Options
//=============================================================================
//-----------------------------------------------------------------------------
// Look for cgmz windowskin setting
//-----------------------------------------------------------------------------
const alias_CGMZCore_WindowBase_loadWindowskin = Window_Base.prototype.loadWindowskin;
Window_Base.prototype.loadWindowskin = function() {
	if(this.cgmzOpts.windowskin) {
		const skin = CGMZ_Utils.getImageData(this.cgmzOpts.windowskin, "img");
		this.windowskin = ImageManager.loadBitmap(skin.folder, skin.filename);
	} else {
		alias_CGMZCore_WindowBase_loadWindowskin.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Look for cgmz padding setting
//-----------------------------------------------------------------------------
const alias_CGMZCore_WindowBase_updatePadding = Window_Base.prototype.updatePadding;
Window_Base.prototype.updatePadding = function() {
	if(typeof this.cgmzOpts.padding === 'number') {
		this.padding = this.cgmzOpts.padding;
	} else {
		alias_CGMZCore_WindowBase_updatePadding.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Look for cgmz back opacity setting
//-----------------------------------------------------------------------------
const alias_CGMZCore_WindowBase_updateBackOpacity = Window_Base.prototype.updateBackOpacity;
Window_Base.prototype.updateBackOpacity = function() {
	if(typeof this.cgmzOpts.backOpacity === 'number') {
		this.backOpacity = this.cgmzOpts.backOpacity;
	} else {
		alias_CGMZCore_WindowBase_updateBackOpacity.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Look for cgmz tone setting
//-----------------------------------------------------------------------------
const alias_CGMZCore_WindowBase_updateTone = Window_Base.prototype.updateTone;
Window_Base.prototype.updateTone = function() {
	if(this.cgmzOpts.tone) {
		const tone = this.cgmzOpts.tone;
		this.setTone(tone[0], tone[1], tone[2]);
	} else {
		alias_CGMZCore_WindowBase_updateTone.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Also update CGMZ window regions
//-----------------------------------------------------------------------------
const alias_CGMZCore_WindowBase_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
	alias_CGMZCore_WindowBase_update.apply(this, arguments);
	this.CGMZ_updateAnimatedRegions();
};
//-----------------------------------------------------------------------------
// Update CGMZ animated regions
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_updateAnimatedRegions = function() {
	for(const region of this.cgmzOpts.animatedRegions) {
		this.CGMZ_updateAnimatedRegion(region);
	}
};
//-----------------------------------------------------------------------------
// Update each CGMZ animated region
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_updateAnimatedRegion = function(region) {
	region.currentFrames++;
	if(region.currentFrames >= region.frames) {
		this.CGMZ_clearAnimatedRegion(region.target, region.rect);
		this.CGMZ_processAnimatedRegion(region);
		region.currentFrames = 0;
	}
};
//-----------------------------------------------------------------------------
// Clear the animated region
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_clearAnimatedRegion = function(target, rect) {
	switch(target) {
		case 'back': this.contentsBack.clearRect(rect.x, rect.y, rect.width, rect.height); break;
		case 'front': this.contents.clearRect(rect.x, rect.y, rect.width, rect.height); break;
		case 'both':
			this.contentsBack.clearRect(rect.x, rect.y, rect.width, rect.height);
			this.contents.clearRect(rect.x, rect.y, rect.width, rect.height); break;
		case 'custom':
			this.CGMZ_processCustomAnimatedRegionTarget(rect);
	}
};
//-----------------------------------------------------------------------------
// Process a custom region target
// Note: It is NOT safe to remove regions in this function
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_processCustomAnimatedRegionTarget = function(rect) {
	// Implemented by plugins
};
//-----------------------------------------------------------------------------
// Process animated region after clear contents / frame advance is handled
// Note: It is NOT safe to remove regions in this function
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_processAnimatedRegion = function(region) {
	// Implemented by plugins
};
//-----------------------------------------------------------------------------
// Add an animated region
// Each Region object should consist of (enforced):
// id - The id used to refer to the region
// rect - The x/y/width/height (Rectangle object) of the region
// target - "back" "front" "both" "custom" (if the region is contentsBack, contents, custom, or both)
// frames - The amount of frames before animation advances to next frame. Must be greater than 0
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_addAnimatedRegion = function(region) {
	if(!region.id) return;
	if(typeof region.rect !== "object" || !("x" in region.rect)) return;
	if(!region.target) return;
	if(typeof region.frames !== 'number' || region.frames < 1) return;
	region.currentFrames = region.frames;
	this.cgmzOpts.animatedRegions.push(region);
};
//-----------------------------------------------------------------------------
// Remove an animated region
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_removeAnimatedRegion = function(id) {
	const index = this.cgmzOpts.animatedRegions.findIndex((x) => x.id === id);
	if(index >= 0) {
		const region = this.cgmzOpts.animatedRegions[index];
		this.CGMZ_clearAnimatedRegion(region.target, region.rect);
		this.cgmzOpts.animatedRegions.splice(index, 1);
	}
};
//-----------------------------------------------------------------------------
// Check if an animated region exists
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_hasAnimatedRegion = function(id) {
	const index = this.cgmzOpts.animatedRegions.findIndex((x) => x.id === id);
	return (index >= 0);
};
//-----------------------------------------------------------------------------
// Use bitmap gauge - don't always need full sprite gauge
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawGauge = function(rect, rate, color1, color2, color0 = ColorManager.gaugeBackColor()) {
	const fillW = Math.floor((rect.width - 2) * rate);
	const fillH = rect.height - 2;
	this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color0);
	this.contents.gradientFillRect(rect.x + 1, rect.y + 1, fillW, fillH, color1, color2);
};
//-----------------------------------------------------------------------------
// Draw Header
// Returns height of text drawn
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawHeader = function(header, y, color1 = 1, color2 = 0, options = {drawDividers: true, padding: null}) {
	if(options.drawDividers) {
		const padding = (typeof options.padding === 'number') ? options.padding : this.padding;
		const textRect = this.CGMZ_textSizeEx(header);
		const divWidth = this.contents.width / 2 - textRect.width / 2 - padding * 2;
		const rect1 = new Rectangle(padding, y + textRect.height / 2, divWidth, 2);
		const rect2 = new Rectangle(this.contents.width / 2 + textRect.width / 2 + padding, y + textRect.height / 2, divWidth, 2);
		this.CGMZ_drawDivider(rect1, ColorManager.textColor(color1), ColorManager.textColor(color2));
		this.CGMZ_drawDivider(rect2, ColorManager.textColor(color2), ColorManager.textColor(color1));
	}
	return this.CGMZ_drawTextLine(header, 0, y, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw a divider / hr
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawDivider = function(rect, color1 = ColorManager.gaugeBackColor(), color2 = ColorManager.gaugeBackColor()) {
	this.contents.gradientFillRect(rect.x, rect.y, rect.width, rect.height, color1, color2);
};
//-----------------------------------------------------------------------------
// Draw a semi-transparent background rectangle
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawBackgroundRectangle = function(rect, color = "rgba(32, 32, 32, 0.5)") {
	this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
};
//-----------------------------------------------------------------------------
// Draw a background rectangle with a gradient
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawBackgroundGradientRectangle = function(rect, c1 = ColorManager.itemBackColor1(), c2 = ColorManager.itemBackColor2(), vertical = true) {
	const x = rect.x;
	const y = rect.y;
	const w = rect.width;
	const h = rect.height;
	this.contents.gradientFillRect(x, y, w, h, c1, c2, vertical);
	this.contents.strokeRect(x, y, w, h, c1);
};
//-----------------------------------------------------------------------------
// Draw a checkbox
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawCheckbox = function(rect, checked, lineWidth = 2, color = "rgba(255, 255, 255, 1)", color2 = "rgba(255, 255, 255, 1)") {
	this.contents.CGMZ_strokeRect(rect.x, rect.y, rect.width, rect.height, color, lineWidth);
	if(checked) {
		const point0 = new Point(rect.x + rect.width * .3, rect.y + (rect.height * .6));
		const point1 = new Point(rect.x + (rect.width / 2), rect.y + rect.height - (rect.height * .2));
		const point2 = new Point(rect.x + rect.width * .8, rect.y + rect.height * .2);
		this.contents.CGMZ_strokeLinePath([point0, point1, point2], color2, lineWidth);
	}
};
//-----------------------------------------------------------------------------
// Draw a radio input
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawRadio = function(point, radius, checked, lineWidth = 2, color = "rgba(255, 255, 255, 1)", color2 = "rgba(255, 255, 255, 1)") {
	this.contents.CGMZ_strokeCircle(point.x, point.y, radius, color, lineWidth, true);
	if(checked) {
		this.contents.drawCircle(point.x, point.y, radius - (lineWidth / 2) - (radius * .2), color2);
	}
};
//-----------------------------------------------------------------------------
// Draw a toggle switch
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawToggleSwitch = function(rect, checked, onText, offText, lineWidth = 2, color = "rgba(255, 255, 255, 1)", color2 = "rgba(255, 255, 255, 1)") {
	const radius = rect.height / 2;
	this.contents.CGMZ_strokeCurvedRectangle(rect, radius, color, lineWidth);
	if(checked) {
		this.contents.drawCircle((rect.x + rect.width) - radius, rect.y + radius, radius - (lineWidth / 2) - (radius * .2), color2);
		this.contents.drawText(onText, rect.x, rect.y + 2, rect.width - (radius * 2), rect.height - 4, 'center');
	} else {
		this.contents.drawCircle(rect.x + radius, rect.y + radius, radius - (lineWidth / 2) - (radius * .2), color2);
		this.contents.drawText(offText, rect.x + radius * 2, rect.y + 2, rect.width - (radius * 2), rect.height - 4, 'center');
	}
};
//-----------------------------------------------------------------------------
// Draw a triangle
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawTriangle = function(rect, fill, lineWidth = 2, color = "rgba(255, 255, 255, 1)") {
	const point0 = new Point(rect.x + rect.width / 2, rect.y);
	const point1 = new Point(rect.x, rect.y + rect.height);
	const point2 = new Point(rect.x + rect.width, rect.y + rect.height);
	const points = [point0, point1, point2, point0];
	if(fill) {
		this.contents.CGMZ_fillLinePath(points, color, lineWidth);
	} else {
		this.contents.CGMZ_strokeLinePath(points, color, lineWidth);
	}
};
//-----------------------------------------------------------------------------
// Draw a pentagon/hexagon/septagon/octagon. Can draw N-gon with more than 8
// sides, but bottom side will not be horizontal/flat. 5/7/8 side shapes have
// a shift to get them to align. Will need to create a more generic formula to
// draw an aligned N-gon of any side in the future
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawShape = function(rect, fill, numSides, lineWidth = 2, color = "rgba(255, 255, 255, 1)") {
	const size = rect.width / 2;
	const xCenter = rect.x + rect.width / 2;
	const yCenter = rect.y + rect.height / 2;
	const step = 2 * Math.PI / numSides;
	const shift = (numSides === 5) ? (Math.PI / 180.0) * -18 : (numSides === 7) ? (Math.PI / 180) * 12 : (numSides === 8) ? (Math.PI / 180) * 21 : 0;
	const points = [];
	for (let i = 0; i <= numSides; i++) {
		const curStep = i * step + shift;
		points.push(new Point(xCenter + size * Math.cos(curStep), yCenter + size * Math.sin(curStep)));
	}
	if(fill) {
		this.contents.CGMZ_fillLinePath(points, color, lineWidth);
	} else {
		this.contents.CGMZ_strokeLinePath(points, color, lineWidth);
	}
};
//-----------------------------------------------------------------------------
// Load a face before calling the default draw function
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_loadFace = function(faceName, faceIndex, x, y, width, height) {
	const bitmap = ImageManager.loadFace(faceName);
	bitmap.addLoadListener(this.drawFace.bind(this, faceName, faceIndex, x, y, width, height));
};
//-----------------------------------------------------------------------------
// Draw a character with specific frame in step animation
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawCharacter = function(characterName, characterIndex, x, y, frameXOffset = 0, frameYOffset = 0) {
	const bitmap = ImageManager.loadCharacter(characterName);
	const big = ImageManager.isBigCharacter(characterName);
	const pw = bitmap.width / (big ? 3 : 12);
	const ph = bitmap.height / (big ? 4 : 8);
	const n = big ? 0: characterIndex;
	const sx = (((n % 4) * 3 + 1) * pw) + (pw * frameXOffset);
	const sy = (Math.floor(n / 4) * 4 * ph) + (ph * frameYOffset);
	this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};
//-----------------------------------------------------------------------------
// Draw a sv actor with specific motion and pattern animation
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawSvActor = function(filename, x, y, motion, pattern) {
	pattern = (pattern < 3) ? pattern : 1;
	const bitmap = ImageManager.loadSvActor(filename);
	const sw = dw = bitmap.width / 9;
	const sh = dh = bitmap.height / 6;
	const sx = Math.floor(motion / 6) * 3 + pattern;
	const sy = motion % 6;
	this.contents.blt(bitmap, sx * sw, sy * sh, sw, sh, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw a string of text with text codes and word wrapping.
// It can also handle a first-line offset.
// Returns the overall output height
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawText = function(string, x, firstLineX, y, width, alignment = "left") {
	this.resetFontSettings();
	const textState = this.createTextState(string, x, y, width);
	textState.drawing = false;
	textState.x = firstLineX;
	textState.lastSpaceIndex = 0;
	let additionalWidth = 0;
	while (textState.index < textState.text.length) {
		const c = textState.text[textState.index++];
		let neededWidth = additionalWidth + this.textWidth(textState.buffer) + this.CGMZ_textSizeEx(c).width * (c !== ' ');
		if(neededWidth > width && textState.lastSpaceIndex > 0) {
			textState.text = textState.text.substring(0, textState.lastSpaceIndex) + '\n' + textState.text.substring(textState.lastSpaceIndex + 1);
			textState.x = x;
			additionalWidth = 0;
		}
		if (c.charCodeAt(0) < 0x20) {
			this.flushTextState(textState);
			this.processControlCharacter(textState, c);
			additionalWidth = textState.x - x;
		} else if(c === " ") {
			textState.buffer += c;
			this.flushTextState(textState);
			textState.lastSpaceIndex = textState.index - 1;
			additionalWidth = textState.x - x;
		} else {
			textState.buffer += c;
		}
	}
	switch(alignment) {
		case "left":
			const textState2 = this.createTextState(textState.text, x, y, width);
			textState2.x = firstLineX;
			this.processAllText(textState2);
			return textState2.outputHeight;
		case "center":
		case "right":
			let totalHeight = 0;
			let firstLine = true;
			const lines = textState.text.split("\n");
			for(line of lines) {
				const textState2 = this.createTextState(line, x, y + totalHeight, width);
				const color = this.contents.textColor;
				const fs = this.contents.fontSize;
				const textWidth = this.CGMZ_textSizeEx(line).width;
				this.contents.textColor = color;
				this.contents.fontSize = fs;
				if(alignment === "right") textState2.x = width + textState2.x - textWidth;
				if(alignment === "center") textState2.x += (width - textWidth) / 2;
				if(firstLine && (firstLineX > textState2.x)) textState2.x = firstLineX;
				firstLine = false;
				this.processAllText(textState2);
				totalHeight += textState2.outputHeight;
			}
			return totalHeight;
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Draw one line of string of text with any character codes.
// Use of \n here will cause visual issues.
// This function will adjust the horizontal size of the text to fit the width provided.
// Returns the output height of the line drawn
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawTextLine = function(string, x, y, width, alignment = "left") {
	const textWidth = this.CGMZ_textSizeEx(string).width;
	let scale = 1;
	if(textWidth > width) {
		scale = width/textWidth;
	}
	this.contents.context.save();
	this.contents.context.scale(scale, 1);
	const outputHeight = this.CGMZ_drawTextLineNoResize(string, x, y, width, alignment, scale);
	this.contents.context.restore();
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw one line of string of text with any character codes.
// While \n IS supported, it is not recommended for this function since it assumes only one line will be drawn
// It can also handle an x offset.
// Returns the output height of the line drawn
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawTextLineNoResize = function(string, x, y, width, alignment = "left", scale = 1) {
	const textState = this.createTextState(string, x, y, width);
	const textWidth = this.CGMZ_textSizeEx(string).width;
	switch(alignment) {
		case "left": 
			if(scale < 1) {
				textState.x = x * (1/scale);
				if(textState.x < 0) textState.x = 0;
			}
			break;
		case "center":
			textState.x = width + textState.x - textWidth;
			textState.x = (textState.x / 2) + (x / 2);
			break;
		case "right":
			textState.x = width + textState.x - textWidth;
	}
	if(textState.x < x) {
		textState.x = x;
		if(scale < 1) {
			textState.x = x * (1/scale);
		}
	}
	this.processAllText(textState);
	return textState.outputHeight;
};
//-----------------------------------------------------------------------------
// Get the size of the text without resetting font settings
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_textSizeEx = function(text) {
	const textState = this.createTextState(text, 0, 0, 0);
	textState.drawing = false;
	this.processAllText(textState);
	return { width: textState.outputWidth, height: textState.outputHeight };
};
//=============================================================================
// Window_Selectable
//-----------------------------------------------------------------------------
// Add cgmz option handling for custom backgrounds for selectable items
//=============================================================================
//-----------------------------------------------------------------------------
// Get selectable cgmz options for the given index
// This is separate from the static window options as it should be calculated
// for each index.
//-----------------------------------------------------------------------------
Window_Selectable.prototype.CGMZ_getSelectableCGMZOptions = function(index) {
	return null; // The plugin still needs to implement this.
};
//-----------------------------------------------------------------------------
// Check if command has cgmz background info
//-----------------------------------------------------------------------------
const alias_CGMZCore_WindowSelectable_drawItemBackground = Window_Selectable.prototype.drawItemBackground;
Window_Selectable.prototype.drawItemBackground = function(index) {
	const cgmz = this.CGMZ_getSelectableCGMZOptions(index);
	if(cgmz && cgmz.bg && cgmz.bg.img) {
		const path = cgmz.bg.img;
		const opts = {x: cgmz.bg.imgX, y: cgmz.bg.imgY};
		const rect = this.itemRect(index);
		const imgData = CGMZ_Utils.getImageData(path, "img");
		const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
		bitmap.addLoadListener(this.CGMZ_bltCommandBackground.bind(this, bitmap, rect, opts));
	} else {
		alias_CGMZCore_WindowSelectable_drawItemBackground.call(this, index);
	}
};
//-----------------------------------------------------------------------------
// Draw command background image
//-----------------------------------------------------------------------------
Window_Selectable.prototype.CGMZ_bltCommandBackground = function(bitmap, rect, opts) {
	const sw = rect.width;
    const sh = rect.height;
    const sx = opts.x;
	const sy = opts.y;
	const dw = rect.width;
	const dh = rect.height;
	const dx = rect.x;
	const dy = rect.y;
    this.contentsBack.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add cgmz animations
//=============================================================================
//-----------------------------------------------------------------------------
// Also init cgmz animation array
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
	alias_CGMZ_Core_Spriteset_Map_initialize.call(this);
	this._cgmzAnimations = [];
};
//-----------------------------------------------------------------------------
// Also Update cgmz animations
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	alias_CGMZ_Core_Spriteset_Map_update.call(this);
	this.updateCGMZAnimations();
};
//-----------------------------------------------------------------------------
// Also remove all cgmz animations
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Spriteset_Map_destroy = Spriteset_Map.prototype.destroy;
Spriteset_Map.prototype.destroy = function(options) {
	this.removeAllCGMZAnimations();
	alias_CGMZ_Core_Spriteset_Map_destroy.call(this, options);
};
//-----------------------------------------------------------------------------
// Update cgmz animations
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateCGMZAnimations = function() {
	for(const sprite of this._cgmzAnimations) {
		if (!sprite.isPlaying()) {
			this.removeCGMZAnimation(sprite);
		}
	}
	this.processCGMZAnimationRequests();
};
//-----------------------------------------------------------------------------
// Process new animation requests
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.processCGMZAnimationRequests = function() {
	for(;;) {
		const request = $cgmzTemp.retrieveMapAnimationRequest();
		if (request) {
			this.createCGMZAnimation(request);
		} else {
			break;
		}
	}
};
//-----------------------------------------------------------------------------
// Create a new CGMZ animation
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createCGMZAnimation = function(request) {
	const sprite = new Sprite_CGMZ_MapAnimation(request);
	this._effectsContainer.addChild(sprite);
	this._cgmzAnimations.push(sprite);
};
//-----------------------------------------------------------------------------
// Remove a CGMZ animation
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.removeCGMZAnimation = function(sprite) {
	this._cgmzAnimations.remove(sprite);
	this._effectsContainer.removeChild(sprite);
	sprite.destroy();
};
//-----------------------------------------------------------------------------
// Remove all CGMZ animations
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.removeAllCGMZAnimations = function() {
	for(const sprite of this._cgmzAnimations.clone()) {
		this.removeCGMZAnimation(sprite);
	}
};
//=============================================================================
// Sprite_CGMZ_MapAnimation
//-----------------------------------------------------------------------------
// Sprite class for basic map animations
//=============================================================================
function Sprite_CGMZ_MapAnimation() {
	this.initialize(...arguments);
}
Sprite_CGMZ_MapAnimation.prototype = Object.create(Sprite.prototype);
Sprite_CGMZ_MapAnimation.prototype.constructor = Sprite_CGMZ_MapAnimation;
//-----------------------------------------------------------------------------
// Initialize the sprite
// request should have:
// bitmap - Object with folder and filename properties to load the image with
// x - x coordinate (tile) of animation center
// y - y coordinate (tile) of animation center
// frameWidth - width of 1 animation cell
// frameHeight - height of 1 animation cell
// animationSpeed - how many frames to wait before swapping animation cells
// options - custom options to alter sprite behavior
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.initialize = function(request) {
	Sprite.prototype.initialize.call(this);
	this._isPlaying = true;
	this._needsUpdate = false;
	this._waitCounter = 0;
	this._currentFrame = 0;
	this._maxFrames = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._request = request;
	this.startBitmapLoad(request.bitmap);
};
//-----------------------------------------------------------------------------
// Start loading the bitmap
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.startBitmapLoad = function(bitmap) {
	this._bitmap = ImageManager.loadBitmap(bitmap.folder, bitmap.filename);
	this._bitmap.addLoadListener(this.onImageLoaded.bind(this));
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.onImageLoaded = function() {
	this.calculateMaxFrames();
	this._needsUpdate = true;
	const pw = this._request.frameWidth;
	const ph = this._request.frameHeight;
	const sx = 0;
	const sy = 0;
	this.setFrame(sx, sy, pw, ph);
};
//-----------------------------------------------------------------------------
// Calculate max amount of frames
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.calculateMaxFrames = function() {
	this._maxFrames = Math.floor(this._bitmap.width / this._request.frameWidth);
};
//-----------------------------------------------------------------------------
// Check if sprite is still playing
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.isPlaying = function() {
	return this._isPlaying;
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if(this._needsUpdate) {
		this.updateFrame();
		this.updatePosition();
	}
};
//-----------------------------------------------------------------------------
// Update frame of animation
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.updateFrame = function() {
	this._waitCounter++;
	if(this._waitCounter > this._request.animationSpeed) {
		if(this._currentFrame + 1 > this._maxFrames) {
			this._isPlaying = false;
			return;
		}
		this._waitCounter = 0;
		this._currentFrame++;
		const pw = this._request.frameWidth;
		const ph = this._request.frameHeight;
		const sx = this._currentFrame * pw;
		const sy = 0;
		this.setFrame(sx, sy, pw, ph);
	}
};
//-----------------------------------------------------------------------------
// Update position of sprite on screen
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.updatePosition = function() {
	const tw = $gameMap.tileWidth();
	const th = $gameMap.tileHeight();
	this.x = Math.floor($gameMap.adjustX(this._request.x) * tw + tw / 2);
	this.y = Math.floor($gameMap.adjustY(this._request.y) * th + th / 2);
};
//=============================================================================
// Input
//-----------------------------------------------------------------------------
// Pass input keycodes to CGMZ Temp
//=============================================================================
//-----------------------------------------------------------------------------
// Pass Inputs to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
	CGMZ_Core_Input_onKeyDown.call(this, event);
	if($cgmzTemp) $cgmzTemp.onKeyDown(event);
};
//-----------------------------------------------------------------------------
// Pass Inputs to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
	CGMZ_Core_Input_onKeyUp.call(this, event);
	if($cgmzTemp) $cgmzTemp.onKeyUp(event);
};
//-----------------------------------------------------------------------------
// Also clear CGMZ Input
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onLostFocus = Input._onLostFocus;
Input._onLostFocus = function() {
	CGMZ_Core_Input_onLostFocus.call(this);
	if($cgmzTemp) $cgmzTemp.inputClear();
};
//-----------------------------------------------------------------------------
// Send gamepad id to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function(gamepad) {
	CGMZ_Core_Input_updateGamepadState.call(this, gamepad);
	if(this._gamepadStates[gamepad.index].some((item) => item === true)) {
		$cgmzTemp?.updateLastGamepad(gamepad);
	} else {
		$cgmzTemp?.updateGamepadRelease(gamepad);
	}
};
//=============================================================================
// Game_Temp
//-----------------------------------------------------------------------------
// Simulate production environment parameter
//=============================================================================
//-----------------------------------------------------------------------------
// Always pass false if simulating production
//-----------------------------------------------------------------------------
const CGMZ_Core_GameTemp_isPlaytest = Game_Temp.prototype.isPlaytest;
Game_Temp.prototype.isPlaytest = function() {
	return (CGMZ.Core.SimulateProductionEnv) ? false : CGMZ_Core_GameTemp_isPlaytest.call(this);
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Distance methods for an event
//=============================================================================
//-----------------------------------------------------------------------------
// Get distance from player using distance formula
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_getDistanceFromPlayer = function() {
	const dx = $gameMap.deltaX(this.x, $gamePlayer.x);
	const dy = $gameMap.deltaY(this.y, $gamePlayer.y);
	return Math.sqrt(dx*dx + dy*dy);
};
//-----------------------------------------------------------------------------
// Get distance from player using RPG Maker formula
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_getDistanceFromPlayerSimple = function() {
	const dx = Math.abs($gameMap.deltaX(this.x, $gamePlayer.x));
	const dy = Math.abs($gameMap.deltaY(this.y, $gamePlayer.y));
	return dx + dy;
};
//-----------------------------------------------------------------------------
// Get distance from given event using distance formula
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_getDistanceFromEvent = function(e) {
	const dx = $gameMap.deltaX(this.x, e.x);
	const dy = $gameMap.deltaY(this.y, e.y);
	return Math.sqrt(dx*dx + dy*dy);
};
//-----------------------------------------------------------------------------
// Get distance from given event using RPG Maker formula
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_getDistanceFromEventSimple = function(e) {
	const dx = Math.abs($gameMap.deltaX(this.x, e.x));
	const dy = Math.abs($gameMap.deltaY(this.y, e.y));
	return dx + dy;
};
//=============================================================================
// Bitmap
//-----------------------------------------------------------------------------
// Add new shape drawing capabilities
//=============================================================================
//-----------------------------------------------------------------------------
// Copy of bitmap's stroke rect with added configurable line width
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeRect = function(x, y, width, height, color, lineWidth = 1) {
	const context = this.context;
	context.save();
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.strokeRect(x, y, width, height);
	context.restore();
	this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Draw a line path through an array of points
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeLinePath = function(points, color, lineWidth) {
	const context = this.context;
	context.save();
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	for(let i = 1; i < points.length; i++) {
		context.lineTo(points[i].x, points[i].y);
	}
	context.stroke();
	context.restore();
	this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Draw and fill a line path through an array of points
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_fillLinePath = function(points, color, lineWidth) {
	const context = this.context;
	context.save();
	context.fillStyle = color;
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	for(let i = 1; i < points.length; i++) {
		context.lineTo(points[i].x, points[i].y);
	}
	context.stroke();
	context.fill();
	context.restore();
	this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Stroke a circle
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeCircle = function(x, y, radius, color, lineWidth) {
	const context = this.context;
	context.save();
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2, false);
	context.stroke();
	context.restore();
	this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Stroke a curved rectangle
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeCurvedRectangle = function(rect, radius, color, lineWidth) {
	const context = this.context;
	const x = rect.x;
	const y = rect.y;
	const width = rect.width;
	const height = rect.height;
	context.save();
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.stroke();
	context.restore();
	this._baseTexture.update();
};
//=============================================================================
// Scene_MenuBase
//-----------------------------------------------------------------------------
// Add sprites below windows and above windows
//=============================================================================
//-----------------------------------------------------------------------------
// Also add sprites above everything else
//-----------------------------------------------------------------------------
const CGMZCore_SceneMenuBase_create = Scene_MenuBase.prototype.create;
Scene_MenuBase.prototype.create = function() {
	CGMZCore_SceneMenuBase_create.apply(this, arguments);
	this.CGMZ_createUpperSprites();
};
//-----------------------------------------------------------------------------
// Also add sprites below everything else (besides background)
//-----------------------------------------------------------------------------
const CGMZCore_SceneMenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	CGMZCore_SceneMenuBase_createBackground.apply(this, arguments);
	this.CGMZ_createLowerSprites();
};
//-----------------------------------------------------------------------------
// Create sprites below everything else
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_createLowerSprites = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Create sprites above everything else
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_createUpperSprites = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Calculate a mixed window height (some selectable, some non-selectable lines)
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_calcMixedHeight = function(selectableLines, staticLines, padding) {
	if(padding < 0) padding = $gameSystem.windowPadding();
	return this.calcWindowHeight(selectableLines, true) + this.calcWindowHeight(staticLines, false) - padding * 2;
};
//=============================================================================
// CGMZ_Window_Map
//-----------------------------------------------------------------------------
// A window that displays the tilemap
// For width/height, it is on you to make sure the tiles will fit in the
// window. To calculate do [Tile Width / Height] * 48 + [Padding] * 2 - 1
// Standard tile width/height is 48, standard padding is 12.
// Ex: if wanting to show 10 tiles, do 10 * 48 + 12 * 2 - 1 = 503
//
// Currently seems to be a bug if the window height/width matches exactly in
// that the tilemap will start to show the next tile.
//
// Due to tilemap strictness, it is recommended you base other windows off of
// the map window's dimensions.
//=============================================================================
function CGMZ_Window_Map() {
	this.initialize(...arguments);
}
CGMZ_Window_Map.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_Map.prototype.constructor = CGMZ_Window_Map;
$dataMapCGMZ = null;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.initialize = function(rect, mapId) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.select(0);
	this.activate();
	this.leftArrowVisible = false;
	this.rightArrowVisible = false;
	this._setupTilemap = false;
	this._tilemap = new Tilemap();
	this._tilemap.width = Math.floor(this.innerWidth / $gameMap.tileWidth()) * $gameMap.tileWidth();
	this._tilemap.height = Math.floor(this.innerHeight / $gameMap.tileHeight()) * $gameMap.tileHeight();
	this._tilemap.x = this.padding;
	this._tilemap.y = this.padding;
	this._tilemap._margin = 0;
	this.addChildToBack(this._tilemap);
	this._mapId = mapId;
	const filename = "Map%1.json".format(this._mapId.padZero(3));
	DataManager.loadDataFile("$dataMapCGMZ", filename);
	this._loadingMap = true;
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(!$dataMapCGMZ) return;
	if(this._loadingMap) {
		if(DataManager.isMapLoaded()) {
			this._loadingMap = false;
		}
		return;
	}
	if(!this._setupTilemap) {
		this.setupTilemap();
		this._setupTilemap = true;
	} else {
		this._tilemap.origin.x = this.leftRow() * $gameMap.tileWidth();
		this._tilemap.origin.y = this.topRow() * $gameMap.tileHeight();
	}
};
//-----------------------------------------------------------------------------
// Create tilemap
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.setupTilemap = function() {
	this._tilemap.tileWidth = $gameMap.tileWidth();
	this._tilemap.tileHeight = $gameMap.tileHeight();
	this._tilemap.setData($dataMapCGMZ.width, $dataMapCGMZ.height, $dataMapCGMZ.data);
	this._tilemap.horizontalWrap = false;
	this._tilemap.verticalWrap = false;
	this.loadTileset();
};
//-----------------------------------------------------------------------------
// Load Tileset
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.loadTileset = function() {
	this._tileset = $dataTilesets[$dataMapCGMZ.tilesetId];
	if (this._tileset) {
		const bitmaps = [];
		const tilesetNames = this._tileset.tilesetNames;
		for (const name of tilesetNames) {
			bitmaps.push(ImageManager.loadTileset(name));
		}
		this._tilemap.setBitmaps(bitmaps);
		this._tilemap.flags = this._tileset.flags;
	}
};
//-----------------------------------------------------------------------------
// Get max columns
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.maxCols = function() {
	if(!$dataMapCGMZ) return 0;
	return $dataMapCGMZ.width;
};
//-----------------------------------------------------------------------------
// Get max items
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.maxItems = function() {
	if(!$dataMapCGMZ) return 0;
	return $dataMapCGMZ.width * $dataMapCGMZ.height;
};
//-----------------------------------------------------------------------------
// Get column spacing
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.colSpacing = function() {
	return 0;
};
//-----------------------------------------------------------------------------
// Get row spacing
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.rowSpacing = function() {
	return 0;
};
//-----------------------------------------------------------------------------
// Get item width
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.itemWidth = function() {
	return $gameMap.tileWidth();
};
//-----------------------------------------------------------------------------
// Get item height
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.itemHeight = function() {
	return $gameMap.tileHeight();
};
//-----------------------------------------------------------------------------
// No item padding
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.itemPadding = function() {
	return 0;
};
//-----------------------------------------------------------------------------
// Do not draw background
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.drawItemBackground = function(index) {
};
//-----------------------------------------------------------------------------
// Calculate the overall width of the window
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.overallWidth = function() {
	return this.maxCols() * this.itemWidth();
};
//-----------------------------------------------------------------------------
// Get the current column
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.column = function() {
	return this.index() % this.maxCols();
};
//-----------------------------------------------------------------------------
// Get the left-most row
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.leftRow = function() {
	return Math.floor(this.scrollX() / this.itemWidth());
};
//-----------------------------------------------------------------------------
// Ensure cursor visible for horizontal movement
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.ensureCursorVisible = function(smooth) {
	if (this.innerWidth > 0 && this.column() >= 0) {
		const scrollX = this.scrollX();
		const itemTopX = this.column() * this.itemWidth();
		const itemBottomX = itemTopX + this.itemWidth();
		const scrollMinX = itemBottomX - this.innerWidth;
		if (scrollX > itemTopX) {
			if (smooth) {
				this.smoothScrollTo(itemTopX, this.scrollY());
			} else {
				this.scrollTo(itemTopX, this.scrollY());
			}
		} else if (scrollX < scrollMinX) {
			if (smooth) {
				this.smoothScrollTo(scrollMinX, this.scrollY());
			} else {
				this.scrollTo(scrollMinX, this.scrollY());
			}
		}
	}
	if (this.innerHeight > 0 && this.row() >= 0) {
		const scrollY = this.scrollY();
		const itemTop = this.row() * this.itemHeight();
		const itemBottom = itemTop + this.itemHeight();
		const scrollMin = itemBottom - this.innerHeight;
		if (scrollY > itemTop) {
			if (smooth) {
				this.smoothScrollTo(this.scrollX(), itemTop);
			} else {
				this.scrollTo(this.scrollX(), itemTop);
			}
		} else if (scrollY < scrollMin) {
			if (smooth) {
				this.smoothScrollTo(this.scrollX(), scrollMin);
			} else {
				this.scrollTo(this.scrollX(), scrollMin);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Create left and right arrow sprites too
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype._createArrowSprites = function() {
	Window_Selectable.prototype._createArrowSprites.call(this);
	this._leftArrowSprite = new Sprite();
	this.addChild(this._leftArrowSprite);
	this._rightArrowSprite = new Sprite();
	this.addChild(this._rightArrowSprite);
};
//-----------------------------------------------------------------------------
// Update arrow visibility
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.updateArrows = function() {
	Window_Selectable.prototype.updateArrows.call(this);
	this.rightArrowVisible = this.scrollX() < this.maxScrollX();
	this.leftArrowVisible = this.scrollX() > 0;
};
//-----------------------------------------------------------------------------
// Update the left and right arrows
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype._updateArrows = function() {
	Window_Selectable.prototype._updateArrows.call(this);
	this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
	this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
};
//-----------------------------------------------------------------------------
// Refresh the left and right arrows
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype._refreshArrows = function() {
	Window_Selectable.prototype._refreshArrows.call(this);
	const w = this._width;
	const h = this._height;
	const p = 24;
	const q = p / 2;
	const sx = 96 + p;
	const sy = 0 + p;
	this._rightArrowSprite.bitmap = this._windowskin;
	this._rightArrowSprite.anchor.x = 0.5;
	this._rightArrowSprite.anchor.y = 0.5;
	this._rightArrowSprite.setFrame(sx + p + q, sy + q, q, p);
	this._rightArrowSprite.move(w - q, h / 2);
	this._leftArrowSprite.bitmap = this._windowskin;
	this._leftArrowSprite.anchor.x = 0.5;
	this._leftArrowSprite.anchor.y = 0.5;
	this._leftArrowSprite.setFrame(sx, sy + q, q, p);
	this._leftArrowSprite.move(q, h / 2);
};
//-----------------------------------------------------------------------------
// Do not update padding
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.setMapId = function(mapId) {
	this._mapId = mapId;
	const filename = "Map%1.json".format(this._mapId.padZero(3));
	DataManager.loadDataFile("$dataMapCGMZ", filename);
	this._setupTilemap = false;
	this._loadingMap = true;
};
//=============================================================================
// CGMZ_Window_BitmapDummy
//-----------------------------------------------------------------------------
// Window dummy class for converting the rendered window to a bitmap object.
// It contains functions for drawing text (with text codes) and getting the
// bitmap which contains the text codes, functions for getting both the contents
// and contentsBack bitmaps, as well as functions for getting the entire window
// image.
//
// Since this window is meant is destroyed right away, you should load anything
// needed before calling this window's functions as there will not be time to
// wait while an image (for example) loads.
//=============================================================================
function CGMZ_Window_BitmapDummy() {
	this.initialize(...arguments);
}
CGMZ_Window_BitmapDummy.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_BitmapDummy.prototype.constructor = CGMZ_Window_BitmapDummy;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.initialize = function() {
	Window_Base.prototype.initialize.call(this, new Rectangle(0,0,0,0));
};
//-----------------------------------------------------------------------------
// Set options for the window
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.setOptions = function(options) {
	// Implemented by other plugins
};
//-----------------------------------------------------------------------------
// Set options (after contents created) for the window
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.setOptionsPostCreate = function(options) {
	// Implemented by other plugins
};
//-----------------------------------------------------------------------------
// Draw custom things
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.drawCustom = function(options) {
	// Implemented by other plugins
};
//-----------------------------------------------------------------------------
// Get text code string width
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.getTextCodeStringDimensions = function(string) {
	const rect = this.textSizeEx(string);
	this.destroy();
	return rect;
};
//-----------------------------------------------------------------------------
// Get text code bitmap
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.getTextCodeBitmap = function(string, options = {}, ext = {}) {
	const rect = this.textSizeEx(string);
	this.width = rect.width;
	this.height = rect.height;
	this.padding = 0;
	this.setOptions(options);
	this.createContents();
	this.setOptionsPostCreate(options);
	this.drawTextEx(string, 0, 0, rect.width);
	this.drawCustom(ext);
	const b = new Bitmap(this.contents.width, this.contents.height);
	b.blt(this.contents, 0, 0, this.contents.width, this.contents.height, 0, 0, this.contents.width, this.contents.height);
	this.destroy();
	return b;
};
//-----------------------------------------------------------------------------
// Get text code + background bitmaps
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.getCombinedTextCodeBitmaps = function(string, options = {}, ext = {}) {
	const rect = this.textSizeEx(string);
	this.width = rect.width;
	this.height = rect.height;
	this.padding = 0;
	this.setOptions(options);
	this.createContents();
	this.setOptionsPostCreate(options);
	this.drawTextEx(string, 0, 0, rect.width);
	this.drawCustom(ext);
	const b = new Bitmap(this.contents.width, this.contents.height);
	b.blt(this.contentsBack, 0, 0, this.contentsBack.width, this.contentsBack.height, 0, 0, this.contentsBack.width, this.contentsBack.height);
	b.blt(this.contents, 0, 0, this.contents.width, this.contents.height, 0, 0, this.contents.width, this.contents.height);
	this.destroy();
	return b;
};
//-----------------------------------------------------------------------------
// Get text code + background bitmaps
//-----------------------------------------------------------------------------
CGMZ_Window_BitmapDummy.prototype.getFullWindowTextCodeBitmap = function(string, options = {}, ext = {}) {
	const rect = this.textSizeEx(string);
	this.width = rect.width + this.padding * 2;
	this.height = rect.height + this.padding * 2;
	this.setOptions(options);
	this.createContents();
	this.setOptionsPostCreate(options);
	this.drawTextEx(string, 0, 0, rect.width);
	this.drawCustom(ext);
	const width = this.width;
	const height = this.height;
	const bitmap = new Bitmap(width, height);
	const renderTexture = PIXI.RenderTexture.create(width, height);
	const renderer = Graphics._app.renderer;
	renderer.render(this, renderTexture);
	const canvas = renderer.extract.canvas(renderTexture);
	bitmap.context.drawImage(canvas, 0, 0);
	canvas.width = 0;
	canvas.height = 0;
	renderTexture.destroy({ destroyBase: true });
	bitmap.baseTexture.update();
	this.destroy();
	return bitmap;
};
//=============================================================================
// CGMZ_Sprite_Gauge
//-----------------------------------------------------------------------------
// Gauge sprite that is much easier to use for [CGMZ] purposes than default
// sprite gauge.
//
// When creating the sprite, you can pass in the optional opts parameter. Options
// which are used by this sprite by default include:
// x - The initial x coordinate of the sprite
// y - The initial y coordinate of the sprite
// opacity - The initial opacity of the sprite
// bitmapWidth - The original width of the gauge bitmap (must not be 0)
// bitmapHeight - The original height of the gauge bitmap (must not be 0)
// textHeight - The height of the text (must not be 0)
// gaugeHeight - The height of the gauge (must not be 0)
// gaugeX - The x coordinate of the gauge (must be number)
// labelY - The y coordiante of the label (must be number)
// labelFontFace - The font face for the label
// labelFontSize - The font size for the label (must not be 0)
// valueFontFace - The font face for the value
// valueFontSize - The font size for the value (must not be 0)
// smoothness - The smoothness when animating the gauge (must be number)
// flashingColor1 - 4 number array which represents a blend color
// flashingColor2 - 4 number array which represents a blend color
// label - The gauge label
// gaugeBackColor - Color of the gauge background
// gaugeColor1 - Color of the gauge color 1
// gaugeColor2 - Color of the gauge color 2
// labelColor - Color of the label
// labelOutlineColor - Color of the label outline
// valueColor - Color of the value
// valueOutlineColor - Color of the value outline
// labelOutlineWidth - Width of the label outline (must be number)
// valueOutlineWidth - Width of the value outline (must be number)
// labelOpacity - The label opacity (must be number)
// useCustomRate - If true, will use custom rate calculation in calculateCustomGaugeRate()
// isDefaultSprite - If true, will behave as a normal Sprite_Gauge for isValid() checks
// isDefaultRedraw - If true, will use default redraw function else uses customRedraw()
// isDefaultGauge - If true, will use default draw gauge function, else uses customDrawGauge()
// isDefaultGaugeRect - If true, will use default draw gauge rect function, else uses customDrawGaugeRect()
// isDefaultLabel - If true, will use default draw gauge rect function, else uses customDrawLabel()
// Custom drawing functions MUST be implemented if the isDefault properties are omitted or false.
//
// When any of the above are not included in opts, default Sprite_Gauge values
// will be used. You can also pass in an extra "ext" object. This can be interpreted
// however you want in initCGMZOpts(). It by default is null. You can also include 
// any additional parameters on the opts param, the opts param is available to the
// sprite class after initialization as this._options
//
// When calling the setup function, arguments have changed. They are now:
// battler, type, cgmz = null, ext = null
// battler and type should be the normal gauge arguments. cgmz and ext are optional 
// parameters that can be easily interpreted in the function CGMZSetup()
// This function will have access to ext and cgmz arguments. ext is not available
// after the function runs. cgmz will be saved as this.cgmz for later use throughout
// the gauge.
//
// By default, you can enter certain parameters to the cgmz argument that may be used in the sprite
// if nothing else is passed. These values are:
// staticCurrentValue - A current value to use that will not change
// staticMaxValue - A max value to use that will not change
// staticMinValue - A min value to use that will not change. By default, only considered if useCustomRate option is true.
//
// The goal of this sprite is NOT to provide too many additional options, but
// rather to make more of the default gauge sprites an option rather than hardcoded
// which need to be overridden in child classes.
//=============================================================================
function CGMZ_Sprite_Gauge() {
	this.initialize(...arguments);
}
CGMZ_Sprite_Gauge.prototype = Object.create(Sprite_Gauge.prototype);
CGMZ_Sprite_Gauge.prototype.constructor = CGMZ_Sprite_Gauge;
//-----------------------------------------------------------------------------
// Initialize the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.initialize = function(opts = {}, ext = {}) {
	this.initCGMZOpts(opts, ext);
	Sprite_Gauge.prototype.initialize.call(this);
	this.initLocation();
	this.initCustom();
};
//-----------------------------------------------------------------------------
// Init gauge variables
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.initCGMZOpts = function(opts, ext) {
	this._options = opts;
	this._needsBitmapDestroy = true;
};
//-----------------------------------------------------------------------------
// Init gauge location
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.initLocation = function() {
	if(this._options.hasOwnProperty('x') && this._options.hasOwnProperty('y')) {
		this.move(this._options.x, this._options.y);
	}
};
//-----------------------------------------------------------------------------
// Init custom gauge properties
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.initCustom = function() {
	if(this._options.hasOwnProperty('opacity')) {
		this.opacity = this._options.opacity;
	}
};
//-----------------------------------------------------------------------------
// Init gauge variables
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.initMembers = function() {
	Sprite_Gauge.prototype.initMembers.call(this);
	this._needsBitmapDestroy = true;
};
//-----------------------------------------------------------------------------
// Destroy the gauge sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.destroy = function(options) {
	if(this._needsBitmapDestroy) {
		Sprite_Gauge.prototype.destroy.call(this, options);
	} else {
		Sprite.prototype.destroy.call(this, options);
	}
};
//-----------------------------------------------------------------------------
// The width for the initial bitmap
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.bitmapWidth = function() {
	return this._options.bitmapWidth || Sprite_Gauge.prototype.bitmapWidth.call(this);
};
//-----------------------------------------------------------------------------
// The height for the initial bitmap
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.bitmapHeight = function() {
	return this._options.bitmapWidth || Sprite_Gauge.prototype.bitmapHeight.call(this);
};
//-----------------------------------------------------------------------------
// The text height
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.textHeight = function() {
	return this._options.textHeight || Sprite_Gauge.prototype.textHeight.call(this);
};
//-----------------------------------------------------------------------------
// The gauge height
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.gaugeHeight = function() {
	return this._options.gaugeHeight || Sprite_Gauge.prototype.gaugeHeight.call(this);
};
//-----------------------------------------------------------------------------
// The gauge X
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.gaugeX = function() {
	if(typeof this._options.gaugeX === 'number') return this._options.gaugeX;
	return Sprite_Gauge.prototype.gaugeX.call(this);
};
//-----------------------------------------------------------------------------
// The label Y
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelY = function() {
	if(typeof this._options.labelY === 'number') return this._options.labelY;
	return Sprite_Gauge.prototype.labelY.call(this);
};
//-----------------------------------------------------------------------------
// The label font face
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelFontFace = function() {
	return this._options.labelFontFace || Sprite_Gauge.prototype.labelFontFace.call(this);
};
//-----------------------------------------------------------------------------
// The label font size
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelFontSize = function() {
	return this._options.labelFontSize || Sprite_Gauge.prototype.labelFontSize.call(this);
};
//-----------------------------------------------------------------------------
// The value font face
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.valueFontFace = function() {
	return this._options.valueFontFace || Sprite_Gauge.prototype.valueFontFace.call(this);
};
//-----------------------------------------------------------------------------
// The value font size
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.valueFontSize = function() {
	return this._options.valueFontSize || Sprite_Gauge.prototype.valueFontSize.call(this);
};
//-----------------------------------------------------------------------------
// Setup the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.setup = function(battler, type, cgmz = {}, ext = {}) {
	this.CGMZSetup(cgmz, ext, battler, type);
	Sprite_Gauge.prototype.setup.call(this, battler, type);
};
//-----------------------------------------------------------------------------
// Setup the CGMZ variables for the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.CGMZSetup = function(cgmz, ext, battler, type) {
	this.cgmz = cgmz;
};
//-----------------------------------------------------------------------------
// Update the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.update = function() {
	Sprite_Gauge.prototype.update.call(this);
};
//-----------------------------------------------------------------------------
// Update the bitmap
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.updateBitmap = function() {
	Sprite_Gauge.prototype.updateBitmap.call(this);
};
//-----------------------------------------------------------------------------
// Update the target value
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.updateTargetValue = function(value, maxValue) {
	Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};
//-----------------------------------------------------------------------------
// Get the smoothness of the gauge
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.smoothness = function() {
	if(typeof this._options.smoothness === 'number') return this._options.smoothness;
	return Sprite_Gauge.prototype.smoothness.call(this);
};
//-----------------------------------------------------------------------------
// Update the gauge animation
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.updateGaugeAnimation = function() {
	Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
};
//-----------------------------------------------------------------------------
// Update the flashing effect of the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.updateFlashing = function() {
	Sprite_Gauge.prototype.updateFlashing.call(this);
};
//-----------------------------------------------------------------------------
// Update the flashing effect of the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.flashingColor1 = function() {
	return this._options.flashingColor1 || Sprite_Gauge.prototype.flashingColor1.call(this);
};
//-----------------------------------------------------------------------------
// Update the flashing effect of the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.flashingColor2 = function() {
	return this._options.flashingColor2 || Sprite_Gauge.prototype.flashingColor2.call(this);
};
//-----------------------------------------------------------------------------
// Check if sprite is valid
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.isValid = function() {
	if(this._options.isDefaultSprite) return Sprite_Gauge.prototype.isValid.call(this);
	return true;
};
//-----------------------------------------------------------------------------
// Get the current value of the gauge
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.currentValue = function() {
	const oldReturn = Sprite_Gauge.prototype.currentValue.call(this);
	if(!isNaN(oldReturn)) return oldReturn;
	return this.calculateCurrentValue();
};
//-----------------------------------------------------------------------------
// Calculate the current value if default current value is NaN
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.calculateCurrentValue = function() {
	// to be implemented by plugins - note: plugins should check the old return for NaN which means it has not been calculated yet
	if(this.cgmz.hasOwnProperty('staticCurrentValue')) return this.cgmz.staticCurrentValue;
	return NaN;
};
//-----------------------------------------------------------------------------
// Get the current max value of the gauge
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.currentMaxValue = function() {
	const oldReturn = Sprite_Gauge.prototype.currentMaxValue.call(this);
	if(!isNaN(oldReturn)) return oldReturn;
	return this.calculateCurrentMaxValue();
};
//-----------------------------------------------------------------------------
// Calculate the current value if default current value is NaN
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.calculateCurrentMaxValue = function() {
	// to be implemented by plugins - note: plugins should check the old return for NaN which means it has not been calculated yet
	if(this.cgmz.hasOwnProperty('staticMaxValue')) return this.cgmz.staticMaxValue;
	return NaN;
};
//-----------------------------------------------------------------------------
// Gauge label
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.label = function() {
	return this._options.label || Sprite_Gauge.prototype.label.call(this);
};
//-----------------------------------------------------------------------------
// Gauge back color
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.gaugeBackColor = function() {
	if(this._options.hasOwnProperty('gaugeBackColor')) return this._options.gaugeBackColor;
	return Sprite_Gauge.prototype.gaugeBackColor.call(this);
};
//-----------------------------------------------------------------------------
// Gauge color 1
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.gaugeColor1 = function() {
	if(this._options.hasOwnProperty('gaugeColor1')) return this._options.gaugeColor1;
	return Sprite_Gauge.prototype.gaugeColor1.call(this);
};
//-----------------------------------------------------------------------------
// Gauge color 2
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.gaugeColor2 = function() {
	if(this._options.hasOwnProperty('gaugeColor2')) return this._options.gaugeColor2;
	return Sprite_Gauge.prototype.gaugeColor2.call(this);
};
//-----------------------------------------------------------------------------
// Label color
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelColor = function() {
	if(this._options.hasOwnProperty('labelColor')) return this._options.labelColor;
	return Sprite_Gauge.prototype.labelColor.call(this);
};
//-----------------------------------------------------------------------------
// Label outline color
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelOutlineColor = function() {
	if(this._options.hasOwnProperty('labelOutlineColor')) return this._options.labelOutlineColor;
	return Sprite_Gauge.prototype.labelOutlineColor.call(this);
};
//-----------------------------------------------------------------------------
// Label outline width
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelOutlineWidth = function() {
	if(typeof this._options.labelOutlineWidth === 'number') return this._options.labelOutlineWidth;
	return Sprite_Gauge.prototype.labelOutlineWidth.call(this);
};
//-----------------------------------------------------------------------------
// Label outline width
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.valueColor = function() {
	if(this._options.hasOwnProperty('valueColor')) return this._options.valueColor;
	return Sprite_Gauge.prototype.valueColor.call(this);
};
//-----------------------------------------------------------------------------
// Label outline width
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.valueOutlineColor = function() {
	if(this._options.hasOwnProperty('valueOutlineColor')) return this._options.valueOutlineColor;
	return Sprite_Gauge.prototype.valueOutlineColor.call(this);
};
//-----------------------------------------------------------------------------
// Label outline width
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.valueOutlineWidth = function() {
	if(typeof this._options.valueOutlineWidth === 'number') return this._options.valueOutlineWidth;
	return Sprite_Gauge.prototype.valueOutlineWidth.call(this);
};
//-----------------------------------------------------------------------------
// Redraw the gauge
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.redraw = function() {
	if(this._options.isDefaultRedraw) {
		Sprite_Gauge.prototype.redraw.call(this);
	} else {
		this.customRedraw();
	}
};
//-----------------------------------------------------------------------------
// Redraw the gauge (custom)
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.customRedraw = function() {
	// To be implemented by plugins
};
//-----------------------------------------------------------------------------
// Draw the gauge
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.drawGauge = function() {
	if(this._options.isDefaultGauge) {
		Sprite_Gauge.prototype.drawGauge.call(this);
	} else {
		this.customDrawGauge();
	}
};
//-----------------------------------------------------------------------------
// Draw the gauge in a custom way
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.customRedraw = function() {
	// To be implemented by plugins
};
//-----------------------------------------------------------------------------
// Draw the gauge rect
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
	if(this._options.isDefaultGaugeRect) {
		Sprite_Gauge.prototype.drawGaugeRect.call(this, x, y, width, height);
	} else {
		this.customDrawGaugeRect(x, y, width, height);
	}
};
//-----------------------------------------------------------------------------
// Draw the gauge rect in a custom way
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.customDrawGaugeRect = function(x, y, width, height) {
	// To be implemented by plugins
};
//-----------------------------------------------------------------------------
// Get the gauge rate
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.gaugeRate = function() {
	if(this._options.useCustomRate) this.calculateCustomGaugeRate();
	return Sprite_Gauge.prototype.gaugeRate.call(this);
};
//-----------------------------------------------------------------------------
// Draw the gauge rect in a custom way
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.calculateCustomGaugeRate = function() {
	// To be implemented by plugins - plugins should check if 0 and return 0 if the gauge is not applicable to that plugin
	const minValue = this.cgmz.staticMinValue || 0;
	const value = this._value - minValue;
	const maxValue = this._maxValue - minValue;
	return maxValue > 0 ? value / maxValue : 0;
};
//-----------------------------------------------------------------------------
// Draw the gauge label
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.drawLabel = function() {
	if(this._options.isDefaultLabel) {
		Sprite_Gauge.prototype.drawLabel.call(this);
	} else {
		this.customDrawLabel();
	}
};
//-----------------------------------------------------------------------------
// Draw custom gauge label
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.customDrawLabel = function() {
	// To be implemented by plugins
};
//-----------------------------------------------------------------------------
// Get label opacity
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.labelOpacity = function() {
	if(typeof this._options.labelOpacity === 'number') return this._options.labelOpacity;
	return Sprite_Gauge.prototype.labelOpacity.call(this);
};
//-----------------------------------------------------------------------------
// Draw gauge value
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.drawValue = function() {
	if(this._options.isDefaultSprite) {
		Sprite_Gauge.prototype.drawValue.call(this);
	} else {
		this.customDrawValue();
	}
};
//-----------------------------------------------------------------------------
// Draw custom gauge value
//-----------------------------------------------------------------------------
CGMZ_Sprite_Gauge.prototype.customDrawValue = function() {
	// To be implemented by plugins
};