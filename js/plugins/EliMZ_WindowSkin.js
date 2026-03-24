//==========================================================================
// EliMZ_WindowSkin.js *
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMZ_SmartSpeaker

@plugindesc ♦2.0.2♦ Can change the skin and other settings of any window mid-game.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-change-window-skin-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Plugin Requirements
============================================================================

If it stays at the bottom of your plugin list, it will probably overwrite 
all other plugins that sets a window skin file for windows.

============================================================================
Features
============================================================================

● Set different window skin for any window.
● Set window skin for all windows.
● Set window skin according to the scene.
● Change window skin through the options scene!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1YGEQWTTbHNvJZF_P1KBu334YB3jAgK3wKcpICbtUxJU/edit?usp=sharing

============================================================================

@param saveChanges
@text Save changes
@type boolean
@desc Set true if you want to store the changes in the savefile.
@default false

@param defaultWinSettings
@text Default Window Settings
@type struct<defaultSettingSt>
@desc The default settings applied to windows that does not have a custom settings.
@default

@param windowList
@text Window Settings
@type struct<allSkins>[]
@desc Select here if you want a custom skin for a window.
@default []

@param fixTextColor
@text Fix Text Color
@type boolean
@desc Set true if you want to get the text color from the windowskin.png color list.
@default true

@param fixOutlineTextColor
@text Fix Outline Text Color
@type boolean
@desc Set true if you want to get the outline text color from the windowskin.png color list.
@default true

@param sceneList
@text Scene Settings
@type struct<allSceneSkins>[]
@desc Set a default window skin for a scene.
@default []

@param options
@text Options Settings
@type struct<optionsStruct>
@desc Set true if you want to create an option command to change the window skin.
@default true

@command cmd_changeWindowSettings
@text Change Window Settings
@desc Select the window you want to change the settings.

    @arg name
    @text Window names
    @type combo[]
    @option Window_ActorCommand @option Window_BattleActor @option Window_BattleEnemy @option Window_BattleItem @option Window_BattleLog @option Window_BattleSkill @option Window_BattleStatus @option Window_ChoiceList @option Window_CommandInfo @option Window_DebugEdit @option Window_DebugRange @option Window_DescriptionInfo @option Window_EquipCommand @option Window_EquipItem @option Window_EquipSlot @option Window_EquipStatus @option Window_EventItem @option Window_FaceMessage @option Window_GameEnd @option Window_Gold @option Window_Help @option Window_HelpActorCommand @option Window_HelpChoice @option Window_HelpNumberInput @option Window_HelpPartyCommand @option Window_HelpSelectItem @option Window_HelpTitle @option Window_ItemCategory @option Window_ItemList @option Window_LoadPoint @option Window_MapName @option Window_MapSelectCommand @option Window_MenuActor @option Window_MenuCommand @option Window_MenuStatus @option Window_Message @option Window_Minimap @option Window_NameBox @option Window_NameEdit @option Window_NameInput @option Window_NumberInput @option Window_Options @option Window_PartyCommand @option Window_Preview @option Window_SavefileList @option Window_SavePoint @option Window_ScrollText @option Window_ShopBuy @option Window_ShopCommand @option Window_ShopNumber @option Window_ShopSell @option Window_ShopStatus @option Window_SkillList @option Window_SkillStatus @option Window_SkillType @option Window_SoundList @option Window_SoundMainCategory @option Window_SoundPlaying @option Window_SoundSceneTitle @option Window_SoundSubCategory @option Window_Status @option Window_StatusEquip @option Window_StatusParam @option Window_TitleCommand @option Window_TitleInfo @option Window_ToastInfo 
    @desc Type the name of the window. It is case sensitive.
    @default []

    @arg id
    @text Id
    @type text
    @desc Choose a window settings from the plugin parameters by their ID.
    @default

    @arg --- New Config ---

    @arg newId
    @text New ID
    @type text
    @desc An unique ID that will hold this new configuration.
    @default

    @arg skin
    @text Skin file
    @type file
    @dir img/system
    @desc Choose a window skin file
    @default

    @arg tone
    @text Window Tone
    @type text
    @dir img/system
    @desc The window tone on the format R, G, B. Leave empty to not use.
    @default 0,0,0

    @arg useSceneSkin
    @text Use Scene Skin
    @type boolean
    @desc If true, this window will get the skin from the scene parameters, if there is one.
    @default false

@command cmd_changeWindowSceneSettings
@text Change Scene Settings
@desc Select the scene you want to change the window settings.

    @arg name
    @text Scene name
    @type combo[]
    @option Scene_Battle @option Scene_Debug @option Scene_Equip @option Scene_GameEnd @option Scene_Gameover @option Scene_Item @option Scene_Load @option Scene_Map @option Scene_MapSelect @option Scene_Menu @option Scene_MenuInfo @option Scene_Minimap @option Scene_Name @option Scene_Name @option Scene_Options @option Scene_Save @option Scene_Shop @option Scene_Skill @option Scene_SoundTest @option Scene_Status @option Scene_Title 
    @desc Type the name of the scene. It is case sensitive.
    @default []

    @arg id
    @text Id
    @type text
    @desc Choose a window settings from the plugin parameters by their ID.
    @default

    @arg --- New Config ---

    @arg newId
    @text ID
    @type text
    @desc An unique ID that will hold this new configuration.
    @default

    @arg skin
    @text Skin file
    @type file
    @dir img/system
    @desc Choose a window skin file
    @default

    @arg tone
    @text Window Tone
    @type text
    @dir img/system
    @desc The window tone on the format R, G, B. Leave empty to not use.
    @default 0,0,0

@command cmd_changeAllWindowSettings
@text Change All Window Settings
@desc Change all window settings making this one the default.

    @arg id
    @text Id
    @type text
    @desc Choose a window settings from the plugin parameters by their ID.
    @default

    @arg overwrite
    @text Overwrite Settings
    @type boolean
    @desc If true, the selected skin will be applied to all windows, regardless they have a specific skin already.
    @default true

    @arg --- New Config ---

    @arg newId
    @text New ID
    @type text
    @desc An unique ID that will hold this new configuration.
    @default

    @arg skin
    @text Skin file
    @type file
    @dir img/system
    @desc Choose a window skin file for all windows.
    @default

    @arg tone
    @text Window Tone
    @type text
    @dir img/system
    @desc The window tone on the format R, G, B. Leave empty to not use.
    @default 0,0,0

*/

/* ---------------------------- DEFAULT SETTINGS ---------------------------- */
{

/*~struct~defaultSettingSt:

@param skin
@text Skin file
@type file
@dir img/system
@desc Choose a window skin file
@default

@param tone
@text Window Tone
@type text
@dir img/system
@desc The window tone on the format R, G, B.
@default 0,0,0

@param id
@text Setting Id/Name
@type text
@desc Cannot be a number. Works like an id. Will also be name shown on the options for this setting.
@default Default

*/

}

/* -------------------------------- ALL SKINS ------------------------------- */
{

/*~struct~allSkins:

@param name
@text Window name
@type combo[]
@option Window_ActorCommand @option Window_BattleActor @option Window_BattleEnemy @option Window_BattleItem @option Window_BattleLog @option Window_BattleSkill @option Window_BattleStatus @option Window_ChoiceList @option Window_CommandInfo @option Window_DebugEdit @option Window_DebugRange @option Window_DescriptionInfo @option Window_EquipCommand @option Window_EquipItem @option Window_EquipSlot @option Window_EquipStatus @option Window_EventItem @option Window_FaceMessage @option Window_GameEnd @option Window_Gold @option Window_Help @option Window_HelpActorCommand @option Window_HelpChoice @option Window_HelpNumberInput @option Window_HelpPartyCommand @option Window_HelpSelectItem @option Window_HelpTitle @option Window_ItemCategory @option Window_ItemList @option Window_LoadPoint @option Window_MapName @option Window_MapSelectCommand @option Window_MenuActor @option Window_MenuCommand @option Window_MenuStatus @option Window_Message @option Window_Minimap @option Window_NameBox @option Window_NameEdit @option Window_NameInput @option Window_NumberInput @option Window_Options @option Window_PartyCommand @option Window_Preview @option Window_SavefileList @option Window_SavePoint @option Window_ScrollText @option Window_ShopBuy @option Window_ShopCommand @option Window_ShopNumber @option Window_ShopSell @option Window_ShopStatus @option Window_SkillList @option Window_SkillStatus @option Window_SkillType @option Window_SoundList @option Window_SoundMainCategory @option Window_SoundPlaying @option Window_SoundSceneTitle @option Window_SoundSubCategory @option Window_Status @option Window_StatusEquip @option Window_StatusParam @option Window_TitleCommand @option Window_TitleInfo @option Window_ToastInfo 
@desc Type the name of the window. It is case sensitive.
@default Window_Base

@param skin
@text Skin file
@type file
@dir img/system
@desc Choose a window skin file
@default

@param tone
@text Window Tone
@type text
@dir img/system
@desc The window tone on the format R, G, B. Leave empty to not use.
@default 0,0,0

@param useSceneSkin
@text Use Scene Skin
@type boolean
@desc If true, this window will get the skin from the scene parameters, if there is one.
@default false

@param id
@text Setting Id/Name
@type text
@desc Cannot be a number. Works like an id. Will also be name shown on the options for this setting.
@default 

*/

}

/* ----------------------------- ALL SCENE SKINS ---------------------------- */
{
/*~struct~allSceneSkins:

@param name
@text Scene name
@type combo[]
@option Scene_Battle @option Scene_Debug @option Scene_Equip @option Scene_GameEnd @option Scene_Gameover @option Scene_Item @option Scene_Load @option Scene_Map @option Scene_MapSelect @option Scene_Menu @option Scene_MenuInfo @option Scene_Minimap @option Scene_Name @option Scene_Name @option Scene_Options @option Scene_Save @option Scene_Shop @option Scene_Skill @option Scene_SoundTest @option Scene_Status @option Scene_Title
@desc Type the name of the scene. It is case sensitive.
@default Scene_Menu

@param skin
@text Skin file
@type file
@dir img/system
@desc Choose a window skin file to this scene.
@default

@param tone
@text Window Tone
@type text
@dir img/system
@desc The window tone on the format R, G, B. Leave empty to not use.
@default 0,0,0

@param id
@text Setting Id/Name
@type text
@desc Cannot be a number. Works like an id. Will also be name shown on the options for this setting.
@default 

*/
}

/* --------------------------------- OPTIONS -------------------------------- */
{

/*~struct~optionsStruct:

@param add
@text Enable Command
@type boolean
@desc Set true if you want to create an option command to change the window skin.
@default true

@param name
@text Options Name
@type text
@desc The name of this command under the options menu.
@default true

@param index
@text Position
@type combo
@option auto
@desc Set a number to the position of the command, or leave auto.
@default auto

@param overwrite
@text Overwrite Settings
@type boolean
@desc If true, the selected skin will be applied to all windows, regardless they have a specific skin already.
@default true

*/

}
    
"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_WindowSkin = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.WindowSkin = {

    Parameters: class{
        constructor(parameters){
            const [winConfigs, winSettingsByName] = this.parseWindowList(JSON.parse(parameters.windowList))
            const [sceneConfigs, sceneSettingsByName] = this.parseSceneList(JSON.parse(parameters.sceneList))
            this.allSkinFiles = []
            this.defaultWinSettings = this.parseDefaultSettings(JSON.parse(parameters.defaultWinSettings))
            this.configList = this.createConfigList([this.defaultWinSettings, ...winConfigs, ...sceneConfigs])
            this.windowSettings = {...winSettingsByName, ...sceneSettingsByName}
            this.options = this.parseOptions(JSON.parse(parameters.options))
            this.fixTextColor = parameters.fixTextColor === "true"
            this.fixOutlineTextColor = parameters.fixOutlineTextColor === "true"
            this.saveChanges = parameters.saveChanges === "true"
        }

        parseWindowList(parameters){
            const configurations = []
            const windowSettings = {}

            for(let i = 0; i < parameters.length; i++){
                const config = JSON.parse(parameters[i])
                const names = JSON.parse(config.name)
                const id = config.id || `Win_${i}`

                for(const name of names){
                    windowSettings[name] = id
                }

                configurations.push({
                    useSceneSkin: config.useSceneSkin === "true",
                    tone: (config.tone || "0,0,0").split(",").map(item => Number(item)),
                    skin: config.skin,
                    id: id,
                })
            }

            return [configurations, windowSettings]
        }

        parseSceneList(parameters){
            const configurations = []
            const sceneSettings = {}

            for(let i = 0; i < parameters.length; i++){
                const config = JSON.parse(parameters[i])
                const names = JSON.parse(config.name)
                const id = config.id  || `Scene_${i}`

                for(const name of names){
                    sceneSettings[name] = id
                }

                configurations.push({
                    tone: (config.tone || "0,0,0").split(",").map(item => Number(item)),
                    skin: config.skin,
                    id: id,
                    useSceneSkin: false,
                })
            }

            return [configurations, sceneSettings]
        }

        parseDefaultSettings(parameters){
            return {
                tone: (parameters.tone || "0,0,0").split(",").map(item => Number(item)),
                skin: parameters.skin,
                useSceneSkin: false,
                id: parameters.id || "Default"
            }
        }

        createConfigList(parameters){
            const config = {}

            for(const param of parameters){
                config[param.id] = param
            }

            return config
        }

        parseOptions(parameters){
            return {
                overwrite: parameters.overwrite === "true",
                add: parameters.add === "true",
                index: parameters.index === "auto" ? -1 : Number(parameters.index),
                name: parameters.name,
            }
        }
    },

    windowsToUpdate: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    initPluginCommands(){
        const commands = ['cmd_changeWindowSettings', 'cmd_changeWindowSceneSettings', 'cmd_changeAllWindowSettings']
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

    getSkinData(){
        if(this.getParam().saveChanges){
            return $eliData.windowSkin()
        }else{
            return this.getParam()
        }
    },

    cmd_changeWindowSettings(args){
        const names = JSON.parse(args.name)
        let config = null

        if(args.id){
            config = this.getSkinData().configList[args.id]

        }else if(args.newId){
            this.getSkinData().configList[args.newId] = {
                skin: args.skin,
                useSceneSkin: args.useSceneSkin === "true",
                tone: (args.tone || "0,0,0").split(",").map(item => Number(item)),
                id: args.newId,
            }
            config = this.getSkinData().configList[args.newId]
        }else{
            alert("You must fill one of the ID arguments")
            return;
        }

        for(const name of names){
            this.getSkinData().windowSettings[name] = config.id
            this.applyAndRefreshSettings()
        }
    },

    cmd_changeWindowSceneSettings(args){
        const names = JSON.parse(args.name)
        let config = null

        if(args.id){
            config = this.getSkinData().configList[args.id]

        }else if(args.newId){
            this.getSkinData().configList[args.newId] = {
                skin: args.skin,
                useSceneSkin: false,
                tone: (args.tone || "0,0,0").split(",").map(item => Number(item)),
                id: args.newId,
            }
            config = this.getSkinData().configList[args.newId]
        }else{
            alert("You must fill one of the ID arguments")
            return;
        }

        for(const name of names){
            this.getSkinData().windowSettings[name] = config.id

            if(name === SceneManager._scene.constructor.name){
                this.applyAndRefreshSettings(SceneManager._scene)
            }
        }
    },

    cmd_changeAllWindowSettings(args){
        let config = null

        if(args.id){
            config = this.getSkinData().configList[args.id]

        }else if(args.newId){
            this.getSkinData().configList[args.newId] = {
                skin: args.skin,
                useSceneSkin: false,
                tone: (args.tone || "0,0,0").split(",").map(item => Number(item)),
                id: args.newId,
            }
            config = this.getSkinData().configList[args.newId]
        }else{
            alert("You must fill one of the ID arguments")
            return;
        }

        ConfigManager.defaultWindowSettingID = config.id

        if(args.overwrite === "true"){
            this.getSkinData().windowSettings = {}
        }

        this.applyAndRefreshSettings()
    },

    applyAndRefreshSettings(scene){
        const windowLayer = (scene || SceneManager._scene)._windowLayer

        if(windowLayer){
    
            for(const win of windowLayer.children){
    
                if(win instanceof Window){
                    win.setCustomSettings()
                    win.refreshCustomSettings()
                }
            }
        }
    },

    getWindowSettings(winName, sceneName){
        const id = this.getSkinData().windowSettings[winName] || this.getSkinData().windowSettings[sceneName]
        const config = this.getSkinData().configList[id]

        if(config){
            return config.useSceneSkin ? this.getSceneSettings(sceneName, config) : config
        }else{
            return this.getSkinData().configList[ConfigManager.defaultWindowSettingID]
        }
    },

    getSceneSettings(sceneName, winSettings){
        const id = this.getSkinData().windowSettings[sceneName]
        const config = this.getSkinData().configList[id]

        return config || (winSettings || this.getSkinData().configList[ConfigManager.defaultWindowSettingID])
    },
    
}

Eli.WindowSkin.initialize()

{

const Plugin = Eli.WindowSkin
const Alias = {}

/* -------------------------------- SAVE DATA ------------------------------- */
if(Plugin.getParam().saveChanges){

    Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
    Eli_SavedContents.prototype.initialize = function(){
        Alias.Eli_SavedContents_initialize.call(this)

        this.contents.WindowSkin = {
            configList: Plugin.getParam().configList,
            windowSettings: Plugin.getParam().windowSettings,
        }
    }

    Eli_SavedContents.prototype.windowSkin = function(){
        return this.contents.WindowSkin
    }
}

/* ----------------------------- CONFIG MANAGER ----------------------------- */
ConfigManager.defaultWindowSettingID = Plugin.getParam().defaultWinSettings.id

Alias.ConfigManager_makeData = ConfigManager.makeData
ConfigManager.makeData = function() {
    const config = Alias.ConfigManager_makeData.call(this)
    config.defaultWindowSettingID = this.defaultWindowSettingID

    return config
}

Alias.ConfigManager_applyData = ConfigManager.applyData
ConfigManager.applyData = function(config) {
    Alias.ConfigManager_applyData.call(this, config)
    this.defaultWindowSettingID = this.readDefaultWinSettings(config, "defaultWinSettings", Plugin.getParam().defaultWinSettings.id)
}

ConfigManager.readDefaultWinSettings = function(config, name, defaultValue) {
    if(name in config){
        return config[name]
    }else{
        return defaultValue
    }
}

/* ------------------------------- GAME SYSTEM ------------------------------ */
Alias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad
Game_System.prototype.onAfterLoad = function() {
    Alias.Game_System_onAfterLoad.call(this)

    if(Plugin.getParam().fixTextColor || Plugin.getParam().fixOutlineTextColor){
        this.loadWindowSkinFilesFromSave()
    }
}

Game_System.prototype.loadWindowSkinFilesFromSave = function() { 
    for(const key in Plugin.getSkinData().configList){
        ImageManager.loadSystem(Plugin.getSkinData().configList[key].skin)
    }
}

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages
Scene_Boot.prototype.loadSystemImages = function() {
    Alias.Scene_Boot_loadSystemImages.call(this)

    if(Plugin.getParam().fixTextColor || Plugin.getParam().fixOutlineTextColor){
        this.loadWindowSkinsFromParameters()
    }
}

Scene_Boot.prototype.loadWindowSkinsFromParameters = function(){
    for(const key in Plugin.getParam().configList){
        ImageManager.loadSystem(Plugin.getParam().configList[key].skin)
    }
}

/* ------------------------------- WINDOW BASE ------------------------------ */
Alias.Window_Base_initialize = Window_Base.prototype.initialize
Window_Base.prototype.initialize = function(rect) {
    this.setCustomSettings()
    Alias.Window_Base_initialize.call(this, rect)
}

Window_Base.prototype.setCustomSettings = function() {
    const winName = this.constructor.name
    const sceneName = SceneManager._scene.constructor.name

    this.customWinSettings = Plugin.getWindowSettings(winName, sceneName)
}

Alias.Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin
Window_Base.prototype.loadWindowskin = function() {
    Alias.Window_Base_loadWindowskin.call(this)
    this.loadCustomWindowSkin()
}

Window_Base.prototype.loadCustomWindowSkin = function() {
    this.windowskin = ImageManager.loadSystem(this.customWinSettings.skin)
}

Alias.Window_Base_updateTone = Window_Base.prototype.updateTone
Window_Base.prototype.updateTone = function() {
    if(this.customWinSettings){
        this.updateCustomTone()
    }else{
        Alias.Window_Base_updateTone.call(this)
    }
}

Window_Base.prototype.updateCustomTone = function() {
    const tone = this.customWinSettings.tone
    this.setTone(tone[0], tone[1], tone[2])
}

Window_Base.prototype.refreshCustomSettings = function() {
    this.updateCustomTone()
    this.loadCustomWindowSkin()
}

Window_Base.prototype.findColorOnWindowSkin = function(color) {
    if(typeof color === "string" && color.startsWith("#")){

        for(let i = 0; i < 32; i++){
            const managerColor = ColorManager.textColor(i)

            if(managerColor === color){
                const px = 96 + (i % 8) * 12 + 6;
                const py = 144 + Math.floor(i / 8) * 12 + 6;
                color = this.windowskin.getPixel(px, py)
                break
            }
        }
    }

    return color
}

if(Plugin.getParam().fixTextColor){

    Alias.Window_Base_changeTextColor = Window_Base.prototype.changeTextColor
    Window_Base.prototype.changeTextColor = function(color) {
        color = this.findColorOnWindowSkin(color)
        Alias.Window_Base_changeTextColor.call(this, color)
    }
}

if(Plugin.getParam().fixOutlineTextColor){

    Alias.Window_Base_changeOutlineColor = Window_Base.prototype.changeOutlineColor
    Window_Base.prototype.changeOutlineColor = function(color) {
        color = this.findColorOnWindowSkin(color)
        Alias.Window_Base_changeOutlineColor.call(this, color)
    }
}

/* ----------------------------- WINDOW OPTIONS ----------------------------- */
const SYMBOL = "defaultWindowSettingID"

Alias.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
Window_Options.prototype.makeCommandList = function() {
    Alias.Window_Options_makeCommandList.call(this)

    if(Plugin.getParam().options.add){
        this.addWindowSkinCommand()
    }
}

Window_Options.prototype.addWindowSkinCommand = function(){
    this.addCommand(Plugin.getParam().options.name, SYMBOL)

    if(Plugin.getParam().options.index > -1){
        this.changeWindowSkinCommandPosition()
    }
}

Window_Options.prototype.changeWindowSkinCommandPosition = function(){
    const index = this._list.findIndex(item => item.symbol === SYMBOL)
    const command = this._list.splice(index, 1)[0]
    this._list.splice(Plugin.getParam().options.index, 0, command)
}

Alias.Window_Options_cursorRight = Window_Options.prototype.cursorRight
Window_Options.prototype.cursorRight = function() {
    const symbol = this.commandSymbol(this.index())

    if(symbol === SYMBOL){
        this.changeWindowSkinCommand(1)
    }else{
        Alias.Window_Options_cursorRight.call(this)
    }
}

Alias.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft
Window_Options.prototype.cursorLeft = function() {
    const symbol = this.commandSymbol(this.index())

    if(symbol === SYMBOL){
        this.changeWindowSkinCommand(-1)
    }else{
        Alias.Window_Options_cursorLeft.call(this)
    }
}

Alias.Window_Options_processOk = Window_Options.prototype.processOk
Window_Options.prototype.processOk = function() {
    if(this.commandSymbol(this.index()) === SYMBOL){
        this.playCursorSound()
    }else{
        Alias.Window_Options_processOk.call(this)
    }
}

Window_Options.prototype.changeWindowSkinCommand = function(increment){
    const value = this.getNewWindowSkinValue(SYMBOL, increment)
    this.changeValue(SYMBOL, value)
    this.onWindowSettingsChange(value)
}

Window_Options.prototype.getNewWindowSkinValue = function(symbol, increment){
    const skinList = Plugin.getSkinData().configList
    const skinArr = Object.keys(skinList)
    const configValue = this.getConfigValue(symbol)
    const currentIndex = skinArr.indexOf(configValue)
    const maxIndex = skinArr.length - 1
    const newIndex = (currentIndex + increment).clamp(0, maxIndex)

    return skinArr[newIndex]
}

Alias.Window_Options_statusText = Window_Options.prototype.statusText
Window_Options.prototype.statusText = function(index) {
    if(this.commandSymbol(index) === SYMBOL){
        return this.getWindowSkinText()

    }else{
        return Alias.Window_Options_statusText.call(this, index)
    }
}

Window_Options.prototype.getWindowSkinText = function(){
    return this.getConfigValue(SYMBOL)
}

Window_Options.prototype.onWindowSettingsChange = function(id){
    const windowLayer = SceneManager._scene._windowLayer

    if(windowLayer){

        for(const win of windowLayer.children){

            if(win instanceof Window){
                win.customWinSettings = Plugin.getSkinData().configList[id]
                win.refreshCustomSettings()
            }
        }
    }

    if(Plugin.getParam().options.overwrite){
        Plugin.getSkinData().windowSettings = {}
    }
}

}