//=============================================================================
// Trilobytes - Limited Shop Stock
// TLB_LimitedShopStock.js
//=============================================================================

var Imported = Imported || {};
Imported.TLB_LimitedShopStock = true;

var TLB = TLB || {};
TLB.LimitedShopStock ??= {};
TLB.LimitedShopStock.version = 1.07;

/*:
 * @target MZ
 * @plugindesc This plugin adds limited inventory to shops.
 * @author John Clifford/Trihan
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set up limited stock for shops in events. There
 * are various plugin commands to control stock, including setting quantities
 * of items, weapons and armours; adding to existing stock; removing items
 * from stock; and custom pricing.
 *
 * NOTE: Due to the way the plugin is designed, if you are setting up stock
 * from the same event page as your Shop Processing command, you must place
 * the setup plugin command at the top in order for stock to be set
 * correctly. This will not cause stock to reset when revisiting the shop.
 *
 * NOTE: Be aware that selling an item to a shop that is set up for limited
 * stock of that item will increase its inventory by the number you sold.
 *
 * IMPORTANT: Do not include items you want to be limited in the goods list
 * of your Shop Processing command, it will only create a duplicate listing
 * that shares the same limit. You can, however, place items that are not
 * limited in the goods list and they will be available in the shop as normal
 * with no purchasing limit. Any items in the goods list will appear before
 * limited ones.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * Stock Text
 *   The string to display after an item's name to show its remaining stock
 *   (%1 for quantity)
 *   Default: "(%1 left)"
 *   Example: Shop would show "Potion (3 left)" if 3 Potions were available.
 *
 * Sold Out Text
 *   The string to display when an item has 0 stock remaining.
 *   Default: "(SOLD OUT)"
 *   Example: Shop would show "Potion (SOLD OUT)" if all potions were bought.
 *
 * Default Restock Time
 *   The default number of frames to wait until restocking limited items
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following plugin commands are available for this plugin via the
 * "TLB_LimitedShopStock_Free" dropdown selector.
 *
 * NOTE: These will work fine in common events called via a map event, but will
 * not function correctly for a troop event or main menu shop added via
 * VisuStella's Main Menu Core (see Compatibility section).
 *
 * 1: Set Shop Stock
 *   Set up a limited-stock shop.
 * 
 *   Arguments
 *     Map ID: Map ID on which the shop event is located (0 for current map).
 *     Event ID: ID of the shop event (0 for current event).
 *     Items: List of items the shop has.
 *     Weapons: List of weapons the shop has.
 *     Armours: List of armours the shop has.
 *     Sell X Random: Shop will choose X items at random instead of all stock.
 *     Random Mode: Whether to randomise once or every time the shop is visited.
 *       The Items, Weapons and Armours selections all contain the following:
 *         Item ID: The item the shop will sell.
 *         Quantity Type: Whether the number is constant or a variable.
 *         Quantity/Variable: The number of the item the shop will start with.
 *         Price Type: Determine whether to use the [Standard] database price
 *                     or a [Specified value].
 *         Specific Price: Price to sell item for if "Specified value" is
 *                         selected (has no effect otherwise)
 *         Restock Timer: The number of frames to wait until a restocking
 *                         tick (0 for default, -1 for no restock).
 *         Restock Type: Whether the restock number is constant or a variable.
 *         Restock Quantity: The number of items to restock each tick.
 *         Restock Max: The number at which autorestocking will stop.
 *
 * 2: Add to Stock
 *   Add items to an existing shop.
 *
 *   Arguments
 *     Map ID: Map ID on which the shop event is located (0 for current map).
 *     Event ID: ID of the shop event (0 for current event).
 *     Items: List of items the shop will gain.
 *     Weapons: List of weapons the shop will gain.
 *     Armours: List of armours the shop will gain.
 *       The Items, Weapons and Armours selections all contain the following:
 *         Item ID: The item the shop will add to.
 *         Quantity Type: Whether the number is constant or a variable.
 *         Quantity: The number of the item the shop will gain.
 *
 * 3: Add to Stock (with price setting)
 *   Add items to an existing shop, includes settings for price.
 *
 *   Arguments are identical to Add to Stock above, with the addition of the
 *   Price Type and Specified Price settings for each item.
 *
 * 4: Remove from Stock
 *   Remove items from an existing shop.
 *
 *   Arguments
 *     Map ID: Map ID on which the shop event is located (0 for current map).
 *     Event ID: ID of the shop event (0 for current event).
 *     Items: List of items the shop will lose.
 *     Weapons: List of weapons the shop will lose.
 *     Armours: List of armours the shop will lose.
 *       The Items, Weapons and Armours selections all contain the following:
 *         Item ID: The item the shop will remove from.
 *         Quantity Type: Whether the number is constant or a variable.
 *         Quantity: The number of the item the shop will lose.
 *         Remove From Sale if Sold Out?:
 *           Removes the item from stock if it reaches 0. Selling that item to
 *			 the shop will no longer restock it.
 *             - Remove from sale (true)
 *             - Keep in list (false)
 * 
 * 5: Change Prices
 *   Modify the prices of existing items the shop is selling. Will have no
 *   effect if the item doesn't have stock set up in that shop.
 *
 *   Arguments are identical to "Add to Stock (with Price Setting)" with the
 *   "Quantity" setting removed.
 *
 * ============================================================================
 * Example - Limited Shop Basic Setup Steps
 * ============================================================================
 *
 * 1. Create an event.
 * 2. Select "Plugin Command..." from the event commands and choose
 *    TLB_LimitedShopStock.
 * 3. Select Set Shop Stock from the Command Name dropdown list.
 * 4. Leave Map ID and Event ID as 0 if you wish to use the current map and
 *    event. If you wish to set stock remotely for a shop elsewhere, set the
 *    values accordingly.
 * 5. Select the category you wish to add stock for (Items, Weapons or Armours).
 * 6. Select a blank line and choose the database entry you want to add for item ID.
 *    Enter the quantity you wish to be available, then choose Standard price type
 *    to use the database value or Specified value to set your own.
 *    If you use Specified value, set the desired value in the Specified price input.
 & 7. Repeat 5 and 6 for all items/weapons/armours you wish to place in the shop.
 * 8. Click OK to confirm the plugin command.
 * 9. Select "Shop Processing..." from the event commands. If you only have
 *    limited items, leave the goods list blank. If you wish to have a mixture of
 *    limited and unlimited items, add the unlimited items to the goods list.
 *    Do not add any items you selected in the plugin command above, or they will
 *    appear in the shop as duplicates. 
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 * If you're using VisuStella's Fluctuating Shop Prices plugin
 * (VisuMZ_4_FlucShopPrices) that plugin will take over prices for all items
 * you've set base price notetags for, regardless of the settings in this one,
 * no matter what order the plugins are in. In the absence of base notetags,
 * the base cost will be as set here and will be modified by plus, rate and
 * flat tags. Custom prices will work as normal for items with no notetags.
 *
 * If you do wish to incorporate a limited item's custom price into the cost
 * calculated by Fluctuating Shop Prices, you can use the script call:
 *
 * $gameSystem.getItemStock(this.item())?.price
 *
 * be aware however that you will need to check "this.item()" is not null first
 * as the JS: Finalize Buy and JS: Finalize Sell code runs before an item is
 * selected as well.
 *
 * If you're using VisuStella's Main Menu Core and have a menu option which
 * sets up a limited shop via common event, every map will be considered its
 * own unique shop with its own inventory. It's unlikely that there's any use
 * case where this is desirable, so I'd generally advise just not doing it.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. This plugin may be used in free or commercial games provided that it was
 *    downloaded from itch.io or any other source advertised by Trihan.
 * 2. You must add "Trilobytes" or "Trihan" to the credits of your game, in
 *    whatever section is appropriate for plugin developers.
 * 3. You may edit the code however you wish as long as you do not
 *    redistribute or sell it as your own work. Trilobytes takes no
 *    responsibility for issues that arise from changes to the source.
 * 4. Trilobytes is not responsible for any problems or plugin compatibility
 *    issues arising from unintended use.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.07:
 * - Fixed a bug where shops could no longer stock via constant quantity values
 *   and only worked with variables.
 * 
 * Version 1.06:
 * - Item quantity can no longer be set higher than restock max. If a higher
 *   value is used, it will be changed to the max value.
 * - Fixed a bug where the stock equality check wasn't using correct keys.
 * - Quantities/Restock quantities for all plugin commands can now use a
 *   variable instead of a constant value.
 * 
 * Version 1.05:
 * - Fixed an issue where loading an existing save after changing in-line stock
 *   data would retain the old inventory.
 * 
 * Version 1.04:
 * - Added additional failsafes that were missed in the previous fix.
 *
 * Version 1.03:
 * - Added missing failsafes to create required objects if they don't already
 *   exist, which should prevent crashes when adding this plugin to a game with
 *   existing save files.
 * 
 * Version 1.02:
 * - Fixed a bug where creating a normal shop with no plugin commands would
 *   crash the game.
 * - Implemented "Randomise Once" and "Randomise Always" options for setting
 *   up a shop, to determine whether random X items should only happen once
 *   when first visiting to create a permanent inventory, or whether items
 *   should be chosen randomly every visit.
 * - Fixed descriptions in some outdated restock timer struct properties that
 *   didn't include the addition of -1 as a no restock option.
 *
 * Version 1.01:
 * - Changed auto restock value to use 0 as default and -1 as no restock.
 * - Fixed help formatting to fit in available space.
 *
 * Version 1.00:
 * - Finished plugin!
 *
 * @param general
 * @text General Settings
 *
 * @param stockText
 * @parent general
 * @text Stock Text
 * @desc The string to display after an item's name to show its remaining stock (%1 for quantity).
 * @default (%1 left)
 *
 * @param soldOutText
 * @parent general
 * @text Sold Out Text
 * @desc The string to display when an item has 0 stock remaining.
 * @default (SOLD OUT)
 *
 * @param defaultRestockTime
 * @parent general
 * @type number
 * @min -1
 * @text Default Restock Time
 * @desc The default number of frames to wait until restocking limited items (0 to use default, -1 to never restock).
 * @default 0
 *
 * @param defaultRestockQuantity
 * @parent general
 * @type number
 * @min 0
 * @text Default Restock Quantity
 * @desc The default number of items to add to inventory each global restocking tick.
 * @default 1
 *
 * @param defaultStockMax
 * @parent general
 * @type number
 * @min 1
 * @text Default Stock Maximum
 * @desc The default number of an item a shop can hold before it no longer adds more.
 * @default 99
 *
 * @command setStock
 * @text Set Shop Stock
 * @desc Set up a limited-stock shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<item>[]
 * @text Items
 * @desc List of items the shop has.
 *
 * @arg weapons
 * @type struct<weapon>[]
 * @text Weapons
 * @desc List of weapons the shop has.
 *
 * @arg armours
 * @type struct<armour>[]
 * @text Armours
 * @desc List of armours the shop has.
 *
 * @arg sellXRandom
 * @type number
 * @text Sell X random
 * @desc Shop will choose X items at random instead of all of them.
 *
 * @arg randomiseType
 * @type select
 * @option Randomise Once
 * @option Randomise Always
 * @text Randomise type
 * @default Randomise Once
 *
 * @command addStock
 * @text Add to Stock
 * @desc Add items to an existing shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemAdd>[]
 * @text Items
 * @desc List of items the shop will gain.
 *
 * @arg weapons
 * @type struct<weaponAdd>[]
 * @text Weapons
 * @desc List of weapons the shop will gain.
 *
 * @arg armours
 * @type struct<armourAdd>[]
 * @text Armours
 * @desc List of armours the shop will gain.
 *
 * @command addStockWithPrice
 * @text Add to Stock (with price setting)
 * @desc Add items to an existing shop, includes settings for price.
 *
 * @arg mapId
 * @type Number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemAddWithPrice>[]
 * @text Items
 * @desc List of items the shop will gain.
 *
 * @arg weapons
 * @type struct<weaponAddWithPrice>[]
 * @text Weapons
 * @desc List of weapons the shop will gain.
 *
 * @arg armours
 * @type struct<armourAddWithPrice>[]
 * @text Armours
 * @desc List of armours the shop will gain.
 *
 * @command removeStock
 * @text Remove from Stock
 * @desc Remove items from an existing shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemRemove>[]
 * @text Items
 * @desc List of items the shop will lose.
 *
 * @arg weapons
 * @type struct<weaponRemove>[]
 * @text Weapons
 * @desc List of weapons the shop will lose.
 *
 * @arg armours
 * @type struct<armourRemove>[]
 * @text Armours
 * @desc List of armours the shop will lose.
 *
 * @command changePrices
 * @text Change Prices
 * @desc Modify the prices of items the shop is selling. Will have no effect if the item doesn't have stock set up in that shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemPriceChange>[]
 * @text Items
 * @desc List of items to change the prices of.
 *
 * @arg weapons
 * @type struct<weaponPriceChange>[]
 * @text Weapons
 * @desc List of weapons to change the prices of.
 *
 * @arg armours
 * @type struct<armourPriceChange>[]
 * @text Armours
 * @desc List of armours to change the prices of.
 */
/*~struct~item:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will sell.
 * @default 1
 *
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 * 
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the item the shop will start with.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell item for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 *
 * @param restockTimer
 * @type number
 * @min -1
 * @text Restock Timer
 * @desc Number of frames until this item restocks. Set to 0 for default restock. -1 for never.
 * @default 0
 *
 * @param restockType
 * @text Restock Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 * 
 * @param restockQuantity
 * @type number
 * @min 1
 * @text Restock Quantity/Variable
 * @desc Number of items restocked per restock tick.
 * @default 1
 *
 * @param restockMax
 * @type number
 * @min 1
 * @text Restock max
 * @desc The number at which autorestocking will stop.
 * @default 99
 */
 /*~struct~itemAdd:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will add to.
 * @default 1
 *
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 * 
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the item the shop will gain.
 * @default 1
 */
 /*~struct~itemAddWithPrice:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will add to.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the item the shop will gain.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell item for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~itemRemove:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will remove from.
 * @default 1
 *
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 * 
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the item the shop will lose.
 * @default 1
 *
 * @param removeIfSoldOut
 * @type boolean
 * @on Remove from sale
 * @off Keep in list
 * @text Remove From Sale if Sold Out?
 * @desc Removes the item from stock if it reaches 0. Selling that item to the shop will no longer restock it.
 * @default false
 */
/*~struct~itemPriceChange:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will change the price of.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell item for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
/*~struct~weapon:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will sell.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc the number of the weapon the shop will start with.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min -1
 * @text Price
 * @desc Price to sell weapon for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 *
 * @param restockTimer
 * @type number
 * @min -1
 * @text Restock Timer
 * @desc Number of frames until this weapon restocks. Set to 0 for default restock, -1 for never.
 * @default 0
 * 
 * @param restockType
 * @text Restock Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param restockQuantity
 * @type number
 * @min 1
 * @text Restock Quantity/Variable
 * @desc Number of weapons restocked per restock tick.
 * @default 1
 *
 * @param restockMax
 * @type number
 * @min 1
 * @text Restock max
 * @desc The number at which autorestocking will stop.
 * @default 99
 */
 /*~struct~weaponAdd:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will add to.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the weapon the shop will gain.
 * @default 1
 */
 /*~struct~weaponRemove:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will remove from.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the weapon the shop will lose.
 * @default 1
 *
 * @param removeIfSoldOut
 * @type boolean
 * @on Remove from sale
 * @off Keep in list
 * @text Remove From Sale if Sold Out?
 * @desc Removes the weapon from stock if it reaches 0. Selling that weapon to the shop will no longer restock it.
 * @default false
 */
/*~struct~weaponPriceChange:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will change the price of.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell weapon for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~armour:
 * @param armour
 * @type armor
 * @text Armour ID
 * @desc The armour the shop will sell.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc the number of the armour the shop will start with.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Price
 * @desc Price to sell armour for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 *
 * @param restockTimer
 * @type number
 * @min -1
 * @text Restock Timer
 * @desc Number of frames until this armour restocks. Set to 0 for default restock, -1 for never.
 * @default 0
 * 
 * @param restockType
 * @text Resetock Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param restockQuantity
 * @type number
 * @min 1
 * @text Restock Quantity/Variable
 * @desc Number of armours restocked per restock tick.
 * @default 1
 *
 * @param restockMax
 * @type number
 * @min 1
 * @text Restock max
 * @desc The number at which autorestocking will stop.
 * @default 99
 */
 /*~struct~armourAdd:
 * @param armour
 * @type armour
 * @text Armour ID
 * @desc The armour the shop will add to.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the armour the shop will gain.
 * @default 1
 */
 /*~struct~armourRemove:
 * @param armour
 * @type armour
 * @text Armour ID
 * @desc The armour the shop will remove from.
 * @default 1
 * 
 * @param quantityType
 * @text Quantity Type
 * @type select
 * @option Constant
 * @value 0
 * @option Variable
 * @value 1
 * @desc Whether to use a specific quantity or derive it from a variable.
 * @default 0
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity/Variable
 * @desc The number of the armour the shop will lose.
 * @default 1
 *
 * @param removeIfSoldOut
 * @type boolean
 * @on Remove from sale
 * @off Keep in list
 * @text Remove From Sale if Sold Out?
 * @desc Removes the armour from stock if it reaches 0. Selling that armour to the shop will no longer restock it.
 * @default false
 */
/*~struct~armourPriceChange:
 * @param armour
 * @type armour
 * @text Armour ID
 * @desc The armour the shop will change the price of.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell armour for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
	
var parameters = PluginManager.parameters('TLB_LimitedShopStock');
TLB.Param ??= {};
TLB.Param.LSS ??= {};

var toNumeric = ["defaultRestockTime", "defaultRestockQuantity", "defaultStockMax"];

for (const param in parameters) {
	if (toNumeric.contains(param)) TLB.Param.LSS[param] = Number(parameters[param]);
	else TLB.Param.LSS[param] = parameters[param];
}

TLB.LimitedShopStock.convertArgsToStock = function(args) {
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			const priceType = item.priceType === 'standard' ? 0 : 1;
			stock.push({type: 0, id: Number(item.item), quantityType: Number(item.quantityType), quantity: Number(item.quantity), priceType: priceType, price: Number(item.price), restockTimer: Number(item.restockTimer), restockType: Number(item.restockType), restockQuantity: Number(item.restockQuantity), restockMax: Number(item.restockMax)});
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			const priceType = weapon.priceType === 'standard' ? 0 : 1;
			stock.push({type: 1, id: Number(weapon.weapon), quantityType: Number(weapon.quantityType), quantity: Number(weapon.quantity), priceType: priceType, price: Number(weapon.price), restockTimer: Number(weapon.restockTimer), restockType: Number(weapon.restockType), restockQuantity: Number(weapon.restockQuantity), restockMax: Number(weapon.restockMax)});
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (let armour of armours) {
			armour = JSON.parse(armour);
			const priceType = armour.priceType === 'standard' ? 0 : 1;
			stock.push({type: 2, id: Number(armour.armour), quantityType: Number(armour.quantityType), quantity: Number(armour.quantity), priceType: priceType, price: Number(armour.price), restockTimer: Number(armour.restockTimer), restockType: Number(armour.restockType), restockQuantity: Number(armour.restockQuantity), restockMax: Number(armour.restockMax)});
		}
	}
	return stock;
};

TLB.LimitedShopStock.convertStockToObject = function(stock) {
	const stockObj = {};
	for (const item of stock) {
		const itemKey = [item.type, item.id];
		stockObj[itemKey] = { quantityType, quantity, priceType, price, restockTimer, restockType, restockQuantity, restockMax } = item;
	}
	return stockObj;
}

TLB.LimitedShopStock.areStockObjectsEqual = function(existingStock, newStock) {
	if (!existingStock || !newStock) return false;
	for (const key of Object.keys(newStock)) {
		const item = newStock[key];
		const existingItem = existingStock[`${item.type},${item.id}`];
		if (!existingItem) return false;
		if (existingItem.priceType !== item.priceType || existingItem.price !== item.price || existingItem.restockTimer !== item.restockTimer || existingItem.restockQuantity !== item.restockQuantity || existingItem.restockMax !== item.restockMax) return false;
	}
	return true;
}

PluginManager.registerCommand('TLB_LimitedShopStock', 'setStock', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const existingStock = $gameSystem.allShopStock([mapId, eventId]);
	const argsToStock = TLB.LimitedShopStock.convertArgsToStock(args);
	const stockToObj = TLB.LimitedShopStock.convertStockToObject(argsToStock);
	const stockEqual = TLB.LimitedShopStock.areStockObjectsEqual(existingStock, stockToObj);
	if (eventId === $gameMap._interpreter._eventId && existingStock && stockEqual) return;
	$gameSystem.resetStock(mapId, eventId);
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			const priceType = item.priceType === 'standard' ? 0 : 1;
			stock.push({type: 0, id: Number(item.item), quantity: Number(item.quantityType) === 0 ? Number(item.quantity) : $gameVariables.value(Number(item.quantity)), priceType: priceType, price: Number(item.price), restockTimer: Number(item.restockTimer), restockQuantity: item.restockType === 0 ? Number(item.restockQuantity) : $gameVariables.value(Number(item.restockQuantity)), restockMax: Number(item.restockMax)});
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			const priceType = weapon.priceType === 'standard' ? 0 : 1;
			stock.push({type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantityType) === 0 ? Number(weapon.quantity) : $gameVariables.value(Number(weapon.quantity)), priceType: priceType, price: Number(weapon.price), restockTimer: Number(weapon.restockTimer), restockQuantity: weapon.restockType === 0 ? Number(weapon.restockQuantity) : $gameVariables.value(Number(weapon.restockQuantity)), restockMax: Number(weapon.restockMax)});
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (let armour of armours) {
			armour = JSON.parse(armour);
			const priceType = armour.priceType === 'standard' ? 0 : 1;
			stock.push({type: 2, id: Number(armour.armour), quantity: Number(armour.quantityType) === 0 ? Number(armour.quantity) : $gameVariables.value(Number(armour.quantity)), priceType: priceType, price: Number(armour.price), restockTimer: Number(armour.restockTimer), restockQuantity: armour.restockType === 0 ? Number(armour.restockQuantity) : $gameVariables.value(Number(armour.restockQuantity)), restockMax: Number(armour.restockMax)});
		}
	}
	$gameSystem.setShopStock(mapId, eventId, stock, Number(args.sellXRandom), String(args.randomiseType));
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'addStock', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			let priceType;
			let price;
			const stockItem = { type: 0, id: Number(item.item), quantity: Number(item.quantityType) === 0 ? Number(item.quantity) : $gameVariables.value(Number(item.quantity)), restockTimer: Number(item.restockTimer), restockQuantity: item.restockType === 0 ? Number(item.restockQuantity) : $gameVariables.value(Number(item.restockQuantity)) };
			if (item.priceType) {
				if (item.priceType === 'standard') stockItem.priceType = 0;
				else {
					stockItem.priceType = 1;
					stockItem.price = Number(item.price);
				}
			}
			stock.push(stockItem);
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			let priceType;
			let price;
			const stockItem = { type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantityType) === 0 ? Number(weapon.quantity) : $gameVariables.value(Number(weapon.quantity)), restockTimer: Number(weapon.restockTimer), restockQuantity: weapon.restockType === 0 ? Number(weapon.restockQuantity) : $gameVariables.value(Number(weapon.restockQuantity)) };
			if (weapon.priceType) {
				if (weapon.priceType === 'standard') stockItem.priceType = 0;
				else {
					stockItem.priceType = 1;
					stockItem.price = Number(weapon.price);
				}
			}
			stock.push(stockItem);
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (const armour of armours) {
			armour = JSON.parse(armour);
			let priceType;
			let price;
			const stockItem = { type: 2, id: Number(armour.armour), quantity: Number(armour.quantityType) === 0 ? Number(armour.quantity) : $gameVariables.value(Number(armour.quantity)), restockTimer: Number(armour.restockTimer), restockQuantity: armour.restockType === 0 ? Number(armour.restockQuantity) : $gameVariables.value(Number(armour.restockQuantity)) };
			if (armour.priceType) {
				if (armour.priceType === 'standard') stockItem.priceType = 0;
				else {
					stockItem.priceType = 1;
					stockItem.price = Number(armour.price);
				}
			}
			stock.push(stockItem);
		}
	}
	$gameSystem.addShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'addStockWithPrice', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			stock.push({ type: 0, id: Number(item.item), quantity: Number(item.quantityType) === 0 ? Number(item.quantity) : $gameVariables.value(Number(item.quantity)), priceType: item.priceType === "standard" ? 0 : 1, price: Number(item.price), restockTimer: Number(item.restockTimer), restockQuantity: item.restockType === 0 ? Number(item.restockQuantity) : $gameVariables.value(Number(item.restockQuantity)) });
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			stock.push({ type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantityType) === 0 ? Number(weapon.quantity) : $gameVariables.value(Number(weapon.quantity)), priceType: weapon.priceType === "standard" ? 0 : 1, price: Number(weapon.price), restockTimer: Number(weapon.restockTimer), restockQuantity: weapon.restockType === 0 ? Number(weapon.restockQuantity) : $gameVariables.value(Number(weapon.restockQuantity)) });
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (const armour of armours) {
			armour = JSON.parse(armour);
			stock.push({ type: 2, id: Number(armour.armour), quantity: Number(armour.quantityType) === 0 ? Number(armour.quantity) : $gameVariables.value(Number(armour.quantity)), priceType: armour.priceType === "standard" ? 0 : 1, price: Number(armour.price), restockTimer: Number(armour.restockTimer), restockQuantity: armour.restockType === 0 ? Number(armour.restockQuantity) : $gameVariables.value(Number(armour.restockQuantity)) });
		}
	}
	$gameSystem.addShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'removeStock', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			stock.push({ type: 0, id: Number(item.item), quantity: Number(item.quantityType) === 0 ? Number(item.quantity) : $gameVariables.value(Number(item.quantity)), removeIfSoldOut: eval(item.removeIfSoldOut) });
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			stock.push({ type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantityType) === 0 ? Number(weapon.quantity) : $gameVariables.value(Number(weapon.quantity)), removeIfSoldOut: eval(weapon.removeIfSoldOut) });
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (const armour of armours) {
			armour = JSON.parse(armour);
			stock.push({ type: 2, id: Number(armour.armour), quantity: Number(armour.quantityType) === 0 ? Number(armour.quantity) : $gameVariables.value(Number(armour.quantity)), removeIfSoldOut: eval(armour.removeIfSoldOut) });
		}
	}
	$gameSystem.removeShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'changePrices', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			const key = [mapId, eventId];
			const itemKey = [0, Number(item.item)];
			if ($gameSystem.getShopStock(key, itemKey)) {
				const priceType = item.priceType === 'standard' ? 0 : 1;
				$gameSystem._shopStock[key].stock[itemKey].priceType = priceType;
				$gameSystem._shopStock[key].stock[itemKey].price = Number(item.price);
			}
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			const key = [mapId, eventId];
			const itemKey = [1, Number(weapon.weapon)];
			if ($gameSystem.getShopStock(key, itemKey)) {
				const priceType = weapon.priceType === 'standard' ? 0 : 1;
				$gameSystem._shopStock[key].stock[itemKey].priceType = priceType;
				$gameSystem._shopStock[key].stock[itemKey].price = Number(weapon.price);
			}
		}
	}
	if (args.armours.length > 0) {
		const items = JSON.parse(args.armours);
		for (let armour of armours) {
			armour = JSON.parse(armour);
			const key = [mapId, eventId];
			const itemKey = [2, Number(armour.armour)];
			if ($gameSystem.getShopStock(key, itemKey)) {
				const priceType = armour.priceType === 'standard' ? 0 : 1;
				$gameSystem._shopStock[key].stock[itemKey].priceType = priceType;
				$gameSystem._shopStock[key].stock[itemKey].price = Number(armour.price);
			}
		}
	}
});

TLB.LimitedShopStock.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	TLB.LimitedShopStock.Game_System_initialize.apply(this, arguments);
	this._shopStock = {};
	this._restockTimer = 0;
	this._restockTimers = {};
};

Game_System.prototype.setShopStock = function(mapId, eventId, items, randomCount, randomiseType) {
	const key = [mapId, eventId];
	this._shopStock ??= {};
	(this._shopStock[key] ||= {}).stock ??= {};
	for (const item of items) {
		const itemKey = [item.type, item.id];
		item.quantity = Math.min(item.quantity, item.restockMax);
		this._shopStock[key].stock[itemKey] = { quantity, priceType, price, restockTimer, restockQuantity, restockMax } = item;
		this._shopStock[key].randomCount = randomCount;
		this._shopStock[key].randomiseType = randomiseType;
		if (item.restockTimer && item.restockTimer > 0) {
			this._restockTimers[item.restockTimer] ??= [];
			this._restockTimers[item.restockTimer].push(key.concat(itemKey));
		}
	}
};

Game_System.prototype.addShopStock = function(mapId, eventId, items) {
	const key = [mapId, eventId];
	this._shopStock ??= {};
	(this._shopStock[key] ||= {}).stock ??= {};
	for(const item of items) {
		const itemKey = [item.type, item.id];
		if (this.getShopStock(key, itemKey)) {
			const existingItem = this._shopStock[key].stock[itemKey];
			existingItem.quantity += item.quantity;
			existingItem.priceType = item.priceType || existingItem.priceType;
			existingItem.price = item.price || existingItem.price;
			existingItem.quantity = Math.min(existingItem.quantity, existingItem.restockMax);
		} else {
			const priceType = item.priceType ? item.priceType : 0;
			const price = item.price ? item.price : 0;
			const restockTimer = TLB.Param.LSS.defaultRestockTime;
			const restockQuantity = TLB.Param.LSS.defaultRestockQuantity;
			const restockMax = TLB.Param.LSS.defaultStockMax;
			item.quantity = Math.min(item.quantity, restockMax);
			this._shopStock[key].stock[itemKey] = { id: item.id, type: item.type, quantity: item.quantity, priceType: priceType, price: price, restockTimer: restockTimer, restockQuantity: restockQuantity, restockMax: restockMax };
		}
	}
};

Game_System.prototype.removeShopStock = function(mapId, eventId, items) {
	const key = [mapId, eventId];
	for (const item of items) {
		const itemKey = [item.type, item.id];
		if (this.getShopStock(key, itemKey)) {
			this._shopStock[key].stock[itemKey].quantity -= item.quantity;
			if (!this.checkShopStock(key, itemKey)) {
				if (item.removeIfSoldOut) delete this._shopStock[key].stock[itemKey];
				else this._shopStock[key].stock[itemKey].quantity = 0; 
			}
		}
	}
};

Game_System.prototype.resetStock = function(mapId, eventId) {
	const key = [mapId, eventId];
	if(this._shopStock == undefined)
	{
		this._shopStock = {};
		this._restockTimer = 0;
		this._restockTimers = {};
	}
	this._shopStock[key] = {};
};

Game_System.prototype.allShopStock = function(key) {
	return this._shopStock?.[key]?.stock;
};

Game_System.prototype.getShopStock = function(key, itemKey) {
	return this.allShopStock(key)?.[itemKey];
};

Game_System.prototype.checkShopStock = function(key, itemKey) {
	return this.getShopStock(key, itemKey)?.quantity > 0;
};

Game_System.prototype.isLimitedStock = function(key, itemKey) {
	return this.getShopStock(key, itemKey) !== undefined;
};

Game_System.prototype.getItemStock = function(item) {
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	return this.getShopStock([$gameMap.mapId(), $gameMap._interpreter._eventId], [type, item.id]);
};

Game_System.prototype.checkItemStock = function(item) {
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	return this.checkShopStock([$gameMap.mapId(), $gameMap._interpreter._eventId], [type, item.id]);
};

Game_System.prototype.isLimitedItemStock = function(item) {
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	return this.isLimitedStock([$gameMap.mapId(), $gameMap._interpreter._eventId], [type, item.id]);
};

TLB.LimitedShopStock.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index) {
	TLB.LimitedShopStock.Window_ShopBuy_drawItem.call(this, index);
	const item = this._data[index];
	if ($gameSystem.isLimitedItemStock(item)) {
		this.changePaintOpacity(this.isEnabled(item));
		const rect = this.itemRect(index);
		rect.x += ImageManager.iconWidth + this.textWidth(item.name) + this.itemPadding() + 20;
		rect.y += 2;
		const stock = $gameSystem.getItemStock(item).quantity || 0;
		this.drawText(stock > 0 ? TLB.Param.LSS.stockText.format(stock) : TLB.Param.LSS.soldOutText, rect.x, rect.y, this.contentsWidth());
		this.changePaintOpacity(true);
	}
};

TLB.LimitedShopStock.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
	return TLB.LimitedShopStock.Window_ShopBuy_isEnabled.call(this, item) && ($gameSystem.isLimitedItemStock(item) ? $gameSystem.checkItemStock(item) : true);
};

TLB.LimitedShopStock.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	TLB.LimitedShopStock.Scene_Map_update.call(this);
	$gameSystem._restockTimer ??= 0;
	$gameSystem._restockTimer++;
	for (const key of Object.keys(($gameSystem._restockTimers || {}))) {
		if ($gameSystem._restockTimer % Number(key) === 0) {
			for (const item of $gameSystem._restockTimers[key]) {
				const eventKey = item.slice(0, 2);
				const itemKey = item.slice(2);
				const stockItem = $gameSystem._shopStock[eventKey].stock[itemKey];
				const max = stockItem.restockMax || TLB.Param.LSS.defaultStockMax;
				stockItem.quantity++;
				if (stockItem.quantity > max) stockItem.quantity = max;
			}
		}
	}
	if (TLB.Param.LSS.defaultRestockTime > 0 && $gameSystem._restockTimer % TLB.Param.LSS.defaultRestockTime === 0) {
		for (const key of Object.keys(($gameSystem._shopStock || {}))) {
			for (const itemKey of Object.keys($gameSystem.allShopStock(key))) {
				if ($gameSystem.getShopStock(key, itemKey).restockTimer !== null && $gameSystem.getShopStock(key, itemKey).restockTimer === 0) {
					const stockItem = $gameSystem._shopStock[key].stock[itemKey];
					const max = stockItem.restockMax || TLB.Param.LSS.defaultStockMax;
					stockItem.quantity++;
					if (stockItem.quantity > max) stockItem.quantity = max;
				}
			}
		}
	}
};

TLB.LimitedShopStock.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
	const key = [$gameMap.mapId(), $gameMap._interpreter._eventId];
	let limitedItems = $gameSystem._shopStock?.[key]?.randomStock || $gameSystem.allShopStock(key);
	let n = $gameSystem._shopStock?.[key]?.randomCount;
	if (n > 0) {
		const pool = { ...limitedItems };
		const result = {};
		while (n > 0) {
			const keys = Object.keys(pool);
			const len = keys.length;
			if(len == 0){break;}
			let itemKey = keys[Math.randomInt(len)];
			///reroll twice if the item quantity is 0 to try getting as many items as possible
			if(pool[itemKey].quantity<=0 && Object.keys(pool).length >=2)
				{delete pool[itemKey]; itemKey = Object.keys(pool)[Math.randomInt(Object.keys(pool).length)];}
			if(pool[itemKey].quantity<=0 && Object.keys(pool).length >=2 )
				{delete pool[itemKey]; itemKey = Object.keys(pool)[Math.randomInt(Object.keys(pool).length)];}
			if(pool[itemKey].quantity>=1)
				{result[itemKey] = pool[itemKey]; delete pool[itemKey];}
			
			n--;
		}
		limitedItems = result;
		if ($gameSystem._shopStock?.[key]?.randomiseType === "Randomise Once") {
			$gameSystem._shopStock[key].randomStock = result;
			$gameSystem._shopStock[key].randomCount = 0;
		}
	}
	for (const itemKey in limitedItems) {
		const stockItem = $gameSystem.getShopStock(key, itemKey);
		goods.push([stockItem.type, stockItem.id, stockItem.priceType, stockItem.price]);
	}
	TLB.LimitedShopStock.Scene_Shop_prepare.call(this, goods, purchaseOnly);
};

TLB.LimitedShopStock.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
	const max = TLB.LimitedShopStock.Scene_Shop_maxBuy.call(this);
	const item = this._item;
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	const key = [$gameMap.mapId(), $gameMap._interpreter._eventId, type, this._item.id];
	if ($gameSystem.isLimitedItemStock(item)) {
		return Math.min(max, $gameSystem.getItemStock(item).quantity);
	} else {
		return max;
	}
};

TLB.LimitedShopStock.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
	TLB.LimitedShopStock.Scene_Shop_doBuy.call(this, number);
	const item = this._item;
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	if ($gameSystem.isLimitedItemStock(item)) {
		$gameSystem.removeShopStock($gameMap.mapId(), $gameMap._interpreter._eventId, [ { id: this._item.id, type: type, quantity: number } ]);
	}
};

TLB.LimitedShopStock.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
	TLB.LimitedShopStock.Scene_Shop_doSell.call(this, number);
	const item = this._item;
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	if ($gameSystem.isLimitedItemStock(item)) {
		$gameSystem.addShopStock($gameMap.mapId(), $gameMap._interpreter._eventId, [ { id: this._item.id, type: type, quantity: number } ]);
		this._buyWindow.refresh();
	}
};