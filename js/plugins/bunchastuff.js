
///WARNING THIS CODE IS PROTECTED BY THE KELP MAN
///BEWARE THE KELP MAN


////---UTILITIES---////
///get and set variables/switches
function gSw(switchId) {
 return $gameSwitches.value(switchId);
};
function gVr(varId) {
 return $gameVariables.value(varId);
};

function sSw(switchId,val) {
 return $gameSwitches.setValue(switchId,val);
};

function sVr(varId,val) {
 return $gameVariables.setValue(varId,val);
};

function choose(array=[])
{
	const ind = Math.floor(Math.random() * array.length);
	return array[ind];
};

function shuffleArray(unshuffled = [1, 2, 3]){
let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
   
console.log(shuffled);
return shuffled;
}

function arrPopOr(varInd,ifEmpty=0)
{
	var arr = gVr(varInd);
	if(arr.length==0){return ifEmpty;}
	else
	{
		var retval = arr.pop();
		sVr(varInd,arr);
		return retval;
	}
}

///replace undefined value with 0 or something else
function undefRep(val,ifZeroVal = 0)
{
	if (val == undefined){return ifZeroVal;}
	else{return val;}
};

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

function parallaxPos(newX,newY)
{
	$gameMap._parallaxAddX = newX;
	$gameMap._parallaxAddY = newY;
};


function itemRestock(itemOb,nbItems,restockChance,itemMap,itemEvent)
{
	if($gameSelfSwitches.value([itemMap,itemEvent,'A']))
	{///was bought before
		var moneyNeeded = itemOb.price*nbItems;
		if(gVr(478)>moneyNeeded)
		{
			var fullchance = restockChance + gVr(485)/2;
			if(gVr(498)==0){fullchance=fullchance*2;} ///first restock has double chance
			if(gVr(498)>1){fullchance = Math.floor(fullchance/gVr(498));} ///every subsequent restock reduces chance
			if(gSw(8)){fullchance = fullchance/2;}
			var randRoll = Math.random()*100;
			console.log("restock attempt - "+itemOb.name+",roll:"+randRoll+ "< chance: "+fullchance +", nb Restocks: "+gVr(498));
			if(randRoll < fullchance)
			{
				////buy restock item, uses up quarter of the price and lose that as money
				sVr(478,gVr(478)-Math.floor(moneyNeeded/4));
				sVr(498,gVr(498)+1); //increment number of restocks
				sSw(87,true);
				///restocking
				$gameSelfSwitches.setValue([itemMap,itemEvent,'A'], false);
				console.log("EUGENE RESTOCKING: "+itemOb.name);
			}
		}
	}
}

function readTxStr()
{
	var wordArr = ["KILL","MURDER","MASSACRE","SUFFERING","DEATH","ANCIENT","VIOLENCE","BLOOD","ILLNESS","HECATOMB"];
	var wordInd = gVr(546);
	var charInd = gVr(547);
	var wrdStr = wordArr[wordInd];
	var nextChar = wrdStr.charCodeAt(charInd);
	charInd +=1;
	if(charInd>wrdStr.length){charInd = 0; wordInd = Math.randomInt(wordArr.length);}
	sVr(546,wordInd);
	sVr(547,charInd);
	return nextChar-65;
}

function updateGameLabels()
{
	var gameNames = [];//gVr(248);
	var completeState = 4;
	for(var i = 411; i <=430; i++)
	{
		gameNames[i-411]=$dataItems[i].name;
		if($gameParty.hasItem($dataItems[i], false))
		{
			switch(i)
			{
				case 411: completeState=4; break;
				case 412: completeState=5; break; ///
				case 413: completeState=2; break;
				case 414: completeState=5; break;
				case 415: completeState=4; break;
				case 416: completeState=4; break;
				case 417: completeState=5; break;
				case 418: completeState=4; break;
				case 419: completeState=12; break; ///massacre princess
				case 420: completeState=5; break;
				case 421: completeState=4; break; /// Myrmidon
				case 422: completeState=6; break;
				case 423: completeState=4; break;
				case 424: completeState=5; break; ///frogit about it
				case 425: completeState=4; break;
				case 426: completeState=4; break;
				case 427: completeState=4; break;
				case 428: completeState=4; break;
				case 429: completeState=5; break;
				case 430: completeState=4; break;
			}
			
			if(gVr(i-330)==0){$dataItems[i].name = "\\C[4](NEW) "+$dataItems[i].name;}
			else if(gVr(i-330)>=completeState){$dataItems[i].name = "\\C[11]"+$dataItems[i].name;}
			else if(i==430){$dataItems[i].name = "\\C[10](DEFECTIVE) "+$dataItems[i].name;}
		}
	}
	sVr(248,gameNames);
}

function resetGameLabels()
{
	gameNames = gVr(248);
	for(var i = 411; i <=430; i++)
	{
		$dataItems[i].name = gameNames[i-411];
	}
}

function setupRecipes()
{
	recipeData = [];
	console.log("Setting up recipes, transferring from old save type");
	if(gSw(275)){recipeData[0]=true; console.log("added bandages(medic)");}//bandages(medic)
	if(gSw(262)){recipeData[1]=true; console.log("added bandages (puro)");}//bandages (puro)
	if(gSw(261)){recipeData[2]=true; console.log("added bandages (disf)");}//bandages (disf)
	if(gSw(263)){recipeData[3]=true; console.log("added tonic (vodka)");}//tonic (vodka)
	if(gSw(264)){recipeData[6]=true; console.log("added first aid");}//first aid
	if(gSw(265)){recipeData[8]=true; console.log("added disinf");}//disinf
	if(gSw(267)){recipeData[15]=true; console.log("added acid flask (v)");}//acid flask (v)
	if(gSw(269)){recipeData[16]=true; console.log("added 2xAcid");}//2xAcid	
	if(gSw(266)){recipeData[17]=true; console.log("added /gas bomb (vng)");}//gas bomb (vng)
	if(gSw(271)){recipeData[18]=true; console.log("added 2xGasbomb");}//2xGasbomb
	if(gSw(268)){recipeData[19]=true; console.log("added explo (gas)");}//explo (gas)
	if(gSw(270)){recipeData[20]=true; console.log("added 2x explo (pe)");}//2x explo (pe)
	if(gSw(272)){recipeData[22]=true; console.log("added molotov(whisk)");}//molotov(whisk)
	if(gSw(273)){recipeData[23]=true; console.log("added molotov(vodka)");}//molotov(vodka)
	if(gSw(274)){recipeData[24]=true; console.log("added fire bomb(gas)");}//fire bomb(gas)
	if(gSw(276)){recipeData[25]=true; console.log("added pesticide");}//pesticide
	sVr(441,recipeData);
}

function chkRecipe(recipeInd = 551)
{
	if(recipeInd<551 || recipeInd>600)
	{
		console.log("checked invalid recipe index "+recipeInd);
		return false;
	}
	var recipeData = gVr(441);
	if(Array.isArray(recipeData)==false)
	{
		setupRecipes();
		recipeData = gVr(441);
	}
	return undefRep(recipeData[recipeInd-551],false);
}

function learnRecipe(recipeInd=551)
{
	if(recipeInd<551 || recipeInd>600)
	{
		console.log("learned invalid recipe index "+recipeInd);
		return false;
	}
	var alreadyKnew = chkRecipe(recipeInd);
	if(!alreadyKnew)
	{
		console.log("learned new recipe index "+recipeInd);
		var recipeData = gVr(441);
		recipeData[recipeInd-551] = true;
		sVr(441,recipeData);
		return true;
	}
	else
	{
		console.log("already knew recipe index "+recipeInd);
		return false;
	}
}

function getRecipe(recipeInd=551,ignoreBadRecipe=false)
{
	var itmData = $dataItems[recipeInd];
	sVr(1,parseInt(undefRep(itmData.meta.ing1)));
	sVr(2,parseInt(undefRep(itmData.meta.ing2)));
	sVr(3,parseInt(undefRep(itmData.meta.res)));
	sVr(4,parseInt(undefRep(itmData.meta.amnt)));
}

///Game_Event
Game_Event.prototype.sOn= function(switchName = 'A'){
	$gameSelfSwitches.setValue([$gameMap.mapId(),this._eventId, switchName],true);
};

Game_Event.prototype.sOff= function(switchName = 'A'){
	$gameSelfSwitches.setValue([$gameMap.mapId(),this._eventId, switchName],false);
};

Game_Event.prototype.checkPlayerProx = function(prox = 4,yShift=0) {
	dstFound = $gameMap.distance($gamePlayer.x,$gamePlayer.y,this.x,this.y+yShift);
	//console.log("yShift "+yShift+", dst: "+ dstFound);
	return dstFound <= prox;
};

Game_Event.prototype.specialCheckProx = function(prox=4, diff=1, type="secret"){
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

Game_Event.prototype.qPrx = function(prox = 4,yShift=0,isDetection=true) {
	dstFound = $gameMap.distance($gamePlayer.x,$gamePlayer.y,this.x,this.y+yShift);
	if($gameActors.actor(1).isStateAffected(48)){prox+=2;}
	//console.log("yShift "+yShift+", dst: "+ dstFound);
	return dstFound <= prox;
};

///quick image switch functions
Game_Event.prototype.qImgFrm = function (imageFile,imageSet,dir,step){
	this.setImage(imageFile, imageSet);
	this.qFrm(dir,step);
}

Game_Event.prototype.qFrm = function (dir,step){
	if(dir==0){this.setDirection(2);}
	if(dir==1){this.setDirection(4);}
	if(dir==2){this.setDirection(6);}
	if(dir==3){this.setDirection(8);}
	this._originalPattern = step;
	this.resetPattern();
}

///quick sound effect functions
Game_Event.prototype.qkSpatialSnd = function(se,rad=20,str=100,mVol=90,pan=20,variants=0)
{
	if(variants>1)
	{
	var varInd = 1+Math.randomInt(variants-1);
	se = se+varInd.toString();
	}
	AudioManager.playSpatialSe({name:se,pitch:100,volume:90},{eventId:this._eventId,radius:rad,strength:str,maxVolume:mVol,panType:"Origin Expand",pitchVar:"On",volumeVar:"On",panSt:2,panLd:pan});
}

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


////Prevents F12
document.body.addEventListener('keydown', (e)=>{
    if(e.keyCode == 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

function healAllRatio(hpHealRatio=5,stmHealRatio=5)
{
	var stringReport = "Healing party Members: ";
	var avgHp = 0;
	var avgStm = 0;
	var nbActors = 0;
	$gameParty.members().forEach((actor,ind) => {
		var amntHp = Math.floor(actor._hp*hpHealRatio/100);
		actor.gainHp(amntHp);
		var amntStm = Math.floor(actor._mp*stmHealRatio/100);
		actor.gainMp(amntStm);
		avgHp += amntHp;
		avgStm += amntStm;
		nbActors +=1;
		stringReport+=actor.name()+" : HP+"+amntHp+", STM+"+amntStm+" || ";
	});
	avgHp = avgHp / nbActors;
	avgStm = avgStm / nbActors;
	sVr(177,gVr(177)+Math.floor(avgHp));
	sVr(178,gVr(178)+Math.floor(avgStm));
	console.log(stringReport)
}

//////////Door Knock Encounters----/////
function setupDoorEncounters()
{
	if(Array.isArray(gVr(164))==false)
	{
	//VISITORS-traders
	var arr = [];
	arr = [50,51,52,53,54];
	/*
	if(!gSw(17)){arr = [50,51,52,53,54];}
	else{arr = [50,51,52,53,54,47];}
	*/
	arr = shuffleArray(arr);
	sVr(164,arr);

	//VISITORS-general
	arr = [57,61,49,59,71,48,64,55];
	/*
	if(!gSw(17)){arr = [57,63,61,49,59,71,48];}
	else{arr = [57,63,49,64,65,59,61,66,62,70,71,48,72];}
	*/
	arr = shuffleArray(arr);
	sVr(165,arr);

	//VISITORS-special
	arr = [56,58,68,60,63];
	/*
	if(!gSw(17)){arr = [56,58,68,60];}
	else{arr = [56,58,67,68,60,69];}
	*/
	arr = shuffleArray(arr);
	sVr(166,arr);

	//VISITORS-rare
	arr = []
	arr = shuffleArray(arr);
	sVr(170,arr);

	//visitor type order
	//arr = [0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2,0,1,0,1,2];
	arr = [0,1,0,1,2,3,1,0,1,2,0,1,0,1,2,3,1,0,1,2,0,1,0,1,2,3,1,0,1,2,0,1,0,1,2,3,1,0,1,2,0,1,0,1,2,3,1,0,1,2,0,1,0,1,2,3,1,0,1,2,0,1,0,1,2];

	sVr(167,arr);
	}
	
	if(Array.isArray(gVr(168))==false)
	{
		///list of allowed cursed encounters
		var arr = [49,56,59,61,68,60];
		sVr(168,arr);
	}
}

function grabDoorEncounter()
{
	var traders = gVr(164);
	var general = gVr(165);
	var special = gVr(166);
	var rare = gVr(170);

	var orderType = gVr(167);

	var orderPick = Math.randomInt(2);
	var visitorType = orderType[orderPick];
	orderType.splice(orderPick,1);
	orderType.push(visitorType);
	var pickedVisitor = 0;

	if(visitorType==3 && rare.length==0){visitorType = 0; console.log("Out of rare, check traders");}
	if(visitorType==2 && special.length==0){visitorType = 0; console.log("Out of special, check traders");}
	if(visitorType==0 && traders.length==0){visitorType = 1; console.log("Out of traders, check general");}

	var vtypePick = "";

	if(visitorType==1 && general.length==0)
	{ 
		console.log("Out of general, add nobody here");
		pickedVisitor = 71; sVr(3,1); ///nobody here
	}
	else
	{
		console.log("type available, grab one");
		if(visitorType == 0)
		{
			vtypePick = "trader";
			var maxpck = Math.min(2,traders.length-1);
			orderPick = Math.randomInt(maxpck);
			pickedVisitor = traders[orderPick];
			console.log("maxpick: "+maxpck +", array size: "+traders.length+", pickOrder:"+orderPick+", pickIndex:"+pickedVisitor);
			traders.splice(orderPick,1);
			sVr(164,traders);
			sVr(3,0);
		}
		if(visitorType == 1)
		{
			vtypePick = "general";
			var maxpck = Math.min(2,general.length-1);
			orderPick = Math.randomInt(maxpck);
			pickedVisitor = general[orderPick];
			console.log("maxpick: "+maxpck +", array size: "+general.length+", pickOrder:"+orderPick+", pickIndex:"+pickedVisitor);
			general.splice(orderPick,1);
			sVr(165,general);
			sVr(3,1);
		}
		if(visitorType == 2)
		{
			vtypePick = "special";
			var maxpck = Math.min(2,special.length-1);
			orderPick = Math.randomInt(maxpck);
			pickedVisitor = special[orderPick];
			console.log("maxpick: "+maxpck +", array size: "+special.length+", pickOrder:"+orderPick+", pickIndex:"+pickedVisitor);
			special.splice(orderPick,1);
			sVr(166,special);
			sVr(3,2);
		}

		if(visitorType == 3)
		{
			vtypePick = "rare";
			var maxpck = Math.min(2,rare.length-1);
			orderPick = Math.randomInt(maxpck);
			pickedVisitor = rare[orderPick];
			console.log("maxpick: "+maxpck +", array size: "+rare.length+", pickOrder:"+orderPick+", pickIndex:"+pickedVisitor);
			special.splice(orderPick,1);
			sVr(170,rare);
			sVr(3,3);
		}
	}
	sVr(2,pickedVisitor);
	console.log("finished grab door enc event. Picked: "+pickedVisitor+", type: "+vtypePick);
}

function requeueMissedEnc(encNb=1)
{
	var encTypeLoc = 52;
	var encIndLoc = 54;
	switch(encNb)
	{
		case 1: encTypeLoc = 52; encIndLoc = 54; break;
		case 2: encTypeLoc = 55; encIndLoc = 57; break;
		case 3: encTypeLoc = 58; encIndLoc = 60; break;
		case 4: encTypeLoc = 626; encIndLoc = 625; break;
	}
	const encType = gVr(encTypeLoc);
	var encIndex = gVr(encIndLoc);
	console.log("requeueMissedEnc|| Enctype: "+encType+", encInd: " +encIndex);
	requeueEncounter(encType,encIndex);
}

function requeueEncounter(type,enc)
{
	var typeLoc = 164;
	var typeName = "";
	switch(type)
	{
		case 0: typeLoc = 164; typeName = "traders"; break;
		case 1: typeLoc = 165; typeName = "general"; break;
		case 2: typeLoc = 166; typeName = "special"; break;
		case 3: typeLoc = 170; typeName = "rare"; break;
	}
	var encArray = gVr(typeLoc);
	if(Array.isArray(encArray)==false){encArray = [];}
	if(enc>=200){enc-=200;}
	encArray.push(enc);
	sVr(typeLoc,encArray);
	console.log("requeueEncounter|| Encounter "+enc+" re-queued to "+typeName+" list. ||| New list :"+ encArray);
}

//////////////////////////////////


function checkSkill(actor,skill){
	return $gameActors.actor(actor).skills().contains($dataSkills[skill]);
};

function quickMsg(message,bck=0,pos=1,speaker='') {
    if ($gameMessage.isBusy()) {
        return false;
    }
	$gameMessage.newPage();
    $gameMessage.setFaceImage('', 0);
	$gameMessage.setBackground(bck);
	$gameMessage.setPositionType(pos);
	$gameMessage.setSpeakerName(speaker);
	$gameMessage.add(message);
    return true;
};

repeatStr = function(stringRepeat,repeatTimes)
{
	var str = "";
	for(var i = 0; i<repeatTimes; i++)
	{str += stringRepeat;}
	return str;
}

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


///swap gear
function swapAllWpn(weaponIndFrom,weaponIndTo){
	for(var _i = 0; _i < $gameParty.members().length; _i++)
	{
		swapWpn(_i,weaponIndFrom,weaponIndTo);
	}
}

function swapWpn(member,weaponIndFrom,weaponIndTo){
	if($gameParty.members()[member].hasWeapon($dataWeapons[weaponIndFrom]))
	{
		$gameParty.members()[member].forceChangeEquip(0,$dataWeapons[weaponIndTo]);
		console.log("Force Changed Weapon from "+weaponIndFrom+ " to "+weaponIndTo);
		return true;
	}
	else{return false;}
}

function swapAllArmor(slot,armorIndFrom,armorIndTo){
	for(var _i = 0; _i < $gameParty.members().length; _i++)
	{
		swapArmor(_i,slot,armorIndFrom,armorIndTo);
	}
}

function swapArmor(member,slot,armorIndFrom,armorIndTo){
	if($gameParty.members()[member].hasArmor($dataArmors[armorIndFrom]))
	{
		$gameParty.members()[member].forceChangeEquip(slot,$dataArmors[armorIndTo]);
		console.log("Force Changed Armor from "+armorIndFrom+ " to "+armorIndTo);
		return true;
	}
	else{return false;}
}

///Last Used Skill/etc
function lastSkill(){
	return $gameTemp.lastActionData(0)
}

function lastUser(){
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



////---SAVE GAME---////

DataManager.saveGame = function(savefileId) {
    const contents = this.makeSaveContents();
    const saveName = this.makeSavename(savefileId);
    return StorageManager.saveObject(saveName, contents).then(() => {
        this._globalInfo[savefileId] = this.makeSavefileInfo();
        this.saveGlobalInfo();
		sVr(1117,true);
		console.log(" == GAME SAVED == ");
        return 0;
    });
};


setInterval(function(){ overlayBugFix(); }, 1000);
function overlayBugFix() {
	var canvas = document.getElementById("refresher");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCanAttack(target){
	var enemyOb = $gameTroop.members()[target-1];
	const _enemy = enemyOb.enemy();
	return enemyOb.canAttack();
}

function partyLevelWarn(targLevel){
    const members = $gameParty.members();
    const sum = members.reduce((r, member) => r + member.level, 0);
	console.log("Party Power level: "+ sum +", Target: "+targLevel);
    return (targLevel>sum);
}


////---ACHIEVEMENTS---////
function setAchievement(achName){
	if(CycloneSteam.activateAchievement(achName))
	{
		console.log("Activating achievement: "+achName+", SUCCESS");
	}
	else
	{
		console.log("Activating achievement: "+achName+", FAILURE");
	}
}

function countGames(){
	var nbGames = gVr(41);
	if(nbGames>=4){setAchievement("Collect_Game");}
	setGamestat("games",nbGames);
	if(nbGames>=10){setAchievement("Collect_10Games");}
	if(nbGames>=20){setAchievement("Collect_AllGames");}
}

function countGuns(){
	var nbGuns = gVr();
	if(nbGuns>=1){setAchievement("Collect_Gun");}
	setGamestat("guns",nbGuns);
	if(nbGuns>=6){setAchievement("Collect_6Guns");}
	if(nbGuns>=16){setAchievement("Collect_AllGuns");}
}

function countTreasures(){
	if(gSw(110))
	{
		quickMsg("Items marked with \I[147] are valuables you can sell for some extra cash.");
		sSw(110,true);
	}
}

function getGamestat(statName){
	CycloneSteam.getStatInt(statName);
}

function setGamestat(statName,value){
	curVal = getGamestat(statName);
	if(curVal<value)
	{
		CycloneSteam.setStatInt(statName,value);
	}
}


////---MISC TWEAKS---////


///////////////--SCENES--////////////////

Scene_Battle.prototype.terminate = function() {
    Scene_Message.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();
    if (this.shouldAutosave()) {
		if(gSw(114))
		{
			sSw(114,false);
			console.log("Defeat! Abort autosave!!");
		}
		else
		{
			this.requestAutosave();
		}
    }
};

BattleManager.processDefeat = function() {
    this.displayDefeatMessage();
    this.playDefeatMe();
    if (this._canLose) {
		sSw(114,true);
        this.replayBgmAndBgs();
    } else {
        AudioManager.stopBgm();
    }
    this.endBattle(2);
};

BattleManager.endAllBattlersTurn = function() {
	console.log("Ending All Battlers Turn!");
    for (const battler of this.allBattleMembers()) {
        battler.onTurnEnd();
        this.displayBattlerStatus(battler, false);
    }
	sSw(991,false);
};


Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
	if(!gSw(991))
	{
		this.regenerateAll();
		this.updateStateTurns();
		this.updateBuffTurns();
		this.removeStatesAuto(2);
	}
};

(function() {
    const old_name = Game_Enemy.prototype.originalName;
    Game_Enemy.prototype.originalName = function() {
        var name = old_name.call(this);
        name = Window_Base.prototype.convertEscapeCharacters(name);
        name = name.replace(/\x1b([{}<>.|!$\^]|[A-Z]+)/gi, '');
        return name;
    };
})()

Scene_Base.prototype.executeAutosave = function() {
    $gameSystem.onBeforeSave();
	sVr(147,null);
	sVr(148,null);
    DataManager.saveGame(0)
        .then(() => this.onAutosaveSuccess())
        .catch((error) => this.onAutosaveFailure(error));
};

///Scene_Map
///tone down encounter flash
Scene_Map.prototype.startFlashForEncounter = function(duration) {
    const color = [200, 200, 200, 40];
    $gameScreen.startFlash(color, duration);
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

///Scene_Title
Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(
        new Bitmap(Graphics.width, Graphics.height)
    );
    this.addChild(this._gameTitleSprite);
    if ($dataSystem.optDrawTitle) {
        //this.drawGameTitle();
    }
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.adjustBackground();
    this.playTitleMusic();
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

Scene_Title.prototype.commandQuit = function() {
    this.fadeOutAll()
    SceneManager.exit()
};

///Scene_QuitGame
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


Window_ShopBuy.prototype.price = function(item) {
    if(gVr(941)==0){sVr(941,1);}
	return this._price[this._data.indexOf(item)]*gVr(941) || 0;
};
/*
Scene_Shop.prototype.buyingPrice = function() {
	if(gVr(941)==0){sVr(941,1);}
    return this._buyWindow.price(this._item)*gVr(941);
};
*/

///Scene_Shop
Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this._item.price *gVr(125));
};

///Scene_Skill
Scene_Skill.prototype.onItemOk = function() {
    BattleManager._lastSubject = this.user();
	this.actor().setLastMenuSkill(this.item());
    this.determineItem();
};

///Scene_Item
Scene_Item.prototype.onItemOk = function() {
	BattleManager._lastSubject = this.user();
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

///Scene_Save
Scene_Save.prototype.executeSave = function(savefileId) {
    $gameSystem.setSavefileId(savefileId);
    $gameSystem.onBeforeSave();
	sVr(147,null);
	sVr(148,null);
    DataManager.saveGame(savefileId)
        .then(() => this.onSaveSuccess())
        .catch((error) => this.onSaveFailure(error));
};



///////////////--GAME--////////////////
///Game_Temp
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

Game_Temp.prototype.setLastUsedSkillId = function(skillID) {
    this.setLastActionData(0, skillID);
	BattleManager._lastSkill = skillID;
};


///Game_Actor
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

Game_Actor.prototype.guardSkillId = function() {
const classData = this.currentClass();
    if (classData.meta["GuardSkill"]) {
        const classGuard = Number(classData.meta["GuardSkill"]);
        if (!Number.isNaN(classGuard)) return classGuard;
    }
    return 2;
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

Game_Actor.prototype.calcEquipItemPerformance = function(item) {
	var perf = 0;
	for(var _i=0; _i<item.params.length; _i++)
	{
		var ratio = 1;
		switch(_i)
		{
			case 0: ratio = 0.25; break; // Maximum Hit Points
			case 1: ratio = 0.5; break; // Maximum Stamina
		}
		perf += item.params[_i]*ratio;
	}
	if(item.optimumBonus){perf += parseInt(item.optimumBonus);}
    return perf;
};

///Game_Unit
Game_Unit.prototype.smoothTarget_state = function(index,chkState) {
    const member = this.members()[Math.max(0, index)];
    return member && member.isAlive() ? member : this.aliveMembers_state(chkState)[0];
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

Game_Unit.prototype.onBattleEnd = function() {
    this._inBattle = false;
    for (const member of this.members()) {
        member.onBattleEnd();
    }
};


///Game_Character
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


///Game_System
Game_System.prototype.addItemStock = function(mapId,eventId,item,amount){
	const stock = [];
	stock.push({ type: 0, id: item, quantity: amount, priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Game_System.prototype.addWeaponStock = function(mapId,eventId,weapon,amount){
	const stock = [];
	stock.push({ type: 1, id: weapon, quantity: amount, priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	$gameSystem.addShopStock(mapId, eventId, stock);
}
///358, 359, 360, 361, 362

Game_System.prototype.addEquipStock = function(mapId,eventId,equip,amount){
	const stock = [];
	stock.push({ type: 2, id: equip, quantity: Number(amount), priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	$gameSystem.addShopStock(mapId, eventId, stock);
}


////GAME_ACTION TWEAKS

Game_Action.prototype.isSoftTouch = function() {
	if(this._item.object().meta.softTouch==undefined){return false;}
	else{return true;}
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

Game_Action.prototype.getReach = function(user) {
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

///reduce damage of critical hits
Game_Action.prototype.applyCritical = function(damage) {
    return damage * 1.8;
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
			
			///Marble use
			if(subjectActor && this._item._dataClass == "skill" && this.item().id >= 760 && this.item().id<=783)
			{
				sVr(881,this.item().id);
				console.log("Stored Marble Skill for removal: "+this.item().id);
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
						let boostAmnt = target.mhp/joelMaxHpDivider;
						let flooredBoost = Math.floor(boostAmnt);
						var devourExtra = gVr(402);
						devourExtra += (boostAmnt - flooredBoost)*100;
						if(devourExtra>100){devourExtra-=100; flooredBoost+=1; console.log("Devour Extra Added 1!");}
						console.log("recover amnt : "+recoverAmnt +", max HP divider: "+joelMaxHpDivider+" DevourExtra: "+devourExtra+", boostAmnt: "+boostAmnt);
						qkSfx("JoelDevour",90,100,15);
						if(flooredBoost>0){this.subject().addParam(0,flooredBoost);}
						sVr(402,Math.floor(devourExtra));
						this.subject().gainHp(recoverAmnt);
						BattleManager._logWindow.push("addText", "Джоэл сжирает врага — "+target.name()+"!")
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
		
		
		///Philippe special attacks
		if(this._item._dataClass == "skill" && this.item().id == 655)
		{///putrefaction
			if(target.isStateAffected(25))
			{
				this.applyActionEffect(target,5,10);
				this.applyActionEffect(target,8,10);
				this.applyActionEffect(target,10,10);
				this.applyActionEffect(target,11,10);
				this.applyActionEffect(target,14,10);
				this.applyActionEffect(target,60,10);
				this.applyActionEffect(target,162,10);
			}
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

///applyActionEffect
Game_Action.prototype.applyActionEffect = function(target,effect,chance) {
    if (!this.isCertainHit()) {
        chance *= target.stateRate(effect);
        chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
        target.addState(effect);
        this.makeSuccess(target);
    }
};


Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    target.gainHp(-value);
    if (value > 0) {
        target.onDamage(value,this.isSoftTouch());
    }
    this.gainDrainedHp(value);
};

///Game_BattlerBase
Game_BattlerBase.prototype.maxTp = function(){
	const eqGun = this.equippedGun();
	if(eqGun == null){return 0;}
	else
	{
		return parseInt(undefRep(eqGun.meta.maxAmmo));
	}
};

Game_BattlerBase.prototype.vocabBonus = function() {
    if(this.isActor())
	{
		const actor = $dataActors[this._actorId];
		if(this._actorId==1)
		{
			var wordSkill = 10;
			wordSkill += gVr(99)*2;
			return wordSkill;
		}
		else
		{
			return parseInt(undefRep(actor.meta.vocab));
		}
	}
	else
	{
		return 0;
	}
};

Game_BattlerBase.prototype.revive = function() {
    if (this._hp === 0) {
        this._hp = 1;
    }
	if(this.isActor() && this.actorId() == 1) //tickle
	{
		if(gSw(672)){this.addNewState(164);}
	}
	if(this.isActor() && this.actorId() == 10) //roach schism
	{
		if(gSw(1095)){this.addNewState(227);}
	}
};

Game_BattlerBase.prototype.equippedGun = function(){
	if(this.isActor())
	{
	const equips = this.equips();
	return equips[1];
	}
	else{return null;}
};

Game_BattlerBase.prototype.attackSkillId = function() {
	if(this.isStateAffected(70)) ///grinning beast always claws
	{
		return 64;
	}
	else if(this.isStateAffected(266)) ///grinning beast always claws
	{
		return 64;
	}
	else
	{
		const set = this.traitsSet(Game_BattlerBase.TRAIT_ATTACK_SKILL);
		return set.length > 0 ? Math.max(...set) : 1;
	}
};

Game_BattlerBase.prototype.isDeathStateAffected = function() {
    return (this.isStateAffected(this.deathStateId()) || this.isStateAffected(165) ||  this.isStateAffected(273)
    || this.isStateAffected(197)|| this.isStateAffected(229) || this.isStateAffected(249)
	|| this.isStateAffected(56));
};

Game_BattlerBase.prototype.setHp = function(hp) {
    this._hp = hp;
	if(hp<=0 && this._actorId)
	{///if is an actor, check for the indigo mask
		if(this.hasArmor($dataArmors[67]) && this.isStateAffected(258))
		{
			indigoMaskRevive(this);
		}
	}
    this.refresh();
};

indigoMaskRevive = function(target)
{
	target.setHp(Math.floor(target.mhp/2 + Math.random()*target.mhp/2));
	target.removeState(1);
	target.removeState(258);
	target.addState(263);
}


///check special glitch dead status - only counts as dead for purpose of being Game Over
Game_Unit.prototype.isAllDead_wGlitch = function() {
    return this.aliveMembers_wGlitch().length === 0;
};

Game_Unit.prototype.aliveMembers_wGlitch = function() {
    return this.members().filter(member => member.isAlive_wGlitch());
};

BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead_wGlitch()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            SceneManager.goto(Scene_Gameover);
        }
    } else {
        SceneManager.pop();
    }
    this._phase = "";
};

Game_BattlerBase.prototype.isAlive_wGlitch = function() {
    return this.isAppeared() && !this.isDeathStateAffected() && !this.isStateAffected(298);
};

BattleManager.gainExp = function() {
    const exp = this._rewards.exp;
	if($gameParty.hasItem($dataItems[129], true))
	{
		if(gSw(930) && exp >=50)
		{
			var curXp = gVr(987);
			var xpGain = exp/50;
			
			curXp+=Math.floor(xpGain);
			console.log("marc-andre exp gain: " + xpGain+ " total: "+curXp);
			sVr(987,curXp);
		}
	}
    for (const actor of $gameParty.allMembers()) {
        actor.gainExp(exp);
    }
};


repairMossyHammer = function(){
	var didRevive = false;
	for( var _i=0; _i<$gameParty.members().length; _i++)
	{
		var mbr = $gameParty.members()[_i];
		if(mbr.hasWeapon($dataWeapons[244]))
		{
			mbr.forceChangeEquip(0, $dataWeapons[243]);
			didRevive = true;
		}
	}
	return didRevive;
}

applyIndigoMask = function(){
	var didRevive = false;
	for( var _i=0; _i<$gameParty.members().length; _i++)
	{
		var mbr = $gameParty.members()[_i];
		if(mbr.hasArmor($dataArmors[67]))
		{
			mbr.addState(258);
			didRevive = true;
		}
	}
	return didRevive;
}

calcBleedTotal = function(){
	var totBleed = 0;
	const liveMb = $gameParty.aliveMembers();
	for( var _i=0; _i<liveMb.length; _i++)
	{
		var mbr = $gameParty.members()[_i];
		if(mbr.isStateAffected(1)){totBleed += mbr.mhp*0.25;}
		else if(mbr.isStateAffected(13)){totBleed += mbr.mhp*0.16;}
		else if(mbr.isStateAffected(12)){totBleed += mbr.mhp*0.08;}
		else if(mbr.isStateAffected(11)){totBleed += mbr.mhp*0.04;}
	}
	return Math.floor(totBleed);
}

checkIfAnyOnState = function(stateTarget = 1)
{
	const liveMb = $gameParty.aliveMembers();
	var retval = false;
	if(liveMb.length>0)
	{
		for( var _i=0; _i<liveMb.length; _i++)
		{
			var mbr = $gameParty.members()[_i];
			if(mbr.isStateAffected(stateTarget))
			{
				retval = true;
			}
		}
	}
	return retval;
}

calcLuckTotal = function(){
	var totLuck = 0;
	const liveMb = $gameParty.aliveMembers();
	for( var _i=0; _i<liveMb.length; _i++)
	{
		var mbr = $gameParty.members()[_i];
		totLuck += mbr.lck;
	}
	return totLuck;
}

applyStateBasedOnState = function(stateTarget=10,newState=1,excludePlayer=true){
	const liveMb = $gameParty.aliveMembers();
	var retval = false;
	if(liveMb.length>0)
	{
		for( var _i=0; _i<liveMb.length; _i++)
		{
			var mbr = $gameParty.members()[_i];
			if(mbr.isStateAffected(stateTarget))
			{
				// Remove actor ID 1 from the party
				if(!excludePlayer || mbr._actorId!=1)
				{
					mbr.addState(newState)
				}
			}
		}
	}
	if(retval){$gameTemp.requestBattleRefresh();}
	return retval;
}

removeBasedOnState = function(stateTarget=1,excludePlayer=true){
	const liveMb = $gameParty.aliveMembers();
	var retval = 0;
	if(liveMb.length>0)
	{
		for( var _i=0; _i<$gameParty.members().length; _i++)
		{
			var mbr = $gameParty.members()[_i];
			if(mbr.isStateAffected(stateTarget))
			{
				// Remove actor ID 1 from the party
				if(!excludePlayer || mbr._actorId!=1)
				{
					$gameParty.removeActor(mbr._actorId);
					_i-=1;
					retval+=1;
				}
			}
		}
	}
	if(retval>0){$gameTemp.requestBattleRefresh();}
	return retval;
}

BattleManager.checkBattleEnd = function() {
    if (this._phase) {
        if ($gameParty.isEscaped()) {
            this.processPartyEscape();
            return true;
        } else if ($gameParty.isAllDead_wGlitch()) {
            this.processDefeat();
            return true;
        } else if ($gameTroop.isAllDead()) {
            this.processVictory();
            return true;
        }
    }
    return false;
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
/*
Game_BattlerBase.prototype.hasTargets = function(skill) {
	var targetState = Number(skill.meta["targetState"]);
	if(targetState != undefined && !Number.isNaN(targetState) && $dataStates[targetState])
	{
		
		var targets = skill.aliveMembers_state(targetState);
		
		if(targets.length ===0){return false;}
		else{return true;}
	}
	else{return true;}
}*/

Game_BattlerBase.prototype.hasReqItem = function(skill) {
	const itemId = Number(skill.meta["ReqItem"]);
	if(itemId != undefined && !Number.isNaN(itemId) && $dataItems[itemId])
	{
		return $gameParty.hasItem($dataItems[itemId], true);
	}
	else{return true;}
}

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

Game_BattlerBase.prototype.roachSwarmRatio = function() {
	var ratio = 1;
	if(this._states.includes(170)){ratio = 1.5;}
	if(this._states.includes(171)){ratio = 2;}
	if(this._states.includes(172)){ratio = 2.5;}
    return ratio;
};


///Game_Battler

Game_Battler.prototype.onDamage = function(value,isSoftTouch=false) {
    if(isSoftTouch){console.log("Soft touch attack, no status removal")}
	else{this.removeStatesByDamage();}
    this.chargeTpByDamage(value / this.mhp);
};


Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId)) {
			var preventAdd = false;
			if(stateId==1 && this._actorId)
			{
				if(this.hasArmor($dataArmors[67]) && this.isStateAffected(258))
				{
					indigoMaskRevive(this);
					preventAdd = true;
				}
			}

			if(!preventAdd)
			{
				this.addNewState(stateId);
				if($dataStates[stateId].meta.removeStateOnApply)
				{///on state apply, remove 
					console.log("Found apply state remove - "+ $dataStates[parseInt($dataStates[stateId].meta.removeStateOnApply)].name);
					this.removeState(parseInt($dataStates[stateId].meta.removeStateOnApply));
				}
			}
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
		case 41: ///altpose
			if($dataEnemies[this._enemyId].meta.altFrm)
			{
				this._sprite.poseSwap($dataEnemies[this._enemyId].meta.altFrm);
			}
			break;
		
		case 70:
			this.setFaceImage('Portrait_Recruits', 3);
			this.setName("Зверь");
			$gamePlayer.refresh();
			break;
	
		case 266:
			this.setFaceImage('Portrait_Recruits', 3);
			this.setName("Зверь");
			$gamePlayer.refresh();
			break;
			
		case 175:
			if(this._actorId==29){this.setFaceImage('Portrait_mp3', 0);}
			if(this._actorId==30){this.setFaceImage('Portrait_mp3', 1);}
			if(this._actorId==31){this.setFaceImage('Portrait_mp3', 2);}
			if(this._actorId==32){this.setFaceImage('Portrait_mp3', 3);}
			if(this._actorId==33){this.setFaceImage('Portrait_mp3', 5);}
			if(this._actorId==34){this.setFaceImage('Portrait_mp3', 6);}
			if(this._actorId==35){this.setFaceImage('Portrait_mp3', 7);}
			if(this._actorId==36){this.setFaceImage('Portrait_mp3', 8);}
			if(this._actorId==37){this.setFaceImage('Portrait_mp3', 4);}
			$gamePlayer.refresh();
			break;
	}
	
}

Game_Battler.prototype.onRemoveState = function(stateId) {
	console.log("ON REMOVE FUNC FOR STATE ID "+stateId + ", "+$dataStates[stateId].name);
	switch(stateId)
	{
		case 41: ///altpose
			if($dataEnemies[this._enemyId].meta.normFrm)
			{
				this._sprite.poseSwap($dataEnemies[this._enemyId].meta.normFrm);
			}
			break;
			
		case 70:
			this.setFaceImage('Portrait_Recruits', 2);
			 this.setName("Ли");
			$gamePlayer.refresh();
			break;
			
		case 266:
			this.setFaceImage('Portrait_Recruits', 2);
			 this.setName("Ли");
			$gamePlayer.refresh();
			break;
			
		case 175:
			if(this._actorId==29){this.setFaceImage('Portrait_mp1', 0);}
			if(this._actorId==30){this.setFaceImage('Portrait_mp1', 1);}
			if(this._actorId==31){this.setFaceImage('Portrait_mp1', 2);}
			if(this._actorId==32){this.setFaceImage('Portrait_mp1', 3);}
			if(this._actorId==33){this.setFaceImage('Portrait_mp1', 5);}
			if(this._actorId==34){this.setFaceImage('Portrait_mp1', 6);}
			if(this._actorId==35){this.setFaceImage('Portrait_mp1', 7);}
			if(this._actorId==36){this.setFaceImage('Portrait_mp2', 4);}
			if(this._actorId==37){this.setFaceImage('Portrait_mp1', 4);}
			$gamePlayer.refresh();
			break;
	}
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

/*
Game_Battler.prototype.regenerateHp = function() {
    const minRecover = -this.maxSlipDamage();
	var regenTotal = this.mhp * this.hrg;
	console.log("DOT HAPPENING! Regen total: "+ regenTotal);
	if(regenTotal<0)
	{
		const dotResist = this.stateRate(27);
		console.log("DOT Resist Calc: Ratio"+(regenTotal*dotResist)+" = (DOT)"+regenTotal+" x (dotRes)"+dotResist+ " = (dmg)"+ Math.max(Math.floor(regenTotal), minRecover) );
		regenTotal = regenTotal*dotResist;
	}
    const value = Math.max(Math.floor(regenTotal), minRecover);
    if (value !== 0) {
        this.gainHp(value);
    }
};
*/
Game_Battler.prototype.runCustomStateCode = function(){
	const dotResist = this.stateRate(27);
	
	///roach swarm
	var dmgAmount = 0;
	var allowHealRoach = true;
	if($gameActors.actor(10).isStateAffected(1))
	{
		allowHealRoach = false;
		if(Math.random(10)<=5)
		{
			allowHealRoach = true;
		}
	}
	
	if(allowHealRoach)
	{
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
	}
	
	///pain
	if(this.isStateAffected(18))
	{///HP reduced by 10% every turn.
		var dmgAmount = Math.floor((this.hp/10)*dotResist);
		if(dmgAmount>=1){this.gainHp(-dmgAmount);}
		this.result().customDot=" "

	}
	
	////gamma rays
	if(this.isStateAffected(63))
	{///HP halves every turn.
		var dmgAmount = Math.floor((this.hp/2)*dotResist);
		this.gainHp(-dmgAmount);
		this.result().customDot=" "

	}
}
 
Game_Battler.prototype.onAllActionsEnd = function() {
    this.clearResult();
	this.runCustomStateCode();
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
};


///Game_CharacterBase
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
	if(faceSet == "Portrait_Rat")
	{
		if(params[1]!=0 && params[1]!=4)///except for squeakums and base rat baby port
		{
		faceSet = $gameActors.actor(8)._faceName;
		}
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

///Game_Enemy
old_battler_name=Game_Enemy.prototype.battlerName 
Game_Enemy.prototype.battlerName = function() {
	if (this._battlerName)
	{
		return this._battlerName;
	}
    return old_battler_name.call(this)
};

Object.defineProperty(Game_Enemy.prototype, "level", {
    get: function() {
		if(this._level==0)
		{
			if(this.enemy().meta.level){return parseInt(this.meta.level);}
			else{return 1 + Math.floor(this.exp() / 20);}
		}
        return this._level;
    },
    configurable: true
});

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
	this._level = 0;
	this.animLoopFrames = [];
	this.animLoopDelay = 0;
	
};

function monster_startAnim(battlerId = 0, frms=[],animDelay=60)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	var curBatlr = _battler._battlerName;
	_battler.animLoopFrames = frms;
	_battler.animLoopDelay = animDelay;
}

function monster_stopAnim(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	var curBatlr = _battler._battlerName;
	_battler.animLoopFrames = [];
	_battler._sprite._animFrms = 0;
	_battler.animLoopDelay = 0;
}


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

//-------------


//////////////--WINDOW--//////////////

///Window_Base
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
		case "S":
			this._autoSlow=this.obtainEscapeParam(textState);
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
	this._autoSlow = 0;
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
		this.postProcessCharacter(c);
    }
};

Window_Base.prototype.postProcessCharacter = function(c)
{
	
}

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

Window_Base.prototype.lineHeight = function() {
    return 34;
};

Window_Base.prototype.itemPadding = function() {
    return 6;
};

Window_Base.prototype.makeFontSmaller = function() {
    if (this.contents.fontSize >= 24) {
        this.contents.fontSize -= 12;
    }
	else
	{
		if (this.contents.fontSize >= 8){this.contents.fontSize -= 4;}
	}
};

Window_Base.prototype.makeFontBigger = function() {
    if (this.contents.fontSize <= 96) {
        if (this.contents.fontSize < 24) {this.contents.fontSize += 4;}
		else{this.contents.fontSize += 12;}
    }
};

//// KELP.....

Window_Message.prototype.processNewLine = function(textState) {
    this._lineShowFast = false;
    Window_Base.prototype.processNewLine.call(this, textState);
    if (this.needsNewPage(textState) && !this._pauseSkip) {
        this.startPause();
    }
};

Window_Message.prototype.clearFlags = function() {
    this._showFast = false;
    this._lineShowFast = false;
    this._pauseSkip = false;
	this._autoSlow = 0;
};

Window_Message.prototype.postProcessCharacter = function() {
    if(this._autoSlow>0){this.startWait(this._autoSlow);}
};

Window_Message.prototype.drawMessageFaceSwitch = function(newIndex) {
	const faceName = $gameMessage.faceName();
    const rtl = $gameMessage.isRTL();
    const width = ImageManager.faceWidth;
    const height = this.innerHeight;
    const x = rtl ? this.innerWidth - width - 4 : 4;
	this.contents.clearRect(0,0,width+1,height+1);
    this.drawFace(faceName, newIndex, x, 0, width, height);
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

///slow down message speed
Window_BattleLog.prototype.messageSpeed = function() {
    return 24;
};

Window_BattleLog.prototype.displayMiss = function(target) {
    let fmt;
	if(target.result().longReach){this.push("addText","Цель слишком далеко, по ней не ударить!");}
    if (target.result().physical) {
        const isActor = target.isActor();
        fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit;
        this.push("performMiss", target);
    } else {
        fmt = TextManager.actionFailure;
    }
    this.push("addText", fmt.format(target.name()));
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


Window_ActorCommand.prototype.addAttackCommand = function() {
	if(this._actor.isStateAffected(70)) ///grinning beast always claws
	{
		this.addCommand("Когти","attack", this._actor.canAttack());
	}
	else if(this._actor.isStateAffected(266)) ///grinning beast always claws
	{
		this.addCommand("Когти","attack", this._actor.canAttack());
	}
	else
	{
		this.addCommand(TextManager.attack, "attack", this._actor.canAttack());
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
	else if(this._actor.isStateAffected(175))
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


Window_TitleCommand.prototype.makeCommandList = function() {
    const continueEnabled = this.isContinueEnabled();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(TextManager.continue_, "continue", continueEnabled);
    this.addCommand(TextManager.options, "options");
	this.addCommand("Выйти из игры", "quit");
};

Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand("save") && gSw(37)) {
        const enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, "save", enabled);
    }
};

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
    this.addCommand("Подтвердить", "confirm");
    this.addCommand("Отмена", "cancel");
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


//-------------

///BattleManager
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
	
	ApplyStatusSpecial();
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

ApplyStatusSpecial = function()
{
	for(var _i=0; _i<$gameParty.members().length; _i++)
	{
		var mbr = $gameParty.members()[_i];
		var eq = mbr._equips[3];
		if(eq._itemId == 274)
		{
			mbr.addState(7);
		}
	}
}

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


////----ROOMMATE FEATURES----////
///Dan
function danViewers(){
	var viewers = gVr(568);
	var retval = 0;
	while(viewers>0)
	{
		if(viewers<10){retval += viewers/10; viewers = 0;}
		else{retval+=1; viewers-=10; viewers = viewers/2;}
	}
	
	return retval;
}

function danChat_GenericNames(allowMad=false,allowCreeps=false)
{
	///generic chatter names
	return ["dannyboy","BigLaddy","SonickMc","milesniles","gatadama83","sous4lou","mosk33","bigRobb","rustylass","kyberuX","bam-balam","eXrIeos","VinceQxx","laRaPaLooza","lookyhere","GAVA_gaming","videoGamex","lUWODIK","Garaplanka","GaramOnde","LouisButton","UpsideDOME","KeyBoarz","carl","BigDollarHonky","LastChanceUD","LauraFlaura","39Sackman","Xomplachii","antHeater"];
}

function danChat_GenericMsg(allowMad=false,allowCreeps=false)
{
	var genMsg = [];
	///generic lines by random chatters
	if(!allowMad)///normal scan only dialogue
	{
		genMsg = ["Йо.","Привет","ЙООООООО","развали их","брух.","вау.","Чел чо за хрень?","Йо дэнчик я твой фанат","был на каждом стриме, пишу впервые","яйца","че он делает","Это стрим или запись","Он нам говорит?:",":)","кек","... ...","что тут происходит я новенький","лол это что","хаххахаха","жёстко","ЧОООООО","ты в это время обычно стримишь?","ЛМАО","идеально","НееееЕЕЕеееЕЕет","УУУУУУУууууФ","реально ржака","пог","поггерс","ПООООООГ","рофл","ничо се","йоОООоо","ток что понял что просходит","погодите чо","хз","хз чел","он нас спросил","мне пофигу","он чо сам поискать не может","почему он нас спрашивает","лентяй","сам поищи лол","бомбануло","ёмоё","те крышка лол","не понял"];
	}
	else
	{
		genMsg = ["ывптдзвп","ощйуцртисй","жэ\\дэзмшх=йчю","ВВВВВВВВВВ","я сожрал свою семью))","я убил кучу людей","НЕ МОГУ ПЕРЕСТАТЬ УБИВАТЬ","ПОЖАЛУЙСТА ПОМОГИТЕ","АРОАРАПВЫ ЗА ЭТО РАЗВЕ НЕ БАНЯТ?!!","ТЫ ЗАЧЕМ УЛИЦУ СТРИМИШЬ?","У МЕНЯ РОТ ВО РТУ","ТАК МНОГО ГЛАЗ","Я ОТКЛАДЫВАЮ ЯЙЦА","АЩША(*н89нПА","длораыоиа","ЛОРВльжлд","вкааааааааавввввввс","пываыафвпывпапвап","ваывыа","DEATH","ЖРИ","ПЛОТЬБ","смотри","СМОТРИ","ГЛАЗА","РОТ","УЗРИ","НАБЛЮДАЙ","ГЛЯДИ","СОЗЕРЦАЙ","СЛЕДИ"];
	}
	return genMsg;
}

function danChat_UniqueChatters(allowMad=false,allowCreeps=false)
{
	var uniqueChatters = [];
	////first element is name, second is username color, third is donation message
	////fourth and beyond is all the random things they can say in chat
	uniqueChatters.push(["Sudiya",6,"Я ЗАВЕЩАЮ.","ВИНОВЕН","НЕВИНОВНЫЙ"]);
	uniqueChatters.push(["krovozhor",14,"Донорство крови","кровь.","кровь капает.","капельки крови.","аааа... столько крови.","хочу, чтоб он истёк кровью","я хочу поробовать кровь на вкус","кровь капает","кровь хлещет","кровь льётся","целый чан крови","КРОВЬ."]);
	uniqueChatters.push(["lubitelkostey",7,"Кости вам","плечевая кость","большеберцовая кость","череп","позвоночник","грудная клетка","бедренная кость","грудина","челюсть","крестец","ключица","локтевая кость","лучевая кость"]);
	uniqueChatters.push(["NeSmotryashiy",11,"Мне больше не нужны деньги","я растовряюсь впруддик","я помстрел наруж и тперььь ттаюю(((","космтей нет тяжелро писат"]);	
	uniqueChatters.push(["YoMoyo",9,"случ чайно кнопеку нажл изззза щупальцва","заебись. я вывернулся наизнанку >:(","чел щупальца это отстой","у меня глаза ВО рту и я блять это ненавижу","я чувствую запах своих пальцев, какой же кринж","классс на меня терь одежда не налазит","Я не могу СИДЕТЬ. Моё тело не СИДИТ.","Хотелось бы мне иметь двустороннюю симметрию...","много рук это круто но мои юзлесные","моё новое тело кринж я сука холодный и мокрый"]);
	uniqueChatters.push(["josehpormal",15,"помогу тебе вырасти :)","у мненя много глазок","я непрекращыаю расти","у мненяя кучи пальцвв нап рукках","у меня 68 рук","не могу двигаться я слишкомм большой","у меня двенадцать крыльевв","рот накончике моего хвоста","кожа тянетсся между моими рукакми","у меня из ртов междыу пальцаи льётся гнойй","глаыза брызгаются кровю","кожва покрылас пальцами взде","у меня глаза внутриголовы","я расту немгу остановтся","я в слизи как слизень","я откладваваю яйца???? помгитее","я так вырос, что не вижу конец своего тела","выроссло сотни ногг","отарстил голову на другом кнонце","всио нормуль рбеят спасибо что спрвасили :)"]);
	uniqueChatters.push(["pesik",16,"вкусняшка от пёсика для дэна","гав гав!","я стлав собвкаойЮ,," ,"гаав!","ряф...","ррррр...","Гав! Гав! Гав! ГАААААААВ!","аууууууууу","ТЯФ!"]);
	uniqueChatters.push(["realnyPrizrak",3,"я тебя попугаю :))","бууууу...","бу!","БУУ!","бу. :)"]);
	
	if(!allowMad)///normal scan only dialogue
	{
		///specific lines by unique chatters
		uniqueChatters.push(["lOrdSebastian",9,"Вот твоя жалкая подачка на сегодня.","Неужели этот... простофиля всё ещё играет?","Дэн так неучтив.","Я не заинтересован в ответах на твои вопросы..","Мне НЕ забавно.","Я нахожу его выходки... забавными.","Вынужден откланяться. адью."]);
		uniqueChatters.push(["clarkke",5,"должок возвращаю братух","йо чел как делааааааааа","чел","чо будешь делать позже","бро!!","были друзьями правда ж дэн","прив ты не ответил мне в лс","я тебе письмо на имейл отправил))","ты очень смешной дэн","я одинок","ку дэн","можно с тобой поиграть потом",":("]);
		uniqueChatters.push(["poebat9",8,"я знаю где ты живёшь","иди нахуй дэн :)","кого это ебёт :)","ты ёбаный мудила дэн :)","сдохни пож :)","ешь мои харчки :)","спроси того кому не похуй :)","убейся дэн :)","тя никто не любит дэн :)","ты посмешище ебучее всем на тебя пофиг :)","у тебя нет друзей :)","ты сдохнешь в одиночестве :)","тебя никто не любит :)"]);
		uniqueChatters.push(["g00dBean",9,"Моему любимому стримеру :)","отлично справляешься Дэн!","Ты сможешь! :)","Давай, Дэн, давай!!","Ты очень классный дэн :)","я тебя поддерживаю дэн"]);
		uniqueChatters.push(["zitatnik",13,"Отдавать — значит получать — Джон Леннон","Никогда не бывает поздно. — Альберт Эйнштейн","Я сделан из чаек — Уильям Шекспир","Никогда не видел поезда. — Чер","Верь изо всех сил — и путь уже наполовину пройден. — Бон Джови","Всё невозможно до тех пор, пока оно не поизойдёт. — Уолт Дисней","Будь собой. Другие личности уже заняты. — Ганди","Я разворотил свою челюсть и сожрал кого-то целиком. -JFK","Надежда. -Баррак Обама" ,"Мне 400 000 лет. -Вупи Голдберг","Я такой одинокий хаха. -Дэн"]);
		
		uniqueChatters.push(["joyitcatt",17,"спасиб что посмеялис...","это буквально я","гендерная зависть...","цель перехода тбх","вот бы это был я","повезло..."]);
		uniqueChatters.push(["shitgiT",18,"предур","вот чмошник","ну и урод лол","СОЖГИ ЕГО!","ууууф. не повезло."])
		
		uniqueChatters.push(["datamaster5",11,"денюжка на помощь","максимальное хп 500!","Используй тут Пронзающее Оружие. :)","Этот чел слаб к огню.","Этот чел неуязвим ко всем типам урона, сорри.","этот чел тя убьёт на 4 ходу.","Этот чел даст тебе подарок если ты не будешь атаковать 3 хода :)","Этот чел неуязвим к холоду.","Этот чел может заразить тебя проказой! БЕГИ!","Этот чел слаб к Алхимии","Этот чел неуязвим к джинсовым шортам","ОСТОРОЖНО! У этого чела есть инстакилл атака :)","Используй эликсир против него чтоб получить секретный приз.","КИДАЙ В НЕГО ВСЕ СВОИ ГРАНАТЫ!"]);
		uniqueChatters.push(["glupenkovyi",19,"глупеньковый донат глупеньковому дэну","Какой глупеньковый челик!","ГЛУПЕНЬКОВОЕ СОЗДАНИЕ!","Как глупеньково...","Хо хо хо!! Глупеньково!","ПРЕДУПРЕЖДЕНИЕ: ОБНАРУЖЕНА ГЛУПЕНЬКОВАЯ СУЩНОСТЬ","Уязвимость к ГЛУПЕНЬКОВОМУ типу урона!"]);
		
		if(allowCreeps)
		{
			uniqueChatters.push(["GordoQ",10,"","О_О УХТЫ","ЁМААААА","УХТЫШКА","МАМА МИЯ!!","АВУУУУУУГА!","ПУПУПУ"]);
			uniqueChatters.push(["woof1ryuu",12,"за то, что показал все интересные ракурсы ;)","... ... мне же не одному показалось...","трахать","ТРАХАТЬ.","ребят, ни на что не намекаю, но...","итить...","я б вдул.","ммммммм... я б вдул.","хехехе, ну... да, я б накуканил."]);
			uniqueChatters.push(["BogIisusVera",4,"да будет твоя вера вознаграждена","греховные мысли...","господь, помилуй мою душу...","ох. ОХ, БОЖЕ ПРАВЫЙ.","а.... это... нет..."]);
			uniqueChatters.push(["MummJuggler",3,"я подрючил... кнопку доната","трахать.","не трахать."]);
			uniqueChatters.push(["familym4n",2,"моя жена знает, что я задонатил","лучше бы я на вот этой хрени женился :)","я бы с этой штукой полежал в кроватке...","оно выглядит как моя ебучая жена...","ненавижу свою жену...","вспомни её, вот и благоверная моя...","дэнничка мой родной, ты хотя бы не женат"]);
		}
	}
	else
	{///mad scan dialogue for battles on the roof
		uniqueChatters.push(["lOrdSebastian",9,"МОИ ПАЛЬЦЫ ПРЕВРАТИЛИСЬ В ЧЕРВЕЙ И ЗАДОНАТИЛИ","мои пальцы теперь черви и онми мнея кушают"]);
		uniqueChatters.push(["clarkke",5,"ОТПРАВЛЯЮ СЕБЯ ДЕНЬГИ","Я ЭТО ТЫ Я ЭТО ТЫ Я ЭТО ТЫ Я ЭТО ТЫ Я ЭТО ТЫ "]);
		uniqueChatters.push(["Gadzooke",7,"Эй дэн я прямо тут!! на крыше!","ты меня увидел я та огрмная фигнчя с щупольцами :)"]);
		uniqueChatters.push(["LarRY",13,"моё лицо везддддддедедедед","эта красная хрень с 999 ногами тож в моём городе ипать она ДЛИННАЯ"]);
		uniqueChatters.push(["poebat9",8,"мнеНУЖНА твОЯ КОЖА","мне нужна твоя кожа","я чувствую твою кожу отсюда","трогаю твою кожу","чувствую твою кожу"]);
		uniqueChatters.push(["g00dBean",9,"я возвысился и деньги теперь без надобности","Я Стал Чем-то Иным","я чувствую весь мир","я хорошая фасолинка :)"]);
		uniqueChatters.push(["zitatnik",13,"МОЖЕШЬ ЗАТКНУТЬ ЭТИ ГОЛОСА","Я СЛЫШУ ГОЛОСА ОНИ НЕ ЗАМОЛКАЮТ","ЗАТКНИТЕСЬ","МОЙ РАЗУМ ОТКРЫТ","МОЙ РАЗУМ ОБЩИЙ РАЗУМ"]);
		
		uniqueChatters.push(["joyitcatt",17,"я сегодня щедрый","я оч счастлив","в кои-то веки произошло что-то хорошее","может, гость на самом деле хороший :)"]);
		uniqueChatters.push(["shitgiT",18,"поммоги мне дэн прошу","и меня оно настигло","печатаю ногами","повсюду чешуя","какая-то ящерица???"])
		
		uniqueChatters.push(["datamaster5",11,"я по всюду с тобой","я будто везде и всюду :)"]);
		uniqueChatters.push(["glupenkovyi",19,"глупеньковый подарочек","То, что происходит сейчас, просто офигенно!","мир становится таким глупеньковым хаха","я становлюсь таким глупеньковым :)"]);
		
		uniqueChatters.push(["GordoQ",10,"хочу подержать тебя","хочу подержать тебя близко близко близко близко","подержу тебя всеми своими руками"]);
		uniqueChatters.push(["woof1ryuu",12,"возьми их и меня","дай мнееееее тебя потроггггать","мои языки мои язык мои ЯЗЫКИ"]);
		uniqueChatters.push(["BogIisusVera",4,"давай станем едины","я стал един с БОГОМ","я был переделан по образу и подобию БОГА"]);
		uniqueChatters.push(["MummJuggler",3,"ТРАХАТЬ. КАЖДОГО. ВСЕХ ДО ЕДИНОГО","Я СТАЛ ТЕМ, КЕМ ВСЕГДА ХОТЕЛ БЫТЬ"]);
		uniqueChatters.push(["familym4n",2,"скучаю по жене :(","её нет"]);
	}
	return uniqueChatters;
}

function danChat_BigFanDonations()
{
	///dedicated fans for the top donations (the same people that give useful info in chat)
	var bigFans = [];
	bigFans.push(["Cathaloeghr",6,"спасибо за всё Дэн"]);
	bigFans.push(["Beetinghart",9,"У меня осталось немного, удачи"]);
	bigFans.push(["mathologyst",4,"статы твоего кошелёчка повысились..."]);
	bigFans.push(["mentalWIZ",8,"нету Сопротивления... нет Иммунитета не просить помощ"]);
	bigFans.push(["Uchitel",10,"Моему ученику"]);
	bigFans.push(["collektor",3,"Вот тебе сочный донатик..."]);
	bigFans.push(["loremaster",7,"за то, что был моими глазами и ушами..."])
	bigFans.push(["safetytom",11,"береги себя, Дэн!"]);
	return bigFans;
}

function getDonationMsg(type)
{
	if(type == 0)
	{
		var genNames = danChat_GenericNames(false,false);
		var genMessage = danChat_GenericMsg(false,false);
		var pickNameInd = Math.floor(Math.random()*genNames.length);
		sVr(6,genNames[pickNameInd]);
		sVr(4,1 + (pickNameInd % 30));
		sVr(7,genMessage[Math.floor(Math.random()*genMessage.length)]);
	}
	
	if(type == 1)
	{
		var genUniques = danChat_UniqueChatters(false,false);
		var pickNameInd = Math.floor(Math.random()*genUniques.length);
		var uniqueChatter = genUniques[pickNameInd];
		sVr(6,uniqueChatter[0]);
		sVr(4,uniqueChatter[1]);
		sVr(7,uniqueChatter[2]);
	}
	
	if(type == 2)
	{
		var genUniques = danChat_BigFanDonations(false,false);
		var pickNameInd = Math.floor(Math.random()*genUniques.length);
		var uniqueChatter = genUniques[pickNameInd];
		sVr(6,uniqueChatter[0]);
		sVr(4,uniqueChatter[1]);
		sVr(7,uniqueChatter[2]);
	}
}

function danScanMsg(target,scanPow)
{
	var enemyOb = $gameTroop.members()[target-1];
	var enemyBase = enemyOb.enemy();
	var genUsernames = danChat_GenericNames(enemyBase.meta.madScan,!enemyBase.meta.noCreeps);
	var genLines = danChat_GenericMsg(enemyBase.meta.madScan,!enemyBase.meta.noCreeps);
	var uniqueChatters = danChat_UniqueChatters(enemyBase.meta.madScan,!enemyBase.meta.noCreeps);
	
	var linesPick = [];
	
	if(scanPow>=1){linesPick.push(11);} //Uniques
	if(scanPow>=2){linesPick.push(9);} ///danger meter
	if(scanPow>=3){linesPick.push(10);} //Generic
	if(scanPow>=4){linesPick.push(0);} ///monster name and level
	if(scanPow>=5){linesPick.push(10);} //Generic
	if(scanPow>=6){linesPick.push(1);} ///monster life
	if(scanPow>=7){linesPick.push(11);} //Uniques
	if(scanPow>=8){linesPick.push(2);} ///monster stats
	if(scanPow>=10){linesPick.push(10);} //Generic
	
	if(scanPow>=12)
	{
		linesPick.push(3); ///resist
		linesPick.push(4); ///immune
		linesPick.push(5); ///weakness
	}
	
	if(scanPow>=16)
	{
		linesPick.push(6); ///advice
	}
	
	if(scanPow>=20)
	{
		linesPick.push(11); //Uniques
	}
	
	if(scanPow>=24)
	{
		linesPick.push(7); ///item drops
	}
	
	if(scanPow>=28)
	{
		linesPick.push(11); //Uniques
	}
	
	if(scanPow>=32)
	{
		linesPick.push(8); ///lore
	}
	
	if(scanPow>=36)
	{
		linesPick.push(11); //Uniques
	}
	
	if(scanPow>=48)
	{
		linesPick.push(10); //Generic
	}
	
	if(scanPow>=54)
	{
		linesPick.push(11); //Uniques
	}
	
	if(scanPow>=64)
	{
		linesPick.push(10); //Generic
	}
	
	if(scanPow>8)
	{
		var lnLpL = linesPick.length;
		lnLpL = lnLpL % 4;
		lnLpL = 4 - lnLpL;
		if(lnLpL > 0)
		{
			console.log("Lines before: "+linesPick.length+", to add:"+lnLpL);
			for(var _k = 0; _k<lnLpL; _k++)
			{
				linesPick.push(10); //add more generics to fill 4-line boxes
			}
			console.log("Lines after: "+linesPick.length);
		}
	}
	
	///generate lines
	var resistArr = danScanResist(target,scanPow);
	const members = $gameParty.members();
	
	var linesPrint = [];
	for(var _i = 0; _i<linesPick.length; _i++)
	{
		var lnType = linesPick[_i];
		var userName = "";
		var userCol = 1;
		var userTx = "";
		const partyLevel = members.reduce((r, member) => r + member.level, 0);
		
		switch(lnType)
		{
			case 0: ///name type level
				userName = "Cathaloeghr"; userCol = 6;
				var enemyLevel = enemyBase.meta.level;
				if(!enemyLevel){enemyLevel = 1 + Math.floor(enemyOb.exp()/20);}
				var enemyType = enemyBase.meta.enemyType;
				if(!enemyType){enemyType = "монстр";}
				if((1+partyLevel)*2<enemyLevel){userTx = enemyOb.name() +", ур. ???";}
				else
				{
					if(scanPow>10 || partyLevel*1.2>enemyLevel)
					{userTx = "это "+enemyOb.name() +", ур. "+enemyLevel;}
					else{userTx = "это "+enemyOb.name() +", ур. ???";}
				}
				userTx +=" "+enemyType;
				break;
			case 1: //Life
				userName = "Beetinghart"; userCol = 9;
				const hpRatio = enemyOb.hp/enemyOb.mhp;
				var scanRatio = scanPow * (partyLevel/enemyLevel);
				console.log("Party level:"+partyLevel+", Scan Power: "+scanPow+", scan Ratio: "+scanRatio);
				if(scanRatio<4){userTx = "ОЗ: ???";}
				else if(scanRatio<8)
				{
					userTx = "ОЗ: ??? ";
					if(hpRatio<0.2){userTx+= "(near death)";}
					else if(hpRatio<0.4){userTx+= "(heavily wounded)";}
					else if(hpRatio<0.6){userTx+= "(wounded)";}
					else if(hpRatio<0.8){userTx+= "(lightly wounded)";}
					else{userTx+= "(unharmed)";}
				}
				else if(scanRatio<12){userTx = "ОЗ: "+enemyOb.hp+"/"+enemyOb.mhp+", ВЫН: ???";}
				else {userTx = "ОЗ: "+enemyOb.hp+"/"+enemyOb.mhp+", ВЫН: "+enemyOb.mp+"/"+enemyOb.mmp+"";}
				break;
			case 2: //Stats
				userName = "mathologyst"; userCol = 4;
				if(scanRatio<8)
				{
					userTx = "Атк: ??, Защ: ??, Балл: ??, Защ. от Пуль: ??, Ловк: ??, Удч: ??";
				}
				else
				{
					userTx = "Атк: "+ enemyOb.atk+", Защ: "+enemyOb.def+", Балл: "+enemyOb.mat
					+",Защ. от Пуль: "+enemyOb.mdf+", Ловк: "+enemyOb.agi+", Удч: "+enemyOb.luk;
				}
				break;
			case 3: //RESIST
				userName = "mentalWIZ"; userCol = 8;
				userTx = resistArr[1];
				if(userTx == ""){userName = ""; lnType = 10;}
				break;
			case 4:  //Immune
				userName = "mentalWIZ"; userCol = 8;
				userTx = resistArr[2];
				if(userTx == ""){userName = ""; lnType = 10;}
				break;
			case 5: //Weakness
				userName = "mentalWIZ"; userCol = 8;
				userTx = resistArr[0];
				if(userTx == ""){userName = ""; lnType = 10;}
				break;
			case 6: //Advice
				userName = "Uchitel"; userCol = 10;
				userTx = enemyBase.meta.advice;
				if(!userTx){userTx = ""; userName = ""; lnType = 10;}
				break;
			case 7: //Item Drops
				userName = "collektor"; userCol = 3;
				userTx = "";
				var itemDrops = enemyOb.enemy().dropItems;
				if(itemDrops.length>0)
				{
					userTx = "Дропает:  ";
					itemDrops.forEach(function(drop)
					{
						if(drop.kind>0)
						{
							if(userTx.length>0){userTx+=", ";}
							var itmOb = null;
							if (drop.kind === 1) {itmOb = $dataItems[drop.dataId];}
							else if (drop.kind === 2) {itmOb = $dataWeapons[drop.dataId];}
							else if (drop.kind === 3) {itmOb = $dataArmors[drop.dataId];}
							var dropRate = Math.floor(100/drop.denominator);
							if(dropRate>=50 || scanRatio>16){userTx+=itmOb.name +"("+dropRate+"%)";}
							else if(dropRate>=20 || scanRatio>12){userTx+=itmOb.name +"("+dropRate+"%)";}
							else{userTx+=itmOb.name.replace(/[a-zA-Z]/g, '?') +"(??%)";}
							
						}
					})
				}
				else{userTx = ""; userName = ""; lnType = 10;}
				break;
			case 8: //Lore
				userName = "loremaster"; userCol = 7;
				userTx = enemyBase.meta.lore;
				if(!userTx){userTx = ""; userName = ""; lnType = 10;}
				break;
				
			case 9: //danger
				userName = "safetytom"; userCol = 15;
				var enemyLevel = enemyBase.meta.level;
				if(!enemyLevel){enemyLevel = 1 + Math.floor(enemyOb.exp()/20);}
				var measureDanger = enemyLevel-1+Math.floor(Math.random()*3);
				if(partyLevel>=measureDanger+8){userTx="даж времени твоего не стоит имхо";}
				else if(partyLevel>=measureDanger+7){userTx="он лошара";}
				else if(partyLevel>=measureDanger+6){userTx="фигня битва";}
				else if(partyLevel>=measureDanger+5){userTx="даже с закрытыми глазами справишься";}
				else if(partyLevel>=measureDanger+4){userTx="легкотня";}
				else if(partyLevel>=measureDanger+3){userTx="не проблема";}
				else if(partyLevel>=measureDanger+2){userTx="ты его укокошишь";}
				else if(partyLevel>=measureDanger+1){userTx="норм всё должно быть";}
				else if(partyLevel>=measureDanger){userTx="норм битва считаю";}
				else if(partyLevel>=measureDanger-1){userTx="не слишком плохо";}
				else if(partyLevel>=measureDanger+2){userTx="вот тут серьёзно";}
				else if(partyLevel>=measureDanger+4){userTx="проблемно";}
				else if(partyLevel>=measureDanger+5){userTx="оч всё плохо";}
				else if(partyLevel>=measureDanger+6){userTx="страшно";}
				else if(partyLevel>=measureDanger+7){userTx="эм..........";}
				else if(partyLevel>=measureDanger+8){userTx="убирайся оттуда блин";}
				else{userTx="БЕГИ";}
				break;
		}

		if(lnType==10)
		{
			var pickNameInd = Math.floor(Math.random()*genUsernames.length);
			userName = genUsernames[pickNameInd];
			userCol = 1 + (pickNameInd % 30);
			userTx = genLines[Math.floor(Math.random()*genLines.length)];
		}
		
		if(lnType==11)
		{
			var pickNameInd = Math.floor(Math.random()*uniqueChatters.length);
			var uniqueChatter = uniqueChatters[pickNameInd];
			userName = uniqueChatter[0];
			userCol = uniqueChatter[1];
			userTx = uniqueChatter[3+Math.floor(Math.random()*(uniqueChatter.length-3))];
		}
		
		linesPrint.push("\\>\\C["+userCol+"]"+userName+"\\C[0]: "+userTx+"\\<")
	}
	
	///shuffle lines
	linesPrint = shuffleArray(linesPrint);
	
	///turn lines into messages
	var quadIndx = 0;
	var curMsg = "";
	for(var _j = 0; _j<linesPrint.length; _j++)
	{
		var ln = linesPrint[_j];
		quadIndx+=1;
		curMsg +=ln;
		if(quadIndx<4)
		{
			if(_j==linesPrint.length-1) ///ends early?
			{
				curMsg+="   \\.\\.\\.\\.\\^";
				$gameMessage.setFaceImage('',0);
				$gameMessage.setBackground(0);
				$gameMessage.setPositionType(2);
				$gameMessage.setSpeakerName('');
				$gameMessage.add(curMsg);
				$gameTroop._interpreter.setWaitMode('message');
			}
			else
			{
				if(scanPow<4 && Math.floor(Math.random()<0.5)){curMsg+="\\.";}
				if(scanPow<8){curMsg+="\\.";}
				if(scanPow<12 && Math.floor(Math.random()<0.5)){curMsg+="\\.";}
				if(scanPow<16){curMsg+="\\.";}
				if(scanPow<24 && Math.floor(Math.random()<0.5)){curMsg+="\\.";}
				
				var nbPauses = Math.floor(Math.random()*3);
				curMsg+="       ";
				if(nbPauses==1){curMsg+="\\.";}
				if(nbPauses==2){curMsg+="\\.\\.";}
				curMsg+="\n";
			}
		}
		else
		{
			if(scanPow<4 && Math.floor(Math.random()<0.5)){curMsg+="\\."}
			if(scanPow<8 && Math.floor(Math.random()<0.5)){curMsg+="\\."}
			if(scanPow<12 && Math.floor(Math.random()<0.5)){curMsg+="\\."}
			curMsg+=" \\.\\.\\.\\.";
			var nbPauses = Math.floor(Math.random()*2)
			if(nbPauses==1){curMsg+=" \\.";}
			curMsg+="\\^"
			$gameMessage.setFaceImage('',0);
			$gameMessage.setBackground(0);
			$gameMessage.setPositionType(2);
			$gameMessage.setSpeakerName('');
			$gameMessage.add(curMsg);
			$gameTroop._interpreter.setWaitMode('message');
			
			curMsg = "";
			quadIndx = 0;
		}
	}
}

function danScanBase(target,scanPow){
	var enemyOb = $gameTroop.members()[target-1];
	var enemyBase = enemyOb.enemy();
	var linesPick = [];
	var returnString = "";
	var enemyLevel = enemyBase.meta.level;
	if(!enemyLevel)
	{
		enemyLevel = 1 + Math.floor(enemyOb.exp()/20);
	}
	const members = $gameParty.members();
	const partyLevel = members.reduce((r, member) => r + member.level, 0);
	var enemyType = enemyBase.meta.enemyType;
	if(!enemyType){enemyType = "монстр";}
	if((1+partyLevel)*2<enemyLevel){returnString = enemyOb.name() +", ур. ???";}
	else
	{
		if(scanPow>10 || partyLevel*1.2>enemyLevel)
		{returnString = enemyOb.name() +", ур. "+enemyLevel;}
		else{returnString = enemyOb.name() +", ур. ???";}
	}
	returnString+=" "+enemyType+"\n";
	
	const hpRatio = enemyOb.hp/enemyOb.mhp;
	var scanRatio = scanPow * (partyLevel/enemyLevel);
	console.log("Party level:"+partyLevel+", Scan Power: "+scanPow+", scan Ratio: "+scanRatio);
	if(scanRatio<4){returnString += "ОЗ: ???";}
	else if(scanRatio<8)
	{
		returnString += "ОЗ: ??? ";
		if(hpRatio<0.2){returnString+= "(near death)";}
		else if(hpRatio<0.4){returnString+= "(heavily wounded)";}
		else if(hpRatio<0.6){returnString+= "(wounded)";}
		else if(hpRatio<0.8){returnString+= "(lightly wounded)";}
		else{returnString+= "(unharmed)";}
	}
	else if(scanRatio<12){returnString += "ОЗ: "+enemyOb.hp+"/"+enemyOb.mhp+", ВЫН: ???";}
	else {returnString += "ОЗ: "+enemyOb.hp+"/"+enemyOb.mhp+", ВЫН: "+enemyOb.mp+"/"+enemyOb.mmp+"";}
	returnString+="\n";
	
	
	if(scanRatio<8)
	{
		returnString += "Атк: ??, Защ: ??, Балл: ??, Защ. от Пуль: ??, Ловк: ??, Удч: ??";
	}
	else
	{
		returnString += "Атк: "+ enemyOb.atk+", Защ: "+enemyOb.def+", Балл: "+enemyOb.mat
		+",Защ. от Пуль: "+enemyOb.mdf+", Ловк: "+enemyOb.agi+", Удч: "+enemyOb.luk+"\n";
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

function danScanResist(target,scanPow){
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
	if(elemRate>=1.25){weakStr+="[ДРОБЯЩ.] ";}
	if(elemRate<=0.1){immuneStr+="[ДРОБЯЩ.] ";}
	else if(elemRate<=0.75){resistStr+="[ДРОБЯЩ.] ";}
	
	elemRate = enemyOb.elementRate(2); ///slash
	if(elemRate>=1.25){weakStr+="[РЕЖУЩ.] ";}
	if(elemRate<=0.1){immuneStr+="[РЕЖУЩ.] ";}
	else if(elemRate<=0.75){resistStr+="[РЕЖУЩ.] ";}
	
	elemRate = enemyOb.elementRate(3); ///pierce
	if(elemRate>=1.25){weakStr+="[ПРОНЗАЮЩ.] ";}
	if(elemRate<=0.1){immuneStr+="[ПРОНЗАЮЩ.] ";}
	else if(elemRate<=0.75){resistStr+="[ПРОНЗАЮЩ.] ";}
	
	elemRate = enemyOb.elementRate(4); ////fire
	if(elemRate>=1.25){weakStr+="[ОГОНЬ] ";}
	if(elemRate<=0.1){immuneStr+="[ОГОНЬ] ";}
	else if(elemRate<=0.75){resistStr+="[ОГОНЬ] ";}
	
	elemRate = enemyOb.elementRate(5); ///acid
	if(elemRate>=1.25){weakStr+="[КИСЛОТА] ";}
	if(elemRate<=0.1){immuneStr+="[КИСЛОТА] ";}
	else if(elemRate<=0.75){resistStr+="[КИСЛОТА] ";}
	
	elemRate = enemyOb.elementRate(6); ///blast
	if(elemRate>=1.25){weakStr+="[ВЗРЫВ] ";}
	if(elemRate<=0.1){immuneStr+="[ВЗРЫВ] ";}
	else if(elemRate<=0.75){resistStr+="[ВЗРЫВ] ";}
	
	elemRate = enemyOb.elementRate(7); ///bullet
	if(elemRate>=1.25){weakStr+="[ПУЛИ] ";}
	if(elemRate<=0.1){immuneStr+="[ПУЛИ] ";}
	else if(elemRate<=0.75){resistStr+="[ПУЛИ] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(8); ///armor pierce
	if(elemRate>=1.25){weakStr+="[ПРОБИВ. БРОНИ] ";}
	if(elemRate<=0.1){immuneStr+="[ПРОБИВ. БРОНИ] ";}
	else if(elemRate<=0.75){resistStr+="[ПРОБИВ. БРОНИ] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(9); ///flesh
	if(elemRate>=1.25){weakStr+="[ПЛОТЬ] ";}
	if(elemRate<=0.1){immuneStr+="[ПЛОТЬ] ";}
	else if(elemRate<=0.75){resistStr+="[ПЛОТЬ] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(10); ///cold
	if(elemRate>=1.25){weakStr+="[ХОЛОД] ";}
	if(elemRate<=0.1){immuneStr+="[ХОЛОД] ";}
	else if(elemRate<=0.75){resistStr+="[ХОЛОД] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(11); ///shock
	if(elemRate>=1.25){weakStr+="[ЭЛЕКТРИЧ.] ";}
	if(elemRate<=0.1){immuneStr+="[ЭЛЕКТРИЧ.] ";}
	else if(elemRate<=0.75){resistStr+="[ЭЛЕКТРИЧ.] ";}
	
	if(weakStr.length>48 && !lnBrkWeak){weakStr+="\n"; lnBrkWeak = true;}
	if(immuneStr.length>48 && !lnBrkImm){immuneStr+="\n"; lnBrkImm = true;}
	if(resistStr.length>48 && !lnBrkRes){resistStr+="\n"; lnBrkRes = true;}
	
	elemRate = enemyOb.elementRate(12); ///shadow
	if(elemRate>=1.25){weakStr+="[ТЕНЬ]";}
	if(elemRate<=0.1){immuneStr+="[ТЕНЬ]";}
	else if(elemRate<=0.75){resistStr+="[ТЕНЬ]";}
	
	var arrRet = ["","",""];
	if(weakStr!=""){arrRet[0]="Слаб.:"+ weakStr;}
	if(resistStr!=""){arrRet[1]="Устойчив.:"+ resistStr;}
	if(immuneStr!=""){arrRet[2]="Иммун.:"+ immuneStr;}
	return arrRet;
}

function danScanInfo(target,scanPow){
}

///Sophie
function stealItem(target){
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

///Sophie Marble Find
function rollSpecialMarbles(amount=1,showmessage=true,minTier=0,maxTier=4)
{
	var marbleList = [];
	var nbSteels = 0;
	for(var i = 0; i<amount; i++)
	{
		var newMarble = 0;
		var tierRoll = Math.round(Math.random()*100);
		var tier =0;
		if(tierRoll<=28){tier = 0;}
		else if(tierRoll<=68){tier = 1;}
		else if(tierRoll<=88){tier = 2;}
		else if(tierRoll<=98){tier = 3;}
		else{tier = 4;}
		if(tier<minTier){tier=minTier;}
		if(tier>maxTier){tier=maxTier;}
		switch(tier)
		{
			case 0: nbSteels +=1; break;
			case 1: newMarble = choose([662,663,664]); break;
			case 2: newMarble = choose([666,667,668,669,670]); break;
			case 3: newMarble = choose([672,673,674,675,676]); break;
			case 4: newMarble = choose([678,679,680,681,682]); break;
		}
		if(newMarble>0)
		{
			marbleList.push(newMarble);
			$gameParty.gainItem($dataItems[newMarble],1);
		}
	}
	if(nbSteels>0)
	{
		$gameParty.gainItem($dataItems[661],nbSteels);
	}
	if(showmessage)
	{
		var quadIndx = 0;
		var curMsg = "Found ";
		var _j = 0;
		if(nbSteels>0)
		{
			_j = 1;
			var steelMarble = $dataItems[661];
			if(nbSteels>1){curMsg+=nbSteels+"x\\I["+steelMarble.iconIndex+"]"+steelMarble.name;}
			else{curMsg+="\\I["+steelMarble.iconIndex+"]"+steelMarble.name;}
		}
		if(marbleList.length>0)
		{
			for(_j=0; _j<marbleList.length; _j++)
			{
				//if(nbSteels>0 && _j==0){_j=1;}
				
				if(_j == marbleList.length-1){if(_j>=1){curMsg+=" and ";}}
				else if(_j>0){curMsg+=", ";}
				
				if(_j==2 || _j==5){curMsg+="\n";}
				var marbleOb = $dataItems[marbleList[_j]];
				curMsg += "\\I["+marbleOb.iconIndex+"]"+marbleOb.name;
				if(_j == marbleList.length-1){curMsg+=".";}
			}
		}else{curMsg+=".";}
		$gameMessage.setFaceImage('',0);
		$gameMessage.setBackground(0);
		$gameMessage.setPositionType(2);
		$gameMessage.setSpeakerName('');
		$gameMessage.add(curMsg);
		$gameTroop._interpreter.setWaitMode('message');
	}
	
	return marbleList;
}

////----Talk Encounters----/////
function isTalkAllowed(){
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


////----MWEvent Allowed ----/////
function isMWEventAllowed(){
	if(gSw(474)){return false;}
	else
	{
		var evIndex = gVr(514);
		var evFollowup = gVr(515);
		var arr = gVr(702);
		if(!Array.isArray(arr))
		{
			arr = [];
			for (var i = 0; i <= 600; i++) {arr.push(false); sVr(702,arr);}
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

////----confirmEvent ----/////
function confirmEvent(){
	var evIndex = gVr(514);
	var arr = gVr(702);
	sSw(474,true);
	arr[evIndex] = true;
	sVr(702,arr);
}


////----QuestionAllowed----/////
function isQuestionAllowed(){
	if(gSw(474)){return false;}
	else
	{
		var evIndex = gVr(514);
		var evFollowup = gVr(515);
		var arr = gVr(785);
		if(!Array.isArray(arr))
		{
			arr = [];
			for (var i = 0; i <= 200; i++) {arr.push(false); sVr(785,arr);}
		}
		if(arr[evIndex]==false && (evFollowup == 0 || arr[evFollowup]==true))
		{
			var chance = gVr(513);
			var roll = Math.randomInt(100);
			console.log("Question Index: "+evIndex+"Chance: "+chance +", roll: "+roll);
			if(roll<=chance || gSw(70)){return true;}else{return false;}
		}
		else{return false;}
	}
}

function confirmQuestion(){
	var evIndex = gVr(514);
	var arr = gVr(785);
	sSw(474,true);
	arr[evIndex] = true;
	sVr(785,arr);
}

//// KELP


//////////////--SPRITE--//////////////

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


///Sprite_Enemy
Sprite_Enemy.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
    if (this._stateIconSprite.y < 50 - this.y) {
        this._stateIconSprite.y = 50 - this.y;
    }
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
	this._sineX += Math.floor(Math.random()*parseInt(undefRep(battler.enemy().meta.sineXRand,0)));
	this._sineY += Math.floor(Math.random()*parseInt(undefRep(battler.enemy().meta.sineXRand,0)));
	if(battler.enemy().meta.maskFrames){this._maskFrames = 5;}
	if(battler.enemy().meta.glitchfrms){this._glitchFrames = parseInt(undefRep(battler.enemy().meta.glitchfrms,0)); this._glitchDelay = 60;}
	this._animFrms = parseInt(undefRep(battler.enemy().meta.animFrms,0));
	this._animSpd = parseInt(undefRep(battler.enemy().meta.animSpd,1));
	console.log("startingY "+ battler.screenY());
    this.setHome(battler.screenX(), battler.screenY());
    this._stateIconSprite.setup(battler);
};


///Sprite_Battler
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
	this._maskFrames = -1;
	this._glitchFrames = 0;
	this._glitchDelay = 0;
	this._glitchState = 0;
	this._animFrame = 0;
	this._sineX = 0;
	this._sineY = 0;
	this._animFrms = 0;
	this._animSpd = 0;
	this._animCurFrm = 0;
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

Sprite_Battler.prototype.spriteSwap = function(_swapTo = ""){
	this._battler._battlerName = _swapTo;
}

Sprite_Battler.prototype.updatePosition = function(){
	this.x = this._homeX + this._offsetX + this._shiftX;
    this.y = this._homeY + this._offsetY + this._shiftY;
	
	if(this._maskFrames>=0 && this._appeared)
	{		
		var sineMvX = Math.sin(BattleManager._animProgress*this._sineXSpd);
		var sineMvY = Math.sin(BattleManager._animProgress*this._sineYSpd);
		var newFrame = 0;
		console.log("sineMvX = "+sineMvX+", sineMvY = "+sineMvY);
		if(sineMvY<-0.4)
		{
			newFrame=8;
			if(sineMvX<-0.4){newFrame = 7;}
			if(sineMvX>0.4){newFrame = 9;}
		}
		else if(sineMvY>0.4)
		{
			newFrame=2;
			if(sineMvX<-0.4){newFrame = 1;}
			if(sineMvX>0.4){newFrame = 3;}
		}
		else if(sineMvX<-0.4){newFrame = 4;}
		else if(sineMvX>0.4){newFrame = 6;}
		if(newFrame != 	this._maskFrames)
		{
			if(this._effectType == null && this._battler._effectType == null)
			{
				this._maskFrames = newFrame;
				this.poseSwap("_ps"+this._maskFrames);
			}
		}
		if(this._sineX>0){this.x += sineMvX*this._sineX;}
		if(this._sineY>0){this.y += sineMvY*this._sineY;}
	}
	else
	{
		if(this._sineX>0){this.x += Math.sin(BattleManager._animProgress*this._sineXSpd)*this._sineX;}
		if(this._sineY>0){this.y += Math.sin(BattleManager._animProgress*this._sineYSpd)*this._sineY;}
	}
	
	if(this._battler.animLoopDelay>0)
	{
		if(this._battler.animLoopFrames.length>0)
		{
			if(this._effectType == null && this._battler._effectType == null)
			{
				if(this._glitchDelay >0){this._glitchDelay-=1;}
				else
				{
					this._glitchDelay = this._battler.animLoopDelay;
					this.poseSwap("_"+this._battler.animLoopFrames[this._animFrame]);
					this._animFrame+=1;
					if(this._animFrame>=this._battler.animLoopFrames.length){this._animFrame=0;}
				}
			}
		}
	}
	
	if(this._glitchFrames >0)
	{
		if(this._effectType == null && this._battler._effectType == null)
		{
			if(this._glitchDelay >0){this._glitchDelay-=1;}
			else
			{
				var frm = -2;
				switch(this._glitchState)
				{
					case 0://normal state
						//this._glitchDelay = Math.floor(Math.random()*20+60);
						this._glitchState = Math.floor(Math.random()*10);
						if(this._glitchState==0) ///10% chance to have a glitch start
						{
							this._glitchState = 1+Math.floor(Math.random()*2);
				
							switch(this._glitchState)
							{
								case 1:///single blep glitch
									frm = Math.floor(Math.random()*(this._glitchFrames+1));
									this._glitchDelay = 10+Math.floor(Math.random()*20);
									break;
								case 2:///repeat glitch
									frm = Math.floor(Math.random()*(this._glitchFrames+1));
									this._glitchDelay = 4+Math.floor(Math.random()*4);
									break;
								case 3:///sprite switch
									frm = Math.floor(Math.random()*(this._glitchFrames+1));
									this._glitchDelay = 120+Math.floor(Math.random()*60);
									break;
							}
						}
						else
						{
							this._glitchState = 0;
						}
						break;
					case 1:
						frm = -1;
						this._glitchDelay = Math.floor(Math.random()*20+60);
						this._glitchState = 0;
						break;
					case 2:
						frm = -1;
						if(Math.random()*10<=2){this._glitchState = 0;}else{this._glitchState = 2.5;}
						this._glitchDelay = 4+Math.floor(Math.random()*4);
						break;
					case 2.5:
						frm = Math.floor(Math.random()*(this._glitchFrames+1)); this._glitchState = 2;
						this._glitchDelay = 4+Math.floor(Math.random()*4);
						break;
					case 3:
						this.poseSwap("_normal");
						this._glitchDelay = Math.floor(Math.random()*20+60);
						this._glitchState = 0;
						break;
				}
				if(frm>=-1)
				{
					if(frm==-1)
					{
						this.poseSwap("_normal");
					}
					else
					{
						this.poseSwap("_g"+frm);
					}
				}
			}
		}
	}
	
	if(this._battler._spriteSwapTo!=null)
	{
		if(this._effectType == null && this._battler._effectType == null)
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
	}
	
	if(this._animFrms!=0)
	{
		if(this._effectType == null && this._battler._effectType == null)
		{
			var frameTot = Math.floor((BattleManager._animProgress*600) / this._animSpd);
			var cfrm = frameTot % this._animFrms;
			if(cfrm != this._animCurFrm)
			{
				this.poseSwap("_frm"+cfrm);
				this._animCurFrm = cfrm;
			}
		}
	}
	
	spinTheBoss();
};


Sprite_Enemy.prototype.updateCollapse = function() {
    this.blendMode = 1;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
};

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
		else if(monsterImageExists(baseName+"_"+_swapTo))
		{this._battler._battlerName = baseName+"_"+_swapTo;}
		else{console.log("Couldnt find "+baseName+_swapTo+" image for monster "+baseName);}
	}
}	


Sprite_Battler.prototype.damageOffsetX = function() {
    return 0-this._shiftX;
};

Sprite_Battler.prototype.damageOffsetY = function() {
    return 0-this._shiftY;
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


///Spriteset_Base
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


///Spriteset_Battler
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


///Sprite_AnimationMV
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

Sprite_AnimationMV.prototype.updatePosition = function() {
    if (this._animation.position === 3) {
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2;
    } else if (this._targets.length > 0) {
        const target = this._targets[0];
        const parent = target.parent;
        const grandparent = parent ? parent.parent : null;
        this.x = target.x;
        this.y = target.y;
        if (this.parent === grandparent) {
            this.x += parent.x;
            this.y += parent.y;
        }
        if (this._animation.position === 0) {
            this.y -= target.height;
        } else if (this._animation.position === 1) {
            this.y -= target.height / 2;
        }
		if(this._animation.name.contains("awtx_"))
		{
			this.z = 1;
		}
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


///Resist and weakness messages
;void (function() {  // private scope
'use strict';
  const alias = Sprite_Damage.prototype.setup;
  Sprite_Damage.prototype.setup = function(target) {
    const result = target.result();
	if (!result.missed && !result.evaded &&!result.customDot) {
    // then check for additional crit effect trigger
		if (BattleManager._action.calcElementRate(target) < 1) {
			const h = this.fontSize();
			const w = Math.floor(h * 6.0);
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText(" ", 0, 0, w, h, "center");
			sprite.dy = 0;
			sprite.shiftY = -35;
		}
		if (BattleManager._action.calcElementRate(target) > 1) {
			const h = this.fontSize();
			const w = Math.floor(h * 12.0);
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText(" ", 0, 0, w, h, "center");
			sprite.dy = 0;
			sprite.shiftY = -35;
		}
	}
	if(result.customDot)
	{
		const h = this.fontSize();
		const w = Math.floor(h * 12.0);
		const sprite = this.createChildSprite(w, h);
		sprite.bitmap.drawText(result.customDot, 0, 0, w, h, "center");
		sprite.dy = 0;
		sprite.shiftY = -35;
		result.customDot=""
		
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

////AMMO DISPLAY

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
				if(this._battler.isStateAffected(249) || this._battler.isStateAffected(56)){return 0;}
				else{return this._battler.hp;}
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
					if(ammoArr.length<eqGun.meta.wpnIndex || ammoArr[parseInt(undefRep(eqGun.meta.wpnIndex))]==null)
					{
						ammoFix();
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


function checkIfBGM(bgmTrack){
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

function confirmTalk(){
	var evIndex = gVr(514);
	var arr = gVr(516);
	sSw(474,true);
	arr[evIndex] = true;
	sVr(516,arr);
}


function setSybilMajorStory(index){
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

function setSybilMinorStory(index){
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

function ammoSetup(){
	///AMMO SETUP
	var ammoArr = gVr(301);
	if(Array.isArray(ammoArr)==false)
	{
		var ammoLoaded = [];
		var lookingForWpnIndex = 0;
		for(var i = 0; i<=160; i++)
		{
			var eqIndex = 112+i;
			var eqData = $dataArmors[eqIndex];
			var wpnInd = eqData.meta.wpnIndex;
			if(wpnInd)
			{
				if(wpnInd>=lookingForWpnIndex)
				{
					ammoLoaded[wpnInd] = parseInt(eqData.meta.maxAmmo);
					lookingForWpnIndex = parseInt(wpnInd) + 1;
					
				}
			}
		}
		sVr(301,ammoLoaded);
	}
}

function ammoFix(){
	var ammoArr = gVr(301);
	var lookingForWpnIndex = 0;
	console.log("Fixing Ammo Total");
	for(var i = 0; i<=160; i++)
	{
		var eqIndex = 112+i;
		var eqData = $dataArmors[eqIndex];
		var wpnInd = eqData.meta.wpnIndex;
		if(wpnInd)
		{
			if(wpnInd>=lookingForWpnIndex)
			{
				if(ammoArr.length<wpnInd || ammoArr[wpnInd] == null)
				{
					ammoArr[wpnInd] = parseInt(eqData.meta.maxAmmo);
					lookingForWpnIndex = parseInt(wpnInd) + 1;
				}
			}
		}
	}
	sVr(301,ammoArr);
}

function reloadAmmo(){
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
		else if(skillUsed.id == 278)///refuel flamethrower
		{
			$gameParty.gainItem($dataItems[162], -1); ///use up gasoline
			subject.forceChangeEquip(1, $dataArmors[153]);
			const equip = BattleManager._lastSubject._equips[1];
			const eqData = $dataArmors[equip._itemId];
			var ammoArr = gVr(301);
			const ammoMax = undefRep(eqData.meta.maxAmmo);
			ammoArr[parseInt(eqData.meta.wpnIndex)] = ammoMax;
		}
		else if(skillUsed.id == 279)///refuel acid spray
		{
			$gameParty.gainItem($dataItems[168], -1); ///use up herbicide
			subject.forceChangeEquip(1, $dataArmors[156]);
			const equip = BattleManager._lastSubject._equips[1];
			const eqData = $dataArmors[equip._itemId];
			var ammoArr = gVr(301);
			const ammoMax = undefRep(eqData.meta.maxAmmo);
			ammoArr[parseInt(eqData.meta.wpnIndex)] = ammoMax;
		}
		else if(skillUsed.id == 307)///recharge item
		{
			var itemRepairing = BattleManager._lastSubject._equips[0];
			console.log("itemRepairing: "+itemRepairing);
			var repairTo = parseInt(undefRep($dataWeapons[itemRepairing._itemId].meta.repairTo,"0"));
			if(repairTo==0){repairTo = weaponIndex-1; console.log("MISSING REPAIRTO FOR "+weaponIndex+", GOING FOR INDEX-1");}
			console.log("Repaired into: "+$dataWeapons[repairTo].name);
			//$gameParty.loseItem($dataWeapons[weaponIndex], 1);
			//$gameParty.gainItem($dataWeapons[repairTo], 1);
			sVr(8,$dataWeapons[repairTo].name);
	
			$gameParty.gainItem($dataItems[319], -1);///use up a battery
			subject.forceChangeEquip(0, $dataWeapons[repairTo]);
		}
		else if(skillUsed.id == 302)///use slingshot
		{
			$gameParty.gainItem($dataItems[203], -1);///use up a marble
		}
		else if(skillUsed.id == 810 || skillUsed.id == 813)///reloead jaw revolver / tooth sniper
		{
			const equip = BattleManager._lastSubject._equips[1];
			const eqData = $dataArmors[equip._itemId];
			const ammoMax = undefRep(eqData.meta.maxAmmo);
			var ammoArr = gVr(301);
			ammoArr[parseInt(eqData.meta.wpnIndex)] = ammoMax;
			let newGunId = parseInt(eqData.meta.emptyOb);
			subject.forceChangeEquip(1, $dataArmors[newGunId+3]);
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
					var ammoItemInd = parseInt(skillUsed.meta.WithItemId);
					if(ammoItemInd == 9999){ammoItemInd = gVr(938);}
					const nbItems = $gameParty.numItems($dataItems[ammoItemInd])
					console.log("Spare Ammo Left: "+nbItems);
					ammoSetup();
					var ammoArr = gVr(301)
					let curAmmo = ammoArr[parseInt(eqData.meta.wpnIndex)];
					let ammoRegain = ammoMax - curAmmo;
					if(ammoRegain>nbItems){ammoRegain = nbItems;}
					console.log("Max ammo: "+ammoMax+", curAmmo:"+curAmmo+", spare ammo: "+nbItems+", ammoRegained: "+ammoRegain);
					curAmmo += ammoRegain;
					$gameParty.gainItem($dataItems[ammoItemInd], -ammoRegain);
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
				if(gVr(3)==23)
				{///reloaded the glitch gun. randomize its bullets for next time.
					randomizeGlitchgun();
				}
			}
		}
	}
}


function randomizeGlitchgun()
{
	
	var randoAmmo = 180;
	var ammoKind = Math.floor(Math.random()*10);
	var dmgBonus = 30;
	if(gVr(938)==0)
	{
		sVr(938,180); ammoKind = 0;
		sVr(939,$dataItems[randoAmmo].name);
	}
	
	///set new damage bonus
	switch(gVr(938))
	{
		case 180: 	dmgBonus += 0; break;
		case 181: 	dmgBonus += 20; break;//magnum
		case 182: 	dmgBonus += -10; break;//smg
		case 183: 	dmgBonus += 15; break;//rifle
		case 184: 	dmgBonus += 5; break;//shotgun
		case 185: 	dmgBonus += 30; break; ///high cal bullet
		case 197: 	dmgBonus += 30; break; ///bolt
		case 7: 	dmgBonus += 10; break; ///bandage
		case 8: 	dmgBonus += 40; break; ///tonic
		case 110: 	dmgBonus += -10; break; ///penny
		case 109: 	dmgBonus += -5; break; ///nickel
		case 108: 	dmgBonus += 0; break; ///dime
		case 107: 	dmgBonus += 10; break; ///quarter
		case 177: 	dmgBonus += 10; break; ///junk
		case 92: 	dmgBonus += 20; break; ///dinner plate
		case 26: 	dmgBonus += 10; break; ///hard candy
		case 50: 	dmgBonus += 15; break; ///leftovers
		case 231: 	dmgBonus += 20; break; ///egg
		case 223: 	dmgBonus += 30; break; ///potato
		case 161: 	dmgBonus += 40; break; ///vinegar
		case 162: 	dmgBonus += 40; break; ///gasoline
		case 163: 	dmgBonus += 40; break; ///d-clogger
		case 164: 	dmgBonus += 40; break; ///klysox
		case 173: 	dmgBonus += 40; break; ///soap
		case 36: 	dmgBonus += 30; break; ///cola can
		case 16: 	dmgBonus += 200;  break; ///elixir
		case 11: 	dmgBonus += 40; break; ///antidote
		case 91: 	dmgBonus += 100; break; ///explosive
		case 148: 	dmgBonus += 100; break; ///black ooze
	}
	dmgBonus = 5 + Math.floor(dmgBonus/2 + Math.random()*dmgBonus*2); 
	///pick new ammo for next reload
	if(ammoKind<=2)
	{///pistol bullets (30% ch)
		randoAmmo = 180;
		sVr(939,$dataItems[180].name);
	}
	else if(ammoKind<=5)
	{///random bullet type (30% ch)
		randoAmmo = 180+ Math.floor(Math.random()*5);
		if(randoAmmo==180){randoAmmo=203;}
	}
	else if(ammoKind<=8)
	{///common item (30% ch)
		randoAmmo = Math.floor(Math.random()*12);
		switch(randoAmmo)
		{
			case 0: randoAmmo = 185; break; ///high cal bullet
			case 1: randoAmmo = 197; break; ///bolt
			case 2: randoAmmo = 7; break; ///bandage
			case 3: randoAmmo = 8; break; ///tonic
			case 4: randoAmmo = 110; break; ///penny
			case 5: randoAmmo = 109; break; ///nickel
			case 6: randoAmmo = 108; break; ///dime
			case 7: randoAmmo = 107; break; ///quarter
			case 8: randoAmmo = 177; break; ///junk
			case 9: randomAmmo = 92; break; ///dinner plate
			case 10: randomAmmo = 26; break; ///hard candy
			case 11: randomAmmo = 50; break; ///leftovers
		}
	}
	else
	{///uncommon item (10% ch)
		randoAmmo = Math.floor(Math.random()*12);
		switch(randoAmmo)
		{
			case 0: randoAmmo = 231; break; ///egg
			case 1: randoAmmo = 223; break; ///potato
			case 2: randoAmmo = 161; break; ///vinegar
			case 3: randoAmmo = 162; break; ///gasoline
			case 4: randoAmmo = 163; break; ///d-clogger
			case 5: randoAmmo = 164; break; ///klysox
			case 6: randoAmmo = 173; break; ///soap
			case 7: randoAmmo = 36; break; ///cola can
			case 8: randoAmmo = 16; break; ///elixir
			case 9: randomAmmo = 11; break; ///antidote
			case 10: randomAmmo = 91; break; ///explosive
			case 11: randomAmmo = 148; break; ///black ooze
			
		}
	}
	sVr(937,dmgBonus)
	sVr(938,randoAmmo);
	sVr(940,gVr(939));
	sVr(939,$dataItems[randoAmmo].name);
	
}

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


///KELP

///KELP

/////----WEAPON DURABILITY/AMMO SPENDING----//////

function repairWeapon(weaponIndex){
	var repairTo = parseInt(undefRep($dataWeapons[weaponIndex].meta.repairTo,"0"));
	if(repairTo==0){repairTo = weaponIndex-1; console.log("MISSING REPAIRTO FOR "+weaponIndex+", GOING FOR INDEX-1");}
	console.log("Repaired into: "+$dataWeapons[repairTo].name);
	$gameParty.loseItem($dataWeapons[weaponIndex], 1);
	$gameParty.gainItem($dataWeapons[repairTo], 1);
	sVr(8,$dataWeapons[repairTo].name);
}

function spendBullets(){
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
				 if(curAmmo<=0){curAmmo = 0;}
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

function durabilityCheck(){
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
				for (var i = 1; i <= 250; i++) {
				   atkCntArray.push(0);
				}
				sVr(162,atkCntArray);
			}
			else
			{
				if(gVr(162).length<equip._itemId)
				{
					for (var i = gVr(162).length; i <= 250; i++) {
						atkCntArray.push(0);
					}
					sVr(162,atkCntArray);
				}
				atkCntArray = gVr(162);
			}
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

function breakMessage(objData,breakJnk,breakJnkAmnt){
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
			tx="Твоё оружие "+objData.name+ " повреждено.";
		}
		else
		{
			tx="Твоё оружие "+objData.name+ " сломалось!";
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


function turnStringToIcons(){
	
}

function animateBattleback(animArray=[],animDelay= 200){
	BattleManager._backgrndAnimArray = animArray;
	BattleManager._backgrndAnimSpd = animDelay;
}


function coinSockCalc(){
	var dmgTotal = 0;
	var totGld = $gameParty.gold();
	while(totGld>0)
	{
		if(totGld>=20){dmgTotal+=20;}
		else{dmgTotal+= Math.floor(totGld); totGld = 0;}
		totGld = totGld*0.5;
	}
	dmgTotal=Math.floor( dmgTotal + $gameParty.gold()*0.05);
	return dmgTotal;
}


/// KELP... KELP. . . . . ..

////KELP!! ! KELP!! ! KELP!!!!

//KELP
//
//
//   KELP
//
//            KELP
//
//                         KELP
//
//                                              KELP MAN
//
//
//                                                        @@@@@@                                                  
//                                                    @@@@****..@@@@@@                                            
//                                                ####**** //((%%****((%%    ######(((                            
//                                              @@********((((((((**((((@@   @******((@                          
//                                              @@@@@@@@@@@@@@((%%%%((((@@     @****((@@                          
//                                ********    @@##@@@@((@@@@((((%%%%((##@@     @##**((@@                          
//                                    ..**((****@@((@@((%%((////%%//((%%%%&&##%%%%**((%%((      ((((              
//                    ****                **((**@@((****%%%%%%%%((((**%%%%((((%%****((@@      @@****@@            
//                      ******              **@@....**%%%%**((((((**%%%%((((%%%%**@@@@      @@********@@          
//                        **((@@      @@    **@@..((%%%%**((##((**((%%@@((((##@@@@@@@@@@  @@****((((**@@          
//                        %%////@@  //&&%%((((%%,,((((((//((@@////((&&@@((%%####** //%%//##**((%%((((@@            
//                        @@**((((@@  @@((((((%%((((**((((@@@@((%%((@     %%((((((**%%%%%%%%((@@@@@@              
//                        @@**..**@@    @@((@@**((**%%((@@    ((%%(    O  ((@@@@@@@@**((((****@@/                  
//                          @@....@@..@@((((//@@##**((##   O  ((%%@       ((((@@@@..&&/////////                    
//                          @@##((**%%((//**&&**@@@@((@@     /*((%%\=====//////&&**  ******** /                      
//                          @@((%%%%((((((((@@@@  @@((@@\====%((@@@@%%%%((##@@  @@@@@@@@@@/                        
//                         @@((((****((((**((@@@@@@@@@@((%%@@@@\/######\/@@@@@@\/******@@/        YOU WILL BECOME KELP                
//            ..@@@@....  **  //**((((((****((//&\/@((@@\/@@#################/\((**,,&/                          
//        ####**&&((%%%%##**##@@((((//**((((/\################/\###/\###/\%%##//%%%*                            
//      @@((((@@@@@@@@((((((((((((....((((((((/\ ####M#/\ ##/\@@@@@@((((@@@@@@                     @@@@          
//    @@@@@@((((((@@@@@@@@((((....**((((@@@@((%%* /\*@/\##((((@@@@((((@@@@          ((((            @@((((@@@@@@    
//..&&((**,,,,****((((####//****((##%%@@@@((((##****** ////@@@@%%##((%%@@@@@@((((////      ....@@@@((((////****@@  
//@@**%%&&((((////,,//((%%%%&&&&%%%%##((//%%%%%%..((&&@@%%((((** ////##%%%%&&&&..      ####%%%%((////((%%%%((&&**  
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
//        &&&&&&##**((****((((**@@      ..@@..      @@**((**((((@@@@..@@((((,,((** ////&&                          
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

function chkKey()
{
	var tot = 0;
	sVr(160,90);
	if(gSw(610)){tot+=1;}
	if(gSw(611)){tot+=1;}
	if(gSw(612)){tot+=1;}
	if(gSw(613)){tot+=1;}
	if(gSw(614)){tot+=1;}
	return tot;
};

///Spriteset and Battler Sprite stuff

function getCurSprite(battlerId = 0){
	const _battler = $gameTroop.members()[battlerId];
	return _battler.battlerName();
};


///Monster Poses
function getCurSprite(battlerId = 0){
	const _battler = $gameTroop.members()[battlerId];
	return _battler.enemy()._battlerName;
};



function monster_AnimateChangeSpr(battlerId = 0,newPose,swapTime=64,swapFlashInterval=8){
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

function monster_Transform(battlerId = 0){
	const _battler = $gameTroop.members()[battlerId];
	
	if(_battler != undefined)
	{
		const _enemy = _battler.enemy();
		if(_enemy.meta.transformOb)
		{
			let oldMaxHp = _enemy.params[0];
			console.log("before it, last fighter: id-"+battlerId+", "+_battler);
			_battler.transform(_enemy.meta.transformOb);
			
			let newMaxHp = $dataEnemies[parseInt(_enemy.meta.transformOb)].params[0];
			
			if(newMaxHp>oldMaxHp)
			{
				_battler.gainHp(newMaxHp-oldMaxHp);
				console.log("Transform healed by: "+(newMaxHp-oldMaxHp)+" HP");
			}
			$gameTroop.makeUniqueNames();
		}
		else
		{
			console.log("Battler "+_battler+" has no transform obj");
		}
	}
};

function monster_MoveClose(battlerId = 0){
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

function monster_MoveFar(battlerId = 0){
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

function monsterImageExists(filename){
    var fs = require ("fs");
    var foundit = fs.existsSync("./img/enemies/" + filename+".png");
    foundit = foundit || fs.existsSync("./img/enemies/" + filename+".png_");
    if(foundit == false){console.log("missing file: "+"./img/" + filename+".png");}
    return foundit;
}

function monster_AltPose(battlerId = 0){
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

function monster_NormPose(battlerId = 0){
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

function monster_disappear(battlerId){
	var target = $gameTroop.members()[battlerId-1];
	target.hide();
}

Game_Enemy.setSineMove = function(sineX,sineY,sineXspd,sineYspd)
{
	const _battler = $gameTroop.members()[battlerId];
}

function monster_ChangeSpr(battlerId = 0,poseName){
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		_battler._battlerName = baseName+"_"+poseName;
	}
};

function monster_Move(battlerId,moveX,moveY,time){
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

function switchBattleBack1(backgrndFile){
	//console.log("Switching BG1 to "+backgrndFile);
	SceneManager._scene._spriteset._back1Sprite.bitmap = ImageManager.loadBattleback1(backgrndFile);
	//SceneManager._scene._spriteset._back1Sprite.adjustPosition();
}

function switchBattleBack2(backgrndFile){
	//console.log("Switching BG2 to "+backgrndFile);
	SceneManager._scene._spriteset._back2Sprite.bitmap = ImageManager.loadBattleback2(backgrndFile);
	//SceneManager._scene._spriteset._back2Sprite.adjustPosition();
}

function monster_AnimateChangeSpr(battlerId = 0,newPose,swapTime=64,swapFlashInterval=8){
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

