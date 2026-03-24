//==============================
// GRB_NoCharSmoothingOnZoom.js
//==============================
/*:
 * @target MZ
 * @plugindesc Remove character smoothing when zooming.
 * @author Garbata team
 * @url https://рпг.укр/плагін/GRB_NoCharSmoothingOnZoom.js
 * @help Removes smoothing from characters when zooming
 * using the ScreenZoom.js plugin.
 *
 * This plugin is placed into public domain according to the CC0 public domain
 * dedication. See https://creativecommons.org/publicdomain/zero/1.0/ for more
 * information.
 */
/*:uk
 * @target MZ
 * @plugindesc Забрати розмивання при масштабуванні.
 * @author Команда Гарбата
 * @url https://рпг.укр/плагін/GRB_NoCharSmoothingOnZoom.js
 * @help Забирає розмивання персонажів при масштабуванні за допомогою
 * плагіну ScreenZoom.js.
 *
 * Цей плагін передано до суспільного надбання згідно з CC0. Детальніше див.
 * на сторінці https://creativecommons.org/publicdomain/zero/1.0/deed.uk
 */
/*:be
 * @target MZ
 * @plugindesc Забраць размыванне падчас масштабавання.
 * @author Каманда Гарбата
 * @url https://рпг.укр/плагін/GRB_NoCharSmoothingOnZoom.js
 * @help Забірае размыванне персанажаў падчас масштабавання з дапамогай
 * плагіна ScreenZoom.js.
 *
 * Гэты плагін перададзены ў грамадскі набытак згодна з CC0. Падрабязней гл.
 * на старонцы https://creativecommons.org/publicdomain/zero/1.0/deed.be
 */
/*:ru
 * @target MZ
 * @plugindesc Убрать размытие при масштабировании.
 * @author Команда Гарбата
 * @url https://рпг.укр/плагін/GRB_NoCharSmoothingOnZoom.js
 * @help Убирает размытие персонажей при масштабировании
 * с помощью плагина ScreenZoom.js.
 *
 * Этот плагин передан в общественное достояние согласно CC0. Подробнее см. на
 * странице https://creativecommons.org/publicdomain/zero/1.0/deed.ru
 */

(function () {
    var Sprite_Character_updateBitmap = Sprite_Character.prototype.updateBitmap;
    Sprite_Character.prototype.updateBitmap = function() {
        Sprite_Character_updateBitmap.call(this);
        if (this.bitmap) {
          this.bitmap.smooth = false;
        }
    }
})();