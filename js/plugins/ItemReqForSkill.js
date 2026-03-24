//=============================================================================
// Item Requirement for Skill (v1.0)
//   by LeonMillan
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Item Requirement for Skill
 * @author LeonMillan
 *
 * @help LM_ItemForSkill.js
 *
 * Add to the skill Note:
 *      <WithItemId:123>        Item required for skill
 *      <RemoveWithItem>        Remove required item when skill is used
 */

/*:ja
 * @target MZ
 * @plugindesc スキルの必須アイテム
 * @author LeonMillan
 *
 * @help LM_ItemForSkill.js
 *
 * スキルのメモに加えます:
 *      <WithItemId:123>        スキルの必須アイテム
 *      <RemoveWithItem>        スキル使用後に必須アイテムを費やす
 */

(function() {
    const PLUGIN_NAME = "LM_ItemForSkill";

    const _Game_Actor__skills = Game_Actor.prototype.skills;
    Game_Actor.prototype.skills = function () {
        const list = _Game_Actor__skills.call(this);
    
        const filteredList = list.filter(function(skill) {
			var allowFilter = true;
			if(skill.meta["WithItemId"])
            {
				var itemId = Number(skill.meta["WithItemId"]);
				if(itemId == 9999){itemId = gVr(938);}
				if (!Number.isNaN(itemId) && $dataItems[itemId])
				{
					if(!$gameParty.hasItem($dataItems[itemId], true)){allowFilter = false;}else{allowFilter = true;}
				}
			}
			if(skill.meta["RemoveWithoutState1"])
			{
				const stateId = parseInt(skill.meta["RemoveWithoutState1"]);
				if(!this.isStateAffected(stateId)){allowFilter = false;}
			}
			if(skill.meta["RemoveWithoutState2"])
			{
				const stateId = parseInt(skill.meta["RemoveWithoutState2"]);
				if(!this.isStateAffected(stateId)){allowFilter = false;}
			}
			if(skill.meta["RemoveWithState1"])
			{
				const stateId = parseInt(skill.meta["RemoveWithState1"]);
				if(this.isStateAffected(stateId)){allowFilter = false;}
			}
			if(skill.meta["RemoveWithState2"])
			{
				const stateId = parseInt(skill.meta["RemoveWithState2"]);
				if(this.isStateAffected(stateId)){allowFilter = false;}
			}
			return allowFilter;
        },this);
        
        return filteredList;
    };

    const _Game_Actor__paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function (skill) {
		_Game_Actor__paySkillCost.call(this, skill);
        
		const hpCostChk = this.skillHpCost(skill);
		if (this._hp > hpCostChk) {
		  this._hp -= hpCostChk;
		} else {
		  this._hp = 1;
		}
		
		if (skill.meta["RemoveWithItem"]) {
            const itemId = Number(skill.meta["WithItemId"]);
            if (Number.isNaN(itemId) || !$dataItems[itemId]) return;
            $gameParty.loseItem($dataItems[itemId], 1);
        }
    };
})();
