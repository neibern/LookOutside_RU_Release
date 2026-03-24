//=============================================================================
// Plugin Name: Item Use
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Creates a window that let the player select an item and returns the ID
// Terms of Use: By using this plugin you agree at our ToU (https://drive.google.com/file/d/1lG2Lep2Unme80ghZD7-fA-hPGWKLsiR7/view)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Creates a window that let the player select an item and returns the ID
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 * @param itemSelector
 * @text Standard Item Selector
 * @type struct<itemSelector>
 * @desc Choose what items to show
 * @default {"selectorMode":"mode1","includeEquip":"false","metaTag":"itemeUse"}
 *
 * @param showDesc
 * @text Show item description?
 * @type boolean
 * @desc Do you want to show the description of the items?
 * @default true
 *
 * @param returnMode
 * @text Return Mode
 * @type struct<returnData>
 * @desc Set how the data is returned to RPG Maker MZ
 * @default {"returnMode":"mode1","idVar":"0","catVar":"0","resultSwitch":"0"}
 *
 * @command callItems
 * @text Call Item Use Window
 * @desc Call the window for Item Use
 * 
 * @arg linebreak
 * @text ===Override
 * @default Settings ===
 * @desc Change from default settings, ignore if not
 *
 * @arg itemSelector
 * @text Item Selector
 * @type struct<itemSelectorOverride>
 * @desc Choose what items to show  (Ignore if standard)
 * @default {"selectorMode":"mode0","includeEquip":"mode1","metaTag":""}
 *
 * @arg showDesc
 * @text Show item description?
 * @type select
 * @option Use Plugin Settings
 * @value mode1
 * @option Force Show
 * @value mode2
 * @option Force Hide
 * @value mode3
 * @desc Select how the plugin will return data by default (Ignore if standard)
 * @default mode1
 *
 * @arg returnMode
 * @text Return Mode
 * @type struct<returnDataOverride>
 * @desc Set how the data is returned to RPG Maker MZ  (Ignore if standard)
 * @default {"returnMode":"mode0","idVar":"0","catVar":"0","resultSwitch":"0"}
 *
 * @help WD_ItemUse.js
 *
 * This is a simple plugin that calls a menu showing the items in the inventory
 * based on your preferences, you can choose between:
 *
 * - All Items
 * - All Weapons (including or not including equipped)
 * - All Armors (including or not including equipped)
 * - All Inventory (including or not including equipped)
 * - All kind of inventory objects with the wanted metaTag (including or not including equipped)
 *
 * To tag an item write <WD_Items:name> changing "name" with the wanted metaTag
 * in the item/weapon/armor note field of the editor
 *
 * It's encouraged to set standard values in the plugin parameters,
 * you will be able to change them every time you call the plugin in 
 * the override options
 *
 * There is only 1 plugin command that calls the items selection
 * window, the plugin will return the dedicated switch ON if the 
 * player made a selection or OFF if he cancelled
 * It will also return a dedicated variable for the item ID and 
 * (if selected) another variable for the selected item category 
 * (1 if item, 2 for weapon and 3 for armor)
 *
 * WARNING: VARIABLES AND SWITCH MUST BE SELECTED OR THE PLUGIN 
 * WILL THROW AN ERROR
 * 
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 * //////////////////////////////////////////////////
 * VERSION 1.0:
 * - Initial Release
 * //////////////////////////////////////////////////
 */
/*~struct~itemSelector:
 * @param selectorMode
 * @text Item to show
 * @type select
 * @option Items
 * @value mode1
 * @option Weapons
 * @value mode2
 * @option Armors
 * @value mode3
 * @option Inventory (Item+Weapons+Armors)
 * @value mode4
 * @option MetaTag
 * @value mode5
 * @desc Select how to choose the items to show (can be changed at every call)
 * @default mode1
 *
 * @param includeEquip
 * @text Include Equipped Items?
 * @type boolean
 * @desc Do you want to show also the equipped items?
 * @default false
 *
 * @param metaTag
 * @text text ID Variable
 * @desc In the notes of an item/weapon/armor write <WD_Items:name>.
 * @default 69
 */
/*~struct~itemSelectorOverride:
 * @param selectorMode
 * @text Item to show
 * @type select
 * @option Use standard settings
 * @value mode0
 * @option Items
 * @value mode1
 * @option Weapons
 * @value mode2
 * @option Armors
 * @value mode3
 * @option Inventory (Item+Weapons+Armors)
 * @value mode4
 * @option MetaTag
 * @value mode5
 * @desc Select how to choose the items to show (can be changed at every call)
 * @default mode0
 *
 * @param includeEquip
 * @text Include Equipped Items?
 * @type select
 * @option Use Plugin Settings
 * @value mode1
 * @option Force don't include
 * @value mode2
 * @option Force include
 * @value mode3
 * @desc Do you want to show also the equipped items?
 * @default mode1
 *
 * @param metaTag
 * @text ID Variable
 * @desc Metatag stored in a variable
 * @default 69
 */
/*~struct~returnData:
 * @param returnMode
 * @text How to return data
 * @type select
 * @option Return ID in variable 1, Category in Variable 2
 * @value mode1
 * @option Return only ID (If items are all in the same category)
 * @value mode2
 * @desc Select how the plugin will return data by default (can be changed at every call)
 * @default mode1
 *
 * @param idVar
 * @text ID Variable
 * @type variable
 * @desc The variable that will store the ID (must be selected or the plugin won't return data)
 * @default 0
 *
 * @param catVar
 * @text Category Variable
 * @type variable
 * @desc The variable that will store the Category (must be different from ID, 1 for item, 2 for weapon, 3 for armor)
 * @default 0
 *
 * @param resultSwitch
 * @text Result Switch
 * @type switch
 * @desc The swith that return TRUE if player selected an item or FALSE if pressed cancel (must be selected)
 * @default 0
 */
/*~struct~returnDataOverride:
 * @param returnMode
 * @text How to return data
 * @type select
 * @option Use Plugin Settings
 * @value mode0
 * @option Return ID in variable 1, Category in Variable 2
 * @value mode1
 * @option Return only ID (If items are all in the same category)
 * @value mode2
 * @desc Select how the plugin will return data by default (can be changed at every call)
 * @default mode0
 *
 * @param idVar
 * @text ID Variable
 * @type variable
 * @desc The variable that will store the ID (0 if using Standard Settings)
 * @default 0
 *
 * @param catVar
 * @text Category Variable
 * @type variable
 * @desc The variable that will store the Category (0 if using Standard Settings)
 * @default 0
 *
 * @param resultSwitch
 * @text Result Switch
 * @type switch
 * @desc The swith that return TRUE if player selected an item or FALSE if pressed cancel (0 if using Standard Settings)
 * @default 0
 */
 
 !function () {
  const e = PluginManager.parameters("WD_ItemUse"), t = o(e.itemSelector, "Param"), i = "true" === e.showDesc, a = r(e.returnMode);
  const s = {selectorMode: "mode1", includeEquip: false, metaTag: 0, showDesc: true, returnMode: "mode1", idVar: 0, catVar: 0, resultSwitch: 0};
  let n = [];
  function r(e) {
    let t = JSON.parse(e);
    return t.idVar = parseInt(t.idVar), t.catVar = parseInt(t.catVar), t.resultSwitch = parseInt(t.resultSwitch), t;
  }
  function o(e, t) {
    let i = JSON.parse(e);
    return "Param" === t && (i.includeEquip = "true" === i.includeEquip), i;
  }
  function c(e) {
    const t = e.length;
    let i = 0, a = 0, s = "", n = "Running", r = "Waiting", o = false;
    for (let c = 0; c < t; c++) {
      if ("Waiting" === r) if ("Running" === n) "Running" === n && "\\" !== e[c] || (n = "Locked"); else if ("Locked" === n) if ("Locked" !== n || "V" !== e[c] && "v" !== e[c]) if ("Locked" !== n || "I" !== e[c] && "i" !== e[c]) if ("Locked" !== n || "N" !== e[c] && "n" !== e[c]) if ("Locked" !== n || "P" !== e[c] && "p" !== e[c]) if ("Locked" !== n || "G" !== e[c] && "g" !== e[c]) "Locked" !== n || "C" !== e[c] && "c" !== e[c] ? "Locked" !== n || "{" !== e[c] && "}" !== e[c] && "$" !== e[c] && "." !== e[c] && "|" !== e[c] && "!" !== e[c] && ">" !== e[c] && "<" !== e[c] && "^" !== e[c] ? "Locked" === n && "\\" === e[c] ? (i -= 1, n = "Running") : n = "Locked" !== n || "F" !== e[c] && "f" !== e[c] ? "Running" : "FontPt1" : (i -= 2, n = "Running") : n = "Color"; else {
        i = i - 2 + TextManager.currencyUnit.length, n = "Running";
      } else n = "PartyOrPos"; else n = "Actor"; else n = "Icon"; else n = "Variable"; else "Running" !== n && "Locked" !== n && "FontPt1" !== n && "[" === e[c] ? r = "Running" : n = "PartyOrPos" !== n || "X" !== e[c] && "x" !== e[c] ? "PartyOrPos" !== n || "Y" !== e[c] && "y" !== e[c] ? "FontPt1" !== n || "S" !== e[c] && "s" !== e[c] ? "Running" : "FontSize" : "PosY" : "PosX"; else isNaN(parseInt(e[c])) ? "]" === e[c] && 0 === a || isNaN(parseInt(e[c])) && "]" !== e[c] ? (i -= "PosX" !== n && "PosY" !== n && "FontSize" !== n ? 2 : 3, n = "Running", r = "Waiting", a = 0, s = "") : "]" === e[c] && 0 !== a && (o = true) : (a++, s += e[c]);
      if (o) {
        switch (n) {
          case "Variable":
            i = i - 4 - a + $gameVariables.value(parseInt(s)).toString().length;
            break;
          case "Icon":
            i = i - 4 - a + 2;
            break;
          case "Actor":
            PartyOrPos;
            const e = $dataActors, t = parseInt(s);
            if (t <= e.length - 1 && t > 0) {
              i = i - 4 - a + e[t].name.length;
            } else i = i - 4 - a;
            break;
          case "PartyOrPos":
            const r = $gameParty, o = $dataActors, c = parseInt(s);
            if (c <= o.length - 1 && c > 0 && r._actors.includes(c)) {
              i = i - 4 - a + o[c].name.length;
            } else i = i - 4 - a;
            break;
          case "Color":
            i = i - 4 - a;
            break;
          case "PosX":
          case "PosY":
          case "FontSize":
            i = i - 5 - a;
        }
        n = "Running", r = "Waiting", a = 0, s = "";
      }
    }
    return t + i;
  }
  function d() {
    this.initialize(...arguments);
  }
  function m() {
    this.initialize(...arguments);
  }
  function l() {
    this.initialize(...arguments);
  }
  d.prototype = Object.create(Scene_MenuBase.prototype), d.prototype.constructor = d, d.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  }, d.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this), this.createWdItemWindow(), s.showDesc && this.createWdItemDescWindow();
  }, d.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite, this._backgroundSprite.bitmap = SceneManager.backgroundBitmap(), this.addChild(this._backgroundSprite), this.setBackgroundOpacity(192);
  }, d.prototype.createWdItemWindow = function () {
    const e = this.wdItemWindowRect();
    this._wdItemWindow = new m(e), this._wdItemWindow.setHandler("ok", this.onWdItemOk.bind(this)), this._wdItemWindow.setHandler("cancel", this.onWdItemCancel.bind(this)), this.addWindow(this._wdItemWindow);
  }, d.prototype.wdItemWindowRect = function () {
    const e = 0.2 * Graphics.boxWidth, t = s.showDesc ? 0.2 * Graphics.boxHeight : 0.3 * Graphics.boxHeight, i = 0.6 * Graphics.boxWidth, a = 0.4 * Graphics.boxHeight;
    return new Rectangle(e, t, i, a);
  }, d.prototype.onWdItemOk = function () {
    const e = SceneManager._scene._wdItemWindow.index();
    if (!isNaN(e) && e >= 0) {
      const t = n[e];
      if (0 === s.resultSwitch) throw new Error("WD_ItemUse: There is no result switch selected!");
      if ($gameSwitches.setValue(s.resultSwitch, true), 0 === s.idVar) throw new Error("WD_ItemUse: There is no ID Variable selected!");
      if ($gameVariables.setValue(s.idVar, t.id), "mode1" === s.returnMode) {
        if (0 === s.catVar) throw new Error("WD_ItemUse: There is no Category Variable selected!");
        switch (t.itemCategory) {
          case "Item":
            $gameVariables.setValue(s.catVar, 1);
            break;
          case "Weapon":
            $gameVariables.setValue(s.catVar, 2);
            break;
          case "Armor":
            $gameVariables.setValue(s.catVar, 3);
        }
      }
      this.popScene();
    } else SoundManager.playBuzzer(), this._wdItemWindow.activate();
  }, d.prototype.onWdItemCancel = function () {
    if (SoundManager.playCancel(), 0 === s.resultSwitch) throw new Error("WD_ItemUse: There is no result switch selected!");
    $gameSwitches.setValue(s.resultSwitch, false), this.popScene();
  }, d.prototype.createWdItemDescWindow = function () {
    const e = this.wdItemDescWindowRect();
    this._wdItemDescWindow = new l(e), this.addWindow(this._wdItemDescWindow);
  }, d.prototype.wdItemDescWindowRect = function () {
    const e = 0.2 * Graphics.boxWidth, t = 0.6 * Graphics.boxHeight, i = 0.6 * Graphics.boxWidth, a = 0.2 * Graphics.boxHeight;
    return new Rectangle(e, t, i, a);
  }, SceneManager.Scene_WdItems = d, m.prototype = Object.create(Window_Selectable.prototype), m.prototype.constructor = m, m.prototype.initialize = function (e) {
    Window_Scrollable.prototype.initialize.call(this, e), this.openness = 0, this._index = -1, this._cursorFixed = false, this._cursorAll = false, this._helpWindow = null, this._handlers = {}, this._doubleTouch = false, this._canRepeat = true, function () {
      switch (n = [], s.selectorMode) {
        case "mode1":
          n = JSON.parse(JSON.stringify($gameParty.items()));
          for (let e = 0; e < n.length; e++) n[e].itemCategory = "Item", n[e].itemQuantities = $gameParty.numItems($dataItems[n[e].id]);
          break;
        case "mode2":
          if (n = JSON.parse(JSON.stringify($gameParty.weapons())), s.includeEquip) {
            const e = $gameParty._actors;
            for (let t = 0; t < e.length; t++) {
              const e = $gameParty.members()[t].equips();
              for (const t of e) if (null !== t && null != t && t.wtypeId) {
                const e = JSON.parse(JSON.stringify(t));
                n.push(e);
              }
            }
          }
          for (let e = 0; e < n.length; e++) n[e].itemCategory = "Weapon", n[e].itemQuantities = $gameParty.numItems($dataWeapons[n[e].id]);
          break;
        case "mode3":
          if (n = JSON.parse(JSON.stringify($gameParty.armors())), s.includeEquip) {
            const e = $gameParty._actors;
            for (let t = 0; t < e.length; t++) {
              const e = $gameParty.members()[t].equips();
              for (const t of e) if (null !== t && null != t && t.atypeId) {
                const e = JSON.parse(JSON.stringify(t));
                n.push(e);
              }
            }
          }
          for (let e = 0; e < n.length; e++) n[e].itemCategory = "Armor", n[e].itemQuantities = $gameParty.numItems($dataArmors[n[e].id]);
          break;
        case "mode4":
          if (n = JSON.parse(JSON.stringify($gameParty.allItems())), s.includeEquip) {
            const e = $gameParty._actors;
            for (let t = 0; t < e.length; t++) {
              const e = $gameParty.members()[t].equips();
              for (const t of e) if (null !== t) {
                const e = JSON.parse(JSON.stringify(t));
                n.push(e);
              }
            }
          }
          for (let a = 0; a < n.length; a++) {
            var e, t, i;
            null !== (e = n[a]) && undefined !== e && e.itypeId ? (n[a].itemCategory = "Item", n[a].itemQuantities = $gameParty.numItems($dataItems[n[a].id])) : null !== (t = n[a]) && undefined !== t && t.wtypeId ? (n[a].itemCategory = "Weapon", n[a].itemQuantities = $gameParty.numItems($dataWeapons[n[a].id])) : null !== (i = n[a]) && undefined !== i && i.atypeId && (n[a].itemCategory = "Armor", n[a].itemQuantities = $gameParty.numItems($dataArmors[n[a].id]));
          }
          break;
        case "mode5":
          let a = [];
          a = $gameParty.items();
          for (const e of a) if (e.meta.WD_Items && (e.meta.WD_Items.includes(gVr(s.metaTag)) || e.meta.WD_Items.includes(gVr(s.metaTag - 1)))) {
            const t = JSON.parse(JSON.stringify(e));
            t.itemCategory = "Item", t.itemQuantities = $gameParty.numItems($dataItems[t.id]), n.push(t);
          }
          a = [], a = $gameParty.weapons();
          for (const e of a) if (e.meta.WD_Items && e.meta.WD_Items.includes(gVr(s.metaTag))) {
            const t = JSON.parse(JSON.stringify(e));
            t.itemCategory = "Weapon", t.itemQuantities = $gameParty.numItems($dataWeapons[t.id]), n.push(t);
          }
          a = [], a = $gameParty.armors();
          for (const e of a) if (e.meta.WD_Items && e.meta.WD_Items.includes(gVr(s.metaTag))) {
            const t = JSON.parse(JSON.stringify(e));
            t.itemCategory = "Armor", t.itemQuantities = $gameParty.numItems($dataArmors[t.id]), n.push(t);
          }
          if (s.includeEquip) {
            const e = $gameParty._actors;
            for (let t = 0; t < e.length; t++) {
              const e = $gameParty.members()[t].equips();
              for (const t of e) if(null !== t&& t.meta.WD_Items&& t.meta.WD_Items.includes(gVr(s.metaTag)))
			  {
                const e = JSON.parse(JSON.stringify(t));
                null != e && e.itypeId ? (e.itemCategory = "Item", e.itemQuantities = $gameParty.numItems($dataItems[e.id])) : null != e && e.wtypeId ? (e.itemCategory = "Weapon", e.itemQuantities = $gameParty.numItems($dataWeapons[e.id])) : null != e && e.atypeId && (e.itemCategory = "Armor", e.itemQuantities = $gameParty.numItems($dataArmors[e.id])), n.push(e);
              }
            }
          }
      }
    }(), this.open(), this.paint(), this.activate();
  }, m.prototype.maxItems = function () {
    return n.length;
  }, m.prototype.drawItem = function (e) {
    const t = n[e].iconIndex, i = n[e].name, a = n[e].itemQuantities, s = this.itemRect(e);
    this.drawIcon(t, s.x + 2, s.y + 4), 1 !== a && a ? this.drawTextEx(i + " (x" + a + ")", s.x + 50, s.y, s.width) : this.drawTextEx(i, s.x + 50, s.y, s.width);
  }, m.prototype.update = function () {
    this.processCursorMove(), this.processHandling(), this.processTouch(), Window_Scrollable.prototype.update.call(this), s.showDesc && SceneManager._scene._wdItemDescWindow && SceneManager._scene._wdItemDescWindow.updateDesc();
  }, l.prototype = Object.create(Window_Base.prototype), l.prototype.constructor = l, l.prototype.initialize = function (e) {
    Window_Base.prototype.initialize.call(this, e), this.openness = 0, this.open();
  }, l.prototype.updateDesc = function () {
    const e = 0 !== n.length;
    if (this.contents.clear(), e) {
      const e = SceneManager._scene._wdItemWindow.index();
      if (!isNaN(e) && e >= 0) {
        const t = n[e].description;
        let i, a = true, s = 28;
        const r = this.exTextAligner(t, "center"), o = 10;
        for (; a;) this.fontSize = s, this.contents.fontSize = s, (i = this.textSizeExNoReset(r, s)).width > this.innerWidth - 2 * o || i.height > this.innerHeight ? --s < 10 && (a = false, targetSize = s) : (a = false, targetSize = s);
        const c = (this.innerWidth - i.width) / 2, d = (this.innerHeight - i.height) / 2;
        this.drawTextExSizable(r, c, d, this.innerWidth, targetSize), this.resetFontSettings();
      }
    }
  }, l.prototype.textSizeExNoReset = function (e, t) {
    this.fontSize = t, this.contents.fontSize = t;
    const i = this.createTextState(e, 0, 0, 0);
    return i.drawing = false, this.processAllText(i), {width: i.outputWidth, height: i.outputHeight};
  }, l.prototype.drawTextExSizable = function (e, t, i, a, s) {
    this.fontSize = s, this.contents.fontSize = s;
    const n = this.createTextState(e, t, i, a);
    return this.processAllText(n), n.outputWidth;
  }, l.prototype.exTextAligner = function (e, t) {
    if (e.includes("\n")) {
      const i = e.split("\n");
      let a = 0, s = [];
      for (const e of i) c(e) > a && (a = c(e));
      for (let e = 0; e < i.length; e++) if (c(i[e]) < a) {
        const n = a - c(i[e]);
        switch (t) {
          case "left":
            s.push(i[e]);
            break;
          case "center":
            for (let t = n; t > 0; t--) i[e] = t % 2 == 0 ? i[e] + " " : " " + i[e];
            s.push(i[e]);
            break;
          case "right":
            for (let t = n; t > 0; t--) i[e] = " " + i[e];
            s.push(i[e]);
        }
      } else s.push(i[e]);
      return s.join("\n");
    }
    return e;
  }, PluginManager.registerCommand("WD_ItemUse", "callItems", function (e) {
    SceneManager._scene;
    const n = o(e.itemSelector, "Override"), c = e.showDesc, m = r(e.returnMode);
    switch (n.selectorMode) {
      case "mode0":
        s.selectorMode = t.selectorMode;
        break;
      default:
        s.selectorMode = n.selectorMode;
    }
    switch (n.includeEquip) {
      case "mode1":
        s.includeEquip = t.includeEquip;
        break;
      case "mode2":
        s.includeEquip = false;
        break;
      case "mode3":
        s.includeEquip = true;
    }
    switch (n.metaTag) {
      case "":
        s.metaTag = t.metaTag;
        break;
      default:
        s.metaTag = n.metaTag;
    }
    switch (c) {
      case "mode1":
        s.showDesc = i;
        break;
      case "mode2":
        s.showDesc = true;
        break;
      case "mode3":
        s.showDesc = false;
    }
    switch (m.returnMode) {
      case "mode0":
        s.returnMode = a.returnMode;
        break;
      case "mode1":
        s.returnMode = "mode1";
        break;
      case "mode2":
        s.returnMode = "mode2";
    }
    switch (m.idVar) {
      case 0:
        s.idVar = a.idVar;
        break;
      default:
        s.idVar = m.idVar;
    }
    switch (m.catVar) {
      case 0:
        s.catVar = a.catVar;
        break;
      default:
        s.catVar = m.catVar;
    }
    switch (m.resultSwitch) {
      case 0:
        s.resultSwitch = a.resultSwitch;
        break;
      default:
        s.resultSwitch = m.resultSwitch;
    }
    SceneManager.push(d);
  });
}();
