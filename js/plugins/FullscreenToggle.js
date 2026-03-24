/*:
 * @target MZ
 * @plugindesc Adds an option in the menu to toggle between fullscreen and windowed mode with a fade to black effect.
 * @author KYDSGAME
 * @help This plugin adds an option to the menu to toggle the game between fullscreen and windowed mode with a fade to black effect.
 */

(() => {
    const fadeDuration = 30;  // Duration of fade effect in frames

    // Extend the window options
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand("Во весь экран", "Во весь экран");
    };

    // Define the fullscreen option behavior with fade effect
    const _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
    Window_Options.prototype.getConfigValue = function(symbol) {
        if (symbol === "Во весь экран") {
            return Graphics._isFullScreen();
        }
        return _Window_Options_getConfigValue.call(this, symbol);
    };

    const _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
    Window_Options.prototype.setConfigValue = function(symbol, value) {
        if (symbol === "Во весь экран") {
            this.fadeOutAndToggleFullscreen(value);
        } else {
            _Window_Options_setConfigValue.call(this, symbol, value);
        }
    };

    Window_Options.prototype.fadeOutAndToggleFullscreen = function(value) {
        const scene = SceneManager._scene;
        if (scene) {
            scene.startFadeOut(fadeDuration, false);
            setTimeout(() => {
                if (value) {
                    Graphics._requestFullScreen();
                } else {
                    Graphics._cancelFullScreen();
                }
                setTimeout(() => {
                    scene.startFadeIn(fadeDuration, false);
                    this.refresh();  // Update the options window immediately after fade
                }, fadeDuration * 16.67);  // Duration in milliseconds
            }, fadeDuration * 16.67);  // Convert frames to milliseconds
        }
    };
})();
