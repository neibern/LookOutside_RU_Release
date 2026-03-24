//=============================================================================
// NekoGakuen_SteamworksAPI.js
// Version: 1.1.4
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Steamworks API (Ver 1.1.4)
 * @author NekoGakuen
 * @url https://twitter.com/NekoGakuen
 * @help
 * ================================
 * Author: NekoGakuen
 * Version: 1.1.4
 * Twitter: https://twitter.com/NekoGakuen
 * ================================
 * 
 * -- Plugin Information --
 * Let RPG Maker MV/MZ to use the API features from the Steam platform as well.
 * 
 * 
 * -- Update Information --
 * V1.1.4 Fixed the parameter name of the translation patch.
 * V1.1.3 Fixed the issue where DLC ID was not recognized correctly.
 * V1.1.2 Added support for setting leaderboard scores using variables.
 *        (Thanks to "Undermax Games" for his assistance.)
 * V1.1.1 Added the functionality to pause the original soundtrack music playback during the game runtime.
 * V1.1.0 Added Microtransactions(Alpha) and Leaderboards(Alpha) features.
 * V1.0.8 Fixed the feature related to game stat.
 * V1.0.7 Added a fix update for RPG Maker MV causing screen stalls on Steam Deck's Proton 8.0-3 version.
 * V1.0.6 Bug fixes.
 * V1.0.5 Change the action that runs when the Steam client is not started.
 * V1.0.4 Fix game pause on Steam Deck.
 * V1.0.3 Add plugin parameters for fullscreen and pause features.
 * V1.0.2 Fix the part on Steam Deck.
 * V1.0.1 Remove the check code at non-game test mode.
 * V1.0.0 Release plugin.
 * 
 * 
 * -- Use Description --
 * 1. There are a few pre-requisite steps to complete,
 *    please refer to the manual link in the Manual folder.
 * 2. Load the plugin in the "Plugin Manager" of RPG Maker MV/MZ.
 * 3. Select the Advanced section of Event Commands "Plugin Command..." or "Script...", 
 *    and set the parameters of the "Plugin Command" or "Script" to be executed.
 * 
 * 
 * -- Plugin Command / Script --
 * 
 * --------------------------------
 *  ▪ Common Features
 * --------------------------------
 * 
 * [ Check Purchased Games ]
 * -- Description: 
 *    Check if the user has purchased the game.
 * >> Parameter01: 
 *    Game Application ID (AppID). 
 *    If you have set "Game Application ID" parameter in "Plugin Manager", 
 *    you can input "this" to get the currently set game application ID.
 * >> Parameter02: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetBuy_SteamGameApp <Parameter01> <Parameter02>
 * -- Script: 
 *    SteamworksAPIManager.isSubscribedApp('<Parameter01>', <Parameter02>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.isSubscribedApp('<Parameter01>') == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" means you have purchased the game,
 *    "false" means you have not purchased the game.
 *
 * [ Check Installed Games ]
 * -- Description: 
 *    Check if the user has installed the game on the computer during the game.
 * >> Parameter01:
 *    Game Application ID (AppID). 
 *    If you have set "Game Application ID" parameter in "Plugin Manager", 
 *    you can input "this" to get the currently set game application ID.
 * >> Parameter02: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetInstalled_SteamGameApp <Parameter01> <Parameter02>
 * -- Script: 
 *    SteamworksAPIManager.isAppInstalled('<Parameter01>', <Parameter02>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.isAppInstalled('<Parameter01>') == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" is installed game to computer, 
 *    "false" is not installed game to computer.
 * 
 * [ Call Steam Overlay ]
 * -- Description: 
 *    Call "Steam Overlay" for the Steam platform in-game.
 * >> Parameter:
 *    The "Steam Overlay" paging option you want to display, 
 *    select the paging option you want to call in "Steam Overlay", 
 *    the parameter options available are as follows:
 *    ● Friends
 *    ● Community
 *    ● Players
 *    ● Settings
 *    ● OfficialGameGroup
 *    ● Stats
 *    ● Achievements
 * -- Plugin Command: 
 *    NekoCommands Call_SteamGameOverlay <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.activateGameOverlay('<Parameter>');
 * 
 * [ Check Steam Overlay ]
 * -- Description: 
 *    Check if "Steam Overlay" is currently enable on in the game.
 * >> Parameter: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetCurrentState_SteamGameOverlay <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.isGameOverlayEnabled(<Parameter>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.isGameOverlayEnabled() == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" means Steam Overlay is enabled, "false" means Steam Overlay is not enabled.
 * 
 * [ Check Big Picture Mode ]
 * -- Description: 
 *    Check if "Big Picture Mode" is currently on in the game.
 * >> Parameter: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetCurrentState_SteamBigPictureMode <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.isSteamInBigPictureMode(<Parameter>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.isSteamInBigPictureMode() == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" means Big Picture Mode is enabled, "false" means Big Picture Mode is not enabled.
 * 
 * [ Check Steam Deck Gaming Mode ]
 * -- Description: 
 *    Check if the game is currently in the "Gaming Mode" of the Steam Deck console.
 * >> Parameter: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetCurrentState_SteamDeckMode <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.isSteamDeckMode(<Parameter>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.isSteamDeckMode() == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" for Steam Deck console, "false" for other PC platforms.
 * 
 * [ Call Web Page ]
 * -- Description: 
 *    Call the set web page on the Steam client.
 * >> Parameter: 
 *    Web URL.
 * -- Plugin Command: 
 *    NekoCommands Call_SteamInGameWebURL <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.activateGameOverlayToWebPage('<Parameter>');
 * 
 * [ Call Game Purchase Page ]
 * -- Description: 
 *    Call your game purchase page in the Steam client, 
 *    this feature can be used on occasions such as the Add to Wish List button option.
 * -- Plugin Command: 
 *    NekoCommands BuyGamePage_SteamGameApp
 * -- Script: 
 *    SteamworksAPIManager.goToGamePage();
 * 
 * 
 * --------------------------------
 *  ▪ Game Achievement Features
 * --------------------------------
 * 
 * [ Unlock Achievement ]
 * -- Description: 
 *    Unlock the set Steam game achievement in the game.
 * >> Parameter01: 
 *    The achievement ID you set on the Steamworks page.
 * >> Parameter02: 
 *    Common Event ID.
 *    After you unlock this game achievement, call the Common Event of the setting, 
 *    if you do not want to use the call Common Event, you can not enter this parameter.
 * -- Plugin Command: 
 *    NekoCommands Unlock_SteamAchievement <Parameter01> <Parameter02>
 * -- Script: 
 *    SteamworksAPIManager.activateAchievement('<Parameter01>', <Parameter02>);
 * 
 * [ Check Unlocked Achievement ]
 * -- Description: 
 *    Check if the user has unlocked the set Steam game achievements in the game.
 * >> Parameter01:
 *    The achievement ID you set on the Steamworks page.
 * >> Parameter02:
 *    Switch ID.
 *    ＊This features requires a "Switch ID" to be set for subsequent event.
 * -- Plugin Command: 
 *    NekoCommands Get_SteamAchievement <Parameter01> <Parameter02>
 * -- Script: 
 *    SteamworksAPIManager.getAchievement('<Parameter01>', <Parameter02>);
 * 
 * [ Clear Achievement ]
 * -- Description: 
 *    Clear the set Steam game achievement in the game.
 * >> Parameter:
 *    The achievement ID you set on the Steamworks page.
 * -- Plugin Command: 
 *    NekoCommands Clear_SteamAchievement <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.clearAchievement('<Parameter>');
 * 
 * [ Show Achievement Progress(?) ]
 * -- Description: 
 *    Show in-game achievements for Steam games that have progress type. (Experimental?)
 * >> Parameter01:
 *    The achievement ID you set on the Steamworks page.
 * >> Parameter02:
 *    The current value of the progress of achievements.
 * >> Parameter03:
 *    The maximum value of achievement progress.
 * >> Parameter04:
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands Progress_SteamAchievement <Parameter01> <Parameter02> <Parameter03> <Parameter04>
 * -- Script: 
 *    SteamworksAPIManager.indicateAchievementProgress('<Parameter01>', <Parameter02>, <Parameter03>, <Parameter04>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.indicateAchievementProgress('<Parameter01>', <Parameter02>, <Parameter03>) == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" is the achievement completed, "false" is the achievement not completed.
 * 
 * 
 * --------------------------------
 *  ▪ Downloadable Content
 * --------------------------------
 * 
 * [ Get Number of Downloadable Content ]
 * -- Description: 
 *    Get Downloadable Content of this game the user has in the game.
 * >> Parameter: 
 *    Variable ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetCount_SteamDLC <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.getDLCCount(<Parameter>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.getDLCCount() >= <Conditional Args>;
 * >> Conditional Args: 
 *    Enter the number.
 * 
 * [ Check the Installed Downloadable Content ]
 * -- Description: 
 *    Check in-game if the user has installed this game's Downloadable Content on the computer.
 * >> Parameter01: 
 *    The Downloadable Content ID(DLCAppID) you set on the Steamworks page.
 * >> Parameter02: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetInstalled_SteamDLC <Parameter01> <Parameter02>
 * -- Script: 
 *    SteamworksAPIManager.isDLCInstalled('<Parameter01>', <Parameter02>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.isDLCInstalled('<Parameter01>') == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" is installed game to computer, "false" is not installed game to computer.
 * 
 * [ Install Downloadable Content ]
 * -- Description: 
 *    Install the Downloadable Content of this game in the game to your computer.
 * >> Parameter: 
 *    The Downloadable Content ID(DLCAppID) you set on the Steamworks page.
 * -- Plugin Command: 
 *    NekoCommands Install_SteamDLC <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.installDLC('<Parameter>');
 * 
 * [ Uninstall Downloadable Content ]
 * -- Description: 
 *    Uninstall the Downloadable Content of this game.
 * >> Parameter: 
 *    The Downloadable Content ID(DLCAppID) you set on the Steamworks page.
 * -- Plugin Command: 
 *    NekoCommands Uninstall_SteamDLC <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.uninstallDLC('<Parameter>');
 * 
 * 
 * --------------------------------
 *  ▪ Game Language Features
 * --------------------------------
 * 
 * [ Get Game Language ]
 * -- Description: 
 *    Get the user's language settings in the game application.
 * >> Parameter: 
 *    Variable ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetCurrentGame_SteamLanguage <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.getCurrentGameLanguage(<Parameter>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.getCurrentGameLanguage() == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter the language code provided by the Steam platform.
 *    Refer to the "Supported Languages" in the table on the following URL page:
 *    https://partner.steamgames.com/doc/store/localization#supported_languages
 * 
 * [ Get Steam Language ]
 * -- Description: 
 *    Get the user's language settings on the Steam client.
 * >> Parameter: 
 *    Variable ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetCurrentUI_SteamLanguage <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.getCurrentUILanguage(<Parameter>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.getCurrentUILanguage() == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter the language code provided by the Steam platform.
 *    Refer to the "Supported Languages" in the table on the following URL page:
 *    https://partner.steamgames.com/doc/store/localization#supported_languages
 * 
 * 
 * --------------------------------
 *  ▪ Game Stats Features
 * --------------------------------
 * 
 * [ Set Game Stats ]
 * -- Description: 
 *    Set the value to the game stats in the game.
 * >> Parameter01: 
 *    The Game stats name you set on the Steamworks page.
 * >> Parameter02: 
 *    Enter the number.
 * >> Parameter03: 
 *    Switch ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands SetValue_SteamStats <Parameter01> <Parameter02> <Parameter03>
 * -- Script: 
 *    SteamworksAPIManager.setStat('<Parameter01>', <Parameter02>, <Parameter03>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.setStat('<Parameter01>', <Parameter02>) == <Conditional Args>;
 * >> Conditional Args: 
 *    Enter "true" or "false", 
 *    "true" is successful in saving the stats, "false" is unable to save the stats.
 * 
 * [ Get Game Stats ]
 * -- Description: 
 *    Get the set game stats in the game.
 * >> Parameter01: 
 *    Set the value to the game stats in the game.
 * >> Parameter02: 
 *    The show type of the game stats.
 *    "1" is show as a floating point number, "2" is show as a number.
 * >> Parameter03: 
 *    Variable ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetValue_SteamStats <Parameter01> <Parameter02> <Parameter03>
 * -- Script: 
 *    SteamworksAPIManager.getStat('<Parameter01>', <Parameter02>, <Parameter03>);
 * -- Conditional Branch: 
 *    SteamworksAPIManager.getStat('<Parameter01>', <Parameter02>) >= <Conditional Args>;
 * >> Conditional Args: 
 *    Enter a number or floating point number.
 * 
 * [ Sync Game Stats]
 * -- Description: 
 *    Sync current game stats to the Steam platform server in-game.
 * -- Plugin Command: 
 *    NekoCommands StoreValues_SteamStats
 * -- Script: 
 *    SteamworksAPIManager.storeStats();
 * 
 * 
 * --------------------------------
 *  ▪ Microtransactions Features (Alpha)
 * --------------------------------
 * 
 * [ Call Product Purchase ]
 * -- Description: 
 *    Call the product's purchase page.
 * >> Parameter: 
 *    Product ID.
 *    The "Product ID" you set in the "Microtransactions Product List" of the Plugin Manager.
 * -- Plugin Command: 
 *    NekoCommands CallBuyItem_SteamMicroTxn <Parameter>
 * -- Script: 
 *    SteamworksAPIManager.callMicroTxn(<Parameter>);
 * 
 * [ Get Transaction Status ]
 * -- Description: 
 *    Get the status of your current transactions on the product in the game.
 *    ＊This features requires the "Call Product Purchase" plugin command before subsequent event can be performed.
 * -- Plugin Command: 
 *    NekoCommands GetBuyQuery_SteamMicroTxn
 * -- Script: 
 *    SteamworksAPIManager.isMicroTxnQuery();
 * 
 * [ Call Product Refund ]
 * -- Description: 
 *    Refund your currently purchased products in the game.
 *    ＊This features requires the "Call Product Purchase" plugin command before subsequent event can be performed.
 * -- Plugin Command: 
 *    NekoCommands CallRefund_SteamMicroTxn
 * -- Script: 
 *    SteamworksAPIManager.refundMicroTxn();
 * 
 * [ Call Product Checkout ]
 * -- Description: 
 *    Checkout the products you currently have in your shopping cart.
 *    ＊This features requires the "Get Transaction Status" plugin command before subsequent event can be performed.
 * -- Plugin Command: 
 *    NekoCommands CallFinalBuy_SteamMicroTxn
 * -- Script:
 *    SteamworksAPIManager.finalizeMicroTxn();
 * 
 * 
 * -----------------
 *  ▪ Leaderboard Features (Alpha)
 * -----------------
 * 
 * [ Delete Leaderboard ]
 * -- Description: 
 *    Leaderboard data deleted during gameplay.
 * >> Parameter: 
 *    Leaderboard Name, set the name of the leaderboard to be deleted.
 * -- Plugin Command: 
 *    NekoCommands DeleteLeaderboard_SteamLeaderboard <Parameter>
 * -- Script:
 *    SteamworksAPIManager.deleteLeaderboard('<Parameter>');
 * 
 * [ Find or Create Leaderboards ]
 * -- Description: 
 *    Finds or creates leaderboard data in the game.
 * >> Parameter01: 
 *    Leaderboard Name, set the name of the leaderboard to find or create.
 * >> Parameter02: 
 *    Create Leaderboard, enter "true" or "false".
 *    When this is turned on, if no existing leaderboard is found, the leaderboard will be created automatically.
 * >> Parameter03: 
 *    Write Leaderboard, enter "true" or "false",
 *    when this is turned on, the leaderboard will be created automatically when no existing leaderboard is found.
 * >> Parameter04: 
 *    Read only by friends, enter "true" or "false", 
 *    when turned on, will accept only trusted data writes.
 * -- Plugin Command: 
 *    NekoCommands FindOrCreateLeaderboard_SteamLeaderboard <Parameter01> <Parameter02> <Parameter03> <Parameter04>
 * -- Script:
 *    SteamworksAPIManager.findOrCreateLeaderboard('<Parameter01>', <Parameter02>, <Parameter03>, <Parameter04>);
 * 
 * [ Get Leaderboard Entry ]
 * -- Description: 
 *    To get the Leaderboard item data in the game,
 *    remember to call it once with the "Get Game Leaderboard" plugin command before using it.
 * >> Parameter01: 
 *    "Start Range" sets the starting position of the leaderboard item.
 * >> Parameter02: 
 *    "End Range" sets the starting position of the leaderboard item.
 * >> Parameter03: 
 *    "Data Request Method", set the data request method of the leaderboard, 
 *    the specified parameters are "RequestGlobal", "RequestAroundUser" and "RequestFriends".
 * -- Plugin Command: 
 *    NekoCommands GetLeaderboardEntries_SteamLeaderboard <Parameter01> <Parameter02> <Parameter03>
 * -- Script:
 *    SteamworksAPIManager.getLeaderboardEntries(<Parameter01>, <Parameter02>, '<Parameter03>');
 * 
 * [ Get Game Leaderboard ]
 * -- Description: 
 *    Get on the game leaderboards.
 * >> Parameter: 
 *    "Sequence ID", set the sequence ID of the leaderboard.
 * -- Plugin Command: 
 *    NekoCommands GetLeaderboardsForGame_SteamLeaderboard <Parameter>
 * -- Script:
 *    SteamworksAPIManager.getLeaderboardsForGame(<Parameter>);
 * 
 * [ Reset Game Leaderboards ]
 * -- Description: 
 *    To reset the game leaderboard in the game, 
 *    remember to call it once with the "Get Game Leaderboard" plugin command before using it.
 * -- Plugin Command: 
 *    NekoCommands ResetLeaderboard_SteamLeaderboard
 * -- Script:
 *    SteamworksAPIManager.resetLeaderboard();
 * 
 * [ Set Leaderboard Score ]
 * -- Description: 
 *    Setting game leaderboard scores in the game,
 *    remember to call it once with the "Get Game Leaderboard" plugin command before using it.
 * >> Parameter01: 
 *    "Score", set the score of the leaderboard.
 * >> Parameter02: 
 *    "Score Principle", set the principle of updating the score, 
 *    the parameters are "KeepBest" and "ForceUpdate".
 * >> Parameter03: 
 *    ID of the game variable storing the score. If set, it will override the Score setting.
 * -- Plugin Command: 
 *    NekoCommands SetLeaderboardScore_SteamLeaderboard <Parameter01> <Parameter02> <Parameter03>
 * -- Script:
 *    SteamworksAPIManager.setLeaderboardScore(<Parameter01>, '<Parameter02>', <Parameter03>);
 * 
 * [ Call Game Leaderboard ]
 * -- Description: 
 *    To call the game leaderboard in the game, 
 *    remember to call it with the "Get Game Leaderboard" and "Get Leaderboard Entry" plugin commands before using it.
 * -- Plugin Command: 
 *    NekoCommands CallLeaderboard_SteamLeaderboard
 * 
 * 
 * --------------------------------
 *  ▪ Other Features
 * --------------------------------
 * 
 * [ Get the Number of Players ]
 * -- Description: 
 *    Get the number of players who are currently playing the game in the game.
 * >> Parameter: 
 *    Variable ID.
 *    ＊This features requires a "Variable ID" to be set for subsequent event.
 * -- Plugin Command: 
 *    NekoCommands GetCurrentCount_SteamPlayers <Parameter>
 * -- Script:
 *    SteamworksAPIManager.getNumberOfPlayers(<Parameter>);
 * 
 * [ Get Steam ID ]
 * -- Description: 
 *    Get the Steam ID of the current player in the game.
 * >> Parameter: 
 *    Variable ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetSteamID_SteamPlayers <Parameter>
 * -- Script:
 *    SteamworksAPIManager.getSteamId(<Parameter>);
 * 
 * [ Get Player Nickname ]
 * -- Description: 
 *    Get the current player nickname in the game.
 * >> Parameter01: 
 *    Steam ID.
 * >> Parameter02:
 *    Variable ID.
 *    In the case of event command "Conditional Branch", this parameter can be omitted.
 * -- Plugin Command: 
 *    NekoCommands GetPlayerName_SteamPlayers <Parameter01> <Parameter02>
 * -- Script:
 *    SteamworksAPIManager.getPlayerName('<Parameter01>', <Parameter02>);
 * 
 * [ Delete Cloud Saves ]
 * -- Description: 
 *    Clear all the game archives in the cloud server.
 * -- Plugin Command: 
 *    NekoCommands DelAllCloudData_SteamCloudSave
 * -- Script:
 *    CloudSaveManager.clearAllCloud();
 * 
 * 
 *  --Supported Platforms --
 * - NWjs:
 *   [√ Yes(Windows、macOS)]
 * - Electron:
 *   [√ Yes(Windows、macOS)]
 * - Google Chrome:
 *   [× No]
 * - Mozilla Firefox:
 *   [× No]
 * - Microsoft Edge:
 *   [× No]
 * - Apple Safari:
 *   [× No]
 * - Android:
 *   [× No]
 * - iOS:
 *   [× No]
 *
 *
 *
 * -- Terms of Use --
 * No prior notice is required to modify or translate this plugin, and if the plugin has bugs you can report them.
 * The copyright of this plugin is owned by NekoGakuen.
 * We also reserve the right to modify and change the rules of use of the plugin.
 * 
 * --------------------
 * - Credit: 
 *   [△ Not required, but appreciated if you have one. (#1)]
 * - Commercial: 
 *   [√ OK]
 * - Adults:
 *   [√ OK]
 * 
 * #1：If you want to attach it, you can mark it with "NekoGakuen".
 * --------------------
 * 
 * @command NekoCommands GetBuy_SteamGameApp
 * @text Check Purchased Games
 * @desc Check if the user has purchased the game.
 * 
 * @arg appId
 * @text Game Application ID(AppID)
 * @desc If you have set "Game Application ID" parameter in "Plugin Manager", you can input "this" to get the currently set game application ID.
 * @type string
 * @default this
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetInstalled_SteamGameApp
 * @text Check Installed Games
 * @desc Check if the user has installed the game on the computer during the game.
 * 
 * @arg appId
 * @text Game Application ID(AppID)
 * @desc If you have set "Game Application ID" parameter in "Plugin Manager", you can input "this" to get the currently set game application ID.
 * @type string
 * @default this
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Call_SteamGameOverlay
 * @text Call Steam Overlay
 * @desc Call "Steam Overlay" for the Steam platform in-game.
 * 
 * @arg options
 * @text Page Options
 * @desc The "Steam Overlay" paging option you want to display.
 * @type select
 * @default Friends
 * @option Friends
 * @value Friends
 * @option Community
 * @value Community
 * @option Players
 * @value Players
 * @option Settings
 * @value Settings
 * @option Official Game Group
 * @value OfficialGameGroup
 * @option Stats
 * @value Stats
 * @option Achievements
 * @value Achievements
 * 
 * 
 * @command NekoCommands GetCurrentState_SteamGameOverlay
 * @text Check Steam Overlay
 * @desc Check if "Steam Overlay" is currently enable in the game.
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetCurrentState_SteamBigPictureMode
 * @text Check Big Picture Mode
 * @desc Check if "Big Picture Mode" is currently on in the game.
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetCurrentState_SteamDeckMode
 * @text Check Steam Deck Gaming Mode
 * @desc Check if the game is currently in the "Gaming Mode" of the Steam Deck console.
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Call_SteamInGameWebURL
 * @text Call Web Page
 * @desc Call the set web page on the Steam client.
 * 
 * @arg webURL
 * @text Web URL
 * @desc Set the web page URL.
 * @type string
 * @default https://
 * 
 * 
 * @command NekoCommands BuyGamePage_SteamGameApp
 * @text Call Game Purchase Page
 * @desc Call your game purchase page in the Steam client, this feature can be used on occasions such as the Add to Wish List button option.
 * 
 * 
 * @command NekoCommands Unlock_SteamAchievement
 * @text Unlock Achievement
 * @desc Unlock the set Steam game achievement in the game.
 * 
 * @arg achievementId
 * @text Achievement ID
 * @desc The achievement ID you set on the Steamworks page.
 * @type string
 * 
 * @arg commonEventId
 * @text Common Event ID
 * @desc After you unlock this game achievement, call the Common Event of the setting, if you do not want to use the call Common Event, you can not enter this parameter.
 * @type common_event
 * @default 0
 * 
 * 
 * @command NekoCommands Get_SteamAchievement
 * @text Check Unlocked Achievement
 * @desc Check if the user has unlocked the set Steam game achievements in the game.
 * 
 * @arg achievementId
 * @text Achievement ID
 * @desc The achievement ID you set on the Steamworks page.
 * @type string
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc ＊This features requires a "Switch ID" to be set for subsequent event.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Clear_SteamAchievement
 * @text Clear Achievement
 * @desc Clear the set Steam game achievement in the game.
 * 
 * @arg achievementId
 * @text Achievement ID
 * @desc The achievement ID you set on the Steamworks page.
 * @type string
 * 
 * 
 * @command NekoCommands Progress_SteamAchievement
 * @text Show Achievement Progress(?)
 * @desc Show in-game achievements for Steam games that have progress type. (Experimental?)
 * 
 * @arg achievementId
 * @text Achievement ID
 * @desc The achievement ID you set on the Steamworks page.
 * @type string
 * 
 * @arg currentValue
 * @text Current Value
 * @desc The current value of the progress of achievements.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg maxValue
 * @text Maximum Value
 * @desc The maximum value of achievement progress.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetCount_SteamDLC
 * @text Get Number of Downloadable Content
 * @desc Get Downloadable Content of this game the user has in the game.
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetInstalled_SteamDLC
 * @text Check the Installed Downloadable Content
 * @desc Check in-game if the user has installed this game's Downloadable Content on the computer.
 * 
 * @arg dlc_app_id
 * @text Downloadable Content ID(DLCAppID)
 * @desc The Downloadable Content ID(DLCAppID) you set on the Steamworks page.
 * @type string
 * 
 * @arg switchesId
 * @text Switch ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Install_SteamDLC
 * @text Install Downloadable Content
 * @desc Install the Downloadable Content of this game in the game to your computer.
 * 
 * @arg dlc_app_id
 * @text Downloadable Content ID(DLCAppID)
 * @desc The Downloadable Content ID(DLCAppID) you set on the Steamworks page.
 * @type string
 * 
 * 
 * @command NekoCommands Uninstall_SteamDLC
 * @text Uninstall Downloadable Content
 * @desc Uninstall the Downloadable Content of this game.
 * 
 * @arg dlc_app_id
 * @text Downloadable Content ID(DLCAppID)
 * @desc The Downloadable Content ID(DLCAppID) you set on the Steamworks page.
 * @type string
 * 
 * 
 * @command NekoCommands GetCurrentGame_SteamLanguage
 * @text Get Game Language
 * @desc Get the user's language settings in the game application.
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetCurrentUI_SteamLanguage
 * @text Get Steam Language
 * @desc Get the user's language settings on the Steam client.
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands SetValue_SteamStats
 * @text Set Game Stats
 * @desc Set the value to the game stats in the game.
 * 
 * @arg statsName
 * @text Game Stats Name
 * @desc The Game stats name you set on the Steamworks page.
 * @type string
 * 
 * @arg statsValue
 * @text Current Value
 * @desc Enter the number.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg switchesId
 * @text Switch ID.
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetValue_SteamStats
 * @text Get Game Stats
 * @desc Get the set game stats in the game.
 * 
 * @arg statsName
 * @text Game Stats Name
 * @desc The Game stats name you set on the Steamworks page.
 * @type string
 * 
 * @arg valueType
 * @text Value Type
 * @desc Set the value to the game stats in the game.
 * @type select
 * @default 2
 * @option Floating Point Number
 * @value 1
 * @option Number
 * @value 2
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands StoreValues_SteamStats
 * @text Sync Game Stats
 * @desc Sync current game stats to the Steam platform server in-game.
 * 
 * 
 * @command NekoCommands CallBuyItem_SteamMicroTxn
 * @text Call Product Purchase
 * @desc Call the product's purchase page.
 * 
 * @arg productId
 * @text Product ID
 * @desc The "Product ID" you set in the "Microtransactions Product List" of the Plugin Manager.
 * @type string
 * 
 * 
 * @command NekoCommands GetBuyQuery_SteamMicroTxn
 * @text Get Transaction Status
 * @desc Get the status of your current transactions on the product in the game.
 * 
 * 
 * @command NekoCommands CallRefund_SteamMicroTxn
 * @text Call Product Refund
 * @desc Refund your currently purchased products in the game.
 * 
 * 
 * @command NekoCommands CallFinalBuy_SteamMicroTxn
 * @text Call Product Checkout
 * @desc Checkout the products you currently have in your shopping cart.
 * 
 * 
 * @command NekoCommands GetCurrentCount_SteamPlayers
 * @text Get the Number of Players
 * @desc Get the number of players who are currently playing the game in the game.
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc ＊This features requires a "Variable ID" to be set for subsequent event.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetSteamID_SteamPlayers
 * @text Get Steam ID
 * @desc Get the Steam ID of the current player in the game.
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetPlayerName_SteamPlayers
 * @text Get Player Nickname
 * @desc Get the current player nickname in the game.
 * 
 * @arg steamId
 * @text Steam ID
 * @desc Set your current Steam ID.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg variablesId
 * @text Variable ID
 * @desc In the case of event command "Conditional Branch", this parameter can be omitted.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands DelAllCloudData_SteamCloudSave
 * @text Delete Cloud Saves
 * @desc Clear all the game archives in the cloud server.
 * 
 * 
 * @command NekoCommands DeleteLeaderboard_SteamLeaderboard
 * @text Delete Leaderboard
 * @desc Leaderboard data deleted during gameplay.
 * 
 * @arg name
 * @text Leaderboard Name
 * @desc Set the name of the leaderboard to be deleted.
 * @type string
 * 
 * 
 * @command NekoCommands FindOrCreateLeaderboard_SteamLeaderboard
 * @text Find or Create Leaderboards
 * @desc Finds or creates leaderboard data in the game.
 * 
 * @arg name
 * @text Leaderboard Name
 * @desc Set the name of the leaderboard to find or create.
 * @type string
 * 
 * @arg createifnotfound
 * @text Create Leaderboard
 * @desc When this is turned on, if no existing leaderboard is found, the leaderboard will be created automatically.
 * @default true
 * @type boolean
 * @on Enable
 * @off Disable
 * 
 * @arg onlytrustedwrites
 * @text Write Leaderboard
 * @desc when this is turned on, the leaderboard will be created automatically when no existing leaderboard is found.
 * @default false
 * @type boolean
 * @on Enable
 * @off Disable
 * 
 * @arg onlyfriendsreads
 * @text Read Only by Friends
 * @desc when turned on, will accept only trusted data writes.
 * @default false
 * @type boolean
 * @on Enable
 * @off Disable
 * 
 * 
 * @command NekoCommands GetLeaderboardEntries_SteamLeaderboard
 * @text Get Leaderboard Entry
 * @desc To get the Leaderboard item data in the game, remember to call it once with the "Get Game Leaderboard" plugin command before using it.
 * 
 * @arg rangestart
 * @text Start Range
 * @desc Sets the starting position of the leaderboard item.
 * @type number
 * @min 0
 * @default 1
 * 
 * @arg rangeend
 * @text End Range
 * @desc Sets the starting position of the leaderboard item.
 * @type number
 * @min 0
 * @default 10
 * 
 * @arg datarequest
 * @text Data Request Method
 * @desc Set the data request method of the leaderboard,
 * @type select
 * @default RequestGlobal
 * @option Global
 * @value RequestGlobal
 * @option Around User
 * @value RequestAroundUser
 * @option Friends
 * @value RequestFriends
 * 
 * 
 * @command NekoCommands GetLeaderboardsForGame_SteamLeaderboard
 * @text Get Game Leaderboard
 * @desc Get on the game leaderboards.
 * 
 * @arg Id
 * @text Sequence ID
 * @desc Set the sequence ID of the leaderboard.
 * @type number
 * @min 0
 * @default 0
 * 
 * 
 * @command NekoCommands ResetLeaderboard_SteamLeaderboard
 * @text Reset Game Leaderboards
 * @desc To reset the game leaderboard in the game, remember to call it once with the "Get Game Leaderboard" plugin command before using it.
 * 
 * 
 * @command NekoCommands SetLeaderboardScore_SteamLeaderboard
 * @text Set Leaderboard Score
 * @desc Setting game leaderboard scores in the game, remember to call it once with the "Get Game Leaderboard" plugin command before using it.
 * 
 * @arg score
 * @text Score
 * @desc Set the score of the leaderboard.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg scoremethod
 * @text Score Principle
 * @desc Set the principle of updating the score.
 * @type select
 * @default ForceUpdate
 * @option Keep Best
 * @value KeepBest
 * @option Force Update
 * @value ForceUpdate
 * 
 * @arg scoreVariableID
 * @text Score Variable ID
 * @desc ID of the game variable storing the score. If set, it will override the Score setting.
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands CallLeaderboard_SteamLeaderboard
 * @text Call Game Leaderboard
 * @desc To call the game leaderboard in the game, remember to call it with the "Get Game Leaderboard" and "Get Leaderboard Entry" plugin commands before using it.
 * 
 * 
 * @param Translate Patch
 * @text ＃→Translation plugin patches
 * @desc Translate the plugin file name of the patch, without the subfile name.
 * @type string
 * @default 
 * 
 * 
 * @param Steamworks Class
 * @text ◆ Steamworks Core
 * 
 * @param Steam AppID
 * @text Game Application ID
 * @desc Set the game applicatio ID(AppID) on Steam.
 * @type string
 * @parent Steamworks Class
 * @default 480
 * 
 * @param Steam API key
 * @text Steam API Key
 * @desc Set the API Key on Steam.
 * @type string
 * @parent Steamworks Class
 * @default 
 * 
 * @param Check BuyGame Boolean
 * @text Enable Steam Purchase
 * @desc Whether to enable Steam purchase verification.
 * @default true
 * @type boolean
 * @parent Steamworks Class
 * @on Enable
 * @off Disable
 * 
 * @param Check FullScreen
 * @text Enable Steam Deck UI Full Screen
 * @desc Whether to enable fullscreen display on the Steam Deck UI.
 * @default true
 * @type boolean
 * @parent Steamworks Class
 * @on Enable
 * @off Disable
 * 
 * @param Check Overlay Pause
 * @text Enable Steam Overlay pause feature
 * @desc Whether to enable the pause feature under Steam Overlay.
 * @default false
 * @type boolean
 * @parent Steamworks Class
 * @on Enable
 * @off Disable
 * 
 * @param Check Music Pause
 * @text Pause Music During Game Execution
 * @desc Whether to pause the game's original soundtrack music during game execution.
 * @default false
 * @type boolean
 * @parent Steamworks Class
 * @on Enable
 * @off Disable
 * 
 * 
 * @param MicroTxn Class
 * @text ◆ Microtransactions (Alpha)
 * 
 * @param SandBox Mode Boolean
 * @text Enable SandBox Mode
 * @desc Whether to enable sandbox mode for purchase testing.
 * @default true
 * @type boolean
 * @parent MicroTxn Class
 * @on Enable
 * @off Disable
 * 
 * @param Orderid Variable
 * @text Order Variables
 * @desc Set the variable ID to save the order number.
 * @type variable
 * @default 0
 * 
 * @param Transid Variable
 * @text Transaction Variables
 * @desc Set the variable ID to save the transaction number.
 * @type variable
 * @default 0
 * 
 * @param Result Variable
 * @text Result Variables
 * @desc Set the variable ID to save the transaction status.
 * @type variable
 * @default 0
 * 
 * @param MicroTxn Product List
 * @text Microtransactions Product List...
 * @desc Set a single product setting for Microtransactions.
 * @type struct<MicroTxnItem>[]
 * @parent MicroTxn Class
 * @default ["{\"BaseItem Class\":\"\",\"Item ID\":\"1\",\"Item Language\":\"en\",\"Item Currency\":\"USD\",\"Item Name\":\"10 Gold\",\"Item CartCount\":\"1\",\"Item Count\":\"1\",\"Item Amount\":\"1000\"}"]
 * 
 * 
 * @param Leaderboards Class
 * @text ◆ Leaderboard (Alpha)
 * 
 * @param Leaderboards Variable
 * @text Leaderboard Variables
 * @desc Set the variable ID to which you want to save the leaderboard.
 * @type variable
 * @default 0
 * 
 * @param LeaderboardsName Variable
 * @text Leaderboard Name Variable
 * @desc Set the variable ID to which you want to save the leaderboard title name.
 * @type variable
 * @default 0
 * 
 * 
 * @param Error Log Class
 * @text ◆ Error Log
 * 
 * @param Error BuyGame Title
 * @text Error Title(No games purchased)
 * @desc Set the error title to be displayed when you have not purchased the game.
 * @type string
 * @parent Error Log Class
 * @default No Games Purchased
 * 
 * @param Error BuyGame Message
 * @text Error Message(No games purchased)
 * @desc Set the error message to be displayed when you have not purchased the game.
 * @type string
 * @parent Error Log Class
 * @default You have not yet purchased this game on Steam.
 * 
 * @param Error BuyGame Button
 * @text BuyGame Button
 * @desc Set the name of the button you want to purchase.
 * @type string
 * @parent Error Log Class
 * @default Buy Game
 * 
 */
/*~struct~MicroTxnItem:
 * 
 * @param BaseItem Class
 * @text ◆ Basic
 * 
 * @param Item ID
 * @text Product ID
 * @desc Set the product ID.
 * @type number
 * @parent BaseItem Class
 * @default 1
 * @min 1
 * @max 4294967295
 * 
 * @param Item Language
 * @text Language Description
 * @desc Set the language option in which you want to show the product description.
 * @type select
 * @parent BaseItem Class
 * @default en
 * @option العربية
 * @value ar
 * @option български език
 * @value bg
 * @option 繁體中文
 * @value zh
 * @option čeština
 * @value cs
 * @option Dansk
 * @value da
 * @option Nederlands
 * @value nl
 * @option English
 * @value en
 * @option Suomi
 * @value fi
 * @option Français
 * @value fr
 * @option Deutsch
 * @value de
 * @option Ελληνικά
 * @value el
 * @option Magyar
 * @value hu
 * @option Italiano
 * @value it
 * @option 日本語
 * @value ja
 * @option 한국어
 * @value ko
 * @option Norsk
 * @value no
 * @option Polski
 * @value pl
 * @option Português
 * @value pt
 * @option Română
 * @value ro
 * @option Español-España
 * @value es
 * @option Svenska
 * @value sv
 * @option ไทย
 * @value th
 * @option Türkçe
 * @value tr
 * 
 * @param Item Currency
 * @text Product Currency
 * @desc Set the options for the currency you want to display.
 * @type select
 * @parent BaseItem Class
 * @default USD
 * @option United Arab Emirates Dirham
 * @value AED
 * @option Argentine Peso
 * @value ARS
 * @option Australian Dollars
 * @value AUD
 * @option Brazilian Reals
 * @value BRL
 * @option Canadian Dollars
 * @value CAD
 * @option Swiss Francs
 * @value CHF
 * @option Chilean Peso
 * @value CLP
 * @option Colombian Peso
 * @value COP
 * @option Costa Rican Colón
 * @value CRC
 * @option European Union Euro
 * @value EUR
 * @option United Kingdom Pound
 * @value GBP
 * @option Hong Kong Dollar
 * @value HKD
 * @option Israeli New Shekel
 * @value ILS
 * @option Indonesian Rupiah
 * @value IDR
 * @option Indian Rupee
 * @value INR
 * @option Japanese Yen
 * @value JPY
 * @option South Korean Won
 * @value KRW
 * @option Kuwaiti Dinar
 * @value KWD
 * @option Kazakhstani Tenge
 * @value KZT
 * @option Mexican Peso
 * @value MXN
 * @option Malaysian Ringgit
 * @value MYR
 * @option Norwegian Kron
 * @value NOK
 * @option New Zealand Dollar
 * @value NZD
 * @option Peruvian Sol
 * @value PEN
 * @option Philippine Peso
 * @value PHP
 * @option Polish Złoty
 * @value PLN
 * @option Qatari Riyal
 * @value QAR
 * @option Saudi Riyal
 * @value SAR
 * @option Singapore Dollar
 * @value SGD
 * @option Thai Baht
 * @value THB
 * @option Turkish Lira
 * @value TRY
 * @option New Taiwan Dollar
 * @value TWD
 * @option United States Dollar
 * @value USD
 * @option Uruguayan Peso
 * @value UYU
 * @option Vietnamese Dong
 * @value VND
 * @option South African Rand
 * @value ZAR
 * 
 * @param Item Name
 * @text Product Name
 * @desc Set the product name.
 * @type string
 * @parent BaseItem Class
 * @default Product01
 * 
 * @param Item CartCount
 * @text Product Cart Count
 * @desc Set the number of products to purchase.
 * @type number
 * @parent BaseItem Class
 * @default 1
 * @min 1
 * @max 4294967295
 * 
 * @param Item Count
 * @text Product Count
 * @desc Set the number of products.
 * @type number
 * @parent BaseItem Class
 * @default 1
 * @min 1
 * @max 32767
 * 
 * @param Item Amount
 * @text Product Amount
 * @desc Set the amount of the product in cents, for example, $1 equals 100 cents.
 * @type number
 * @parent BaseItem Class
 * @default 100
 * @min 100
 * @max 9223372036854775807
 * 
 */
/*:zh
 * @target MV MZ
 * @plugindesc Steamworks API (Ver 1.1.4)
 * @author 貓咪學園 NekoGakuen
 * @url https://twitter.com/NekoGakuen
 * @help
 * ================================
 * 作者：貓咪學園 NekoGakuen
 * 版本：1.1.4
 * 聯絡推特：https://twitter.com/NekoGakuen
 * ================================
 *
 * ─ 插件簡介 ─
 * 在 RPG Maker MV/MZ 中也能使用來自 Steam 遊戲平台的 API 功能。
 *
 *
 * ─ 更新履歷 ─
 * V1.1.4 修正翻譯補丁的參數名稱。
 * V1.1.3 修正DLC ID未正確辨識的問題。
 * V1.1.2 新增支援使用變數設置排行榜分數。
 *         (感謝 Undermax Games 的協助。)
 * V1.1.1 新增在遊戲執行時暫停原聲帶音樂播放的功能。 
 * V1.1.0 新增小額付費(Alpha)、排行榜(Alpha)功能。
 * V1.0.8 修正遊戲統計的相關功能。
 * V1.0.7 新增針對RPG Maker MV在Steam Deck的Proton 8.0-3版本上造成畫面停滯的修正更新。
 * V1.0.6 修正錯誤。
 * V1.0.5 變更 Steam 客戶端未啟動時的動作。
 * V1.0.4 修正在 Steam Deck 的遊戲暫停。
 * V1.0.3 新增全螢幕及暫停功能的插件參數。
 * V1.0.2 修正在 Steam Deck 上的部分。 
 * V1.0.1 移除在非遊戲測試模式時的檢查語法。
 * V1.0.0 初次版本的插件發佈。
 *
 *
 * ─ 使用說明 ─
 * 1.需先完成一些前置步驟，請參閱放在Manual資料夾內的使用手冊連結。
 * 2.在 RPG Maker MV/MZ 的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 3.在事件頁中高級區塊選擇「插件命令/腳本...」，
 *   並輸入以下要執行的插件命令/腳本及參數即可。
 *
 *
 * ─ 插件命令/腳本 ─
 * 
 * -----------------
 *  ■ 常用功能
 * -----------------
 *
 * 【檢查已購買的遊戲】
 * --說明：在遊戲中檢查使用者是否已購買過此遊戲。
 * >>參數01：你的遊戲應用程式 ID(AppID)，
 *   如果有在「插件管理器」設定「遊戲應用程式 ID」參數時，
 *   可以輸入「this」取得目前設定的遊戲應用程式 ID。
 * >>參數02：你的「開關 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetBuy_SteamGameApp <參數01> <參數02>
 * --腳本 SteamworksAPIManager.isSubscribedApp('<參數01>', <參數02>);
 * --條件分歧 SteamworksAPIManager.isSubscribedApp('<參數01>') == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為已購買過遊戲，false為未購買過遊戲。
 *
 * 【檢查已安裝的遊戲】
 * --說明：在遊戲中檢查使用者是否已安裝此遊戲到電腦上。
 * >>參數01：你的遊戲應用程式 ID(AppID)，
 *   如果有在「插件管理器」設定「遊戲應用程式 ID」參數時，
 *   可以輸入「this」取得目前設定的遊戲應用程式 ID。
 * >>參數02：你的「開關 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetInstalled_SteamGameApp <參數01> <參數02>
 * --腳本 SteamworksAPIManager.isAppInstalled('<參數01>', <參數02>);
 * --條件分歧 SteamworksAPIManager.isAppInstalled('<參數01>') == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為已安裝遊戲到電腦，false為未安裝遊戲到電腦。
 * 
 * 【呼叫遊戲內嵌介面】
 * --說明：在遊戲中呼叫 Steam 平台的遊戲內嵌介面。
 * >>參數：你想顯示的遊戲內嵌介面分頁選項，
 *   在指定在遊戲內嵌介面中想要呼叫分頁選項，
 *   可以使用的參數選項如下：
 *   ● Friends
 *   ● Community
 *   ● Players
 *   ● Settings
 *   ● OfficialGameGroup
 *   ● Stats
 *   ● Achievements
 * --插件命令 NekoCommands Call_SteamGameOverlay <參數>
 * --腳本 SteamworksAPIManager.activateGameOverlay('<參數>');
 * 
 * 【檢查遊戲內崁介面】
 * --說明：在遊戲中檢查目前是否開啟「遊戲內崁介面」。
 * >>參數：你的「開關 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetCurrentState_SteamGameOverlay <參數>
 * --腳本 SteamworksAPIManager.isGameOverlayEnabled(<參數>);
 * --條件分歧 SteamworksAPIManager.isGameOverlayEnabled() == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為已開啟內崁介面，false為未開啟內崁介面。
 * 
 * 【檢查Big Picture Mode】
 * --說明：在遊戲中檢查目前是否開啟「Big Picture Mode」。
 * >>參數：你的「開關 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetCurrentState_SteamBigPictureMode <參數>
 * --腳本 SteamworksAPIManager.isSteamInBigPictureMode(<參數>);
 * --條件分歧 SteamworksAPIManager.isSteamInBigPictureMode() == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為已開啟Big Picture Mode，false為未開啟Big Picture Mode。
 * 
 * 【檢查Steam Deck的遊戲模式】
 * --說明：在遊戲中檢查目前是否為Steam Deck主機的「Gaming Mode」。
 * >>參數：你的「開關 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetCurrentState_SteamDeckMode <參數>
 * --腳本 SteamworksAPIManager.isSteamDeckMode(<參數>);
 * --條件分歧 SteamworksAPIManager.isSteamDeckMode() == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為Steam Deck主機，false為其他的電腦平台。
 * 
 * 【呼叫遊戲內嵌網頁】
 * --說明：在遊戲中以 Steam 客戶端的方式呼叫指定網頁連結。
 * >>參數：你的超連結網址。
 * --插件命令 NekoCommands Call_SteamInGameWebURL <參數>
 * --腳本 SteamworksAPIManager.activateGameOverlayToWebPage('<參數>');
 * 
 * 【呼叫遊戲購買頁面】
 * --說明：在遊戲中以 Steam 客戶端的方式呼叫你的遊戲購買頁面，
 *   此功能可以在例如加入願望清單的按鈕選項等場合上使用。
 * --插件命令 NekoCommands BuyGamePage_SteamGameApp
 * --腳本 SteamworksAPIManager.goToGamePage();
 * 
 * 
 * -----------------
 *  ■ 遊戲成就功能
 * -----------------
 * 
 * 【解鎖指定成就】
 * --說明：在遊戲中解鎖指定的 Steam 遊戲成就。
 * >>參數01：你在 Steamworks 後台頁面所設定的成就 ID。
 * >>參數02：你的「公用事件(一般劇情) ID」，
 *   當你解鎖此遊戲成就之後，呼叫指定的公用事件(一般劇情)，
 *   如果沒有要使用呼叫公用事件(一般劇情)的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands Unlock_SteamAchievement <參數01> <參數02>
 * --腳本 SteamworksAPIManager.activateAchievement('<參數01>', <參數02>);
 *
 * 【檢查已解鎖的成就】
 * --說明：在遊戲中檢查使用者是否已解鎖指定的 Steam 遊戲成就。
 * >>參數01：你在 Steamworks 後台頁面所設定的成就 ID。
 * >>參數02：你的「開關 ID」。
 *   ※此功能需要指定「開關 ID」，才能進行後續的事件檢查。
 * --插件命令 NekoCommands Get_SteamAchievement <參數01> <參數02>
 * --腳本 SteamworksAPIManager.getAchievement('<參數01>', <參數02>);
 * 
 * 【清除指定成就】
 * --說明：在遊戲中清除指定的 Steam 遊戲成就。
 * >>參數：你在 Steamworks 後台頁面所設定的成就 ID。
 * --插件命令 NekoCommands Clear_SteamAchievement <參數>
 * --腳本 SteamworksAPIManager.clearAchievement('<參數>');
 * 
 * 【顯示指定成就進度(?)】
 * --說明：在遊戲中顯示有進度類型的 Steam 遊戲成就。(實驗階段?)
 * >>參數01：你在 Steamworks 後台頁面所設定的成就 ID。
 * >>參數02：你目前的成就進度數值。
 * >>參數03：你最大的成就進度數值。
 * >>參數04：你的「開關 ID」。
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands Progress_SteamAchievement <參數01> <參數02> <參數03> <參數04>
 * --腳本 SteamworksAPIManager.indicateAchievementProgress('<參數>', <參數02>, <參數03>, <參數04>);
 * --條件分歧 SteamworksAPIManager.indicateAchievementProgress('<參數>', <參數02>, <參數03>) == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為已完成此成就，false為未完成此成就。
 * 
 * 
 * -----------------
 *  ■ 追加下載內容
 * -----------------
 * 
 * 【取得追加下載內容數量】
 * --說明：在遊戲中取得使用者已擁有多少個此遊戲的追加下載內容。
 * >>參數：你的「變數 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetCount_SteamDLC <參數>
 * --腳本 SteamworksAPIManager.getDLCCount(<參數>);
 * --條件分歧 SteamworksAPIManager.getDLCCount() >= <條件參數>;
 * >>條件參數：輸入數字即可。
 * 
 * 【檢查已安裝的追加下載內容】
 * --說明：在遊戲中檢查使用者是否已安裝此遊戲的追加下載內容到電腦上。
 * >>參數01：你在 Steamworks 後台頁面所設定的追加下載內容 ID(DLCAppID)。
 * >>參數02：你的「開關 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetInstalled_SteamDLC <參數01> <參數02>
 * --腳本 SteamworksAPIManager.isDLCInstalled('<參數01>', <參數02>);
 * --條件分歧 SteamworksAPIManager.isDLCInstalled('<參數01>') == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為已安裝遊戲到電腦，false為未安裝遊戲到電腦。
 * 
 * 【立即安裝追加下載內容】
 * --說明：在遊戲中立即安裝此遊戲的指定追加下載內容到電腦。
 * >>參數：你在 Steamworks 後台頁面所設定的追加下載內容 ID。
 * --插件命令 NekoCommands Install_SteamDLC <參數>
 * --腳本 SteamworksAPIManager.installDLC('<參數>');
 * 
 * 【解除安裝追加下載內容】
 * --說明：在遊戲中將指定追加下載內容從此電腦中解除安裝。
 * >>參數：你在 Steamworks 後台頁面所設定的追加下載內容 ID。
 * --插件命令 NekoCommands Uninstall_SteamDLC <參數>
 * --腳本 SteamworksAPIManager.uninstallDLC('<參數>');
 * 
 * 
 * -----------------
 *  ■ 遊戲語言功能
 * -----------------
 * 
 * 【取得遊戲語言】
 * --說明：在遊戲中取得使用者在遊戲應用程式的語言設定。
 * >>參數：你的「變數 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetCurrentGame_SteamLanguage <參數>
 * --腳本 SteamworksAPIManager.getCurrentGameLanguage(<參數>);
 * --條件分歧 SteamworksAPIManager.getCurrentGameLanguage() == <條件參數>;
 * >>條件參數：輸入 Steam 平台提供的語言代碼。
 *   參照以下網址頁面表格上的「API 語言碼」：
 *   https://partner.steamgames.com/doc/store/localization#supported_languages
 * 
 * 【取得 Steam 語言】
 * --說明：在遊戲中取得使用者在 Steam 客戶端的語言設定。
 * >>參數：你的「變數 ID」，
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetCurrentUI_SteamLanguage <參數>
 * --腳本 SteamworksAPIManager.getCurrentUILanguage(<參數>);
 * --條件分歧 SteamworksAPIManager.getCurrentUILanguage() == <條件參數>;
 * >>條件參數：輸入 Steam 平台提供的語言代碼。
 *   參照以下網址頁面表格上的「API 語言碼」：
 *   https://partner.steamgames.com/doc/store/localization#supported_languages
 * 
 * 
 * -----------------
 *  ■ 遊戲統計功能
 * -----------------
 * 
 * 【指定遊戲統計】
 * --說明：在遊戲中設定數值到指定的遊戲統計資料。
 * >>參數01：你在 Steamworks 後台頁面所設定的遊戲統計名稱。
 * >>參數02：你目前統計的數值。
 * >>參數03：你的「開關 ID」。
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands SetValue_SteamStats <參數01> <參數02> <參數03>
 * --腳本 SteamworksAPIManager.setStat('<參數01>', <參數02>, <參數03>);
 * --條件分歧 SteamworksAPIManager.setStat('<參數01>', <參數02>) == <條件參數>;
 * >>條件參數：輸入「true」或「false」, 
 *   true為成功儲存統計資料，false為無法儲存統計資料。
 * 
 * 【取得遊戲統計】
 * --說明：在遊戲中取得指定的遊戲統計資料。
 * >>參數01：你在 Steamworks 後台頁面所設定的遊戲統計名稱。
 * >>參數02：遊戲統計數值的顯示類型，
 *   1為以浮點數顯示，2為以數字顯示。
 * >>參數03：你的「變數 ID」。
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetValue_SteamStats <參數01> <參數02> <參數03>
 * --腳本 SteamworksAPIManager.getStat('<參數01>', <參數02>, <參數03>);
 * --條件分歧 SteamworksAPIManager.getStat('<參數01>', <參數02>) >= <條件參數>;
 * >>條件參數：輸入數字或浮點數即可。
 * 
 * 【同步統計資料】
 * --說明：在遊戲中同步目前的遊戲統計資料到 Steam 平台的伺服器上。
 * --插件命令 NekoCommands StoreValues_SteamStats
 * --腳本 SteamworksAPIManager.storeStats();
 * 
 * 
 * -----------------
 *  ■ 小額付費功能 (Alpha)
 * -----------------
 * 
 * 【呼叫產品購買】
 * --說明：在遊戲中呼叫產品的購買頁面。
 * >>參數：你的「產品 ID」。
 *   你在插件管理器的「小額付費產品列表」中所設定的「產品ID」。
 * --插件命令 NekoCommands CallBuyItem_SteamMicroTxn <參數>
 * --腳本 SteamworksAPIManager.callMicroTxn(<參數>);
 * 
 * 【取得交易狀態】
 * --說明：在遊戲中取得你目前在產品上的交易狀態。
 *   ※此功能需先使用「呼叫產品購買」的插件命令，才能進行後續的事件檢查。
 * --插件命令 NekoCommands GetBuyQuery_SteamMicroTxn
 * --腳本 SteamworksAPIManager.isMicroTxnQuery();
 * 
 * 【呼叫產品退款】
 * --說明：在遊戲中將你目前已購買的產品進行退款。
 *   ※此功能需先使用「呼叫產品購買」的插件命令，才能進行後續的事件檢查。
 * --插件命令 NekoCommands CallRefund_SteamMicroTxn
 * --腳本 SteamworksAPIManager.refundMicroTxn();
 * 
 * 【呼叫產品結帳】
 * --說明：在遊戲中將你目前已經在購物車中的產品進行結帳。
 *   ※此功能需先使用「取得交易狀態」的插件命令，才能進行後續的事件檢查。
 * --插件命令 NekoCommands CallFinalBuy_SteamMicroTxn
 * --腳本 SteamworksAPIManager.finalizeMicroTxn();
 * 
 * 
 * -----------------
 *  ■ 排行榜功能 (Alpha)
 * -----------------
 * 
 * 【刪除排行榜】
 * --說明：在遊戲中刪除指定的排行榜資料。
 * >>參數：你的「排行榜名稱」，指定要刪除的排行榜名稱。
 * --插件命令 NekoCommands DeleteLeaderboard_SteamLeaderboard <參數>
 * --腳本 SteamworksAPIManager.deleteLeaderboard('<參數>');
 * 
 * 【尋找或建立排行榜】
 * --說明：在遊戲中尋找或建立排行榜資料。
 * >>參數01：你的「排行榜名稱」，指定要尋找或建立的排行榜名稱。
 * >>參數02：建立排行榜，輸入「true」或「false」，
 *   開啟此項時，當未找到已有的排行榜時，將自動建立排行榜資料。
 * >>參數03：寫入排行榜，輸入「true」或「false」，
 *   開啟此項時，將會僅接受可信任的資料寫入。
 * >>參數04：僅限朋友讀取，輸入「true」或「false」，
 *   開啟此項時，將會僅接受朋友之間的資料讀取。
 * --插件命令 NekoCommands FindOrCreateLeaderboard_SteamLeaderboard <參數01> <參數02> <參數03> <參數04>
 * --腳本 SteamworksAPIManager.findOrCreateLeaderboard('<參數01>', <參數02>, <參數03>, <參數04>);
 * 
 * 【取得排名項目】
 * --說明：在遊戲中取得排行榜的排名項目資料，使用前記得先使用「取得遊戲排行榜」插件命令呼叫一次。
 * >>參數01：你的「起始範圍」，指定排名項目的起始位置。
 * >>參數02：你的「結束範圍」，指定排名項目的結束位置。
 * >>參數03：你的「資料請求方式」，指定排行榜的資料請求方式，指定的參數分別為「RequestGlobal」、「RequestAroundUser」、「RequestFriends」。
 * --插件命令 NekoCommands GetLeaderboardEntries_SteamLeaderboard <參數01> <參數02> <參數03>
 * --腳本 SteamworksAPIManager.getLeaderboardEntries(<參數01>, <參數02>, '<參數03>');
 * 
 * 【取得遊戲排行榜】
 * --說明：在遊戲中取得指定的遊戲排行榜。
 * >>參數：你的「序列ID」，指定排行榜的序列ID。
 * --插件命令 NekoCommands GetLeaderboardsForGame_SteamLeaderboard <參數>
 * --腳本 SteamworksAPIManager.getLeaderboardsForGame(<參數>);
 * 
 * 【重置遊戲排行榜】
 * --說明：在遊戲中重置遊戲排行榜，使用前記得先使用「取得遊戲排行榜」插件命令呼叫一次。
 * --插件命令 NekoCommands ResetLeaderboard_SteamLeaderboard
 * --腳本 SteamworksAPIManager.resetLeaderboard();
 * 
 * 【設置排行榜分數】
 * --說明：在遊戲中設置遊戲排行榜分數，使用前記得先使用「取得遊戲排行榜」插件命令呼叫一次。
 * >>參數01：你的「分數」，指定排行榜的分數。
 * >>參數02：你的「分數原則」，指定紀錄分數的更新原則，指定的參數分別為「KeepBest」和「ForceUpdate」。
 * >>參數03：你儲存分數的遊戲變數的ID，如果有設置的話，它將會覆寫分數設置。
 * --插件命令 NekoCommands SetLeaderboardScore_SteamLeaderboard <參數01> <參數02> <參數03>
 * --腳本 SteamworksAPIManager.setLeaderboardScore(<參數01>, '<參數02>', <參數03>);
 * 
 * 【呼叫遊戲排行榜】
 * --說明：在遊戲中呼叫遊戲排行榜，使用前記得先使用「取得遊戲排行榜」以及「取得排名項目」插件命令呼叫。
 * --插件命令 NekoCommands CallLeaderboard_SteamLeaderboard
 * 
 * 
 * -----------------
 *  ■ 其他功能
 * -----------------
 * 
 * 【取得玩家數量】
 * --說明：在遊戲中取得目前正在遊玩此遊戲的玩家數量。
 * >>參數：你的「變數 ID」。
 *   ※此功能需要指定「變數 ID」，才能進行後續的事件處理。
 * --插件命令 NekoCommands GetCurrentCount_SteamPlayers <參數>
 * --腳本 SteamworksAPIManager.getNumberOfPlayers(<參數>);
 * 
 * 【取得玩家 ID】
 * --說明：在遊戲中取得目前玩家的 Steam ID。
 * >>參數：你的「變數 ID」。
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetSteamID_SteamPlayers <參數>
 * --腳本 SteamworksAPIManager.getSteamId(<參數>);
 * 
 * 【取得玩家暱稱】
 * --說明：在遊戲中取得目前的玩家暱稱。
 * >>參數01：你的「Steam ID」。
 * >>參數02：你的「變數 ID」。
 *   如果是在事件命令「條件分歧」的情況，可以不用輸入此參數。
 * --插件命令 NekoCommands GetPlayerName_SteamPlayers <參數01> <參數02>
 * --腳本 SteamworksAPIManager.getPlayerName('<參數01>', <參數02>);
 * 
 * 【刪除雲端存檔】
 * --說明：在遊戲中將你原本在雲端伺服器的遊戲存檔全部清除。
 * --插件命令 NekoCommands DelAllCloudData_SteamCloudSave
 * --腳本 CloudSaveManager.clearAllCloud();
 * 
 *
 * ─ 支援平台 ─
 * - NWjs：
 *  【√ 支援(Windows、macOS)】
 * - Electron：
 *  【√ 支援(Windows、macOS)】
 * - Google Chrome：
 *  【× 不支援】
 * - Mozilla Firefox：
 *  【× 不支援】
 * - Microsoft Edge：
 *  【× 不支援】
 * - Apple Safari：
 *  【× 不支援】
 * - Android：
 *  【× 不支援】
 * - iOS：
 *  【× 不支援】
 *
 *
 *
 * ─ 著作聲明 ─
 * 修改或翻譯本插件無需事前告知，如果插件有BUG可以回報。
 * 本插件著作權為貓咪學園(NekoGakuen)所有。
 * 並且保留對插件使用規則的修改與更動之權利。
 * 
 * --------------------
 * -來源標示：【△ 不需要，但有的話會很感謝。 (註1)】
 * -商業營利：【√ 允許】
 * -成人用途：【√ 允許】
 * 
 * ※註1：但如有註明的話，可以註明「NekoGakuen」即可。
 * --------------------
 * 
 * @command NekoCommands GetBuy_SteamGameApp
 * @text 檢查已購買的遊戲
 * @desc 在遊戲中檢查使用者是否已購買過此遊戲。
 * 
 * @arg appId
 * @text 遊戲應用程式 ID(AppID)
 * @desc 如果有在「插件管理器」設定「遊戲應用程式ID」參數時，可以輸入「this」取得目前設定的遊戲應用程式ID。
 * @type string
 * @default this
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetInstalled_SteamGameApp
 * @text 檢查已安裝的遊戲
 * @desc 在遊戲中檢查使用者是否已安裝此遊戲到電腦上。
 * 
 * @arg appId
 * @text 遊戲應用程式 ID(AppID)
 * @desc 如果有在「插件管理器」設定「遊戲應用程式ID」參數時，可以輸入「this」取得目前設定的遊戲應用程式ID。
 * @type string
 * @default this
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Call_SteamGameOverlay
 * @text 呼叫遊戲內嵌介面
 * @desc 在遊戲中呼叫 Steam 平台的遊戲內嵌介面。
 * 
 * @arg options
 * @text 呼叫分頁選項
 * @desc 你想顯示的遊戲內嵌介面分頁選項。
 * @type select
 * @default Friends
 * @option 好友
 * @value Friends
 * @option 社群
 * @value Community
 * @option 玩家
 * @value Players
 * @option 設定
 * @value Settings
 * @option 官方群組
 * @value OfficialGameGroup
 * @option 統計
 * @value Stats
 * @option 成就
 * @value Achievements
 * 
 * 
 * @command NekoCommands GetCurrentState_SteamGameOverlay
 * @text 檢查遊戲內崁介面
 * @desc 在遊戲中檢查目前是否開啟「遊戲內崁介面」。
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetCurrentState_SteamBigPictureMode
 * @text 檢查Big Picture Mode
 * @desc 在遊戲中檢查目前是否開啟「Big Picture Mode」。
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetCurrentState_SteamDeckMode
 * @text 檢查Steam Deck的遊戲模式
 * @desc 在遊戲中檢查目前是否為Steam Deck主機的「Gaming Mode」。
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Call_SteamInGameWebURL
 * @text 呼叫遊戲內嵌網頁
 * @desc 在遊戲中以 Steam 客戶端的方式呼叫指定網頁連結。
 * 
 * @arg webURL
 * @text 超連結網址
 * @desc 指定你想要的超連結網址。
 * @type string
 * @default https://
 * 
 * 
 * @command NekoCommands BuyGamePage_SteamGameApp
 * @text 呼叫遊戲購買頁面
 * @desc 在遊戲中以 Steam 客戶端的方式呼叫你的遊戲購買頁面，此功能可以在例如加入願望清單的按鈕選項等場合上使用。
 * 
 * 
 * @command NekoCommands Unlock_SteamAchievement
 * @text 解鎖指定成就
 * @desc 在遊戲中解鎖指定的 Steam 遊戲成就。
 * 
 * @arg achievementId
 * @text Steam 遊戲成就 ID
 * @desc 你在 Steamworks 後台頁面所設定的成就 ID。
 * @type string
 * 
 * @arg commonEventId
 * @text 公用事件(一般劇情) ID
 * @desc 當你解鎖此遊戲成就之後，呼叫指定的公用事件(一般劇情)，如果沒有要使用呼叫公用事件(一般劇情)的情況，可以不用設定此參數。
 * @type common_event
 * @default 0
 * 
 * 
 * @command NekoCommands Get_SteamAchievement
 * @text 檢查已解鎖的成就
 * @desc 在遊戲中檢查使用者是否已解鎖指定的 Steam 遊戲成就。
 * 
 * @arg achievementId
 * @text Steam 遊戲成就 ID
 * @desc 你在 Steamworks 後台頁面所設定的成就ID。
 * @type string
 * 
 * @arg switchesId
 * @text 開關ID
 * @desc ※此功能需要指定此參數項目，才能進行後續的事件處理。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Clear_SteamAchievement
 * @text 清除指定成就
 * @desc 在遊戲中清除指定的 Steam 遊戲成就。
 * 
 * @arg achievementId
 * @text Steam 遊戲成就 ID
 * @desc 你在 Steamworks 後台頁面所設定的成就ID。
 * @type string
 * 
 * 
 * @command NekoCommands Progress_SteamAchievement
 * @text 顯示指定成就進度(?)
 * @desc 在遊戲中顯示有進度類型的 Steam 遊戲成就。(實驗階段?)
 * 
 * @arg achievementId
 * @text Steam 遊戲成就 ID
 * @desc 你在 Steamworks 後台頁面所設定的成就ID。
 * @type string
 * 
 * @arg currentValue
 * @text 目前成就進度
 * @desc 指定你目前的成就進度數值。
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg maxValue
 * @text 最大成就進度
 * @desc 指定你最大的成就進度數值。
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetCount_SteamDLC
 * @text 取得追加下載內容數量
 * @desc 在遊戲中取得使用者已擁有多少個此遊戲的追加下載內容。
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetInstalled_SteamDLC
 * @text 檢查已安裝的追加下載內容
 * @desc 在遊戲中檢查使用者是否已安裝此遊戲的追加下載內容到電腦上。
 * 
 * @arg dlc_app_id
 * @text 追加下載內容 ID(DLCAppID)
 * @desc 你在 Steamworks 後台頁面所設定的追加下載內容ID(DLCAppID)。
 * @type string
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands Install_SteamDLC
 * @text 立即安裝追加下載內容
 * @desc 在遊戲中立即安裝此遊戲的指定追加下載內容到電腦。
 * 
 * @arg dlc_app_id
 * @text 追加下載內容 ID(DLCAppID)
 * @desc 你在 Steamworks 後台頁面所設定的追加下載內容ID(DLCAppID)。
 * @type string
 * 
 * 
 * @command NekoCommands Uninstall_SteamDLC
 * @text 解除安裝追加下載內容
 * @desc 在遊戲中將指定追加下載內容從此電腦中解除安裝。
 * 
 * @arg dlc_app_id
 * @text 追加下載內容 ID(DLCAppID)
 * @desc 你在 Steamworks 後台頁面所設定的追加下載內容ID(DLCAppID)。
 * @type string
 * 
 * 
 * @command NekoCommands GetCurrentGame_SteamLanguage
 * @text 取得遊戲語言
 * @desc 在遊戲中取得使用者在遊戲應用程式的語言設定。
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetCurrentUI_SteamLanguage
 * @text 取得 Steam 語言
 * @desc 在遊戲中取得使用者在 Steam 客戶端的語言設定。
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands SetValue_SteamStats
 * @text 指定遊戲統計
 * @desc 在遊戲中設定數值到指定的遊戲統計資料。
 * 
 * @arg statsName
 * @text 遊戲統計名稱
 * @desc 你在 Steamworks 後台頁面所設定的遊戲統計名稱。
 * @type string
 * 
 * @arg statsValue
 * @text 目前統計數值
 * @desc 指定你目前統計的數值。
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg switchesId
 * @text 開關 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type switch
 * @default 0
 * 
 * 
 * @command NekoCommands GetValue_SteamStats
 * @text 取得遊戲統計
 * @desc 在遊戲中取得指定的遊戲統計資料。
 * 
 * @arg statsName
 * @text 遊戲統計名稱
 * @desc 你在 Steamworks 後台頁面所設定的遊戲統計名稱。
 * @type string
 * 
 * @arg valueType
 * @text 數值顯示類型
 * @desc 指定你遊戲統計數值的顯示類型。
 * @type select
 * @default 2
 * @option 浮點數
 * @value 1
 * @option 數字
 * @value 2
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands StoreValues_SteamStats
 * @text 同步統計資料
 * @desc 在遊戲中同步目前的遊戲統計資料到 Steam 平台的伺服器上。
 * 
 * 
 * @command NekoCommands CallBuyItem_SteamMicroTxn
 * @text 呼叫產品購買
 * @desc 在遊戲中以 Steam 客戶端的方式呼叫產品的購買頁面。
 * 
 * @arg productId
 * @text 產品 ID
 * @desc 你在插件管理器的「小額付費產品列表」中所設定的「產品ID」。
 * @type string
 * 
 * 
 * @command NekoCommands GetBuyQuery_SteamMicroTxn
 * @text 取得交易狀態
 * @desc 在遊戲中取得你目前在產品上的交易狀態。
 * 
 * 
 * @command NekoCommands CallRefund_SteamMicroTxn
 * @text 呼叫產品退款
 * @desc 在遊戲中將你目前已購買的產品進行退款。
 * 
 * 
 * @command NekoCommands CallFinalBuy_SteamMicroTxn
 * @text 呼叫產品結帳
 * @desc 在遊戲中將你目前已經在購物車中的產品進行結帳。
 * 
 * 
 * @command NekoCommands GetCurrentCount_SteamPlayers
 * @text 取得玩家數量
 * @desc 在遊戲中取得目前正在遊玩此遊戲的玩家數量。
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc ※此功能需要指定此參數項目，才能進行後續的事件處理。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetSteamID_SteamPlayers
 * @text 取得玩家 ID
 * @desc 在遊戲中取得目前玩家的 Steam ID。
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands GetPlayerName_SteamPlayers
 * @text 取得玩家暱稱
 * @desc 在遊戲中取得目前的玩家暱稱。
 * 
 * @arg steamId
 * @text Steam ID
 * @desc 指定你目前的Steam ID。
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg variablesId
 * @text 變數 ID
 * @desc 如果是在事件命令「條件分歧」的情況，可以不用設定此參數。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands DelAllCloudData_SteamCloudSave
 * @text 刪除雲端存檔
 * @desc 在遊戲中將你原本在雲端伺服器的遊戲存檔全部清除。
 * 
 * 
 * @command NekoCommands DeleteLeaderboard_SteamLeaderboard
 * @text 刪除排行榜
 * @desc 在遊戲中刪除指定的排行榜資料。
 * 
 * @arg name
 * @text 排行榜名稱
 * @desc 指定要刪除的排行榜名稱。
 * @type string
 * 
 * 
 * @command NekoCommands FindOrCreateLeaderboard_SteamLeaderboard
 * @text 尋找或建立排行榜
 * @desc 在遊戲中尋找或建立排行榜資料。
 * 
 * @arg name
 * @text 排行榜名稱
 * @desc 指定要尋找或建立的排行榜名稱。
 * @type string
 * 
 * @arg createifnotfound
 * @text 建立排行榜
 * @desc 開啟此項時，當未找到已有的排行榜時，將自動建立排行榜資料。
 * @default true
 * @type boolean
 * @on 開啟
 * @off 關閉
 * 
 * @arg onlytrustedwrites
 * @text 寫入排行榜
 * @desc 開啟此項時，將會僅接受可信任的資料寫入。
 * @default false
 * @type boolean
 * @on 開啟
 * @off 關閉
 * 
 * @arg onlyfriendsreads
 * @text 僅限朋友讀取
 * @desc 開啟此項時，將會僅接受朋友之間的資料讀取。
 * @default false
 * @type boolean
 * @on 開啟
 * @off 關閉
 * 
 * 
 * @command NekoCommands GetLeaderboardEntries_SteamLeaderboard
 * @text 取得排名項目
 * @desc 在遊戲中取得排行榜的排名項目資料，使用前記得先使用「取得遊戲排行榜」插件命令呼叫一次。
 * 
 * @arg rangestart
 * @text 起始範圍
 * @desc 指定排名項目的起始位置。
 * @type number
 * @min 0
 * @default 1
 * 
 * @arg rangeend
 * @text 結束範圍
 * @desc 指定排名項目的結束位置。
 * @type number
 * @min 0
 * @default 10
 * 
 * @arg datarequest
 * @text 資料請求方式
 * @desc 指定排行榜的資料請求方式。
 * @type select
 * @default RequestGlobal
 * @option 全球玩家
 * @value RequestGlobal
 * @option 附近玩家
 * @value RequestAroundUser
 * @option 好友玩家
 * @value RequestFriends
 * 
 * 
 * @command NekoCommands GetLeaderboardsForGame_SteamLeaderboard
 * @text 取得遊戲排行榜
 * @desc 在遊戲中取得指定的遊戲排行榜。
 * 
 * @arg Id
 * @text 序列ID
 * @desc 指定排行榜的序列ID。
 * @type number
 * @min 0
 * @default 0
 * 
 * 
 * @command NekoCommands ResetLeaderboard_SteamLeaderboard
 * @text 重置遊戲排行榜
 * @desc 在遊戲中重置遊戲排行榜，使用前記得先使用「取得遊戲排行榜」插件命令呼叫一次。
 * 
 * 
 * @command NekoCommands SetLeaderboardScore_SteamLeaderboard
 * @text 設置排行榜分數
 * @desc 在遊戲中設置遊戲排行榜分數，使用前記得先使用「取得遊戲排行榜」插件命令呼叫一次。
 * 
 * @arg score
 * @text 分數
 * @desc 指定排行榜的分數。
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg scoremethod
 * @text 分數原則
 * @desc 指定紀錄分數的更新原則。
 * @type select
 * @default ForceUpdate
 * @option 保持最佳分數
 * @value KeepBest
 * @option 強制更新
 * @value ForceUpdate
 * 
 * @arg scoreVariableID
 * @text 分數變數ID
 * @desc 儲存分數的遊戲變數的ID，如果有設置的話，它將會覆寫分數設置。
 * @type variable
 * @default 0
 * 
 * 
 * @command NekoCommands CallLeaderboard_SteamLeaderboard
 * @text 呼叫遊戲排行榜
 * @desc 在遊戲中呼叫遊戲排行榜，使用前記得先使用「取得遊戲排行榜」以及「取得排名項目」插件命令呼叫。
 * 
 * 
 * 
 * @param Translate Patch
 * @text ＃→翻譯插件補丁
 * @desc 翻譯補丁的插件檔案名稱，不包含副檔名。
 * @type string
 * @default 
 * 
 *
 * @param Steamworks Class
 * @text ◆ Steamworks 核心參數
 * 
 * @param Steam AppID
 * @text 遊戲應用程式 ID
 * @desc 指定在 Steam 上的遊戲應用程式 ID。
 * @type string
 * @parent Steamworks Class
 * @default 480
 * 
 * @param Steam API key
 * @text Steam API 金鑰
 * @desc 指定在 Steam 上的開發者 API 金鑰。
 * @type string
 * @parent Steamworks Class
 * @default 
 * 
 * @param Check BuyGame Boolean
 * @text 開啟 Steam 購買驗證功能
 * @desc 是否開啟 Steam 購買驗證功能。
 * @default true
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Check FullScreen
 * @text 開啟 Steam Deck UI 全螢幕
 * @desc 是否在 Steam Deck UI 上開啟全螢幕顯示。
 * @default true
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Check Overlay Pause
 * @text 開啟遊戲內崁介面暫停功能
 * @desc 是否在遊戲內崁介面下開啟暫停功能。
 * @default false
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Check Music Pause
 * @text 開啟遊戲執行時暫停音樂播放
 * @desc 是否在遊戲執行時暫停遊戲原聲帶的音樂播放。
 * @default false
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * 
 * @param MicroTxn Class
 * @text ◆ 小額付費參數 (Alpha)
 * 
 * @param SandBox Mode Boolean
 * @text 開啟沙盒模式
 * @desc 是否開啟沙盒模式進行購買測試。
 * @default true
 * @type boolean
 * @parent MicroTxn Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Orderid Variable
 * @text 訂單編號變數
 * @desc 指定要儲存訂單編號的變數 ID。
 * @type variable
 * @default 0
 * 
 * @param Transid Variable
 * @text 交易編號變數
 * @desc 指定要儲存交易編號的變數 ID。
 * @type variable
 * @default 0
 * 
 * @param Result Variable
 * @text 交易狀態變數
 * @desc 指定要儲存交易狀態的變數 ID。
 * @type variable
 * @default 0
 * 
 * @param MicroTxn Product List
 * @text 小額付費產品列表...
 * @desc 指定小額付費的單一產品設置。
 * @type struct<MicroTxnItem>[]
 * @parent MicroTxn Class
 * @default ["{\"BaseItem Class\":\"\",\"Item ID\":\"1\",\"Item Language\":\"zh\",\"Item Currency\":\"TWD\",\"Item Name\":\"100金幣\",\"Item CartCount\":\"1\",\"Item Count\":\"1\",\"Item Amount\":\"10000\"}"]
 * 
 * 
 * @param Leaderboards Class
 * @text ◆ 排行榜參數 (Alpha)
 * 
 * @param Leaderboards Variable
 * @text 排行榜變數
 * @desc 指定要儲存排行榜的變數 ID。
 * @type variable
 * @default 0
 * 
 * @param LeaderboardsName Variable
 * @text 排行榜名稱變數
 * @desc 指定要儲存排行榜標題名稱的變數 ID。
 * @type variable
 * @default 0
 * 
 * 
 * @param Error Log Class
 * @text ◆ 錯誤訊息參數
 * 
 * @param Error BuyGame Title
 * @text 錯誤標題(未購買遊戲)
 * @desc 當你未購買此遊戲時，指定要顯示的錯誤標題。
 * @type string
 * @parent Error Log Class
 * @default 未購買此遊戲
 * 
 * @param Error BuyGame Message
 * @text 錯誤訊息(未購買遊戲)
 * @desc 當你未購買此遊戲時，指定要顯示的錯誤訊息。
 * @type string
 * @parent Error Log Class
 * @default 您尚未在 Steam 上購買本遊戲。
 * 
 * @param Error BuyGame Button
 * @text 連結按鈕
 * @desc 指定要前往購買的按鈕名稱。
 * @type string
 * @parent Error Log Class
 * @default 前往購買
 * 
 */
/*~struct~MicroTxnItem:zh
 * 
 * @param BaseItem Class
 * @text ◆ 基本參數
 * 
 * @param Item ID
 * @text 產品 ID
 * @desc 指定產品的 ID。
 * @type number
 * @parent BaseItem Class
 * @default 1
 * @min 1
 * @max 4294967295
 * 
 * @param Item Language
 * @text 產品語言描述
 * @desc 指定你想顯示產品描述的語言選項。
 * @type select
 * @parent BaseItem Class
 * @default zh
 * @option 阿拉伯語
 * @value ar
 * @option 保加利亞語
 * @value bg
 * @option 繁體中文
 * @value zh
 * @option 捷克語
 * @value cs
 * @option 丹麥語
 * @value da
 * @option 荷蘭語
 * @value nl
 * @option 英語
 * @value en
 * @option 芬蘭語
 * @value fi
 * @option 法語
 * @value fr
 * @option 德語
 * @value de
 * @option 希臘語
 * @value el
 * @option 匈牙利語
 * @value hu
 * @option 義大利語
 * @value it
 * @option 日語
 * @value ja
 * @option 韓語
 * @value ko
 * @option 挪威語
 * @value no
 * @option 波蘭語
 * @value pl
 * @option 葡萄牙語
 * @value pt
 * @option 羅馬尼亞語
 * @value ro
 * @option 西班牙語
 * @value es
 * @option 瑞典語
 * @value sv
 * @option 泰語
 * @value th
 * @option 土耳其語
 * @value tr
 * 
 * @param Item Currency
 * @text 產品顯示貨幣
 * @desc 指定你想顯示貨幣的選項。
 * @type select
 * @parent BaseItem Class
 * @default TWD
 * @option 阿聯迪拉姆
 * @value AED
 * @option 阿根廷披索
 * @value ARS
 * @option 澳大利亞元
 * @value AUD
 * @option 巴西雷亞爾
 * @value BRL
 * @option 加拿大元
 * @value CAD
 * @option 瑞士法郎
 * @value CHF
 * @option 智利披索
 * @value CLP
 * @option 哥倫比亞披索
 * @value COP
 * @option 哥斯大黎加科朗
 * @value CRC
 * @option 歐元
 * @value EUR
 * @option 英鎊
 * @value GBP
 * @option 港幣
 * @value HKD
 * @option 以色列新謝克爾
 * @value ILS
 * @option 印尼盧比
 * @value IDR
 * @option 印度盧比
 * @value INR
 * @option 日元
 * @value JPY
 * @option 韓元
 * @value KRW
 * @option 科威特第納爾
 * @value KWD
 * @option 哈薩克堅戈
 * @value KZT
 * @option 墨西哥披索
 * @value MXN
 * @option 馬來西亞令吉
 * @value MYR
 * @option 挪威克朗
 * @value NOK
 * @option 紐西蘭元
 * @value NZD
 * @option 秘魯索爾
 * @value PEN
 * @option 菲律賓披索
 * @value PHP
 * @option 波蘭茲羅提
 * @value PLN
 * @option 卡達里亞爾
 * @value QAR
 * @option 沙烏地里亞爾
 * @value SAR
 * @option 新加坡元
 * @value SGD
 * @option 泰銖
 * @value THB
 * @option 土耳其里拉
 * @value TRY
 * @option 新臺幣
 * @value TWD
 * @option 美元
 * @value USD
 * @option 烏拉圭披索
 * @value UYU
 * @option 越南盾
 * @value VND
 * @option 南非蘭特
 * @value ZAR
 * 
 * @param Item Name
 * @text 產品名稱
 * @desc 指定產品的顯示名稱。
 * @type string
 * @parent BaseItem Class
 * @default 產品01
 * 
 * @param Item CartCount
 * @text 產品購買數量
 * @desc 指定產品的購買數量。
 * @type number
 * @parent BaseItem Class
 * @default 1
 * @min 1
 * @max 4294967295
 * 
 * @param Item Count
 * @text 產品數量
 * @desc 指定產品的數量。
 * @type number
 * @parent BaseItem Class
 * @default 1
 * @min 1
 * @max 32767
 * 
 * @param Item Amount
 * @text 產品金額
 * @desc 指定產品的金額，以美分為單位，例如1美元等於100美分。
 * @type number
 * @parent BaseItem Class
 * @default 100
 * @min 100
 * @max 9223372036854775807
 * 
 */
//=============================================================================
'use strict';

let NekoGakuen_SteamworksAPI = {};
let platformFlag = Utils.isNwjs() ? (typeof Utils.isElectronjs === "function" ? (Utils.isElectronjs() ? "Electronjs" : "Nwjs") : "Nwjs") : null;
function pluginisTChinese(name01, name02) {
    return navigator.language == 'zh-TW' ? name01 : name02;
};

let NekoGakuen_SteamworksAPI_PluginName = PluginManager._scripts.includes(PluginManager.parameters("NekoGakuen_SteamworksAPI")["Translate Patch"]) ? String(PluginManager.parameters("NekoGakuen_SteamworksAPI")["Translate Patch"]) : "NekoGakuen_SteamworksAPI";
NekoGakuen_SteamworksAPI.Parameters = PluginManager.parameters(NekoGakuen_SteamworksAPI_PluginName);
NekoGakuen_SteamworksAPI = {
    SteamAppID: Number(NekoGakuen_SteamworksAPI.Parameters['Steam AppID'] || 480),
    SteamAPIkey: String(NekoGakuen_SteamworksAPI.Parameters['Steam API key'] || ''),
    CheckBuyGameBoolean: String(NekoGakuen_SteamworksAPI.Parameters['Check BuyGame Boolean'] || 'true'),
    CheckFullScreen: String(NekoGakuen_SteamworksAPI.Parameters['Check FullScreen'] || 'true'),
    CheckOverlayPause: String(NekoGakuen_SteamworksAPI.Parameters['Check Overlay Pause'] || 'false'),
    CheckMusicPause: String(NekoGakuen_SteamworksAPI.Parameters['Check Music Pause'] || 'false'),
    SandBoxModeBoolean: String(NekoGakuen_SteamworksAPI.Parameters['SandBox Mode Boolean'] || 'true'),
    OrderidVariable: Number(NekoGakuen_SteamworksAPI.Parameters['Orderid Variable'] || 0),
    TransidVariable: Number(NekoGakuen_SteamworksAPI.Parameters['Transid Variable'] || 0),
    ResultVariable: Number(NekoGakuen_SteamworksAPI.Parameters['Result Variable'] || 0),
    LeaderboardsVariable: Number(NekoGakuen_SteamworksAPI.Parameters['Leaderboards Variable'] || 0),
    LeaderboardsNameVariable: Number(NekoGakuen_SteamworksAPI.Parameters['LeaderboardsName Variable'] || 0),
    ErrorBuyGameTitle: String(NekoGakuen_SteamworksAPI.Parameters['Error BuyGame Title'] || pluginisTChinese('未購買遊戲', 'No Games Purchased')),
    ErrorBuyGameMessage: String(NekoGakuen_SteamworksAPI.Parameters['Error BuyGame Message'] || pluginisTChinese('您尚未在Steam上購買本遊戲。', 'You have not yet purchased this game on Steam.')),
    ErrorBuyGameButton: String(NekoGakuen_SteamworksAPI.Parameters['Error BuyGame Button'] || pluginisTChinese('前往購買', 'Buy Game')),
    MicroTxnProductList: JSON.parse(NekoGakuen_SteamworksAPI.Parameters['MicroTxn Product List']),
    MicroTxnProductParse: null,
    MicroTxnItemID: Array(),
    MicroTxnItemLanguage: Array(),
    MicroTxnItemCurrency: Array(),
    MicroTxnItemName: Array(),
    MicroTxnItemCartCount: Array(),
    MicroTxnItemCount: Array(),
    MicroTxnItemAmount: Array(),
    PlayerRankList: Array(),
    PlayerNameList: Array(),
    PlayerScoreList: Array(),

    SteamDeckPause: false,
    CheckOverlay: false,
    SteamGameLaunch: false,
    ConsoleError01: pluginisTChinese('無法讀取Greenworks或Steamworks SDK。', 'Cannot read Greenworks or Steamworks SDK.'),
    ConsoleError02: pluginisTChinese('Greenworks初始化失敗。', 'Greenworks initialization failed.'),
    ConsoleError03: pluginisTChinese('未指定遊戲應用程式ID。', 'Game appID is not set.'),
    ConsoleError04: pluginisTChinese('未指定分頁選項。', 'Option name is not set.'),
    ConsoleError05: pluginisTChinese('未指定URL。', 'URL is not set.'),
    ConsoleError06: pluginisTChinese('未指定成就ID。', 'Achievement ID is not set.'),
    ConsoleError07: pluginisTChinese('未成功取得成就資訊。', 'No success in get achievement information.'),
    ConsoleError08: pluginisTChinese('未指定開關ID。', 'Switches ID is not set.'),
    ConsoleError09: pluginisTChinese('未指定目前進度數值。', 'Current progress values is not set.'),
    ConsoleError10: pluginisTChinese('未指定最大進度數值。', 'Max progress values is not set.'),
    ConsoleError11: pluginisTChinese('未指定DLC應用程式ID。', 'DLC AppID is not set.'),
    ConsoleError12: pluginisTChinese('未指定變數ID。', 'Variables ID is not set.'),
    ConsoleError13: pluginisTChinese('未成功取得玩家數量。', 'No success in get number of players.'),
    ConsoleError14: pluginisTChinese('未指定統計名稱。', 'Stats name is not set.'),
    ConsoleError15: pluginisTChinese('未指定統計數值。', 'Stats value is not set.'),
    ConsoleError16: pluginisTChinese('未指定數值類型。', 'Value Type is not set.'),
    ConsoleError17: pluginisTChinese('未成功傳送統計資料。', 'No success in sent stat data.'),
    ConsoleError18: pluginisTChinese('未指定產品ID。', 'Product ID is not set.'),
    ConsoleError19: pluginisTChinese('未成功取得本機資料。', 'No success in get local data.'),
    ConsoleError20: pluginisTChinese('未成功取得雲端資料。', 'No success in get cloud data.'),
    ConsoleError21: pluginisTChinese('未成功刪除雲端資料。', 'No success in delete cloud data.'),
    ConsoleLog01: pluginisTChinese('已清除該成就。', 'The achievements have been cleared.'),
    ConsoleLog02: pluginisTChinese('已成功刪除雲端資料。', 'The cloud data was successfully deleted.')
};

for (let i = 0; i < NekoGakuen_SteamworksAPI.MicroTxnProductList.length; i++) {
    NekoGakuen_SteamworksAPI.MicroTxnProductParse = JSON.parse(NekoGakuen_SteamworksAPI.MicroTxnProductList[i]);
    NekoGakuen_SteamworksAPI.MicroTxnItemID.push(Number(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item ID"]));
    NekoGakuen_SteamworksAPI.MicroTxnItemLanguage.push(String(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item Language"]));
    NekoGakuen_SteamworksAPI.MicroTxnItemCurrency.push(String(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item Currency"]));
    NekoGakuen_SteamworksAPI.MicroTxnItemName.push(String(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item Name"]));
    NekoGakuen_SteamworksAPI.MicroTxnItemCartCount.push(Number(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item CartCount"]));
    NekoGakuen_SteamworksAPI.MicroTxnItemCount.push(Number(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item Count"]));
    NekoGakuen_SteamworksAPI.MicroTxnItemAmount.push(parseFloat(String(NekoGakuen_SteamworksAPI.MicroTxnProductParse["Item Amount"])));
};


function SteamworksAPIManager() {
    throw new Error('This is a static class');
};

SteamworksAPIManager.initialize = function () {
    if (typeof require === 'function') {
        try {
            if (platformFlag == "Nwjs") {
                this.greenworksCore = require('./greenworks');
            } else {
                this.greenworksCore = greenworksCore;
            }
        } catch (e) {
            this.greenworksCore = false;
            console.error(NekoGakuen_SteamworksAPI.ConsoleError01);
            console.error(e);
            return false;
        }
        if (this.greenworksCore) {
            this.greenworksAPI = this.greenworksCore.initAPI();
            this.checkGameOverlay();
        } else {
            console.error(NekoGakuen_SteamworksAPI.ConsoleError02);
            return false;
        }
    }
};

SteamworksAPIManager.isSteamClientRun = function () {
    return this.greenworksCore && this.greenworksCore.isSteamRunning();
};

SteamworksAPIManager.terminate = function () {
    if (this.greenworksCore) {
        this.greenworksCore = false;
    }
    return false;
};

SteamworksAPIManager.getGenerateRandomOrderld = function (value) {
    const characters = '0123456789';
    let result1 = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < value; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (result1 >= 18446744073709551615) {
        this.getGenerateRandomOrderld(value)
    }
    return result1;
}

SteamworksAPIManager.isSubscribedApp = function (appId, switchesId) {
    if (!appId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError03);
        return false;
    } else if (appId == "this") {
        appId = NekoGakuen_SteamworksAPI.SteamAppID;
    }
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.isSubscribedApp(appId));
    }
    return this.greenworksCore.isSubscribedApp(appId);
};

SteamworksAPIManager.isAppInstalled = function (appId, switchesId) {
    if (!appId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError03);
        return false;
    } else if (appId == "this") {
        appId = NekoGakuen_SteamworksAPI.SteamAppID;
    }
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.isAppInstalled(appId));
    }
    return this.greenworksCore.isAppInstalled(appId);
};

SteamworksAPIManager.activateGameOverlay = function (options) {
    if (!options) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError04);
        return false;
    }
    if (!this.isSteamClientRun() && this.isGameOverlayEnabled()) { return false; }
    this.greenworksCore.activateGameOverlay(options);
};

SteamworksAPIManager.activateGameOverlayToWebPage = function (url) {
    if (!url) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError05);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.activateGameOverlayToWebPage(url);
};

SteamworksAPIManager.activateAchievement = function (achievementId, commonEventId) {
    if (!achievementId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError06);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.activateAchievement(achievementId, function () {
        if (commonEventId) {
            $gameTemp.reserveCommonEvent(Number(commonEventId));
            return false;
        }
    }, function () {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError07);
    });
};

SteamworksAPIManager.getAchievement = function (achievementId, switchesId) {
    if (!achievementId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError06);
        return false;
    }
    if (!switchesId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError08);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.getAchievement(achievementId, function (is_achieved) {
        if (switchesId) {
            $gameSwitches.setValue(Number(switchesId), is_achieved);
        }
    }, function () {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError07);
    });
};

SteamworksAPIManager.clearAchievement = function (achievementId) {
    if (!achievementId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError06);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.clearAchievement(achievementId, function () {
        console.log(NekoGakuen_SteamworksAPI.ConsoleLog01, "color: green;");
    }, function () {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError07);
    });
};

SteamworksAPIManager.indicateAchievementProgress = function (achievementId, currentValue, maxValue, switchesId) {
    if (!achievementId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError06);
        return false;
    } else if (!currentValue) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError09);
        return false;
    } else if (!maxValue) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError10);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.indicateAchievementProgress(achievementId, currentValue, maxValue));
    }
    return this.greenworksCore.indicateAchievementProgress(achievementId, currentValue, maxValue);
};

SteamworksAPIManager.getDLCCount = function (variablesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (variablesId) {
        $gameVariables.setValue(Number(variablesId), this.greenworksCore.getDLCCount());
    }
    return this.greenworksCore.getDLCCount();
};

SteamworksAPIManager.isDLCInstalled = function (dlc_app_id, switchesId) {
    if (!dlc_app_id) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError11);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.isDLCInstalled(dlc_app_id));
    }
    return this.greenworksCore.isDLCInstalled(dlc_app_id);
};

SteamworksAPIManager.installDLC = function (dlc_app_id) {
    if (!dlc_app_id) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError11);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.installDLC(dlc_app_id);
};

SteamworksAPIManager.uninstallDLC = function (dlc_app_id) {
    if (!dlc_app_id) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError11);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.uninstallDLC(dlc_app_id);
};

SteamworksAPIManager.getCurrentGameLanguage = function (variablesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (variablesId) {
        $gameVariables.setValue(Number(variablesId), this.greenworksCore.getCurrentGameLanguage());
    }
    return this.greenworksCore.getCurrentGameLanguage();
};

SteamworksAPIManager.getCurrentUILanguage = function (variablesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (variablesId) {
        $gameVariables.setValue(Number(variablesId), this.greenworksCore.getCurrentUILanguage());
    }
    return this.greenworksCore.getCurrentUILanguage();
};

SteamworksAPIManager.getNumberOfPlayers = function (variablesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (!variablesId) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError12);
        return false;
    }
    this.greenworksCore.getNumberOfPlayers(function (num_of_players) {
        $gameVariables.setValue(Number(variablesId), num_of_players);
    }, function () {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError13);
    });
};

SteamworksAPIManager.isGameOverlayEnabled = function (switchesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.isGameOverlayEnabled());
    }
    return this.greenworksCore.isGameOverlayEnabled();
};

SteamworksAPIManager.isSteamInBigPictureMode = function (switchesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.isSteamInBigPictureMode());
    }
    return this.greenworksCore.isSteamInBigPictureMode();
};

SteamworksAPIManager.isSteamDeckMode = function (switchesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' ? true : false);
    }
    return process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' ? true : false;
};

SteamworksAPIManager.setStat = function (statsName, statsValue, switchesId) {
    if (!statsName) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError14);
        return false;
    }
    if (!statsValue) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError15);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    if (switchesId) {
        $gameSwitches.setValue(Number(switchesId), this.greenworksCore.setStat(String(statsName), statsValue));
    }
    return this.greenworksCore.setStat(String(statsName), statsValue);
};

SteamworksAPIManager.getStat = function (statsName, valueType, variablesId) {
    if (!statsName) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError14);
        return false;
    }
    if (!valueType) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError16);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    if (valueType == 1) {
        if (variablesId) {
            $gameVariables.setValue(Number(variablesId), this.greenworksCore.getStatFloat(statsName));
        }
        return pthis.greenworksCore.getStatFloat(statsName, statsValue);
    } else if (valueType == 2) {
        if (variablesId) {
            $gameVariables.setValue(Number(variablesId), this.greenworksCore.getStatInt(statsName));
        }
        return this.greenworksCore.getStatInt(statsName);
    }
};

SteamworksAPIManager.storeStats = function () {
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.storeStats(function (game_id) {
    }, function () {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError17);
    });
};

SteamworksAPIManager.goToGamePage = function () {
    if (!this.isSteamClientRun()) { return false; }
    if (platformFlag == "Nwjs") {
        require('nw.gui').Shell.openExternal('steam://store/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
    } else {
        require('electron').ipcRenderer.send('openExternal', 'steam://store/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
    }
    return false;
};

SteamworksAPIManager.getSteamId = function (variablesId) {
    if (!this.isSteamClientRun()) { return false; }
    if (variablesId) {
        $gameVariables.setValue(Number(variablesId), this.greenworksCore.getSteamId());
    }
    return this.greenworksCore.getSteamId();
};

SteamworksAPIManager.callMicroTxn = function (itemld) {

    if (!Number(itemld) || NekoGakuen_SteamworksAPI.MicroTxnItemID.indexOf(Number(itemld)) == -1) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError18);
        return false;
    }
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var sandBox = NekoGakuen_SteamworksAPI.SandBoxModeBoolean == 'true' ? 'ISteamMicroTxnSandbox' : 'ISteamMicroTxn'
    var url = `https://partner.steam-api.com/${sandBox}/InitTxn/v3/`;
    var numran = Number(this.getGenerateRandomOrderld(20));
    var steamInfo = JSON.stringify(this.getSteamId());
    var steamInfo2 = JSON.parse(steamInfo).steamId;
    var productid = NekoGakuen_SteamworksAPI.MicroTxnItemID.indexOf(Number(itemld))
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&orderid=${numran}&steamid=${steamInfo2}&usersession=client&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&itemcount=${NekoGakuen_SteamworksAPI.MicroTxnItemCartCount[productid]}&language=${NekoGakuen_SteamworksAPI.MicroTxnItemLanguage[productid]}&currency=${NekoGakuen_SteamworksAPI.MicroTxnItemCurrency[productid]}&itemid[0]=${NekoGakuen_SteamworksAPI.MicroTxnItemID[productid]}&qty[0]=${NekoGakuen_SteamworksAPI.MicroTxnItemCount[productid]}&amount[0]=${NekoGakuen_SteamworksAPI.MicroTxnItemAmount[productid]}&description[0]=${NekoGakuen_SteamworksAPI.MicroTxnItemName[productid]}&timestamp=${timestamp}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            if (data.response.result == "OK") {
                $gameVariables.setValue(NekoGakuen_SteamworksAPI.ResultVariable, 0);
                $gameVariables.setValue(NekoGakuen_SteamworksAPI.OrderidVariable, data.response.params.orderid);
                $gameVariables.setValue(NekoGakuen_SteamworksAPI.TransidVariable, data.response.params.transid);
                SteamworksAPIManager.activateGameOverlayToWebPage(data.response.params.steamurl);
            } else {
                if ($gameVariables.value(Number(NekoGakuen_SteamworksAPI.ResultVariable)) != 4) {
                    SteamworksAPIManager.callMicroTxn(Number(itemld));
                }
            }
        }
    };
    http.send(params);
};

SteamworksAPIManager.isMicroTxnQuery = function () {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var sandBox = NekoGakuen_SteamworksAPI.SandBoxModeBoolean == 'true' ? 'ISteamMicroTxnSandbox' : 'ISteamMicroTxn'
    var url = `https://partner.steam-api.com/${sandBox}/QueryTxn/v3`;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&orderid=${$gameVariables.value(Number(NekoGakuen_SteamworksAPI.OrderidVariable))}&transid=${$gameVariables.value(Number(NekoGakuen_SteamworksAPI.TransidVariable))}&timestamp=${timestamp}`;
    http.open('GET', url + '?' + params, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            if (data.response.params.status == "Init") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 1);
            }
            if (data.response.params.status == "Approved") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 2);
            }
            if (data.response.params.status == "Succeeded") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 3);
            }
            if (data.response.params.status == "Failed") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 4);
            }
            if (data.response.params.status == "Refunded") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 5);
            }
            if (data.response.params.status == "PartialRefund") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 6);
            }
            if (data.response.params.status == "Refunded") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 7);
            }
            if (data.response.params.status == "RefundedSuspectedFraud") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 8);
            }
            if (data.response.params.status == "RefundedFriendlyFraud") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 9);
            }
        }
    };
    http.send();
};

SteamworksAPIManager.refundMicroTxn = function () {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var sandBox = NekoGakuen_SteamworksAPI.SandBoxModeBoolean == 'true' ? 'ISteamMicroTxnSandbox' : 'ISteamMicroTxn'
    var url = `https://partner.steam-api.com/${sandBox}/RefundTxn/v2/`;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&orderid=${$gameVariables.value(Number(NekoGakuen_SteamworksAPI.OrderidVariable))}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&timestamp=${timestamp}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            if (data.response.result == "OK") {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 11);
            } else {
                $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.ResultVariable), 12);
            }
        }
    };
    http.send(params);
};

SteamworksAPIManager.finalizeMicroTxn = function () {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var sandBox = NekoGakuen_SteamworksAPI.SandBoxModeBoolean == 'true' ? 'ISteamMicroTxnSandbox' : 'ISteamMicroTxn'
    var url = `https://partner.steam-api.com/${sandBox}/FinalizeTxn/v2/`;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&orderid=${$gameVariables.value(Number(NekoGakuen_SteamworksAPI.OrderidVariable))}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&timestamp=${timestamp}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
        }
    }
    http.send(params);
};

SteamworksAPIManager.saveFileToCloud = function (file_name, file_content) {
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.saveTextToFile(file_name, file_content, function () {
    }, function (errlog) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError19);
        console.error(errlog);
    });
};

SteamworksAPIManager.readCloudFromFile = function (file_name, temp) {
    if (!this.isSteamClientRun()) { return false; }
    const fs = require('fs');
    const tempfile = temp ? '_temp' : '';
    this.greenworksCore.readTextFromFile(file_name, function (contents) {
        if (Utils.RPGMAKER_NAME === "MZ") {
            fs.writeFile(StorageManager.localFileDirectoryPath() + file_name + tempfile + '.rmmzsave', contents, 'base64', function () {
            });
        }
        if (Utils.RPGMAKER_NAME === "MV") {
            fs.writeFile(StorageManager.localFileDirectoryPath() + file_name + tempfile + '.rpgsave', contents, 'base64', function () {
            });
        }
    }, function (errlog) {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError20);
        console.error(errlog);
    });
};

SteamworksAPIManager.deleteCloudFile = function (file_name) {
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.deleteFile(file_name, function () {
        console.log(NekoGakuen_SteamworksAPI.ConsoleLog02, "color: green;");
    }, function () {
        console.error(NekoGakuen_SteamworksAPI.ConsoleError21);
    });
};

SteamworksAPIManager.checkGameOverlay = function () {
    if (!this.isSteamClientRun()) { return false; }
    this.greenworksCore.init();
    this.greenworksCore.on('game-overlay-activated', function (is_active) {
        if (is_active) {
            NekoGakuen_SteamworksAPI.CheckOverlay = true;
            if (process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true') {
                NekoGakuen_SteamworksAPI.SteamDeckPause = true;
            }
        } else {
            NekoGakuen_SteamworksAPI.CheckOverlay = false;
            if (process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true') {
                NekoGakuen_SteamworksAPI.SteamDeckPause = false;
            }
        }
    });
};

SteamworksAPIManager.getPlayerName = function (steamId, variablesId) {
    if (!this.isSteamClientRun()) { return false; }
    fetch('https://steamcommunity.com/profiles/' + steamId).then(function (response) {
        return response.text();
    }).then(function (html) {
        let matches = html.match(/(?<="personaname":")(.+?)(?=")/g)
        NekoGakuen_SteamworksAPI.PlayerNameList.push(matches[0]);
        if (variablesId) {
            $gameVariables.setValue(Number(variablesId), matches[0]);
        }
        return matches[0];
    }).catch(function (err) {
        console.warn('Something went wrong', err);
    });
};

SteamworksAPIManager.deleteLeaderboard = function (name) {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var url = `https://partner.steam-api.com/ISteamLeaderboards/DeleteLeaderboard/v1/`;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&name=${name}&timestamp=${timestamp}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
        }
    };
    http.send(params);
};

SteamworksAPIManager.findOrCreateLeaderboard = function (name, createifnotfound, onlytrustedwrites, onlyfriendsreads) {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var url = `https://partner.steam-api.com/ISteamLeaderboards/FindOrCreateLeaderboard/v2/`;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&name=${name}&sortmethod=descending&createifnotfound=${createifnotfound}&onlytrustedwrites=${onlytrustedwrites}&onlyfriendsreads=${onlyfriendsreads}&timestamp=${timestamp}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
        }
    };
    http.send(params);
};

SteamworksAPIManager.getLeaderboardEntries = function (rangestart, rangeend, datarequest) {
    if (!this.isSteamClientRun()) { return false; }
    NekoGakuen_SteamworksAPI.PlayerRankList = [];
    NekoGakuen_SteamworksAPI.PlayerNameList = [];
    NekoGakuen_SteamworksAPI.PlayerScoreList = [];
    var http = new XMLHttpRequest();
    var url = `https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardEntries/v1/`;
    var leaderboardid = $gameVariables.value(Number(NekoGakuen_SteamworksAPI.LeaderboardsVariable));
    var steamInfo = JSON.stringify(this.getSteamId());
    var steamInfo2 = JSON.parse(steamInfo).steamId;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&rangestart=${rangestart}&rangeend=${rangeend}&steamid=${steamInfo2}&leaderboardid=${leaderboardid}&datarequest=${datarequest}&timestamp=${timestamp}`;
    http.open('GET', url + '?' + params, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            for (let i = 0; i < data.leaderboardEntryInformation.leaderboardEntries.length; i++) {
                NekoGakuen_SteamworksAPI.PlayerRankList.push(Number(data.leaderboardEntryInformation.leaderboardEntries[i].rank));
                SteamworksAPIManager.getPlayerName(data.leaderboardEntryInformation.leaderboardEntries[i].steamID);
                NekoGakuen_SteamworksAPI.PlayerScoreList.push(Number(data.leaderboardEntryInformation.leaderboardEntries[i].score));
            };
        }
    };
    http.send();
};

SteamworksAPIManager.getLeaderboardsForGame = function (Id) {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var url = `https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardsForGame/v2/`;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&timestamp=${timestamp}`;
    http.open('GET', url + '?' + params, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.LeaderboardsVariable), data.response.leaderboards[Id].id);
            $gameVariables.setValue(Number(NekoGakuen_SteamworksAPI.LeaderboardsNameVariable), data.response.leaderboards[Id].name);
        }
    };
    http.send();
};

SteamworksAPIManager.resetLeaderboard = function () {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var url = `https://partner.steam-api.com/ISteamLeaderboards/ResetLeaderboard/v1/`;
    var leaderboardid = $gameVariables.value(Number(NekoGakuen_SteamworksAPI.LeaderboardsVariable));
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&leaderboardid=${leaderboardid}&timestamp=${timestamp}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
        }
    };
    http.send(params);
};

SteamworksAPIManager.setLeaderboardScore = function (score, scoremethod) {
    if (!this.isSteamClientRun()) { return false; }
    var http = new XMLHttpRequest();
    var url = `https://partner.steam-api.com/ISteamLeaderboards/SetLeaderboardScore/v1/`;
    var leaderboardid = $gameVariables.value(Number(NekoGakuen_SteamworksAPI.LeaderboardsVariable));
    var steamInfo = JSON.stringify(this.getSteamId());
    var steamInfo2 = JSON.parse(steamInfo).steamId;
    var timestamp = new Date().getTime();
    var params = `key=${NekoGakuen_SteamworksAPI.SteamAPIkey}&appid=${NekoGakuen_SteamworksAPI.SteamAppID}&leaderboardid=${leaderboardid}&steamid=${steamInfo2}&score=${score}&scoremethod=${scoremethod}&timestamp=${timestamp}`;
    http.open('POST', url + '?' + params, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
        }
    };
    http.send(params);
};


if (Utils.RPGMAKER_NAME === "MZ") {
    (() => {

        PluginManager.isPlugins = function (pluginsName) {
            return this._scripts.includes(pluginsName);
        };


        Graphics.showBuyGameButton = function (retry) {
            const button = document.createElement("button");
            button.id = "retryButton";
            button.innerHTML = NekoGakuen_SteamworksAPI.ErrorBuyGameButton;
            // [Note] stopPropagation() is required for iOS Safari.
            button.ontouchstart = e => e.stopPropagation();
            button.onclick = () => {
                Graphics.eraseError();
                retry();
            };
            this._errorPrinter.appendChild(button);
            button.focus();
        };


        NekoGakuen_SteamworksAPI._Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
        Scene_Boot.prototype.startNormalGame = function () {
            if (NekoGakuen_SteamworksAPI.CheckMusicPause == 'true') {
                if (platformFlag == "Nwjs") {
                    require('nw.gui').Shell.openExternal('steam://musicplayer/pause');
                } else {
                    require('electron').ipcRenderer.send('openExternal', 'steam://musicplayer/pause');
                }
            }
            if (NekoGakuen_SteamworksAPI.CheckBuyGameBoolean == 'true') {
                if (SteamworksAPIManager.isSteamClientRun()) {
                    if (!SteamworksAPIManager.isSubscribedApp(NekoGakuen_SteamworksAPI.SteamAppID)) {
                        Graphics.printError(NekoGakuen_SteamworksAPI.ErrorBuyGameTitle, NekoGakuen_SteamworksAPI.ErrorBuyGameMessage);
                        Graphics.showBuyGameButton(() => {
                            if (platformFlag == "Nwjs") {
                                require('nw.gui').Shell.openExternal('steam://store/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                            } else {
                                require('electron').ipcRenderer.send('openExternal', 'steam://store/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                            }
                        });
                        AudioManager.stopAll();
                        SceneManager.stop();
                    }
                } else {
                    SceneManager.checkSteamRunning();
                }
            }
            NekoGakuen_SteamworksAPI.SteamGameLaunch = true;
            NekoGakuen_SteamworksAPI._Scene_Boot_startNormalGame.call(this);
        };


        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetBuy_SteamGameApp", args => {
            SteamworksAPIManager.isSubscribedApp(String(args.appId), Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetInstalled_SteamGameApp", args => {
            SteamworksAPIManager.isAppInstalled(String(args.appId), Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Call_SteamGameOverlay", args => {
            SteamworksAPIManager.activateGameOverlay(String(args.options));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Call_SteamInGameWebURL", args => {
            SteamworksAPIManager.activateGameOverlayToWebPage(String(args.webURL));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Unlock_SteamAchievement", args => {
            if (Number(args.commonEventId)) {
                SteamworksAPIManager.activateAchievement(String(args.achievementId), Number(args.commonEventId));
            } else {
                SteamworksAPIManager.activateAchievement(String(args.achievementId));
            }
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Get_SteamAchievement", args => {
            SteamworksAPIManager.getAchievement(String(args.achievementId), Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Clear_SteamAchievement", args => {
            SteamworksAPIManager.clearAchievement(String(args.achievementId));
        });

        ////[?]
        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Progress_SteamAchievement", args => {
            SteamworksAPIManager.indicateAchievementProgress(String(args.achievementId), Number(args.currentValue), Number(args.maxValue), Number(args.switchesId));
        });
        ////

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCount_SteamDLC", args => {
            SteamworksAPIManager.getDLCCount(Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetInstalled_SteamDLC", args => {
            SteamworksAPIManager.isDLCInstalled(Number(args.dlc_app_id), Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Install_SteamDLC", args => {
            SteamworksAPIManager.installDLC(Number(args.dlc_app_id));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands Uninstall_SteamDLC", args => {
            SteamworksAPIManager.uninstallDLC(Number(args.dlc_app_id));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCurrentGame_SteamLanguage", args => {
            SteamworksAPIManager.getCurrentGameLanguage(Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCurrentUI_SteamLanguage", args => {
            SteamworksAPIManager.getCurrentUILanguage(Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCurrentCount_SteamPlayers", args => {
            SteamworksAPIManager.getNumberOfPlayers(Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCurrentState_SteamGameOverlay", args => {
            SteamworksAPIManager.isGameOverlayEnabled(Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCurrentState_SteamBigPictureMode", args => {
            SteamworksAPIManager.isSteamInBigPictureMode(Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetCurrentState_SteamDeckMode", args => {
            SteamworksAPIManager.isSteamDeckMode(Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands SetValue_SteamStats", args => {
            SteamworksAPIManager.setStat(String(args.statsName), Number(args.statsValue), Number(args.switchesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetValue_SteamStats", args => {
            SteamworksAPIManager.getStat(String(args.statsName), Number(args.valueType), Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands StoreValues_SteamStats", args => {
            SteamworksAPIManager.storeStats();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands BuyGamePage_SteamGameApp", args => {
            SteamworksAPIManager.goToGamePage();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetSteamID_SteamPlayers", args => {
            SteamworksAPIManager.getSteamId(Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetPlayerName_SteamPlayers", args => {
            SteamworksAPIManager.getPlayerName(Number(args.steamId), Number(args.variablesId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands CallBuyItem_SteamMicroTxn", args => {
            SteamworksAPIManager.callMicroTxn(String(args.productId));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetBuyQuery_SteamMicroTxn", args => {
            SteamworksAPIManager.isMicroTxnQuery();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands CallRefund_SteamMicroTxn", args => {
            SteamworksAPIManager.refundMicroTxn();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands CallFinalBuy_SteamMicroTxn", args => {
            SteamworksAPIManager.finalizeMicroTxn();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands DelAllCloudData_SteamCloudSave", args => {
            CloudSaveManager.clearAllCloud();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands DeleteLeaderboard_SteamLeaderboard", args => {
            SteamworksAPIManager.deleteLeaderboard(String(args.name));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands FindOrCreateLeaderboard_SteamLeaderboard", args => {
            SteamworksAPIManager.findOrCreateLeaderboard(String(args.name), args.createifnotfound, args.onlytrustedwrites, args.onlyfriendsreads);
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetLeaderboardEntries_SteamLeaderboard", args => {
            if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) == 0) {
                SoundManager.playBuzzer();
            } else {
                SteamworksAPIManager.getLeaderboardEntries(Number(args.rangestart), Number(args.rangeend), args.datarequest);
            }
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands GetLeaderboardsForGame_SteamLeaderboard", args => {
            SteamworksAPIManager.getLeaderboardsForGame(Number(args.Id));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands ResetLeaderboard_SteamLeaderboard", args => {
            SteamworksAPIManager.resetLeaderboard();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands SetLeaderboardScore_SteamLeaderboard", args => {
            const scoreValue = args.scoreVariableID && args.scoreVariableID !== '0' ? $gameVariables.value(Number(args.scoreVariableID)) : Number(args.score);
            if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) === 0) {
                SoundManager.playBuzzer();
            } else {
                SteamworksAPIManager.setLeaderboardScore(scoreValue, args.scoremethod);
            }
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksAPI_PluginName, "NekoCommands CallLeaderboard_SteamLeaderboard", args => {
            if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) == 0) {
                SoundManager.playBuzzer();
            } else {
                SceneManager.push(Scene_Leaderboards);
            }
        });


        NekoGakuen_SteamworksAPI._SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function () {
            NekoGakuen_SteamworksAPI._SceneManager_initialize.apply(this, arguments);
            SteamworksAPIManager.initialize();
            if (process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckFullScreen == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckFullScreen == 'true') {
                Graphics._requestFullScreen();
            };
        };

        SceneManager.updateScene = function () {
            if (this._scene) {
                if (this._scene.isStarted()) {
                    if (process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true') {
                        if (!NekoGakuen_SteamworksAPI.SteamDeckPause && this.isGameActive()) {
                            this._scene.update();
                            WebAudio.setMasterVolume(1);
                        } else {
                            WebAudio.setMasterVolume(0);
                        }
                    } else {
                        this._scene.update();
                    }
                } else if (this._scene.isReady()) {
                    this.onBeforeSceneStart();
                    this._scene.start();
                    this.onSceneStart();
                }
            }
        };

        NekoGakuen_SteamworksAPI._SceneManager_updateMain = SceneManager.updateMain;
        SceneManager.updateMain = function () {
            NekoGakuen_SteamworksAPI._SceneManager_updateMain.call(this);
            if (NekoGakuen_SteamworksAPI.CheckBuyGameBoolean == 'true') {
                this.checkSteamRunning();
            }
        };

        SceneManager.checkSteamRunning = function () {
            if (!SteamworksAPIManager.isSteamClientRun()) {
                if (NekoGakuen_SteamworksAPI.SteamGameLaunch == true) {
                    SceneManager.exit();
                } else {
                    if (platformFlag == "Nwjs") {
                        require('nw.gui').Shell.openExternal('steam://launch/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                    } else {
                        require('electron').ipcRenderer.send('openExternal', 'steam://launch/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                    }
                    SceneManager.exit();
                }
            }
        };


        function Window_LeaderboardTitle() {
            this.initialize(...arguments);
        };

        Window_LeaderboardTitle.prototype = Object.create(Window_Base.prototype);
        Window_LeaderboardTitle.prototype.constructor = Window_LeaderboardTitle;

        Window_LeaderboardTitle.prototype.initialize = function (rect) {
            Window_Base.prototype.initialize.call(this, rect);
            this._text = "";
            this.opacity = 255;
        };

        Window_LeaderboardTitle.prototype.setText = function (text) {
            if (this._text !== text) {
                this._text = text;
                this.refresh();
            }
        };

        Window_LeaderboardTitle.prototype.clear = function () {
            this.setText("");
        };

        Window_LeaderboardTitle.prototype.setItem = function () {
            this.setText($gameVariables.value(Number(NekoGakuen_SteamworksAPI.LeaderboardsNameVariable)));
        };

        Window_LeaderboardTitle.prototype.refresh = function () {
            const rect = this.baseTextRect();
            this.contents.clear();
            this.drawText(this._text, rect.x, rect.y, rect.width, 'center');
        };


        function Window_Leaderboard() {
            this.initialize(...arguments);
        };

        Window_Leaderboard.prototype = Object.create(Window_Selectable.prototype);
        Window_Leaderboard.prototype.constructor = Window_Leaderboard;

        Window_Leaderboard.prototype.initialize = function (rect) {
            Window_Selectable.prototype.initialize.call(this, rect);
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            this.setTopRow(0);
            this.select(0);
            this.activate();
            this.refresh();
        };

        Window_Leaderboard.prototype.maxCols = function () {
            return 1;
        };

        Window_Leaderboard.prototype.colSpacing = function () {
            return 16;
        };

        Window_Leaderboard.prototype.maxItems = function () {
            return NekoGakuen_SteamworksAPI.PlayerRankList.length;
        };

        Window_Leaderboard.prototype.lineHeight = function () {
            return Window_Base.prototype.lineHeight.call(this);
        };

        Window_Leaderboard.prototype.windowWidth = function () {
            return 400;
        };

        Window_Leaderboard.prototype.windowHeight = function () {
            return this.fittingHeight(10);
        };

        Window_Leaderboard.prototype.drawItem = function (index) {
            const rect = this.itemLineRect(index);
            this.resetTextColor();
            this.drawText(NekoGakuen_SteamworksAPI.PlayerRankList[index], rect.x, rect.y, rect.width, "left");
            this.drawText(NekoGakuen_SteamworksAPI.PlayerNameList[index], rect.x + 50, rect.y, rect.width, "left");
            this.drawText(NekoGakuen_SteamworksAPI.PlayerScoreList[index], rect.x, rect.y, rect.width, "right");
        };

        Window_Leaderboard.prototype.numVisibleRows = function () {
            return args_LanNameList.length;
        };

        Window_Leaderboard.prototype.item = function () {
            return this.itemAt(this.index());
        };

        Window_Leaderboard.prototype.itemAt = function (index) {
            return this.itemName(index);
        };

        Window_Leaderboard.prototype.refresh = function () {
            Window_Selectable.prototype.refresh.call(this);
        };



        function Scene_Leaderboards() {
            this.initialize(...arguments);
        };

        Scene_Leaderboards.prototype = Object.create(Scene_MenuBase.prototype);
        Scene_Leaderboards.prototype.constructor = Scene_Leaderboards;

        Scene_Leaderboards.prototype.initialize = function () {
            Scene_MenuBase.prototype.initialize.call(this);

        };
        Scene_Leaderboards.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createLeaderboardTitleWindow();
            this.createLeaderboardWindow();
        };

        Scene_Leaderboards.prototype.terminate = function () {
            Scene_MenuBase.prototype.terminate.call(this);
        };

        Scene_Leaderboards.prototype.createLeaderboardTitleWindow = function () {
            const rect = this.leaderboardTitleWindowRect();
            this._leaderboardTitleWindow = new Window_LeaderboardTitle(rect);
            this.addWindow(this._leaderboardTitleWindow);
        };

        Scene_Leaderboards.prototype.leaderboardTitleWindowRect = function () {
            const ww = 400;
            const wh = this.calcWindowHeight(1, true);
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = 20;
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Leaderboards.prototype.createLeaderboardWindow = function () {
            const rect = this.leaderboardWindowRect();
            this._leaderboardWindow = new Window_Leaderboard(rect);
            this._leaderboardWindow.setHandler("cancel", this.popScene.bind(this));
            this.addWindow(this._leaderboardWindow);
        };

        Scene_Leaderboards.prototype.leaderboardWindowRect = function () {
            const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
            const ww = 400;
            const wh = this.calcWindowHeight(n, true);
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = 20 + this._leaderboardTitleWindow.height;
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Leaderboards.prototype.update = function () {
            Scene_MenuBase.prototype.update.call(this);
            this._leaderboardTitleWindow.setItem();
        };

        Scene_Leaderboards.prototype.maxCommands = function () {
            return 1;
        };

        Scene_Leaderboards.prototype.maxVisibleCommands = function () {
            return 5;
        };

    })();
}

if (Utils.RPGMAKER_NAME === "MV") {
    (function () {

        var _render = Graphics.render;
        Graphics.render = function (stage) {
            if (this._skipCount < 0) {
                this._skipCount = 0;
            }
            _render.call(this, stage);
        };

        PluginManager.isPlugins = function (pluginsName) {
            return this._scripts.includes(pluginsName);
        };


        Graphics.showBuyGameButton = function () {
            var button = document.createElement('button');
            button.innerHTML = NekoGakuen_SteamworksAPI.ErrorBuyGameButton;
            button.style.fontSize = '24px';
            button.style.color = '#ffffff';
            button.style.backgroundColor = '#000000';
            button.onmousedown = button.ontouchstart = function (event) {
                if (platformFlag == "Nwjs") {
                    require('nw.gui').Shell.openExternal('steam://store/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                } else {
                    require('electron').ipcRenderer.send('openExternal', 'steam://store/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                }
                location.reload();
                event.stopPropagation();
            };
            this._errorPrinter.appendChild(button);
            this._loadingCount = -Infinity;
        };


        NekoGakuen_SteamworksAPI._Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function () {
            if (NekoGakuen_SteamworksAPI.CheckMusicPause == 'true') {
                if (platformFlag == "Nwjs") {
                    require('nw.gui').Shell.openExternal('steam://musicplayer/pause');
                } else {
                    require('electron').ipcRenderer.send('openExternal', 'steam://musicplayer/pause');
                }
            }
            if (NekoGakuen_SteamworksAPI.CheckBuyGameBoolean == 'true') {
                if (SteamworksAPIManager.isSteamClientRun()) {
                    if (!SteamworksAPIManager.isSubscribedApp(NekoGakuen_SteamworksAPI.SteamAppID)) {
                        Graphics.printError(NekoGakuen_SteamworksAPI.ErrorBuyGameTitle, NekoGakuen_SteamworksAPI.ErrorBuyGameMessage);
                        Graphics.showBuyGameButton()
                        AudioManager.stopAll();
                        SceneManager.stop();
                    }
                } else {
                    SceneManager.checkSteamRunning();
                }
            }
            NekoGakuen_SteamworksAPI.SteamGameLaunch = true;
            NekoGakuen_SteamworksAPI._Scene_Boot_start.call(this);
        };


        NekoGakuen_SteamworksAPI._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            NekoGakuen_SteamworksAPI._Game_Interpreter_pluginCommand.call(this, command, args);
            if (command === 'NekoCommands') {
                switch (args[0]) {
                    case 'GetBuy_SteamGameApp':
                        SteamworksAPIManager.isSubscribedApp(String(args[1]), Number(args[2]))
                        break;
                    case 'GetInstalled_SteamGameApp':
                        SteamworksAPIManager.isAppInstalled(String(args[1]), Number(args[2]));
                        break;
                    case 'Call_SteamGameOverlay':
                        SteamworksAPIManager.activateGameOverlay(String(args[1]));
                        break;
                    case 'Call_SteamInGameWebURL':
                        SteamworksAPIManager.activateGameOverlayToWebPage(String(args[1]));
                        break;
                    case 'Unlock_SteamAchievement':
                        if (Number(args[2])) {
                            SteamworksAPIManager.activateAchievement(String(args[1]), Number(args[2]));
                        } else {
                            SteamworksAPIManager.activateAchievement(String(args[1]));
                        }
                        break;
                    case 'Get_SteamAchievement':
                        SteamworksAPIManager.getAchievement(String(args[1]), Number(args[2]));
                        break;
                    case 'Clear_SteamAchievement':
                        SteamworksAPIManager.clearAchievement(String(args[1]));
                        break;
                    case 'Progress_SteamAchievement':
                        SteamworksAPIManager.indicateAchievementProgress(String(args[1]), Number(args[2]), Number(args[3]), Number(args[4]));
                        break;
                    case 'GetCount_SteamDLC':
                        SteamworksAPIManager.getDLCCount(Number(args[1]));
                        break;
                    case 'GetInstalled_SteamDLC':
                        SteamworksAPIManager.isDLCInstalled(String(args[1]), Number(args[2]));
                        break;
                    case 'Install_SteamDLC':
                        SteamworksAPIManager.installDLC(String(args[1]));
                        break;
                    case 'Uninstall_SteamDLC':
                        SteamworksAPIManager.uninstallDLC(String(args[1]));
                        break;
                    case 'GetCurrentGame_SteamLanguage':
                        SteamworksAPIManager.getCurrentGameLanguage(Number(args[1]));
                        break;
                    case 'GetCurrentUI_SteamLanguage':
                        SteamworksAPIManager.getCurrentUILanguage(Number(args[1]));
                        break;
                    case 'GetCurrentCount_SteamPlayers':
                        SteamworksAPIManager.getNumberOfPlayers(Number(args[1]));
                        break;
                    case 'GetCurrentState_SteamGameOverlay':
                        SteamworksAPIManager.isGameOverlayEnabled(Number(args[1]));
                        break;
                    case 'GetCurrentState_SteamBigPictureMode':
                        SteamworksAPIManager.isSteamInBigPictureMode(Number(args[1]));
                        break;
                    case 'GetCurrentState_SteamDeckMode':
                        SteamworksAPIManager.isSteamDeckMode(Number(args[1]));
                        break;
                    case 'SetValue_SteamStats':
                        SteamworksAPIManager.setStat(String(args[1]), Number(args[2]), Number(args[3]));
                        break;
                    case 'GetValue_SteamStats':
                        SteamworksAPIManager.getStat(String(args[1]), Number(args[2]), Number(args[3]));
                        break;
                    case 'StoreValues_SteamStats':
                        SteamworksAPIManager.storeStats();
                        break;
                    case 'BuyGamePage_SteamGameApp':
                        SteamworksAPIManager.goToGamePage();
                        break;
                    case 'GetSteamID_SteamPlayers':
                        SteamworksAPIManager.getSteamId(Number(args[1]));
                        break;
                    case 'GetPlayerName_SteamPlayers':
                        SteamworksAPIManager.getPlayerName(Number(args[1]), Number(args[2]));
                        break;
                    case 'CallBuyItem_SteamMicroTxn':
                        SteamworksAPIManager.callMicroTxn(String(args[1]));
                        break;
                    case 'GetBuyQuery_SteamMicroTxn':
                        SteamworksAPIManager.isMicroTxnQuery();
                        break;
                    case 'CallRefund_SteamMicroTxn':
                        SteamworksAPIManager.refundMicroTxn();
                        break;
                    case 'CallFinalBuy_SteamMicroTxn':
                        SteamworksAPIManager.finalizeMicroTxn();
                        break;
                    case 'DelAllCloudData_SteamCloudSave':
                        CloudSaveManager.clearAllCloud();
                        break;
                    case 'DeleteLeaderboard_SteamLeaderboard':
                        SteamworksAPIManager.deleteLeaderboard(String(args[1]));
                        break;
                    case 'FindOrCreateLeaderboard_SteamLeaderboard':
                        SteamworksAPIManager.findOrCreateLeaderboard(String(args[1]), args[2], args[3], args[4]);
                        break;
                    case 'GetLeaderboardEntries_SteamLeaderboard':
                        if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) == 0) {
                            SoundManager.playBuzzer();
                        } else {
                            SteamworksAPIManager.getLeaderboardEntries(Number(args[1]), Number(args[2]), args[3]);
                        }
                        break;
                    case 'GetLeaderboardsForGame_SteamLeaderboard':
                        SteamworksAPIManager.getLeaderboardsForGame(Number(args[1]));
                        break;
                    case 'ResetLeaderboard_SteamLeaderboard':
                        if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) == 0) {
                            SoundManager.playBuzzer();
                        } else {
                            SteamworksAPIManager.resetLeaderboard();
                        }
                        break;
                    case 'SetLeaderboardScore_SteamLeaderboard':
                        if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) == 0) {
                            SoundManager.playBuzzer();
                        } else {
                            let scoreValue = args[3] && args[3] !== '0' ? $gameVariables.value(Number(args[3])) : Number(args[1]);
                            if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) === 0) {
                                SoundManager.playBuzzer();
                            } else {
                                SteamworksAPIManager.setLeaderboardScore(scoreValue, args[2]);
                            }
                        }
                        break;
                    case 'CallLeaderboard_SteamLeaderboard':
                        if ($gameVariables.value(NekoGakuen_SteamworksAPI.LeaderboardsVariable) == 0) {
                            SoundManager.playBuzzer();
                        } else {
                            SceneManager.push(Scene_Leaderboards);
                        }
                        break;

                }
            }
        };


        NekoGakuen_SteamworksAPI._SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function () {
            NekoGakuen_SteamworksAPI._SceneManager_initialize.apply(this, arguments);
            SteamworksAPIManager.initialize();
            if (process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckFullScreen == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckFullScreen == 'true') {
                Graphics._requestFullScreen();
            };
        };

        SceneManager.updateScene = function () {
            if (this._scene) {
                if (!this._sceneStarted && this._scene.isReady()) {
                    this._scene.start();
                    this._sceneStarted = true;
                    this.onSceneStart();
                }
                if (this.isCurrentSceneStarted()) {
                    if (process.env.USERNAME == 'steamuser' && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true' || SteamworksAPIManager.isSteamInBigPictureMode() && NekoGakuen_SteamworksAPI.CheckOverlayPause == 'true') {
                        if (!NekoGakuen_SteamworksAPI.SteamDeckPause && this.isGameActive()) {
                            this._scene.update();
                            WebAudio.setMasterVolume(1);
                            Graphics.setVideoVolume(1);
                        } else {
                            WebAudio.setMasterVolume(0);
                            Graphics.setVideoVolume(0);
                        }
                    } else {
                        this._scene.update();
                    }
                }
            }
        };

        SceneManager.isGameActive = function () {
            try {
                return window.top.document.hasFocus();
            } catch (e) {
                return true;
            }
        };


        NekoGakuen_SteamworksAPI._SceneManager_updateMain = SceneManager.updateMain;
        SceneManager.updateMain = function () {
            NekoGakuen_SteamworksAPI._SceneManager_updateMain.call(this);
            if (NekoGakuen_SteamworksAPI.CheckBuyGameBoolean == 'true') {
                this.checkSteamRunning();
            }
        };

        SceneManager.checkSteamRunning = function () {
            if (!SteamworksAPIManager.isSteamClientRun()) {
                if (NekoGakuen_SteamworksAPI.SteamGameLaunch == true) {
                    SceneManager.exit();
                } else {
                    if (platformFlag == "Nwjs") {
                        require('nw.gui').Shell.openExternal('steam://launch/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                    } else {
                        require('electron').ipcRenderer.send('openExternal', 'steam://launch/' + NekoGakuen_SteamworksAPI.SteamAppID + '/');
                    }
                    SceneManager.exit();
                }
            }
        };


        function Window_LeaderboardTitle() {
            this.initialize.apply(this, arguments);
        };

        Window_LeaderboardTitle.prototype = Object.create(Window_Base.prototype);
        Window_LeaderboardTitle.prototype.constructor = Window_LeaderboardTitle;

        Window_LeaderboardTitle.prototype.initialize = function () {
            var width = 400;
            var height = this.fittingHeight(1);
            var x = (Graphics.boxWidth - width) / 2;
            var y = 20;
            Window_Base.prototype.initialize.call(this, x, y, width, height);
            this._text = "";
            this.opacity = 255;
        };

        Window_LeaderboardTitle.prototype.setText = function (text) {
            if (this._text !== text) {
                this._text = text;
                this.refresh();
            }
        };

        Window_LeaderboardTitle.prototype.clear = function () {
            this.setText("");
        };

        Window_LeaderboardTitle.prototype.setItem = function () {
            this.setText($gameVariables.value(Number(NekoGakuen_SteamworksAPI.LeaderboardsNameVariable)));
        };

        Window_LeaderboardTitle.prototype.refresh = function () {
            this.contents.clear();
            this.drawText(this._text, 0, 0, 360, 'center');
        };


        function Window_Leaderboard() {
            this.initialize.apply(this, arguments);
        };

        Window_Leaderboard.prototype = Object.create(Window_Selectable.prototype);
        Window_Leaderboard.prototype.constructor = Window_Leaderboard;

        Window_Leaderboard.prototype.initialize = function (x, y, width, height) {
            var width = this.windowWidth();
            var height = this.windowHeight();
            Window_Selectable.prototype.initialize.call(this, x, y, width, height);
            this.setTopRow(0);
            this.select(0);
            this.activate();
            this.refresh();
        };

        Window_Leaderboard.prototype.maxCols = function () {
            return 1;
        };

        Window_Leaderboard.prototype.colSpacing = function () {
            return 16;
        };

        Window_Leaderboard.prototype.maxItems = function () {
            return NekoGakuen_SteamworksAPI.PlayerRankList.length;
        };

        Window_Leaderboard.prototype.lineHeight = function () {
            return Window_Base.prototype.lineHeight.call(this);
        };

        Window_Leaderboard.prototype.windowWidth = function () {
            return 400;
        };

        Window_Leaderboard.prototype.windowHeight = function () {
            return this.fittingHeight(10);
        };

        Window_Leaderboard.prototype.drawItem = function (index) {
            var rect = this.itemRectForText(index);
            this.resetTextColor();
            this.drawText(NekoGakuen_SteamworksAPI.PlayerRankList[index], rect.x, rect.y, rect.width, "left");
            this.drawText(NekoGakuen_SteamworksAPI.PlayerNameList[index], rect.x + 50, rect.y, rect.width, "left");
            this.drawText(NekoGakuen_SteamworksAPI.PlayerScoreList[index], rect.x, rect.y, rect.width, "right");
        };

        Window_Leaderboard.prototype.numVisibleRows = function () {
            return args_LanNameList.length;
        };

        Window_Leaderboard.prototype.item = function () {
            return this.index();
        };

        Window_Leaderboard.prototype.refresh = function () {
            Window_Selectable.prototype.refresh.call(this);
        };


        function Scene_Leaderboards() {
            this.initialize.apply(this, arguments);
        };

        Scene_Leaderboards.prototype = Object.create(Scene_MenuBase.prototype);
        Scene_Leaderboards.prototype.constructor = Scene_Leaderboards;

        Scene_Leaderboards.prototype.initialize = function () {
            Scene_MenuBase.prototype.initialize.call(this);

        };
        Scene_Leaderboards.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createLeaderboardTitleWindow();
            this.createLeaderboardWindow();
        };

        Scene_Leaderboards.prototype.terminate = function () {
            Scene_MenuBase.prototype.terminate.call(this);
        };

        Scene_Leaderboards.prototype.createLeaderboardTitleWindow = function () {
            this._leaderboardTitleWindow = new Window_LeaderboardTitle();
            this.addWindow(this._leaderboardTitleWindow);
        };

        Scene_Leaderboards.prototype.createLeaderboardWindow = function () {
            this._leaderboardWindow = new Window_Leaderboard();
            this._leaderboardWindow.x = (Graphics.boxWidth - 400) / 2;
            this._leaderboardWindow.y = 20 + this._leaderboardTitleWindow.height;
            this._leaderboardWindow.setHandler("cancel", this.popScene.bind(this));
            this.addWindow(this._leaderboardWindow);
        };

        Scene_Leaderboards.prototype.update = function () {
            Scene_MenuBase.prototype.update.call(this);
            this._lastSelect = this._leaderboardWindow.index();
            this._leaderboardTitleWindow.setItem(this._lastSelect);
        };

        Scene_Leaderboards.prototype.maxCommands = function () {
            return 1;
        };

        Scene_Leaderboards.prototype.maxVisibleCommands = function () {
            return 5;
        };

    })();
}