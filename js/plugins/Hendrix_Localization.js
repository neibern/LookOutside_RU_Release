/*:
 * @target MZ MV
 * @plugindesc A localization system that replaces game text based on CSV data. The best localization plugin <3
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io/
 * 
 * @help
 * Verion 1.5.3
 * ----------------------------------------------------------------------------
 * This is a plugin for RPG Maker MV/MZ that allows you to translate everything you
 * see from your game using a auto generated CSV file, and you don't need to
 * touch your in-editor text. Totally un-destructive method and automatic.
 * All you need to do is to translate, the plugin handles the rest.
 * FRANKIE NOTE: FRANKIE MESSED AROUND WITH THIS PLUGIN TO MAKE IT CREATE UNIQUE IDS FOR ALL MESSAGES AMONG OTHER THINGS
 * ----------------------------------------------------------------------------
 * FEATURES
 * - Add languages, custom font and size for each language.
 * - Auto generate a translation file with all languages you added.
 * - Auto extract all game messages, choices, common events, 
 * variables, pictures and database.
 * - Everything is categorized and organized.
 * - Any adjustments made in the editor will be updated to the translation file.
 * - Auto update and backup your translation file.
 * - Translation file is saved as game_messages.csv, very easy to use.
 * - Manually add anything you want to translate to the same csv file.
 * - NON-DESTRUCTIVE. Say no to replacing your in-editor text.
 * - Cache your translation. Help improving performance greatly.
 * - An awesome dev to support you 24/7.
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * - How do I use this?
 * Turn on Extract Text parameter > Start the game > Hit Yes to generate
 * all context from your game to a translation file (game_messages.csv).
 * Whatever you type to this file will be shown in-game.
 * Tutorial: https://www.youtube.com/watch?v=QvHeVdmUjRQ
 * 
 * - What if I want to translate something manually?
 * Then open game_messages.csv and type it in <3.
 * 
 * - What's with the columns?
 * Change column: To tell you which line is Newly added.
 * Original: Whatever is written in here will be translated.
 * Languages column (en, vi, jp, es...): Put you translation here.
 * 
 * - How to check the current language using conditional branch?
 * Simply put this: ConfigManager.language === 'en' (en is your symbol)
 * 
 * - I'm gonna localize pictures so I'm gonna use ConfigManager.language...
 * STOP! This plugin is created so you don't do any manual work.
 * Watch this video: https://www.youtube.com/watch?v=V0e5w1c0tgE
 * ----------------------------------------------------------------------------
 * SCRIPT CALL
 * To change to a specific language: changeToLanguage('languageSymbol')
 * Example: changeToLanguage('en') or changeToLanguage('jp')
 * To change to the next avaiable language: changeToLanguage('next')
 * ----------------------------------------------------------------------------
 * For feedback or feature request, please dm me on X or Facebook:
 * https://x.com/sanghendrix96
 * Discord: Sang Hendrix #3505
 * or my group Discord: https://discord.com/invite/YKPscqHV8b
 * 
 * @param Exact Text
 * @text Extract Text
 * @type boolean
 * @desc If true, extracts messages. If false, uses translations.
 * @default false
 * 
 * @param decor1
 * @text ==========================
 * @type text
 * @default ===============================
 * 
 * @param Adding Maps name
 * @type boolean
 * @desc If true, adds map names before dialogues when extracting messages.
 * @default true
 * 
 * @param Extract Names (MZ)
 * @text Create Name Column (MZ)
 * @type boolean
 * @desc Extracts the name box from Show Message commands to a separate CSV column. Only for MZ.
 * @default false
 * 
 * @param Extract Database Entries
 * @type boolean
 * @desc If true, extracts database entries when Exact Text is also true.
 * @default false
 * 
 * @param Extract Variable Text
 * @type boolean
 * @desc If true, extracts the script text of all variables when Exact Text is also true.
 * @default false
 * 
 * @param Extract Show Picture
 * @type boolean
 * @desc If true, extracts the default filename of all Show Pictures commands.
 * @default false
 * 
 * @param Extract Play Movies
 * @type boolean
 * @desc If true, extracts the filename of all Play Movie commands.
 * @default false
 * 
 * @param Extract Script Call
 * @type boolean
 * @desc If true, extracts text from script calls.
 * @default false
 * 
 * @param Extract Plugin Command Text
 * @type boolean
 * @desc If true, extracts text from plugin commands (string, text, note types).
 * @default false
 * 
 * @param Extract Comments
 * @type boolean
 * @desc If true, extracts comments (the green text) from events when Exact Text is also true.
 * @default false
 * 
 * @param Exclude Name Text
 * @text Exclude Text Before ":"
 * @type boolean
 * @desc Excludes all text from extraction before the character ":" ("David: hehe" --csv-> "hehe").
 * @default false
 * 
 * @param decor2
 * @text ==========================
 * @type text
 * @default ===============================
 * 
 * @param Partial Matching
 * @type boolean
 * @desc If true, enables partial matching for translations. If false, only exact matches are used.
 * @default false
 * 
 * @param Use Translation Cache
 * @type boolean
 * @desc If true, caches translated results for frequently used text. Heavily improve performance.
 * @default false
 * 
 * @param Auto Refresh Pictures
 * @type boolean
 * @desc If true, automatically refreshes pictures when changing language.
 * @default false
 * 
 * @param decor3
 * @text ==========================
 * @type text
 * @default ===============================
 *
 * @param Languages
 * @type struct<Language>[]
 * @desc List of available languages
 *
 * @param Default Language
 * @type string
 * @desc The symbol of the default language to use for translations
 * @default en
 * 
 * @param Add Language Command to Title
 * @text Add Language to Title
 * @type boolean
 * @desc If true, adds a language selection command to the title screen.
 * @default false
 * 
 * @param decor4
 * @text ==========================
 * @type text
 * @default ===============================
 * 
 * @param Excluded Symbols
 * @type struct<PushSymbol>[]
 * @desc Symbols to push to Excluded column. Example: \n<*>, \pop[*]. Only for advanced usage.
 * @default []
 * 
 */

/*~struct~PushSymbol:
 * @param Symbol
 * @type string
 * @desc The symbol used to identify text to push to Excluded column (e.g., \n<*>)
 * @default \n<*>
 */

/*~struct~Language:
 * @param Name
 * @type string
 * @desc The display name of the language
 *
 * @param Symbol
 * @type string
 * @desc The symbol used to identify this language (e.g., en, vi)
 *
 * @param Font
 * @type string
 * @desc The name of the font file in the fonts folder (e.g., myfont.ttf)
 *
 * @param FontSize
 * @type number
 * @min 1
 * @desc The font size to use for this language
 * @default 28
 */

var Imported = Imported || {};
Imported.Hendrix_Localization = true;

(function () {
    let fs, path;
    if (typeof require === 'function') {
        fs = require('fs');
        path = require('path');
    } else {
        fs = null;
        path = null;
    }

    const parameters = PluginManager.parameters('Hendrix_Localization');
    const extractComments = parameters['Extract Comments'] === 'true';
    const exactText = parameters['Exact Text'] === 'true';
    const extractDatabaseEntries = parameters['Extract Database Entries'] === 'true';
    const addingMapsName = parameters['Adding Maps name'] === 'true';
    const extractNamesMZ = parameters['Extract Names (MZ)'] === 'true';
    const excludeNameText = parameters['Exclude Name Text'] === 'true';
    const addGibberishLines = parameters['Add Gibberish Lines'] === 'true';
    const extractVariableText = parameters['Extract Variable Text'] === 'true';
    const extractPluginCommandText = parameters['Extract Plugin Command Text'] === 'true';
    const defaultLanguage = parameters['Default Language'];
    const partialMatching = parameters['Partial Matching'] === 'true';
    const useTranslationCache = parameters['Use Translation Cache'] === 'true';
    const languagesParam = JSON.parse(parameters['Languages'] || `[]`);
    const extractShowPicture = parameters['Extract Show Picture'] === 'true';
    const autoRefreshPictures = parameters['Auto Refresh Pictures'] === 'true';
    const pushSymbols = JSON.parse(parameters['Excluded Symbols'] || `[]`).map(symbol => JSON.parse(symbol).Symbol);
    const addLanguageCommandToTitle = parameters['Add Language Command to Title'] === 'true';
    const extractPlayMovies = parameters['Extract Play Movies'] === 'true';
    const extractScriptCall = parameters['Extract Script Call'] === 'true';

    const languages = languagesParam.map(lang => JSON.parse(lang));
    const languageSymbols = languages.map(lang => lang.Symbol);

    let currentLanguage = defaultLanguage;
    let availableLanguages = [];
    let messages = [];
    let translations = {};
    let translationCache = {};
	let contexts = {};
    let originalTitle1 = '';
    let originalTitle2 = '';
    const wordBoundaryRegex = /\b/g;
    let uniqueMessages = new Set();
	let messageCode = "";
	let idCode = "";
    const originalTexts = [];
    const wordTranslationRegexes = new Map();
    const messageData = new Map();
	const uniqueIDs = new Map();
	const messageText = new Map();
	const descriptions = new Map();
	const contextMap = new Map();
	const repeatsMap = new Map();

    function detectCSVSeparator() {
        const numberWithDecimal = 1.1;
        const formatted = numberWithDecimal.toLocaleString();

        const usesSemicolon = formatted.includes(',');

        if (usesSemicolon) {
            console.log("Your system language doesn't use ',' for decimals, so I'm going to switch to ';' for CSV separation");
        } else {
            console.log("Your system language uses ',' for decimals");
        }

        return usesSemicolon ? ';' : ',';
    }

    function detectCSVSeparatorFromContent(content) {
        // Sample the first few lines of content
        const lines = content.split('\n').slice(0, 5);
        if (lines.length > 0) {
            const header = lines[0];
            const commaCount = (header.match(/,/g) || []).length;
            const semicolonCount = (header.match(/;/g) || []).length;

            console.log("CSV Separator Detection:");
            console.log("- Commas found in header:", commaCount);
            console.log("- Semicolons found in header:", semicolonCount);

            const detectedSeparator = semicolonCount > commaCount ? ';' : ',';
            console.log("-> Using separator:", detectedSeparator);

            return detectedSeparator;
        }

        //console.log("No header found in content, defaulting to comma separator");
        return ',';
    }

    const CSV_SEPARATOR = detectCSVSeparator();

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function extractYepName(text) {
        let yepName = '';
        let remainingText = text;

        for (const symbol of pushSymbols) {
            const escapedSymbol = escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol.replace('\\*', '(.+?)'), 'g');
            let match;
            while ((match = regex.exec(remainingText)) !== null) {
                yepName += match[0];
                remainingText = remainingText.replace(match[0], '');
            }
        }

        return { yepName, remainingText };
    }

    function generateGibberish(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

	function generateMonoGibberish(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    // Hook into the game loading process
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        if (Imported['YEP_MessageCore']) {
            this.updateMessageCoreEscapeCharacters();
        }
        if (exactText) {
            // Delay the extraction process to ensure the game is fully loaded
            setTimeout(extractAllMessages, 1000);
            //} else {
            //    loadTranslations(currentLanguage);
        }
        applyLanguageSettings();
    };

    Scene_Boot.prototype.updateMessageCoreEscapeCharacters = function () {
        Game_Message.prototype.addText = function (text) {
            if ($gameSystem.wordWrap()) text = '<WordWrap>' + Hendrix_Localization(text);
            this.add(text);
        };

        Window_Base.prototype.setWordWrap = function (text) {
            this._wordWrap = false;
            if (text.match(/<(?:WordWrap)>/i)) {
                this._wordWrap = true;
                text = text.replace(/<(?:WordWrap)>/gi, '');
            }
            if (this._wordWrap) {
                var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
                text = Hendrix_Localization(text).replace(/[\n\r]+/g, replace);
            }
            if (this._wordWrap) {
                text = Hendrix_Localization(text).replace(/<(?:BR|line break)>/gi, '\n');
            } else {
                text = Hendrix_Localization(text).replace(/<(?:BR|line break)>/gi, '');
            }
            return text;
        };

        Window_Base.prototype.escapeIconItem = function (n, database) {
            return '\x1bI[' + database[n].iconIndex + ']' + Hendrix_Localization(database[n].name);
        };

        var _Window_Base_convertExtraEscapeCharacters = Window_Base.prototype.convertExtraEscapeCharacters;
        Window_Base.prototype.convertExtraEscapeCharacters = function (text) {
            text = _Window_Base_convertExtraEscapeCharacters.call(this, text);
            // \AC[n]
            text = text.replace(/\x1bAC\[(\d+)\]/gi, function () {
                return Hendrix_Localization(this.actorClassName(parseInt(arguments[1])));
            }.bind(this));
            // \AN[n]
            text = text.replace(/\x1bAN\[(\d+)\]/gi, function () {
                return Hendrix_Localization(this.actorNickname(parseInt(arguments[1])));
            }.bind(this));
            // \PC[n]
            text = text.replace(/\x1bPC\[(\d+)\]/gi, function () {
                return Hendrix_Localization(this.partyClassName(parseInt(arguments[1])));
            }.bind(this));
            // \PN[n]
            text = text.replace(/\x1bPN\[(\d+)\]/gi, function () {
                return Hendrix_Localization(this.partyNickname(parseInt(arguments[1])));
            }.bind(this));
            // \NC[n]
            text = text.replace(/\x1bNC\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataClasses[parseInt(arguments[1])].name);
            }.bind(this));
            // \NI[n]
            text = text.replace(/\x1bNI\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataItems[parseInt(arguments[1])].name);
            }.bind(this));
            // \NW[n]
            text = text.replace(/\x1bNW\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataWeapons[parseInt(arguments[1])].name);
            }.bind(this));
            // \NA[n]
            text = text.replace(/\x1bNA\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataArmors[parseInt(arguments[1])].name);
            }.bind(this));
            // \NE[n]
            text = text.replace(/\x1bNE\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataEnemies[parseInt(arguments[1])].name);
            }.bind(this));
            // \NS[n]
            text = text.replace(/\x1bNS\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataSkills[parseInt(arguments[1])].name);
            }.bind(this));
            // \NT[n]
            text = text.replace(/\x1bNT\[(\d+)\]/gi, function () {
                return Hendrix_Localization($dataStates[parseInt(arguments[1])].name);
            }.bind(this));
            // \II[n]
            text = text.replace(/\x1bII\[(\d+)\]/gi, function () {
                return this.escapeIconItem(arguments[1], Hendrix_Localization($dataItems));
            }.bind(this));
            // \IW[n]
            text = text.replace(/\x1bIW\[(\d+)\]/gi, function () {
                return this.escapeIconItem(arguments[1], Hendrix_Localization($dataWeapons));
            }.bind(this));
            // \IA[n]
            text = text.replace(/\x1bIA\[(\d+)\]/gi, function () {
                return this.escapeIconItem(arguments[1], Hendrix_Localization($dataArmors));
            }.bind(this));
            // \IS[n]
            text = text.replace(/\x1bIS\[(\d+)\]/gi, function () {
                return this.escapeIconItem(arguments[1], Hendrix_Localization($dataSkills));
            }.bind(this));
            // \IT[n]
            text = text.replace(/\x1bIT\[(\d+)\]/gi, function () {
                return this.escapeIconItem(arguments[1], Hendrix_Localization($dataStates));
            }.bind(this));

            return text;
        };
    };

	function addLocEntry(_key,_context,_uniqueStart,_text,_description="") {
		contextMap.set(_key,_context);
		if(_uniqueStart==""){uniqueIDs.set(_key,"----");}
		else{uniqueIDs.set(_key,_uniqueStart+generateMonoGibberish(4));}
		messageText.set(_key,_text);
		descriptions.set(_key,_description);
		messages.push(_key);
	};

    function applyLanguageSettings() {
        const currentLangSettings = languages.find(lang => lang.Symbol === currentLanguage);
        if (currentLangSettings) {
            if (currentLangSettings.Font) {
                loadCustomFont(currentLangSettings.Font);
            }

            if (currentLangSettings.FontSize) {
                const fontSize = Number(currentLangSettings.FontSize);
                applyFontSize(fontSize);
            }

            if (Imported['YEP_MessageCore']) {
                overrideYanflyMessageFontSettings(currentLangSettings);
            }

            if (Imported['Galv_MessageStyles']) {
                alterGalvFontSize(currentLangSettings);
            }
        }
    }

    function overrideYanflyMessageFontSettings(langSettings) {
        if (langSettings.Font) {
            Game_System.prototype.getMessageFontName = function () {
                return langSettings.Font.split('.')[0]; // Remove file extension
            };
        }
        if (langSettings.FontSize) {
            Game_System.prototype.getMessageFontSize = function () {
                return Number(langSettings.FontSize);
            };
        }
    }

    function alterGalvFontSize(langSettings) {
        if (langSettings.FontSize) {
            Galv.Mstyle.fontSize = Number(langSettings.FontSize);

            Window_Message.prototype.standardFontSize = function () {
                return Galv.Mstyle.fontSize;
            };

            Window_ChoiceList.prototype.standardFontSize = function () {
                return Galv.Mstyle.fontSize;
            };

            if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
                SceneManager._scene.refreshAllWindows();
            }
        }
    }

    function loadCustomFont(fontFileName) {
        const fontName = fontFileName.split('.')[0];
        const fileExtension = fontFileName.split('.').pop().toLowerCase();
        let format;

        if (fileExtension === 'ttf') {
            format = 'truetype';
        } else if (fileExtension === 'otf') {
            format = 'opentype';
        } else {
            return;
        }

        const fontPath = `url('fonts/${fontFileName}')`;
        const font = new FontFace(fontName, fontPath);

        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            applyFontFace(fontName);
            if (Imported['YEP_MessageCore']) {
                Game_System.prototype.getMessageFontName = function () {
                    return fontName;
                };
            }
            if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
                SceneManager._scene.refreshAllWindows();
            }
        }).catch((error) => {
            applyFontFace($gameSystem.mainFontFace());
        });

        const style = document.createElement('style');
        const css = `@font-face {
            font-family: "${fontName}";
            src: ${fontPath} format("${format}");
        }`;
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function applyFontFace(fontFace) {
        Window_Base.prototype.standardFontFace = function () {
            return fontFace;
        };
        if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
            SceneManager._scene.refreshAllWindows();
        }
    }

    function applyFontSize(fontSize) {
        Window_Base.prototype.standardFontSize = function () {
            return fontSize;
        };
        if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
            SceneManager._scene.refreshAllWindows();
        }
    }

    const _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function () {
        _Window_Base_resetFontSettings.call(this);
        if (typeof this.standardFontFace === 'function') {
            this.contents.fontFace = this.standardFontFace();
        }
        if (typeof this.standardFontSize === 'function') {
            this.contents.fontSize = this.standardFontSize();
        }
    };

    function extractAllMessages() {
        if (!fs || !path) {
            //console.warn('Text extraction is not available in this environment.');
            return;
        }
        messages = [];
		messageCodes = [];
        if (confirm("Do you want to generate/update the csv file?")) {
            let filePath = 'game_messages.csv';
            if (!fs.existsSync(filePath)) {
                filePath = path.join('www', 'game_messages.csv');
            }

            if (fs.existsSync(filePath)) {
                if (confirm("Do you want to create a backup of your current localization file before proceeding?\n\nSelect 'OK' to make a backup, or 'Cancel' to proceed without a backup.")) {
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    const backupPath = path.join(path.dirname(filePath), `game_messages_backup_${timestamp}.csv`);
                    fs.copyFileSync(filePath, backupPath);
                    alert(`Backup created: ${backupPath}`);
                } else {

                }
            }

            // Proceed with extraction
            for (let mapId = 1; mapId < $dataMapInfos.length; mapId++) {
                if ($dataMapInfos[mapId]) {
                    const mapData = JSON.parse(fs.readFileSync(path.join('data', `Map${String(mapId).padStart(3, '0')}.json`), 'utf8'));
                    extractMessagesFromMap(mapData, mapId);
                }
            }
            // Extract messages from common events
            extractCommonEventMessages();

            if (extractDatabaseEntries) {
                extractDatabaseMessages();
                extractTroopMessages();
            }

            if (extractVariableText) {
                extractVariableMessages();
            }

            if (extractShowPicture) {
                extractShowPictureMessages();
            }

            if (extractPlayMovies) {
                extractPlayMovieMessages();
            }

            if (extractScriptCall) {
                extractScriptCallMessages();
            }

            if (extractPluginCommandText) {
                extractPluginCommandMessages();
            }

            updateMessagesCSV();
            alert("CSV file has been generated/updated successfully.");
        } else {

        }
    }

    function extractScriptCallMessages() {
		addLocEntry("-SCRIPTCALLS-","","",'\n[SCRIPTCALLS]\n');

        function extractQuotedText(text) {
            const matches = text.match(/"([^"]+)"/g);
            if(text.includes("console.log(")){return [];} //exclude console logs
			if(text.includes("setAchievement(")){return [];} //exclude set achievement
			if(text.includes("qkSpatialSnd(")){return [];} //exclude sound plays
			if(text.includes("qkSfx(")){return [];} //exclude sound plays
			if(text.includes("monster_ChangeSpr(")){return [];} //exclude sprite changes
			if(text.includes("switchBattleBack1(")){return [];} //exclude sprite changes
			if(text.includes("switchBattleBack2(")){return [];} //exclude sprite changes
			if (matches) {
				return matches.map(match => match.slice(1, -1))
					.filter(str => /[a-zA-Z]/.test(str)); // Only keep strings with at least one letter
			}
            return [];
        }

        function extractFromEventCommands(eventCommands) {
            let currentScript = [];
            eventCommands.forEach(command => {
                if (command.code === 355 || command.code === 655) { // Script and Script continuation
                    let scriptText = command.parameters[0];
                    if (typeof scriptText === 'string') {
                        currentScript.push(scriptText);
                    }
                } else if (currentScript.length > 0) {
                    const fullScript = currentScript.join('\n');
                    const quotedTexts = extractQuotedText(fullScript);
                    quotedTexts.forEach(text => {
						key = messageCode+"SCRIPT"+text;
						contextMap.set(key,messageCode+"SCRIPT");
						uniqueIDs.set(key,idCode+generateGibberish(8));
						messageText.set(key,text);
						messages.push(key);
					});
                    currentScript = [];
                }
            });
            if (currentScript.length > 0) {
                const fullScript = currentScript.join('\n');
                const quotedTexts = extractQuotedText(fullScript);
                quotedTexts.forEach(text => {
					key = messageCode+"SCRIPT"+text;
					contextMap.set(key,messageCode+"SCRIPT");
					uniqueIDs.set(key,idCode+generateGibberish(8));
					messageText.set(key,text);
					messages.push(key)
				});
            }
        }

        // Extract from all map events
        for (let mapId = 1; mapId < $dataMapInfos.length; mapId++) {
            if ($dataMapInfos[mapId]) {
                const mapData = JSON.parse(fs.readFileSync(path.join('data', `Map${String(mapId).padStart(3, '0')}.json`), 'utf8'));
                if (mapData.events) {
                    mapData.events.forEach((event,eventId) => {
                        if (event && event.pages) {
                            event.pages.forEach((page,pageId) => {
                                if (page.list) {
									messageCode = "MAP"+mapId+"ev"+eventId+"pg"+pageId;
									idCode = "M"+mapId+"E"+eventId+"P"+pageId;
                                    extractFromEventCommands(page.list);
                                }
                            });
                        }
                    });
                }
            }
        }

        // Extract from common events
        $dataCommonEvents.forEach((commonEvent,commonEventInd) => {
            if (commonEvent && commonEvent.list) {
				messageCode = "CEV"+commonEventInd;
				idCode = "CEV"+commonEventInd;
                extractFromEventCommands(commonEvent.list);
            }
        });
    }

    function extractCommonEventMessages() {
		addLocEntry("-Common Events-","","",'\n[Common Events]\n');
        $dataCommonEvents.forEach((commonEvent, index) => {
			messageCode = "CEV"+index;
			idCode = "CEV"+index;
            if (commonEvent && commonEvent.list) {
                // Extract comments if enabled
                if (extractComments) {
                    let hasAddedCommentHeader = false;
                    commonEvent.list.forEach(command => {
                        if (command.code === 108 || command.code === 408) {
                            if (!hasAddedCommentHeader) {
                                addLocEntry(messageCode+"_Comment",messageCode+"_Comment",idCode,'\n[Comments]\n');
                                hasAddedCommentHeader = true;
                            }
                            messages.push(command.parameters[0]);
                        }
                    });
                }

                let currentMessage = [];
                commonEvent.list.forEach(command => {
                    if (command.code === 401) { // Show Text
                        let text = command.parameters[0];
                        if (excludeNameText) {
                            const colonIndex = text.indexOf(':');
                            if (colonIndex !== -1) {
                                text = text.substring(colonIndex + 1).trim();
                            }
                        }
                        currentMessage.push(text);
                    } else if (command.code === 102) { // Show Choices
					var choiceMsg = currentMessage;
					let gibberishGen = "";
                        if (currentMessage.length > 0) {
							addLocEntry(messageCode+"MSG"+currentMessage.join('\n'),messageCode+"_MSG",idCode,currentMessage.join('\n'));
                            currentMessage = [];
                        }
                        command.parameters[0].forEach((choice,choiceInd) => {
						addLocEntry(messageCode+"MSG"+choiceMsg+"_CH"+choiceInd,messageCode+"_CH"+choiceInd,idCode,choice);
                        });
                    } else if (currentMessage.length > 0) {
                        addLocEntry(messageCode+"MSG"+currentMessage.join('\n'),messageCode+"_MSG",idCode,currentMessage.join('\n'));
                        currentMessage = [];
                    }
                });

                if (currentMessage.length > 0) {
					addLocEntry(messageCode+"MSG"+currentMessage.join('\n'),messageCode+"_MSG",idCode,currentMessage.join('\n'));
                    messages.push(currentMessage.join('\n'));
                }
            }
        });
    }

    function extractVariableMessages() {
        addLocEntry("-VARIABLES-","","",'\n[VARIABLES]\n');

        function extractFromEventCommands(eventCommands) {
            eventCommands.forEach(command => {
                if (command.code === 122 && command.parameters[3] === 4) {
                    const script = command.parameters[4];
                    if (typeof script === 'string' && /[a-zA-Z]/.test(script)) {
						if(!script.includes("$")&& !script.includes("("))
						{
							const cleanScript = script.replace(/^["']|["']$/g, '');
							addLocEntry(messageCode+"VAR"+cleanScript,messageCode+"VAR",idCode,cleanScript);
						}
                    }
                }
            });
        }

        // Extract from all map events
        for (let mapId = 1; mapId < $dataMapInfos.length; mapId++) {
            if ($dataMapInfos[mapId]) {
                const mapData = JSON.parse(fs.readFileSync(path.join('data', `Map${String(mapId).padStart(3, '0')}.json`), 'utf8'));
                if (mapData.events) {
                    mapData.events.forEach((event,evInd) => {
                        if (event && event.pages) {
                            event.pages.forEach((page,pageInd) => {
                                if (page.list) {
									messageCode = "VR_MAP"+mapId+"ev"+evInd+"pg"+pageInd;
									idCode = "VM"+mapId+"E"+evInd+"P"+pageInd;
                                    extractFromEventCommands(page.list);
                                }
                            });
                        }
                    });
                }
            }
        }

        // Extract from common events
        $dataCommonEvents.forEach((commonEvent,commonEventInd) => {
            if (commonEvent && commonEvent.list) {
				messageCode = "VCE"+commonEventInd;
				idCode = "VCE"+commonEventInd;
                extractFromEventCommands(commonEvent.list);
            }
        });
    }

    function extractDatabaseMessages() {
		addLocEntry("-DATABASE ENTRIES-","","",'\n[DATABASE ENTRIES]\n');
        // Title Screen files
		addLocEntry("-TitleScreen-","","",'\n[Title Screen]\n');
		
        if ($dataSystem && $dataSystem.title1Name) {
            const title1Filename = $dataSystem.title1Name + '.png';
            addLocEntry("TitleScrn1","TitleScrn1","TS1",title1Filename);
        }
        if ($dataSystem && $dataSystem.title2Name) {
            const title2Filename = $dataSystem.title2Name + '.png';
			addLocEntry("TitleScrn2","TitleScrn2","TS2",title2Filename);
        }

        function removePrefix(text) {
            return text && typeof text === 'string' ? text.replace(/^\[.*?\]\s*/, '') : '';
        }

        // Actors
        addLocEntry("-Actors-","","",'\n[Actors]\n');
        $dataActors.forEach((actor, index) => {
            if (actor) {
				if (actor.name)
				{
					addLocEntry("ACTOR"+index+"name","ACTOR"+index+"name","ACN"+index,actor.name);
					};
                if (actor.nickname)
				{
					addLocEntry("ACTOR"+index+"nick","ACTOR"+index+"nick","ACNK"+index,actor.nickname);
					};
                if (actor.profile)
				{
					addLocEntry("ACTOR"+index+"prof","ACTOR"+index+"prof","ACP"+index,actor.profile);
					};
            }
        });

        // Classes
        addLocEntry("-Classes-","","",'\n[Classes]\n');
        $dataClasses.forEach((klass, index) => {
            if (klass && klass.name) {
				addLocEntry("CLASS"+index,"CLASS"+index,"CLA"+index,klass.name);
            }
        });

        // Skills
        addLocEntry("-Skills-","","",'\n[Skills]\n');
        $dataSkills.forEach((skill, index) => {
            if (skill && skill.name) {
                addLocEntry("SKILL"+index+"NAME","SKILL"+index+"NAME","SK"+index+"N",skill.name);
                if (skill.description) addLocEntry("SKILL"+index+"DESC","SKILL"+index+"DESC","SK"+index+"D",skill.description);
                if (skill.message1) addLocEntry("SKILL"+index+"MSG1","SKILL"+index+"MSG1","SK"+index+"M1",skill.message1);
                if (skill.message2) addLocEntry("SKILL"+index+"MSG2","SKILL"+index+"MSG2","SK"+index+"M2",skill.message2);
            }
        });

        // Items
        addLocEntry("-Items-","","",'\n[Items]\n');
        $dataItems.forEach((item, index) => {
            if (item && item.name) {
				addLocEntry("ITM"+index+"NAME","ITM"+index+"NAME","ITM"+index+"N",item.name);
                if (item.description) addLocEntry("ITM"+index+"DESC","ITM"+index+"DESC","ITM"+index+"D",item.description);
            }
        });

        // Weapons
        addLocEntry("-Weapons-","","",'\n[Weapons]\n');
        $dataWeapons.forEach((weapon, index) => {
            if (weapon && weapon.name) {
				addLocEntry("WPN"+index+"NAME","WEAPON"+index+"NAME","WPN"+index+"N",weapon.name);
                if (weapon.description) addLocEntry("WPN"+index+"DESC","WEAPON"+index+"DESC","WPN"+index+"D",weapon.description);
            }
        });

        // Armors
        addLocEntry("-Armors-","","",'\n[Armors]\n');
        $dataArmors.forEach((armor, index) => {
            if (armor && armor.name) {
				addLocEntry("ARMOR"+index+"NAME","ARMOR"+index+"NAME","ARM"+index+"N",removePrefix(armor.name));
                if (armor.description) addLocEntry("ARMOR"+index+"DESC","ARMOR"+index+"DESC","ARM"+index+"D",armor.description);
            }
        });

        // Enemies
        addLocEntry("-Enemies-","","",'\n[Enemies]\n');
        $dataEnemies.forEach((enemy, index) => {
            if (enemy && enemy.name) {
				addLocEntry("ENEMY"+index+"NAME","ENEMY"+index+"NAME","ENM"+index+"N",enemy.name);
            }
        });

        // States
        addLocEntry("-States-","","",'\n[States]\n');
        $dataStates.forEach((state, index) => {
            if (state && state.name) {
				addLocEntry("STATE"+index+"NAME","STATE"+index+"NAME","ST"+index+"N",removePrefix(state.name));
                if (state.message1) addLocEntry("STATE"+index+"MSG1","STATE"+index+"MSG1","ST"+index+"M1",state.message1);
                if (state.message2) addLocEntry("STATE"+index+"MSG2","STATE"+index+"MSG2","ST"+index+"M2",state.message2);
                if (state.message3) addLocEntry("STATE"+index+"MSG3","STATE"+index+"MSG3","ST"+index+"M3",state.message3);
                if (state.message4) addLocEntry("STATE"+index+"MSG4","STATE"+index+"MSG4","ST"+index+"M4",state.message4);
            }
        });

        // Types
        addLocEntry("-Types-","","",'\n[Types]\n');
        ['weaponTypes', 'armorTypes', 'equipTypes', 'skillTypes'].forEach(typeCategory => {
            if (Array.isArray($dataSystem[typeCategory])) {
                $dataSystem[typeCategory].forEach((type, index) => {
                    if (type) {
						let shortType = "W";
						switch(typeCategory)
						{
							case 'weaponTypes': shortType = "W"; break;
							case 'armorTypes': shortType = "A"; break;
							case 'equipTypes': shortType = "E"; break;
							case 'skillTypes': shortType = "S"; break;
						}
                        addLocEntry("TYPE"+shortType+"IND"+index,"TYPE"+shortType+"IND"+index,"TYPE"+shortType+"I"+index,type);
                    }
                });
            }
        });

        // Terms
        addLocEntry("-Terms-","","",'\n[Terms]\n');
        const terms = $dataSystem.terms;
        Object.keys(terms).forEach((termCategory,CatInd) => {
            if (typeof terms[termCategory] === 'string') {
				addLocEntry("TERM"+termCategory,"TERM"+termCategory,"TERM"+CatInd,terms[termCategory]);
			} else if (Array.isArray(terms[termCategory])) {
                terms[termCategory].forEach((term, index) => {
					addLocEntry("TERM"+termCategory+"IND"+index,"TERM"+termCategory+"IND"+index,"TERM"+CatInd+"_"+index,term);
                });
            }
        });

        // Terms Messages
        addLocEntry("-System Messages-","","",'\n[System Messages]\n');
        if ($dataSystem && $dataSystem.terms && $dataSystem.terms.messages) {
            const messageTypes = Object.keys($dataSystem.terms.messages);
            messageTypes.forEach((key,keyInd) => {
                const messageText = $dataSystem.terms.messages[key];
                if (messageText) {
					addLocEntry("MSGS"+key,"MSGS"+key,"MSGS"+keyInd,messageText);
                }
            });
        }
    }

	function getSpeakerCode(tx)
	{
		if(tx == ""){return "";}
		else{return "("+tx.slice(0,5)+")";}
	}

    function extractMessagesFromMap(mapData, mapId) {
        if (addingMapsName) {
            const mapName = $dataMapInfos[mapId].name;
			let mapkey = "-MAP"+mapName+mapId+"-";
			addLocEntry(mapkey,mapkey,"",mapkey);
        }
		let key = "";
        if (mapData.events) {
            mapData.events.forEach((event,eventInd) => {
                if (event && event.pages) {
                    event.pages.forEach((page,pageInd) => {
                        if (page.list) {
							messageCode = "MAP"+mapId+"ev"+eventInd+"pg"+pageInd+"|";
							idCode ="M"+mapId+"E"+eventInd+"P"+pageInd;
							if (extractComments) {
                                let hasAddedCommentHeader = false;
                                page.list.forEach(command => {
                                    if (command.code === 108 || command.code === 408) {
                                        if (!hasAddedCommentHeader) {
											key = 'comments_'+messageCode;
											addLocEntry(key,key,"",'\n[Comments]\n');
                                            hasAddedCommentHeader = true;
                                        }
										key = 'cmt_'+messageCode+command.parameters[0];
										addLocEntry(key,'cmt_'+messageCode,"",command.parameters[0]);
                                    }
                                });
                            }

                            // Handle regular messages
                            let currentMessage = [];
							let msgScramble = "";
                            let currentSpeaker = '';

                            // Handle scroll text separately
                            let currentScrollText = [];

                            page.list.forEach((command, commandIndex) => {
                                // Handle scroll text commands
                                if (command.code === 405) { // Scroll text content
                                    currentScrollText.push(command.parameters[0]);
                                } else if (command.code !== 405 && currentScrollText.length > 0) {
                                    // When we hit a non-scroll text command, process any collected scroll text
									const fullMessage = currentMessage.join('\n');
									addLocEntry(messageCode+"SCRL"+fullMessage,messageCode+"SCRL",idCode,fullMessage);
                                    currentScrollText = [];
                                }

                                // Handle regular messages
                                if (command.code === 101) { // Show Text settings
									if (currentMessage.length > 0) {
                                        const fullMessage = currentMessage.join('\n');
                                        key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+fullMessage;
										addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,fullMessage);
                                        if (extractNamesMZ) {
                                            messageData.set(key, currentSpeaker);
                                        }
                                        currentMessage = [];
                                    }
									
                                    currentSpeaker = command.parameters[4] || '';
                                } else if (command.code === 401) { // Show Text content
									let text = command.parameters[0];
                                    if (excludeNameText) {
                                        const colonIndex = text.indexOf(':');
                                        if (colonIndex !== -1) {
                                            text = text.substring(colonIndex + 1).trim();
                                        }
                                    }
                                    currentMessage.push(text);
                                } else if (command.code === 102) { // Show Choices
                                    const choiceMsg = currentMessage;
									if (currentMessage.length > 0) {
                                        const fullMessage = currentMessage.join('\n');
										key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+fullMessage;
										addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,fullMessage);
                                        if (extractNamesMZ) {
                                            messageData.set(key, currentSpeaker);
                                        }
                                        currentMessage = [];
                                    }
                                    command.parameters[0].forEach((choice,choiceInd) => {
                                        key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+choiceMsg+"CH"+choiceInd+"_"+choice
										addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+"CH"+choiceInd,idCode,choice);
                                    });
									
                                } else if (currentMessage.length > 0) {
                                    const fullMessage = currentMessage.join('\n');
                                    key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+fullMessage;
									addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,fullMessage);
                                    if (extractNamesMZ) {
                                        messageData.set(key, currentSpeaker);
                                    }
                                    currentMessage = [];
                                    currentSpeaker = '';
                                }
                            });

                            // Process any remaining scroll text
                            if (currentScrollText.length > 0) {
								addLocEntry(messageCode+"SCRL"+currentScrollText.join('\n'),messageCode+"SCRL",idCode,currentScrollText.join('\n'));
                            }


                            // Process any remaining messages
                            if (currentMessage.length > 0) {
                                const fullMessage = currentMessage.join('\n');
                                key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+currentScrollText.join('\n');
								addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,fullMessage);
                                if (extractNamesMZ) {
                                    messageData.set(key, currentSpeaker);
                                }
                            }
							
                        }
                    });
                }
            });
        }
    }


    function extractTroopMessages() {
		addLocEntry("-TROOPS-","","",'\n[TROOPS]\n');
        $dataTroops.forEach((troop, index) => {
            if (troop && troop.pages) {
                troop.pages.forEach((page, pageIndex) => {
					let currentSpeaker = '';
                    if (page.list) {
						messageCode = "TROOP"+index+"pg"+pageIndex+"|";
						idCode ="TRP"+index+"P"+pageIndex;
							
                        let currentMessage = [];
                        page.list.forEach(command => {
                            if (command.code === 401) { // Show Text
                                let text = command.parameters[0];
                                if (excludeNameText) {
                                    const colonIndex = text.indexOf(':');
                                    if (colonIndex !== -1) {
                                        text = text.substring(colonIndex + 1).trim();
                                    }
                                }
								currentSpeaker = command.parameters[4] || '';
                                currentMessage.push(text);
                            } else if (command.code === 102) { // Show Choices
								let choiceMsg = "";
                                if (currentMessage.length > 0) {
									key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+currentMessage.join('\n');
									choiceMsg = currentMessage.join('\n');
									addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,currentMessage.join('\n'));
                                    currentMessage = [];
                                }
                                command.parameters[0].forEach((choice,choiceInd) => {
									key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+choiceMsg+"CH"+choiceInd+"_"+choice
									addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+"CH"+choiceInd+"_",idCode,choice);
                                });
                            } else if (currentMessage.length > 0) {
								key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+currentMessage.join('\n');
								addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,currentMessage.join('\n'));
                                currentMessage = [];
                            }
                        });
                        if (currentMessage.length > 0) {
							key = messageCode+"TX"+getSpeakerCode(currentSpeaker)+"_"+currentMessage.join('\n');
							addLocEntry(key,messageCode+"TX"+getSpeakerCode(currentSpeaker),idCode,currentMessage.join('\n'));
                        }
                    }
                });
            }
        });
    }

    function extractShowPictureMessages() {
		addLocEntry("-SHOW PICTURES-","","",'\n[SHOW PICTURES]\n');
		
        function extractFromEventCommands(eventCommands) {
            eventCommands.forEach(command => {
                if (command.code === 231) { // Show Picture command
                    let filename = command.parameters[1];
                    if (filename) {
                        // Add .png extension if it's not already there
                        if (!filename.toLowerCase().endsWith('.png')) {
                            filename += '.png';
                        }
                        messages.push(filename);
                    }
                }
            });
        }

        // Extract from all map events
        for (let mapId = 1; mapId < $dataMapInfos.length; mapId++) {
            if ($dataMapInfos[mapId]) {
                const mapData = JSON.parse(fs.readFileSync(path.join('data', `Map${String(mapId).padStart(3, '0')}.json`), 'utf8'));
                if (mapData.events) {
                    mapData.events.forEach(event => {
                        if (event && event.pages) {
                            event.pages.forEach(page => {
                                if (page.list) {
                                    extractFromEventCommands(page.list);
                                }
                            });
                        }
                    });
                }
            }
        }

        // Extract from common events
        $dataCommonEvents.forEach(commonEvent => {
            if (commonEvent && commonEvent.list) {
                extractFromEventCommands(commonEvent.list);
            }
        });
    }

    function extractPlayMovieMessages() {
		addLocEntry("-PLAY MOVIES-","","",'\n[PLAY MOVIES]\n');

        function extractFromEventCommands(eventCommands) {
            eventCommands.forEach(command => {
                if (command.code === 261) {
                    let filename = command.parameters[0];
                    if (filename) {
                        // Add .webm extension cuz it doesn't extract .webm
                        if (!filename.toLowerCase().endsWith('.webm')) {
                            filename += '.webm';
                        }
                        messages.push(filename);
                    }
                }
            });
        }

        // Extract from all map events
        for (let mapId = 1; mapId < $dataMapInfos.length; mapId++) {
            if ($dataMapInfos[mapId]) {
                const mapData = JSON.parse(fs.readFileSync(path.join('data', `Map${String(mapId).padStart(3, '0')}.json`), 'utf8'));
                if (mapData.events) {
                    mapData.events.forEach(event => {
                        if (event && event.pages) {
                            event.pages.forEach(page => {
                                if (page.list) {
                                    extractFromEventCommands(page.list);
                                }
                            });
                        }
                    });
                }
            }
        }

        // Extract from common events
        $dataCommonEvents.forEach(commonEvent => {
            if (commonEvent && commonEvent.list) {
                extractFromEventCommands(commonEvent.list);
            }
        });
    }

    function extractPluginCommandMessages() {
		addLocEntry("-PLUGIN COMMANDS-","","",'\n[PLUGIN COMMANDS]\n');
        function isValidContent(content) {
            // Check if the content contains at least one letter and is not a boolean value
            return /[a-zA-Z]/.test(content) &&
                !['true', 'false'].includes(content.toLowerCase().trim());
        }

        function extractFromEventCommands(eventCommands) {
            eventCommands.forEach(command => {
                if (command.code === 357) { // Plugin Command
                    const params = command.parameters[3] || {};
                    Object.keys(params).forEach(key => {
                        const value = params[key];
                        if (typeof value === 'string') {
                            // Match content for key-value pairs or regular quoted strings
                            const keyValueRegex = /"([^"]+)"\s*:\s*"([^"]*)"/g;
                            const regularQuoteRegex = /"([^"]*)"/g;

                            let match;
                            // Check for key-value pairs first
                            while ((match = keyValueRegex.exec(value)) !== null) {
                                const content = match[2]; // The value part
                                if (isValidContent(content)) {
                                    messages.push(content);
                                }
                            }

                            // If no key-value pairs found, check for regular quoted strings
                            if (!keyValueRegex.test(value)) {
                                while ((match = regularQuoteRegex.exec(value)) !== null) {
                                    const content = match[1];
                                    if (isValidContent(content)) {
                                        messages.push(content);
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }

        // Extract from all map events
        for (let mapId = 1; mapId < $dataMapInfos.length; mapId++) {
            if ($dataMapInfos[mapId]) {
                const mapData = JSON.parse(fs.readFileSync(path.join('data', `Map${String(mapId).padStart(3, '0')}.json`), 'utf8'));
                if (mapData.events) {
                    mapData.events.forEach(event => {
                        if (event && event.pages) {
                            event.pages.forEach(page => {
                                if (page.list) {
                                    extractFromEventCommands(page.list);
                                }
                            });
                        }
                    });
                }
            }
        }

        // Extract from common events
        $dataCommonEvents.forEach(commonEvent => {
            if (commonEvent && commonEvent.list) {
                extractFromEventCommands(commonEvent.list);
            }
        });
    }

    function updateMessagesCSV() {
        if (!fs || !path) {
            return;
        }
        const filePath = path.join(process.cwd(), 'game_messages.csv');
        let existingContent = [];
        let updatedMessages = new Set();
        let uniqueMessages = new Set();

        // Read existing CSV file if it exists
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            existingContent = parseCSV(content);
        }

        // Prepare CSV content
        const BOM = '\uFEFF';
        //const headers = ['Change', 'Excluded'];
		const headers = ['UniqueID','Context','Change', 'Excluded','Description'];
        if (extractNamesMZ) {
            headers.push('Name');
        }
        headers.push('Original');
        headers.push(...languageSymbols);

        let csvContent = BOM + headers.join(CSV_SEPARATOR) + '\n';

        // Create maps for existing data
        const existingTranslations = new Map();
        const existingYepNames = new Map();
        const existingNames = new Map();
		const existingIDs = new Map();
		const existingDescs = new Map();
		const existingContext = new Map();

        if (existingContent.length > 0) {
            const headers = existingContent[0];
            const changeIndex = headers.indexOf('Change');
            const yepNameIndex = headers.indexOf('Excluded');
			const uniqueIdIndex = 0;
			const contextIndex = headers.indexOf('Context');
			const descIndex = headers.indexOf('Description');
            const nameIndex = headers.indexOf('Name');
            const originalIndex = headers.indexOf('Original');

            if (originalIndex !== -1) {
                for (let i = 1; i < existingContent.length; i++) {
                    const row = existingContent[i];
                    if (row.length > originalIndex) {
                        
						const originalText = row[originalIndex];
						const mapKey = row[contextIndex] + originalText;
                        // Calculate the correct starting index for translations based on whether Name column exists
                        const translationsStartIndex = originalIndex + 1;
                        const translations = headers.slice(translationsStartIndex).map((lang, index) =>
                            row[translationsStartIndex + index] || '');
                        existingTranslations.set(mapKey, translations);

						existingIDs.set(mapKey,row[uniqueIdIndex]);
						existingDescs.set(mapKey,row[descIndex]);
						existingContext.set(mapKey,row[contextIndex]);

                        // Store Excluded column content
                        if (yepNameIndex !== -1 && row.length > yepNameIndex) {
                            existingYepNames.set(mapKey, row[yepNameIndex]);
                        }

                        // Only store Name data if the feature is enabled
                        if (extractNamesMZ && nameIndex !== -1 && row.length > nameIndex) {
                            existingNames.set(mapKey, row[nameIndex]);
                        }
						
                    }
                }
            }
        }

        function processMessage(msg) {
			//if (!msg || uniqueMessages.has(msg)) return;
            if(!msg) return;
			var mainText = messageText.get(msg) || '';
			if (!msg || uniqueMessages.has(mainText))
			{
				let nbTimesReused = repeatsMap.get(mainText) || 1;
				repeatsMap.set(mainText,nbTimesReused+1);
				return;
			}
			
			//uniqueMessages.add(msg);
			uniqueMessages.add(mainText);
			var mainText = messageText.get(msg) || '';
            const { yepName, remainingText } = extractYepName(mainText);
            const escapedMsg = escapeCSV(remainingText);
            const escapedYepName = escapeCSV(yepName);
            let line = ['','','','',escapedYepName];

            // Only include Name column if feature is enabled
            if (extractNamesMZ) {
                const speakerName = messageData.get(msg) || '';
                const escapedSpeakerName = escapeCSV(speakerName);
                line.push(escapedSpeakerName);
            }
			line[0] = uniqueIDs.get(msg) || '';
			line[1] = contextMap.get(msg) || '';
            line.push(escapedMsg);

            if (existingTranslations.has(remainingText)) {
                line[0] = existingIDs.get(msg) || 'MissingID_'+generateGibberish(10);
				line[1] = existingContext.get(msg);
				
				//line[2] = '';
				line[4] = existingDescs.get(msg) || '';
                line = line.concat(existingTranslations.get(remainingText).map(t => escapeCSV(t)));
				
            } else {
                
				//line[2] = 'NEW';
                line = line.concat(Array(languageSymbols.length).fill(''));
            }

            csvContent += line.join(CSV_SEPARATOR) + '\n';
            updatedMessages.add(remainingText);
        }


        messages.forEach(processMessage);

		function listRepeats(nbTimes,msgTxt)
		{
			let line = ['','','','','',nbTimes,escapeCSV(msgTxt)];
			csvContent += line.join(CSV_SEPARATOR) + '\n';
		}

		repeatsMap.forEach(listRepeats);
		

        // Process map names
        if (addingMapsName) {
            const mapNames = messages.filter(msg => msg && msg.startsWith('[') && msg !== '[DATABASE ENTRIES]' && !msg.startsWith('[Choice]'));
            mapNames.forEach(processMessage);
        }

        // Process common event messages
        if (messages.includes('[Common Events]')) {
            csvContent += `,,[Common Events]${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;
            const commonEventMessages = messages.slice(messages.indexOf('[Common Events]') + 1);
            commonEventMessages.forEach(processMessage);
        }

        // Process variable messages
        if (extractVariableText && messages.includes('[VARIABLES]')) {
            csvContent += `,,,,,,[VARIABLES]${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;
            const variableMessages = messages.slice(messages.indexOf('[VARIABLES]') + 1);
            variableMessages.forEach(processMessage);
        }

        // Process database entries
        if (extractDatabaseEntries) {
            csvContent += `,,,,,,[DATABASE ENTRIES]${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;
            const databaseContentIndex = messages.findIndex(msg => msg === '[DATABASE ENTRIES]');
            const databaseContent = databaseContentIndex !== -1 ? messages.slice(databaseContentIndex + 1) : [];

            let currentCategory = '';
            databaseContent.forEach((item) => {
                if (!item) return; // Skip null or undefined items
                if (/^\[.+\]$/.test(item)) {
                    currentCategory = item;
                    csvContent += `,,${escapeCSV(item)}${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;
                } else if (item.trim() !== '' && item !== '[DATABASE ENTRIES]') {
                    processMessage(item);
                }
            });
        }

        csvContent += `,,,,,,${escapeCSV('[GARBAGE AND \nCUSTOM LINES]')}${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;

        // Collect custom lines and preserve existing translations
        let customLines = '';
        existingContent.slice(1).forEach(row => {
            if (!row || row.length < 3) return; // Skip invalid rows

            const headers = existingContent[0];
			const uniqueIdIndex = 0;
            const changeIndex = headers.indexOf('Change');
            const excludedIndex = headers.indexOf('Excluded');
			const descIndex = headers.indexOf('Description');
            const nameIndex = headers.indexOf('Name');
            const originalIndex = headers.indexOf('Original');

			///headers = ['UniqueID','Change', 'Excluded','Description'];

            // Get the text from the correct Original column
            const originalText = row[originalIndex];

            if (!updatedMessages.has(originalText) &&
                originalText !== '[GARBAGE AND \nCUSTOM LINES]' &&
                originalText !== '[DATABASE ENTRIES]') {

                // Create a new row with proper mapping
                let newRow = [];

                // Always include Change and Excluded
                newRow.push(row[changeIndex] || '');
                newRow.push(row[excludedIndex] || '');

                // Only include Name if feature is enabled
                if (extractNamesMZ && nameIndex !== -1) {
                    newRow.push(row[nameIndex] || '');
                }

                // Add Original
                newRow.push(originalText);

                // Add all translations, making sure to get them from the correct indices
                const translations = languageSymbols.map(symbol => {
                    const langIndex = headers.indexOf(symbol);
                    return langIndex !== -1 ? row[langIndex] || '' : '';
                });
                newRow = newRow.concat(translations);

                customLines += newRow.map(escapeCSV).join(CSV_SEPARATOR) + '\n';
            }
        });

        // Append custom lines after the GARBAGE AND CUSTOM LINES section
        csvContent += customLines;

        if (addGibberishLines) {
            csvContent += `,,[GIBBERISH LINES FOR PERFORMANCE TESTING]${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;
            for (let i = 0; i < 80000; i++) {
                const gibberish = generateGibberish(50); // Generate 50-character gibberish
                csvContent += `NEW,,${escapeCSV(gibberish)}${CSV_SEPARATOR.repeat(languageSymbols.length + 1)}\n`;
            }
        }

        // Write the CSV file
        fs.writeFile(filePath, csvContent, { encoding: 'utf8' }, (err) => {
            if (err) {
                //console.error('Error writing CSV file:', err);
            } else {
                //console.log('Messages updated in:', filePath);
            }
        });
    }

    function escapeCSV(text) {
        if (typeof text !== 'string') {
            return text;
        }
        if (text.includes('"') || text.includes(CSV_SEPARATOR) || text.includes('\n') || text.includes('\r')) {
            return '"' + text.replace(/"/g, '""') + '"';
        }
        return text;
    }

    function parseCSV(text) {
        const separator = detectCSVSeparatorFromContent(text);
        const lines = [];
        let currentLine = [];
        let currentField = '';
        let withinQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') {
                if (withinQuotes && text[i + 1] === '"') {
                    currentField += '"';
                    i++;
                } else {
                    withinQuotes = !withinQuotes;
                }
            } else if (char === separator && !withinQuotes) {
                currentLine.push(currentField);
                currentField = '';
            } else if ((char === '\n' || char === '\r') && !withinQuotes) {
                if (char === '\r' && text[i + 1] === '\n') {
                    i++; // Skip the next \n for \r\n line endings
                }
                currentLine.push(currentField);
                lines.push(currentLine);
                currentLine = [];
                currentField = '';
            } else {
                currentField += char;
            }
        }

        if (currentField) {
            currentLine.push(currentField);
        }
        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return lines;
    }

    let wordTranslations = {};
	
    function loadTranslations(lang) {
        let filePath = 'game_messages.csv';
        translations = {}; // Clear existing translations
        wordTranslations = {}; // Clear existing word translations
        wordTranslationRegexes.clear(); // Clear existing word translation regexes
        translationCache = {}; // Clear the translation cache
		contexts = {};

        let content = '';
        if (typeof require === 'function') {
            // Desktop environment
            if (fs.existsSync(filePath)) {
                content = fs.readFileSync(filePath, 'utf8');
            } else {
                // Try www folder next (for deployed projects)
                filePath = path.join('www', filePath);
                if (fs.existsSync(filePath)) {
                    content = fs.readFileSync(filePath, 'utf8');
                } else {
                    console.error('Translation file not found in root or www folder');
                    return;
                }
            }
        } else {
            // Mobile environment
            const xhr = new XMLHttpRequest();
            xhr.open('GET', filePath, false);
            xhr.overrideMimeType('text/plain; charset=utf-8');
            try {
                xhr.send();
                if (xhr.status === 200) {
                    content = xhr.responseText;
                } else {
                    throw new Error('HTTP status: ' + xhr.status);
                }
            } catch (e) {
                console.error('Failed to load translations file:', e.message);
                return;
            }
        }

        if (!content) {
            console.error('No content loaded from translations file');
            return;
        }

        const lines = parseCSV(content);
        if (lines.length > 0) {
            const headers = lines[0];
            const yepNameIndex = headers.indexOf('Excluded');
            const originalIndex = headers.indexOf('Original');
			const contextIndex = headers.indexOf('Context');
            const langIndex = headers.indexOf(lang);

            availableLanguages = [];

            // Check which languages have non-empty columns
            languages.forEach(langObj => {
                const langColIndex = headers.indexOf(langObj.Symbol);
                if (langColIndex !== -1) {
                    let hasTranslation = false;
                    for (let j = 1; j < lines.length; j++) {
                        if (lines[j][langColIndex] && lines[j][langColIndex].trim() !== '') {
                            hasTranslation = true;
                            break;
                        }
                    }
                    if (hasTranslation) {
                        availableLanguages.push(langObj.Symbol);
                    }
                }
            });

            // If the current language is not available, switch to the first available language
            if (!availableLanguages.includes(currentLanguage)) {
                currentLanguage = availableLanguages[0] || defaultLanguage;
                ConfigManager.language = currentLanguage;
            }
            //////////////////////////////////////////////////////

            if (originalIndex !== -1 && langIndex !== -1 && yepNameIndex !== -1) {
                for (let i = 1; i < lines.length; i++) {
                    const columns = lines[i];
                    if (columns.length > Math.max(originalIndex, langIndex, yepNameIndex)) {
                        const originalText = columns[contextIndex]+columns[originalIndex];
                        const translatedText = columns[langIndex].replace(/\n/g, '{{LINEBREAK}}');
                        const yepName = columns[yepNameIndex];

                        if (originalText && translatedText) {
                            translations[originalText] = translatedText;

                            if (yepName) {
                                translations[yepName + originalText] = translatedText;
                                // Store word-level translations only for Excluded words
                                wordTranslations[yepName] = translatedText;
                            }

                            //translations[originalText.replace(/\n/g, ' ')] = translatedText;

                            // const originalLines = originalText.split('\n');
                            // const translatedLines = translatedText.split('\n');
                            // const maxLines = Math.max(originalLines.length, translatedLines.length);

                            // for (let j = 0; j < maxLines; j++) {
                            //    const origLine = j < originalLines.length ? originalLines[j].trim() : '';
                            //    const transLine = j < translatedLines.length ? translatedLines[j].trim() : '';

                            //    if (origLine && !translations[origLine]) {
                            //        translations[origLine] = transLine;
                            //    }

                            //    if (j >= originalLines.length && transLine) {
                            //        translations[`__EXTRA_LINE_${j - originalLines.length}__${originalText}`] = transLine;
                            //    }
                            //  }
                        }
                    }
                }
            }
        }

        originalTexts.length = 0; // Clear the array
        //Object.keys(translations).sort((a, b) => b.length - a.length).forEach(key => originalTexts.push(key));
        Object.keys(translations)
            .sort((a, b) => b.length - a.length)
            .forEach(key => originalTexts.push(key));

        //console.log('Loaded translations:', translations);
        //console.log('Updated originalTexts:', originalTexts);
    }

    Game_Message.prototype.messageBuffer = [];

    const _Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function (text) {
        if (this._scrollMode || ($gameParty.inBattle() && !$gameMessage._showFast)) {
            this._texts.push(text);
        } else {
            this.messageBuffer.push(text);
        }
    };

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        if ($gameMessage.messageBuffer) {
            $gameMessage.messageBuffer = [];
        }
        _Scene_Map_start.call(this);
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        if ($gameMessage.messageBuffer) {
            $gameMessage.messageBuffer = [];
        }
        _Game_Map_setup.call(this, mapId);
    };

    // Play Movies
    const _Game_Interpreter_command261 = Game_Interpreter.prototype.command261;
    Game_Interpreter.prototype.command261 = function () {
        let filename = Utils.RPGMAKER_NAME === "MV" ? this._params[0] : arguments[0][0];
        const originalHadWebm = filename.toLowerCase().endsWith('.webm');

        if (!originalHadWebm) {
            filename += '.webm';
        }

        let translatedName = translations[filename] || filename;

        if (!originalHadWebm && translatedName.toLowerCase().endsWith('.webm')) {
            translatedName = translatedName.slice(0, -5);
        }

        if (Utils.RPGMAKER_NAME === "MV") {
            this._params[0] = translatedName;
            return _Game_Interpreter_command261.call(this);
        } else {
            arguments[0][0] = translatedName;
            return _Game_Interpreter_command261.call(this, arguments[0]);
        }
    };

    // Script Call
    const _Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function (params) {
        const scriptText = Utils.RPGMAKER_NAME === 'MZ' ? params[0] : this._params[0];

        let allLines = [scriptText];
        let nextIndex = this._index + 1;
        while (this._list[nextIndex] && this._list[nextIndex].code === 655) {
            allLines.push(Utils.RPGMAKER_NAME === 'MZ' ?
                this._list[nextIndex].parameters[0] :
                this._list[nextIndex].parameters[0]);
            nextIndex++;
        }

        const processedLines = allLines.map(line => {
            return line.replace(/"([^"]*)"/g, (match, p1) => {
                const translated = translateText(p1);
                return `"${translated}"`;
            });
        });

        if (Utils.RPGMAKER_NAME === 'MZ') {
            params[0] = processedLines[0];
            for (let i = 1; i < processedLines.length; i++) {
                this._list[this._index + i].parameters[0] = processedLines[i];
            }
            return _Game_Interpreter_command355.call(this, params);
        } else {
            this._params[0] = processedLines[0];
            for (let i = 1; i < processedLines.length; i++) {
                this._list[this._index + i].parameters[0] = processedLines[i];
            }
            return _Game_Interpreter_command355.call(this);
        }
    };

    // Handle single continuation lines (in case they're called directly)
    const _Game_Interpreter_command655 = Game_Interpreter.prototype.command655;
    Game_Interpreter.prototype.command655 = function (params) {
        const scriptText = Utils.RPGMAKER_NAME === 'MZ' ? params[0] : this._params[0];
        const script = scriptText.replace(/"([^"]*)"/g, (match, p1) => {
            const translated = translateText(p1);
            return `"${translated}"`;
        });
        if (Utils.RPGMAKER_NAME === 'MZ') {
            params[0] = script;
            return _Game_Interpreter_command655.call(this, params);
        } else {
            this._params[0] = script;
            return _Game_Interpreter_command655.call(this);
        }
    };

    // Fix for script call showMessage add
    const _Game_Interpreter_command355_orig = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function () {
        const result = _Game_Interpreter_command355_orig.apply(this, arguments);
        if ($gameMessage.messageBuffer && $gameMessage.messageBuffer.length > 0) {
            $gameMessage.processMessageBuffer();
        }
        return result;
    };

    const _Game_Interpreter_command655_orig = Game_Interpreter.prototype.command655;
    Game_Interpreter.prototype.command655 = function () {
        const result = _Game_Interpreter_command655_orig.apply(this, arguments);
        if ($gameMessage.messageBuffer && $gameMessage.messageBuffer.length > 0) {
            $gameMessage.processMessageBuffer();
        }
        return result;
    };

    // SCROLL TEXT_____________________________________
    const _Window_ScrollText_initialize = Window_ScrollText.prototype.initialize;
    Window_ScrollText.prototype.initialize = function () {
        if (Utils.RPGMAKER_NAME === "MV") {
            _Window_ScrollText_initialize.call(this);
        } else {
            const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
            _Window_ScrollText_initialize.call(this, rect);
        }
        this._originalLines = 0;
    };

    const _Window_ScrollText_startMessage = Window_ScrollText.prototype.startMessage;
    Window_ScrollText.prototype.startMessage = function () {
        this._originalLines = $gameMessage._texts.length;  // Store original line count
        let fullText = $gameMessage._texts.join('\n');     // Join all text
        let translatedText = translateText(fullText);      // Translate the full text
        $gameMessage._texts = translatedText.split('\n');  // Split back into lines

        _Window_ScrollText_startMessage.call(this);
    };

    //___________________________________________________
    Game_Message.prototype.processMessageBuffer = Game_Message.prototype.processMessageBuffer || function () {
        if (!this.messageBuffer.length) return;

        const fullMessage = this.messageBuffer.join('\n');
        let processedText = fullMessage;

        // Only add WordWrap tag if YEP_MessageCore is imported and word wrap is enabled
        if (Imported['YEP_MessageCore'] && $gameSystem.wordWrap()) {
            processedText = '<WordWrap>' + processedText;
        }

        const translatedText = translateText(processedText);
        this.messageBuffer = [];

        translatedText.split('\n').forEach(line => {
            _Game_Message_add.call(this, line);
        });
    };

    if (Utils.RPGMAKER_NAME === "MV") {
        if (Imported['YEP_MessageCore']) {
            Game_Interpreter.prototype.command101 = function () {
                if (!$gameMessage.isBusy()) {
                    $gameMessage.setFaceImage(this._params[0], this._params[1]);
                    $gameMessage.setBackground(this._params[2]);
                    $gameMessage.setPositionType(this._params[3]);

                    if (this._params[4]) {
                        $gameMessage.addText(this._params[4]);
                    }

                    while (this.isContinueMessageString()) {
                        this._index++;
                        if (this._list[this._index].code === 401) {
                            $gameMessage.add(this.currentCommand().parameters[0]);
                        }
                        if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
                    }

                    $gameMessage.processMessageBuffer();

                    switch (this.nextEventCode()) {
                        case 102:
                            this._index++;
                            this.setupChoices(this.currentCommand().parameters);
                            break;
                        case 103:
                            this._index++;
                            this.setupNumInput(this.currentCommand().parameters);
                            break;
                        case 104:
                            this._index++;
                            this.setupItemChoice(this.currentCommand().parameters);
                            break;
                    }
                    this._index++;
                    this.setWaitMode('message');
                }
                return false;
            };
        } else {
            const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
            Game_Interpreter.prototype.command101 = function () {
                const result = _Game_Interpreter_command101.call(this);
                $gameMessage.processMessageBuffer();
                return result;
            };
        }
    } else if (Utils.RPGMAKER_NAME === "MZ") {
        const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
        Game_Interpreter.prototype.command101 = function (params) {
            const result = _Game_Interpreter_command101.call(this, params);
            $gameMessage.processMessageBuffer();
            return result;
        };
    }

    const _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function (variableId, value) {
        if (typeof value === 'string') {
            const translationKey = `__VARIABLE__${variableId}__`;
            if (translations.hasOwnProperty(translationKey)) {
                value = translations[translationKey];
            } else {
                value = translateText(value);
            }
        }
        _Game_Variables_setValue.call(this, variableId, value);
    };

    // Overdrive drawText but drawn on Bitmap sprites rather than Window
    const _Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function (text, x, y, maxWidth, lineHeight, align) {
        const translatedText = translateText(String(text));
        _Bitmap_drawText.call(this, translatedText, x, y, maxWidth, lineHeight, align);
    };

    // Override drawTextEx method so other plugins will be affected
    const _Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function (text, x, y, width) {
        if (text) {
            text = Hendrix_Localization(text);
            const originalHendrixLocalization = window.Hendrix_Localization;
            window.Hendrix_Localization = function (innerText) {
                return innerText;
            };
            const result = _Window_Base_drawTextEx.call(this, text, x, y, width);
            window.Hendrix_Localization = originalHendrixLocalization;
            return result;
        } else {
            return 0;
        }
    };

    // Adapt choice length to translated text, only for MZ
    if (Utils.RPGMAKER_NAME === "MZ") {
        const _Game_Message_setChoices = Game_Message.prototype.setChoices;
        Game_Message.prototype.setChoices = function (choices, defaultType, cancelType) {
            const translatedChoices = choices.map(choice => {
                const escapeCodes = choice.match(/<.*?>/g) || [];
                let textContent = choice;
                escapeCodes.forEach(code => {
                    textContent = textContent.replace(code, '');
                });
                let translatedText = translations[textContent] || textContent;

                escapeCodes.forEach(code => {
                    const originalIndex = choice.indexOf(code);
                    if (originalIndex === 0) {
                        translatedText = code + translatedText;
                    } else {
                        translatedText = translatedText + code;
                    }
                });

                return translatedText;
            });

            _Game_Message_setChoices.call(this, translatedChoices, defaultType, cancelType);
        };

        const _Window_NameBox_windowWidth = Window_NameBox.prototype.windowWidth;
        Window_NameBox.prototype.windowWidth = function () {
            if (this._name) {
                const cleanName = (translations[this._name] || this._name).replace(/<[^>]*>/g, '');
                return Math.ceil(this.textWidth(cleanName) + this.padding * 2 + this.itemPadding() * 2);
            } else {
                return _Window_NameBox_windowWidth.call(this);
            }
        };
    }

    // Fix choice issue: Escape code from database doesn't translate (YEP Message Core)
    if (Utils.RPGMAKER_NAME === "MV") {
        if (Imported['YEP_MessageCore']) {
            const _Game_Message_setChoices = Game_Message.prototype.setChoices;
            Game_Message.prototype.setChoices = function (choices, defaultType, cancelType) {
                const translatedChoices = choices.map(choice => {
                    // Process escape codes like \ii[x] etc
                    const window = SceneManager._scene._messageWindow;
                    if (window) {
                        choice = window.convertEscapeCharacters(choice);
                    }
                    // Then, translate the processed text
                    return Hendrix_Localization(choice);
                });
                _Game_Message_setChoices.call(this, translatedChoices, defaultType, cancelType);
            };
        }
    }

    // Fix Battle Message Troop doesn't translate whole paragraph
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        if ($gameParty.inBattle()) {
            const allText = $gameMessage._texts.join('\n');
            const translatedText = translateText(allText);
            $gameMessage._texts = translatedText.split('\n');
        }
        _Window_Message_startMessage.call(this);
    };

    ConfigManager.language = defaultLanguage;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        const config = _ConfigManager_makeData.call(this);
        config.language = this.language;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        _ConfigManager_applyData.call(this, config);
        this.language = config.language || defaultLanguage;
        currentLanguage = this.language;
        loadTranslations(currentLanguage);
        applyLanguageSettings();
    };

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function () {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand('Language', 'language');
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            const langObj = languages.find(lang => lang.Symbol === ConfigManager.language);
            return langObj ? langObj.Name : '';
        } else {
            return _Window_Options_statusText.call(this, index);
        }
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            this.changeLanguage(1);
        } else {
            _Window_Options_processOk.call(this);
        }
    };

    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function (wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            this.changeLanguage(1);
        } else {
            _Window_Options_cursorRight.call(this, wrap);
        }
    };

    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function (wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            this.changeLanguage(-1);
        } else {
            _Window_Options_cursorLeft.call(this, wrap);
        }
    };

	function getContext()
	{
		
	}

    Window_Options.prototype.changeLanguage = function (direction) {
        const currentIndex = availableLanguages.indexOf(ConfigManager.language);

        let nextIndex = (currentIndex + direction + availableLanguages.length) % availableLanguages.length;

        ConfigManager.language = availableLanguages[nextIndex];
        currentLanguage = ConfigManager.language;

        this.redrawItem(this.findSymbol('language'));
        loadTranslations(currentLanguage);
        applyLanguageSettings();

        if (Imported.YEP_CommonEventMenu) { DataManager.processCEMNotetags1($dataCommonEvents); }

        if (autoRefreshPictures) {
            refreshAllPictures();
        }
        if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
            SceneManager._scene.refreshAllWindows();
        }
        SoundManager.playCursor();
    };

    Scene_Base.prototype.refreshAllWindows = function () {
        if (this._windowLayer) {
            this._windowLayer.children.forEach(child => {
                if (child instanceof Window_Base) {
                    if (child.contents) {
                        child.contents.clear();
                    }
                    if (typeof child.createContents === 'function') {
                        child.createContents();
                    }
                    if (typeof child.refresh === 'function' &&
                        !(child instanceof Window_Message) &&
                        !(child instanceof Window_ChoiceList)) {
                        child.refresh();
                    }
                    if (typeof child.updatePadding === 'function') {
                        child.updatePadding();
                    }
                    if (typeof child.resetFontSettings === 'function') {
                        child.resetFontSettings();
                    }
                }
            });
        }
    };

    function refreshAllPictures() {
        if ($gameScreen && $gameScreen._pictures) {
            for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
                const picture = $gameScreen.picture(i);
                if (picture) {
                    const originalName = picture.originalName;
                    let newName = originalName;
                    if (!newName.toLowerCase().endsWith('.png')) {
                        newName += '.png';
                    }
                    newName = translatePictureName(newName);
                    if (!originalName.toLowerCase().endsWith('.png') && newName.toLowerCase().endsWith('.png')) {
                        newName = newName.slice(0, -4);
                    }
                    picture.changeName(newName);
                }
            }
        }
    }

    Game_Picture.prototype.changeName = function (name) {
        if (this._name !== name) {
            this._name = name;
            this.initTarget();
        }
    };

    Object.defineProperty(Game_Picture.prototype, 'originalName', {
        get: function () {
            return this._originalName || this._name;
        },
        set: function (value) {
            this._originalName = value;
        }
    });


    function translatePictureName(name) {
        if (translations.hasOwnProperty(name)) {
            return translations[name];
        }
        return name;
    }

    function translateText(text,_context="") {
        //console.log('Input to translateText:', text);
        if (typeof text !== 'string') {
            return text;
        }

        if (useTranslationCache && translationCache.hasOwnProperty(_context+text)) {
            return translationCache[_context+text];
        }

        if (text.toLowerCase().endsWith('.png')) {
            return text;
        }

        let translatedText = text;

        if (translations.hasOwnProperty(_context + translatedText)) {
            translatedText = translations[_context + translatedText];
        }else {
            const lines = translatedText.split('\n');
            const translatedLines = lines.map(line => {
                if (translations.hasOwnProperty(_context+line.trim())) {
                    return translations[line.trim()];
                } else if (partialMatching) {
                    // Only this part is affected by partialMatching
                    for (let i = 0, len = originalTexts.length; i < len; i++) {
                        const originalText = originalTexts[i];
                        if (line.includes(originalText)) {
                            return line.replace(originalText, translations[_context+originalText] || originalText);
                        }
                    }
                }
                return line;
            });

            translatedLines[0] = translatedLines[0];
            translatedText = translatedLines.join('\n');
        }

		/*
        // Second pass: word-level translations
        Object.keys(wordTranslations).forEach(word => {
            let regex = wordTranslationRegexes.get(word);
            if (!regex) {
                regex = new RegExp(`${wordBoundaryRegex.source}${escapeRegExp(word)}${wordBoundaryRegex.source}`, 'g');
                wordTranslationRegexes.set(word, regex);
            }
            translatedText = translatedText.replace(regex, wordTranslations[word]);
        });
		*/

        // Replace {{LINEBREAK}} with actual line breaks for display
        translatedText = translatedText.replace(/{{LINEBREAK}}/g, '\n');

        if (useTranslationCache) {
            translationCache[_context+text] = translatedText;
        }
        //console.log('Output from translateText:', translatedText);
        return translatedText;
    }

    // Override drawText method
    //const _Window_Base_drawText = Window_Base.prototype.drawText;
    //Window_Base.prototype.drawText = function (text, x, y, maxWidth, align) {
    //    const translatedText = Hendrix_Localization((text));
    //    _Window_Base_drawText.call(this, translatedText, x, y, maxWidth, align);
    //};


    const _Game_Actor_profile = Game_Actor.prototype.profile;
    Game_Actor.prototype.profile = function () {
        return translateText(_Game_Actor_profile.call(this));
    };

    // Translate Show Pictures and Title background file
    const _Game_Screen_showPicture = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function (pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
        let translatedName = name;
        let originalHadPng = name.toLowerCase().endsWith('.png');

        if (!originalHadPng) {
            translatedName += '.png';
        }
        translatedName = translatePictureName(translatedName);
        if (!originalHadPng && translatedName.toLowerCase().endsWith('.png')) {
            translatedName = translatedName.slice(0, -4);
        }

        _Game_Screen_showPicture.call(this, pictureId, translatedName, origin, x, y, scaleX, scaleY, opacity, blendMode);

        const picture = this.picture(pictureId);
        if (picture) {
            picture._originalName = name;
        }

    };

    const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function () {
        if (!originalTitle1) originalTitle1 = $dataSystem.title1Name;
        if (!originalTitle2) originalTitle2 = $dataSystem.title2Name;

        if (originalTitle1) {
            const title1File = originalTitle1 + '.png';
            const translatedTitle1 = translatePictureName(title1File);
            if (translatedTitle1 !== title1File) {
                $dataSystem.title1Name = translatedTitle1.replace('.png', '');
            }
        }

        if (originalTitle2) {
            const title2File = originalTitle2 + '.png';
            const translatedTitle2 = translatePictureName(title2File);
            if (translatedTitle2 !== title2File) {
                $dataSystem.title2Name = translatedTitle2.replace('.png', '');
            }
        }

        _Scene_Title_createBackground.call(this);
    };
    //---------------------------------------------------------

    Window_Help.prototype.refresh = function () {
        this.contents.clear();
        if (this._text) {
            const translatedText = translateText(this._text);
            if (this.baseTextRect) {
                // MZ version
                const rect = this.baseTextRect();
                this.drawTextEx(translatedText, rect.x, rect.y, rect.width);
            } else {
                // MV version
                const rect = {
                    x: this.textPadding(),
                    y: 0,
                    width: this.contents.width - this.textPadding() * 2,
                    height: this.contents.height
                };
                this.drawTextEx(translatedText, rect.x, rect.y, rect.width);
            }
        }
    };

    if (!Window_Base.prototype.calcTextWidth) {
        Window_Base.prototype.calcTextWidth = function (text) {
            var tempText = text.split('\n');
            var maxWidth = 0;
            for (var i = 0; i < tempText.length; i++) {
                var textWidth = this.textWidth(tempText[i]);
                if (maxWidth < textWidth) {
                    maxWidth = textWidth;
                }
            }
            return maxWidth;
        };
    }

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        if (code === 'T') {
            const endIndex = textState.text.indexOf(']', textState.index);
            const textToTranslate = textState.text.substring(textState.index, endIndex);
            const translatedText = translateText(textToTranslate);
            textState.text = textState.text.replace(`T[${textToTranslate}]`, translatedText);
            textState.index = endIndex + 1;
        } else {
            _Window_Base_processEscapeCharacter.call(this, code, textState);
        }
    };

    window.Hendrix_Localization = function (text) {
        if (typeof translateText === 'function') {
            return translateText(text);
        }
        return text;
    };

    if (Imported['Galv_MessageStyles']) {
        Window_Message.prototype.changeWindowDimensions = function () {
            if (this.pTarget != null) {
                var w = 10;
                var h = 0;

                if (Imported.Galv_MessageBusts) {
                    if ($gameMessage.bustPos == 1) {
                        var faceoffset = 0;
                    } else {
                        var faceoffset = Galv.MB.w;
                    };
                } else {
                    var faceoffset = Window_Base._faceWidth + 25;
                };
                var xO = $gameMessage._faceName ? faceoffset : 0;
                xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

                this.resetFontSettings();
                for (var i = 0; i < $gameMessage._texts.length; i++) {
                    var lineWidth = this.testWidthEx($gameMessage._texts[i]) + this.standardPadding() * 2 + xO;
                    if (w < lineWidth) w = lineWidth;

                };
                this.resetFontSettings();
                this.width = Math.min(Graphics.boxWidth, w);

                var minFaceHeight = 0;
                if ($gameMessage._faceName) {
                    w += 15;
                    if (Imported.Galv_MessageBusts) {
                        if ($gameMessage.bustPos == 1) w += Galv.MB.w;
                        minFaceHeight = 0;
                    } else {
                        minFaceHeight = Window_Base._faceHeight + this.standardPadding() * 2;
                    };
                };

                var textState = { index: 0 };
                textState.text = this.convertEscapeCharacters($gameMessage.allText());
                var allLineHeight = this.calcTextHeight(textState, true);
                var height = allLineHeight + this.standardPadding() * 2;
                var minHeight = this.fittingHeight(0);
                this.height = Math.max(height, minHeight, minFaceHeight);
                this.yOffset = -Galv.Mstyle.yOffet - this.height;

            } else {
                this.yOffset = 0;
                this.width = this.windowWidth();
                this.height = Galv.Mstyle.Window_Message_windowHeight.call(this);
                this.x = (Graphics.boxWidth - this.width) / 2;
            };
        };
    }

    if (Imported.YEP_CommonEventMenu) {
        DataManager.processCEMNotetags1 = function (group) {
            for (var n = 1; n < group.length; n++) {
                var obj = group[n];
                var notedata = this.convertCommentsToText(obj);

                obj.iconIndex = Yanfly.Param.CEMIcon;
                obj.description = Hendrix_Localization(Yanfly.Param.CEMHelpDescription);
                obj.picture = '';
                obj.menuSettings = {
                    name: obj.name,
                    subtext: Hendrix_Localization(Yanfly.Param.CEMSubtext),
                    enabled: 'enabled = true',
                    show: 'visible = true'
                };
                var evalMode = 'none';

                for (var i = 0; i < notedata.length; i++) {
                    var line = notedata[i];
                    if (line.match(/<MENU NAME:[ ](.*)>/i)) {
                        var translatedLine = Hendrix_Localization(line);
                        if (translatedLine.match(/<MENU NAME:[ ](.*)>/i)) {
                            obj.menuSettings.name = String(RegExp.$1);
                        } else {
                            var menuName = String(RegExp.$1);
                            obj.menuSettings.name = Hendrix_Localization(menuName);
                        }
                    } else if (line.match(/<ICON:[ ](\d+)>/i)) {
                        obj.iconIndex = parseInt(RegExp.$1);
                    } else if (line.match(/<PICTURE:[ ](.*)>/i)) {
                        obj.picture = String(RegExp.$1);
                    } else if (line.match(/<HELP DESCRIPTION>/i)) {
                        evalMode = 'help description';
                        obj.description = '';
                    } else if (line.match(/<\/HELP DESCRIPTION>/i)) {
                        evalMode = 'none';
                        obj.description = Hendrix_Localization(obj.description);
                    } else if (evalMode === 'help description') {
                        obj.description += line + '\n';
                    } else if (line.match(/<SUBTEXT>/i)) {
                        evalMode = 'subtext';
                        obj.menuSettings.subtext = '';
                    } else if (line.match(/<\/SUBTEXT>/i)) {
                        evalMode = 'none';
                        obj.menuSettings.subtext = Hendrix_Localization(obj.menuSettings.subtext);
                    } else if (evalMode === 'subtext') {
                        obj.menuSettings.subtext += line + '\n';
                    } else if (line.match(/<MENU ENABLE EVAL>/i)) {
                        evalMode = 'menu enable eval';
                        obj.menuSettings.enabled = '';
                    } else if (line.match(/<\/MENU ENABLE EVAL>/i)) {
                        evalMode = 'none';
                    } else if (evalMode === 'menu enable eval') {
                        obj.menuSettings.enabled += line + '\n';
                    } else if (line.match(/<MENU VISIBLE EVAL>/i)) {
                        evalMode = 'menu visible eval';
                        obj.menuSettings.show = '';
                    } else if (line.match(/<\/MENU VISIBLE EVAL>/i)) {
                        evalMode = 'none';
                    } else if (evalMode === 'menu visible eval') {
                        obj.menuSettings.show += line + '\n';
                    }
                }
            }
        };
    }

    if (Imported.YEP_ItemCore) {
        Window_ItemInfo.prototype.drawInfoTextTop = function (dy) {
            var item = this._item;
            if (item.infoTextTop === undefined) {
                item.infoTextTop = DataManager.getBaseItem(item).infoTextTop;
            }
            if (item.infoTextTop === '') return dy;
            var fullText = Hendrix_Localization(item.infoTextTop);
            var info = fullText.split(/[\r\n]+/);

            for (var i = 0; i < info.length; ++i) {
                var line = "\\fs[20]" + info[i];
                this.drawTextEx(line, this.textPadding(), dy);
                dy += this.contents.fontSize + 8;
            }
            return dy;
        };

        Window_ItemInfo.prototype.drawInfoTextBottom = function (dy) {
            var item = this._item;
            if (item.infoTextBottom === undefined) {
                item.infoTextBottom = DataManager.getBaseItem(item).infoTextBottom;
            }
            if (item.infoTextBottom === '') return dy;
            var fullText = Hendrix_Localization(item.infoTextBottom);
            var info = fullText.split(/[\r\n]+/);

            for (var i = 0; i < info.length; ++i) {
                var line = info[i];
                this.resetFontSettings();
                this.drawTextEx(line, this.textPadding(), dy);
                dy += this.contents.fontSize + 8;
            }
            return dy;
        };
    }

    if (Imported.Tyruswoo_BigChoiceLists) {
        Game_Interpreter.prototype.command402 = function (params) {
            if (this._branch[this._indent] !== Hendrix_Localization(params[1])) {
                this.skipBranch();
            }
            return true;
        };
    }

    if (addLanguageCommandToTitle) {
        const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
        Scene_Title.prototype.createCommandWindow = function () {
            _Scene_Title_createCommandWindow.call(this);
            this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
        };

        const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function () {
            _Window_TitleCommand_makeCommandList.call(this);
            this._list = this._list.filter(command => command.symbol !== 'language');
            this.addCommand('Language: ' + this.currentLanguageName(), 'language');
        };

        Window_TitleCommand.prototype.currentLanguageName = function () {
            const currentLang = languages.find(lang => lang.Symbol === ConfigManager.language);
            return currentLang ? currentLang.Name : 'English';
        };

        Scene_Title.prototype.commandLanguage = function () {
            this.changeLanguage(1);
            this._commandWindow.activate();
            this._commandWindow.selectSymbol('language');
        };

        Scene_Title.prototype.changeLanguage = function (direction) {
            // Use availableLanguages instead of languageSymbols
            const currentIndex = availableLanguages.indexOf(ConfigManager.language);
            let nextIndex = (currentIndex + direction + availableLanguages.length) % availableLanguages.length;

            ConfigManager.language = availableLanguages[nextIndex];
            currentLanguage = ConfigManager.language;

            this._commandWindow.refresh();
            loadTranslations(currentLanguage);
            applyLanguageSettings();

            if (Imported.YEP_CommonEventMenu) { DataManager.processCEMNotetags1($dataCommonEvents); }

            if (autoRefreshPictures) {
                refreshAllPictures();
            }
            if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
                if (this._commandWindow) {
                    this._commandWindow.refresh();
                }
            }
            ConfigManager.save();
        };
    }

    window.changeToLanguage = function (languageSymbol) {
        if (languageSymbol === 'next') {
            const currentIndex = availableLanguages.indexOf(ConfigManager.language);
            const nextIndex = (currentIndex + 1) % availableLanguages.length;
            languageSymbol = availableLanguages[nextIndex];
        }

        // Validate that the language exists in availableLanguages
        if (availableLanguages.includes(languageSymbol)) {
            ConfigManager.language = languageSymbol;
            currentLanguage = languageSymbol;

            loadTranslations(currentLanguage);
            applyLanguageSettings();

            if (autoRefreshPictures) {
                refreshAllPictures();
            }

            if (SceneManager._scene && SceneManager._scene.refreshAllWindows) {
                SceneManager._scene.refreshAllWindows();
            }

            ConfigManager.save();
            SoundManager.playCursor();

            return true;
        }
        return false;
    };

    //=================================================================
    // BATTLE %1 STUFF
    //=================================================================

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function (subject, item) {
        if (item && item.message1) {
            item.message1 = translateText(item.message1);
        }
        if (item && item.message2) {
            item.message2 = translateText(item.message2);
        }
        _Window_BattleLog_displayAction.call(this, subject, item);
    };

    const _Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function (target) {
        const tempMakeHpDamageText = Game_Action.prototype.makeHpDamageText;
        Game_Action.prototype.makeHpDamageText = function (target) {
            const format = tempMakeHpDamageText.call(this, target);
            return translateText(format);
        };
        _Window_BattleLog_displayDamage.call(this, target);
        Game_Action.prototype.makeHpDamageText = tempMakeHpDamageText;
    };

    const _Window_BattleLog_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
    Window_BattleLog.prototype.displayAddedStates = function (target) {
        const states = target.result().addedStateObjects();
        for (const state of states) {
            if (state.message1) {
                state.message1 = translateText(state.message1);
            }
            if (state.message2) {
                state.message2 = translateText(state.message2);
            }
        }
        _Window_BattleLog_displayAddedStates.call(this, target);
    };

    const _Window_BattleLog_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates;
    Window_BattleLog.prototype.displayRemovedStates = function (target) {
        const states = target.result().removedStateObjects();
        for (const state of states) {
            if (state.message3) {
                state.message3 = translateText(state.message3);
            }
            if (state.message4) {
                state.message4 = translateText(state.message4);
            }
        }
        _Window_BattleLog_displayRemovedStates.call(this, target);
    };

    const _TextManager_getter = Object.getOwnPropertyDescriptors(TextManager);
    for (const prop in _TextManager_getter) {
        if (_TextManager_getter[prop].get) {
            const originalGetter = _TextManager_getter[prop].get;
            Object.defineProperty(TextManager, prop, {
                get: function () {
                    return translateText(originalGetter.call(this));
                },
                configurable: true
            });
        }
    }
})();