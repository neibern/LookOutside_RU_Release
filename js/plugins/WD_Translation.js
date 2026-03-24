//=============================================================================
// Plugin Name: WinterDream Translation
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Allow you to translate the game
// Terms of Use: By using this plugin you agree at our ToU (https://drive.google.com/file/d/1lG2Lep2Unme80ghZD7-fA-hPGWKLsiR7/view)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allow you to translate the game
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 * @base WD_Core
 * @orderAfter WD_Core
 *
 * @param defaultLanguage
 * @text Default Language
 * @desc The default language of your game
 * @type struct<languageSelection>
 * @default {"language":"English"}
 * 
 * @param defaultCombatMiss
 * @parent defaultLanguage
 * @text Miss (Combat)
 * @desc Default language "Miss" in combat, usually hardcoded in the engine
 * @default Промах
 * 
 * @param defaultOptionOn
 * @parent defaultLanguage
 * @text Options "ON"
 * @desc Default language "ON" toggle in the options scene, usually hardcoded in the engine
 * @default ВКЛ
 * 
 * @param defaultOptionOff
 * @parent defaultLanguage
 * @text Options "OFF"
 * @desc Default language "OFF" toggle in the options scene, usually hardcoded in the engine
 * @default ОТКЛ
 * 
 * @param defaultOptionLanguage
 * @parent defaultLanguage
 * @text Options "Select Language"
 * @desc Default language "Select Language" field in the options scene
 * @default Select Language:
 * 
 * @param mainTranslation
 * @type struct<mainTrans>[]
 * @text Other Languages Translations
 * @desc Translate your Project!
 * @default []
 * 
 * @param optionsLanguageFlag
 * @type boolean
 * @text Add Language Selection
 * @desc Add Language Selection in Options Menu
 * @default true
 * 
 * @command --line1--
 * @text === LANGUAGE ===
 * @desc Commands to manipulate language
 * 
 * @command forceLanguage
 * @text Force selected language
 * @desc Will force the selected language pack, if it exist, or revert to Default language (if no language pack is fitting)
 * 
 * @arg forceLanguage
 * @text Desired Language
 * @desc The language pack to search
 * @type struct<languageSelection>
 * @default {"language":"English"}
 * 
 * @command --line2--
 * @text === JSON DATABASE ===
 * @desc Commands to manipulate JSONs
 * 
 * @command createAllNewJSON
 * @text Write All Translation JSON (Will overwrite existings!)
 * @desc Create all nine JSON start data in data/WD_Translation. Warning: This will overwrite the existing file
 * 
 * @command createNewJSON 
 * @text Write a new Translation JSON (Will overwrite existing!)
 * @desc Creates a new, ready to be translated, file in data/WD_Translation. Warning: This will overwrite the existing file
 * 
 * @arg dataType
 * @text Data Type
 * @desc Select the data type you want to create
 * @default 0
 * @type select
 * @option Actors
 * @value 0
 * @option Classes
 * @value 1
 * @option Enemies
 * @value 2
 * @option Items
 * @value 3
 * @option Armors
 * @value 4
 * @option Weapons
 * @value 5
 * @option Skills
 * @value 6
 * @option States
 * @value 7
 * @option Map Names
 * @value 8
 *
 * @command createTextCodeTranslations
 * @text Create Text Translation JSON (Will overwrite existing!)
 * @desc Create the JSON with all the game Text Data
 * 
 * @command updateTextCodeTranslations
 * @text Update Text Translation JSON
 * @desc Update the Text Data JSON with new translations while leaving old one intact
 * 
 * @help WD_Translation.js
 *
 * This Plugins help you translate your game in different languages and is capable of
 * autoselecting the matching language package to the user machine language (if available).
 * 
 * Important note: This plugin needs WD_Core to work, it's a free plugin that you can
 * download on my pages linked below. In Rpg Maker Plugin list, WD_Core need to be above
 * this plugin
 * 
 * There are different translation methods for different text data of the game, here is a
 * little guide on how to successfuly translate everything.
 * 
 * PRO TIP BEFORE STARTING: Do your language pack at the END of your project, it's a lot 
 * easier to translate all the data in one go instead of doing continuos changes to the
 * plugin files!
 * 
 * STEP 0 - Installation: Really important!!! The plugin will crash without it! Unzip the
 * "Unzip in data folder.zip" and place it in data! 
 * You should have (your project)/data/WD_Translation/ with 10 json inside. Of course 
 * install the WD_Translation.js as usual in the plugin folder
 * 
 * STEP 1 - Setup the Default Language: The default language is your vanilla project, it uses
 * all the Text Data that you set up in the RPG Maker editor as it is, without any changes.
 * The only extra option I added is the "Combat Miss", normally RPG Maker would use an hard
 * coded string for it (for example "Miss" in english) that's not editable.
 * Now you can set it, just try to stay in a small range of letters to avoid text compression.
 * 
 * STEP 2 - Create the language packages: The second step is opening the "Other Language Translations"
 * field in the Plugin Parameters and start translating. The first field is the target language 
 * and then you have all the various system terms, parameters and so on!
 * 
 * STEP 3 - Database JSON creation: Dynamic database like Items, Monsters or Maps will need to
 * be handled via JSON. Doing this only before wrapping up your project is warmly recommended.
 * First of all you need to setup the WD_Translation folder in your project data folder, the
 * download on Itch or Ko-Fi already provide a premade folder with blank JSONs. Then, inside
 * the game, create a temporary event and use the command "Write a new translation JSON" once
 * for every JSON you need to create (usually you need all of them unless your project skips
 * certain mechanics, only "Map Names" isn't always useful, if you are not displaying the map
 * informations just skip it). Now you have JSON files in the WD_Translation folder with all
 * the languages you created so far (that's why it's IMPORTANT to 100% complete STEP 2 before
 * STEP 3) and the relevant translation informations (for example items have the name and the
 * description, all the rest of the data is skipped as it has nothing to do with multilanguage).
 * Use a program like Notepad++ or VScode to open them and manually translate the entries.
 * When the user changes the language the plugin will load those JSON (so leave every file there
 * even if it's empty!), search for the correct language and edit the $data... file of RPG
 * Maker to the new language. If there is no matching language, the default RPG Maker file will
 * be left in place (or reset if changed before)
 * 
 * STEP 4 - Text String JSON and translation: Creating a text translation can be long, but I 
 * tried to keep it as comfortable and easy as possible. First, tag EVERY text you want to 
 * translate with ||WDT...|| add an UNIQUE alphanumeric code in place of ...(example: ||WDTReid000||)
 * You can do it for name box, standard dialogue, choices, scrolling text (tag only the first
 * sentence of the scrolling text), change actor name, change actor nickname and change actor
 * profile. (NOTE: For the change Actor name/nick/profile, the plugin will Remember the changes
 * from this point onward). Now use the "Create Text Translation JSON" command and the plugin
 * will copy the codes in TextString.json, tagging what kind of RMMZ command uses it and ordering
 * it by map, event and event page! Use a program like Notepad++ or VScode to open it and translate
 * 
 * 
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 * And if you want a direct line with me, you can join my Discord:
 * https://discord.gg/gaa2E2pJ
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 * //////////////////////////////////////////////////
 * VERSION 1.0:
 * - Initial Release
 * //////////////////////////////////////////////////
 *
 */
/*~struct~languageSelection:
 * @param language
 * @text Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 */
/*~struct~mainTrans:
 * @param language
 * @text Translation Language
 * @desc Create the translations packages for System
 * @type struct<languageSelection>
 * @default {"language":"English"}
 * 
 * @param systemTranslation
 * @type struct<sysTrans>
 * @text System Text Translation
 * @desc Translate the System Text
 * @default {"gameTitle":"Your Game Title","currency":"RMMZ Dollars","combatMiss":"Miss","optionOn":"ON","optionOff":"OFF","optionLanguage":"Select Language:","level":"Level","levelA":"Lv","hp":"HP","hpA":"HP","mp":"MP","mpA":"MP","tp":"TP","tpA":"TP","exp":"EXP","expA":"EXP","fight":"Fight","escape":"Escape","attack":"Attack","guard":"Guard","item":"Item","skill":"Skill","equip":"Equip","status":"Status","formation":"Formation","save":"Save","gameEnd":"Game End","options":"Options","weapon":"Weapon","armor":"Armor","keyItem":"Key Item","equip2":"Equip","optimize":"Optimize","clear":"Clear","newGame":"New Game","continue_":"Continue","toTitle":"To Title","cancel":"Cancel","buy":"Buy","sell":"Sell","alwaysDash":"Always Dash","commandRemember":"Command Remember","touchUI":"Touch UI","bgmVolume":"BGM Volume","bgsVolume":"BGS Volume","meVolume":"ME Volume","seVolume":"SE Volume","possession":"Possession","expTotal":"Current %1","expNext":"To Next %1","saveMessage":"Which file would you like to save to?","loadMessage":"Which file would you like to load?","file":"File","autosave":"Autosave","partyName":"%1's Party","emerge":"%1 emerged!","preemptive":"%1 got the upper hand!","surprise":"%1 was surprised!","escapeStart":"%1 has started to escape!","escapeFailure":"However, it was unable to escape!","victory":"%1 was victorious!","defeat":"%1 was defeated.","obtainExp":"%1 %2 received!","obtainGold":"%1\\G found!","obtainItem":"%1 found!","levelUp":"%1 is now %2 %3!","obtainSkill":"%1 learned!","useItem":"%1 uses %2!","criticalToEnemy":"An excellent hit!!","criticalToActor":"A painful blow!!","actorDamage":"%1 took %2 damage!","actorRecovery":"%1 recovered %2 %3!","actorGain":"%1 gained %2 %3!","actorLoss":"%1 lost %2 %3!","actorDrain":"%1 was drained of %2 %3!","actorNoDamage":"%1 took no damage!","actorNoHit":"Miss! %1 took no damage!","enemyDamage":"%1 took %2 damage!","enemyRecovery":"%1 recovered %2 %3!","enemyGain":"%1 gained %2 %3!","enemyLoss":"%1 lost %2 %3!","enemyDrain":"%1 was drained of %2 %3!","enemyNoDamage":"%1 took no damage!","enemyNoHit":"Miss! %1 took no damage!","evasion":"%1 evaded the attack!","magicEvasion":"%1 nullified the magic!","magicReflection":"%1 reflected the magic!","counterAttack":"%1 made a counterattack!","substitute":"%1 protected %2!","buffAdd":"%1’s %2 went up!","debuffAdd":"%1’s %2 went down!","buffRemove":"%1’s %2 returned to normal!","actionFailure":"There was no effect on %1!"}
 * 
 * @param parametersTranslation
 * @type struct<paramTrans>
 * @text Parameters Translation
 * @desc Translate the Parameters
 * @default {"maxHP":"Max HP","maxMP":"Max MP","atk":"Attack","def":"Defense","matk":"M. Attack","mdef":"M. Defense","agi":"Agility","luk":"Luck","hit":"Hit","eva":"Evasion"}
 * 
 * @param elementsTranslation
 * @type struct<simpleField>[]
 * @text Elements Translation
 * @desc Elements translation (array must be the same length as original)
 * @default ["{\"trans\":\"Physical\"}","{\"trans\":\"Fire\"}","{\"trans\":\"Ice\"}","{\"trans\":\"Thunder\"}","{\"trans\":\"Water\"}","{\"trans\":\"Earth\"}","{\"trans\":\"Wind\"}","{\"trans\":\"Light\"}","{\"trans\":\"Darkness\"}"]
 * 
 * @param skillTypeTranslation
 * @type struct<simpleField>[]
 * @text Skill Type Translation
 * @desc Skill Type translation (array must be the same length as original)
 * @default ["{\"trans\":\"Magic\"}","{\"trans\":\"Special\"}"]
 * 
 * @param weaponTypeTranslation
 * @type struct<simpleField>[]
 * @text Weapon Type Translation
 * @desc Weapon Type translation (array must be the same length as original)
 * @default ["{\"trans\":\"Dagger\"}","{\"trans\":\"Sword\"}","{\"trans\":\"Flail\"}","{\"trans\":\"Axe\"}","{\"trans\":\"Whip\"}","{\"trans\":\"Staff\"}","{\"trans\":\"Bow\"}","{\"trans\":\"Crossbow\"}","{\"trans\":\"Gun\"}","{\"trans\":\"Claw\"}","{\"trans\":\"Glove\"}","{\"trans\":\"Spear\"}"]
 * 
 * @param armorTypeTranslation
 * @type struct<simpleField>[]
 * @text Armor Type Translation
 * @desc Armor Type translation (array must be the same length as original)
 * @default ["{\"trans\":\"General Armor\"}","{\"trans\":\"Magic Armor\"}","{\"trans\":\"Light Armor\"}","{\"trans\":\"Heavy Armor\"}","{\"trans\":\"Small Shield\"}","{\"trans\":\"Large Shield\"}"]
 * 
 * @param equipTypeTranslation
 * @type struct<simpleField>[]
 * @text Equipment Type Translation
 * @desc Equipment Type translation (array must be the same length as original)
 * @default ["{\"trans\":\"Weapon\"}","{\"trans\":\"Shield\"}","{\"trans\":\"Head\"}","{\"trans\":\"Body\"}","{\"trans\":\"Accessory\"}"]
 * 
 */
/*~struct~sysTrans:
 * @param gameTitle
 * @text Game Title
 * @default Your Game Title
 * 
 * @param currency
 * @text Currency
 * @default RMMZ Dollars
 * 
 * @param combatMiss
 * @text Miss (Combat)
 * @default Miss
 * 
 * @param optionOn
 * @text Option ON
 * @default ON
 * 
 * @param optionOff
 * @text Option OFF
 * @default OFF
 * 
 * @param optionLanguage
 * @text Option Select Language
 * @default Select Language:
 * 
 * @param level
 * @text Level
 * @default Level
 * 
 * @param levelA
 * @text Level (Abbreviated)
 * @default Lv
 * 
 * @param hp
 * @text HP
 * @default HP
 * 
 * @param hpA
 * @text HP (Abbreviated)
 * @default HP
 * 
 * @param mp
 * @text MP
 * @default MP
 * 
 * @param mpA
 * @text MP (Abbreviated)
 * @default MP
 * 
 * @param tp
 * @text TP
 * @default TP
 * 
 * @param tpA
 * @text TP (Abbreviated)
 * @default TP
 * 
 * @param exp
 * @text EXP
 * @default EXP
 * 
 * @param expA
 * @text EXP (Abbreviated)
 * @default EXP
 * 
 * @param fight
 * @text Fight
 * @default Fight
 * 
 * @param escape
 * @text Escape
 * @default Escape
 * 
 * @param attack
 * @text Attack
 * @default Attack
 * 
 * @param guard
 * @text Guard
 * @default Guard
 * 
 * @param item
 * @text Item
 * @default Item
 * 
 * @param skill
 * @text Skill
 * @default Skill
 * 
 * @param equip
 * @text Equip (Menu)
 * @default Equip
 * 
 * @param status
 * @text Status
 * @default Status
 * 
 * @param formation
 * @text Formation
 * @default Formation
 * 
 * @param save
 * @text Save
 * @default Save
 * 
 * @param gameEnd
 * @text Game End
 * @default Game End
 * 
 * @param options
 * @text Options
 * @default Options
 * 
 * @param weapon
 * @text Weapon
 * @default Weapon
 * 
 * @param armor
 * @text Armor
 * @default Armor
 * 
 * @param keyItem
 * @text Key Item
 * @default Key Item
 * 
 * @param equip2
 * @text Equip (Inventory)
 * @default Equip
 * 
 * @param optimize
 * @text Optimize
 * @default Optimize
 * 
 * @param clear
 * @text Clear
 * @default Clear
 * 
 * @param newGame
 * @text New Game
 * @default New Game
 * 
 * @param continue_
 * @text Continue
 * @default Continue
 * 
 * @param toTitle
 * @text To Title
 * @default To Title
 * 
 * @param cancel
 * @text Cancel
 * @default Cancel
 * 
 * @param buy
 * @text Buy
 * @default Buy
 * 
 * @param sell
 * @text Sell
 * @default Sell
 * 
 * @param alwaysDash
 * @text Always Dash
 * @default Always Dash
 * 
 * @param commandRemember
 * @text Command Remember
 * @default Command Remember
 * 
 * @param touchUI
 * @text Touch UI
 * @default Touch UI
 * 
 * @param bgmVolume
 * @text BGM Volume
 * @default BGM Volume
 * 
 * @param bgsVolume
 * @text BGS Volume
 * @default BGS Volume
 * 
 * @param meVolume
 * @text ME Volume
 * @default ME Volume
 * 
 * @param seVolume
 * @text SE Volume
 * @default SE Volume
 * 
 * @param possession
 * @text Possession
 * @default Possession
 * 
 * @param expTotal
 * @text Exp Total
 * @default Current %1
 * 
 * @param expNext
 * @text Exp Next
 * @default To Next %1
 * 
 * @param saveMessage
 * @text Save Message
 * @default Which file would you like to save to?
 * 
 * @param loadMessage
 * @text Load Message
 * @default Which file would you like to load?
 * 
 * @param file
 * @text File
 * @default File
 * 
 * @param autosave
 * @text Autosave
 * @default Autosave
 * 
 * @param partyName
 * @text Party Name
 * @default %1's Party
 * 
 * @param emerge
 * @text Emerge
 * @default %1 emerged!
 * 
 * @param preemptive
 * @text Preemptive
 * @default %1 got the upper hand!
 * 
 * @param surprise
 * @text Surprise
 * @default %1 was surprised!
 * 
 * @param escapeStart
 * @text Escape Start
 * @default %1 has started to escape!
 * 
 * @param escapeFailure
 * @text Escape Failure
 * @default However, it was unable to escape!
 * 
 * @param victory
 * @text Victory
 * @default %1 was victorious!
 * 
 * @param defeat
 * @text Defeat
 * @default %1 was defeated.
 * 
 * @param obtainExp
 * @text Obtain Exp
 * @default %1 %2 received!
 * 
 * @param obtainGold
 * @text Obtain Gold
 * @default %1\G found!
 * 
 * @param obtainItem
 * @text Obtain Item
 * @default %1 found!
 * 
 * @param levelUp
 * @text Level Up
 * @default %1 is now %2 %3!
 * 
 * @param obtainSkill
 * @text Obtain Skill
 * @default %1 learned!
 * 
 * @param useItem
 * @text Use Item
 * @default %1 uses %2!
 * 
 * @param criticalToEnemy
 * @text Critical To Enemy
 * @default An excellent hit!!
 * 
 * @param criticalToActor
 * @text Critical To Actor
 * @default A painful blow!!
 * 
 * @param actorDamage
 * @text Actor Damage
 * @default %1 took %2 damage!
 * 
 * @param actorRecovery
 * @text Actor Recovery
 * @default %1 recovered %2 %3!
 * 
 * @param actorGain
 * @text Actor Gain
 * @default %1 gained %2 %3!
 * 
 * @param actorLoss
 * @text Actor Loss
 * @default %1 lost %2 %3!
 * 
 * @param actorDrain
 * @text Actor Drain
 * @default %1 was drained of %2 %3!
 * 
 * @param actorNoDamage
 * @text Actor No Damage
 * @default %1 took no damage!
 * 
 * @param actorNoHit
 * @text Actor No Hit
 * @default Miss! %1 took no damage!
 * 
 * @param enemyDamage
 * @text Enemy Damage
 * @default %1 took %2 damage!
 * 
 * @param enemyRecovery
 * @text Enemy Recovery
 * @default %1 recovered %2 %3!
 * 
 * @param enemyGain
 * @text Enemy Gain
 * @default %1 gained %2 %3!
 * 
 * @param enemyLoss
 * @text Enemy Loss
 * @default %1 lost %2 %3!
 * 
 * @param enemyDrain
 * @text Enemy Drain
 * @default %1 was drained of %2 %3!
 * 
 * @param enemyNoDamage
 * @text Enemy No Damage
 * @default %1 took no damage!
 * 
 * @param enemyNoHit
 * @text Enemy No Hit
 * @default Miss! %1 took no damage!
 * 
 * @param evasion
 * @text Evasion
 * @default %1 evaded the attack!
 * 
 * @param magicEvasion
 * @text Magic Evasion
 * @default %1 nullified the magic!
 * 
 * @param magicReflection
 * @text Magic Reflection
 * @default %1 reflected the magic!
 * 
 * @param counterAttack
 * @text Counter Attack
 * @default %1 made a counterattack!
 * 
 * @param substitute
 * @text Substitute
 * @default %1 protected %2!
 * 
 * @param buffAdd
 * @text Buff Add
 * @default %1’s %2 went up!
 * 
 * @param debuffAdd
 * @text Debuff Add
 * @default %1’s %2 went down!
 * 
 * @param buffRemove
 * @text Buff Remove
 * @default %1’s %2 returned to normal!
 * 
 * @param actionFailure
 * @text Action Failure
 * @default There was no effect on %1!
 */
/*~struct~paramTrans:
 * @param maxHP
 * @text Max HP
 * @default Max HP
 * 
 * @param maxMP
 * @text Max MP
 * @default Max MP
 * 
 * @param atk
 * @text Attack
 * @default Attack
 * 
 * @param def
 * @text Defense
 * @default Defense
 * 
 * @param matk
 * @text Magic Attack
 * @default M. Attack
 * 
 * @param mdef
 * @text Magic Defense
 * @default M. Defense
 * 
 * @param agi
 * @text Agility
 * @default Agility
 * 
 * @param luk
 * @text Luck
 * @default Luck
 * 
 * @param hit
 * @text Hit
 * @default Hit
 * 
 * @param eva
 * @text Evasion
 * @default Evasion
 */
/*~struct~simpleField:
 * @param trans
 * @text Translation
 * @default
 */
 
//Pushing Plugin JSON in DataManager
var $dataWDTransActors = null;
var $dataWDTransClasses = null;
var $dataWDTransEnemies = null;
var $dataWDTransItems = null;
var $dataWDTransArmors = null;
var $dataWDTransWeapons = null;
var $dataWDTransSkills = null;
var $dataWDTransStates = null;
var $dataWDTransMapInfos = null;
var $dataWDTransTextStrings = null;

DataManager._databaseFiles.push({name: '$dataWDTransActors', src: 'WD_Translation/Actors.json'});
DataManager._databaseFiles.push({name: '$dataWDTransClasses', src: 'WD_Translation/Classes.json'});
DataManager._databaseFiles.push({name: '$dataWDTransEnemies', src: 'WD_Translation/Enemies.json'});
DataManager._databaseFiles.push({name: '$dataWDTransItems', src: 'WD_Translation/Items.json'});
DataManager._databaseFiles.push({name: '$dataWDTransArmors', src: 'WD_Translation/Armors.json'});
DataManager._databaseFiles.push({name: '$dataWDTransWeapons', src: 'WD_Translation/Weapons.json'});
DataManager._databaseFiles.push({name: '$dataWDTransSkills', src: 'WD_Translation/Skills.json'});
DataManager._databaseFiles.push({name: '$dataWDTransStates', src: 'WD_Translation/States.json'});
DataManager._databaseFiles.push({name: '$dataWDTransMapInfos', src: 'WD_Translation/MapInfos.json'});
DataManager._databaseFiles.push({name: '$dataWDTransTextStrings', src: 'WD_Translation/TextStrings.json'});
DataManager._databaseFiles.push({name: '$dataWDTransSettings', src: 'WD_Translation/SavedProperties.json'});

!function(){class o{constructor(a=0){for(const e of v)this[e.language]=this.usefulTranslationData(a)}usefulTranslationData(a=0){let e=[null];switch(a){case 0:for(const t of $dataActors)null!==t&&e.push({name:t.name,nickname:t.nickname,profile:t.profile});break;case 1:for(const r of $dataClasses)null!==r&&e.push({name:r.name});break;case 2:for(const s of $dataEnemies)null!==s&&e.push({name:s.name});break;case 3:for(const i of $dataItems)null!==i&&e.push({name:i.name,description:i.description});break;case 4:for(const o of $dataArmors)null!==o&&e.push({name:o.name,description:o.description});break;case 5:for(const l of $dataWeapons)null!==l&&e.push({name:l.name,description:l.description});break;case 6:for(const u of $dataSkills)null!==u&&e.push({name:u.name,description:u.description,message1:u.message1,message2:u.message2});break;case 7:for(const g of $dataStates)null!==g&&e.push({name:g.name,message1:g.message1,message2:g.message2,message3:g.message3,message4:g.message4});break;case 8:var n=c();0<n.length&&(e=e.concat(n))}return e}}var a=PluginManager.parameters("WD_Translation"),e=JSON.parse(a.defaultLanguage);const v=function(a){let e=JSON.parse(a);for(let a=0;a<e.length;a++)e[a]=JSON.parse(e[a]),e[a].systemTranslation=JSON.parse(e[a].systemTranslation),e[a].parametersTranslation=JSON.parse(e[a].parametersTranslation),e[a].parametersTranslation=[e[a].parametersTranslation.maxHP,e[a].parametersTranslation.maxMP,e[a].parametersTranslation.atk,e[a].parametersTranslation.def,e[a].parametersTranslation.matk,e[a].parametersTranslation.mdef,e[a].parametersTranslation.agi,e[a].parametersTranslation.luk,e[a].parametersTranslation.hit,e[a].parametersTranslation.eva],e[a].elementsTranslation=n(e[a].elementsTranslation),e[a].skillTypeTranslation=n(e[a].skillTypeTranslation),e[a].weaponTypeTranslation=n(e[a].weaponTypeTranslation),e[a].armorTypeTranslation=n(e[a].armorTypeTranslation),e[a].equipTypeTranslation=n(e[a].equipTypeTranslation);return function(a){const t=a;!function a(){if($dataSystem)for(const n of t){var e=n.language;if(n.elementsTranslation.length!==$dataSystem.elements.length)throw new Error("WD_Translation: Translation Elements Array doesn't match original Elements Array for language: "+e);if(n.skillTypeTranslation.length!==$dataSystem.skillTypes.length)throw new Error("WD_Translation: Translation Skill Types Array doesn't match original Skill Type Array for language: "+e);if(n.weaponTypeTranslation.length!==$dataSystem.weaponTypes.length)throw new Error("WD_Translation: Translation Weapons Array doesn't match original Weapons Array for language: "+e);if(n.armorTypeTranslation.length!==$dataSystem.armorTypes.length)throw new Error("WD_Translation: Translation Armors Array doesn't match original Armors Array for language: "+e);if(n.equipTypeTranslation.length!==$dataSystem.equipTypes.length)throw new Error("WD_Translation: Translation Equipment Array doesn't match original Equipment Array for language: "+e)}else requestAnimationFrame(a)}()}(e=function(a){for(const e of a)e.language=JSON.parse(e.language),e.language=e.language.language;return a}(e)),e;function n(a){var e=JSON.parse(a).map(a=>JSON.parse(a)),n=[""];for(let a=0;a<e.length;a++)n.push(e[a].trans);return n}}(a.mainTranslation),n="true"===a.optionsLanguageFlag,h={defaultLanguage:e.language,defaultHardcode:{defaultCombatMiss:a.defaultCombatMiss,defaultOptionOn:a.defaultOptionOn,defaultOptionOff:a.defaultOptionOff,defaultOptionLanguage:a.defaultOptionLanguage},isForced:!1,forcedLanguage:"",runningDefault:!0,currentLanguageData:null,originalDataFiles:[$dataActors,$dataClasses,$dataEnemies,$dataItems,$dataArmors,$dataWeapons,$dataSkills,$dataStates,$dataMapInfos]},T={wdStatSkill:!1};let y=[];function t(a){W();var e={data:null,language:h.defaultLanguage},e=(h.currentLanguageData=window.WD_Interplugin_Core.forceLanguage(e,v,a),(h.currentLanguageData.language===h.defaultLanguage?(h.runningDefault=!0,h.isForced=!1,h.forcedLanguage="",document.title=$dataSystem.gameTitle,r):(h.isForced=!0,h.forcedLanguage=a,h.runningDefault=!1,document.title=h.currentLanguageData.systemTranslation.gameTitle,s))(),D(),w(),JSON.stringify(h,null,4)),a=require("fs"),n=require("path"),t=n.dirname(process.mainModule.filename),t=(n=n.join(t,"data/WD_Translation/"))+"SavedProperties.json";a.existsSync(n)||a.mkdirSync(n),a.writeFileSync(t,e)}function r(){i(0,void 0,!0),i(1,void 0,!0),i(2,void 0,!0),i(3,void 0,!0),i(4,void 0,!0),i(5,void 0,!0),i(6,void 0,!0),i(7,void 0,!0)}function s(){i(0,h.currentLanguageData.language,!1),i(1,h.currentLanguageData.language,!1),i(2,h.currentLanguageData.language,!1),i(3,h.currentLanguageData.language,!1),i(4,h.currentLanguageData.language,!1),i(5,h.currentLanguageData.language,!1),i(6,h.currentLanguageData.language,!1),i(7,h.currentLanguageData.language,!1)}function i(a=0,e="English",n=!1){let t=null,r=null,s=null;switch(a){case 0:t=$dataActors,r=$dataWDTransActors.hasOwnProperty(e)?$dataWDTransActors[e]:h.originalDataFiles[a],s=0;break;case 1:t=$dataClasses,r=$dataWDTransClasses.hasOwnProperty(e)?$dataWDTransClasses[e]:h.originalDataFiles[a],s=1;break;case 2:t=$dataEnemies,r=$dataWDTransEnemies.hasOwnProperty(e)?$dataWDTransEnemies[e]:h.originalDataFiles[a],s=1;break;case 3:t=$dataItems,r=$dataWDTransItems.hasOwnProperty(e)?$dataWDTransItems[e]:h.originalDataFiles[a],s=2;break;case 4:t=$dataArmors,r=$dataWDTransArmors.hasOwnProperty(e)?$dataWDTransArmors[e]:h.originalDataFiles[a],s=2;break;case 5:t=$dataWeapons,r=$dataWDTransWeapons.hasOwnProperty(e)?$dataWDTransWeapons[e]:h.originalDataFiles[a],s=2;break;case 6:t=$dataSkills,r=$dataWDTransSkills.hasOwnProperty(e)?$dataWDTransSkills[e]:h.originalDataFiles[a],s=3;break;case 7:t=$dataStates,r=$dataWDTransStates.hasOwnProperty(e)?$dataWDTransStates[e]:h.originalDataFiles[a],s=4;break;case 8:t=$dataMapInfos,r=$dataWDTransMapInfos.hasOwnProperty(e)?$dataWDTransMapInfos[e]:h.originalDataFiles[a],s=1;break;default:throw new Error("WD_Translation: Error in translateDataJSON function! Unexpected mode argument: "+a)}if(n&&(r=h.originalDataFiles[a]),1===a){var i=PluginManager._scripts,o={wdStatSkillFlag:!1};for(let a=0;a<i.length;a++)"WD_StatsAndSkills"===i[a]&&(o.wdStatSkillFlag=!0);o.wdStatSkillFlag&&(u=window.WD_Interplugin_StatsAndSkills.pingWdTranslation(!0),T.wdStatSkill=u.isFlagged)}var l={isActive:!1,maxI:-1};if(1===a&&T.wdStatSkill&&t.length!==r.length){var u=window.WD_Interplugin_StatsAndSkills.pingWdTranslation(!1);for(let a=0;a<t.length;a++)l["id"+a]=a,l.maxI=a;for(const d of u.data)l["id"+d.id]=d.reference,l.maxI=d.id>l.maxI?d.id:l.maxI;l.isActive=!0}switch(s){case 0:for(let a=1;a<t.length;a++)null!==t[a]&&null!==r[a]&&(t[a].name=r[a].name,t[a].nickname=r[a].nickname,t[a].profile=r[a].profile);break;case 1:if(1===a&&l.isActive)for(let a=1;a<t.length;a++)null!==t[a]&&(l.hasOwnProperty("id"+a)?t[a].name=r[l["id"+a]].name:t[a].name=r[1].name);else for(let a=1;a<t.length;a++)null!==t[a]&&null!==r[a]&&(t[a].name=r[a].name);break;case 2:for(let a=1;a<t.length;a++)null!==t[a]&&null!==r[a]&&(t[a].name=r[a].name,t[a].description=r[a].description);break;case 3:for(let a=1;a<t.length;a++)null!==t[a]&&null!==r[a]&&(t[a].name=r[a].name,t[a].description=r[a].description,t[a].message1=r[a].message1,t[a].message2=r[a].message2);break;case 4:for(let a=1;a<t.length;a++)null!==t[a]&&null!==r[a]&&(t[a].name=r[a].name,t[a].message1=r[a].message1,t[a].message2=r[a].message2,t[a].message3=r[a].message3,t[a].message4=r[a].message4);break;default:throw new Error("WD_Translation: Error in translateDataJSON function! Unexpected action argument: "+s)}if(0===a){var g={isDefault:n||h.runningDefault,language:n||h.runningDefault?h.defaultLanguage:h.currentLanguageData.language};if(0<y.length)for(const m of $dataActors)if(m){const p=m.id;var c=y.filter(a=>a.actorID===p);if(0<c.length)for(const f of c){let a="";switch(a=!g.isDefault&&c.data.hasOwnProperty(g.language)?c.data[g.language]:c.data.default,c.code){case 320:m.name=a;break;case 324:m.nickname=a;break;case 325:m.profile=a}}}}}function l(a,e){switch(a){case"basic":switch(e){case 0:return h.currentLanguageData.systemTranslation.level;case 1:return h.currentLanguageData.systemTranslation.levelA;case 2:return h.currentLanguageData.systemTranslation.hp;case 3:return h.currentLanguageData.systemTranslation.hpA;case 4:return h.currentLanguageData.systemTranslation.mp;case 5:return h.currentLanguageData.systemTranslation.mpA;case 6:return h.currentLanguageData.systemTranslation.tp;case 7:return h.currentLanguageData.systemTranslation.tpA;case 8:return h.currentLanguageData.systemTranslation.exp;case 9:return h.currentLanguageData.systemTranslation.expA;default:throw new Error("WD_Translation: Invalid param in TextManager method basic ("+e+")")}case"command":switch(e){case 0:return h.currentLanguageData.systemTranslation.fight;case 1:return h.currentLanguageData.systemTranslation.escape;case 2:return h.currentLanguageData.systemTranslation.attack;case 3:return h.currentLanguageData.systemTranslation.guard;case 4:return h.currentLanguageData.systemTranslation.item;case 5:return h.currentLanguageData.systemTranslation.skill;case 6:return h.currentLanguageData.systemTranslation.equip;case 7:return h.currentLanguageData.systemTranslation.status;case 8:return h.currentLanguageData.systemTranslation.formation;case 9:return h.currentLanguageData.systemTranslation.save;case 10:return h.currentLanguageData.systemTranslation.gameEnd;case 11:return h.currentLanguageData.systemTranslation.options;case 12:return h.currentLanguageData.systemTranslation.weapon;case 13:return h.currentLanguageData.systemTranslation.armor;case 14:return h.currentLanguageData.systemTranslation.keyItem;case 15:return h.currentLanguageData.systemTranslation.equip2;case 16:return h.currentLanguageData.systemTranslation.optimize;case 17:return h.currentLanguageData.systemTranslation.clear;case 18:return h.currentLanguageData.systemTranslation.newGame;case 19:return h.currentLanguageData.systemTranslation.continue_;case 21:return h.currentLanguageData.systemTranslation.toTitle;case 22:return h.currentLanguageData.systemTranslation.cancel;case 24:return h.currentLanguageData.systemTranslation.buy;case 25:return h.currentLanguageData.systemTranslation.sell;default:throw new Error("WD_Translation: Invalid param in TextManager method command ("+e+")")}case"message":switch(e){case"alwaysDash":return h.currentLanguageData.systemTranslation.alwaysDash;case"commandRemember":return h.currentLanguageData.systemTranslation.commandRemember;case"touchUI":return h.currentLanguageData.systemTranslation.touchUI;case"bgmVolume":return h.currentLanguageData.systemTranslation.bgmVolume;case"bgsVolume":return h.currentLanguageData.systemTranslation.bgsVolume;case"meVolume":return h.currentLanguageData.systemTranslation.meVolume;case"seVolume":return h.currentLanguageData.systemTranslation.seVolume;case"possession":return h.currentLanguageData.systemTranslation.possession;case"expTotal":return h.currentLanguageData.systemTranslation.expTotal;case"expNext":return h.currentLanguageData.systemTranslation.expNext;case"saveMessage":return h.currentLanguageData.systemTranslation.saveMessage;case"loadMessage":return h.currentLanguageData.systemTranslation.loadMessage;case"file":return h.currentLanguageData.systemTranslation.file;case"autosave":return h.currentLanguageData.systemTranslation.autosave;case"partyName":return h.currentLanguageData.systemTranslation.partyName;case"emerge":return h.currentLanguageData.systemTranslation.emerge;case"preemptive":return h.currentLanguageData.systemTranslation.preemptive;case"surprise":return h.currentLanguageData.systemTranslation.surprise;case"escapeStart":return h.currentLanguageData.systemTranslation.escapeStart;case"escapeFailure":return h.currentLanguageData.systemTranslation.escapeFailure;case"victory":return h.currentLanguageData.systemTranslation.victory;case"defeat":return h.currentLanguageData.systemTranslation.defeat;case"obtainExp":return h.currentLanguageData.systemTranslation.obtainExp;case"obtainGold":return h.currentLanguageData.systemTranslation.obtainGold;case"obtainItem":return h.currentLanguageData.systemTranslation.obtainItem;case"levelUp":return h.currentLanguageData.systemTranslation.levelUp;case"obtainSkill":return h.currentLanguageData.systemTranslation.obtainSkill;case"useItem":return h.currentLanguageData.systemTranslation.useItem;case"criticalToEnemy":return h.currentLanguageData.systemTranslation.criticalToEnemy;case"criticalToActor":return h.currentLanguageData.systemTranslation.criticalToActor;case"actorDamage":return h.currentLanguageData.systemTranslation.actorDamage;case"actorRecovery":return h.currentLanguageData.systemTranslation.actorRecovery;case"actorGain":return h.currentLanguageData.systemTranslation.actorGain;case"actorLoss":return h.currentLanguageData.systemTranslation.actorLoss;case"actorDrain":return h.currentLanguageData.systemTranslation.actorDrain;case"actorNoDamage":return h.currentLanguageData.systemTranslation.actorNoDamage;case"actorNoHit":return h.currentLanguageData.systemTranslation.actorNoHit;case"enemyDamage":return h.currentLanguageData.systemTranslation.enemyDamage;case"enemyRecovery":return h.currentLanguageData.systemTranslation.enemyRecovery;case"enemyGain":return h.currentLanguageData.systemTranslation.enemyGain;case"enemyLoss":return h.currentLanguageData.systemTranslation.enemyLoss;case"enemyDrain":return h.currentLanguageData.systemTranslation.enemyDrain;case"enemyNoDamage":return h.currentLanguageData.systemTranslation.enemyNoDamage;case"enemyNoHit":return h.currentLanguageData.systemTranslation.enemyNoHit;case"evasion":return h.currentLanguageData.systemTranslation.evasion;case"magicEvasion":return h.currentLanguageData.systemTranslation.magicEvasion;case"magicReflection":return h.currentLanguageData.systemTranslation.magicReflection;case"counterAttack":return h.currentLanguageData.systemTranslation.counterAttack;case"substitute":return h.currentLanguageData.systemTranslation.substitute;case"buffAdd":return h.currentLanguageData.systemTranslation.buffAdd;case"debuffAdd":return h.currentLanguageData.systemTranslation.debuffAdd;case"buffRemove":return h.currentLanguageData.systemTranslation.buffRemove;case"actionFailure":return h.currentLanguageData.systemTranslation.actionFailure;default:throw new Error("WD_Translation: Invalid param in TextManager method message ("+e+")")}default:throw new Error("WD_Translation: Invalid method in TextManager ("+a+")")}}function c(){var e=require("fs"),a=require("path"),n=a.dirname(process.mainModule.filename),t=a.join(n,"data/"),r=[];try{var s=e.readdirSync(t),i=s.filter(a=>a.includes("Map")&&!a.includes("MapInfos")),o=t+s.filter(a=>a.includes("MapInfos"))[0],l=e.readFileSync(o,{encoding:"utf8"}),u=JSON.parse(l);for(let a=0;a<i.length;a++){var g=t+i[a],c=e.readFileSync(g,{encoding:"utf8"}),d=JSON.parse(c),m=parseInt(function(a){let e=String(a);return e=(e=e.replace("Map","")).replace(".json","")}(i[a])),p=d.displayName,f=function(a,e){for(const n of e)if(null!==n&&n.id===a)return n.name;return""}(m,u);r.push({id:m,displayName:p,mapNameDoNotTranslate:f})}return r}catch(a){throw new Error("WD_Translation: Error loading map files! Error: "+a)}}function u(a){var e=require("fs"),n=require("path"),t=n.dirname(process.mainModule.filename),r=n.join(t,"data/"),s=[null];try{var i=r+e.readdirSync(r).filter(a=>a.includes("MapInfos"))[0],o=e.readFileSync(i,{encoding:"utf8"});for(const y of JSON.parse(o))if(null!==y){let a="";var l=r+("Map"+(a=100<=y.id?y.id:10<=y.id?"0"+y.id:"00"+y.id)+".json"),u=e.readFileSync(l,{encoding:"utf8"});s.push(JSON.parse(u))}{var g=s;var c=a;const D={code:"",line:0,lastCode:0},S=null===c?new Set:c;let l=[];for(let t=1;t<g.length;t++)for(let n=1;n<g[t].events.length;n++)if(null!==g[t].events[n])for(let e=0;e<g[t].events[n].pages.length;e++){D.line=0,D.code="";for(let a=0;a<g[t].events[n].pages[e].list.length;a++){var d=g[t].events[n].pages[e].list[a];if(101===d.code)D.line=0,D.code="",D.lastCode=0,5<=d.parameters.length&&d.parameters[4].includes("||WDT")&&T(d.parameters[4],t,n,e,d.code);else if(401===d.code)d.parameters[0].includes("||WDT")||0<D.line&&401===D.lastCode?T(d.parameters[0],t,n,e,d.code):(D.line=0,D.code="",D.lastCode=0);else if(102===d.code){D.line=0,D.code="",D.lastCode=0;for(const L of d.parameters[0])L.includes("||WDT")&&T(L,t,n,e,d.code)}else 402===d.code?(D.line=0,D.code="",D.lastCode=0,d.parameters[1].includes("||WDT")&&T(d.parameters[1],t,n,e,d.code)):405===d.code?d.parameters[0].includes("||WDT")||0<D.line&&405===D.lastCode?T(d.parameters[0],t,n,e,d.code):(D.line=0,D.code="",D.lastCode=0):320===d.code||324===d.code||325===d.code?(D.line=0,D.code="",D.lastCode=0,d.parameters[1].includes("||WDT")&&T(d.parameters[1],t,n,e,d.code)):(D.line=0,D.code="",D.lastCode=0)}}for(let e=0;e<$dataCommonEvents.length;e++)if($dataCommonEvents[e]){var m=""===$dataCommonEvents[e].name?"Common Event "+e:"Common Event "+e+": "+$dataCommonEvents[e].name,p=null,f=null;D.line=0,D.code="";for(let a=0;a<$dataCommonEvents[e].list.length;a++){var h=$dataCommonEvents[e].list[a];if(101===h.code)D.line=0,D.code="",D.lastCode=0,5<=h.parameters.length&&h.parameters[4].includes("||WDT")&&T(h.parameters[4],m,p,f,h.code);else if(401===h.code)h.parameters[0].includes("||WDT")||0<D.line&&401===D.lastCode?T(h.parameters[0],m,p,f,h.code):(D.line=0,D.code="",D.lastCode=0);else if(102===h.code){D.line=0,D.code="",D.lastCode=0;for(const w of h.parameters[0])w.includes("||WDT")&&T(w,m,p,f,h.code)}else 402===h.code?(D.line=0,D.code="",D.lastCode=0,h.parameters[1].includes("||WDT")&&T(h.parameters[1],m,p,f,h.code)):405===h.code?h.parameters[0].includes("||WDT")||0<D.line&&405===D.lastCode?T(h.parameters[0],m,p,f,h.code):(D.line=0,D.code="",D.lastCode=0):320===h.code||324===h.code||325===h.code?(D.line=0,D.code="",D.lastCode=0,h.parameters[1].includes("||WDT")&&T(h.parameters[1],m,p,f,h.code)):(D.line=0,D.code="",D.lastCode=0)}}function T(a,e,n,t,r){var s=a.match(/\|\|WDT[a-zA-Z0-9]+\|\|/);if(405===r)if(0<D.line){var i="MultiLine - Line "+D.line;l.push({code:D.code,textString:a,type:i,mapId:e,eventId:n,pageNumber:t,typeCode:r}),D.line++}else{if(null===s)throw new Error("WD_Translation: Found no match in the string: "+a+"! Check the ||WDT(code)|| tag");if(1<s.length)throw new Error("WD_Translation: Found more than one match in the string: "+a+"! Please use only one code per string");var i=s[0],o=a.replace(i,"");S.has(i)||(l.push({code:i,textString:o,type:"MultiLine - Start Line",mapId:e,eventId:n,pageNumber:t,typeCode:r}),S.add(i),D.code=i,D.lastCode=r,D.line++)}else if(401===r)if(0<D.line){o="Dialogue - Line "+D.line;l.push({code:D.code,textString:a,type:o,mapId:e,eventId:n,pageNumber:t,typeCode:r}),D.line++}else{if(null===s)throw new Error("WD_Translation: Found no match in the string: "+a+"! Check the ||WDT(code)|| tag");if(1<s.length)throw new Error("WD_Translation: Found more than one match in the string: "+a+"! Please use only one code per string");i=s[0],o=a.replace(i,"");S.has(i)||(l.push({code:i,textString:o,type:"Dialogue - Start Line",mapId:e,eventId:n,pageNumber:t,typeCode:r}),S.add(i),D.code=i,D.lastCode=r,D.line++)}else{if(null===s)throw new Error("WD_Translation: Found no match in the string: "+a+"! Check the ||WDT(code)|| tag");if(1<s.length)throw new Error("WD_Translation: Found more than one match in the string: "+a+"! Please use only one code per string");o=s[0],i=a.replace(o,"");if(!S.has(o)){let a="";101===r?a="Name Box":401===r?a="Dialogue Box":102===r||402===r?a="Choice Box":320===r?a="Change Actor Name":324===r?a="Change Actor Nickname":325===r&&(a="Change Actor Profile"),l.push({code:o,textString:i,type:a,mapId:e,eventId:n,pageNumber:t,typeCode:r}),S.add(o)}}}!function(a,e){if(e||0!==a.length){var n=e?{default:a}:$dataWDTransTextStrings;if(e)for(const i of v)n[i.language]=a;else{n.default=n.default.concat(a),n.default.sort((a,e)=>a.mapId!==e.mapId?a.mapId-e.mapId:a.eventId!==e.eventId?a.eventId-e.eventId:a.pageNumber-e.pageNumber);for(const o of v)n.hasOwnProperty(o.language)?(n[o.language]=n[o.language].concat(a),n[o.language].sort((a,e)=>a.mapId!==e.mapId?a.mapId-e.mapId:a.eventId!==e.eventId?a.eventId-e.eventId:a.pageNumber-e.pageNumber)):(n[o.language]=JSON.parse(JSON.stringify(n.default)),n[o.language]=n[o.language].concat(a),n[o.language].sort((a,e)=>a.mapId!==e.mapId?a.mapId-e.mapId:a.eventId!==e.eventId?a.eventId-e.eventId:a.pageNumber-e.pageNumber))}var e=JSON.stringify(n,null,4),t=require("fs"),r=require("path"),s=r.dirname(process.mainModule.filename),r=r.join(s,"data/WD_Translation/"),s=r+"TextStrings.json";t.existsSync(r)||t.mkdirSync(r),t.writeFileSync(s,e)}}(l,null===c);return}}catch(a){throw new Error("WD_Translation: Error loading map files! Error: "+a)}}function g(a,e){if(a){var n=a.match(/\|\|WDT[a-zA-Z0-9]+\|\|/);if(null===n)return a;if(1<n.length)throw new Error("WD_Translation: Found more than one match in the string: "+a+"! Please use only one code per string");var t=n[0],n=h.runningDefault?"default":h.currentLanguageData.language,n=$dataWDTransTextStrings.hasOwnProperty(n)?$dataWDTransTextStrings[n]:$dataWDTransTextStrings.default,r={isFound:!1,text:""};if(n)for(const s of n)if(s.code===t&&s.typeCode===e){r.isFound=!0,r.text=s.textString;break}return r.isFound?r.text:a.replace(t,"")}}function d(e){var n=[],t=[];for(const a of e[0])n.push(g(a,102));for(let a=0;a<e.length;a++)0===a?t.push(n):t.push(e[a]);return t}function m(a,e,n,t){var r={isTranslating:!1,text:"",wdCode:null};let s=null;if(a){if(e){if(null===(s=a.match(/\|\|WDT[a-zA-Z0-9]+\|\|/)))return r.text=a,r;if(1<s.length)throw new Error("WD_Translation: Found more than one match in the string: "+a+"! Please use only one code per string");r.isTranslating=!0,r.wdCode=s[0]}var i=e?s[0]:t,t=h.runningDefault?"default":h.currentLanguageData.language,t=$dataWDTransTextStrings.hasOwnProperty(t)?$dataWDTransTextStrings[t]:$dataWDTransTextStrings.default,o={isFound:!1,text:""},l=e?"MultiLine - Start Line":"MultiLine - Line "+n;if(t)for(const u of t)if(u.code===i&&u.type===l){o.isFound=!0,o.text=u.textString;break}r.text=o.isFound?o.text:a.replace(i,"")}else r.text=void 0;return r}function p(a,e,n,t){var r={isTranslating:!1,text:"",wdCode:null};let s=null;if(a){if(e){if(null===(s=a.match(/\|\|WDT[a-zA-Z0-9]+\|\|/)))return r.text=a,r;if(1<s.length)throw new Error("WD_Translation: Found more than one match in the string: "+a+"! Please use only one code per string");r.isTranslating=!0,r.wdCode=s[0]}var i=e?s[0]:t,t=h.runningDefault?"default":h.currentLanguageData.language,t=$dataWDTransTextStrings.hasOwnProperty(t)?$dataWDTransTextStrings[t]:$dataWDTransTextStrings.default,o={isFound:!1,text:""},l=e?"Dialogue - Start Line":"Dialogue - Line "+n;if(t)for(const u of t)if(u.code===i&&u.type===l){o.isFound=!0,o.text=u.textString;break}r.text=o.isFound?o.text:a.replace(i,"")}else r.text=void 0;return r}function f(a,e,n){if(e){var t=e.match(/\|\|WDT[a-zA-Z0-9]+\|\|/);if(null!==t){if(1<t.length)throw new Error("WD_Translation: Found more than one match in the string: "+e+"! Please use only one code per string");var r=t[0],s={};for(const u in $dataWDTransTextStrings){var i={isFound:!1,text:""};for(const g of $dataWDTransTextStrings[u])if(g.code===r&&g.typeCode===n){i.isFound=!0,i.text=g.textString;break}i.isFound&&(s[u]=i.text)}if(0<Object.keys(s)){var o={actorID:a,code:n,data:s},l={isFound:!1,index:null};for(let a=0;a<y.length;a++)if(y[a].actorID===o.actorID&&y[a].code===o.code){l.isFound=!0,l.index=a;break}l.isFound&&y.splice(l.index,1),y.push(o),w()}}}}function D(){if($gameActors)for(const e of $gameActors._data){var a;e&&(a=e._actorId,e.setName($dataActors[a].name),e.setNickname($dataActors[a].nickname),e.setProfile($dataActors[a].profile))}}PluginManager.registerCommand("WD_Translation","createNewJSON",function(a){var a=parseInt(a.dataType),e=["Actors","Classes","Enemies","Items","Armors","Weapons","Skills","States","MapInfos"][a],a=new o(a),a=JSON.stringify(a,null,4),n=require("fs"),t=require("path"),r=t.dirname(process.mainModule.filename),t=t.join(r,"data/WD_Translation/"),r=t+e+".json";n.existsSync(t)||n.mkdirSync(t),n.writeFileSync(r,a)}),PluginManager.registerCommand("WD_Translation","createAllNewJSON",function(){var e=["Actors","Classes","Enemies","Items","Armors","Weapons","Skills","States","MapInfos"];for(let a=0;a<=8;a++){var n=a,t=e[n],n=new o(n),n=JSON.stringify(n,null,4),r=require("fs"),s=require("path"),i=s.dirname(process.mainModule.filename),s=s.join(i,"data/WD_Translation/"),i=s+t+".json";r.existsSync(s)||r.mkdirSync(s),r.writeFileSync(i,n)}}),PluginManager.registerCommand("WD_Translation","createTextCodeTranslations",function(){u(null)}),PluginManager.registerCommand("WD_Translation","updateTextCodeTranslations",function(){if(!$dataWDTransTextStrings.hasOwnProperty("default"))throw new Error("WD_Translation: Unable to find current data in TextStrings.json, please make sure to have created it with Create Text Translation JSON command before updating");var a=new Set;for(const e of $dataWDTransTextStrings.default)a.has(e.code)||a.add(e.code);u(a)}),PluginManager.registerCommand("WD_Translation","forceLanguage",function(a){t(JSON.parse(a.forceLanguage).language)});var S=PluginManager._scripts,L={coreFound:!1,coreIndex:-1,coreVersion:{major:0,minor:0,hotfix:0},thisIndex:-1};for(let a=0;a<S.length;a++)"WD_Core"===S[a]&&(L.coreFound=!0,L.coreIndex=a),"WD_Translation"===S[a]&&(L.thisIndex=a);if(!L.coreFound)throw new Error("WD_Translation: The plugin WD_Core has not been found! WD_Core is needed to run this plugin, please dowload on Itch or Ko-fi for free (see help file)");if(L.thisIndex<L.coreIndex)throw new Error("WD_Translation: The plugin WD_Core is loaded after this plugin, please move the plugin WD_Core ABOVE this plugin in the Rpg Maker Plugin Manager");function w(){$gameSystem.saveWdTranslationSettings()}function W(){var a=$gameSystem.loadWdTranslationSettings();null!=a&&(h.isForced=a.isForced,h.forcedLanguage=a.forcedLanguage,h.runningDefault=a.runningDefault,h.defaultHardcode=a.defaultHardcode,y=a.actorsInGameChanges)}!function a(){var e;DataManager.isDatabaseLoaded()&&StorageManager.forageKeysUpdated()&&$dataWDTransActors&&$dataWDTransArmors&&$dataWDTransClasses&&$dataWDTransEnemies&&$dataWDTransItems&&$dataWDTransMapInfos&&$dataWDTransSkills&&$dataWDTransStates&&$dataWDTransWeapons&&$dataActors&&$dataArmors&&$dataClasses&&$dataEnemies&&$dataItems&&$dataMapInfos&&$dataSkills&&$dataStates&&$dataSystem&&$dataWeapons&&$gameSystem&&$dataWDTransTextStrings&&$dataWDTransSettings?(h.originalDataFiles=JSON.parse(JSON.stringify([$dataActors,$dataClasses,$dataEnemies,$dataItems,$dataArmors,$dataWeapons,$dataSkills,$dataStates,$dataMapInfos])),W(),function(){var a=require("fs"),e=(n=require("path")).dirname(process.mainModule.filename),n=n.join(e,"data/WD_Translation/SavedProperties.json"),e=a.readFileSync(n,{encoding:"utf8"}),t=JSON.parse(e);for(const r in h)if(!t.hasOwnProperty(r))return;for(const s in h)h[s]=t[s]}(),e={data:null,language:h.defaultLanguage},h.isForced?h.currentLanguageData=window.WD_Interplugin_Core.forceLanguage(e,v,h.forcedLanguage):h.currentLanguageData=window.WD_Interplugin_Core.translateData(e,v),(h.currentLanguageData.language===h.defaultLanguage?(h.isForced=!1,h.forcedLanguage="",h.runningDefault=!0,document.title=$dataSystem.gameTitle,r):(h.runningDefault=!1,document.title=h.currentLanguageData.systemTranslation.gameTitle,s))(),D(),w()):requestAnimationFrame(a)}(),Game_System.prototype.saveWdTranslationSettings=function(){var a={isForced:JSON.parse(JSON.stringify(h.isForced)),forcedLanguage:JSON.parse(JSON.stringify(h.forcedLanguage)),runningDefault:JSON.parse(JSON.stringify(h.runningDefault)),defaultHardcode:JSON.parse(JSON.stringify(h.defaultHardcode)),actorsInGameChanges:JSON.parse(JSON.stringify(y))};this._wdTranslationSavefile=a},Game_System.prototype.loadWdTranslationSettings=function(){return this._wdTranslationSavefile||null},Scene_Title.prototype.drawGameTitle=function(){var a=Graphics.height/4,e=Graphics.width-40,n=(h.runningDefault?$dataSystem:h.currentLanguageData.systemTranslation).gameTitle,t=this._gameTitleSprite.bitmap;t.fontFace=$gameSystem.mainFontFace(),t.outlineColor="black",t.outlineWidth=8,t.fontSize=72,t.drawText(n,20,a,e,48,"center")},TextManager.basic=function(a){return h.runningDefault?$dataSystem.terms.basic[a]||"":l("basic",a)},TextManager.command=function(a){return h.runningDefault?$dataSystem.terms.commands[a]||"":l("command",a)},TextManager.message=function(a){return h.runningDefault?$dataSystem.terms.messages[a]||"":l("message",a)},TextManager.param=function(a){return h.runningDefault?$dataSystem.terms.params[a]||"":h.currentLanguageData.parametersTranslation[a]},Window_StatusBase.prototype.actorSlotName=function(a,e){a=a.equipSlots();return(h.runningDefault?$dataSystem.equipTypes:h.currentLanguageData.equipTypeTranslation)[a[e]]},Window_SkillType.prototype.makeCommandList=function(){if(this._actor)for(const e of this._actor.skillTypes()){var a=(h.runningDefault?$dataSystem.skillTypes:h.currentLanguageData.skillTypeTranslation)[e];this.addCommand(a,"skill",!0,e)}},Window_ActorCommand.prototype.addSkillCommands=function(){for(const e of this._actor.skillTypes()){var a=(h.runningDefault?$dataSystem.skillTypes:h.currentLanguageData.skillTypeTranslation)[e];this.addCommand(a,"skill",!0,e)}},Sprite_Damage.prototype.createMiss=function(){var a=this.fontSize(),e=Math.floor(3*a),n=this.createChildSprite(e,a),t=h.runningDefault?h.defaultHardcode.defaultCombatMiss:h.currentLanguageData.systemTranslation.combatMiss;n.bitmap.drawText(t,0,0,e,a,"center"),n.dy=0},Object.defineProperty(TextManager,"currencyUnit",{get:function(){return h.runningDefault?$dataSystem.currencyUnit:h.currentLanguageData.systemTranslation.currency},configurable:!0}),Game_Interpreter.prototype.command101=function(a){let e=0,n=!1,t=null;if($gameMessage.isBusy())return!1;for($gameMessage.setFaceImage(a[0],a[1]),$gameMessage.setBackground(a[2]),$gameMessage.setPositionType(a[3]),$gameMessage.setSpeakerName(g(a[4],101));401===this.nextEventCode();){this._index++;let a="";var r;0===e?(r=p(this.currentCommand().parameters[0],!0,0,null),n=r.isTranslating,a=r.text,t=r.wdCode):a=0<e&&n?p(this.currentCommand().parameters[0],!1,e,t).text:this.currentCommand().parameters[0],$gameMessage.add(a),e++}switch(this.nextEventCode()){case 102:this._index++;var s=d(this.currentCommand().parameters);this.setupChoices(s);break;case 103:this._index++,this.setupNumInput(this.currentCommand().parameters);break;case 104:this._index++,this.setupItemChoice(this.currentCommand().parameters)}return this.setWaitMode("message"),!0},Game_Interpreter.prototype.command102=function(a){return!$gameMessage.isBusy()&&(a=d(a),this.setupChoices(a),this.setWaitMode("message"),!0)},Game_Interpreter.prototype.command105=function(a){let e=0,n=!1,t=null;if($gameMessage.isBusy())return!1;for($gameMessage.setScroll(a[0],a[1]);405===this.nextEventCode();){this._index++;let a="";var r;0===e?(r=m(this.currentCommand().parameters[0],!0,0,null),n=r.isTranslating,a=r.text,t=r.wdCode):a=0<e&&n?m(this.currentCommand().parameters[0],!1,e,t).text:this.currentCommand().parameters[0],$gameMessage.add(a),e++}return this.setWaitMode("message"),!0},Game_Interpreter.prototype.command320=function(a){var e=g(a[1],320),a=(f(a[0],a[1],320),$gameActors.actor(a[0]));return a&&a.setName(e),!0},Game_Interpreter.prototype.command324=function(a){var e=g(a[1],324),a=(f(a[0],a[1],324),$gameActors.actor(a[0]));return a&&a.setNickname(e),!0},Game_Interpreter.prototype.command325=function(a){var e=g(a[1],325),a=(f(a[0],a[1],325),$gameActors.actor(a[0]));return a&&a.setProfile(e),!0},Window_Options.prototype.booleanStatusText=function(a){var e=h.runningDefault?h.defaultHardcode.defaultOptionOn:h.currentLanguageData.systemTranslation.optionOn,n=h.runningDefault?h.defaultHardcode.defaultOptionOff:h.currentLanguageData.systemTranslation.optionOff;return a?e:n};const k=Scene_Options.prototype.maxCommands,$=(Scene_Options.prototype.maxCommands=function(){return k.call(this)+(n?1:0)},Window_Options.prototype.makeCommandList),I=(Window_Options.prototype.makeCommandList=function(){$.call(this),n&&this.addLanguageOptions()},Window_Options.prototype.addLanguageOptions=function(){var a=h.runningDefault?h.defaultHardcode.defaultOptionLanguage:h.currentLanguageData.systemTranslation.optionLanguage;this.addCommand(a,"wdTranslation")},Window_Options.prototype.initialize),C=(Window_Options.prototype.initialize=function(a){this.languagesArray=this.createLanguagesArray(),this.currentLanguageIndex=this.getLangStartIndex(),I.call(this,a)},Window_Options.prototype.createLanguagesArray=function(){var a=[h.defaultLanguage];for(const e of v)a.push(e.language);return a},Window_Options.prototype.getLangStartIndex=function(){if(h.runningDefault)return 0;var e=h.currentLanguageData.language;for(let a=0;a<this.languagesArray.length;a++)if(this.languagesArray[a]===e)return a;throw new Error("WD_Translation: Unable to find current language index in Options")},Window_Options.prototype.statusText),x=(Window_Options.prototype.statusText=function(a){return"wdTranslation"===this.commandSymbol(a)?{Abkhazian:"Аҧсуа",Afar:"Afaraf",Afrikaans:"Afrikaans",Akan:"Akan",Albanian:"Shqip",Amharic:"አማርኛ",Arabic:"العربية",Aragonese:"Aragonés",Armenian:"Հայերեն",Assamese:"অসমীয়া",Avaric:"Авар мацӀ",Avestan:"𐬐𐬁𐬀𐬀𐬎𐬀𐬌𐬀",Aymara:"Aymar aru",Azerbaijani:"Azərbaycan dili",Bambara:"Bamanankan",Bashkir:"Башҡорт теле",Basque:"Euskara",Belarusian:"Беларуская мова",Bengali:"বাংলা",Bislama:"Bislama",Bosnian:"Bosanski jezik",Breton:"Brezhoneg",Bulgarian:"Български език",Burmese:"မြန်မာဘာသာ",Catalan:"Català",Chamorro:"Chamoru",Chechen:"Нохчийн мотт",Chichewa:"ChiChewa",Chinese:"中文",ChurchSlavonic:"Словѣ́ньскъ ѩзыкъ",Chuvash:"Чăваш чĕлхи",Cornish:"Kernewek",Corsican:"Corsu",Cree:"ᓀᐦᐃᔭᐍᐏᐣ",Croatian:"Hrvatski jezik",Czech:"Čeština",Danish:"Dansk",Divehi:"ދިވެހި",Dutch:"Nederlands",Dzongkha:"རྫོང་ཁ",English:"English",Esperanto:"Esperanto",Estonian:"Eesti keel",Ewe:"Eʋegbe",Faroese:"Føroyskt",Fijian:"Na Vosa Vakaviti",Finnish:"Suomi",French:"Français",WesternFrisian:"Frysk",Fulah:"Fulfulde",GaelicScottish:"Gàidhlig",Galician:"Galego",Ganda:"Luganda",Georgian:"ქართული",German:"Deutsch",Greek:"Ελληνικά",Kalaallisut:"Kalaallisut",Guarani:"Avañe'ẽ",Gujarati:"ગુજરાતી",Haitian:"Kreyòl ayisyen",Hausa:"Hausa",Hebrew:"עברית",Herero:"Otjiherero",Hindi:"हिन्दी",HiriMotu:"Hiri Motu",Hungarian:"Magyar",Icelandic:"Íslenska",Ido:"Ido",Igbo:"Igbo",Indonesian:"Bahasa Indonesia",Interlingua:"Interlingua",Interlingue:"Interlingue",Inuktitut:"ᐃᓄᒃᑎᑐᑦ",Inupiaq:"Iñupiaq",Irish:"Gaeilge",Italian:"Italiano",Japanese:"日本語",Javanese:"Basa Jawa",Kannada:"ಕನ್ನಡ",Kanuri:"Kanuri",Kashmiri:"कश्मीरी",Kazakh:"Қазақ тілі",Khmer:"ខ្មែរ",Kikuyu:"Gikuyu",Kinyarwanda:"Ikinyarwanda",Kirghiz:"Кыргыз тили",Komi:"коми кыв",Kongo:"Kikongo",Korean:"한국어",Kuanyama:"Kuanyama",Kurdish:"Kurdî",Lao:"ລາວ",Latin:"Latina",Latvian:"Latviešu valoda",Limburgan:"Limburgs",Lingala:"Lingála",Lithuanian:"Lietuvių kalba",LubaKatanga:"Tshiluba",Luxembourgish:"Lëtzebuergesch",Macedonian:"Македонски јазик",Malagasy:"Malagasy",Malay:"Bahasa Melayu",Malayalam:"മലയാളം",Maltese:"Malti",Manx:"Gaelg",Maori:"Māori",Marathi:"मराठी",Marshallese:"Kajin M̧ajeļ",Mongolian:"Монгол хэл",Nauru:"Naoero",Navajo:"Diné bizaad",NorthNdebele:"IsiNdebele",SouthNdebele:"isiNdebele",Ndonga:"Owambo",Nepali:"नेपाली",Norwegian:"Norsk","NorwegianBokmål":"Norsk bokmål",NorwegianNynorsk:"Norsk nynorsk",Occitan:"Occitan",Ojibwa:"ᐊᓂᔑᓈᐯᒧᐎᓀᒡ",Oriya:"ଓଡ଼ିଆ",Oromo:"Afaan Oromoo",Ossetian:"Ирон æвзаг",Pali:"पाऴि",Pashto:"پښتو",Persian:"فارسی",Polish:"Polski",Portuguese:"Português",Punjabi:"ਪੰਜਾਬੀ",Quechua:"Runa Simi",Romanian:"Română",Romansh:"Rumantsch",Rundi:"Ikirundi",Russian:"Русский язык",NorthernSami:"Davvi sámegiella",Samoan:"Gagana Samoa",Sango:"Sängö",Sanskrit:"संस्कृतम्",Sardinian:"Sardu",Serbian:"Српски језик",Shona:"ChiShona",Sindhi:"سنڌي",Sinhala:"සිංහල",Slovak:"Slovenčina",Slovenian:"Slovenščina",Somali:"Soomaali",SouthernSotho:"Sesotho sa Leboa",Spanish:"Español",Sundanese:"Basa Sunda",Swahili:"Kiswahili",Swati:"SiSwati",Swedish:"Svenska",Tagalog:"Tagalog",Tahitian:"Reo Tahiti",Tajik:"Тоҷикӣ",Tamil:"தமிழ்",Tatar:"татарча",Telugu:"తెలుగు",Thai:"ไทย",Tibetan:"བོད་ཡིག",Tigrinya:"ትግርኛ",Tonga:"faka Tonga",Tsonga:"Xitsonga",Tswana:"Setswana",Turkish:"Türkçe",Turkmen:"Türkmençe",Twi:"Twi",Uighur:"ئۇيغۇرچە",Ukrainian:"Українська мова",Urdu:"اردو",Uzbek:"Oʻzbek tili",Venda:"Tshivenda",Vietnamese:"Tiếng Việt","Volapük":"Volapük",Walloon:"Walon",Welsh:"Cymraeg",Wolof:"Wollof",Xhosa:"IsiXhosa",SichuanYi:"ꆈꌠꒉ",Yiddish:"ייִדיש",Yoruba:"Yorùbá",Zhuang:"Saɯcueŋƅ",Zulu:"IsiZulu"}[this.languagesArray[this.currentLanguageIndex]]:C.call(this,a)},Window_Options.prototype.processOk),b=(Window_Options.prototype.processOk=function(){var a=this.index();"wdTranslation"===this.commandSymbol(a)?this.newTranslationChoice(!0):x.call(this)},Window_Options.prototype.cursorRight),O=(Window_Options.prototype.cursorRight=function(){var a=this.index();"wdTranslation"===this.commandSymbol(a)?this.newTranslationChoice(!0):b.call(this)},Window_Options.prototype.cursorLeft),_=(Window_Options.prototype.cursorLeft=function(){var a=this.index();"wdTranslation"===this.commandSymbol(a)?this.newTranslationChoice(!1):O.call(this)},Window_Options.prototype.newTranslationChoice=function(a){let e=a?this.currentLanguageIndex+1:this.currentLanguageIndex-1;a?e>=this.languagesArray.length&&(e=0):e<0&&(e=this.languagesArray.length-1),this.currentLanguageIndex=e,t(this.languagesArray[this.currentLanguageIndex]),this.refresh()},Window_MapName.prototype.refresh=function(){var a;this.contents.clear(),this.getMapNameTrans()&&(a=this.innerWidth,this.drawBackground(0,0,a,this.lineHeight()),this.drawText(this.getMapNameTrans(),0,0,a,"center"))},Window_MapName.prototype.getMapNameTrans=function(){if(!h.runningDefault&&$dataWDTransMapInfos.hasOwnProperty(h.currentLanguageData.language)){var a=$dataWDTransMapInfos[h.currentLanguageData.language],e=$gameMap._mapId;for(const n of a)if(null!==n&&n.id===e)return n.displayName}return $gameMap.displayName()},DataManager.loadGame);DataManager.loadGame=function(a){return _.call(this,a).then(a=>(D(),a))}}();