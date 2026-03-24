/*:
-------------------------------------------------------------------------
@title Pre-Title Events
@author Hime @ HimeWorks (http://himeworks.com
@date Feb 23, 2016
@filename HIME_PreTitleEvents.js
@url http://himeworks.com/2015/11/pre-title-events/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/
-------------------------------------------------------------------------
@plugindesc Build your own sequence of events that should occur before
the title screen begins

@help 
-------------------------------------------------------------------------
== Description ==

RPG Maker MV gives you a nice title screen, but it doesn't give you much
control over what should happen before the game goes to the title
screen.

For example, you might want to show some splash screens, or perhaps
an introductory video.

With this plugin, you can easily put together what should happen before
the title screen using events that you are already familiar with.

Because it is an event, you can do basically anything you want!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Feb 23, 2016 - pre-title map can be used as the title screen.
Nov 14, 2015 - switched to a new pre-title map subclass
Nov  5, 2015 - initial release

== Usage == 

-- Use as Splash Screen --

Start by creating a new map where you will be creating your pre-title
event.

Next, go to the plugin manager, double-click on my plugin entry, and
then set the "Pre-Title Map ID" value to the ID of your map.

Note that the pre-title event doesn't automatically go to the title
screen when your event is finished. This is to provide you with full
control over how the event will behave.

If you would like to go to the title screen afterwards, you can make
the following script call:

   SceneManager.goto(Scene_Title)
   
-- Use as Title Screen --

This plugin provides the option to replace your title screen with the
map you have selected for your pre-title events.

This allows you to event your title screen yourself.

In the plugin parameters, set the "Use As Title" option to true if you
would like to have the game treat the pre-title map as the title screen.

This means that if the player decides to quit the game and return to the
menu, they will go back to the pre-title screen.

Otherwise, the pre-title screen will simply be a splash screen that will
be displayed once.

-------------------------------------------------------------------------
@param Pre-Title Map ID
@default 1
@desc Which map to show for pre-title processing

@param Use As Title
@type boolean
@default false
@desc Replaces the title screen with this map. Set this to true if you
want this to be used as your title screen by default.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {};
var TH = TH || {};
Imported.PreTitleEvents = 1;
TH.PreTitleEvents = TH.PreTitleEvents || {};

(function ($) {

  $.Parameters = PluginManager.parameters('HIME_PreTitleEvents');
  $.MapID = Math.floor($.Parameters['Pre-Title Map ID']) || 1;
  $.UseAsTitle = $.Parameters['Use As Title'].trim().toUpperCase() === "TRUE";
  $.ShownOnce = false;

  function Scene_PretitleMap() {
    this.initialize.apply(this, arguments);
  }
  
  Scene_PretitleMap.prototype = Object.create(Scene_Map.prototype);
  Scene_PretitleMap.prototype.constructor = Scene_PretitleMap;
  
  Scene_PretitleMap.prototype.initialize = function() {
    Scene_Map.prototype.initialize.call(this);        
    DataManager.setupNewGame();
    $gamePlayer.reserveTransfer($.MapID, 0, 0);
  }
  
  var TH_SceneManager_goto = SceneManager.goto;
  SceneManager.goto = function(sceneClass) {
    if (sceneClass === Scene_Title && ($.UseAsTitle || !$.ShownOnce)) {
      this._nextScene = new Scene_PretitleMap();
      $.ShownOnce = true;
    }
    else {
      TH_SceneManager_goto.call(this, sceneClass);
    }
  };
})(TH.PreTitleEvents);