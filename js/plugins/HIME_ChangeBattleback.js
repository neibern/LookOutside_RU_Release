/*:
-------------------------------------------------------------------------
@title Change Battleback
@author Hime --> HimeWorks (http://himeworks.com)
@date Apr 16, 2016
@version 1.1
@filename HIME_ChangeBattleback.js
@url http://himeworks.com/2015/11/change-battleback/

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
@plugindesc v1.1 Allows you to change battle background images during battle.
@help 
-------------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=KHA6yRAMhMk

Battle backgrounds can be used to provide some sense of atmosphere.
For example, if you're walking through a forest and you encounter an enemy,
seeing some cute bunnies and trees in the background makes it feel like a
forest.

However, if you see dead bunnies and dying trees in the background, it feels
much different. What happens if an enemy can cast a spell that will cause all
of those bunnies and trees to die during battle?

RPG Maker MV comes with an event command that allows you to change battlebacks.
However, if you try to change battlebacks during battle, you'll notice that
nothing happens.

Instead, the change will only appear in the next battle.
This plugin allows you to change battle backgrounds during battle.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 - Apr 19, 2016
 * Implemented support for saving and loading battlebacks
1.0 - Nov 22, 2015
 * initial release

== Usage ==

During battle, use the "Change Battleback" event command located on the 
third page of the event commands.

This will change the battleback immediately.
The changes will only last for the current battle, and will revert
after the battle finishes.

-- Saving and Restoring Battlebacks --

There may be situations where you want to change the battleback, and you want
to restore it to what it was before you changed it, but you didn't know what
the battlebacks were because they could have been anything at that point.

This plugin provides functionality for saving the current battlebacks and then
restoring them.

To save battlebacks, use the script call

  BattleManager.saveBattlebacks()

To restore battlebacks, use the script call

  BattleManager.restoreBattlebacks()

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.ChangeBattleback = 1;
TH.ChangeBattleback = TH.ChangeBattleback || {};

(function ($) {

  /* Battlebacks are battle-specific */
  var TH_BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function() {
    TH_BattleManager_initMembers.call(this);
    this._battleback1Name = '';
    this._battleback2Name = '';
  };
  
  BattleManager.saveBattlebacks = function() {
    this._oldBattleback1Name = this._battleback1Name;
    this._oldBattleback2Name = this._battleback2Name;
  }
  
  BattleManager.restoreBattlebacks = function() {
    this.changeBattleback(this._oldBattleback1Name, this._oldBattleback2Name);
  };

  BattleManager.changeBattleback = function(name1, name2) {
    this._battleback1Name = name1;
    this._battleback2Name = name2;
    this._spriteset.refreshBattleback();
  }
  
  BattleManager.battleback1Name = function() {
    return this._battleback1Name;
  }
  
  BattleManager.battleback2Name = function() {
    return this._battleback2Name;
  }
  
  /***************************************************************************/
  
  Spriteset_Battle.prototype.refreshBattleback = function() {
    this._back1Sprite.bitmap = this.battleback1Bitmap();     
    this._back2Sprite.bitmap = this.battleback2Bitmap();
  };
  
  var TH_SpritesetBattle_battleback1Name = Spriteset_Battle.prototype.battleback1Name;
  Spriteset_Battle.prototype.battleback1Name = function() {
    console.log(BattleManager.battleback1Name())
    if (BattleManager.battleback1Name()) {
      return BattleManager.battleback1Name();
    }
    else {
      return TH_SpritesetBattle_battleback1Name.call(this);
    }
  };
  
  var TH_SpritesetBattle_battleback2Name = Spriteset_Battle.prototype.battleback2Name;
  Spriteset_Battle.prototype.battleback2Name = function() {
    if (BattleManager.battleback2Name()) {
      return BattleManager.battleback2Name();
    }
    else {
      return TH_SpritesetBattle_battleback2Name.call(this);
    }
  };
  
  Spriteset_Battle.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateActors();
    this.updateBattleback();
  };  
  
  /***************************************************************************/

  /* Default only changes the map's battleback, but does not change
   * it if we are already in battle.
   */
  var TH_GameInterpreter_command283 = Game_Interpreter.prototype.command283;
  Game_Interpreter.prototype.command283 = function() {
    if ($gameParty.inBattle()) {
      BattleManager.changeBattleback(this._params[0], this._params[1])
      return true;
    }
    else {
      return TH_GameInterpreter_command283.call(this);
    }
  };
})(TH.ChangeBattleback);