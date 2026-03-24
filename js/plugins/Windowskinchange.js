/*:
-------------------------------------------------------------------------------
@title Windowskin Change
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Apr 15, 2016
@filename HIME_WindowskinChange.js
@url http://himeworks.com/2016/04/windowskin-change/

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
@plugindesc v1.0 - Change windowskins during the game using script calls!
@help 
-------------------------------------------------------------------------------
== Description ==

This plugin allows you to change your windowskins using simple script calls.

By default, the game only supports one windowskin, but with this plugin you
can use multiple windowskins and change them during the game as needed.

Custom windowskins can be used to allow players to customize how they want
their game to look.

Alternatively, you may choose to use it as a way to show additional
information to the player. Perhaps you have a moral system, and depending on
your status, the windowskin may appear differently.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Apr 15, 2016
 * Initial release

== Usage ==

-- Locating Files --

All window skins must be placed in the same folder. By default, they are
stored in img/system, but you may have plugins that change this.

-- Changing Windowskins --

To change the windowskin, use the script call

  $gameSystem.setWindowskin( NAME )
  
Where the NAME is the name of the windowskin image.
For example, assuming you have two windowskins

  Window.png
  Window_Red.png
  
You can switch between them using

  $gameSystem.setWindowskin( "Window" )
  $gameSystem.setWindowskin( "Window_Red" )
  
And you should see the changes immediately.

-- Preloading Files --

Windowskins should be preloaded before you use them.
This is because the image may not be ready when it is required.

To preload a file, use the script call

  ImageManager.loadSystem( NAME )
  
Where NAME is the name of the windowskin to load.
You can simply have an auto-run event at the beginning of the game download
all of the windowskins you may need.

-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_WindowskinChange = 1;
TH.WindowskinChange = TH.WindowskinChange || {};

(function ($) {

  var TH_GameSystem_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    TH_GameSystem_initialize.call(this);
    this._windowskin = "Window";
  };

  Game_System.prototype.setWindowskin = function(name) {
    this._windowskin = name;
    SceneManager.refreshWindowskins();
  };
  
  Game_System.prototype.windowskin = function() {
    return this._windowskin;
  };
  
  Game_System.prototype.preloadWindowskin = function(name) {
    ImageManager.loadSystem(name);
  };
  
  Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem($gameSystem.windowskin());    
  };
  
  SceneManager.refreshWindowskins = function() {
    this._scene._windowLayer.refreshWindowskins();
  };
  
  WindowLayer.prototype.refreshWindowskins = function() {
    var wins = this.children;
    for (var i = 0; i < wins.length; i++) {
      var win = wins[i];
      if (win instanceof Window) {
        wins[i].loadWindowskin();
      }
    }
  };
  
})(TH.WindowskinChange);