(() => {
    const fadeDuration = 30;

   
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand("Во весь экран", "fullscreenToggle");
    };

   
    Object.defineProperty(TextManager, 'statusOn', { get: function() { return "ВКЛ"; }, configurable: true });
    Object.defineProperty(TextManager, 'statusOff', { get: function() { return "ВЫКЛ"; }, configurable: true });

    
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        
        
        if (symbol === "fullscreenToggle" || typeof value === 'boolean') {
            return value ? "ВКЛ" : "ВЫКЛ";
        }
        return _Window_Options_statusText.apply(this, arguments);
    };

    
    const _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
    Window_Options.prototype.getConfigValue = function(symbol) {
        if (symbol === "fullscreenToggle") {
            return Graphics._isFullScreen();
        }
        return _Window_Options_getConfigValue.call(this, symbol);
    };

    const _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
    Window_Options.prototype.setConfigValue = function(symbol, value) {
        if (symbol === "fullscreenToggle") {
            const scene = SceneManager._scene;
            if (scene) {
                scene.startFadeOut(fadeDuration, false);
                setTimeout(() => {
                    if (value) Graphics._requestFullScreen();
                    else Graphics._cancelFullScreen();
                    setTimeout(() => {
                        scene.startFadeIn(fadeDuration, false);
                        this.refresh();
                    }, fadeDuration * 16.67);
                }, fadeDuration * 16.67);
            }
        } else {
            _Window_Options_setConfigValue.call(this, symbol, value);
        }
    };

    
    
    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        _Scene_Boot_onDatabaseLoaded.call(this);
        if ($dataSystem && $dataSystem.terms) {
            $dataSystem.terms.messages.miss = "ПРОМАХ";
        }
    };

    const _Sprite_Damage_createMiss = Sprite_Damage.prototype.createMiss;
    Sprite_Damage.prototype.createMiss = function() {
        _Sprite_Damage_createMiss.call(this);
        const lastChild = this.children[this.children.length - 1];
        if (lastChild) {
            lastChild._text = "ПРОМАХ";
            if (lastChild.bitmap) {
                lastChild.bitmap.clear();
                lastChild.bitmap.drawText("ПРОМАХ", 0, 0, lastChild.bitmap.width, lastChild.bitmap.height, "center");
            }
        }
    };

})();