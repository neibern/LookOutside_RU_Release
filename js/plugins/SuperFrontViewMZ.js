// SuperFrontViewMZ.js Ver.2.4.0
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc Enhances the production of front view battle.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/486192572.html
* @help Ver.2.4.0
* Animation can be displayed on the front view actor.
* Some settings also apply to side view.
*
* @param controlAnimation
* @text Control Animation
* @desc This plugin controls the animation display position of the front view.
* @type boolean
* @default true
*
* @param window
* @text Window Settings
* @desc Make window settings.
* @type struct<window>
* @default {"variablePosition":"false","autoStatusWidth":"true","maxWidth":"192","frameVisible":"false","backSpriteVisible":"true","noBackGround":"false","noBackGroundRect":"false","mixSkillTypes":"false"}
*
* @param actor
* @text Actor Settings
* @desc Make settings for actors.
* @type struct<actor>
* @default {"nonFrameFaceHeight":"false","stateSprite":"false","stateSpriteX":"0","stateSpriteY":"0","stepForward":"false","extraMotion":"false","whiten":"true","selectionEffect":"false","damageEffect":"blink","damageOffsetY":"-32","collapseEffect":"flashy","amplitude":"4","randomShake":"false","enableMirror":"false"}
*
* @param enemy
* @text Enemy Settings
* @desc Make settings for enemies.
* @type struct<enemy>
* @default {"stepForward":"false","extraMotion":"false","whiten":"true","damageEffect":"blink","amplitude":"4","randomShake":"false","collapseEffect":"flashy"}
*
*/

/*~struct~window:
*
* @param variablePosition
* @text Variable Position
* @desc Change the status position according to the number of party members.
* @type boolean
* @default false
*
* @param autoStatusWidth
* @text Auto Status Width
* @desc Automatically calculates the status width.
* Affects gauge width.
* @type boolean
* @default true
*
* @param maxWidth
* @text Maximum Width
* @desc Limits the status width to no more than the specified number.Disabled with 0.
* @type number
* @default 192
*
* @param frameVisible
* @text Frame Visible
* @desc Show window frame.
* @type boolean
* @default false
*
* @param backSpriteVisible
* @text Back Sprite Visible
* @desc Show background sprites for the window.
* @type boolean
* @default true
*
* @param noBackGround
* @text No BackGround
* @desc Make the status window transparent.
* @type boolean
* @default false
*
* @param noBackGroundRect
* @text No Background Rect
* @desc Do not draw the status background rectangle.
* @type boolean
* @default false
*
* @param mixSkillTypes
* @text Mix Skill Types
* @desc Mix skill commands into one.
* @default false
* @type boolean
*
*/

/*~struct~actor:
*
* @param nonFrameFaceHeight
* @text Face Image Height Release
* @desc Draw all the top and bottom of the face image.
* @type boolean
* @default false
*
* @param stateSprite
* @text State Sprite
* @desc Show the state overlay.
* @type boolean
* @default false
*
* @param stateSpriteX
* @text State X
* @desc Shift the position by the specified number.
* @type number
* @default 0
* @min -9999
*
* @param stateSpriteY
* @text State Y
* @desc Shift the position by the specified number.
* @type number
* @default 0
* @min -9999
*
* @param stepForward
* @text Step Forward
* @desc Moves the actor forward when acting.
* @type boolean
* @default false
*
* @param extraMotion
* @text Extra Motion
* @desc The actor moves when evading or counterattacking.
* @type boolean
* @default false
*
* @param whiten
* @text Whiten
* @desc Makes the actor white when acting.
* @type boolean
* @default true
*
* @param selectionEffect
* @text Selection Effect
* @desc Makes the selected actor blink.
* @type boolean
* @default false
*
* @param damageEffect
* @text Damage Effect
* @desc The behavior of the actor when receiving damage.
* @type select
* @default blink
* @option Blink
* @value blink
* @option Shake
* @value shake
* @option Shake And Flash
* @value shakeAndFlash
* @option None
* @value null
*
* @param amplitude
* @text Amplitude
* @desc Amplitude when the damage effect is Shake.
* @type number
* @default 4
* @min -99999999
*
* @param randomShake
* @text Random Shake
* @desc If the damage effect is Shake, shake violently.
* @type boolean
* @default false
*
* @param damageOffsetY
* @text Damage Offset Y
* @desc Shifts the position of the damage popup by the specified amount.
* @type number
* @default -32
* @min -9999
*
* @param collapseEffect
* @text Collapse Effect
* @desc Disappears the actor on death.
* @type select
* @option Flashy
* @value flashy
* @option Plain
* @value plain
* @option None
* @value disable
* @default flashy
* 
* @param enableMirror
* @text Reverse Animation
* @desc Reverses the animation horizontally.
* @type boolean
* @default false
*
*/

/*~struct~enemy:
*
* @param stepForward
* @text Step Forward
* @desc Moves the enemy forward when acting.
* @type boolean
* @default false
*
* @param extraMotion
* @text Extra Motion
* @desc The enemy moves when evading or counterattacking.
* @type boolean
* @default false
*
* @param whiten
* @text Whiten
* @desc Makes the enemy white when acting.
* @type boolean
* @default true
*
* @param damageEffect
* @text Damage Effect
* @desc The behavior of the enemy when receiving damage.
* @type select
* @default blink
* @option Blink
* @value blink
* @option Shake
* @value shake
* @option Shake And Flash
* @value shakeAndFlash
* @option None
* @value null
*
* @param amplitude
* @text Amplitude
* @desc Amplitude when the damage effect is Shake.
* @type number
* @default 4
* @min -99999999
*
* @param randomShake
* @text Random Shake
* @desc If the damage effect is Shake, shake violently.
* @type boolean
* @default false
*
* @param collapseEffect
* @text Collapse Effect
* @desc Disappears the enemy on death.
* @type select
* @option Flashy
* @value flashy
* @option Plain
* @value plain
* @default flashy
*
*/
/*:ja
* @target MZ
* @plugindesc フロントビュー戦闘の演出を強化します。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/486192572.html
* @help フロントビューのアクターにアニメーションを表示させる事が出来ます。
* 一部の設定はサイドビューにも適用されます。
*
* [更新履歴]
* 2022/03/28：Ver.1.0.0　公開
* 2022/03/28：Ver.1.0.1　ステート重ね合わせの位置をずらせるようにしました。
* 2022/04/04：Ver.1.0.2　競合を減らす処理を追加。パラメータにポップアップのY座標調整機能を追加。
* 2022/04/06：Ver.1.1.0　ダメージエフェクトにシェイクを追加。エネミーも行動時前進可能に。
* 2022/04/06：Ver.1.1.1　回避モーション、反撃モーションを追加。
* 2022/09/22：Ver.2.0.0　メンバー入れ替え時のバグ修正。ビットマップサイズの修正。
* 2022/09/22：Ver.2.0.1　ビットマップサイズの算出タイミングを修正。
* 2022/10/21：Ver.2.1.0　ダメージエフェクトにランダムシェイクを追加。シェイクのバグを修正。
* 2022/10/21：Ver.2.1.1　シェイクの算出をMath.floorからMath.truncに変更。
* 2023/06/11：Ver.2.2.0　実装の改善。
* 2023/07/04：Ver.2.3.0　実装の改善。アクターコマンドのスキルを一纏めにする機能を追加。
* 2023/07/26：Ver.2.4.0　顔画像を切り替えるプラグインに対応。
*
* @param controlAnimation
* @text アニメーションの制御
* @desc フロントビューのアニメーション表示位置をこのプラグインが制御します。
* @type boolean
* @default true
*
* @param window
* @text ウィンドウ設定
* @desc ウィンドウに関する設定を行います。
* @type struct<window>
* @default {"variablePosition":"false","autoStatusWidth":"true","maxWidth":"192","frameVisible":"false","backSpriteVisible":"true","noBackGround":"false","noBackGroundRect":"false","mixSkillTypes":"false"}
*
* @param actor
* @text アクター設定
* @desc アクターに関する設定を行います。
* @type struct<actor>
* @default {"nonFrameFaceHeight":"false","stateSprite":"false","stateSpriteX":"0","stateSpriteY":"0","stepForward":"false","extraMotion":"false","whiten":"true","selectionEffect":"false","damageEffect":"blink","damageOffsetY":"-32","collapseEffect":"flashy","amplitude":"4","randomShake":"false","enableMirror":"false"}
*
* @param enemy
* @text エネミー設定
* @desc エネミーに関する設定を行います。
* @type struct<enemy>
* @default {"stepForward":"false","extraMotion":"false","whiten":"true","damageEffect":"blink","amplitude":"4","randomShake":"false","collapseEffect":"flashy"}
*
*/

/*~struct~window:ja
*
* @param variablePosition
* @text 可変位置
* @desc ステータス位置をパーティメンバー数に応じて変化させます。
* @type boolean
* @default false
*
* @param autoStatusWidth
* @text ステータス幅自動計算
* @desc ステータス幅を自動で算出します。
* ゲージ幅に影響します。
* @type boolean
* @default true
*
* @param maxWidth
* @text 最大幅
* @desc ステータス幅を指定した数値以上大きくならないように制限します。0で無効化。
* @type number
* @default 192
*
* @param frameVisible
* @text フレーム可視化
* @desc ウィンドウのフレームを表示します。
* @type boolean
* @default false
*
* @param backSpriteVisible
* @text 背景スプライト可視化
* @desc ウィンドウの背景スプライトを表示します。
* @type boolean
* @default true
*
* @param noBackGround
* @text 背景無し
* @desc ステータスウィンドウを透明にします。
* @type boolean
* @default false
*
* @param noBackGroundRect
* @text 背景矩形無し
* @desc ステータス背景の矩形を描画しません。
* @type boolean
* @default false
*
* @param mixSkillTypes
* @text スキルタイプ混合
* @desc スキルコマンドを一つにまとめます。
* @default false
* @type boolean
*
*/

/*~struct~actor:ja
*
* @param nonFrameFaceHeight
* @text 顔画像高さ解放
* @desc 顔画像の上下を全て描画します。
* @type boolean
* @default false
*
* @param stateSprite
* @text ステートスプライト
* @desc ステート異常時の重ね合わせを表示します。
* @type boolean
* @default false
*
* @param stateSpriteX
* @text ステートX
* @desc 指定した数だけ位置をずらせます。
* @type number
* @default 0
* @min -9999
*
* @param stateSpriteY
* @text ステートY
* @desc 指定した数だけ位置をずらせます。
* @type number
* @default 0
* @min -9999
*
* @param stepForward
* @text 前進
* @desc 行動時にアクターを前進させます。
* @type boolean
* @default false
*
* @param extraMotion
* @text さらなるモーション
* @desc 回避時、反撃時にアクターが動きます。
* @type boolean
* @default false
*
* @param whiten
* @text 漂白
* @desc 行動時にアクターを白くします。
* @type boolean
* @default true
*
* @param selectionEffect
* @text 選択エフェクト
* @desc 選択中のアクターを点滅させます。
* @type boolean
* @default false
*
* @param damageEffect
* @text ダメージエフェクト
* @desc 被ダメージ時のアクターの挙動です。
* @type select
* @default blink
* @option 点滅
* @value blink
* @option シェイク
* @value shake
* @option シェイクとフラッシュ
* @value shakeAndFlash
* @option なし
* @value null
*
* @param amplitude
* @text 振幅
* @desc ダメージエフェクトがシェイクの場合の振幅。
* @type number
* @default 4
* @min -99999999
*
* @param randomShake
* @text ランダムシェイク
* @desc ダメージエフェクトがシェイクの場合、ガタガタに揺れます。
* @type boolean
* @default false
*
* @param damageOffsetY
* @text ダメージオフセットY
* @desc 指定した数だけダメージポップアップの位置をずらせます。
* @type number
* @default -32
* @min -9999
*
* @param collapseEffect
* @text 消滅エフェクト
* @desc 戦闘不能時にアクターを消滅させます。
* @type select
* @option 派手
* @value flashy
* @option 地味
* @value plain
* @option 無効
* @value disable
* @default flashy
* 
* @param enableMirror
* @text アニメーション反転
* @desc アニメーションを左右反転して表示します。
* @type boolean
* @default false
*
*/

/*~struct~enemy:ja
*
* @param stepForward
* @text 前進
* @desc 行動時にエネミーを前進させます。
* @type boolean
* @default false
*
* @param extraMotion
* @text さらなるモーション
* @desc 回避時、反撃時にエネミーが動きます。
* @type boolean
* @default false
*
* @param whiten
* @text 漂白
* @desc 行動時にエネミーを白くします。
* @type boolean
* @default true
*
* @param damageEffect
* @text ダメージエフェクト
* @desc 被ダメージ時のエネミーの挙動です。
* @type select
* @default blink
* @option 点滅
* @value blink
* @option シェイク
* @value shake
* @option シェイクとフラッシュ
* @value shakeAndFlash
* @option なし
* @value null
*
* @param amplitude
* @text 振幅
* @desc ダメージエフェクトがシェイクの場合の振幅。
* @type number
* @default 4
* @min -99999999
*
* @param randomShake
* @text ランダムシェイク
* @desc ダメージエフェクトがシェイクの場合、ガタガタに揺れます。
* @type boolean
* @default false
*
* @param collapseEffect
* @text 消滅エフェクト
* @desc 戦闘不能時にエネミーを消滅させるエフェクトの挙動。
* @type select
* @option 派手
* @value flashy
* @option 地味
* @value plain
* @default flashy
*
*/

'use strict';

function Sprite_ActorFV() {
	this.initialize(...arguments);
}

{

	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const parameter = PluginManager.parameters(pluginName);

	const controlAnimation = parameter["controlAnimation"] === "true";

	const windowParam = JSON.parse(parameter["window"]);
	const actorParam = JSON.parse(parameter["actor"]);
	const enemyParam = JSON.parse(parameter["enemy"]);
	//windowParam
	const autoStatusWidth = windowParam["autoStatusWidth"] === "true";
	const maxWidth = Number(windowParam["maxWidth"]);
	const variablePosition = windowParam["variablePosition"] === "true";
	const frameVisible = windowParam["frameVisible"] === "true";
	const backSpriteVisible = windowParam["backSpriteVisible"] === "true";
	const noBackGround = windowParam["noBackGround"] === "true";
	const noBackGroundRect = windowParam["noBackGroundRect"] === "true";
	const mixSkillTypes = windowParam["mixSkillTypes"] === "true";
	//actorParam
	const nonFrameFaceHeight = actorParam["nonFrameFaceHeight"] === "true";
	const stateSprite = actorParam["stateSprite"] === "true";
	const stateSpriteX = Number(actorParam["stateSpriteX"]);
	const stateSpriteY = Number(actorParam["stateSpriteY"]);
	const stepForward = actorParam["stepForward"] === "true";
	const extraMotion = actorParam["extraMotion"] === "true";
	const whiten = actorParam["whiten"] === "true";
	const selectionEffect = actorParam["selectionEffect"] === "true";
	const shakeAndFlash = actorParam["damageEffect"] === "shakeAndFlash";
	const damageEffect = actorParam["damageEffect"] === "null" ? null : shakeAndFlash ? "shake" : actorParam["damageEffect"];
	const damageOffsetY = Number(actorParam["damageOffsetY"]);
	const collapseEffect = actorParam["collapseEffect"] === "disable" ? false : actorParam["collapseEffect"];
	const actorAmp = Number(actorParam["amplitude"]);
	const actorRandomShake = actorParam["randomShake"] === "true";
	const mirrorEnabled = actorParam["enableMirror"] === "true";
	//enemyParam
	const enemyStepForward = enemyParam["stepForward"] === "true";
	const enemyExtraMotion = enemyParam["extraMotion"] === "true";
	const enemyWhiten = enemyParam["whiten"] === "true";
	const enemyShakeAndFlash = enemyParam["damageEffect"] === "shakeAndFlash";
	const enemyDamageEffect = enemyParam["damageEffect"] === "null" ? null : enemyShakeAndFlash ? "shake" : enemyParam["damageEffect"];
	const enemyCollapseEffect = enemyParam["collapseEffect"];
	const enemyAmp = Number(enemyParam["amplitude"]);
	const enemyRandomShake = enemyParam["randomShake"] === "true";

	//-----------------------------------------------------------------------------
	// Game_Battler

	const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
	Game_Battler.prototype.initMembers = function() {
		_Game_Battler_initMembers.call(this);
		this._positionType = null;
	};

	Game_Battler.prototype.clearPosition = function() {
		this._positionType = null;
	};

	Game_Battler.prototype.requestPosition = function(positionType) {
		this._positionType = positionType;
	};

	Game_Battler.prototype.isPositionRequested = function() {
		return !!this._positionType;
	};

	Game_Battler.prototype.positionType = function() {
		return this._positionType;
	};

	//-----------------------------------------------------------------------------
	// Game_Enemy

	Game_Enemy.prototype.isPositionRequested = function() {
		return enemyExtraMotion && Game_Battler.prototype.isPositionRequested.call(this);
	};

	const _Game_Enemy_performActionStart = Game_Enemy.prototype.performActionStart;
	Game_Enemy.prototype.performActionStart = function(action) {
		_Game_Enemy_performActionStart.call(this, action);
		this.requestEffect(enemyWhiten ? "whiten" : null);
	};
	//回避
	const _Game_Enemy_performEvasion = Game_Enemy.prototype.performEvasion;
	Game_Enemy.prototype.performEvasion = function() {
		_Game_Enemy_performEvasion.call(this);
		this.requestPosition("evade");
	};
	//魔法回避
	const _Game_Enemy_performMagicEvasion = Game_Enemy.prototype.performMagicEvasion;
	Game_Enemy.prototype.performMagicEvasion = function() {
		_Game_Enemy_performMagicEvasion.call(this);
		this.requestPosition("evade");
	};
	//カウンター
	const _Game_Enemy_performCounter = Game_Enemy.prototype.performCounter;
	Game_Enemy.prototype.performCounter = function() {
		_Game_Enemy_performCounter.call(this);
		this.requestPosition("counter");
	};

	const _Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
	Game_Enemy.prototype.performDamage = function() {
		_Game_Enemy_performDamage.call(this);
		this.requestEffect(enemyDamageEffect);
	};
	
	//-----------------------------------------------------------------------------
	// Sprite_Enemy

	Sprite_Enemy.POSITIONS = {
		counter: { x: 0, y: 18, speed: 4 },
		evade: { x: -18, y: 0, speed: 4 }
	};

	Sprite_Enemy.POSITIONS_SV = {
		counter: { x: 18, y: 0, speed: 4 },
		evade: { x: 0, y: 18, speed: 4 }
	};

	const _Sprite_Enemy_updateMain = Sprite_Enemy.prototype.updateMain;
	Sprite_Enemy.prototype.updateMain = function() {
		_Sprite_Enemy_updateMain.call(this);
		if (enemyStepForward && this._enemy.isSpriteVisible() && !this.isMoving()) {
			this.updateTargetPosition();
		}
	};

	Sprite_Enemy.prototype.setupPosition = function() {
		if (this._enemy.isPositionRequested()) {
			const positionType = this._enemy.positionType();
			const pos = $gameSystem.isSideView() ? Sprite_Enemy.POSITIONS_SV[positionType] : Sprite_Enemy.POSITIONS[positionType];
			let x = pos.x;
			let y = pos.y;
			if (positionType === "evade") {
				if ($gameSystem.isSideView()) {
					x = this._offsetX;
				} else {
					y = this._offsetY;
				}
			}
			this.startMove(x, y, pos.speed);
			this._enemy.clearPosition();
		}
	};

	Sprite_Enemy.prototype.updateTargetPosition = function() {
		if (this._enemy.isPositionRequested()) {
			this.setupPosition();
		} else if (this.shouldStepForward()) {
			this.stepForward();
		} else if (!this.inHomePosition()) {
			this.stepBack();
		}
	};

	Sprite_Enemy.prototype.shouldStepForward = function() {
		return this._enemy.isActing();
	};

	Sprite_Enemy.prototype.stepForward = function() {
		if ($gameSystem.isSideView()) {
			this.startMove(18, 0, 4);
		} else {
			this.startMove(0, 18, 4);
		}
	};

	Sprite_Enemy.prototype.stepBack = function() {
		this.startMove(0, 0, 4);
	};

	const _Sprite_Enemy_startEffect = Sprite_Enemy.prototype.startEffect;
	Sprite_Enemy.prototype.startEffect = function(effectType) {
		if (effectType === "shake") {
			this.startShake();
		}
		_Sprite_Enemy_startEffect.call(this, effectType);
	};

	const shakeDuration = 16;
	Sprite_Enemy.prototype.startShake = function() {
		this._effectDuration = shakeDuration;
	};

	const _Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
	Sprite_Enemy.prototype.updateEffect = function() {
		const needsUpdate = this._effectDuration > 0;
		const effectType = this._effectType;
		_Sprite_Enemy_updateEffect.call(this);
		if ((needsUpdate || this._effectDuration > 0) && (this._effectType ?? effectType) === "shake") {
			this.updateShake();
		}
	};

	const enemyShakeSpeed = 540/shakeDuration;
	Sprite_Enemy.prototype.updateShake = function() {
		const angle = enemyShakeSpeed * (shakeDuration - this._effectDuration);
		const rad = angle*Math.PI/180;
		this._shake = -Math.trunc(enemyAmp * Math.sin(rad));
		if (enemyShakeAndFlash) {
			const alpha = 128 - (shakeDuration - this._effectDuration) * 8;
			this.setBlendColor([255, 128, 128, alpha]);
		}
	};

	const _Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
	Sprite_Enemy.prototype.updateCollapse = function() {
		_Sprite_Enemy_updateCollapse.call(this);
		if (enemyCollapseEffect === "plain") {
			this.blendMode = 0;
			this.setBlendColor([0, 0, 0, 0]);
		}
	};

	const _Sprite_Enemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
	Sprite_Enemy.prototype.updateBossCollapse = function() {
		_Sprite_Enemy_updateBossCollapse.call(this);
		if (enemyCollapseEffect === "plain") {
			this.blendMode = 0;
			this.setBlendColor([0, 0, 0, 0]);
		}
	};

	const _Sprite_Enemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
	Sprite_Enemy.prototype.updatePosition = function() {
		_Sprite_Enemy_updatePosition.call(this);
		if (this._shake && enemyRandomShake) {
			this.x -= this._shake;
			const rad = Math.random() * 360 / 180 * Math.PI;
			this.x += Math.cos(rad) * this._shake;
			this.y += Math.sin(rad) * this._shake;
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Actor

	Game_Actor.prototype.isPositionRequested = function() {
		return extraMotion && Game_Battler.prototype.isPositionRequested.call(this);
	};
	//フロントビューでもサイドビュー画像を表示
	const _Game_Actor_isSpriteVisible = Game_Actor.prototype.isSpriteVisible;
	Game_Actor.prototype.isSpriteVisible = function() {
		return $gameSystem.isSideView() ? _Game_Actor_isSpriteVisible.call(this) : true;
	};
	//漂白
	const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
	Game_Actor.prototype.performActionStart = function(action) {
		_Game_Actor_performActionStart.call(this, action);
		if (!$gameSystem.isSideView() && whiten) {
			this.requestEffect("whiten");
		}
	};
	//回避
	const _Game_Actor_performEvasion = Game_Actor.prototype.performEvasion;
	Game_Actor.prototype.performEvasion = function() {
		_Game_Actor_performEvasion.call(this);
		this.requestPosition("evade");
	};
	//魔法回避
	const _Game_Actor_performMagicEvasion = Game_Actor.prototype.performMagicEvasion;
	Game_Actor.prototype.performMagicEvasion = function() {
		_Game_Actor_performMagicEvasion.call(this);
		this.requestPosition("evade");
	};
	//カウンター
	const _Game_Actor_performCounter = Game_Actor.prototype.performCounter;
	Game_Actor.prototype.performCounter = function() {
		_Game_Actor_performCounter.call(this);
		this.requestPosition("counter");
	};
	//ダメージエフェクト
	const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
	Game_Actor.prototype.performDamage = function() {
		_Game_Actor_performDamage.call(this);
		if (!$gameSystem.isSideView() && damageEffect) {
			this.requestEffect(damageEffect);
		}
	};
	//消滅エフェクト
	const _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
	Game_Actor.prototype.performCollapse = function() {
		_Game_Actor_performCollapse.call(this);
		if (!$gameSystem.isSideView()) {
			this.requestEffect("collapse");
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_ActorFV

	Sprite_ActorFV.POSITIONS = {
		counter: { x: 0, y: -18, speed: 4 },
		evade: { x: -18, y: 0, speed: 4}
	};
		
	Sprite_ActorFV.prototype = Object.create(Sprite_Actor.prototype);
	Sprite_ActorFV.prototype.constructor = Sprite_ActorFV;

	Sprite_ActorFV.prototype.initMembers = function() {
		Sprite_Actor.prototype.initMembers.call(this);
		this._faceIndex = 0;
		this._appeared = false;
		this._effectType = null;
		this._effectDuration = 0;
		this._shake = 0;
		this._actorSprite = false;
		this._syncSprite = null;
		this._faceRect = new Rectangle();
	};
		
	Sprite_ActorFV.prototype.setupDamagePopup = function() {
		if (this._actorSprite) {
			Sprite_Battler.prototype.setupDamagePopup.call(this);
		}
	};

	//Sprite_Battler
	Sprite_ActorFV.prototype.updateSelectionEffect = function() {
		if (collapseEffect !== "plain") {
			if (selectionEffect) Sprite_Actor.prototype.updateSelectionEffect.call(this);
			return;
		}
		const target = this.mainSprite();
		const collapsed = this.collapsed();
		if (collapsed) {
			target.setBlendColor([0, 0, 0, 128]);
		} else {
			target.setBlendColor([0, 0, 0, 0]);
		}
		if (selectionEffect) {
			if (this._battler.isSelected()) {
				this._selectionEffectCount++;
				if (this._selectionEffectCount % 30 < 15) {
					if (collapsed) {
						target.setBlendColor([0, 0, 0, 64]);
					} else {
						target.setBlendColor([255, 255, 255, 64]);
					}
				}
			} else if (this._selectionEffectCount > 0) {
				this._selectionEffectCount = 0;
			}
		}
	};

	Sprite_ActorFV.prototype.collapsed = function() {
		return !this._appeared && !!this._battler && this._battler.isDead();
	};

	//フロントビュー時に顔画像をサイドビュー画像として読み込む。
	Sprite_ActorFV.prototype.updateBitmap = function() {
		Sprite_Battler.prototype.updateBitmap.call(this);
		const name = this._actor.faceName();
		const index = this._actor.faceIndex();
		if (this._battlerName !== name || this._faceIndex !== index) {
			this._battlerName = name;
			this._faceIndex = index;
			this._mainSprite.bitmap = ImageManager.loadFace(name);
			const rect = this._faceRect;
			this.setFaceFrame(rect.width, rect.height);
		}
	};
	//サイドビュー画像のフレームをセット
	Sprite_ActorFV.prototype.updateFrame = function() {
		Sprite_Battler.prototype.updateFrame.call(this);
		const bitmap = this._mainSprite.bitmap;
		if (bitmap) {
			this.updateFaceFrame();
		}
	};

	Sprite_ActorFV.prototype.setFaceFrame = function(width, height) {
		const actor = this._actor;
		const faceName = actor ? actor.faceName() : "";
		const faceIndex = actor ? actor.faceIndex() : 0;
		const pw = ImageManager.faceWidth;
		const ph = ImageManager.faceHeight;
		const sw = Math.min(width, pw);
		const sh = Math.min(height, ph);
		const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
		const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
		this._faceRect.x = sx;
		this._faceRect.y = sy;
		this._faceRect.width = sw;
		this._faceRect.height = sh;
		this.updateFaceFrame();
	};

	Sprite_ActorFV.prototype.updateFaceFrame = function() {
		const rect = this._faceRect;
		const width = rect.width;
		const height = rect.height;
		const sw = rect.width;
		const sh = rect.height;
		const sx = rect.x;
		const sy = rect.y;
		this._mainSprite.setFrame(sx, sy, sw, sh);
		this.setFrame(0, 0, sw, sh);
	};

	//ステートフキダシ禁止か否か
	Sprite_ActorFV.prototype.createStateSprite = function() {
		Sprite_Actor.prototype.createStateSprite.call(this);
		if (stateSprite) {
			this._stateSprite.move(stateSpriteX, stateSpriteY);
		} else {
			this._stateSprite.hide();
		}
	};
	//ダメージスプライトのX座標ずらしを無効化
	Sprite_ActorFV.prototype.damageOffsetX = function() {
		return Sprite_Battler.prototype.damageOffsetX.call(this);
	};
	//ダメージスプライトのY座標ずらしを追加
	Sprite_ActorFV.prototype.damageOffsetY = function() {
		return Sprite_Battler.prototype.damageOffsetY.call(this) + damageOffsetY;
	};
	//武器非表示
	Sprite_ActorFV.prototype.createWeaponSprite = function() {
		Sprite_Actor.prototype.createWeaponSprite.call(this);
		this._weaponSprite.hide();
	};
	//影非表示1
	Sprite_ActorFV.prototype.createShadowSprite = function() {
		Sprite_Actor.prototype.createShadowSprite.call(this);
		this._shadowSprite.visible = false;
	};
	//影非表示2
	Sprite_ActorFV.prototype.updateShadow = function() {};
	//入場モーションをキャンセル
	Sprite_ActorFV.prototype.startEntryMotion = function() {};
	//退却モーションをしない
	Sprite_ActorFV.prototype.retreat = function() {};
	//初期位置を変更しない。
	Sprite_ActorFV.prototype.moveToStartPosition = function() {};

	Sprite_ActorFV.prototype.setupPosition = function() {
		if (this._actor.isPositionRequested()) {
			const positionType = this._actor.positionType();
			const pos = Sprite_ActorFV.POSITIONS[positionType];
			const x = pos.x;
			let y = pos.y;
			if (positionType === "evade") {
				y = this._offsetY;
			}
			this.startMove(x, y, pos.speed);
			this._actor.clearPosition();
		}
	};

	const _Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
	Sprite_ActorFV.prototype.updateTargetPosition = function() {
		if (this._actor.isPositionRequested()) {
			this.setupPosition();
		} else {
			_Sprite_Actor_updateTargetPosition.call(this);
		}
	};

	Sprite_ActorFV.prototype.shouldStepForward = function() {
		return stepForward && this._actor.isActing();
	};
	//自分のターンになったら前進
	Sprite_ActorFV.prototype.stepForward = function() {
		this.startMove(0, -18, 4);
	};
	//自分のターンが過ぎたら後退
	Sprite_ActorFV.prototype.stepBack = function() {
		this.startMove(0, 0, 4);
	};
	//中心位置を一切変更しない。
	Sprite_ActorFV.prototype.setActorHome = function(index) {};
	Sprite_ActorFV.prototype.updatePosition = function() {
		Sprite_Actor.prototype.updatePosition.call(this);
		this.x += this._shake;
		if (this._shake && actorRandomShake) {
			this.x -= this._shake;
			const rad = Math.random() * 360 / 180 * Math.PI;
			this.x += Math.cos(rad) * this._shake;
			this.y += Math.sin(rad) * this._shake;
		}
	};
	//エフェクトのアップデート（共通）
	Sprite_ActorFV.prototype.update = function() {
		Sprite_Actor.prototype.update.call(this);
		if (this._actor && this._actorSprite) {
			this.updateEffect();
			this.syncEffect();
		}
	};

	Sprite_ActorFV.prototype.syncEffect = function() {
		if (this._syncSprite) {
			this._syncSprite._shake = this._shake;
			this._syncSprite.blendMode = this.blendMode;
			this._syncSprite.opacity = this.opacity;
			this._syncSprite.setBlendColor(this._blendColor);
		}
	};

	Sprite_ActorFV.prototype.setupEffect = function() {
		if (this._appeared && this._actor.isEffectRequested()) {
			this.startEffect(this._actor.effectType());
			this._actor.clearEffect();
		}
		if (!this._appeared && this._actor.isAlive()) {
			this.startEffect("appear");
		} else if (this._appeared && this._actor.isHidden()) {
			this.startEffect("disappear");
		}
	};

	Sprite_ActorFV.prototype.startEffect = function(effectType) {
		if (effectType === "shake") {
			this.startShake();
		}
		_Sprite_Enemy_startEffect.call(this, effectType);
	};

	const _Sprite_Enemy_startAppear = Sprite_Enemy.prototype.startAppear;
	Sprite_ActorFV.prototype.startAppear = function() {
		_Sprite_Enemy_startAppear.call(this);
	};

	const _Sprite_Enemy_startDisappear = Sprite_Enemy.prototype.startDisappear;
	Sprite_ActorFV.prototype.startDisappear = function() {
		_Sprite_Enemy_startDisappear.call(this);
	};

	const _Sprite_Enemy_startWhiten = Sprite_Enemy.prototype.startWhiten;
	Sprite_ActorFV.prototype.startWhiten = function() {
		_Sprite_Enemy_startWhiten.call(this);
	};

	const _Sprite_Enemy_startBlink = Sprite_Enemy.prototype.startBlink;
	Sprite_ActorFV.prototype.startBlink = function() {
		_Sprite_Enemy_startBlink.call(this);
	};

	Sprite_ActorFV.prototype.startShake = function() {
		this._effectDuration = shakeDuration;
	};

	const _Sprite_Enemy_startCollapse = Sprite_Enemy.prototype.startCollapse
	Sprite_ActorFV.prototype.startCollapse = function() {
		_Sprite_Enemy_startCollapse.call(this);
	};

	const _Sprite_Enemy_startBossCollapse = Sprite_Enemy.prototype.startBossCollapse;
	Sprite_ActorFV.prototype.startBossCollapse = function() {
		_Sprite_Enemy_startBossCollapse.call(this);
	};

	const _Sprite_Enemy_startInstantCollapse = Sprite_Enemy.prototype.startInstantCollapse;
	Sprite_ActorFV.prototype.startInstantCollapse = function() {
		_Sprite_Enemy_startInstantCollapse.call(this);
	};

	Sprite_ActorFV.prototype.updateEffect = function() {
		const needsUpdate = this._effectDuration > 0;
		const effectType = this._effectType;
		_Sprite_Enemy_updateEffect.call(this);
		if ((needsUpdate || this._effectDuration > 0) && (this._effectType ?? effectType) === "shake") {
			this.updateShake();
		}
	};

	const _Sprite_Enemy_isEffecting = Sprite_Enemy.prototype.isEffecting;
	Sprite_ActorFV.prototype.isEffecting = function() {
		return _Sprite_Enemy_isEffecting.call(this);
	};

	const _Sprite_Enemy_revertToNormal = Sprite_Enemy.prototype.revertToNormal;
	Sprite_ActorFV.prototype.revertToNormal = function() {
		_Sprite_Enemy_revertToNormal.call(this);
	};

	const _Sprite_Enemy_updateWhiten = Sprite_Enemy.prototype.updateWhiten;
	Sprite_ActorFV.prototype.updateWhiten = function() {
		_Sprite_Enemy_updateWhiten.call(this);
	};

	const _Sprite_Enemy_updateBlink = Sprite_Enemy.prototype.updateBlink;
	Sprite_ActorFV.prototype.updateBlink = function() {
		_Sprite_Enemy_updateBlink.call(this);
	};

	const actorShakeSpeed = 720/shakeDuration;
	Sprite_ActorFV.prototype.updateShake = function() {
		const angle = actorShakeSpeed * (shakeDuration - this._effectDuration);
		const rad = angle*Math.PI/180
		this._shake = -Math.trunc(actorAmp * Math.sin(rad));
		if (shakeAndFlash) {
			const alpha = 128 - (shakeDuration - this._effectDuration) * 8;
			this.setBlendColor([255, 128, 128, alpha]);
		}
	};

	const _Sprite_Enemy_updateAppear = Sprite_Enemy.prototype.updateAppear;
	Sprite_ActorFV.prototype.updateAppear = function() {
		if (!collapseEffect || collapseEffect === "plain") {
			return;
		}
		_Sprite_Enemy_updateAppear.call(this);
	};

	const _Sprite_Enemy_updateDisappear = Sprite_Enemy.prototype.updateDisappear;
	Sprite_ActorFV.prototype.updateDisappear = function() {
		if (!collapseEffect || collapseEffect === "plain") {
			return;
		}
		_Sprite_Enemy_updateDisappear.call(this);
	};

	Sprite_ActorFV.prototype.updateCollapse = function() {
		if (!collapseEffect || collapseEffect === "plain") {
			return;
		}
		_Sprite_Enemy_updateCollapse.call(this);
	};

	Sprite_ActorFV.prototype.updateBossCollapse = function() {
		_Sprite_Enemy_updateBossCollapse.call(this);
	};

	const _Sprite_Enemy_updateInstantCollapse = Sprite_Enemy.prototype.updateInstantCollapse;
	Sprite_ActorFV.prototype.updateInstantCollapse = function() {
		if (!collapseEffect || collapseEffect === "plain") {
			return;
		}
		_Sprite_Enemy_updateInstantCollapse.call(this);
	};
	//ステータス表示とアクター選択のアクターを同期
	const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
	Sprite_ActorFV.prototype.setBattler = function(battler) {
		const lastBattler = this._battler;
		_Sprite_Actor_setBattler.call(this, battler);
		if (this._syncSprite) {
			this._syncSprite.setBattler(battler);
		}
 		if (lastBattler !== battler && battler) {
 			this.setup(battler);
		};
	};

	Sprite_ActorFV.prototype.setup = function(battler) {
		if (battler.isDead()) {
			this.startEffect("disappear");
		} else {
			this.startEffect("appear");
		}
		this._effectDuration = 1;
	};

	//-----------------------------------------------------------------------------
	// Window_BattleSkill

	if (mixSkillTypes) {
		const _Window_BattleSkill_includes = Window_BattleSkill.prototype.includes;
		Window_BattleSkill.prototype.includes = function(item) {
			if (this._stypeId === 0) {
				return !!item;
			}
			return _Window_BattleSkill_includes.call(this, item);
		};
	}

	//-----------------------------------------------------------------------------
	// Window_ActorCommand

	if (mixSkillTypes) {
		Window_ActorCommand.prototype.addSkillCommands = function() {
			this.addCommand(TextManager.skill, "skill", true, 0);
		};
	}

	//-----------------------------------------------------------------------------
	// Window_BattleStatus

	Window_BattleStatus.prototype.initialize = function(rect) {
		Window_StatusBase.prototype.initialize.call(this, rect);
		this._spriteset = SceneManager._scene._spriteset;
		this.openness = 0;
		this._bitmapsReady = 0;
		this.createBattleField();
		this.preparePartyRefresh();
		if (noBackGround) this.opacity = 0;
		this.frameVisible = frameVisible;
		this._backSprite.visible = backSpriteVisible;
	};

	const _Window_BattleStatus_preparePartyRefresh = Window_BattleStatus.prototype.preparePartyRefresh;
	Window_BattleStatus.prototype.preparePartyRefresh = function() {
		if (!$gameSystem.isSideView()) {
			const actorSprites = this._spriteset._actorSprites;
			for (let i = 0; i < actorSprites.length; i++) {
				actorSprites[i].hide();
			}
		}
		_Window_BattleStatus_preparePartyRefresh.call(this);
	};

	Window_BattleStatus.prototype.createBattleField = function() {
		if ($gameSystem.isSideView()) return;
		this.createBattleFieldSprite();
		this.createActorSprites();
	};

	Window_BattleStatus.prototype.createBattleFieldSprite = function() {
		const rect = this.innerRect;
		const sprite = new Sprite();
		this.addChild(sprite);
		this._battleField = sprite;
		sprite.move(rect.x, rect.y);
	};

	const _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
	Window_BattleStatus.prototype.update = function() {
		_Window_BattleStatus_update.call(this);
		this.updateBattleField();
	};

	Window_BattleStatus.prototype.updateBattleField = function() {
		if (!this._battleField) return;
		this._battleField.visible = this.isOpen();
	};
		
	const _Window_BattleStatus_itemRect = Window_BattleStatus.prototype.itemRect;
	Window_BattleStatus.prototype.itemRect = function(index) {
		const rect = _Window_BattleStatus_itemRect.call(this, index);
		if (maxWidth) {
			const rectWidth = rect.width;
			rect.width = Math.min(rectWidth, maxWidth);
			rect.x += (rectWidth - rect.width)/2
		}
		return rect;
	};

	const _Window_BattleStatus_extraHeight = Window_BattleStatus.prototype.extraHeight;
	Window_BattleStatus.prototype.extraHeight = function() {
		return frameVisible && $dataSystem.optDisplayTp ? 3 : _Window_BattleStatus_extraHeight.call(this);
	};
	//Window_Selectable
	const _Window_BattleStatus_drawBackgroundRect = Window_BattleStatus.prototype.drawBackgroundRect;
	Window_BattleStatus.prototype.drawBackgroundRect = function(rect) {
		if (!noBackGroundRect) _Window_BattleStatus_drawBackgroundRect.call(this, rect);
	};

	Window_BattleStatus.prototype.createActorSprites = function() {
		for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
			const key = "fv_actor%1".format(i);
			const sprite = this.createInnerSprite(key, Sprite_ActorFV);
			const actorSprites = this._spriteset._actorSprites;
			actorSprites.push(sprite);
			sprite._actorSprite = true;
		}
	};
	//顔画像の設置
	Window_BattleStatus.prototype.placeActorFace = function(actor, x, y, width, height) {
		const sprite = this._additionalSprites["fv_actor%1".format(actor.index())];
		sprite.setHome(x+width/2, y+height);
		sprite.setFaceFrame(width, height);
		sprite.show();
	};

	const _Window_BattleStatus_faceRect = Window_BattleStatus.prototype.faceRect;
	Window_BattleStatus.prototype.faceRect = function(index) {
		const rect = _Window_BattleStatus_faceRect.call(this, index);
		if (!$gameSystem.isSideView() && nonFrameFaceHeight) {
			rect.y -= Math.round((ImageManager.faceHeight - rect.height)/2);
			rect.height = ImageManager.faceHeight;
		}
		return rect;
	};

	if (autoStatusWidth) {
		Window_BattleStatus.prototype.placeActorName = function(actor, x, y) {
			const key = "actor%1-name".format(actor.actorId());
			const sprite = this.createInnerSprite(key, Sprite_BattleStatusName);
			sprite.setup(actor);
			sprite.move(x, y);
			const rect = this.itemRectWithPadding(0);
			sprite.resize(rect.width + 2);
			sprite.show();
		};

		Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
			const key = "actor%1-gauge-%2".format(actor.actorId(), type);
			const sprite = this.createInnerSprite(key, Sprite_BattleStatusGauge);
			sprite.setup(actor, type);
			sprite.move(x, y);
			const rect = this.itemRectWithPadding(0);
			sprite.resize(rect.width + 2);
			sprite.show();
		};
	}
	//はみ出し有効か。
	const _Window_BattleStatus_addInnerChild = Window_BattleStatus.prototype.addInnerChild;
	Window_BattleStatus.prototype.addInnerChild = function(child) {
		return $gameSystem.isSideView() ? _Window_BattleStatus_addInnerChild.call(this, child) : this._battleField.addChild(child);
	};

	//デフォルトの顔画像は表示しない。
	const _Window_BattleStatus_drawItemImage = Window_BattleStatus.prototype.drawItemImage;
	Window_BattleStatus.prototype.drawItemImage = function(index) {
		if ($gameSystem.isSideView()) {
			_Window_BattleStatus_drawItemImage.call(this, index);
			return;
		}
		const rect = this.faceRect(index);
		const actor = this.actor(index);
		this.placeActorFace(actor, rect.x, rect.y, rect.width, rect.height);
	};

	if (variablePosition) {
		Window_BattleStatus.prototype.maxCols = function() {
			return  $gameParty.battleMembers().length;
		};
	}

	//-----------------------------------------------------------------------------
	// Window_BattleActor

	Window_BattleActor.prototype.createActorSprites = function() {
		for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
			const key = "fv_actor%1".format(i);
			const sprite = this.createInnerSprite(key, Sprite_ActorFV);
			const actorSprites = this._spriteset._actorSprites;
			actorSprites[i]._syncSprite = sprite;
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Battle

	const _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
	Scene_Battle.prototype.createStatusWindow = function() {
		_Scene_Battle_createStatusWindow.call(this);
		if (!this._spriteset._frontEffectsContainer) return;
		const container = this._spriteset._frontEffectsContainer;
		this.addChild(container);
	};

	const _Scene_Battle_statusWindowRect = Scene_Battle.prototype.statusWindowRect;
	Scene_Battle.prototype.statusWindowRect = function() {
		const rect = _Scene_Battle_statusWindowRect.call(this);
		if (frameVisible) {
			rect.height = this.windowAreaHeight();
			rect.y = Graphics.boxHeight - rect.height;
		}
		return rect;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle
	//アクター用エフェクトコンテナの準備

	const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
	Spriteset_Battle.prototype.createBattleField = function() {
		_Spriteset_Battle_createBattleField.call(this);
		if (controlAnimation && !$gameSystem.isSideView()) {
			const sprite = new Sprite();
			this._frontEffectsContainer = sprite;
		}
	};
	//アニメーションを反転
	Spriteset_Battle.prototype.animationShouldMirror = function(target) {
		return $gameSystem.isSideView() || mirrorEnabled ? Spriteset_Base.prototype.animationShouldMirror.call(this, target) : false;
	};
	//アクターが対象の場合はウィンドウより前にアニメーションを表示
	Spriteset_Battle.prototype.createAnimationSprite = function(
		targets, animation, mirror, delay
	) {
		const container = this._effectsContainer;
		const animationClass = Sprite_AnimationMV;
		if (this._frontEffectsContainer && targets.some(target => target.isActor && target.isActor())) {
			this._effectsContainer = this._frontEffectsContainer;
			Sprite_AnimationMV = Sprite_AnimationFV;
		}
		Spriteset_Base.prototype.createAnimationSprite.apply(this, arguments);
		this._effectsContainer = container;
		Sprite_AnimationMV = animationClass;
	};

	Spriteset_Battle.prototype.removeAnimation = function(sprite) {
		if (this._frontEffectsContainer) {
			this._frontEffectsContainer.removeChild(sprite);
		}
		Spriteset_Base.prototype.removeAnimation.call(this, sprite);
	};

	//-----------------------------------------------------------------------------
	// Sprite_AnimationMV

	function Sprite_AnimationFV() {
		this.initialize(...arguments);
	}

	Sprite_AnimationFV.prototype = Object.create(Sprite_AnimationMV.prototype);
	Sprite_AnimationFV.prototype.constructor = Sprite_AnimationFV;

	Sprite_AnimationFV.prototype.updatePosition = function() {
		if (this._animation.position === 3) {
			this.x = Graphics.width / 2;
			this.y = Graphics.height / 2;
		} else if (this._targets.length > 0) {
			const target = this._targets[0];
			const position = target.getGlobalPosition();
			this.x = position.x;
			this.y = position.y;
			if (this._animation.position === 0) {
				this.y -= target.height;
			} else if (this._animation.position === 1) {
				this.y -= target.height / 2;
			}
		}
	};

	window.Sprite_AnimationFV = Sprite_AnimationFV;

	//-----------------------------------------------------------------------------
	// Sprite_BattleStatusGauge

	function Sprite_BattleStatusGauge() {
		this.initialize(...arguments);
	}

	Sprite_BattleStatusGauge.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_BattleStatusGauge.prototype.constructor = Sprite_BattleStatusGauge;

	const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
	Sprite_BattleStatusGauge.prototype.initMembers = function() {
		_Sprite_Gauge_initMembers.call(this);
		this._bitmapWidth = _Sprite_Gauge_bitmapWidth.call(this);
	};

	Sprite_BattleStatusGauge.prototype.resize = function(width) {
		this._bitmapWidth = width;
		if (this.bitmap) {
			this.bitmap.destroy();
		}
		this.createBitmap();
		this.redraw();
	};

	const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
	Sprite_BattleStatusGauge.prototype.bitmapWidth = function() {
		return this._bitmapWidth; 
	};

	//-----------------------------------------------------------------------------
	// Sprite_BattleStatusName

	function Sprite_BattleStatusName() {
		this.initialize(...arguments);
	}

	Sprite_BattleStatusName.prototype = Object.create(Sprite_Name.prototype);
	Sprite_BattleStatusName.prototype.constructor = Sprite_BattleStatusName;

	const _Sprite_Name_initMembers = Sprite_Name.prototype.initMembers;
	Sprite_BattleStatusName.prototype.initMembers = function() {
		_Sprite_Name_initMembers.call(this);
		this._bitmapWidth = _Sprite_Name_bitmapWidth.call(this);
	};

	const _Sprite_Name_createBitmap = Sprite_Name.prototype.createBitmap;
	Sprite_BattleStatusName.prototype.createBitmap = function() {
		_Sprite_Name_createBitmap.call(this);
	};

	Sprite_BattleStatusName.prototype.resize = function(width) {
		this._bitmapWidth = width;
		if (this.bitmap) {
			this.bitmap.destroy();
		}
		this.createBitmap();
		this.redraw();
	};

	const _Sprite_Name_bitmapWidth = Sprite_Name.prototype.bitmapWidth;
	Sprite_BattleStatusName.prototype.bitmapWidth = function() {
		return this._bitmapWidth;
	};

	const _Sprite_Name_fontSize = Sprite_Name.prototype.fontSize;
	Sprite_BattleStatusName.prototype.fontSize = function() {
		let fontSize = _Sprite_Name_fontSize.call(this);
		if (frameVisible && $dataSystem.optDisplayTp) {
			fontSize -= 2;
		}
		return fontSize;
	};

}