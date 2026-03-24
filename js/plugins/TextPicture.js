//=============================================================================
// RPG Maker MZ - Text Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays text as a picture.
 * @author Yoji Ojima
 *
 * @help TextPicture.js
 *
 * This plugin provides a command to show text as a picture.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Text Picture".
 *   2. Execute "Show Picture" without specifying an image.
 *
 * @command set
 * @text Set Text Picture
 * @desc Sets text to display as a picture.
 *       After this, execute "Show Picture" without specifying an image.
 *
 * @arg text
 * @type multiline_string
 * @text Text
 * @desc Text to display as a picture.
 *       Control characters are allowed.
 
 * @command setFromVar
 * @text Set Text Picture Var
 * @desc Sets text to display as a picture, from a variable.
 *       After this, execute "Show Picture" without specifying an image.
 *
 * @arg textVar
 * @type number
 * @text Variable for Text
 * @desc Variable index to use
 *       
 */

(() => {
    const pluginName = "TextPicture";
    let textPictureText = "";

    PluginManager.registerCommand(pluginName, "set", args => {
        textPictureText = String(args.text);
    });
	
	PluginManager.registerCommand(pluginName, "setFromVar", args => {
        textPictureText = String(gVr(args.textVar));
    });

    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function() {
        _Game_Picture_show.apply(this, arguments);
        if (this._name === "" && textPictureText) {
            this.mzkp_text = textPictureText;
            this.mzkp_textChanged = true;
            textPictureText = "";
        }
    };

    const _Sprite_Picture_destroy = Sprite_Picture.prototype.destroy;
    Sprite_Picture.prototype.destroy = function() {
        destroyTextPictureBitmap(this.bitmap);
        _Sprite_Picture_destroy.apply(this, arguments);
    };

    const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        if (this.visible && this._pictureName === "") {
            const picture = this.picture();
            const text = picture ? picture.mzkp_text || "" : "";
            const textChanged = picture && picture.mzkp_textChanged;
            if (this.mzkp_text !== text || textChanged) {
                this.mzkp_text = text;
                destroyTextPictureBitmap(this.bitmap);
                this.bitmap = createTextPictureBitmap(text);
                picture.mzkp_textChanged = false;
            }
        } else {
            this.mzkp_text = "";
        }
    };

    function createTextPictureBitmap(text) {
        const tempWindow = new Window_Base(new Rectangle());
        const size = tempWindow.textSizeEx(text);
        tempWindow.padding = 0;
        tempWindow.move(0, 0, size.width, size.height);
        tempWindow.createContents();
        tempWindow.drawTextEx(text, 0, 0, 0);
        const bitmap = tempWindow.contents;
        tempWindow.contents = null;
        tempWindow.destroy();
        bitmap.mzkp_isTextPicture = true;
        return bitmap;
    }

    function destroyTextPictureBitmap(bitmap) {
        if (bitmap && bitmap.mzkp_isTextPicture) {
            bitmap.destroy();
        }
    }
})();
