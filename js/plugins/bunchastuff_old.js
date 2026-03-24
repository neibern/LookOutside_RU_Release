
///WARNING THIS CODE IS PROTECTED BY THE KELP MAN
///BEWARE THE KELP MAN

function gSw(switchId) {
 return $gameSwitches.value(switchId);
};
function gVr(varId) {
 return $gameVariables.value(varId);
};

DataManager.saveGame = function(savefileId) {
    const contents = this.makeSaveContents();
    const saveName = this.makeSavename(savefileId);
    return StorageManager.saveObject(saveName, contents).then(() => {
        this._globalInfo[savefileId] = this.makeSavefileInfo();
        this.saveGlobalInfo();
		console.log(" == GAME SAVED == ");
        return 0;
    });
};

Scene_Save.prototype.executeSave = function(savefileId) {
    $gameSystem.setSavefileId(savefileId);
    $gameSystem.onBeforeSave();
	sVr(147,null);
	sVr(148,null);
    DataManager.saveGame(savefileId)
        .then(() => this.onSaveSuccess())
        .catch((error) => this.onSaveFailure(error));
};

Scene_Base.prototype.executeAutosave = function() {
    $gameSystem.onBeforeSave();
	sVr(147,null);
	sVr(148,null);
    DataManager.saveGame(0)
        .then(() => this.onAutosaveSuccess())
        .catch((error) => this.onAutosaveFailure(error));
};

setInterval(function(){ overlayBugFix(); }, 1000);
        function overlayBugFix() {
            var canvas = document.getElementById("refresher");
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

function checkCanAttack(target)
{
	var enemyOb = $gameTroop.members()[target-1];
	const _enemy = enemyOb.enemy();
	return enemyOb.canAttack();
}

function partyLevelWarn(targLevel)
{
    const members = $gameParty.members();
    const sum = members.reduce((r, member) => r + member.level, 0);
	console.log("Party Power level: "+ sum +", Target: "+targLevel);
    return (targLevel>sum);
}

function setAchievement(achName)
{
	if(CycloneSteam.activateAchievement(achName))
	{
		console.log("Activating achievement: "+achName+", SUCCESS");
	}
	else
	{
		console.log("Activating achievement: "+achName+", FAILURE");
	}
	
}

Window_BattleLog.prototype.messageSpeed = function() {
    return 24;
};


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
	for (const member of $gameParty.members())
    {
        for (const learning of member.currentClass().learnings) {
            if (learning.level <= member._level) {
                member.learnSkill(learning.skillId);
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

Game_Unit.prototype.onBattleEnd = function() {
    this._inBattle = false;
    for (const member of this.members()) {
        member.onBattleEnd();
    }
	
	
	
};

Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(
        new Bitmap(Graphics.width, Graphics.height)
    );
    this.addChild(this._gameTitleSprite);
    if ($dataSystem.optDrawTitle) {
        //this.drawGameTitle();
    }
};

Scene_Map.prototype.updateEncounterEffect = function() {
    if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        const speed = this.encounterEffectSpeed();
        const n = speed - this._encounterEffectDuration;
        const p = n / speed;
        const q = ((p - 1) * 20 * p + 5) * p + 1;
        const zoomX = $gamePlayer.screenX();
        const zoomY = $gamePlayer.screenY() - 24;
        if (n === 2) {
            $gameScreen.setZoom(zoomX, zoomY, 1);
            this.snapForBattleBackground();
            this.startFlashForEncounter(speed / 4);
        }
        $gameScreen.setZoom(zoomX, zoomY, q);
        if (n === Math.floor(speed / 6)) {
            this.startFlashForEncounter(speed / 4);
        }
        if (n === Math.floor(speed / 2)) {
            BattleManager.playBattleBgm();
            this.startFadeOut(this.fadeSpeed());
        }
    }
};


Scene_Map.prototype.startFlashForEncounter = function(duration) {
    const color = [200, 200, 200, 40];
    $gameScreen.startFlash(color, duration);
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.adjustBackground();
    this.playTitleMusic();
};

BattleManager.makeEscapeRatio = function() {
    //(0.5 * $gameParty.agility()) / $gameTroop.agility();
	if(gSw(13)){this._escapeRatio = 1/4;}else{this._escapeRatio = 1/8;}
};

BattleManager.onEscapeFailure = function() {
    $gameParty.onEscapeFailure();
    this.displayEscapeFailureMessage();
	if(gSw(13)){this._escapeRatio += 1/8;}else{this._escapeRatio += 1/12;}
    if (!this.isTpb()) {
        this.startTurn();
    }
};

BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    const success = this._preemptive || Math.random() < this._escapeRatio;
    if (success) {
        this.onEscapeSuccess();
    } else {
        this.onEscapeFailure();
    }
    return success;
};

BattleManager.endTurn = function() {
    this._phase = "turnEnd";
    this._preemptive = false;
    this._surprise = false;
	switch($gameTroop.turnCount())
	{
		case 1: this._escapeRatio += 1/4; break;
		case 2: this._escapeRatio += 1/4; break;
	}
};

Game_Action.prototype.applyCritical = function(damage) {
    return damage * 1.8;
};


Scene_Map.prototype.needsSlowFadeOut = function() {
    if($gameTemp._skipSlowfade){return false;}
	else
	{
		return (
			SceneManager.isNextScene(Scene_Title) ||
			SceneManager.isNextScene(Scene_Gameover)
		);
	}
};

function getGamestat(statName)
{
	CycloneSteam.getStatInt(statName);
}

function setGamestat(statName,value)
{
	curVal = getGamestat(statName);
	if(curVal<value)
	{
		CycloneSteam.setStatInt(statName,value);
	}
}

function countGames()
{
	var nbGames = gVr(41);
	if(nbGames>=4){setAchievement("Collect_Game");}
	setGamestat("games",nbGames);
	if(nbGames>=10){setAchievement("Collect_10Games");}
	if(nbGames>=20){setAchievement("Collect_AllGames");}
}

function countGuns()
{
	var nbGuns = gVr();
	if(nbGuns>=1){setAchievement("Collect_Gun");}
	setGamestat("guns",nbGuns);
	if(nbGuns>=6){setAchievement("Collect_6Guns");}
	if(nbGuns>=16){setAchievement("Collect_AllGuns");}
}

function countTreasures()
{
	if(gSw(110))
	{
		quickMsg("Items marked with \I[147] are valuables you can sell for some extra cash.");
		sSw(110,true);
	}
}

Game_Event.prototype.qImgFrm = function (imageFile,imageSet,dir,step)
{
	this.setImage(imageFile, imageSet);
	this.qFrm(dir,step);
}

Game_Event.prototype.qFrm = function (dir,step)
{
	if(dir==0){this.setDirection(2);}
	if(dir==1){this.setDirection(4);}
	if(dir==2){this.setDirection(6);}
	if(dir==3){this.setDirection(8);}
	this._originalPattern = step;
	this.resetPattern();
}

function danViewers()
{
	var viewers = gVr(568);
	var retval = 0;
	while(viewers>0)
	{
		if(viewers<10){retval += viewers/10; viewers = 0;}
		else{retval+=1; viewers-=10; viewers = viewers/2;}
	}
	
	return retval;
}

function danScanBase(target,scanPow)
{
	var enemyOb = $gameTroop.members()[target-1];
	var enemyBase = enemyOb.enemy();
	var returnString = "";
	
	var enemyLevel = enemyBase.meta.level;
	if(!enemyLevel)
	{
		enemyLevel = 1 + Math.floor(enemyOb.exp()/20);
	}
	const members = $gameParty.members();
	const partyLevel = members.reduce((r, member) => r + member.level, 0);
	var enemyType = enemyBase.meta.enemyType;
	if(!enemyType){enemyType = "monster";}
	if((1+partyLevel)*2<enemyLevel){returnString = enemyOb.name() +", lv ???";}
	else
	{
		if(scanPow>10 || partyLevel*1.2>enemyLevel)
		{returnString = enemyOb.name() +", lv "+enemyLevel;}
		else{returnString = enemyOb.name() +", lv ???";}
	}
	returnString+=" "+enemyType+"\n";
	const hpRatio = enemyOb.hp/enemyOb.mhp;
	var scanRatio = scanPow * (partyLevel/enemyLevel);
	console.log("Party level:"+partyLevel+", Scan Power: "+scanPow+", scan Ratio: "+scanRatio);
	if(scanRatio<4){returnString += "HP: ???";}
	else if(scanRatio<8)
	{
		returnString += "HP: ??? ";
		if(hpRatio<0.2){returnString+= "(near death)";}
		else if(hpRatio<0.4){returnString+= "(heavily wounded)";}
		else if(hpRatio<0.6){returnString+= "(wounded)";}
		else if(hpRatio<0.8){returnString+= "(lightly wounded)";}
		else{returnString+= "(unharmed)";}
	}
	else if(scanRatio<12){returnString += "HP: "+enemyOb.hp+"/"+enemyOb.mhp+", STM: ???";}
	else {returnString += "HP: "+enemyOb.hp+"/"+enemyOb.mhp+", STM:"+enemyOb.mp+"/"+enemyOb.mmp+"";}
	returnString+="\n";
	if(scanRatio<8)
	{
		returnString += "Atk:??, Def:??, Ball:??, Bull.Def:??, Agi:??, Lck:??\n";
	}
	else
	{
		returnString += "Atk:"+ enemyOb.atk+", Def:"+enemyOb.def+", Ball:"+enemyOb.mat
		+", Bull.Def:"+enemyOb.mdf+", Agi:"+enemyOb.agi+", Lck: "+enemyOb.luk+"\n";
	}
	
	if(scanRatio>8)
	{
	var itemDropsLine = "";
	var itemDrops = enemyOb.enemy().dropItems;
	if(itemDrops.length==0){returnString += "none";}
	itemDrops.forEach(function(drop){
		if(drop.kind>0)
		{
			if(itemDropsLine.length>0){itemDropsLine+=", ";}
			var itmOb = null;
			if (drop.kind === 1) {itmOb = $dataItems[drop.dataId];}
			else if (drop.kind === 2) {itmOb = $dataWeapons[drop.dataId];}
			else if (drop.kind === 3) {itmOb = $dataArmors[drop.dataId];}
			var dropRate = Math.floor(100/drop.denominator);
			if(dropRate>=50 || scanRatio>16){itemDropsLine+=itmOb.name +"("+dropRate+"%)";}
			else if(dropRate>=20 || scanRatio>12){itemDropsLine+=itmOb.name +"("+dropRate+"%)";}
			else{itemDropsLine+=itmOb.name.replace(/[a-zA-Z]/g, '?') +"(??%)";}
			
		}
	})
	}
	else{itemDropsLine = "???";}
	
	if(itemDropsLine.length>0){returnString+="Items: "+itemDropsLine;}
	
	return returnString;
}

function danScanResist(target,scanPow)
{
	var enemyOb = $gameTroop.members()[target-1];
	const _enemy = enemyOb.enemy();
	var string = "";
	////
	var nbWeaknesses = 0;
	var nbStrengths = 0;
	var nbImmunes = 0;
	var immuneStr = "";
	var resistStr = "";
	var weakStr = "";
	var lnBrkImm = false;
	var lnBrkRes = false;
	var lnBrkWeak = false;
	
	var elemRate = enemyOb.elementRate(1); ///crush
	if(elemRate>=1.25){weakStr+="[CRUSH] ";}
	if(elemRate<=0.1){immuneStr+="[CRUSH] ";}
	else if(elemRate<=0.75){resistStr+="[CRUSH] ";}
	
	elemRate = enemyOb.elementRate(2); ///slash
	if(elemRate>=1.25){weakStr+="[SLASH] ";}
	if(elemRate<=0.1){immuneStr+="[SLASH] ";}
	else if(elemRate<=0.75){resistStr+="[SLASH] ";}
	
	elemRate = enemyOb.elementRate(3); ///pierce
	if(elemRate>=1.25){weakStr+="[PIERCE] ";}
	if(elemRate<=0.1){immuneStr+="[PIERCE] ";}
	else if(elemRate<=0.75){resistStr+="[PIERCE] ";}
	
	elemRate = enemyOb.elementRate(4); ////fire
	if(elemRate>=1.25){weakStr+="[FIRE] ";}
	if(elemRate<=0.1){immuneStr+="[FIRE] ";}
	else if(elemRate<=0.75){resistStr+="[FIRE] ";}
	
	elemRate = enemyOb.elementRate(5); ///acid
	if(elemRate>=1.25){weakStr+="[ACID] ";}
	if(elemRate<=0.1){immuneStr+="[ACID] ";}
	else if(elemRate<=0.75){resistStr+="[ACID] ";}
	
	elemRate = enemyOb.elementRate(6); ///blast
	if(elemRate>=1.25){weakStr+="[BLAST] ";}
	if(elemRate<=0.1){immuneStr+="[BLAST] ";}
	else if(elemRate<=0.75){resistStr+="[BLAST] ";}
	
	elemRate = enemyOb.elementRate(7); ///bullet
	if(elemRate>=1.25){weakStr+="[BULLET] ";}
	if(elemRate<=0.1){immuneStr+="[BULLET] ";}
	else if(elemRate<=0.75){resistStr+="[BULLET] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(8); ///armor pierce
	if(elemRate>=1.25){weakStr+="[ARMOR PIERCE] ";}
	if(elemRate<=0.1){immuneStr+="[ARMOR PIERCE] ";}
	else if(elemRate<=0.75){resistStr+="[ARMOR PIERCE] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(9); ///flesh
	if(elemRate>=1.25){weakStr+="[FLESH] ";}
	if(elemRate<=0.1){immuneStr+="[FLESH] ";}
	else if(elemRate<=0.75){resistStr+="[FLESH] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(10); ///cold
	if(elemRate>=1.25){weakStr+="[COLD] ";}
	if(elemRate<=0.1){immuneStr+="[COLD] ";}
	else if(elemRate<=0.75){resistStr+="[COLD] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(11); ///shock
	if(elemRate>=1.25){weakStr+="[SHOCK] ";}
	if(elemRate<=0.1){immuneStr+="[SHOCK] ";}
	else if(elemRate<=0.75){resistStr+="[SHOCK] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(12); ///shadow
	if(elemRate>=1.25){weakStr+="[SHADOW]";}
	if(elemRate<=0.1){immuneStr+="[SHADOW]";}
	else if(elemRate<=0.75){resistStr+="[SHADOW]";}
	
	if(weakStr!=""){string+="Weak: "+ weakStr+"\n";}
	if(resistStr!=""){string+="Resist: "+ resistStr+"\n";}
	if(immuneStr!=""){string+="Immune: "+ immuneStr;}
	return string;
}

function danScanInfo(target,scanPow)
{
}

function isTalkAllowed()
{
	if(gSw(474)){return false;}
	else
	{
		var evIndex = gVr(514);
		var evFollowup = gVr(515);
		var arr = gVr(516);
		if(!Array.isArray(arr))
		{
			arr = [];
			for (var i = 0; i <= 600; i++) {arr.push(false); sVr(516,arr);}
		}
		if(arr[evIndex]==false && (evFollowup == 0 || arr[evFollowup]==true))
		{
			var chance = gVr(513);
			var roll = Math.randomInt(100);
			console.log("Event Index: "+evIndex+"Chance: "+chance +", roll: "+roll);
			if(roll<=chance || gSw(70)){return true;}else{return false;}
		}
		else{return false;}
	}
}

function stealItem(target)
{
	var enemyOb = $gameTroop.members()[target-1];
	const _enemy = enemyOb.enemy();
	if(_enemy.meta.stealItem || _enemy.meta.stealArmor || _enemy.meta.stealWeapon)
	{
		///check if item was already stolen
		var stealArray = gVr(521);
		if(!Array.isArray(stealArray))
		{
			stealArray = [];
			for (var i = 0; i <= 600; i++) {stealArray.push(false); sVr(521,stealArray);}
		}
		
		if(!stealArray[target])
		{
			stealArray[target] = true; sVr(521,stealArray);
			var itmAdd = 0;
			if(_enemy.meta.stealItem){itmAdd=$dataItems[parseInt(_enemy.meta.stealItem)];}
			if(_enemy.meta.stealArmor){itmAdd=$dataArmors[parseInt(_enemy.meta.stealArmor)];}
			if(_enemy.meta.stealWeapon){itmAdd=$dataWeapons[parseInt(_enemy.meta.stealWeapon)];}
			$gameParty.gainItem(itmAdd,1);
			sVr(8,itmAdd.name);
			return true;
		}
		else{return false;}
	}
	else{return false;}
}

function swapAllWpn(weaponIndFrom,weaponIndTo)
{
	for(var _i = 0; _i < $gameParty.members().length; _i++)
	{
		swapWpn(_i,weaponIndFrom,weaponIndTo);
	}
}

function swapWpn(member,weaponIndFrom,weaponIndTo)
{
	if($gameParty.members()[member].hasWeapon($dataWeapons[weaponIndFrom]))
	{
		$gameParty.members()[member].forceChangeEquip(0,$dataWeapons[weaponIndTo]);
		console.log("Force Changed Weapon from "+weaponIndFrom+ " to "+weaponIndTo);
		return true;
	}
	else{return false;}
}

function swapAllArmor(slot,armorIndFrom,armorIndTo)
{
	for(var _i = 0; _i < $gameParty.members().length; _i++)
	{
		swapArmor(_i,slot,armorIndFrom,armorIndTo);
	}
}

function swapArmor(member,slot,armorIndFrom,armorIndTo)
{
	if($gameParty.members()[member].hasArmor($dataArmors[armorIndFrom]))
	{
		$gameParty.members()[member].forceChangeEquip(slot,$dataArmors[armorIndTo]);
		console.log("Force Changed Armor from "+armorIndFrom+ " to "+armorIndTo);
		return true;
	}
	else{return false;}
}

Game_Actor.prototype.bareHandsAnimationId = function() {
    return 1;
};


Game_Actor.prototype.attackAnimationId1 = function() {
    if (this.hasNoWeapons()) {
        return this.bareHandsAnimationId();
    } else {
        const weapons = this.weapons();
        return weapons[0] ? weapons[0].animationId : 0;
    }
};

Game_Actor.prototype.attackAnimationId2 = function() {
    const weapons = this.weapons();
    return weapons[1] ? weapons[1].animationId : 0;
};

Game_Actor.prototype.getMeleeBitmapshift = function() {
    const weapons = this.weapons();
    return weapons[0] ? parseInt(weapons[0].meta.atkAnimShift) : 0;
		
	return 1;
};


// prettier-ignore
Window_BattleLog.prototype.showActorAttackAnimation = function(
    subject, targets
) {
	var bmShift = 0
	if(subject.attackAnimationId1()>300)
	{///over 300, check weapon for bitmap shift
		bmShift = subject.getMeleeBitmapshift();
	}
    this.showNormalAnimation(targets, subject.attackAnimationId1(), false,bmShift);
	
	bmShift = 0
	if(subject.attackAnimationId2()>300)
	{
		bmShift = getMeleeBitmapshift();
	}
    this.showNormalAnimation(targets, subject.attackAnimationId2(), true,bmShift);
};

// prettier-ignore
Window_BattleLog.prototype.showNormalAnimation = function(
    targets, animationId, mirror,bitmap2Shift=0
) {
    const animation = $dataAnimations[animationId];
    if (animation) {
        $gameTemp.requestAnimation(targets, animationId, mirror,0,bitmap2Shift);
    }
};


Window_ActorCommand.prototype.addAttackCommand = function() {
	if(this._actor.isStateAffected(70)) ///grinning beast always claws
	{
		this.addCommand("Claws","attack", this._actor.canAttack());
	}
	else
	{
		this.addCommand(TextManager.attack, "attack", this._actor.canAttack());
	}
};

Game_BattlerBase.prototype.attackSkillId = function() {
	if(this.isStateAffected(70)) ///grinning beast always claws
	{
		return 64;
	}
	else
	{
		const set = this.traitsSet(Game_BattlerBase.TRAIT_ATTACK_SKILL);
		return set.length > 0 ? Math.max(...set) : 1;
	}
};

Window_ActorCommand.prototype.addGuardCommand = function() {
	const guardskill = this._actor.guardSkillId()
	if(guardskill!=2)
	{
		this.addCommand($dataSkills[guardskill].name, "guard", this._actor.meetsSkillConditions($dataSkills[guardskill]));
	}
	else
	{
		this.addCommand(TextManager.guard, "guard", this._actor.canGuard());
	}
};

Game_Actor.prototype.guardSkillId = function() {
    const classData = this.currentClass();
    if (classData.meta["GuardSkill"]) {
        const classGuard = Number(classData.meta["GuardSkill"]);
        if (!Number.isNaN(classGuard)) return classGuard;
    }
    return 2;
};

Game_Temp.prototype.initialize = function() {
    this._isPlaytest = Utils.isOptionValid("test");
    this._destinationX = null;
    this._destinationY = null;
    this._touchTarget = null;
    this._touchState = "";
    this._needsBattleRefresh = false;
    this._commonEventQueue = [];
    this._animationQueue = [];
    this._balloonQueue = [];
    this._lastActionData = [0, 0, 0, 0, 0, 0];
	
	this._skipSlowfade = false;
};

// prettier-ignore
Game_Temp.prototype.requestAnimation = function(
    targets, animationId, mirror = false,_bitmapShift1 = 0, _bitmapShift2 = 0
) {
    if ($dataAnimations[animationId]) {
        const request = {
            targets: targets,
            animationId: animationId,
            mirror: mirror,
			bitmapShift1 : _bitmapShift1,
			bitmapShift2 : _bitmapShift2
        };
        this._animationQueue.push(request);
        for (const target of targets) {
            if (target.startAnimation) {
                target.startAnimation();
            }
        }
    }
};

Sprite_Enemy.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
    if (this._stateIconSprite.y < 50 - this.y) {
        this._stateIconSprite.y = 50 - this.y;
    }
};

Sprite_Battler.prototype.createDamageSprite = function() {
    const last = this._damages[this._damages.length - 1];
    const sprite = new Sprite_Damage();
    if (last) {
        sprite.x = last.x + 8;
        sprite.y = last.y - 16;
    } else {
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
		if(sprite.y>440){sprite.y = 440;}
    }
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
};

Spriteset_Base.prototype.createAnimation = function(request) {
    const animation = $dataAnimations[request.animationId];
    const targets = request.targets;
    const mirror = request.mirror;
	const bitmap1shift = request.bitmapShift1;
	const bitmap2shift = request.bitmapShift2;
	
    let delay = this.animationBaseDelay();
    const nextDelay = this.animationNextDelay();
    if (this.isAnimationForEach(animation)) {
        for (const target of targets) {
            this.createAnimationSprite([target], animation, mirror, delay,bitmap1shift,bitmap2shift);
            delay += nextDelay;
        }
    } else {
        this.createAnimationSprite(targets, animation, mirror, delay,bitmap1shift,bitmap2shift);
    }
};

Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    let chance = effect.value1;
    //if (!this.isCertainHit()) {
    chance *= target.stateRate(effect.dataId);
    chance *= this.lukEffectRate(target);
    //}
    if (Math.random() < chance) {
        target.addState(effect.dataId);
        this.makeSuccess(target);
    }
};


// prettier-ignore
Spriteset_Base.prototype.createAnimationSprite = function(
    targets, animation, mirror, delay, bitmap1shift, bitmap2shift
) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = this.makeTargetSprites(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous,bitmap1shift,bitmap2shift);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
};



Sprite_AnimationMV.prototype.initMembers = function() {
    this._targets = [];
    this._animation = null;
    this._mirror = false;
    this._delay = 0;
    this._rate = 4;
    this._duration = 0;
    this._flashColor = [0, 0, 0, 0];
    this._flashDuration = 0;
    this._screenFlashDuration = 0;
    this._hidingDuration = 0;
    this._hue1 = 0;
    this._hue2 = 0;
    this._bitmap1 = null;
    this._bitmap2 = null;
    this._cellSprites = [];
    this._screenFlashSprite = null;
    this.z = 8;
	this._bitmap1Shift = 0;
	this._bitmap2Shift = 0;
};

// prettier-ignore
Sprite_AnimationMV.prototype.setup = function(
    targets, animation, mirror, delay ,previous,bitmap1Shift,bitmap2Shift
) {
    this._targets = targets;
    this._animation = animation;
    this._mirror = mirror;
    this._delay = delay;
	this._bitmap1Shift = bitmap1Shift;
	this._bitmap2Shift = bitmap2Shift;
	
    if (this._animation) {
        this.setupRate();
        this.setupDuration();
        this.loadBitmaps();
        this.createCellSprites();
        this.createScreenFlashSprite();
    }
};

Sprite_AnimationMV.prototype.updateCellSprite = function(sprite, cell) {
    var pattern = cell[0];
    if (pattern >= 0) {
		if(pattern<100){pattern+=this._bitmap1Shift;}
		else{pattern+=this._bitmap2Shift;}
        const sx = (pattern % 5) * 192;
        const sy = Math.floor((pattern % 100) / 5) * 192;
        const mirror = this._mirror;
        sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
        sprite.setHue(pattern < 100 ? this._hue1 : this._hue2);
        sprite.setFrame(sx, sy, 192, 192);
        sprite.x = cell[1];
        sprite.y = cell[2];
        sprite.rotation = (cell[4] * Math.PI) / 180;
        sprite.scale.x = cell[3] / 100;

        if (cell[5]) {
            sprite.scale.x *= -1;
        }
        if (mirror) {
            sprite.x *= -1;
            sprite.rotation *= -1;
            sprite.scale.x *= -1;
        }

        sprite.scale.y = cell[3] / 100;
        sprite.opacity = cell[6];
        sprite.blendMode = cell[7];
        sprite.visible = true;
    } else {
        sprite.visible = false;
    }
};



function checkIfBGM(bgmTrack)
{
	if(AudioManager._currentBgm)
	{
		console.log("Checking BGM - " + AudioManager._currentBgm +" - name is "+AudioManager._currentBgm.name+", check if it is: "+ bgmTrack);
		if(AudioManager._currentBgm.name == bgmTrack){return true;}
		else{return false;}
	}
	else{return false;}
}
/*
function playBGMFadeIn(bgmTrack,_vol,_pitch,_pan,fadeInTime)
{
	if(!AudioManager._currentBgm || AudioManager._currentBgm.name != bgmTrack)
	{///doesnt work if already playing
		var _newbgm = {
			name: bgmTrack,
			volume: bgmTrack,
			pitch: _pitch,0
			pan: _pan,
			pos: 0
		};
		AudioManager.playBgm(_newbgm, 0);
		AudioManager.fadeInBgm(fadeInTime);
	}

};*/

function confirmTalk()
{
	var evIndex = gVr(514);
	var arr = gVr(516);
	sSw(474,true);
	arr[evIndex] = true;
	sVr(516,arr);
}

Game_CharacterBase.prototype.refreshBushDepth = function() {
    if (
        this.isNormalPriority() &&
        !this.isObjectCharacter() &&
        this.isOnBush() &&
        !this.isJumping()
    ) {
        if (!this.isMoving()) {
            this._bushDepth = $gameMap.bushDepth()*1.5;
        }
    } else {
        this._bushDepth = 0;
    }
};

Sprite_Character.prototype.createHalfBodySprites = function() {
    if (!this._upperBody) {
        this._upperBody = new Sprite();
        this._upperBody.anchor.x = 0.5;
        this._upperBody.anchor.y = 1;
        this.addChild(this._upperBody);
    }
    if (!this._lowerBody) {
        this._lowerBody = new Sprite();
        this._lowerBody.anchor.x = 0.5;
        this._lowerBody.anchor.y = 1;
        this._lowerBody.opacity = 64;
        this.addChild(this._lowerBody);
    }
};


Scene_Map.prototype.launchBattle = function() {
    BattleManager.saveBgmAndBgs();
	if($gameSwitches.value(11) == false)
	{
		this.stopAudioOnBattleStart();
		SoundManager.playBattleStart();
    }
	this.startEncounterEffect();
    this._mapNameWindow.hide();
	
	if($gameSwitches.value(281) == false)
	{
		this.closeVscChannels();
		this.closeBgmBgsChannels();
	}
};

function sSw(switchId,val) {
 return $gameSwitches.setValue(switchId,val);
};

function sVr(varId,val) {
 return $gameVariables.setValue(varId,val);
};

Scene_Title.prototype.commandWindowRect = function() {
    const offsetX = $dataSystem.titleCommandWindow.offsetX;
    const offsetY = $dataSystem.titleCommandWindow.offsetY;
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(4, true);
    const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
    const wy = Graphics.boxHeight - wh - 360 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
};

Window_TitleCommand.prototype.makeCommandList = function() {
    const continueEnabled = this.isContinueEnabled();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(TextManager.continue_, "continue", continueEnabled);
    this.addCommand(TextManager.options, "options");
	this.addCommand("Quit Game", "quit");
};


Scene_Title.prototype.createCommandWindow = function() {
    const background = $dataSystem.titleCommandWindow.background;
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_TitleCommand(rect);
    this._commandWindow.setBackgroundType(background);
    this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
    this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
    this._commandWindow.setHandler("options", this.commandOptions.bind(this));
	this._commandWindow.setHandler("quit", this.commandQuit.bind(this));
    this.addWindow(this._commandWindow);
};

Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand("save") && gSw(37)) {
        const enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, "save", enabled);
    }
};

Scene_Title.prototype.commandQuit = function() {
    this.fadeOutAll()
    SceneManager.exit()
};


oldSpriteClickableIsClickEnabled=Sprite_Clickable.prototype.isClickEnabled
Sprite_Clickable.prototype.isClickEnabled = function() {
    if ( this.constructor.name == "Sprite_Enemy")
    {
        if ( this._battler._hidden || this._battler.isDead())
        {
            return false
        }
    }

    return oldSpriteClickableIsClickEnabled.call(this)
}


//-----------------------------------------------------------------------------
// Scene_QuitGame
//
// The scene class of the game end screen.

function Scene_QuitGame() {
    this.initialize(...arguments);
}

Scene_QuitGame.prototype = Object.create(Scene_MenuBase.prototype);
Scene_QuitGame.prototype.constructor = Scene_QuitGame;

Scene_QuitGame.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_QuitGame.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
};

Scene_QuitGame.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
};

Scene_QuitGame.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.setBackgroundOpacity(128);
};

Scene_QuitGame.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_QuitGame(rect);
    this._commandWindow.setHandler("confirm", this.commandQuit.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_QuitGame.prototype.commandWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(2, true);
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = (Graphics.boxHeight - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_QuitGame.prototype.commandQuit = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
    Window_TitleCommand.initCommandPosition();
	
};

//-----------------------------------------------------------------------------
// Window_QuitGame
//
// The window for selecting "Go to Title" on the game end screen.

function Window_QuitGame() {
    this.initialize(...arguments);
}

Window_QuitGame.prototype = Object.create(Window_Command.prototype);
Window_QuitGame.prototype.constructor = Window_QuitGame;

Window_QuitGame.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.open();
};

Window_QuitGame.prototype.makeCommandList = function() {
    this.addCommand("Confirm", "confirm");
    this.addCommand("Cancel", "cancel");
};

//-----------------------------------------------------------------------------

/*
{
document.documentElement.requestFullscreen()
}
*/

Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this._item.price *gVr(125));
};

function setSybilMajorStory(index)
{
	var arr = gVr(504);
	var arr2 = gVr(509);
	if(!Array.isArray(arr)){arr = [];}
	if(!Array.isArray(arr2)){arr2 = [];}
	if(arr.includes(index)){console.log("SYBIL MAJOR STORY - was already added, skip " + index);}
	else if(arr2.includes(index)){console.log("SYBIL MAJOR STORY - was already used, skip " + index);}
	else
	{
		console.log("SYBIL MAJOR STORY - added "+index);
		arr.push(index)
		sVr(504,arr);
	}
	console.log("Major Story Array: "+arr);
}

function setSybilMinorStory(index)
{
	var arr = gVr(505);
	var arr2 = gVr(509);
	if(!Array.isArray(arr)){arr = [];}
	if(!Array.isArray(arr2)){arr2 = [];}
	if(arr.includes(index)){console.log("SYBIL MINOR STORY - was already added, skip " + index);}
	else if(arr2.includes(index+100)){console.log("SYBIL MINOR STORY - was already used, skip " + index);}
	else
	{
		console.log("SYBIL MINOR STORY - added "+index);
		arr.push(index)
		sVr(505,arr);
	}
	console.log("Minor Story Array: "+arr);
}

function staunchWoundsCalc(user,target) {
	var healname = ""
	if(target.hp<target.mhp/5){result = 8+target.mhp*0.6;}
	else if(target.hp<target.mhp/5*2){result = 6+target.mhp*0.4;}
	else if(target.hp<target.mhp/5*3){result = 4+target.mhp*0.2;}
	else if(target.hp<target.mhp/5*4){result = 2+target.mhp*0.1;}
	else {result = 1+target.mhp*0.05;}
	console.log(healname+": "+result+ ", hp :" +target.hp/target.mhp*100+"%");
return result;
}

Game_Action.prototype.targetsForEveryone = function() {
	var targetState = $dataSkills[this._item._itemId].meta.targetState;
	if(!targetState){targetState = 0;}else{targetState = parseInt(targetState);}
    
	const opponentMembers = this.opponentsUnit().aliveMembers();
    const friendMembers = this.friendsUnit().aliveMembers();
    return opponentMembers.concat(friendMembers);
};

Game_Action.prototype.targetsForOpponents = function() {
    var targetState = $dataSkills[this._item._itemId].meta.targetState;
	if(!targetState){targetState = 0;}else{targetState = parseInt(targetState);}
	
	const unit = this.opponentsUnit();
    if (this.isForRandom()) {
        return this.randomTargets_state(unit,targetState);
    } else {
        return this.targetsForAlive_state(unit,targetState);
    }
};

Game_Action.prototype.targetsForFriends = function() {
    const unit = this.friendsUnit();
    if (this.isForUser()) {
        return [this.subject()];
    } else if (this.isForDeadFriend()) {
        return this.targetsForDead(unit);
    } else if (this.isForAliveFriend()) {
        return this.targetsForAlive(unit);
    } else {
        return this.targetsForDeadAndAlive(unit);
    }
};

Game_Action.prototype.randomTargets_state = function(unit,chkState) {
    const targets = [];
    for (let i = 0; i < this.numTargets(); i++) {
        targets.push(unit.randomTarget_state(chkState));
    }
    return targets;
};

Game_Unit.prototype.smoothTarget_state = function(index,chkState) {
    const member = this.members()[Math.max(0, index)];
    return member && member.isAlive() ? member : this.aliveMembers_state(chkState)[0];
};

Game_Action.prototype.targetsForDead = function(unit,chkState) {
    if (this.isForOne()) {
        return [unit.smoothDeadTarget(this._targetIndex)];
    } else {
        return unit.deadMembers();
    }
};

Game_Action.prototype.targetsForAlive_state = function(unit,chkState) {
    if (this.isForOne()) {
        if (this._targetIndex < 0) {
            return [unit.randomTarget_state(chkState)];
        } else {
            return [unit.smoothTarget_state(this._targetIndex,chkState)];
        }
    } else {
        return unit.aliveMembers();
    }
};

Game_Action.prototype.targetsForDeadAndAlive = function(unit,chkState) {
    if (this.isForOne()) {
        return [unit.members()[this._targetIndex]];
    } else {
        return unit.members();
    }
};


Game_Unit.prototype.aliveMembers_state = function(chkState=0) {
	var retMembers = this.members().filter(member => member.isAlive());
	if(chkState == 0){return retMembers;}
	else{return retMembers.filter(member => member.isStateAffected(chkState));}
};

Game_Unit.prototype.deadMembers_state = function(chkState=0) {
    var retMembers = this.members().filter(member => member.isDead());
	if(chkState == 0){return retMembers;}
	else{return retMembers.filter(member => member.isStateAffected(chkState));}
};

Game_Unit.prototype.tgrSum_state = function(chkState) {
    return this.aliveMembers_state(chkState).reduce((r, member) => r + member.tgr, 0);
};

Game_Unit.prototype.randomTarget_state = function(chkState=0) {
    let tgrRand = Math.random() * this.tgrSum(chkState);
    let target = null;
    for (const member of this.aliveMembers_state(chkState)) {
        tgrRand -= member.tgr;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    }
    return target;
};

Game_Unit.prototype.randomDeadTarget_state = function(chkState=0) {
    const members = this.aliveMembers_state(chkState);
    return members.length ? members[Math.randomInt(members.length)] : null;
};


Game_Battler.prototype.regenerateHp = function() {
    const minRecover = -this.maxSlipDamage();
	var regenTotal = this.mhp * this.hrg;
	if(regenTotal<0)
	{
		const dotResist = this.stateRate(27);
		regenTotal = regenTotal*dotResist;
	}
    const value = Math.max(Math.floor(regenTotal), minRecover);
    if (value !== 0) {
        this.gainHp(value);
    }
};


Game_Actor.prototype.turnEndOnMap = function() {
    if ($gameParty.steps() % this.stepsForTurn() === 0) {
        this.onTurnEnd();
        if (this.result().hpDamage > 0) {
			
			var followers = [];
			
			if(this._actorId == $gameParty.leader()._actorId){followers.push($gamePlayer);}
			else
			{
				var totFollowers = $gamePlayer._followers.visibleFollowers();
				for(var _i= 0; _i<totFollowers.length; _i++)
				{
					if(this._actorId == totFollowers[_i].actor()._actorId){followers.push(totFollowers[_i]);}
				}
			}
			if(followers.length>0)
			{
				$gameTemp.requestAnimation(followers,190,false);
			}
			//this.performMapDamage();
        }
    }
};


function shuffleArray(unshuffled = [1, 2, 3]){
let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
   
console.log(shuffled)
return shuffled;
}

Game_Character.prototype.moveTowardCoord = function(cX,cY) {
    const sx = this.deltaXFrom(cX);
    const sy = this.deltaYFrom(cY);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
};

function ammoSetup()
{
	///AMMO SETUP
	var ammoArr = gVr(301);
	if(Array.isArray(ammoArr)==false)
	{
		var ammoLoaded = [];
		var lookingForWpnIndex = 0;
		for(var i = 0; i<=100; i++)
		{
			var eqIndex = 112+i;
			var eqData = $dataArmors[eqIndex];
			var wpnInd = eqData.meta.wpnIndex;
			if(wpnInd)
			{
				if(wpnInd>=lookingForWpnIndex)
				{
					ammoLoaded[wpnInd] = eqData.meta.maxAmmo;
					lookingForWpnIndex = parseInt(wpnInd) + 1;
					
				}
			}
		}
		sVr(301,ammoLoaded);
	}
}

function reloadAmmo()
{
	let subject = BattleManager._lastSubject;
	const skillUsed = $dataSkills[BattleManager._lastSkill];
	sSw(1,false); sSw(2,false);
	if (subject.isActor())
	{
		const subject = BattleManager._lastSubject;
		
		if(skillUsed.id == 306)///refuel chainsaw
		{
			$gameParty.gainItem($dataItems[162], -1); ///use up gasoline
			subject.forceChangeEquip(0, $dataWeapons[103]);
		}
		else if(skillUsed.id == 307)///recharge baton
		{
			$gameParty.gainItem($dataItems[319], -1);///use up a battery
			subject.forceChangeEquip(0, $dataWeapons[100]);
		}
		else if(skillUsed.id == 302)///use slingshot
		{
			$gameParty.gainItem($dataItems[203], -1);///use up a marble
		}
		else
		{
			const equip = BattleManager._lastSubject._equips[1];
			if(equip._itemId != 0)
			{
				const eqData = $dataArmors[equip._itemId];
				
				sVr(1,equip._itemId);
				sVr(3,eqData.meta.wpnIndex);
				
				console.log(equip);
				console.log(eqData);
				console.log(skillUsed);
				const ammoMax = undefRep(eqData.meta.maxAmmo);
				if(ammoMax>0)
				{
					const nbItems = $gameParty.numItems($dataItems[skillUsed.meta.WithItemId])
					console.log("Spare Ammo Left: "+nbItems);
					ammoSetup();
					var ammoArr = gVr(301)
					let curAmmo = ammoArr[parseInt(eqData.meta.wpnIndex)];
					let ammoRegain = ammoMax - curAmmo;
					if(ammoRegain>nbItems){ammoRegain = nbItems;}
					console.log("Max ammo: "+ammoMax+", curAmmo:"+curAmmo+", spare ammo: "+nbItems+", ammoRegained: "+ammoRegain);
					curAmmo += ammoRegain;
					$gameParty.gainItem($dataItems[skillUsed.meta.WithItemId], -ammoRegain);
					ammoArr[parseInt(eqData.meta.wpnIndex)] = curAmmo;
					sVr(301,ammoArr);
					console.log("Ammo After: "+curAmmo);
					if(curAmmo >= ammoMax)
					{
						console.log("ammo full, switch to full gun");
						const bbneed = eqData.meta.bigburstNeed;
						const bneed = eqData.meta.burstNeed;  
						let newGunId = parseInt(eqData.meta.emptyOb);
						if(bbneed != undefined){newGunId+=4;}
						else if(bneed != undefined){newGunId+=3;}
						else{newGunId+=2;}
						subject.forceChangeEquip(1, $dataArmors[newGunId]);
					}
					else
					{
						const bbneed = eqData.meta.bigburstNeed;
						const bneed = eqData.meta.burstNeed;
						let newGunId = parseInt(eqData.meta.emptyOb);
						if(bbneed != undefined && curAmmo >= bbneed){newGunId+=3;}
						else if(bneed != undefined && curAmmo >= bneed){newGunId+=2;}
						else{newGunId+=1;}
						subject.forceChangeEquip(1, $dataArmors[newGunId]);
					}
				}
			}
		}
	}
}

Game_Action.prototype.itemEffectRemoveState = function(target, effect) {
    let chance = effect.value1;
    if (Math.random() < chance) {
		var wasApplied = false;
		if(target.isStateAffected(effect.dataId)){wasApplied = true;}
        target.removeState(effect.dataId);
		var healstate = $dataStates[effect.dataId].meta.healState;
		if(wasApplied && healstate)
		{///on heal state, apply state
			console.log("Found healstate for "+$dataStates[effect.dataId].name+", apply - "+ $dataStates[parseInt(healstate)].name);
			target.addState(parseInt(healstate));
		}
        this.makeSuccess(target);
    }
};

Game_Battler.prototype.onAllActionsEnd = function() {
    this.clearResult();
	this.runCustomStateCode();
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
};

function totalRoachSwarmRatio(){
	console.log("Checking Roach Swarm Ratio");
	var ratio = 0.5;
	for (const member of $gameTroop.members()) {
        if ($dataEnemies[member._enemyId]) {
			var ratioAmnt = member.roachSwarmRatio()-0.5;
			console.log("ratio add: "+ratioAmnt);
            ratio += ratioAmnt;
        }
    }
	console.log("Total Roach Swarm Ratio: "+ratio);
	var totRatio = 0;
	if(ratio>1){totRatio +=1; ratio -= 1; ratio = ratio/2;}
	if(ratio>1){totRatio +=1; ratio -= 1; ratio = ratio/2;}
	if(ratio>1){totRatio +=1; ratio -= 1; ratio = ratio/2;}
	if(ratio>1){totRatio +=1; ratio -= 1; ratio = ratio/2;}
	totRatio+=ratio;
	console.log("Diminishing returns applied: "+totRatio);
	return totRatio;
};

Game_BattlerBase.prototype.roachSwarmRatio = function() {
	var ratio = 0.5;
	if(this._states.includes(170)){ratio = 0.75;}
	if(this._states.includes(171)){ratio = 1;}
	if(this._states.includes(172)){ratio = 2;}
    return ratio;
};

Game_Battler.prototype.runCustomStateCode = function()
{
	const dotResist = this.stateRate(27);
	
	///roach swarm
	var dmgAmount = 0;
	if(this.isStateAffected(170))
	{///Heal Roaches by 3% of target HP
		dmgAmount = 1+Math.floor((this.mhp*0.03)*dotResist);
		console.log("swarm 1 damage was "+dmgAmount);
	}
	
	if(this.isStateAffected(171))
	{///Heal Roaches by 6% of target HP
		dmgAmount = 1+Math.floor((this.mhp*0.06)*dotResist);
		console.log("swarm 2 damage was "+dmgAmount);
	}
	
	if(this.isStateAffected(172))
	{///Heal Roaches by 10% of max target HP
		dmgAmount = 1+Math.floor((this.mhp*0.10)*dotResist);
		console.log("swarm 3 damage was "+dmgAmount);
	}
	
	if(dmgAmount>0)
	{
		var totDmg = 0;
		if(dmgAmount>10){totDmg = 10; dmgAmount-=10; dmgAmount = dmgAmount/2;}
		if(dmgAmount>10){totDmg += 10; dmgAmount-=10; dmgAmount = dmgAmount/2;}
		totDmg += dmgAmount;
		console.log("roaches drained "+totDmg + " life");
		totDmg = Math.floor(totDmg);
		$gameActors.actor(10).gainHp(totDmg);
	}
	
	///pain
	if(this.isStateAffected(18))
	{///HP reduced by 10% every turn.
		var dmgAmount = Math.floor((this.hp/10)*dotResist);
		if(dmgAmount>=1){this.gainHp(-dmgAmount);}
	}
	
	////gamma rays
	if(this.isStateAffected(63))
	{///HP halves every turn.
		var dmgAmount = Math.floor((this.hp/2)*dotResist);
		this.gainHp(-dmgAmount);
	}
}

   
Game_Actor.prototype.param = function(paramId) {
    const value =
        this.paramBasePlus(paramId) *
        this.paramRate(paramId) *
        this.paramBuffRate(paramId);
    switch(paramId)
	{
		// param0- Maximum Hit Points
		// param1- Maximum Magic Points
		// param2- ATtacK power
		// param3- DEFense power
		// param4- Magic ATtack power
		// param5- Magic DeFense power
		// param6- AGIlity
		// param7- LUcK
		case 0: break;
	}
	const maxValue = this.paramMax(paramId);
    const minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};



Game_Actor.prototype.xparam = function(xparamId) {
	var paramval = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);
	switch(xparamId)
	{
		// xparam 0- HIT rate
		// xparam 1- EVAsion rate
		case 0:
			break;
		// xparam 2- CRItical rate
		case 2:
			if(this._equips[0] != 0 && this._equips[0]._itemId == 126) // Shadow Blade
			{
				console.log("Shadow Blade - set crit rate from "+paramval+" to-- ");
				paramval = 1;
			}
			break;
		// xparam 3- Critical EVasion rate
		// xparam 4- Magic EVasion rate
		// xparam 5- Magic ReFlection rate
		// xparam 6- CouNTer attack rate
		// xparam 7- Hp ReGeneration rate
		// xparam 8- Mp ReGeneration rate
		// xparam 9- Tp ReGeneration rate
		
	}
    return paramval;
};
///0-weapon, 1- ranged, 2-head, 3-body, 4-feet, 5-accessory, 6-jewelry



///KELP

///KELP

Game_Actor.prototype.sparam = function(sparamId) {
    var paramval =  this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);
	switch(sparamId)
	{
		// sparam 0- TarGet Rate
		// sparam 1- GuaRD effect rate
		// sparam 2- RECovery effect rate
		// sparam 3- PHArmacology
		// sparam 4- Mp Cost Rate
		case 4:
			if(this._equips[6] != 0 && this._equips[6]._itemId == 263) // Shadow Ring
			{
				console.log("Shadow ring sets mp consume rate from "+paramval+" to-- ");
				var ratioMult = 0.8 - 0.1*gVr(46);
				if(this._equips[2] == 259){ratioMult-=0.1;} ///effect of shadow mask
				paramval = 1;
			}
			break;
		// sparam 5- Tp Charge Rate
		// sparam 6- Physical Damage Rate
		// sparam 7- Magic Damage Rate
		// sparam 8- Floor Damage Rate
		// sparam 10- EXperience Rate
		case 0: break;
	}
	return paramval;
};

Game_Actor.prototype.updateStateSteps = function(state) {
    if (state.removeByWalking) {
        if (this._stateSteps[state.id] > 0) {
            if (--this._stateSteps[state.id] === 0) {
				var wasApplied = false;
				if(this.isStateAffected(state.id)){wasApplied = true;}
                this.removeState(state.id);
				const timeoutSt = $dataStates[state.id].meta.timeoutState;
				if(wasApplied && timeoutSt)
				{///on state timeout, chain timeout state
					console.log("Found timeout state, apply - "+ $dataStates[parseInt(timeoutSt)].name);
					this.addState(parseInt(timeoutSt));
				}
			
            }
        }
    }
};


Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    return (
        this.meetsUsableItemConditions(skill) &&
        this.isSkillWtypeOk(skill) &&
        this.canPaySkillCost(skill) &&
		this.hasReqItem(skill) &&
		!this.hasDeniedStatus(skill) &&
		this.hasReqStatus(skill) &&
        !this.isSkillSealed(skill.id) &&
        !this.isSkillTypeSealed(skill.stypeId)
    );
};

Game_BattlerBase.prototype.hasReqItem = function(skill) {
	const itemId = Number(skill.meta["ReqItem"]);
	if(itemId != undefined && !Number.isNaN(itemId) && $dataItems[itemId])
	{
		return $gameParty.hasItem($dataItems[itemId], true);
	}
	else{return true;}
}

BattleManager.invokeAction = function(subject, target) {
    this._logWindow.push("pushBaseLine");
    if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
		if (Math.random() < this._action.itemCnt(target))
		{this.invokeCounterAttack(subject, target);}
    }
    subject.setLastTarget(target);
    this._logWindow.push("popBaseLine");
};


Game_BattlerBase.prototype.hasDeniedStatus = function(skill) { 
	var skillId = 0;
	var skillOb = skill;
	if(Number.isInteger(skill)){skillId = skill; skillOb = $dataSkills[skill];}else{skillId = skill._itemId; skillOb = skill;}
    const stateId = Number(skillOb.meta["DeniedStateId"]);
	var deniedSkill = false;
	if(stateId != undefined && !Number.isNaN(stateId) && $dataStates[stateId])
	{
		deniedSkill = false;
		if(this.isStateAffected(stateId)){deniedSkill = true;}
		
		const stateId2 = Number(skillOb.meta["DeniedStateId2"]);
		if(stateId2 != undefined && !Number.isNaN(stateId2) && $dataStates[stateId2])
		{
			if(this.isStateAffected(stateId2)){deniedSkill = true;}
		}
		
		const stateId3 = Number(skillOb.meta["DeniedStateId3"]);
		if(stateId3 != undefined && !Number.isNaN(stateId3) && $dataStates[stateId3])
		{
			if(this.isStateAffected(stateId3)){deniedSkill = true;}
		}
	}
	return deniedSkill;
};

///KELP

Game_BattlerBase.prototype.hasReqStatus = function(skill) { 
	var skillId = 0;
	var skillOb = skill;
	if(Number.isInteger(skill)){skillId = skill; skillOb = $dataSkills[skill];}else{skillId = skill._itemId; skillOb = skill;}
    const stateId = Number(skillOb.meta["ReqStateId"]);
	var allowSkill = true;
	if(stateId != undefined && !Number.isNaN(stateId) && $dataStates[stateId])
	{
		allowSkill = false;
		if(this.isStateAffected(stateId)){allowSkill = true;}
		
		const stateId2 = Number(skillOb.meta["ReqStateIdAlt2"]);
		if(stateId2 != undefined && !Number.isNaN(stateId2) && $dataStates[stateId2])
		{
			if(this.isStateAffected(stateId2)){allowSkill = true;}
		}
		
		const stateId3 = Number(skillOb.meta["ReqStateIdAlt3"]);
		if(stateId3 != undefined && !Number.isNaN(stateId3) && $dataStates[stateId3])
		{
			if(this.isStateAffected(stateId3)){allowSkill = true;}
		}
	}
	return allowSkill;
};


Game_BattlerBase.prototype.skillMpCost = function(skill) {
    return Math.round(skill.mpCost * this.mcr); ///edited to round instead of floor
};

Game_Battler.prototype.removeStatesAuto = function(timing) {
    for (const state of this.states()) {
        if (
            this.isStateExpired(state.id) &&
            state.autoRemovalTiming === timing
        ) {
			var wasApplied = false;
			if(this.isStateAffected(state.id)){wasApplied = true;}
            this.removeState(state.id);
			const timeoutSt = $dataStates[state.id].meta.timeoutState;
			if(wasApplied && timeoutSt)
			{///on state timeout, chain timeout state
				console.log("Found timeout state, apply - "+ $dataStates[parseInt(timeoutSt)].name);
				this.addState(parseInt(timeoutSt));
			}
        }
    }
};

Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId)) {
            this.addNewState(stateId);
			if($dataStates[stateId].meta.removeStateOnApply)
			{///on state apply, remove 
				console.log("Found apply state remove - "+ $dataStates[parseInt($dataStates[stateId].meta.removeStateOnApply)].name);
				this.removeState(parseInt($dataStates[stateId].meta.removeStateOnApply));
			}
            this.refresh();
        }
        this.resetStateCounts(stateId);
        this._result.pushAddedState(stateId);
    }
};


Window_StatusBase.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
	if(actor._actorId == 6)
	{
		var curViewers = gVr(568);
		//if(curViewers>0)
		//{
			const bitmap = new Bitmap(120, 90);
			bitmap.fontFace = $gameSystem.mainFontFace();
			bitmap.fontSize = $gameSystem.mainFontSize();
			//bitmap.textColor = 0xFFFFFF;

			bitmap.drawText(curViewers, 40, 60, 80, 30, "left");
			const pw = ImageManager.faceWidth;
			const ph = ImageManager.faceHeight;
			const sw = Math.min(width, pw);
			const sh = Math.min(height, ph);
			const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
			const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
			const sx = 6;
			const sy = 6;
			this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
			
			this.drawIcon(154,x+2,y+50);
		//}
	}
};
///KELP

// Show Text
Game_Interpreter.prototype.command101 = function(params) {
    if ($gameMessage.isBusy()) {
        return false;
    }
	var faceSet = params[0];
	///face set swap
	if(faceSet == "Portrait_Hellen")
	{
		faceSet = $gameActors.actor(7)._faceName;
	}
    $gameMessage.setFaceImage(faceSet, params[1]);
    $gameMessage.setBackground(params[2]);
    $gameMessage.setPositionType(params[3]);
    $gameMessage.setSpeakerName(params[4]);
    while (this.nextEventCode() === 401) {
        // Text data
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
    }
    switch (this.nextEventCode()) {
        case 102: // Show Choices
            this._index++;
            this.setupChoices(this.currentCommand().parameters);
            break;
        case 103: // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104: // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
    }
    this.setWaitMode("message");
    return true;
};


Window_ActorCommand.prototype.addSkillCommands = function() {
    const skillTypes = this._actor.skillTypes();
	
	if(this._actor.isStateAffected(70))
	{
		for (const stypeId of skillTypes) {
			const name = $dataSystem.skillTypes[stypeId];
			if(stypeId != 2 && stypeId != 3)
			{this.addCommand(name, "skill", true, stypeId);}
		}
	}
	else
	{
		for (const stypeId of skillTypes) {
			const name = $dataSystem.skillTypes[stypeId];
			this.addCommand(name, "skill", true, stypeId);
		}
	}
};


function repairWeapon(weaponIndex)
{
	var repairTo = parseInt(undefRep($dataWeapons[weaponIndex].meta.repairTo,"0"));
	if(repairTo==0){repairTo = weaponIndex-1; console.log("MISSING REPAIRTO FOR "+weaponIndex+", GOING FOR INDEX-1");}
	console.log("Repaired into: "+$dataWeapons[repairTo].name);
	$gameParty.loseItem($dataWeapons[weaponIndex], 1);
	$gameParty.gainItem($dataWeapons[repairTo], 1);
	sVr(8,$dataWeapons[repairTo].name);
}

function spendBullets()
{
	const shotsFired = gVr(196);
	const subject = BattleManager._lastSubject;
	if(subject)
	{
		var lastUsedSkill = gVr(2);
		var confirmShoot = false;
		var itemId = 0;
		var wpnIndex = 0;
		if (subject.isActor())
		{
			const subject = BattleManager._lastSubject;
			const equip = BattleManager._lastSubject._equips[1];
			if(equip._itemId != 0)
			{
				console.log(equip);
				const eqData = $dataArmors[equip._itemId];
				console.log(eqData);

				confirmShoot = true;
				itemId = equip._itemId;
				wpnIndex = eqData.meta.wpnIndex;
			}
		}
		
		if(confirmShoot)
		{
			const subject = BattleManager._lastSubject;
			const equip = BattleManager._lastSubject._equips[1];
			console.log(equip);
			const eqData = $dataArmors[equip._itemId];
			console.log(eqData);
			const skillUsed = $dataSkills[BattleManager._lastSkill];
			console.log(skillUsed);
			
			if(eqData.meta.wpnIndex>=0)
			{
				if(undefRep(skillUsed.meta.ammoUse)>0)
				{
				 ammoSetup();
				 var ammoArr = gVr(301)
				 let curAmmo = ammoArr[parseInt(eqData.meta.wpnIndex)];
				 const ammoUse = undefRep(skillUsed.meta.ammoUse);
				 const usePerShot = undefRep(skillUsed.meta.usePerShot,0);
				 
				 var totalAmmoUsed = shotsFired*usePerShot;
				 if(usePerShot == 0){totalAmmoUsed = ammoUse;}
				 console.log("Max ammo: "+eqData.meta.maxAmmo+", curAmmo:"+curAmmo+", ammoUsage: "+usePerShot+"x Shots ("+shotsFired+") = "+totalAmmoUsed);
				 curAmmo -= totalAmmoUsed;
				 ammoArr[parseInt(eqData.meta.wpnIndex)] = curAmmo;
				 console.log("Ammo After: "+curAmmo);
				 if(curAmmo == 0)
				 {
				  console.log("out of ammo, switch to empty gun");
				  subject.forceChangeEquip(1, $dataArmors[eqData.meta.emptyOb]);
				 }
				 else
				 {
				   const bbneed = eqData.meta.bigburstNeed;
				   const bneed = eqData.meta.burstNeed;
				   let newGunId = parseInt(eqData.meta.emptyOb);
				   if(bbneed != undefined && curAmmo >= bbneed){newGunId+=3;}
				   else if(bneed != undefined && curAmmo >= bneed){newGunId+=2;}
				   else{newGunId+=1;}
				   subject.forceChangeEquip(1, $dataArmors[newGunId]);
				  }
				}
			}
		}
	}
}

function durabilityCheck()
{
	var subject = gVr(148);//BattleManager._lastSubject;
	if(subject == 0){subject = BattleManager._lastSubject;}
	const lastResult = gVr(145);
	var lastSkill = $dataSkills[gVr(146)];
	if(gVr(146)==0){lastSkill = $dataSkills[1];}
	sSw(1,false); sSw(2,false);
	if (subject && subject.isActor && subject.isActor())
	{
		const equip = subject._equips[0];
		if(equip._itemId != 0 && lastResult>=1)
		{
			
			const eqData = $dataWeapons[equip._itemId];
			let fragile = undefRep(eqData.meta.fragile);
			const breakOb = undefRep(eqData.meta.breakOb);
			const breakMsg = eqData.meta.breakMsg;
			const breakSnd = eqData.meta.breakSnd;
			var safeHits = parseInt(undefRep(eqData.meta.safeHits));
			const breakJnk = undefRep(eqData.meta.breakJunk,177);
			const breakJnkAmnt = undefRep(eqData.meta.breakJunkAmnt,0);
			let breakRatio = undefRep(lastSkill.meta.breakRate,1);
			if(lastResult==2){breakRatio = breakRatio*1.5;}
			console.log("|--Melee Durability Check--")
			console.log("| Last Result: "+lastResult+", ");
			console.log(equip);
			//get attack count for item
			var attackCount = 0;
			var atkCntArray = [];
			if(!Array.isArray(gVr(162)))
			{
				for (var i = 1; i <= 141; i++) {
				   atkCntArray.push(0);
				}
				sVr(162,atkCntArray);
			}
			else{atkCntArray = gVr(162);}
			attackCount = atkCntArray[equip._itemId];
			console.log("Number of attacks with "+eqData.name+": "+ attackCount +", - safe hits: "+safeHits);
			var attackCountRatio = 1;
			var breakThreshold = 2;
			if(gSw(13) == true){if(safeHits == 0){safeHits = 1;}else{safeHits = safeHits*2;}}///easy mode has more safe hits
			var hitNumber = attackCount - safeHits;
				
			if(Utils.isOptionValid("btest"))
			{///if in a battle test, default to Normal difficulty switch.
				if(gSw(13) == false && gSw(31) == false && gSw(8) == false){sSw(31,true);}
			}
			
			if(gSw(13) == true)
			{///easy mode: first 5 attacks with a new weapon are less likely to break
				if(hitNumber<0){attackCountRatio /= 10;}
				else if(hitNumber==0){attackCountRatio /= 10;}
				else if(hitNumber==1){attackCountRatio /= 8;}
				else if(hitNumber==2){attackCountRatio /= 6;}
				else if(hitNumber==3){attackCountRatio /= 4;}
				else if(hitNumber==4){attackCountRatio /= 2;}
				else if(hitNumber==5){attackCountRatio /= 1.5;}
				breakThreshold = 4;
			}
			else if(gSw(31) == true)
			{///normal mode: first 3 attacks with a new weapon are less likely to break
				if(hitNumber<0){attackCountRatio /= 10;}
				else if(hitNumber==0){attackCountRatio /= 4;}
				else if(hitNumber==1){attackCountRatio /= 3;}
				else if(hitNumber==2){attackCountRatio /= 2;}
				else if(hitNumber==3){attackCountRatio /= 1.5;}
				breakThreshold = 2;
			}
			else
			{///hard mode: is less forgiving on new weapons, older weapons become fragile
				if(hitNumber<0){attackCountRatio /= 5;}
				else if(hitNumber==0){attackCountRatio /= 2;}
				else if(hitNumber==1){attackCountRatio /= 1.5;}
				if(hitNumber>=20){attackCountRatio /= 0.5;}
				else if(hitNumber>=10){attackCountRatio /= 0.75;}
				breakThreshold = 1;
			}
			attackCount+=1;
			
			if(undefRep(eqData.meta.fragile)>0)
			{
				const roll = Math.randomInt(100)+1;
				const totalBrkChance = fragile*breakRatio*attackCountRatio;
				console.log("Break Roll for "+eqData.name+": "+roll+" < "+fragile*breakRatio*attackCountRatio+"% [fragility:"+fragile+", skill ratio: x"+breakRatio + ", attack count ratio: x"+attackCountRatio+"]");
				if(totalBrkChance>breakThreshold)
				{
					if(roll<=totalBrkChance)
					{
						if(gVr(45)>0){sVr(45,gVr(45)-1); console.log("Break Mulligan Used. Left: "+gVr(45));}///break mulligans
						else
						{
							attackCount = 0;///reset attack count for weapon
							sSw(2,true); ///prime weapon break tutorial in user event
							console.log("Item broke.");
							if(breakOb != 0){subject.forceChangeEquip(0, $dataWeapons[breakOb]);}
							else
							{
								subject.forceChangeEquip(0, null);
							}
							if(breakJnkAmnt>0)
							{
								$gameParty.gainItem($dataItems[breakJnk], breakJnkAmnt);
							}
							breakMessage(eqData,breakJnk,breakJnkAmnt);
						}
					}
				}
				else
				{
					console.log("Break chance "+totalBrkChance+" not above threshold of "+breakThreshold+", skip roll entirely.");
				}
			}
			atkCntArray[equip._itemId] = attackCount;
			sVr(162,atkCntArray);
		}
	}
	sVr(145,0);
}



function breakMessage(objData,breakJnk,breakJnkAmnt)
{
	
	const breakOb = undefRep(objData.meta.breakOb);
	const breakMsg = objData.meta.breakMsg;
	const breakSnd = objData.meta.breakSnd;
		
	if(breakSnd == undefined)
	{
		if(breakOb != 0){AudioManager.playSe({name:"ObjectCreak",volume:90,pitch:100,pan:0});}
		else{AudioManager.playSe({name:"ObjectBreak",volume:90,pitch:100,pan:0});}
	}
	else{AudioManager.playSe({name:breakSnd,volume:90,pitch:100,pan:0});}
	if(breakMsg == undefined)
	{
		var tx = "";
		if(breakOb != 0)
		{
			tx="The "+objData.name+ " was damaged.";
		}
		else
		{
			tx="The "+objData.name+ " broke!";
		}
		if(breakJnkAmnt>0)
		{
			var jnkName = $dataItems[breakJnk].name;
			tx+="\nGot x"+String(breakJnkAmnt)+" \C[06]{"+ jnkName +"}\C[00]";
		}
		quickMsg(tx);
		
	}
	else
	{
		quickMsg(breakMsg);
	}
}

function quickMsg(message) {
    if ($gameMessage.isBusy()) {
        return false;
    }
	$gameMessage.newPage();
    $gameMessage.setFaceImage('', 0);
	$gameMessage.setBackground(0);
	$gameMessage.setPositionType(1);
	$gameMessage.setSpeakerName('');
	$gameMessage.add(message);
    return true;
};

Game_System.prototype.addItemStock = function(mapId,eventId,item,amount)
{
	const stock = [];
	stock.push({ type: 0, id: item, quantity: amount, priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Game_System.prototype.addWeaponStock = function(mapId,eventId,weapon,amount)
{
	const stock = [];
	stock.push({ type: 1, id: weapon, quantity: amount, priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Game_System.prototype.addEquipStock = function(mapId,eventId,equip,amount)
{
	const stock = [];
	stock.push({ type: 2, id: equip, quantity: Number(amount), priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Window_Message.prototype.startMessage = function() {
    const text = $gameMessage.allText();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this._nameBoxWindow.start();
	console.log("Initialized message box")
	sSw(300,true);
};

Window_Message.prototype.terminateMessage = function() {
	this.close();
    this._goldWindow.close();
    $gameMessage.clear();
	sSw(300,false);
};

Game_Event.prototype.updateSelfMovement = function() {
    if (
        !this._locked &&
        this.isNearTheScreen() &&
		!gSw(300)&&
        this.checkStop(this.stopCountThreshold())
    ) {
        switch (this._moveType) {
            case 1:
                this.moveTypeRandom();
                break;
            case 2:
                this.moveTypeTowardPlayer();
                break;
            case 3:
                this.moveTypeCustom();
                break;
        }
    }
};

qCheckProx = function(checkFromEvent,distance){
	const event = $gameMap.event(checkFromEvent);
	if(event.checkPlayerProx(distance,0)){return true;}
	else{return false;}
}

/*
qPrx = function(checkFromEvent,distance,isDetection=true){
	if($dataActors[1].isStateAffected(48)){distance+=2;}
	const event = $gameMap.event(checkFromEvent);
	if(event.checkPlayerProx(distance,0)){return true;}
	else{return false;}
}*/

Game_Event.prototype.qPrx = function(prox = 4,yShift=0,isDetection=true) {
	dstFound = $gameMap.distance($gamePlayer.x,$gamePlayer.y,this.x,this.y+yShift);
	if($gameActors.actor(1).isStateAffected(48)){prox+=2;}
	//console.log("yShift "+yShift+", dst: "+ dstFound);
	return dstFound <= prox;
};



Window.prototype._refreshFrame = function() {
    var w = this._width;
	var h = this._height;
	var m = 24;
	var bitmap = new Bitmap(w, h);

	this._frameSprite.bitmap = bitmap;
	this._frameSprite.setFrame(0, 0, w, h);
	
	//console.log("W: "+w+", H:"+h+", windowskin:"+this._windowskin)
	if (w > 0 && h >0 && this._windowskin)
	{
		var skin = this._windowskin;
		var p = 96;
		var q = 96;

		//Creates easy references for original/new width and height
		var oWid = p-m*2;
		var nWid = w-m*2;
		var oHei = p-m*2;
		var nHei = h-m*2;

		//Divides to find how many complete repeats for horizontal and vertical
		var hRep = Math.floor(nWid / oWid);
		var vRep = Math.floor(nHei / oHei);

		//Finds remainders for the "fraction" remaining
		var hRem = nWid % oWid;
		var vRem = nHei % oHei;

		//Top Side
		for(var i = 0; i < hRep; i++) {
			bitmap.blt(skin, p+m, 0, oWid, m, m + (i*oWid), 0, oWid, m);
		}
		bitmap.blt(skin, p+m, 0, hRem, m, m + (oWid*hRep), 0, hRem, m);
		//Bottom Side
		for(var i = 0; i < hRep; i++) {
			bitmap.blt(skin, p+m, q-m, oWid, m, m + (i*oWid), h-m, oWid, m);
		}
		bitmap.blt(skin, p+m, q-m, hRem, m, m + (oWid*hRep), h-m, hRem, m);
		//Left Side
		for(var i = 0; i < vRep; i++) {
			bitmap.blt(skin, p, m, m, oHei, 0, m + (i*oHei), m, oHei);
		}
		bitmap.blt(skin, p, m, m, vRem, 0, m + (vRep*oHei), m, vRem);
		//Right Side
		for(var i = 0; i < vRep; i++) {
			bitmap.blt(skin, p+q-m, m, m, oHei, w-m, m + (i*oHei), m, oHei);
		}
		bitmap.blt(skin, p+q-m, m, m, vRem, w-m, m + (vRep*oHei), m, vRem);
		
		//Top-Left Corner
		bitmap.blt(skin, p+0, 0+0, m, m, 0, 0, m, m);
		//Top-Right Corner
		bitmap.blt(skin, p+q-m, 0+0, m, m, w-m, 0, m, m);
		//Bottom-Left Corner
		bitmap.blt(skin, p+0, 0+q-m, m, m, 0, h-m, m, m);
		//Bottom-Right Corner
		bitmap.blt(skin, p+q-m, 0+q-m, m, m, w-m, h-m, m, m);
	}
	
};


Window_NameBox.prototype._refreshFrame = function() {
    var w = this._width;
	var h = this._height;
	var m = 24;
	var bitmap = new Bitmap(w, h);

	this._frameSprite.bitmap = bitmap;
	this._frameSprite.setFrame(0, 0, w, h);
	
	for (const child of this._frameSprite.children) {
		child.visible = w > 0 && h > 0;
	}

	const drect = { x: 0, y: 0, width: this._width, height: this._height };
	const srect = { x: 96, y: 0, width: 96, height: 96 };
	for (const child of this._frameSprite.children) {
		child.bitmap = this._windowskin;
	}
	this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
	
};


Scene_Skill.prototype.onItemOk = function() {
    BattleManager._lastSubject = this.user();
	this.actor().setLastMenuSkill(this.item());
    this.determineItem();
};

Scene_Item.prototype.onItemOk = function() {
	BattleManager._lastSubject = this.user();
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

Window_Base.prototype.lineHeight = function() {
    return 34;
};

Window_Base.prototype.itemPadding = function() {
    return 6;
};


BattleManager.initMembers = function() {
    this._phase = "";
    this._inputting = false;
    this._canEscape = false;
    this._canLose = false;
    this._battleTest = false;
    this._eventCallback = null;
    this._preemptive = false;
    this._surprise = false;
    this._currentActor = null;
    this._actionForcedBattler = null;
    this._mapBgm = null;
    this._mapBgs = null;
    this._actionBattlers = [];
    this._subject = null;
    this._action = null;
    this._targets = [];
    this._logWindow = null;
    this._spriteset = null;
    this._escapeRatio = 0;
    this._escaped = false;
    this._rewards = {};
    this._tpbNeedsPartyCommand = true;
	
	this._lastSkill = null;
	this._lastSubject = null;
	this._lastResult = 0;
	this._animProgress = 0;
	this._animSpeed = 0.001;
	this._backgrndAnimArray = [];
	this._backgrndAnimSpd = 0;
	this._backgrndAnimTiming = 0;
	this._backgrndAnimFrame = 0;
	this._goldLetterChance = 0;
	this._ranEndTurnEvent = false;
};

BattleManager.processTurn = function() {
    const subject = this._subject;
	sVr(196,0);
    const action = subject.currentAction();
    if (action) {
        action.prepare();
        if (action.isValid()) {
            this.startAction();
        }
        subject.removeCurrentAction();
    } else {
        this.endAction();
        this._subject = null;
    }
};


function turnStringToIcons()
{
	
}

function animateBattleback(animArray=[],animDelay= 200)
{
	BattleManager._backgrndAnimArray = animArray;
	BattleManager._backgrndAnimSpd = animDelay;
}

BattleManager.invokeNormalAction = function(subject, target) {
	var realTarget = target;
	if(target.isStateAffected(43)==false)
	{
		realTarget = this.applySubstitute(target);
    }
	this._action.apply(realTarget);
    this._logWindow.displayActionResults(subject, realTarget);
};

BattleManager.checkSubstitute = function(target) {
    return (target.isDying()||target.isStateAffected(44)) && !this._action.isCertainHit();
};


BattleManager.processVictory = function(quietBattleEnd = false) {
    $gameParty.removeBattleStates();
    $gameParty.performVictory();
	if(!quietBattleEnd)
	{
		this.playVictoryMe();
		this.replayBgmAndBgs();
    }
	this.makeRewards();
    if(!quietBattleEnd)
	{
		this.displayVictoryMessage();
		this.displayRewards();
    }
	this.gainRewards();
    this.endBattle(0);
};

BattleManager.update = function(timeActive) {
    if(this._backgrndAnimSpd!=0)
	{
		this._backgrndAnimTiming+=1;
		if(this._backgrndAnimTiming>=this._backgrndAnimSpd)
		{
			this._backgrndAnimTiming = 0;
			switchBattleBack1(this._backgrndAnimArray[this._backgrndAnimFrame]);
			this._backgrndAnimFrame+=1;
			if(this._backgrndAnimFrame>=this._backgrndAnimArray.length){this._backgrndAnimFrame = 0;}
		}
	}
	if (!this.isBusy() && !this.updateEvent()) {
        this.updatePhase(timeActive);
    }
    if (this.isTpb()) {
        this.updateTpbInput();
    }
};

BattleManager.updateTurn = function(timeActive) {
    $gameParty.requestMotionRefresh();
    if (this.isTpb() && timeActive) {
        this.updateTpb();
    }
    if (!this._subject) {
        this._subject = this.getNextSubject();
		this._lastSubject = this._subject;
    }
    if (this._subject) {
        this.processTurn();
    } else if (!this.isTpb()) {
        this.endTurn();
    }
};

BattleManager.startBattle = function() {
	this._backgrndAnimSpd = 0;
	this._backgrndAnimArray = [];
    this._phase = "start";
    $gameSystem.onBattleStart();
	
    $gameParty.onBattleStart(this._preemptive);
    $gameTroop.onBattleStart(this._surprise);
    if($gameSwitches.value(11) == false)
	{
		//this.displayStartMessages();
	}
	$gameTemp.reserveCommonEvent(190);
};


Old_GameTroop_Setup=Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
	Old_GameTroop_Setup.call(this,troopId)
	
	for (const member of this.troop().members) 
	{
		const enData = $dataEnemies[member.enemyId];
		if(enData.meta.defaultPose)
		{//has a default pose to revert to.
			var battlername = enData._battlerName;
			if(enData.meta.baseSprite +"_"+ enData.meta.defaultPose != battlername)
			{
				console.log("resetting battler sprite - baseSprite: "+ enData.meta.baseSprite +", defpose: "+ enData.meta.defaultPose +", battlername: "+ battlername);
				member._battlerName= enData.meta.baseSprite +"_"+ enData.meta.defaultPose;
			}
		}else{
			member._battlerName = "";
		}
	}
		
};


BattleManager.startTurn = function() {
    this._phase = "turn";
    $gameTroop.increaseTurn();
	this._ranEndTurnEvent = false;
    $gameParty.requestMotionRefresh();
    if (!this.isTpb()) {
        this.makeActionOrders();
        this._logWindow.startTurn();
        this._inputting = false;
    }
};

BattleManager.updateTurnEnd = function() {
    if (this.isTpb()) {
        this.startTurn();
    } else {
        this.endAllBattlersTurn();
        this._phase = "start";
    }
	if(!this._ranEndTurnEvent)
	{
		this._ranEndTurnEvent = true;
		$gameTemp.reserveCommonEvent(191);
	}
};

Game_Temp.prototype.setLastUsedSkillId = function(skillID) {
    this.setLastActionData(0, skillID);
	BattleManager._lastSkill = skillID;
};

Game_ActionResult.prototype.clear = function() {
    this.used = false;
    this.missed = false;
    this.evaded = false;
    this.physical = false;
    this.drain = false;
    this.critical = false;
    this.success = false;
    this.hpAffected = false;
    this.hpDamage = 0;
    this.mpDamage = 0;
    this.tpDamage = 0;
    this.addedStates = [];
    this.removedStates = [];
    this.addedBuffs = [];
    this.addedDebuffs = [];
    this.removedBuffs = [];
	
	this.longReach = false;
};


function coinSockCalc()
{
	var dmgTotal = 0;
	var totGld = $gameParty.gold();
	while(totGld>0)
	{
		if(totGld>=20){dmgTotal+=20;}
		else{dmgTotal+= Math.floor(totGld); totGld = 0;}
		totGld = totGld/2;
	}
	return dmgTotal;
}

;void (function() {  // private scope
'use strict';
  const alias = Sprite_Damage.prototype.setup;
  Sprite_Damage.prototype.setup = function(target) {
    const result = target.result();
	if (!result.missed && !result.evaded) {
    // then check for additional crit effect trigger
		if (BattleManager._action.calcElementRate(target) < 1) {
			const h = this.fontSize();
			const w = Math.floor(h * 6.0);
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText("RESIST!", 0, 0, w, h, "center");
			sprite.dy = 0;
			sprite.shiftY = -35;
		}
		if (BattleManager._action.calcElementRate(target) > 1) {
			const h = this.fontSize();
			const w = Math.floor(h * 12.0);
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText("WEAKNESS!", 0, 0, w, h, "center");
			sprite.dy = 0;
			sprite.shiftY = -35;
		}
	}
	// do the usual thing
    alias.apply(this, arguments);
  };
})();

Sprite_Damage.prototype.createChildSprite = function(width, height) {
    const sprite = new Sprite();
    sprite.bitmap = this.createBitmap(width, height);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
    sprite.y = -40;
	sprite.shiftY = -10;
    sprite.ry = sprite.y;
    this.addChild(sprite);
    return sprite;
};

Sprite_Damage.prototype.updateChild = function(sprite) {
    sprite.dy += 0.5;
    sprite.ry += sprite.dy;
    if (sprite.ry >= 0) {
        sprite.ry = 0;
        sprite.dy *= -0.6;
    }
    sprite.y = Math.round(sprite.ry + sprite.shiftY);
    sprite.setBlendColor(this._flashColor);
};



Game_Action.prototype.apply = function(target) {
    const result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
	let reachType = 1;
	let acc = this.itemHit(target);
	
	var allowDurCheck = false;
	sVr(196,gVr(196)+1);
	console.log("Attack Number: "+gVr(196));
	/*if(result.used)  ////You do waste bullets here!
	{
		sVr(196,gVr(196)+1);
		console.log("Attack Number: "+gVr(196));
	}
	else{console.log("Attack was not used, do not waste bullet");}*/
	
	const subjectActor = this.subject().isActor();
	if(target.isStateAffected(40) && this.isMelee() && subjectActor)
	{
		result.longReach = true;
		reachType = this.getReach(this.subject());
		if(reachType == 2){acc = acc*0.75; console.log("too far, acc*75%");}
		if(reachType == 1){acc = acc*0.5; console.log("too far, acc*50%");}
		if(reachType == 0){acc = acc*0.25; console.log("too far, acc*25%");}
	}
	
	if(this._item.object().meta.removeFidget!=undefined){sSw(437,true);}
	
	sVr(146,this._item._itemId); ///save last skill
	sVr(147,target); ///save last target
	sVr(148,this.subject()); ///save last user
	
	if(subjectActor && this._item._dataClass == "skill")
	{
		const useItemId = $dataSkills[this._item._itemId].meta.UseItemId;
		if(useItemId)
		{
			$gameParty.gainItem($dataItems[parseInt(useItemId)],-1);
		}
		
		if(this.usesAmmo())
		{
			sSw(68,true);
		}
		
		if(this.isFragile())
		{
			if(gSw(14)==true){console.log("????? uh oh, durability roll overlap ???????");}
			sSw(14,true);///prime for a durability roll
			sVr(143,this.subject());
			allowDurCheck = true;
			console.log("DURABILITY ROLL PRIMED!");
		}
	}
    var hitroll = Math.random();
	if(result.used)
	{
		if(hitroll<acc){console.log("Hit roll: "+hitroll*100+" < acc("+acc*100+"%) - HIT!");}
		else{console.log("Hit roll: "+hitroll*100+" < acc("+acc*100+"%) - MISSED!");}
	}
	result.missed = result.used && Math.random() >= acc;
	
	let evadeRoll = Math.random();
	let evadeRate = this.itemEva(target);
	if(this.isMagical()){console.log("Magic Evade Roll: "+evadeRoll+", vs mEvade: "+ evadeRate);}
    result.evaded = !result.missed && evadeRoll < evadeRate;
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
	
	var forceFail = false;
	if(this._item.object().meta.CheckEffects)
	{
		if(!this.hasItemAnyValidEffects(target)){forceFail = true;}
	}
	
	if(this._item.object().meta.antifail)
	{
		console.log("Antifail applied");
		this.makeSuccess(target);
	}
	
	if((!forceFail && result.isHit()) || this._item.object().meta.StateOnlyOnHit==undefined)
	{
		if(this._item.object().meta.ApplyState!=undefined)
		{
			this.subject().addState(parseInt(this._item.object().meta.ApplyState))
		}
		if(this._item.object().meta.RemoveState!=undefined)
		{
			this.subject().removeState(parseInt(this._item.object().meta.RemoveState))
		}
	}
	
	if(this._item.object().meta.viewerChange)
	{
		var viewer = gVr(568);
		viewer += parseInt(this._item.object().meta.viewerChange);
		if(viewer<0){viewer =0;}
		sVr(568,viewer);
		console.log("Viewers: "+viewer);
		$gameTemp.requestBattleRefresh();
	}
	
    if ((!forceFail && result.isHit())) {
		BattleManager._lastResult = 1;
		sVr(145,1);
		if(allowDurCheck){sVr(145,1);}
		
		if(target.isActor())
		{
			if(target.actorId()==1)
			{
				console.log("Target is Main Guy");
				var metaSt = this.item().meta;
				if(metaSt.food){sVr(24,gVr(24)+parseInt(metaSt.food)); sSw(16,true);}
				if(metaSt.morale){sVr(26,gVr(26)+parseInt(metaSt.morale)); sSw(16,true);}
				if(metaSt.vigor){sVr(23,gVr(23)+parseInt(metaSt.vigor)); sSw(16,true);}
				if(metaSt.teeth){sVr(44,gVr(44)+parseInt(metaSt.teeth)); sSw(16,true);}
			}
        }
		
		
        if (this.item().damage.type > 0) {
            result.critical = Math.random() < this.itemCri(target);
			if(this.isRanged())
			{///critical chance for ranged attacks
				var baseCrit = this.item().successRate/20;
				var luckCrit = this.subject().luk;
				var eqCrit = 0;
				var statCrit = 0;
				if(subjectActor && this.subject().hasArmor($dataArmors[296])){eqCrit += 15;}
				var rangedCritRate = baseCrit + luckCrit + eqCrit + statCrit;
				
				if(this.subject().isStateAffected(138)){statCrit=rangedCritRate*2;}
				if(this.subject().isStateAffected(134)){rangedCritRate = 100;}
				
				rangedCritRate += statCrit;
				
				var critroll = Math.random()*100;
				console.log("Ranged crit rate:weapon("+baseCrit+") + luck("+luckCrit+") + gear("+eqCrit+") + status("+statCrit+") = "+rangedCritRate+" vs roll: "+critroll);
				result.critical = critroll< rangedCritRate;
			}
            let value = this.makeDamageValue(target, result.critical);
			if(target.isActor())
			{
				if(target.isStateAffected(107))
				{
					value = Math.floor(value/2);
					$dataActors[9].life -= value;
				}
			}
			
			////Joels Bite logic-
			if(subjectActor && this._item._dataClass == "skill" && this.item().id == 132)
			{
				if(target.isStateAffected(3)){console.log("Target not devourable, is immortal");}
				else
				{
					console.log("JOEL DEVOUR CHECK - damage: "+value+", enemy life: "+target._hp);
					if(value*2>target._hp)
					{
						console.log("Joel devouring!");
						value = value*2;
						let recoverAmnt = 1+Math.floor(target.mhp/10);
						let joelMaxHpDivider = this.subject().mhp/2;
						let boostAmnt = 1+Math.floor(target.mhp/joelMaxHpDivider);
						qkSfx("JoelDevour",90,100,15);
						if(boostAmnt>0){this.subject().addParam(0,boostAmnt);}
						this.subject().gainHp(recoverAmnt);
						BattleManager._logWindow.push("addText", "Joel devoured "+target.name()+"!")
						BattleManager._logWindow.push("wait")
						BattleManager._logWindow.push("clear")
					}
				}
			}
            this.executeDamage(target, value);
        }
        
		for (const effect of this.item().effects) {
            this.applyItemEffect(target, effect);
        }
		if(result.critical){BattleManager._lastResult = 2; if(allowDurCheck){sVr(145,2);}}
        this.applyItemUserEffect(target);
		
		if(subjectActor && this._item._dataClass == "skill" && this.item().id == 412)
		{///cash sock, lose 5% of cash
			var amnt = Math.ceil($gameParty.gold()*0.05);
			$gameParty.loseGold(amnt);
		}
		
    }
	else
	{
		BattleManager._lastResult = 0;
		//sVr(145,0);
	}
    this.updateLastTarget(target);
};


Window_BattleLog.prototype.displayMiss = function(target) {
    let fmt;
	if(target.result().longReach){this.push("addText","Target was too far to hit!");}
    if (target.result().physical) {
        const isActor = target.isActor();
        fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit;
        this.push("performMiss", target);
    } else {
        fmt = TextManager.actionFailure;
    }
    this.push("addText", fmt.format(target.name()));
};

Game_BattlerBase.prototype.isDeathStateAffected = function() {
    return (this.isStateAffected(this.deathStateId()) || this.isStateAffected(165));
};

// prettier-ignore
Window_BattleLog.prototype.showAnimation = function(
    subject, targets, animationId
) {
    if (animationId < 0) {
        this.showAttackAnimation(subject, targets);
    } else
	{
		if(animationId && $dataAnimations[animationId] && $dataAnimations[animationId].name.toLowerCase().includes("[selftarget]"))
		{this.showNormalAnimation([subject], animationId);}
		else{this.showNormalAnimation(targets, animationId);}
    }
};

Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    const item = action.item();
    this.push("performActionStart", subject, action);
    this.push("waitForMovement");
    this.push("performAction", subject, action);
    this.push("showAnimation", subject, targets.clone(), item.animationId);
    this.displayAction(subject, item);
};

Game_Action.prototype.isMelee = function() {
	if(this._item.object().meta.melee==undefined){return false;}
	else{return true;}
};

Game_Action.prototype.isRanged = function() {
	if(this._item.object().meta.ranged==undefined){return false;}
	else{return true;}
};

Game_Action.prototype.isSpray = function() {
	if(this._item.object().meta.spray==undefined){return false;}
	else{return true;}
};

Game_Action.prototype.isFragile = function() {
	if(this._item.object().meta.breakRate==undefined){return false;}
	else
	{
		if(parseInt(this._item.object().meta.breakRate) == 0){return false;}
		else{return true;}
	}
};

Game_Action.prototype.usesAmmo = function() {
	if(this._item.object().meta.ammoUse==undefined){return false;}
	else
	{
		if(parseInt(this._item.object().meta.ammoUse) == 0){return false;}
		else{return true;}
	}
};

Game_Action.prototype.getReach = function(user)
{
	var reach = 1;
	const subject = BattleManager._lastSubject;
	const equip = user._equips[0];
	const eqData = $dataWeapons[equip._itemId];
	if(equip._itemId==0){return 0;}
	else
	{
		if(eqData.meta.reach ==undefined){return 1;}
		else{return parseInt(eqData.meta.reach);}
	}
}

Game_BattlerBase.prototype.equippedGun = function()
{
	if(this.isActor())
	{
	const equips = this.equips();
	return equips[1];
	}
	else{return null;}
};

Sprite_Gauge.prototype.isValid = function() {
    //if (this._battler) {
    //    if (this._statusType === "tp" && !this._battler.isPreserveTp()) {
    //        return $gameParty.inBattle();
    //    } else {
    //        return true;
    //    }
    //}
    return true;
};
//// b.life < a.atk * 4 ? (a.gainHp(b.life) a.gainMp(b.life/2)) : (a.gainHp(1); a.gainMp(1)); b.life < a.atk * 4 ? * (a.atk * 4) : a.atk * 2 - b.def
//// b.life < b.isStateAffected(13) ? 2 * (a.atk * 4) : a.atk * 2 - b.def; b.isStateAffected(13) ? 2 * (a.atk * 4) : a.atk * 2 - b.def

Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler) {
        switch (this._statusType) {
            case "hp":
                return this._battler.hp;
            case "mp":
                return this._battler.mp;
            case "tp":
				const eqGun = this._battler.equippedGun();
				if(eqGun == null)
				{ return 0;}
				else
				{
					var valAmmo = 0;
					var ammoArr = gVr(301);
					if(Array.isArray(ammoArr)==false)
					{
						console.log("Ammo array was not set up yet, set it up now.");
						ammoSetup();
						ammoArr = gVr(301);
					}
					
					if(eqGun.meta.wpnIndex==-1)
					{
						valAmmo = $gameParty.numItems($dataItems[203]);
					}
					else{valAmmo = ammoArr[parseInt(undefRep(eqGun.meta.wpnIndex))];}
					return valAmmo;
				}
                //return this._battler.tp;
            case "time":
                return this._battler.tpbChargeTime();
        }
    }
    return NaN;
};

Game_BattlerBase.prototype.maxTp = function()
{
	const eqGun = this.equippedGun();
	if(eqGun == null){return 0;}
	else
	{
		return parseInt(undefRep(eqGun.meta.maxAmmo));
	}
};

Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId)) {
            this.addNewState(stateId);
            this.refresh();
        }
		this.onAddState(stateId);
        this.resetStateCounts(stateId);
        this._result.pushAddedState(stateId);
    }
};


Game_Battler.prototype.removeState = function(stateId) {
    if (this.isStateAffected(stateId)) {
        if (stateId === this.deathStateId()) {
            this.revive();
        }
		this.onRemoveState(stateId);
        this.eraseState(stateId);
        this.refresh();
        this._result.pushRemovedState(stateId);
    }
};

Game_Battler.prototype.onAddState = function(stateId) {
	console.log("ON ADD FUNC FOR STATE ID "+stateId + ", "+$dataStates[stateId].name);
	switch(stateId)
	{
		case 70:
			this.setFaceImage('Portrait_Recruits', 3);
			$gamePlayer.refresh();
			break;
	}
	
}

Game_Battler.prototype.onRemoveState = function(stateId) {
	console.log("ON REMOVE FUNC FOR STATE ID "+stateId + ", "+$dataStates[stateId].name);
	switch(stateId)
	{
		case 70:
			this.setFaceImage('Portrait_Recruits', 2);
			$gamePlayer.refresh();
			break;
	}
}

function undefRep(val,ifZeroVal = 0)
{
	if (val == undefined){return ifZeroVal;}
	else{return val;}
};

function checkSkill(actor,skill)
{
	return $gameActors.actor(actor).skills().contains($dataSkills[skill]);
};

Game_CharacterBase.prototype.initMembers = function() {
    this._x = 0;
    this._y = 0;
    this._realX = 0;
    this._realY = 0;
    this._moveSpeed = 4;
    this._moveFrequency = 6;
    this._opacity = 255;
    this._blendMode = 0;
    this._direction = 2;
    this._pattern = 1;
    this._priorityType = 1;
    this._tileId = 0;
    this._characterName = "";
    this._characterIndex = 0;
    this._isObjectCharacter = false;
    this._walkAnime = true;
    this._stepAnime = false;
    this._directionFix = false;
    this._through = false;
    this._transparent = false;
    this._bushDepth = 0;
    this._animationId = 0;
    this._balloonId = 0;
    this._animationPlaying = false;
    this._balloonPlaying = false;
    this._animationCount = 0;
    this._stopCount = 0;
    this._jumpCount = 0;
    this._jumpPeak = 0;
    this._movementSuccess = true;
	
	this._xprev = 0;
	this._yprev = 0;
};

Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.round(x);
    this._y = Math.round(y);
    this._realX = x;
    this._realY = y;
	this._xprev = x;
	this._yprev = y;
};

Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
		this._xprev = this._x;
		this._yprev = this._y;
        this.setDirection(d);
        this._x = $gameMap.roundXWithDirection(this._x, d);
        this._y = $gameMap.roundYWithDirection(this._y, d);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
        this.increaseSteps();
    } else {
        this.setDirection(d);
        this.checkEventTriggerTouchFront(d);
    }
};

Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setMovementSuccess(
        this.canPassDiagonally(this._x, this._y, horz, vert)
    );
    if (this.isMovementSucceeded()) {
		this._xprev = this._x;
		this._yprev = this._y;
		
	   this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
    }
    if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
    }
};

Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
        case "C":
            this.processColorChange(this.obtainEscapeParam(textState));
            break;
        case "I":
            this.processDrawIcon(this.obtainEscapeParam(textState), textState);
            break;
		case "J":
            this.processDrawIconNspc(this.obtainEscapeParam(textState), textState);
            break;
        case "PX":
            textState.x = this.obtainEscapeParam(textState);
            break;
        case "PY":
            textState.y = this.obtainEscapeParam(textState);
            break;
        case "FS":
            this.contents.fontSize = this.obtainEscapeParam(textState);
            break;
		case "F":
			this.drawMessageFaceSwitch(this.obtainEscapeParam(textState));
            break;
        case "{":
            this.makeFontBigger();
            break;
        case "}":
            this.makeFontSmaller();
            break;
		case "T":
			this._nbCharToIcon = this.obtainEscapeParam(textState);
			break;
    }
};

Window_Base.prototype.initialize = function(rect) {
    Window.prototype.initialize.call(this);
    this.loadWindowskin();
    this.checkRectObject(rect);
    this.move(rect.x, rect.y, rect.width, rect.height);
    this.updatePadding();
    this.updateBackOpacity();
    this.updateTone();
    this.createContents();
    this._opening = false;
    this._closing = false;
    this._dimmerSprite = null;
	this._nbCharToIcon = 0;
};

Window_Base.prototype.convertEscapeCharacters = function(text) {
    /* eslint no-control-regex: 0 */
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    while (text.match(/\x1bV\[(\d+)\]/gi)) {
        text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
            $gameVariables.value(parseInt(p1))
        );
    }
    text = text.replace(/\x1bX\[(\d+)\]/gi, (_, p1) =>
        repeatStr("\x1bJ[16]",parseInt(p1))
    );
	text = text.replace(/\x1bN\[(\d+)\]/gi, (_, p1) =>
        this.actorName(parseInt(p1))
    );
    text = text.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
        this.partyMemberName(parseInt(p1))
    );
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

repeatStr = function(stringRepeat,repeatTimes)
{
	var str = "";
	for(var i = 0; i<repeatTimes; i++)
	{str += stringRepeat;}
	return str;
}

Window_Base.prototype.processCharacter = function(textState) {
    const c = textState.text[textState.index++];
    if (c.charCodeAt(0) < 0x20) {
        this.flushTextState(textState);
        this.processControlCharacter(textState, c);
    } else {
		var processChar = true;
		if(BattleManager._goldLetterChance>0 && c.charCodeAt(0)>=97 && this instanceof Window_Message) 
		{
			if(Math.randomInt(100)<BattleManager._goldLetterChance){this._nbCharToIcon += 1+Math.randomInt(6);}
		}
		if(this._nbCharToIcon>0)
		{
			var smallchar = false;
			var chr = this.obtainEscapeParam(textState);
			var charCode = c.charCodeAt(0);
			if(charCode>=65&&charCode<=90){charCode+=100; processChar = false;}
			if(charCode>=97&&charCode<=122){processChar = false; smallchar = true; textState.x -= Math.floor(ImageManager.iconWidth/4);}
			textState.y +=8;
			if(!processChar){this.processDrawIcon(charCode, textState);}
			textState.y -=8;
			this._nbCharToIcon-=1;
			if(smallchar){textState.x -= Math.floor(ImageManager.iconWidth/4);}
		}
		if(processChar){textState.buffer += c;}
    }
};

Window_Base.prototype.processDrawIconNspc = function(iconIndex, textState) {
    if (textState.drawing) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    }
    textState.x += ImageManager.iconWidth;
};

Window_Base.prototype.processDrawCensor = function(iconIndex, textState) {
    
	if (textState.drawing) {
        this.drawIcon(16, textState.x + 2, textState.y + 2);
    }
    textState.x += ImageManager.iconWidth;
};

//// KELP.....

Window_Message.prototype.drawMessageFaceSwitch = function(newIndex) {
	const faceName = $gameMessage.faceName();
    const rtl = $gameMessage.isRTL();
    const width = ImageManager.faceWidth;
    const height = this.innerHeight;
    const x = rtl ? this.innerWidth - width - 4 : 4;
	this.contents.clearRect(0,0,width+1,height+1);
    this.drawFace(faceName, newIndex, x, 0, width, height);
};

/// KELP... KELP. . . . . ..

////KELP!! ! KELP!! ! KELP!!!!
Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    this._xprev = this._x;
	this._yprev = this._y;
		
	if (Math.abs(xPlus) > Math.abs(yPlus)) {
        if (xPlus !== 0) {
            this.setDirection(xPlus < 0 ? 4 : 6);
        }
    } else {
        if (yPlus !== 0) {
            this.setDirection(yPlus < 0 ? 8 : 2);
        }
    }
    this._x += xPlus;
    this._y += yPlus;
    const distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
    this._jumpPeak = 10 + distance - this._moveSpeed;
    this._jumpCount = this._jumpPeak * 2;
    this.resetStopCount();
    this.straighten();
};

//KELP
//
//
//   KELP
//
//            KELP
//
//                         KELP
//
//                                              KELP  
//
//
//                                                        @@@@@@                                                  
//                                                    @@@@****..@@@@@@                                            
//                                                ####****//((%%****((%%    ######(((                            
//                                              @@********((((((((**((((@@   @******((@                          
//                                              @@@@@@@@@@@@@@((%%%%((((@@     @****((@@                          
//                                ********    @@##@@@@((@@@@((((%%%%((##@@     @##**((@@                          
//                                    ..**((****@@((@@((%%((////%%//((%%%%&&##%%%%**((%%((      ((((              
//                    ****                **((**@@((****%%%%%%%%((((**%%%%((((%%****((@@      @@****@@            
//                      ******              **@@....**%%%%**((((((**%%%%((((%%%%**@@@@      @@********@@          
//                        **((@@      @@    **@@..((%%%%**((##((**((%%@@((((##@@@@@@@@@@  @@****((((**@@          
//                        %%////@@  //&&%%((((%%,,((((((//((@@////((&&@@((%%####**//%%//##**((%%((((@@            
//                        @@**((((@@  @@((((((%%((((**((((@@@@((%%((@     %%((((((**%%%%%%%%((@@@@@@              
//                        @@**..**@@    @@((@@**((**%%((@@    ((%%(    O  ((@@@@@@@@**((((****@@/                  
//                          @@....@@..@@((((//@@##**((##   O  ((%%@       ((((@@@@..&&/////////                    
//                          @@##((**%%((//**&&**@@@@((@@     /*((%%\=====//////&&**  ********/                      
//                          @@((%%%%((((((((@@@@  @@((@@\====%((@@@@%%%%((##@@  @@@@@@@@@@/                        
//                         @@((((****((((**((@@@@@@@@@@((%%@@@@\/######\/@@@@@@\/******@@/        YOU WILL BECOME KELP                
//            ..@@@@....  **  //**((((((****((//&\/@((@@\/@@#################/\((**,,&/                          
//        ####**&&((%%%%##**##@@((((//**((((/\################/\###/\###/\%%##//%%%*                            
//      @@((((@@@@@@@@((((((((((((....((((((((/\ ####M#/\ ##/\@@@@@@((((@@@@@@                     @@@@          
//    @@@@@@((((((@@@@@@@@((((....**((((@@@@((%%*/\*@/\##((((@@@@((((@@@@          ((((            @@((((@@@@@@    
//..&&((**,,,,****((((####//****((##%%@@@@((((##******////@@@@%%##((%%@@@@@@((((////      ....@@@@((((////****@@  
//@@**%%&&((((////,,//((%%%%&&&&%%%%##((//%%%%%%..((&&@@%%((((**////##%%%%&&&&..      ####%%%%((////((%%%%((&&**  
//  @@((((@@@@@@((((((****((****((((((**%%%%((%%**@@@@((((((((((((****((%%((@@@@@@@@@@((((((((**%%%%((((((@@@@    
//    @@@@@@((********((******((((****%%@@@@((@@**((((((((%%**@@@@((%%%%((((((%%((((((%%%%%%%%%%%%@@((((......**  
//     &&##################//////##@@@@&&((##@@//((@@((##%%//((@@@@((%%//##((%%//@@@@##@@@@@@@@@@&&**,,//##//&&  
//        ,,@@@@@@%%%%@@@@@@@@%%**((%%((**((%%((%%&&%%%%%%%%%%**((@@&&((//%%&&##//%%%%%%//%%%%%%//((&&&&,,,,,,    
//            @@((((@@@@@@((@@**..((((((**((%%((((((@@((****((%%@@@@@@@@((**@@@@((******((@@@@((((((@@            
//          @@((((@@@@@@((@@@@**((((((**((((**((((((((((((((****%%@@@@@@@@((**((@@@@@@******((@@@@((((@@@@@@      
//          %%##%%@@@@##%%    @@((@@((%%%%((**((@@##**((((((((((%%((&&,,  %%%%////**&&@@%%%%//////((########%%    
//            ,,  @@((@@    %%&&%%%%%%%%((**((&&,,,,&&((**,,,,//((((**##%%    ,,,,&&&&,,    ,,,,@@((##@@##@@      
//                  @@    @@%%%%**%%@@@@**..@@      @@((((((**..**((((**@@                        @@@@  @@        
//                      @@%%****((((@@((..((@@        @@((((((**((((((((**@@                                      
//                ,,,,@@%%,,..####%%..,,((##%%        @@**((((//((##//((((**@@             ALL WILL BE KELP                       
//              %%######((..((@@##,,((@@((@@          @@**((((((**@@((((((**@@                                    
//            @@((@@**((((**@@@@@@**@@  @@((@@        @@****((((**@@@@((**((((@@                                  
//        ********@@..((**@@@@@@@@@@    @@((@@        @@((**((@@**@@@@((..((**((@@                                
//              @@((//**((&&((((@@%%    @@((@@      ,,&&((**((&&%%@@@@((,,,,//**&&,,,,..                          
//        &&&&&&##**((****((((**@@      ..@@..      @@**((**((((@@@@..@@((((,,((**////&&                          
//      ******((((**((((((((@@**((@@              ****@@((((((@@((@@@@**((((((..**((((((@@                        
//        @@@@@@@@**((((@@((@@@@**@@                    @@((@@  @@  @@**((**((((******@@                LIKE ME          
//            ..,,##@@&&((@@  ##((##                    @@**@@      ##((%%//**((((&&@@((,,                        
//                  @@**@@..    ..                      ..**..        ..@@((&&&&@@((##@@                          
//                    **                                                @@**@@    @@******     AND MY DAUGHTER KELPELINA                   
//                                                                        @@**      @@             WHOM I LOVE VERY MUCH
//
//                                                            
//
//
//              THE KELP MAN GOT YA!!!! ! ! ! !  !  ! 
//             
//
//


function parallaxPos(newX,newY)
{
	$gameMap._parallaxAddX = newX;
	$gameMap._parallaxAddY = newY;
};

Spriteset_Battle.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
    this._battlebackLocated = false;
};


Spriteset_Battle.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
	
	BattleManager._animProgress += BattleManager._animSpeed; 
	
    this.updateActors();
    this.updateBattleback();
    this.updateAnimations();
};

Sprite_Battler.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._battler = null;
    this._damages = [];
    this._homeX = 0;
    this._homeY = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._targetOffsetX = NaN;
    this._targetOffsetY = NaN;
    this._movementDuration = 0;
    this._selectionEffectCount = 0;
	this._shiftX = 0;
	this._shiftY = 0;
	
	this._sineX = 0;
	this._sineY = 0;
	this._animFrms = 0;
	this._animSpd = 0;
	this._animCurFrm = 0;
};

Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
	battler._sprite = this;
	this._shiftX = parseInt(undefRep(battler.enemy().meta.shiftX));
	this._shiftY = parseInt(undefRep(battler.enemy().meta.shiftY));
	
	this._sineX = parseInt(undefRep(battler.enemy().meta.sineX));
	this._sineY = parseInt(undefRep(battler.enemy().meta.sineY));
	this._sineXSpd = parseInt(undefRep(battler.enemy().meta.sineXSpd,1));
	this._sineYSpd = parseInt(undefRep(battler.enemy().meta.sineYSpd,1));
	
	this._animFrms = parseInt(undefRep(battler.enemy().meta.animFrms,0));
	this._animSpd = parseInt(undefRep(battler.enemy().meta.animSpd,1));
	console.log("startingY "+ battler.screenY());
    this.setHome(battler.screenX(), battler.screenY());
    this._stateIconSprite.setup(battler);
};



Sprite_Battler.prototype.updatePosition = function()
{
	this.x = this._homeX + this._offsetX + this._shiftX;
    this.y = this._homeY + this._offsetY + this._shiftY;
	if(this._sineX>0){this.x += Math.sin(BattleManager._animProgress*this._sineXSpd)*this._sineX;}
	if(this._sineY>0){this.y += Math.sin(BattleManager._animProgress*this._sineYSpd)*this._sineY;}
	
	
	if(this._battler._spriteSwapTo!=null)
	{
		this._battler._spriteSwapSequence+=1;
		var modResult = this._battler._spriteSwapSequence % this._battler._spriteSwapInterval;
		if(this._battler._spriteSwapSequence>=this._battler._spriteSwapTime)
		{
			
			this.poseSwap("_"+this._battler._spriteSwapTo);
			this._battler._spriteSwapFrom=null;
			this._battler._spriteSwapSequence = 0;
			this._battler._spriteSwapTo=null;
		}
		else if(this._battler._spriteSwapSequence % this._battler._spriteSwapInterval == 0)
		{
			
			const _enemy = this._battler.enemy();
			if(this._battlerName == this._battler._spriteSwapFrom)
			{this.poseSwap("_"+this._battler._spriteSwapTo); console.log("Swapping to "+this._battler._spriteSwapTo);}
			else{this.spriteSwap(this._battler._spriteSwapFrom); console.log("Swapping back to "+this._battler._spriteSwapFrom);}//_enemy.battlerName = this._battler._spriteSwapFrom;}
		}
	}
	
	if(this._animFrms!=0)
	{
		var frameTot = Math.floor((BattleManager._animProgress*600) / this._animSpd);
		var cfrm = frameTot % this._animFrms;
		if(cfrm != this._animCurFrm)
		{
			this.poseSwap("_frm"+cfrm);
			this._animCurFrm = cfrm;
		}
	}
	
	spinTheBoss();
};


//// KELP

Sprite_Battler.prototype.poseSwap = function(_swapTo = ""){
	const _enemy = this._battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined)
	{
		if(monsterImageExists(_swapTo))
		{this._battler._battlerName = _swapTo;}
		else{console.log("Couldnt find "+_swapTo+" image for monster "+baseName);}
	}
	else
	{
		if(monsterImageExists(baseName+_swapTo))
		{this._battler._battlerName = baseName+_swapTo;}
		else{console.log("Couldnt find "+baseName+_swapTo+" image for monster "+baseName);}
	}
}	

Sprite_Battler.prototype.spriteSwap = function(_swapTo = ""){
	this._battler._battlerName = _swapTo;
}

function getCurSprite(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	return _battler.battlerName();
}

old_battler_name=Game_Enemy.prototype.battlerName 
Game_Enemy.prototype.battlerName = function() {
	if (this._battlerName)
	{
		return this._battlerName;
	}
    return old_battler_name.call(this)
};



Sprite_Battler.prototype.damageOffsetX = function() {
    return 0-this._shiftX;
};

Game_Enemy.prototype.initMembers = function() {
    Game_Battler.prototype.initMembers.call(this);
    this._enemyId = 0;
    this._letter = "";
    this._plural = false;
    this._screenX = 0;
    this._screenY = 0;
	this._sprite = 0;
	this._spriteSwapTo = null;
	this._spriteSwapFrom = null;
	this._spriteSwapSequence = 0;
	this._spriteSwapTime = 18;
	this._spriteSwapInterval = 3;
};

Sprite_Battler.prototype.damageOffsetY = function() {
    return 0-this._shiftY;
};

function getCurSprite(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	return _battler.enemy()._battlerName;
}

function monster_AnimateChangeSpr(battlerId = 0,newPose,swapTime=64,swapFlashInterval=8)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	var curBatlr = _battler._battlerName;
	if(curBatlr === undefined){curBatlr = _enemy.battlerName;}
	console.log("Current Pose: "+ curBatlr +", new pose: "+newPose);
	_battler._spriteSwapTo = newPose;
	_battler._spriteSwapFrom = curBatlr;
	_battler._spriteSwapTime = swapTime;
	_battler._spriteSwapInterval = swapFlashInterval;
};

function monster_Transform(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	console.log("before it, last fighter: id-"+battlerId+", "+_battler)
	if(_battler != undefined)
	{
		const _enemy = _battler.enemy();
		if(_enemy.meta.transformOb)
		{
			_battler.transform(_enemy.meta.transformOb);
			$gameTroop.makeUniqueNames();
		}
	}
};

Game_Enemy.prototype.transform = function(enemyId) {
    const name = this.originalName();
    this._enemyId = enemyId;
    if (this.originalName() !== name) {
        this._letter = "";
        this._plural = false;
    }
    this.refresh();
    if (this.numActions() > 0) {
        this.makeActions();
    }
	
	const _enemy = this.enemy();
	if(_enemy.meta.defaultPose)
	{//has a default pose to revert to.
		var battlername = this._battlerName;
		if(_enemy.meta.baseSprite +"_"+ _enemy.meta.defaultPose != battlername)
		{
			console.log("resetting battler sprite - baseSprite: "+ _enemy.meta.baseSprite +", defpose: "+ _enemy.meta.defaultPose +", battlername: "+ battlername);
			this._battlerName= _enemy.meta.baseSprite +"_"+ _enemy.meta.defaultPose;
		}
	}else{this._battlerName = "";}

};


function monster_MoveClose(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	if(_enemy.meta.moveCloseOb)
	{
		_battler.transform(_enemy.meta.moveCloseOb);
		$gameTroop.makeUniqueNames();
	}
	else
	{
		let baseName = _enemy.meta.baseSprite;
		if(baseName == undefined){baseName = "MissingBasename";}
		else
		{
			if(monsterImageExists(baseName+"_Close"))
			{_battler._battlerName = baseName+"_Close";}
			else{console.log("Couldnt find Close pose for monster "+baseName);}
		}
	}
	_battler.removeState(40);
	_battler.clearResult();
};

function monster_MoveFar(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	if(_enemy.meta.moveFarOb)
	{
		_battler.transform(_enemy.meta.moveFarOb);
		$gameTroop.makeUniqueNames();
	}
	else
	{
		let baseName = _enemy.meta.baseSprite;
		if(baseName == undefined){baseName = "MissingBasename";}
		else
		{
			if(monsterImageExists(baseName+"_Far"))
			{_battler._battlerName = baseName+"_Far";}
			else{console.log("Couldnt find Far pose for monster "+baseName);}
		}
	}
	_battler.addState(40);
	_battler.clearResult();
};

function monsterImageExists(filename)
{
    var fs = require ("fs");
	var foundit = fs.existsSync("./img/enemies/" + filename+".png");
	if(foundit == false){console.log("missing file: "+"./img/" + filename+".png");}
    return foundit;
}

function monster_AltPose(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		if(monsterImageExists(baseName+"_Alt"))
		{_battler._battlerName = baseName+"_Alt";}
		else{console.log("Couldnt find Alt pose for monster "+baseName);}
	}
	_battler.addState(41);
	_battler.clearResult();
};

function monster_NormPose(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		if(monsterImageExists(baseName+"_Close"))
		{_battler._battlerName = baseName+"_Close";}
		else{console.log("Couldnt find Close pose for monster "+baseName);}
	}
	_battler.removeState(41);
	_battler.clearResult();
};



oldUpdateSelectionEffect=Sprite_Battler.prototype.updateSelectionEffect
Sprite_Battler.prototype.updateSelectionEffect = function() {
//creepy guys all have a ? in their name so let's just cheat with that
    if (this._battler.enemy().meta.darkSelectFlash)
    {
		const target = this.mainSprite();
		if (this._battler.isSelected()) {
			this._selectionEffectCount++;
			if (this._selectionEffectCount % 30 < 15) {
				target.setBlendColor([0, 0, 0, 80]);
			} else {
				target.setBlendColor([0, 0, 0, 0]);
			}
		} else if (this._selectionEffectCount > 0) {
			this._selectionEffectCount = 0;
			target.setBlendColor([0, 0, 0, 0]);
		}
        return;
	} 
    else
	{
		const target = this.mainSprite();
		if (this._battler.isSelected()) {
			this._selectionEffectCount++;
			if (this._selectionEffectCount % 30 < 15) {
				target.setBlendColor([0, 0, 0, 80]);
			} else {
				target.setBlendColor([255, 255, 255, 15]);
			}
		} else if (this._selectionEffectCount > 0) {
			this._selectionEffectCount = 0;
			target.setBlendColor([0, 0, 0, 0]);
		}
	}
    //return oldUpdateSelectionEffect.call(this)

};


function monster_disappear(battlerId)
{
	var target = $gameTroop.members()[battlerId-1];
	target.hide();
}

function monster_ChangeSpr(battlerId = 0,poseName)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		_battler._battlerName = baseName+"_"+poseName;
	}
};


function monster_Move(battlerId,moveX,moveY,time)
{
	const _battler = $gameTroop.members()[battlerId];
	if(_battler._sprite!=0)
	{
		_battler._sprite.startMove(moveX,moveY,time);
	}
	/*BattleManager._spriteset._enemySprites[battlerId]._shiftX += moveX;
	BattleManager._spriteset._enemySprites[battlerId]._shiftY += moveY;
	BattleManager._spriteset._enemySprites[battlerId].updateMove();
    BattleManager._spriteset._enemySprites[battlerId].updatePosition();*/
}

function getDiscVal(disc)
{
	switch(disc)
	{
		case 0: return -999;
		case 1: return 13;
		case 2: return 0;
		case 3: return 0;
		case 4: return 1;
		case 5: return 2;
		case 6: return 95;
		case 7: return 146;
		case 8: return 28
		case 9: return 16;
		case 10: return 5;
		case 11: return -1;
		case 12: return -10;
	}
	return -999;
}

function switchBattleBack1(backgrndFile)
{
	//console.log("Switching BG1 to "+backgrndFile);
	SceneManager._scene._spriteset._back1Sprite.bitmap = ImageManager.loadBattleback1(backgrndFile);
	//SceneManager._scene._spriteset._back1Sprite.adjustPosition();
}

function switchBattleBack2(backgrndFile)
{
	//console.log("Switching BG2 to "+backgrndFile);
	SceneManager._scene._spriteset._back2Sprite.bitmap = ImageManager.loadBattleback2(backgrndFile);
	//SceneManager._scene._spriteset._back2Sprite.adjustPosition();
}



Game_Battler.prototype.forceItem = function(itemId, targetIndex) {
    this.clearActions();
    const action = new Game_Action(this, true);
    action.setItem(itemId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    if (action.item()) {
        this._actions.push(action);
    }
};


Game_Action.prototype.updateLastUsed = function() {
    const item = this.item();
	if(this.subject().isActor() && this.subject().actorId() == 1)
	{
		if(item.meta.unrecordable){sVr(618,-1); console.log("Rat Baby: Sams skill was uncopyable");}
		else
		{
			sVr(618,item.id);		
			sVr(619,$gameTemp.lastActionData(4));
			if (DataManager.isSkill(item)) {
			sVr(620,0);
			} else if (DataManager.isItem(item)) {
			sVr(620,1);
			}
		}
	}
	if(this.subject().isStateAffected(38))
	{
		if(item.meta.unrecordable){sVr(220,-1); console.log("Panopticon: Skill was unrecordable");}
		else
		{
			sVr(220,item.id);		
			if (DataManager.isSkill(item)) {
			sVr(221,0);
			} else if (DataManager.isItem(item)) {
			sVr(221,1);
			}
		}
	}
    if (DataManager.isSkill(item)) {
        $gameTemp.setLastUsedSkillId(item.id);
    } else if (DataManager.isItem(item)) {
        $gameTemp.setLastUsedItemId(item.id);
    }
};

Game_Action.prototype.updateLastSubject = function() {
    const subject = this.subject();
    if (subject.isActor()) {
        $gameTemp.setLastSubjectActorId(subject.actorId());
    } else {
        $gameTemp.setLastSubjectEnemyIndex(subject.index() + 1);
    }
};

function lastSkill()
{
	return $gameTemp.lastActionData(0)
};
function lastUser()
{
	return $gameTemp.lastActionData(2)
}

function lastUserObj()
{
	return $gameTroop.members()[$gameTemp.lastActionData(3)-1];
}

function lastEnemyType()
{
	return $gameTroop.members()[$gameTemp.lastActionData(3)-1].enemyId();
}

function lastTarget()
{
	return $gameTemp.lastActionData(4)
}


Game_Event.prototype.checkPlayerProx = function(prox = 4,yShift=0) {
	dstFound = $gameMap.distance($gamePlayer.x,$gamePlayer.y,this.x,this.y+yShift);
	//console.log("yShift "+yShift+", dst: "+ dstFound);
	return dstFound <= prox;
};



Game_Event.prototype.specialCheckProx = function(prox=4, diff=1, type="secret")
{
	if(this.checkPlayerProx(prox))
	{
		switch(type)
		{
			case "secret":
				chanceRoll = 1 + gVr(20)-diff;
				roll = random()*10;
				if(chanceRoll>roll)
				{
					console.log("Secret Roll "+roll+"/10 < searchskill"+chanceRoll+"? SUCCESS!");
					return true;
				}
				else
				{
					console.log("Secret Roll "+roll+"/10 < searchskill"+chanceRoll+"? FAILURE!");
					return false;
				}
				break;
		}
	}
	return false;
};

Game_Event.prototype.sOn= function(switchName = 'A'){
	$gameSelfSwitches.setValue([$gameMap.mapId(),this._eventId, switchName],true);
};

Game_Event.prototype.sOff= function(switchName = 'A'){
	$gameSelfSwitches.setValue([$gameMap.mapId(),this._eventId, switchName],false);
};

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

            //here as a debug to show where states and damage pop up
            //$gameTroop.aliveMembers()[0].addState(12)
            //make the faces line up more with the initial position
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
    //CHECK WITH YOUR SWITCH SO THIS DOESN'T PERSIST PAST SPINPHASE    
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
}

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


Game_Event.prototype.qkSpatialSnd = function(se,rad=20,str=100,mVol=90,pan=20,variants=0) {
	if(variants>1)
	{
		var varInd = 1+Math.randomInt(variants-1);
		se = se+varInd.toString();
	}
	AudioManager.playSpatialSe({name:se,pitch:100,volume:90},{eventId:this._eventId,radius:rad,strength:str,maxVolume:mVol,panType:"Origin Expand",pitchVar:"On",volumeVar:"On",panSt:2,panLd:pan});
};

qkSfx = function(se,_vol=90,_pitch=100,_pitchRand=0,_pan=0,variants=0) {
	if(variants>1)
	{
		var varInd = 1+Math.randomInt(variants-1);
		se = se+varInd.toString();
	}
	if(_pitchRand!=0)
	{
		_pitch -= _pitchRand/2 + Math.randomInt(_pitchRand/2);
	}
	AudioManager.playSe({name:se,pitch:_pitch,volume:_vol,pan:_pan});
};


////=========================================================================================
//hardcoding arm loss

// in the arm loss event, instead of applying a state instead Event Commands / Page 3 / System Settings / Change Actor Images / Change to the proper arm loss.

//I believe sam also faces the wrong direction for which arm he's losing.

// you need to change the bed event as well (arms are currently switched).  

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


youAreAsh = function ()
{
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
        slotName="Gnawed Off"
    }
    if ( ( actor._actorId == 1 ) && ( gVr(187) == 2 ) && index == 1)
    {
        slotName="Gnawed Off"
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
// sprites are all at a 2x scale by default, so instead of doign integer powers do half-int
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
this.addCommand('Integer Scaling', 'intScaling');
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
