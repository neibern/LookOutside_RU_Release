/*:
-------------------------------------------------------------------------
@title Sync Save Data
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Dec 31, 2015
@filename HIME_SyncSaveData.js
@url http://himeworks.com/2015/12/sync-save-data/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.0 - allows you to "synchronize" game data across different
save files and during the title screen
@help 
-------------------------------------------------------------------------------
== Description ==

In RPG Maker, all of the game data is isolated within each save file.

This means that you can turn on a switch in one game, save the game, then
load up another game, and see that the switch is still off.

However, there may be times when you want to turn on a switch in one game and
have it turn on for other games as well.

In particular, you might want to be able to be able to record the value of
this switch during the title screen.

With this plugin, you can specify that certain data will be "synchronized",
which means if you change the value in one game, all other save files as well
as the title screen will be affected as long as you save the game.

Note that data will only be synchronized during the save process. Simply
turning on a switch does not mean it will be turned on everywhere else.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.0 - Dec 31, 2015
 - initial release

== Usage ==

Currently, only switches and variables can be synchronized.

-- Synchronizing Switches -- 

To synchronize switches, go to the "Control Switches" event command and select
a switch. Then, rename the switches that should be synchronized with a [S] in
front. For example:

  [S] My Switch

When you save your game, all switches with an [S] in their name will be
automatically synchronized. You can verify that the sync works when you load
a different save file and check the value of the switch.

-- Synchronizing Variables -- 

To synchronize variables, go to the "Control Variables" event command and
select a variable. Then rename the variable with a [S] in front.

  [S] My Variable
  
-- Manual Sync'ing --

By default, whenever you save or load the game, all sync data will be
automatically saved or loaded.

You can manually perform the synchronization using script calls:

  DataManager.saveSyncData()
  
This will save all of the sync data, which will be applied to any other
save file upon loading.

You can also load the sync data manually:

  DataManager.syncData()

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.SyncSaveData = 1;
TH.SyncSaveData = TH.SyncSaveData || {};

(function ($) {

  $.SyncTag = "[S]"
  
  var TH_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    var res = TH_DataManager_isDatabaseLoaded.call(this);
    if (res) {
      this._cacheSyncDatabase();
    }
    return res;
  };
  
  DataManager._cacheSyncDatabase = function() {
    this._cacheSyncSwitches();
    this._cacheSyncVariables();
  };
  
  DataManager._cacheSyncSwitches = function() {
    this._syncSwitches = []
    var switches = $dataSystem.switches;
    for (var i = 0; i < switches.length; i++) {
      var name = switches[i];
      if (name !== "" && name.contains($.SyncTag)) {
        this._syncSwitches.push(i);
      }
    }; 
  };
  
  DataManager._cacheSyncVariables = function() {
    this._syncVariables = []
    var variables = $dataSystem.variables;
    for (var i = 0; i < variables.length; i++) {
      var name = variables[i];
      if (name !== "" && name.contains($.SyncTag)) {
        this._syncVariables.push(i);
      }
    }; 
  };
  
  var TH_DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function() {
    TH_DataManager_setupNewGame.call(this);
    this.syncData();
  }
  
  var TH_DataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
  DataManager.saveGameWithoutRescue = function(savefileId) {
    var res = TH_DataManager_saveGameWithoutRescue.call(this, savefileId);
    this.saveSyncData();
    return res;
  };
  
  DataManager.saveSyncData = function() {
    var json = JsonEx.stringify(this.makeSyncData());
    StorageManager.save("sync", json);
  };
    
  DataManager.makeSyncData = function() {
    var info = {}
    info.switches = this.makeSyncSwitches();
    info.variables = this.makeSyncVariables();
    return info
  };
  
  DataManager.makeSyncSwitches = function() {    
    var data = {}
    for (var i = 0; i < this._syncSwitches.length; i++) {
      var switchId = this._syncSwitches[i];
      data[switchId] = $gameSwitches.value(switchId);      
    };
    return data;
  };
  
  DataManager.makeSyncVariables = function() {
    var data = {}
    for (var i = 0; i < this._syncVariables.length; i++) {
      var varId = this._syncVariables[i];
      data[varId] = $gameVariables.value(varId);      
    };
    return data;
  };
  
  var TH_DataManager_loadGameWithoutRescue = DataManager.loadGameWithoutRescue
  DataManager.loadGameWithoutRescue = function(savefileId) {
    var res = TH_DataManager_loadGameWithoutRescue.call(this, savefileId);
    if (res) {
      res = this.syncData();
    }
    return res;
  };
  
  DataManager.syncData = function() {
    data = StorageManager.load("sync")
    if (!data) {
      return true;
    }
    var info = JsonEx.parse(data)    
    this.syncSwitches(info.switches);
    this.syncVariables(info.variables);
    return true;
  };
  
  DataManager.syncSwitches = function(switches) {
    for (var id in switches) {
      $gameSwitches.setValue(id, switches[id]);
    }
  }
  
  DataManager.syncVariables = function(variables) {
    for (var id in variables) {
      $gameVariables.setValue(id, variables[id]);
    }
  }
  
  /***************************************************************************/
  
  var TH_StorageManager_localFilePath = StorageManager.localFilePath
  StorageManager.localFilePath = function(savefileId) {
    if (savefileId === "sync") {
      name = "sync_data.rpgsave";
      return this.localFileDirectoryPath() + name;
    }
    else {
      return TH_StorageManager_localFilePath.call(this, savefileId);
    }
  };
  
  var TH_StorageManager_webStorageKey = StorageManager.webStorageKey;
  StorageManager.webStorageKey = function(savefileId) {
    if (savefileId === "sync") {
      return "RPG TH_SyncData";
    }
    else {
      return TH_StorageManager_webStorageKey.call(this, savefileId);
    }
  };
})(TH.SyncSaveData);