//=============================================================================
// RPG Maker MZ - Pixel Perfect scaling
//=============================================================================

/*:
* @plugindesc 1.1.1 Enable pixel perfect scaling mode for your game
* @author Galenmereth / TDD
* @help Optinally add an ingame menu option for your players to turn off or on the pixel perfect mode
* @url https://github.com/TorD/mz-plugins
*
* @param enableIngameOptions
* @text Enable ingame option
* @desc Toggle if you want to display an ingame option for players to turn on/off pixel perfect mode ingame
* @type boolean
* @default false
* 
* @param labels
* @text Ingame option labels
* 
* @param en
* @parent labels
* @text EN - English
* @type text
* @default Pixel Perfect Mode
* 
* @param ja
* @parent labels
* @text JA - Japanese
* @type text
* @default ピクセルパーフェクトモード
* 
* @param zh
* @parent labels
* @text ZH - Chinese
* @type text
* @default 像素完美模式
* 
* @param ko
* @parent labels
* @text KO - Korean
* @type text
* @default 픽셀 퍼펙트 모드
* 
* @param ru
* @parent labels
* @text RU - Russian
* @type text
* @default Режим Pixel Perfect
*/

/*:ja
* @target MZ
* @plugindesc ゲームのピクセルパーフェクトスケーリングモードを有効にする
* @author Galenmereth / TDD
* @help プレーヤーがピクセルパーフェクトモードをオフまたはオンにするためのゲーム内メニューオプションを最適に追加します
* @url https://github.com/TorD/mz-plugins
*
* @param enableIngameOptions
* @text ゲーム内オプションを有効にする
* @desc プレーヤーがゲーム内でPixelPerfectモードをオン/オフするためのゲーム内オプションを表示する場合は切り替えます
* @type boolean
* @default false
* 
* @param labels
* @text ゲーム内オプションラベル
* 
* @param en
* @parent labels
* @text EN - 英語
* @type text
* @default Pixel Perfect Mode
* 
* @param ja
* @parent labels
* @text JP - 日本
* @type text
* @default ピクセルパーフェクトモード
* 
* @param zh
* @parent labels
* @text ZH - 中国語
* @type text
* @default 像素完美模式
* 
* @param ko
* @parent labels
* @text KO - 韓国語
* @type text
* @default 픽셀 퍼펙트 모드
* 
* @param ru
* @parent labels
* @text RU - ロシア
* @type text
* @default Режим Pixel Perfect
*/

/*
MIT License

Copyright (c) 2021 Tor Damian Design

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(() => {
	'use strict';

	////////////////////////////////////////////////////////////////////////
	// Fetch parameters
	////////////////////////////////////////////////////////////////////////
	const script = document.currentScript;
	let name = script.src.split('/');
	name = name[name.length-1].replace('.js','');

    const params = PluginManager.parameters(name);

	function usePixelPerfectMode() {
		return params.enableIngameOptions == "false" || ConfigManager.TDDP_pixelPerfectMode == true;
	}

	////////////////////////////////////////////////////////////////////////
	// Bitmap extensions
	///////////////////////////////////////////////////////////////////////
	const _Bitmap_prototype_initialize = Bitmap.prototype.initialize;
	Bitmap.prototype.initialize = function(width, height) {
		_Bitmap_prototype_initialize.call(this, width, height);
		this._smooth = !usePixelPerfectMode();
	}

	////////////////////////////////////////////////////////////////////////
	// Graphics extensions
	///////////////////////////////////////////////////////////////////////
	const _Graphics__createCanvas = Graphics._createCanvas;
	Graphics._createCanvas = function() {
		_Graphics__createCanvas.call(this);
		this.TDDP_updateCanvasImageRenderingMode();
	}

	const _Graphics__updateCanvas = Graphics._updateCanvas;
	Graphics._updateCanvas = function() {
		_Graphics__updateCanvas.call(this);
		this.TDDP_updateCanvasImageRenderingMode();
	};

	// NEW
	Graphics.TDDP_updateCanvasImageRenderingMode = function() {
		this._canvas.style.imageRendering = usePixelPerfectMode() ? 'pixelated' : '';
	}

	if (params.enableIngameOptions == "true") {
		////////////////////////////////////////////////////////////////////////
		// Window_Options extensions - only if ingame options enabled in plugin params
		///////////////////////////////////////////////////////////////////////
		const _Window_Options_prototype_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
		Window_Options.prototype.addGeneralOptions = function() {
			_Window_Options_prototype_addGeneralOptions.call(this);

			let label = params.en; // default is english
			if ($gameSystem.isJapanese()) {
				label = params.ja;
			}
			else if ($gameSystem.isChinese()) {
				label = params.zh;
			}
			else if ($gameSystem.isKorean()) {
				label = params.ko;
			}
			else if ($gameSystem.isRussian()) {
				label = params.ru;
			}

			this.addCommand(label, "TDDP_pixelPerfectMode");
		};

		const _Window_Options_prototype_setConfigValue = Window_Options.prototype.setConfigValue;
		Window_Options.prototype.setConfigValue = function(symbol, volume) {
			_Window_Options_prototype_setConfigValue.call(this, symbol, volume);
			
			if (symbol == 'TDDP_pixelPerfectMode') Graphics.TDDP_updateCanvasImageRenderingMode();
		};

		////////////////////////////////////////////////////////////////////////
		// ConfigManager extensions - only if ingame options enabled in plugin params
		///////////////////////////////////////////////////////////////////////
		const _ConfigManager_makeData = ConfigManager.makeData;
		ConfigManager.makeData = function() {
			const config = _ConfigManager_makeData.call(this);
			config.TDDP_pixelPerfectMode = this.TDDP_pixelPerfectMode;
			return config
		}
		
		const _ConfigManager_applyData = ConfigManager.applyData;
		ConfigManager.applyData = function(config) {
			_ConfigManager_applyData.call(this, config);
			this.TDDP_pixelPerfectMode = this.readFlag(config, "TDDP_pixelPerfectMode", true);
		}
	}
})();