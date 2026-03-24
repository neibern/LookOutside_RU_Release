//these are temporary, not saved, and can't be trusted to gracefully
//clear themselves.  Clear before using.
tempvars = {}


// if players have already lost their arm and are now rearmed, we need to reset what they look like
old_loaded_game_fix_arm=Scene_Load.prototype.onLoadSuccess
Scene_Load.prototype.onLoadSuccess = function() {
    
    old_loaded_game_fix_arm.call(this);
    //reset the actor image so it uses the proper character image in savefile.
    $gameParty.members()[0].setCharacterImage($gameParty.members()[0]._characterName,$gameParty.members()[0]._characterIndex)
    
    //refresh the player sprite so it uses the proper one.
    $gamePlayer.refresh()
    //disable autosave when loading a save file, this gets reenabled
    //when you go to a new map.
    $gamePlayer._autoSaveAttempts=0;
	//fix characters in existing saves with null equipment or missing skills
	for (const member of $gameParty.members())
    {
        for (const learning of member.currentClass().learnings) {
            if (learning.level <= member._level) {
                member.learnSkill(learning.skillId);
            }
        }
		for (let i  = 0; i<member._equips.length; i ++)
		{
			
			if (member._equips[i]._itemId==null)
			{
				member._equips[i]._itemId=0
			}
		}
    }
	
};

//the title screen counts as having a map loaded so the game assumes autosaving is fine
// we just count to see if the autosave is valid and if it is, we fall through to normal logic
// we clear autosave attempts in newgames as well.
oldShouldAutoSave=Scene_Map.prototype.shouldAutosave 
Scene_Map.prototype.shouldAutosave = function() {
    console.log("-- trying AUTOSAVE --");
	// 005 is 'intro'
    // 307 is the title splash screen 'splash'

    // neither should count for autosaving, and should in fact reset the count to 0.
    if ($gameMap && $dataMap.meta.noAutosave) 
    {
		if($dataMap.meta.resetAutosaves){$gamePlayer._autoSaveAttempts=0;}
		console.log("prevented autosave, invalid map");
        return false
    }
	
    $gamePlayer._autoSaveAttempts+=1;
    if ($gamePlayer._autoSaveAttempts<2)
    {
		console.log("prevented autosave, autosaveAttempts:"+$gamePlayer._autoSaveAttempts);
        return false
    }
    return oldShouldAutoSave.call(this);
};

oldGamePlayerInitMembers = Game_Player.prototype.initMembers
Game_Player.prototype.initMembers = function()
{
    oldGamePlayerInitMembers.call(this)
    this._autoSaveAttempts=0;
}



////Thank you Tunicate for this function-
Game_Actor.prototype.changeEquip = function(slotId, item) {
	
     //check if cursed ring of regeneration is being unequipped
    if (this.equips()[slotId] && this.equips()[slotId].id==287)
    {
        if (this.hp>0)
        {
			// play a badly hurt damage sound
			qkSfx("Hurt_Big",90,100,10,0,3)
        
        
            //set character hp to 1 
            this.setHp(1);
        }
        
    }
    
    if (
        this.tradeItemWithParty(item, this.equips()[slotId]) &&
        (!item || this.equipSlots()[slotId] === item.etypeId)
    ) {
        this._equips[slotId].setObject(item);
        this.refresh();
    }
   
};

////Thank you Tunicate for this function-
smoothTeleport = function(newX,newY){
    //transport to in map coordinates, keeping the camera and followers in the same spot.
    deltaX=newX-$gamePlayer._x;
    deltaY=newY-$gamePlayer._y;
    
    oldCameraX=$gamePlayer.scrolledX();
    oldCameraY=$gamePlayer.scrolledY();
    
    $gamePlayer._x=newX;
    $gamePlayer._y=newY;
    $gamePlayer._realX=$gamePlayer._realX+deltaX;
    $gamePlayer._realY=$gamePlayer._realY+deltaY;
    
    for(let follower of $gamePlayer.followers()._data){
        follower._x=follower._realX+deltaX;
        follower._y=follower._realY+deltaY;
        follower._realX=follower._realX+deltaX;
        follower._realY=follower._realY+deltaY;
    }
    $gamePlayer.updateScroll(oldCameraX,oldCameraY);//yes you pass in the previous values it's weird.
}

////Thank you Tunicate for this function-
spinTheBoss = function (){

    if ($gameTroop._troopId == 190 && $gameTroop.aliveMembers()[0] && $gameTroop.aliveMembers()[0]._enemyId==203 && $gameTroop.aliveMembers()[0]._sprite)
    {
        if (!$gameTroop.spinning_boss_sprite)
        {
            $gameTroop.spinning_boss_sprite = $gameTroop.aliveMembers()[0]._sprite
            $gameTroop.spinning_boss_sprite.damageOffsetY=spinningBossDamageOffsetY;
            $gameTroop.spinning_boss_sprite.rotation=-Math.PI/6
        }
        $gameTroop.spinning_boss_sprite.pivot.x = 0;
        $gameTroop.spinning_boss_sprite.pivot.y = -718/2 - 90;
        $gameTroop.spinning_boss_sprite._homeX = 393+ $gameTroop.spinning_boss_sprite.pivot.x;
        $gameTroop.spinning_boss_sprite._homeY = 718/2+ 100+ $gameTroop.spinning_boss_sprite.pivot.y;
            
		if(gSw(640))
		{
			$gameTroop.spinning_boss_sprite.rotation = 0;
		}
		else
		{
			$gameTroop.spinning_boss_sprite.rotation +=(0.03*Math.PI/360);
		}
        
		
        $gameTroop.spinning_boss_sprite._stateIconSprite.y=$gameTroop.spinning_boss_sprite.pivot.y - 160 *Math.cos($gameTroop.spinning_boss_sprite.rotation) 
        $gameTroop.spinning_boss_sprite._stateIconSprite.x= -160 *Math.sin($gameTroop.spinning_boss_sprite.rotation) 
        $gameTroop.spinning_boss_sprite._stateIconSprite.rotation=-$gameTroop.spinning_boss_sprite.rotation;
		
    }else{
        
        if($gameTroop.spinning_boss_sprite)
        {
            $gameTroop.spinning_boss_sprite=null
        }
    }
}

spinningBossDamageOffsetY = function() {
    return 185;
};


old_MV_Position = Sprite_AnimationMV.prototype.updatePosition
Sprite_AnimationMV.prototype.updatePosition = function() {
    
    old_MV_Position.call(this)
    if ($gameTroop.spinning_boss_sprite)
    {
		if(!gSw(640))
		{
        this.y-= $gameTroop.spinning_boss_sprite.pivot.y
		}
    }
};

//restores your party position when moving between maps.  Doesn't use a fade to white or to black (effectively acting the same as the default fade type 2
smoothTeleportBetweenMaps = function(newMap,newX,newY){
    for(let follower of $gamePlayer.followers()._data){
        follower.old_delta_x=follower._x-$gamePlayer._x;
        follower.old_delta_y=follower._y-$gamePlayer._y;
        follower.old_delta_realX=follower._realX-$gamePlayer._realX;
        follower.old_delta_realY=follower._realY-$gamePlayer._realY;
    }
$gamePlayer.reserveTransfer(newMap, newX, newY, $gamePlayer.direction(), 3);
$gamePlayer._smoothTransferring=true;
}

fakeTouchButtonPictureId=79;
TuniPerformTransfer=Game_Player.prototype.performTransfer 
Game_Player.prototype.performTransfer = function() {
	if (!this._smoothTransferring){
		return TuniPerformTransfer.call(this)
	}
	
    if (this.isTransferring()) {
        this.setDirection(this._newDirection);
        if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
            $gameMap.setup(this._newMapId);
            this._needsMapReload = false;
        }
        this.locate(this._newX, this._newY);
        //this.refresh();
		for(let follower of $gamePlayer.followers()._data){
            follower._x=$gamePlayer._x+follower.old_delta_x;
            follower._y=$gamePlayer._y+follower.old_delta_y;
            follower._realX=$gamePlayer._realX+follower.old_delta_realX
            follower._realY=$gamePlayer._realY+follower.old_delta_realY;
        }
        this.clearTransferInfo();
		//suppress button flicker with fake Button
		if(ConfigManager.touchUI)
		{
			$gameScreen.fakeTouchButtonFrameDuration=2;
			$gameScreen.showPicture(fakeTouchButtonPictureId, "TouchMenuButton", 0, 760, 6,100, 100, 192, 0);
		}
		
    }
};

tuniUpdatePictures=Game_Screen.prototype.updatePictures 
Game_Screen.prototype.updatePictures = function() {
	tuniUpdatePictures.call(this);
	if (this.fakeTouchButtonFrameDuration)
	{
		this.fakeTouchButtonFrameDuration=this.fakeTouchButtonFrameDuration-1;
		if(this.fakeTouchButtonFrameDuration<=0)
		{
			//move offscreen and opaque
			this.showPicture(fakeTouchButtonPictureId, "TouchMenuButton", 0, 1760, 6,100, 100, 0, 0);
			this.fakeTouchButtonFrameDuration=0;
			//due to rpgmaker stupidity this will sometimes load in 1 frame and sometimes in 2
			//if it only takes one frame
			//this means the semitransparent button and fake button will overlay and be slightly brighter for one Frame
			//but that's still better than the button vanishing entirely.
		}
	}
}


tuniClearTransferInfo=Game_Player.prototype.clearTransferInfo;
Game_Player.prototype.clearTransferInfo = function() {
    this._smoothTransferring = false;
    tuniClearTransferInfo.call(this)
};

smoothTeleportFade=Scene_Map.prototype.fadeInForTransfer;
Scene_Map.prototype.fadeInForTransfer = function() {
    if ( $gamePlayer.fadeType() == 3)
    {
        for(let follower of $gamePlayer.followers()._data){
            follower._x=$gamePlayer._x+follower.old_delta_x;
            follower._y=$gamePlayer._y+follower.old_delta_y;
            follower._realX=$gamePlayer._realX+follower.old_delta_realX
            follower._realY=$gamePlayer._realY+follower.old_delta_realY;
        }
        
    }
    smoothTeleportFade.call(this)
};




////=========================================================================================
//hardcoding arm loss


 old_armless_equip_weapon = Game_BattlerBase.prototype.canEquipWeapon
 Game_BattlerBase.prototype.canEquipWeapon = function(item) {
     // lost arm is variable 187, 1 is right arm 2 is left
    if ( ( this._actorId == 1 ) && gVr(187) >0 )
    {
		if (gVr(187) == 1)
		{
			//cannot equip melee weapons when missing that arm.
			return false;
		}
		
		
		if (gVr(187) == 2)
		{
			if (item.meta.twoHanded)
			{
				//if this is a two handed weapon, you cannot equip it when missing your off hand
				//unless you're ash williams in which case you can equip the chainsaw.
				if (item.name.contains("Chainsaw") && youAreAsh())
				{
					return true
				}else
				{
					return false
				}
				
			}
		}
    }
	
	if (item.meta.twoHanded)
	{
		const classData = this.currentClass();
		if (classData.meta["noTwoHanded"])
		{
			return false
		}
	}
	
	if (item.meta.heavyWeapon)
	{
		const classData = this.currentClass();
		if (classData.meta["noHeavyWpn"])
		{
			return false
		}
	}
	
	
    return old_armless_equip_weapon.call(this,item)
};

old_armless_equip_armor=Game_BattlerBase.prototype.canEquipArmor 
Game_BattlerBase.prototype.canEquipArmor = function(item) {
    if ( ( this._actorId == 1 ) && ( gVr(187) > 0) && ((item.atypeId == 5) || (item.atypeId == 6)  || (item.atypeId == 7) ) )
    {
		if (gVr(187) == 2)
		{
			//cannot equip ranged weapons
        return false;
		}
		//cannot equip 2 handed ranged weapons when missing main arm
		if (gVr(187) == 1)
		{
			if (item.meta.twoHanded)
			{
				
				//unless you're ash williams in which case you can equip the shotgun.
				if (item.name.contains("Shotgun") && youAreAsh())
				{
					return true
				}else
				{
					return false
				}
				
			}
		}   
    }
    return old_armless_equip_armor.call(this,item)
};


youAreAsh = function (){
	//returns true if Sam or the player is Ash Williams
	const { username } = require('os').userInfo();
	const validNames = ['ash','williams','evildead'];
	for (let name of validNames)
	{
		if (username.toLowerCase().contains(name) || $gameParty.leader()._name.toLowerCase().contains(name))
		{
			return true;
		}
	}
	return false;
}

oldStatusBase= Window_StatusBase.prototype.actorSlotName
//Marks Sam's gnawed off arms as gnawed off.
Window_StatusBase.prototype.actorSlotName = function(actor, index) {
    var slotName = oldStatusBase.call(this,actor,index);
    if ( ( actor._actorId == 1 ) && ( gVr(187) == 1 ) && index == 0)
    {
        slotName="Откушена"
    }
    if ( ( actor._actorId == 1 ) && ( gVr(187) == 2 ) && index == 1)
    {
        slotName="Откушена"
    }
    return slotName
};

old_set_character_image= Game_Actor.prototype.setCharacterImage
Game_Actor.prototype.setCharacterImage = function(
    characterName,
    characterIndex
) {
    //if the character is sam, change to missing arm sheet as needed
    //assumes filenames are structured as such:
    //normal sprites are     Chara_Player.png
    //right arm missing are  Chara_Player_MissingRightarm
    //left arm missing are   Chara_Player_MissingLeftarm
    //if expansion of the spritesheet is later needed, following this template should be easy
    //ie: add Chara_Player_Cat to the arm_change_sprites list,
    //and a catsam with a missing right arm will autofetch Chara_PlayerCat_MissingRightarm
    
    //note that this only applys to ACTOR sprites, not character sprites
    //so for example walking around sam and sleeping sam in the bedroom 
	//won't be hit by this.
	// but this is needed for stuff that isn't a character which displays the Sprite
	//like the save file.
    
    var arm_change_sprites=[ "Chara_Player"]
    
    if(arm_change_sprites.contains(characterName) && gVr(187)>0 )
    {
        
        if(gVr(187) == 1 )
        {
            this._characterName = characterName + "_MissingRightarm";
        }
        
        if(gVr(187) == 2 )
        {
            this._characterName = characterName + "_MissingLeftarm";
        }
        this._characterIndex = characterIndex;
        return;
    }        
    
    old_set_character_image.call(this,characterName,characterIndex)
};

old_character_base_set_image= Game_CharacterBase.prototype.setImage
Game_CharacterBase.prototype.setImage = function(
    characterName,
    characterIndex
) {
    //if the character is sam, change to missing arm sheet as needed
    //assumes filenames are structured as such:
    //normal sprites are     Chara_Player.png
    //right arm missing are  Chara_Player_MissingRightarm
    //left arm missing are   Chara_Player_MissingLeftarm
    //if expansion of the spritesheet is later needed, following this template should be easy
    //ie: add Chara_Player_Cat to the arm_change_sprites list,
    //and a catsam with a missing right arm will autofetch Chara_PlayerCat_MissingRightarm
    
    //note that this applies to character sprites, which includes events.
	
    
    var arm_change_sprites=[ "Chara_Player"]
    
    if(arm_change_sprites.contains(characterName) && gVr(187)>0 )
    {
		this._tileId = 0;
        
        if(gVr(187) == 1 )
        {
            this._characterName = characterName + "_MissingRightarm";
        }
        
        if(gVr(187) == 2 )
        {
            this._characterName = characterName + "_MissingLeftarm";
        }
        this._characterIndex = characterIndex;
		this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);
        return;
    }        
    
    old_character_base_set_image.call(this,characterName,characterIndex)
};




old_Graphics_UpdateRealScale=Graphics._updateRealScale

Graphics._updateRealScale = function(){
	old_Graphics_UpdateRealScale.call(this)
	if ( ConfigManager.intScaling )
	{
		// sprites are all at a 2x scale by default, so instead of doing integer powers do half-int
		if (this._realScale > 1)
		{
			this._realScale = Math.floor(this._realScale*2)/2;
		}
	}
}

ConfigManager.intScaling = false;

old_ConfigManager_MakeData=ConfigManager.makeData 
ConfigManager.makeData = function() {
	config = old_ConfigManager_MakeData.call(this);
	config.intScaling = this.intScaling;
	return config;
}

old_ConfigManager_ApplyData=ConfigManager.applyData 

ConfigManager.applyData = function(config) {
	old_ConfigManager_ApplyData.call(this,config)
    this.intScaling = this.readFlag(config, 'intScaling');
}

old_WindowOptions_addGeneralOptions = Window_Options.prototype.addGeneralOptions;

Window_Options.prototype.addGeneralOptions = function() {
	old_WindowOptions_addGeneralOptions.call(this);
	this.addCommand("Цельное масштабирование", 'intScaling');
};


const old_WindowOptions_getConfigValue = Window_Options.prototype.getConfigValue;
Window_Options.prototype.getConfigValue = function(symbol) {
	if (symbol === 'intScaling') {
		return ConfigManager.intScaling
	}
	return old_WindowOptions_getConfigValue.call(this, symbol);
};

const _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, value) {
	if (symbol === 'intScaling') {
		ConfigManager.intScaling = value;
		Graphics._updateAllElements()
	} else {
		_Window_Options_setConfigValue.call(this, symbol, value);
	}
};


// hide battle windows at the start of combat 
// when the troop has the meta field <nostatus>


// this is to prevent the status window from showing up briefly at the beginning of noncombat encounters
// The window will show up when actual fighting starts
// even on a troop that just launches the battle instantly
// That just tweaks the animation of the status window appearing in the center
// then immediately sliding to the right 
// so you COULD just do a if(true) instead of checking the metafield 
// with only a minor visual difference
Tuni_Old_Scene_Battle_createStatusWindow=Scene_Battle.prototype.createStatusWindow
Scene_Battle.prototype.createStatusWindow=function(){
	Tuni_Old_Scene_Battle_createStatusWindow.call(this)
	if($dataTroops[$gameTroop._troopId].name.toUpperCase().includes("<NOSTATUS>"))
	{
		this._statusWindow.hide();
	}
}

// Prevent attempting to use more items than possessed in inventory.
//Does not update count, just makes the item considered 'out of stock' when more item uses have been queued than are available.
// only counts 'use item' actions, which handles virtually all use cases.

oldGamePartyHasItem=Game_Party.prototype.hasItem;

Game_Party.prototype.hasItem = function(item, includeEquip) {
	
	var oldValue= oldGamePartyHasItem.call(this,item,includeEquip)
	
	if (oldValue==false)
	{
		return false;
	}
	
	
    if (item.consumable &&  $gameParty.inBattle() && BattleManager.isInputting()  ) {
        var itemsUsedThisRound=0;
        for (var character of $gameParty.aliveMembers())
        {
			
			//look at characters who have already finished entering their actions
			
					
			if (character._actionState == "waiting")
			{
				for (var action of character._actions)
				{
					if (action.isItem() && (action.item().id == item.id))
					{
						itemsUsedThisRound+=1;
					}

				}
			}
			
			//the active character needs testing on previous actions they've queued.
			//Note that backing out doesn't erase actions from the list so we have to check
			//preceding actions explicitly, instead of assuming they're null if not yet selected.
			if (character._actionState == "inputting")
			{
				var actionsTaken=0;
				for (var action of character._actions)
				{
					if (actionsTaken<character._actionInputIndex)
					{
						if (action.isItem() && (action.item().id == item.id))
						{
							itemsUsedThisRound+=1;
						}
					}else{
						break;
					}
					actionsTaken+=1;
				}
				
			}
        }
        if (this.numItems(item) <= itemsUsedThisRound)
        {
        	return false;
        }
    } 
	
	return true;
}



/* align monster sprites to 4 x background grid*/
TuniScene_BootonDatabaseLoaded =Scene_Boot.prototype.onDatabaseLoaded

Scene_Boot.prototype.onDatabaseLoaded = function()
{
TuniScene_BootonDatabaseLoaded.call(this)

	for (let i = 1; i< $dataTroops.length; i++)
	{
		for (member of $dataTroops[i].members)
		{
			var remx=member.x %4
			remx <2? member.x = member.x -remx : member.x = member.x + 4 - remx
			var remy=member.y %4
			remy <2? member.y = member.y -remy : member.y = member.y + 4 - remy
		}
	}

}

/* Dynamic reflection arm picking  */
Tuni_LoadEnemy =ImageManager.loadEnemy
ImageManager.loadEnemy= function(filename)
{
	     // lost arm is variable 187, 1 is right arm 2 is left
		 // Note that MM_sam1 is not a mirror reflection but sam seen from the front
		 // and hence the lostleft arm looks different. 
	if (filename.includes("Reflections"))
	{
		if(gVr(187) == 1)
		{
			if(monsterImageExists(filename+"-LostRight"))
			{
				return this.loadBitmap("img/enemies/", filename+"-LostRight");
			}
		}
		if(gVr(187) == 2)
		{
			if(monsterImageExists(filename+"-LostLeft"))
			{
				return this.loadBitmap("img/enemies/", filename+"-LostLeft");
			}
		}
	}
	
	return Tuni_LoadEnemy.call(this,filename);
}


// cool trail/afterimage effect for designated enemies


//TuniAddBattlerTrailMeta=Sprite_Enemy.prototype.setBattler 
TuniMakeBattleSpriteset=Scene_Battle.prototype.createSpriteset

Scene_Battle.prototype.createSpriteset= function(){
	TuniMakeBattleSpriteset.call(this);
	const enemies = $gameTroop.members()
	for (const enemy of enemies) {
		enemy._sprite.createTrailsForBattler(enemy)
    }
}

Sprite_Enemy.prototype.createTrailsForBattler = function(battler) {
	
	//trail lag frames is how long the trails lag behind the base sprite/preceding trail
	//number is in frames
	this._trailLagFrames= parseInt(undefRep(battler.enemy().meta.trailLagFrames));
	//trail count is how many trails there are
	this._trailCount = parseInt(undefRep(battler.enemy().meta.trailCount));
	//trail opacity determines how opaque the first trail is (0-255).  
	// Each additional trail divides this 
	// so trail one is at 100%, trail 2 is at 50%, trail 3 is 33%, trail 4 is 25%, etc
	this._trailOpacity = parseInt(undefRep(battler.enemy().meta.trailOpacity));
	
	this._trail = this._trailLagFrames && this._trailCount ? true : false
	
	if (this._trail)
	{
		this._trailSprites= new Array(this._trailCount)
		for ( i = 0; i< this._trailCount;i++)
		{
			this._trailSprites[i]= new Sprite_Trail(i);
			//drop down below the enemy sprites
			SceneManager._scene._spriteset._battleField.addChild(this._trailSprites[i]);
			this._trailSprites[i].setup(this._enemy)
		}
		SceneManager._scene._spriteset._battleField.children.sort(comparePushTrailToEnd.bind(this))
	}
	
}

comparePushTrailToEnd = function(a, b) {
    if (a._zIndex !== b._zIndex) {
        return a._zIndex - b._zIndex;
    } else {
        return b.spriteId - a.spriteId;
    }
};

function Sprite_Trail() {
    this.initialize(...arguments);
}

Sprite_Trail.prototype = Object.create(Sprite.prototype);
Sprite_Trail.prototype.constructor = Sprite_Trail;

Sprite_Trail.prototype.initialize = function(trailId) {
	this._trailId=trailId;
    Sprite.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_Trail.prototype.initMembers = function() {
    this._battler = null;
    this._animationCount = 0;
    this._animationIndex = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
	this._zIndex = -1-0.01*this._trailId; //keep them sorted relative to each other
	this.opacity=0;
	this._maxOpacity=120;//default for first trail
	this._opacityCap=this._maxOpacity;//max for subsequent trails
	this._startUpTime=60;
	this._startingUp=false;
	this._totalFrames=0;
	this._lagFrames=0;//should always be overridden later
	
};

Sprite_Trail.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadEnemy(this._battlerName);
};

Sprite_Trail.prototype.setup = function(battler) {
    if (this._battler !== battler) {
        this._battler = battler;
		this.setupCycle()
    }
};
Sprite_Trail.prototype.setupCycle = function ()
{
	this._lagFrames=this._battler._sprite._trailLagFrames*(this._trailId+1);
	this._maxOpacity = this._battler._sprite._trailOpacity ||this._maxOpacity
	this._opacityCap=this._maxOpacity/(this._trailId+1);//make subsequent trails dimmer
	this.pastLocX=new Array(this._lagFrames).fill(this._battler.screenX());
	this.pastLocY=new Array(this._lagFrames).fill(this._battler.screenY());
	this.pastBitmap=new Array(this._lagFrames).fill(this._battler._sprite.bitmap);
	this.pastRot=new Array(this._lagFrames).fill(this._battler._sprite.rotation);
	this.pastZoomX=new Array(this._lagFrames).fill(this._battler._sprite.scale._x);
	this.pastZoomY=new Array(this._lagFrames).fill(this._battler._sprite.scale._y);
	this._animationCount=0//Math.floor(oSprite._trailLife* (1 - (oSprite._trailCount-this._trailId)/(oSprite._trailCount) ))
	
}
Sprite_Trail.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this.shouldDisplay())
	{
		this.opacity=this.opacity*.8;
		this.opacity=Math.max(this.opacity-1,0);
		this._totalFrames=0;
		this._animationCount=0;
		return;
	}
	if (this._battler )
	{
		var bsprite=this._battler._sprite;
		this.anchor = bsprite.anchor
		
		this.x=this.pastLocX[this._animationCount];
		this.y=this.pastLocY[this._animationCount];
		this.rotation =this.pastRot[this._animationCount]
		this.scale._x=this.pastZoomX[this._animationCount]
		this.scale._y=this.pastZoomY[this._animationCount]
		
		this.pastLocX[this._animationCount]=bsprite.x;
		this.pastLocY[this._animationCount]=bsprite.y;
		this.pastRot[this._animationCount]=bsprite.rotation;
		this.pastZoomX[this._animationCount]=bsprite.scale._x;
		this.pastZoomY[this._animationCount]=bsprite.scale._y;


		if (this.bitmap != this.pastBitmap[this._animationCount])
		{
			this.bitmap = this.pastBitmap[this._animationCount]
		}
		this.pastBitmap[this._animationCount]=bsprite.bitmap;
		
		
		this._animationCount+=1;
		if (this._animationCount>=this._lagFrames)
		{
			this._animationCount=0;
		}
		
		
		if (this._totalFrames==this._startUpTime)
		{
			this._startingUp = true
		}
		if (this._startingUp)
		{
			if (this.opacity<this._opacityCap)
			{
				this.opacity=0.8*this.opacity+0.2*this._opacityCap
				if (this.opacity>=this._opacityCap-1)
				{
					this.opacity=this._opacityCap
				}
			}
			if (this._totalFrames<this._startUpTime*2)
			{
				var ratio =(this._totalFrames-this._startUpTime)/this._startUpTime;
				this.x=ratio* this.pastLocX[this._animationCount]+(1-ratio) * bsprite.x
				this.y=ratio* this.pastLocY[this._animationCount]+(1-ratio) * bsprite.y
			}
		}
		this._totalFrames+=1;
	}

};



Sprite_Trail.prototype.animationWait = function() {
    return 40;
};

Sprite_Trail.prototype.shouldDisplay = function() {
    const battler = this._battler;
    return battler && (battler.isActor() || battler.isAlive());
};



//* MirrorMatch code *//

//mirror matches use troop slots 770 (sam doorknock) and 771 (party vs party)
//as well as the mirror troop (# 10)

// enemy slots 847-891 (party member enemies, plus reflection)

// switches 1173 (enable party v party)
//          1174 (post door knock to trigger common event 270)
//      and 1175 (suppress duplicate events)

// Common event 290

MM={}
MM.partyId= 850//ID of the ---Alternate Party-- Marker
MM.troopId=770; //Id of Sam, full party is one lower
//other files (everything made for mirror matches has MM as a prefix)

// everything in \img\enemies\Reflections\    
// (This folder also includes the additional reflections showing sam's missing arm.)

// \img\battlebacks2\MM_Front_Door.png
// \img\battlebacks2\MM_Front_Door_Eyehole.png
// \img\battlebacks2\MM_Front_Door_Eyehole2.png
// \img\battlebacks2\MM_Back_Black.png



//Used in solo sam troop.  loads stats for party members to replace monster party 
// then reduces party to only sam for the battle's duration, storing the old party ListFormat
// in $gamePlayer._oldParty, which gets deleted after the battle;
// the event which triggers the fight hides the player party before battle processing
// and appears the party afterwards, so they technically exist in allMembers but don't contribute.

function replaceMonstersWithPartyStats(){
	for(var i = 0; i<Math.min($gameTroop.members().length,$gameParty.allMembers().length);i++)
	{
		enemyCopyPartyMember(i,$gameParty.allMembers()[i].actorId())
		
	}
	
	$gameActors.actor(1).recoverAll()
	copySamSkillsToEnemy()
	
	$gameTroop.members()[0].name = function() {
		return "???";
	};
	
}

copySamSkillsToEnemy = function(enemySlot=0){
 	// give Sam all his skills (and ratbaby gets them too)
	// going to be a bit dirty here and mess with the dataEnemy template for
	// sam, but since we do this each time a sam is created
	// there shouldn't be any lingering issues from past runs.
	
	// especially since we clear it at the start
	// remove everything but the first slot (a priority 5 'attack' command).
	//
	$gameTroop.members()[enemySlot].enemy().actions=[$gameTroop.members()[enemySlot].enemy().actions[0]]
	//I am going to assume 
	//item.meta.unrecordable
	// will filter out anything that can't be handled.
	var samSkills=$gameParty.members()[0].skills().filter( a => !a.meta.unrecordable)
	
	$dataEnemies[MM.partyId+1].actions=[{conditionParam1: 0, conditionParam2: 0, conditionType: 0, rating: 5, skillId: 1}]
	$dataEnemies[MM.partyId+8].actions=[{conditionParam1: 0, conditionParam2: 0, conditionType: 0, rating: 5, skillId: 1}]
	for(var i = 0; i<samSkills.length;i++)
	{
		//start with a pure attack object and replace the skill id.
		//lower priority on skills relative to attacks
		$dataEnemies[MM.partyId+1].actions[1+i]= {conditionParam1: 0, conditionParam2: 0, conditionType: 0, rating: 3, skillId: 1}
		$dataEnemies[MM.partyId+1].actions[1+i].skillId=samSkills[i].id;
		
		//ratbaby copies dad.
		$dataEnemies[MM.partyId+8].actions[1+i]=$dataEnemies[MM.partyId+1].actions[1+i]
		
	}
}


// if you have characters in your party and also at home, 
// this replaces monsters with the homies.
// we are assuming you've got 
// at least 4 recruits
// and your absent party members are >= your current party size minus sam
// partySize = $gameParty.members().length 
//cannot rely on gVr(38) being up to date since it only updates on in-apartment party shuffle


// (recruitsList().length>=4)  && ( $gameParty.members().length -1 <= recruitsList().length/2 ) && !$gameParty.members()[0].isDead() 

partyFightPossible=function()
{
	if($gameActors.actor(1).isDead()){return false}
	numRecruits=recruitsList().length;
	
	if(numRecruits<4) {return false}
	var partyCompanions = $gameParty.members().length -1 
	
	
	// we want the fight to be balanced, so we want the recruits at home
	// to be at least equal to the number in the party.
	// hence, party without sam cannot have more people than recruits left at home.
	if(partyCompanions > numRecruits-partyCompanions) { return false}
	
	return true;
}

recruitsList=function(){
	var recruits = [];
	if(gSw(376)) {recruits.push(2)}  //lyle 
	if(gSw(374)) {recruits.push(3)}  //aster 
	if(gSw(33)) {recruits.push(4)}  //joel 
	if(gSw(34)) {recruits.push(5)}  //leigh 
	if(gSw(32)) {recruits.push(6)}  //dan 
	if(gSw(35)) {recruits.push(7)}  //hellen 
	if(gSw(366)) {recruits.push(8)}  //ratbaby 
	if(gSw(377)) {recruits.push(9)}  //wretch 
	if(gSw(370)) {recruits.push(10)}  //roaches 
	if(gSw(361)) {recruits.push(11)}  //ernest 
	if(gSw(362)) {recruits.push(12)}  //sophie 
	if(gSw(378)) {recruits.push(13)}  //papi 
	if(gSw(363)) {recruits.push(14)}  //goths mont
	if(gSw(363)) {recruits.push(15)}  //goths xar
	if(gSw(371)) {recruits.push(16)}  //morton 
	if(gSw(372)) {recruits.push(17)}  //kind 
	if(gSw(373)) {recruits.push(18)}  //melt 
	if(gSw(375)) {recruits.push(19)}  //corrupt dan  
	//if(gSw(380)) {recruits.push(20)}  //disable audrey due to lack of battlesprite
	if(gSw(1351)) {recruits.push(21)}  //clyde recruit
	//if(gSw(1352)) {recruits.push(25)}  //malison cameo character
	if(gSw(499) && gVr(633>12)) {recruits.push(26)}  //phillipe 
	//if(gSw(1354)) {recruits.push(27)}  
	if($gamePlayer.isEnableSybil) {recruits.push(38)}  //sybil party member, requires proper db setup so can't work in battletest
	return recruits;
}

  replaceMonstersWithHomeParty = function(){
	
	recruits=recruitsList();
	//shuffle recruits with fisher-yates so it's random
	for (let i = recruits.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
		[recruits[i], recruits[j]] = [recruits[j], recruits[i]];
	}
	
	//invalidate current party members
	for (var actorSlot =0; actorSlot<recruits.length;actorSlot++)
	{
		if ($gameParty._actors.includes(recruits[actorSlot]))
		{
			recruits[actorSlot]=-1;
		}
		
	}
	
	//copy sam
	enemyCopyPartyMember(0,1)
	copySamSkillsToEnemy(0)
	
	
	//add homies
	var enemyTroopsAdded=1;
	var homies = []
	for (var actorSlot =0; actorSlot<recruits.length;actorSlot++)
	{
		//break if we reach the dummy enemy at the end.
		if (enemyTroopsAdded ==$gameTroop.members().length-1)
		{
			break
		}
		if (recruits[actorSlot]>0)
		{
			enemyCopyPartyMember(enemyTroopsAdded,recruits[actorSlot]);
			enemyTroopsAdded+=1;
			homies.push(recruits[actorSlot]);
		}
			
		
	}
	sVr(7,enemyTroopsAdded)
	sVr(8,homies)
} 

 mirrorHere=function(actor)
{
	
	
	if ($gameParty._actors.includes(actor)){ return true}
	if (gVr(8).includes(actor)){return true}
	
	
	return false
}

//script to check in party based on entering a name or substring
//basically to make these checks more readable in event logic.
isParty=function(actorName,slot=-1)
{
	
	if (slot>=$gameParty._actors.length){return false}
	//special handling for rat (8) and sam (1) which get renamed
	if (actorName.toUpperCase() == "SAM") 
	{
		if ( (slot==-1) && $gameParty._actors.includes(1)){return true}
		if($gameParty._actors[slot]==1){return true}
		return false;
	}
		
	if  (actorName.toUpperCase() == "RAT")
	{
		if ( (slot==-1) && $gameParty._actors.includes(8)){return true}
		if($gameParty._actors[slot]==8){return true}
		return false;
	}
	
	if (slot==-1)
	{
		//default is to check the whole party list
		for (actorId of $gameParty._actors)
		{
			if (![1,8].includes(actorId))
			{
				if ($dataActors[actorId].name.toUpperCase().contains(actorName.toUpperCase())){return true}
			}
		}
	}else{
		//otherwise we just check the designated slot, 
		//this lets us use the party order in the rpgmaker event
		if (![1,8].includes($gameParty._actors[slot]))
			{
				if($dataActors[actorId].name.toUpperCase().contains(actorName.toUpperCase())){return true}
			}
	
	}
	return false;
}

//checks if characters are at home (that is, if their ids are in game variable 8)
isHomie=function(actorName,slot=-1)
{
	if (slot>=gVr(8).length){return false}

	if (slot==-1)
	{
		//default is to check the whole homie list
		for (actorId of gVr(8))
		{
			if ($gameActors.actor(actorId).name().toUpperCase().contains(actorName.toUpperCase())){return true}
		}
	}else{
		//otherwise we just check the designated slot, 
		//this lets us use the randomized order in the rpgmaker event
		if($gameActors.actor(gVr(8)[slot]).name().toUpperCase().contains(actorName.toUpperCase())){return true}
	
	}
	return false;
} 

 
 enemyCopyPartyMember = function ( enemyId,  partyId)
 {
	
	let monster = $gameTroop.members()[enemyId]
	monster.copyTarget=$gameActors.actor(partyId);
	monster.transform(MM.partyId+monster.copyTarget.actorId())
	monster.enemy().meta.level=monster.copyTarget.level
	
	for (var iParam=0; iParam<8;iParam++)
	{
		monster._paramPlus[iParam] =monster.copyTarget.param(iParam)-monster.param(iParam)
	}
	

	monster.traitObjects = function() {
		const objects= Game_Battler.prototype.traitObjects.call(this)
		objects.push(this.copyTarget.actor(), this.copyTarget.currentClass());
			for (const item of this.copyTarget.equips()) {
				if (item) {
					objects.push(item);
				}
			}
			return objects;
	};
	monster.name = function() {
		return this.copyTarget.name();
	};
	if (partyId == 19)
	{
		monster._battlerName=$dataEnemies[359].battlerName;//implement corrupt dan poses
	
		//move dan to the top of frame so sprites aren't cut off.
		var sprite = monster._sprite
	
		sprite._homeY=680;
		sprite._battler._screenY=680;
		sprite.move(sprite.x,680)
		
	}
	monster.setHp(Math.max(40,monster.copyTarget.hp))
	monster.gainMp(999);
	
 }
 
  makeMirrorSam = function ( enemyId)
 {
	let monster = $gameTroop.members()[enemyId]
	monster.copyTarget=$gameActors.actor(1);
	monster.enemy().meta.level=monster.copyTarget.level
	monster._paramPlus=[0,0,0,0,0,0,0,0];
	for (var iParam=0; iParam<8;iParam++)
	{
		monster._paramPlus[iParam] =monster.copyTarget._paramPlus[iParam]//+monster.copyTarget.paramBase(iParam)
	}
	
	var playerWeapon=[];
	var mirrorWeapon=[];
	//copy sam's class and equipment 
	monster.traitObjects = function() {
		const objects= Game_Battler.prototype.traitObjects.call(this)
		objects.push(this.copyTarget.actor(), this.copyTarget.currentClass());
			for (const item of this.copyTarget.equips()) {
				if (item)
				{
					//remove weapons if one-armed and replace them.
					var shouldEquip =true;
					if(gVr(187) == 2) //lost left arm, player probaly has melee.  Mirror needs a gun instead.
					{
						if(item.etypeId && item.etypeId==1)
						{
							playerWeapon=item;
							var rangedInventory=$gameParty.armors().filter( a=> a.etypeId==2 && !a.meta.twoHanded && old_armless_equip_armor.call($gameActors.actor(1),a));
							if (rangedInventory.length>0)
							{
								mirrorWeapon=rangedInventory[rangedInventory.length-1]
								//equip the last item, presumably the strongest.
								objects.push(rangedInventory[rangedInventory.length-1])
							}
							
							shouldEquip=false;
						}
					}
					if(gVr(187) == 1) //lost right arm, player probably has ranged.  Mirror needs a melee instead.
					{
						if(item.etypeId && item.etypeId==2)
						{
							playerWeapon=item;
							//if we have unbroken weapons, use those.  Otherwise
							//grab all weapons.
							var meleeInventory=$gameParty.weapons().filter(a=> (a.meta.repairTo==undefined) && !a.meta.twoHanded && old_armless_equip_weapon.call($gameActors.actor(1),a)) 

							if (meleeInventory.length==0)
							{
								meleeInventory=$gameParty.weapons().filter(a=> !a.meta.twoHanded && old_armless_equip_weapon.call($gameActors.actor(1),a))
							}
							if (meleeInventory.length>0)
							{
								mirrorWeapon=meleeInventory[meleeInventory.length-1]
								//equip the last item ID, usually the strongest.
								objects.push(mirrorWeapon)

							}
							shouldEquip=false;
						}
					}
					if (shouldEquip) {
						objects.push(item);
					}
				}
			}
			return objects;
	};
	
	monster.name = function() {
		return this.copyTarget.name();
	};
	

	//copy base class parameters
	monster.paramBase = function(paramId) {
		return this.copyTarget.currentClass().params[paramId][this.copyTarget._level];
	};
	
	//copy equipment bonuses
	
	var monsterEquips=monster.traitObjects().filter(a=>a.etypeId);
	
	for (item of monsterEquips)
	{
		for (var iParam=0; iParam<8;iParam++)
		{
			monster._paramPlus[iParam]+=item.params[iParam]
		}
	}


	//copy skills
	var samSkills=$gameParty.members()[0].skills().filter( a => !a.meta.unrecordable)
	var gunSkills=[]
	//add the skills from our mirror weapon
	if(mirrorWeapon&&mirrorWeapon.traits)
	{
		for (trait of mirrorWeapon.traits.filter(a=>a.code==43))
		{
			samSkills.push($dataSkills[trait.dataId])
			if(gVr(187)==2)
			{
				gunSkills.push(trait.dataId)
			}
		}
	}
	var toRemoveSkills=[];

	if(gVr(187) == 2) //mirror has gun
	{
		//painful stab shouldn't be on a gun-only sam.
		toRemoveSkills.push(410)
	}
	
	
	//remove skills from our current weapon.
	if(playerWeapon&&playerWeapon.traits)
	{
		for (trait of playerWeapon.traits.filter(a=>a.code==43))
		{
			toRemoveSkills.push(trait.dataId)
		}
		

		
		for (var i = samSkills.length-1;i>=0;i=i-1)
		{
			if (toRemoveSkills.includes(samSkills[i].id) || samSkills[i].meta.unrecordable)
			{
				samSkills.splice(i,1)
				
			}
		}
	}

	//lower priority on skills relative to attacks
	//unless the mirror only has a gun, in which case 
	//it uses guns and skills
	//since melee is basically useless with no arm.
	varSkillRating= (gVr(187) == 2? 6 : 3)
	$dataEnemies[MM.partyId+41].actions=[{conditionParam1: 0, conditionParam2: 0, conditionType: 0, rating: 5, skillId: 1}]
	
	for(var i = 0; i<samSkills.length;i++)
	{
		//start with a pure attack object and replace the skill id.
		
		$dataEnemies[MM.partyId+41].actions[1+i]= {conditionParam1: 0, conditionParam2: 0, conditionType: 0, rating: varSkillRating, skillId: 1}
		$dataEnemies[MM.partyId+41].actions[1+i].skillId=samSkills[i].id;
		if ( gunSkills.includes(samSkills[i].id))
		{
			$dataEnemies[MM.partyId+41].actions[1+i].rating+=1;
		}
		//assumes that the reflection attack routine gets set up each time it starts.
		
	}
	
	//match sam's HP, and regen stamina to full
	monster.setHp(Math.max(40,monster.copyTarget.hp))
	monster.gainMp(999);
	
 }
 
 
 // patch the battleback fetch code to make sure these battlebacks show up correctly at the start
 
 Tuni_oldBattleBack2Name=Sprite_Battleback.prototype.battleback2Name 
Sprite_Battleback.prototype.battleback2Name = function() {
    if ($gameTroop._troopId==MM.troopId){return "MM_Back_Black"}
	if ($gameTroop._troopId==MM.troopId+1){return "MM_Front_Door"}
	return Tuni_oldBattleBack2Name.call(this);
};



function swapArms()
{
	if(gVr(187) == 2) //lost left arm, player probaly has melee.  Mirror needs a gun instead.
	{
		sVr(187,1)//reverse arm lost
		$gameActors.actor(1).changeEquip(0,null) //remove melee

		var rangedInventory=$gameParty.armors().filter( a=> a.etypeId==2 && !a.meta.twoHanded && old_armless_equip_armor.call($gameActors.actor(1),a));
		if (rangedInventory.length>0)
		{
			//equip the last item, presumably the strongest.
			$gameActors.actor(1).changeEquipById(2,rangedInventory[rangedInventory.length-1].id)
			
		}
		
		
		
		
	}else if(gVr(187) == 1) //lost right arm, player probably has ranged.  Mirror needs a melee instead.
	{
		sVr(187,2)//reverse arm lost
		$gameActors.actor(1).changeEquip(1,null) //remove ranged
		//if we have unbroken weapons, use those.  Otherwise
		//grab all weapons.
		// use the old version of canequip to check if we could hypothetically equip 
		// if we didn't lose an arm.
		var meleeInventory=$gameParty.weapons().filter(a=> (a.meta.repairTo==undefined) && !a.meta.twoHanded && old_armless_equip_weapon.call($gameActors.actor(1),a)) || $gameParty.weapons().filter(a=> !a.meta.twoHanded && old_armless_equip_weapon.call($gameActors.actor(1),a))
		if (meleeInventory.length>0)
		{
			$gameActors.actor(1).changeEquipById(1,meleeInventory[meleeInventory.length-1].id)
			//equip the last item ID, usually the strongest.
			
		}
		
	}
}

/* 
//assuming we aren't using the hendricks translation plugin
//softmod character objects to make the party members 'unconscious' instead of 'slain'.
//this is used in troop actions, so it only modifies the current battle log window
//which gets destroyed at the end of the battle
//it's commented out here for reference.

if (typeof(_Window_BattleLog_displayAddedStates)=="undefined")
{
	SceneManager._scene._logWindow.displayAddedStates = function(target) {
		const result = target.result();
		const states = result.addedStateObjects();
		for (const state of states) {
			stateText=""
			if (state.id === target.deathStateId()) {
				if(target.isActor() && target.actorId()>1){stateText=state.message1} //KOed
				if(!target.isActor() && target.enemyId()>MM.partyId){stateText=state.message1} //KOed
				if(target.isActor() && target.actorId()==1){ stateText=state.message2}//slain
				this.push("performCollapse", target);
			}else{
				stateText = target.isActor() ? state.message1 : state.message2;
			}
			if (stateText) {
				this.push("popBaseLine");
				this.push("pushBaseLine");
				this.push("addText", stateText.format(target.name()));
				this.push("waitForEffect");
			}
		}
	};
}
 */

