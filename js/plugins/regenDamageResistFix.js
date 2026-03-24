

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
		//BUGFIX: REGEN DAMAGE RESIST
		if (value >0)
		{
			this.hpRegenMessage="регенерирует...";
		}else{
			this.hpRegenMessage="";
			this.isStateAffected(4)?this.hpRegenMessage=this.hpRegenMessage+"ЯД!" :null ;
			this.isStateAffected(11)?this.hpRegenMessage=this.hpRegenMessage+"КРОВОТЕЧЕНИЕ..." :null ;
			this.isStateAffected(12)?this.hpRegenMessage=this.hpRegenMessage+"КРОВОТЕЧЕНИЕ." :null ;
			this.isStateAffected(13)?this.hpRegenMessage=this.hpRegenMessage+"КРОВОТЕЧЕНИЕ!" :null ;
			this.isStateAffected(16)?this.hpRegenMessage=this.hpRegenMessage+"ОГОНЬ!" :null ;
			this.isStateAffected(47)?this.hpRegenMessage=this.hpRegenMessage+"ГОЛОД!" :null ;
			this.isStateAffected(57)?this.hpRegenMessage=this.hpRegenMessage+"СПОРЫ!" :null ;
			this.isStateAffected(58)?this.hpRegenMessage=this.hpRegenMessage+"WRAP! " :null ;
			this.isStateAffected(118)?this.hpRegenMessage=this.hpRegenMessage+"ТОШНОТА!" :null ;
			this.isStateAffected(122)?this.hpRegenMessage=this.hpRegenMessage+"МОШ!" :null ;
			this.isStateAffected(170)?this.hpRegenMessage=this.hpRegenMessage+"РОЙ..." :null ;
			this.isStateAffected(171)?this.hpRegenMessage=this.hpRegenMessage+"РОЙ." :null ;
			this.isStateAffected(172)?this.hpRegenMessage=this.hpRegenMessage+"РОЙ!" :null ;
			
			if (this.hpRegenMessage=="")
			{
				this.hpRegenMessage="УРОН!"
			}
		}
    }
};

;void (function() {  // private scope
'use strict';
  const alias = Sprite_Damage.prototype.setup;
  Sprite_Damage.prototype.setup = function(target) {
	  
	
	//BUGFIX: REGEN DAMAGE RESIST
	if (target.hpRegenMessage) {
		
		//since this happens in onTurnEnd, regen happens after all the skills finish processing.
		//regen doesn't inflict a skill but does pop up a damage sprite.  
		//Hence, the battlemanager's current skill and the target's current result will reflect what happened in the preceding turn.
		//To prevent it randomly saying it resists poison or regen
		//we have special logic set when we start regen in order to remove the damage message
		const h = this.fontSize();
		const w = Math.floor(h * 6.0);
		const sprite = this.createChildSprite(w, h);
		sprite.bitmap.drawText(target.hpRegenMessage, 0, 0, w, h, "center");
		sprite.dy = 0;
		sprite.shiftY = -35;
		// do the usual thing and skip weaknesses
		alias.apply(this, arguments);
		target.hpRegenMessage=false;
		return;
	}
	  
    const result = target.result();
	if (!result.missed && !result.evaded) {
    // then check for additional crit effect trigger
		if (BattleManager._action.calcElementRate(target) < 1) {
			const h = this.fontSize();
			const w = Math.floor(h * 6.0);
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText("СОПРОТИВЛЕНИЕ!", 0, 0, w, h, "center");
			sprite.dy = 0;
			sprite.shiftY = -35;
		}
		if (BattleManager._action.calcElementRate(target) > 1) {
			const h = this.fontSize();
			const w = Math.floor(h * 12.0);
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText("СЛАБОСТЬ!", 0, 0, w, h, "center");
			sprite.dy = 0;
			sprite.shiftY = -35;
		}
	}
	// do the usual thing
    alias.apply(this, arguments);
  };
})();