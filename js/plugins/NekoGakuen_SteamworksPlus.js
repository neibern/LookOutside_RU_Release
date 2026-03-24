//=============================================================================
// NekoGakuen_SteamworksPlus.js
// Version: 1.1.0
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Steamworks API+ (Ver 1.1.0)
 * @author 貓咪學園 NekoGakuen
 * @url https://twitter.com/NekoGakuen
 * @help
 * ================================
 * 作者：貓咪學園 NekoGakuen
 * 版本：1.1.0
 * 聯絡推特：https://twitter.com/NekoGakuen
 * ================================
 *
 * ─ 插件簡介 ─
 * 在 RPG Maker MV/MZ 中也能使用來自 Steam 遊戲平台的 API 功能。
 *
 *
 * ─ 更新履歷 ─
 * V1.1.0 新增NWjs版本，並移除Steam Deck選單暫停功能。
 * V1.0.0 初次版本的插件發佈。
 *
 *
 * ─ 使用說明 ─
 * 1.需先完成一些前置步驟，請參閱放在Manual資料夾內的使用手冊連結。
 * 2.在 RPG Maker MV/MZ 的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 3.在事件頁中高級區塊選擇「插件命令/腳本...」，
 *   並輸入以下要執行的插件命令/腳本及參數即可。
 *
 *
 * ─ 插件命令/腳本 ─
 * 
 * -------------------------
 *  ■ SteamApps 功能
 * -------------------------
 * 【檢查應用程式是否已安裝】
 * --說明：在遊戲中檢查指定的應用程式是否已安裝到主機上。
 * >>參數01：應用程式 ID，指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * >>參數02：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_AppInstalled <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamApps_AppInstalled('<參數01>', <參數02>);
 *
 * 【檢查追加下載內容是否已安裝】
 * --說明：在遊戲中檢查指定的追加下載內容是否已安裝到主機上。
 * >>參數01：追加下載內容 ID，指定目前的追加下載內容 ID。
 * >>參數02：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_DlcInstalled <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamApps_DlcInstalled('<參數01>', <參數02>);
 * 
 * 【檢查是否包含輕度暴力】
 * --說明：在遊戲中檢查應用程式是否包含輕度暴力的內容。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID。
 * --插件命令 NekoCommands SteamApps_LowViolence <參數>
 * --腳本 SteamworksPlusManager.steamApps_LowViolence(<參數>);
 * 
 * 【檢查是否擁有應用程式】
 * --說明：在遊戲中檢查是否已擁有指定的應用程式。
 * >>參數01：應用程式 ID，指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * >>參數02：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_SubscribedApp <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamApps_SubscribedApp('<參數01>', <參數02>);
 * 
 * 【檢查擁有應用程式為親友共享】
 * --說明：在遊戲中檢查擁有應用程式是否透過親友共享的方式授權。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_SubscribedFromFamilySharing <參數>
 * --腳本 SteamworksPlusManager.steamApps_SubscribedFromFamilySharing(<參數>);
 * 
 * 【檢查擁有應用程式為免費週末】
 * --說明：在遊戲中檢查擁有應用程式是否透過免費週末的方式授權。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_SubscribedFromFreeWeekend <參數>
 * --腳本 SteamworksPlusManager.steamApps_SubscribedFromFreeWeekend(<參數>);
 * 
 * 【檢查玩家是否受到 VAC 封鎖】
 * --說明：在遊戲中檢查玩家是否有受到 VAC 封鎖狀態。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_VACBanned <參數>
 * --腳本 SteamworksPlusManager.steamApps_VACBanned(<參數>);
 * 
 * 【取得應用程式的安裝資料夾】
 * --說明：在遊戲中取得應用程式的安裝資料夾路徑。
 * >>參數01：應用程式 ID，指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * >>參數02：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_GetAppInstallDir <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamApps_GetAppInstallDir('<參數01>', <參數02>);
 * 
 * 【取得擁有者 Steam ID】
 * --說明：在遊戲中取得目前應用程式擁有者的 Steam ID。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_GetAppOwner <參數>
 * --腳本 SteamworksPlusManager.steamApps_GetAppOwner(<參數>);
 * 
 * 【取得應用程式支援的語言】
 * --說明：在遊戲中取得目前應用程式支援的語言。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_GetAvailableGameLanguages <參數>
 * --腳本 SteamworksPlusManager.steamApps_GetAvailableGameLanguages(<參數>);
 * 
 * 【取得玩家設定的語言】
 * --說明：遊戲中取得目前玩家所設定的遊戲語言。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_GetCurrentGameLanguage <參數>
 * --腳本 SteamworksPlusManager.steamApps_GetCurrentGameLanguage(<參數>);
 * 
 * 【取得應用程式的購買時間】
 * --說明：在遊戲中取得指定應用程式的購買時間，可用在像早鳥購買獲得獎勵的方式。
 * >>參數01：應用程式 ID，指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * >>參數02：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamApps_GetEarliestPurchaseUnixTime <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamApps_GetEarliestPurchaseUnixTime('<參數01>', <參數02>);
 * 
 * 【安裝指定的追加下載內容】
 * --說明：在遊戲中安裝指定的追加下載內容到主機上。
 * >>參數：追加下載內容 ID，指定目前的追加下載內容 ID。
 * --插件命令 NekoCommands SteamApps_InstallDLC <參數>
 * --腳本 SteamworksPlusManager.steamApps_InstallDLC('<參數>');
 * 
 * 【解除安裝指定的追加下載內容】
 * --說明：在遊戲中解除安裝在主機上指定的追加下載內容。
 * >>參數：追加下載內容 ID，指定目前的追加下載內容 ID。
 * --插件命令 NekoCommands SteamApps_UninstallDLC <參數>
 * --腳本 SteamworksPlusManager.steamApps_UninstallDLC('<參數>');
 * 
 * -------------------------
 *  ■ SteamFriends 功能
 * -------------------------
 * 【呼叫 Steam 內嵌介面】
 * --說明：在遊戲中呼叫 Steam 平台的內嵌介面。
 * >>參數：呼叫選項，顯示的 Steam 內嵌介面選項。
 *   可以使用的參數選項如下：
 *   ● friends
 *   ● community
 *   ● players
 *   ● settings
 *   ● officialgamegroup
 *   ● stats
 *   ● achievements
 * --插件命令 NekoCommands SteamFriends_ActivateGameOverlay <參數>
 * --腳本 SteamworksPlusManager.steamFriends_ActivateGameOverlay('<參數>');
 * 
 * 【呼叫 Steam 內嵌介面的商店頁面】
 * --說明：在遊戲中呼叫 Steam 內嵌介面，並開啟所提供的應用程式的 Steam 商店頁面。
 * >>參數01：應用程式 ID，指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * >>參數02：參數選項，指定顯示商店的動作，輸入0為顯示商店頁面，輸入2為加入至購物車。
 * --插件命令 NekoCommands SteamFriends_ActivateGameOverlayToStore <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamFriends_ActivateGameOverlayToStore('<參數01>', <參數02>);
 * 
 * 【呼叫遊戲內嵌網頁】
 * --說明：在遊戲中以 Steam 內嵌介面的方式呼叫指定網頁連結。
 * >>參數：超連結網址，指定前往的超連結網址。
 * --插件命令 NekoCommands SteamFriends_ActivateGameOverlayToWebPage <參數>
 * --腳本 SteamworksPlusManager.steamFriends_ActivateGameOverlayToWebPage('<參數>');
 * 
 * 【取得遊戲控制器類型】
 * --說明：在遊戲中取得遊戲控制器的裝置類型。
 * >>參數01：遊戲控制器索引，指定目前遊戲控制器索引，索引值從 0 ~ 3 之間，如為單人遊戲用預設的 0 就好。
 * >>參數02：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamInput_GetInputTypeForHandle <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamInput_GetInputTypeForHandle(<參數01>, <參數02>);
 * 
 * 【呼叫 Steam 內嵌介面的遊戲控制器】
 * --說明：遊戲中呼叫 Steam 內嵌介面並顯示遊戲控制器的按鍵設定。
 * >>參數：遊戲控制器索引，指定目前遊戲控制器索引，索引值從 0 ~ 3 之間，如為單人遊戲用預設的 0 就好。
 * --插件命令 NekoCommands SteamInput_ShowBindingPanel <參數>
 * --腳本 SteamworksPlusManager.steamInput_ShowBindingPanel(<參數>);
 * 
 * 【關閉 Steam 輸入】
 * --說明：在遊戲中呼叫關閉 Steam 輸入，目前這個功能應該用不到。
 * --插件命令 NekoCommands SteamInput_Shutdown
 * --腳本 SteamworksPlusManager.steamInput_Shutdown();
 * 
 * -------------------------
 *  ■ SteamMusic 功能
 * -------------------------
 * 【檢查 Steam 音樂是否已啟用】
 * --說明：在遊戲中檢查 Steam 音樂是否已啟用。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamMusic_IsEnabled <參數>
 * --腳本 SteamworksPlusManager.steamMusic_IsEnabled(<參數>);
 * 
 * 【檢查 Steam 音樂是否正在播放】
 * --說明：在遊戲中檢查 Steam 音樂是否正在播放。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamMusic_IsPlaying <參數>
 * --腳本 SteamworksPlusManager.steamMusic_IsPlaying(<參數>);
 * 
 * 【檢查 Steam 音樂的播放狀態】
 * --說明：在遊戲中檢查 Steam 音樂的播放狀態。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamMusic_GetPlaybackStatus <參數>
 * --腳本 SteamworksPlusManager.steamMusic_GetPlaybackStatus(<參數>);
 * 
 * 【取得 Steam 音樂的音量】
 * --說明：在遊戲中取得 Steam 音樂的播放音量。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamMusic_GetVolume <參數>
 * --腳本 SteamworksPlusManager.steamMusic_GetVolume(<參數>);
 * 
 * 【暫停 Steam 音樂】
 * --說明：在遊戲中暫停 Steam 音樂的歌曲。
 * --插件命令 NekoCommands SteamMusic_Pause
 * --腳本 SteamworksPlusManager.steamMusic_Pause();
 * 
 * 【播放 Steam 音樂】
 * --說明：在遊戲中播放 Steam 音樂的歌曲。
 * --插件命令 NekoCommands SteamMusic_Play
 * --腳本 SteamworksPlusManager.steamMusic_Play();
 * 
 * 【播放下一首 Steam 音樂】
 * --說明：在遊戲中播放下一首 Steam 音樂的歌曲。
 * --插件命令 NekoCommands SteamMusic_PlayNext
 * --腳本 SteamworksPlusManager.steamMusic_PlayNext();
 * 
 * 【播放上一首 Steam 音樂】
 * --說明：在遊戲中播放上一首 Steam 音樂的歌曲。
 * --插件命令 NekoCommands SteamMusic_PlayPrevious
 * --腳本 SteamworksPlusManager.steamMusic_PlayPrevious();
 * 
 * 【指定 Steam 音樂的音量】
 * --說明：在遊戲中指定 Steam 音樂的音量。
 * >>參數：Steam 音樂的音量，指定 Steam 音樂的音量，數值介於 0.0 ~ 1.0 之間。
 * --插件命令 NekoCommands SteamMusic_SetVolume <參數>
 * --腳本 SteamworksPlusManager.steamMusic_SetVolume('<參數>');
 * 
 * -------------------------
 *  ■ SteamUserStats 功能
 * -------------------------
 * 【清除指定成就】
 * --說明：在遊戲中清除指定的遊戲成就。
 * >>參數：成就名稱，指定的成就名稱。
 * --插件命令 NekoCommands SteamUserStats_ClearAchievement <參數>
 * --腳本 SteamworksPlusManager.steamUserStats_ClearAchievement('<參數>');
 * 
 * 【取得成就和解鎖時間】
 * --說明：在遊戲中取得成就狀態和成就解鎖時間。
 * >>參數01：成就名稱，指定的成就名稱。
 * >>參數02：開關 ID，將回傳結果顯示在指定的開關 ID。
 * >>參數03：變數 ID，將回傳結果顯示在指定的變數 ID。
 * --插件命令 NekoCommands SteamUserStats_GetAchievementAndUnlockTime <參數01> <參數02> <參數03>
 * --腳本 SteamworksPlusManager.steamUserStats_GetAchievementAndUnlockTime('<參數01>', <參數02>, <參數03>);
 * 
 * 【取得成就的總數量】
 * --說明：在遊戲中取得所有成就的總數量。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUserStats_GetNumAchievements <參數>
 * --腳本 SteamworksPlusManager.steamUserStats_GetNumAchievements(<參數>);
 * 
 * 【取得目前玩家數量】
 * --說明：在遊戲中取得目前玩家的數量。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUserStats_GetNumberOfCurrentPlayers <參數>
 * --腳本 SteamworksPlusManager.steamUserStats_GetNumberOfCurrentPlayers(<參數>);
 * 
 * 【解鎖指定成就】
 * --說明：在遊戲中解鎖指定的遊戲成就。
 * >>參數：成就名稱，指定的成就名稱。
 * --插件命令 NekoCommands SteamUserStats_SetAchievement <參數>
 * --腳本 SteamworksPlusManager.steamUserStats_SetAchievement('<參數>');
 * 
 * 【同步資料至伺服器】
 * --說明：在遊戲中同步資料至伺服器中。
 * --插件命令 NekoCommands SteamUserStats_StoreStats
 * --腳本 SteamworksPlusManager.steamUserStats_StoreStats();
 * 
 * -------------------------
 *  ■ SteamUtils 功能
 * -------------------------
 * 【取得目前應用程式 ID】
 * --說明：在遊戲中取得目前的應用程式 ID。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_GetAppID <參數>
 * --腳本 SteamworksPlusManager.steamUtils_GetAppID(<參數>);
 * 
 * 【取得主機電池電量】
 * --說明：在遊戲中取得主機上的電池電量，如果主機為連接電源時回傳255。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_GetCurrentBatteryPower <參數>
 * --腳本 SteamworksPlusManager.steamUtils_GetCurrentBatteryPower(<參數>);
 * 
 * 【取得所在國家】
 * --說明：在遊戲中取得玩家所在的國家。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_GetIPCountry <參數>
 * --腳本 SteamworksPlusManager.steamUtils_GetIPCountry(<參數>);
 * 
 * 【取得伺服器的時間】
 * --說明：在遊戲中取得伺服器的現實時間。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_GetServerRealTime <參數>
 * --腳本 SteamworksPlusManager.steamUtils_GetServerRealTime(<參數>);
 * 
 * 【取得 Steam 客戶端語言】
 * --說明：在遊戲中取得 Steam 客戶端所設定的語言。
 * >>參數：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_GetSteamUILanguage <參數>
 * --腳本 SteamworksPlusManager.steamUtils_GetSteamUILanguage(<參數>);
 * 
 * 【檢查 Steam 內嵌介面】
 * --說明：在遊戲中檢查 Steam 內嵌介面是否正在執行中。
 * >>參數：開關 ID，將回傳結果顯示在指定的開關 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_IsOverlayEnabled <參數>
 * --腳本 SteamworksPlusManager.steamUtils_IsOverlayEnabled(<參數>);
 * 
 * 【指定 Steam 內嵌介面通知位置】
 * --說明：在遊戲中指定的邊角的距離，來設定 Steam 內嵌介面通知的位置。
 * >>參數01：水平像素距離，在遊戲中指定邊角的水平像素距離。
 * >>參數02：垂直像素距離，在遊戲中指定邊角的垂直像素距離。
 * --插件命令 NekoCommands SteamUtils_SetOverlayNotificationInset <參數01> <參數02>
 * --腳本 SteamworksPlusManager.steamUtils_SetOverlayNotificationInset(<參數01>, <參數02>);
 * 
 * 【指定 Steam 內嵌介面邊角位置】
 * --說明：在遊戲中指定 Steam 內嵌介面通知該從哪個邊角彈出顯示。
 * >>參數：邊角位置，在遊戲中顯示 Steam 內嵌介面邊角位置，輸入0為左上角，輸入1為右上角，輸入2為左下角，輸入3為右下角。
 * --插件命令 NekoCommands SteamUtils_SetOverlayNotificationPosition <參數>
 * --腳本 SteamworksPlusManager.steamUtils_SetOverlayNotificationPosition(<參數>);
 * 
 * 【呼叫 Big Picture 文字輸入】
 * --說明：在遊戲中呼叫 Big Picture 文字輸入對話視窗，僅支援遊戲手把輸入。
 * >>參數01：文字輸入，在遊戲中指定的文字輸入，輸入0為一般文字，輸入1為密碼文字。
 * >>參數02：文字行數，在遊戲中指定的文字行數，輸入0為單行，輸入1為多行。
 * >>參數03：指定文字輸入說明，在遊戲中指定文字輸入的說明。
 * >>參數04：指定文字最大字數，在遊戲中指定文字輸入的最大字數。
 * >>參數05：指定文字輸入預設值，在遊戲中指定文字輸入的預設值。
 * >>參數06：變數 ID，將回傳結果顯示在指定的變數 ID，若為0不設定時則直接回傳。
 * --插件命令 NekoCommands SteamUtils_ShowGamepadTextInput <參數01> <參數02> <參數03> <參數04> <參數05> <參數06>
 * --腳本 SteamworksPlusManager.steamUtils_ShowGamepadTextInput(<參數01>, <參數02>, '<參數03>', <參數04>, '<參數05>', <參數06>);
 * 
 * 【呼叫浮動式鍵盤】
 * --說明：在遊戲中呼叫浮動式鍵盤，僅支援遊戲手把輸入。
 * >>參數01：浮動式鍵盤的模式，在遊戲中指定浮動式鍵盤的模式，輸入0為單行，輸入1為多行，輸入2為電子郵件，輸入3為數字。
 * >>參數02：X 座標，在遊戲中指定 X 座標，建議用預設值就好。
 * >>參數03：Y 座標，在遊戲中指定 Y 座標，建議用預設值就好。
 * >>參數04：寬度，在遊戲中指定寬度，建議用預設值就好。
 * >>參數05：高度，在遊戲中指定高度，建議用預設值就好。
 * --插件命令 NekoCommands SteamUtils_ShowFloatingGamepadTextInput <參數01> <參數02> <參數03> <參數04> <參數05>
 * --腳本 SteamworksPlusManager.steamUtils_ShowFloatingGamepadTextInput(<參數01>, <參數02>, <參數03>, <參數04>, <參數05>);
 * 
 * 
 * ─ 支援平台 ─
 * - NWjs：
 *  【× 不支援】
 * - Electron：
 *  【√ 支援(Windows、macOS)】
 * - Google Chrome：
 *  【× 不支援】
 * - Mozilla Firefox：
 *  【× 不支援】
 * - Microsoft Edge：
 *  【× 不支援】
 * - Apple Safari：
 *  【× 不支援】
 * - Android：
 *  【× 不支援】
 * - iOS：
 *  【× 不支援】
 *
 *
 *
 * ─ 著作聲明 ─
 * 修改或翻譯本插件無需事前告知，如果插件有BUG可以回報。
 * 本插件著作權為貓咪學園(NekoGakuen)所有。
 * 並且保留對插件使用規則的修改與更動之權利。
 * 
 * --------------------
 * -來源標示：【△ 不需要，但有的話會很感謝。 (註1)】
 * -商業營利：【√ 允許】
 * -成人用途：【√ 允許】
 * 
 * ※註1：但如有註明的話，可以註明「NekoGakuen」即可。
 * --------------------
 * 
 * 
 * @command NekoCommands SteamApps_AppInstalled
 * @text 檢查應用程式是否已安裝
 * @desc 在遊戲中檢查指定的應用程式是否已安裝到主機上。
 * 
 * @arg steamapp_id
 * @text 應用程式 ID
 * @desc 指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * @type string
 * @default this
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_DlcInstalled
 * @text 檢查追加下載內容是否已安裝
 * @desc 在遊戲中檢查指定的追加下載內容是否已安裝到主機上。
 * 
 * @arg dlc_id
 * @text 追加下載內容 ID
 * @desc 指定目前的追加下載內容 ID。
 * @type string
 * @default 0
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_LowViolence
 * @text 檢查是否包含輕度暴力
 * @desc 在遊戲中檢查應用程式是否包含輕度暴力的內容。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_SubscribedApp
 * @text 檢查是否擁有應用程式
 * @desc 在遊戲中檢查是否已擁有指定的應用程式。
 * 
 * @arg steamapp_id
 * @text 應用程式 ID
 * @desc 指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * @type string
 * @default this
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_SubscribedFromFamilySharing
 * @text 檢查擁有應用程式為親友共享
 * @desc 在遊戲中檢查擁有應用程式是否透過親友共享的方式授權。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_SubscribedFromFreeWeekend
 * @text 檢查擁有應用程式為免費週末
 * @desc 在遊戲中檢查擁有應用程式是否透過免費週末的方式授權。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_VACBanned
 * @text 檢查玩家是否受到 VAC 封鎖
 * @desc 在遊戲中檢查玩家是否有受到 VAC 封鎖狀態。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamApps_GetAppInstallDir
 * @text 取得應用程式的安裝資料夾
 * @desc 在遊戲中取得應用程式的安裝資料夾路徑。
 * 
 * @arg steamapp_id
 * @text 應用程式 ID
 * @desc 指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * @type string
 * @default this
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamApps_GetAppOwner
 * @text 取得擁有者 Steam ID
 * @desc 在遊戲中取得目前應用程式擁有者的 Steam ID。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamApps_GetAvailableGameLanguages
 * @text 取得應用程式支援的語言
 * @desc 在遊戲中取得目前應用程式支援的語言。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamApps_GetCurrentGameLanguage
 * @text 取得玩家設定的語言
 * @desc 在遊戲中取得目前玩家所設定的遊戲語言。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamApps_GetEarliestPurchaseUnixTime
 * @text 取得應用程式的購買時間
 * @desc 在遊戲中取得指定應用程式的購買時間，可用在像早鳥購買獲得獎勵的方式。
 * 
 * @arg steamapp_id
 * @text 應用程式 ID
 * @desc 指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * @type string
 * @default this
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamApps_InstallDLC
 * @text 安裝指定的追加下載內容
 * @desc 在遊戲中安裝指定的追加下載內容到主機上。
 * 
 * @arg dlc_id
 * @text 追加下載內容 ID
 * @desc 指定目前的追加下載內容 ID。
 * @type string
 * @default 0
 * 
 * @command NekoCommands SteamApps_UninstallDLC
 * @text 解除安裝指定的追加下載內容
 * @desc 在遊戲中解除安裝在主機上指定的追加下載內容。
 * 
 * @arg dlc_id
 * @text 追加下載內容 ID
 * @desc 指定目前的追加下載內容 ID。
 * @type string
 * @default 0
 * 
 * @command NekoCommands SteamFriends_ActivateGameOverlay
 * @text 呼叫 Steam 內嵌介面
 * @desc 在遊戲中呼叫 Steam 平台的內嵌介面。
 * 
 * @arg pchDialog
 * @text 呼叫選項
 * @desc 顯示的 Steam 內嵌介面選項。
 * @type select
 * @default friends
 * @option 好友
 * @value friends
 * @option 社群
 * @value community
 * @option 玩家
 * @value players
 * @option 設定
 * @value settings
 * @option 官方群組
 * @value officialgamegroup
 * @option 統計
 * @value stats
 * @option 成就
 * @value achievements
 * 
 * @command NekoCommands SteamFriends_ActivateGameOverlayToStore
 * @text 呼叫 Steam 內嵌介面的商店頁面
 * @desc 在遊戲中呼叫 Steam 內嵌介面，並開啟所提供的應用程式的 Steam 商店頁面。
 * 
 * @arg steamapp_id
 * @text 應用程式 ID
 * @desc 指定應用程式 ID，輸入 this 為指定目前的應用程式。
 * @type string
 * @default this
 * 
 * @arg eFlag
 * @text 參數選項
 * @desc 指定顯示商店的動作。
 * @type select
 * @default 0
 * @option 顯示商店頁面
 * @value 0
 * @option 加入至購物車
 * @value 2
 * 
 * @command NekoCommands SteamFriends_ActivateGameOverlayToWebPage
 * @text 呼叫遊戲內嵌網頁
 * @desc 在遊戲中以 Steam 內嵌介面的方式呼叫指定網頁連結。
 * 
 * @arg pchURL
 * @text 超連結網址
 * @desc 指定前往的超連結網址。
 * @type string
 * @default https://
 * 
 * @command NekoCommands SteamInput_GetInputTypeForHandle
 * @text 取得遊戲控制器類型
 * @desc 在遊戲中取得遊戲控制器的裝置類型。
 * 
 * @arg nIndex
 * @text 遊戲控制器索引
 * @desc 指定目前遊戲控制器索引，索引值從 0 ~ 3 之間，如為單人遊戲用預設的 0 就好。
 * @type number
 * @min 0
 * @max 3
 * @default 0
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamInput_ShowBindingPanel
 * @text 呼叫 Steam 內嵌介面的遊戲控制器
 * @desc 在遊戲中呼叫 Steam 內嵌介面並顯示遊戲控制器的按鍵設定。
 * 
 * @arg nIndex
 * @text 遊戲控制器索引
 * @desc 指定目前遊戲控制器索引，索引值從 0~3 之間，如為單人遊戲用預設的 0 就好。
 * @type number
 * @min 0
 * @max 3
 * @default 0
 * 
 * @command NekoCommands SteamInput_Shutdown
 * @text 關閉 Steam 輸入
 * @desc 在遊戲中呼叫關閉 Steam 輸入，目前這個功能應該用不到。
 * 
 * @command NekoCommands SteamMusic_IsEnabled
 * @text 檢查 Steam 音樂是否已啟用
 * @desc 在遊戲中檢查 Steam 音樂是否已啟用。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamMusic_IsPlaying
 * @text 檢查 Steam 音樂是否正在播放
 * @desc 在遊戲中檢查 Steam 音樂是否正在播放。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamMusic_GetPlaybackStatus
 * @text 檢查 Steam 音樂的播放狀態
 * @desc 在遊戲中檢查 Steam 音樂的播放狀態。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamMusic_GetVolume
 * @text 取得 Steam 音樂的音量
 * @desc 在遊戲中取得 Steam 音樂的播放音量。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamMusic_Pause
 * @text 暫停 Steam 音樂
 * @desc 在遊戲中暫停 Steam 音樂的歌曲。
 * 
 * @command NekoCommands SteamMusic_Play
 * @text 播放 Steam 音樂
 * @desc 在遊戲中播放 Steam 音樂的歌曲。
 * 
 * @command NekoCommands SteamMusic_PlayNext
 * @text 播放下一首 Steam 音樂
 * @desc 在遊戲中播放下一首 Steam 音樂的歌曲。
 * 
 * @command NekoCommands SteamMusic_PlayPrevious
 * @text 播放上一首 Steam 音樂
 * @desc 在遊戲中播放上一首 Steam 音樂的歌曲。
 * 
 * @command NekoCommands SteamMusic_SetVolume
 * @text 指定 Steam 音樂的音量
 * @desc 在遊戲中指定 Steam 音樂的音量。
 * 
 * @arg flVolume
 * @text Steam 音樂的音量
 * @desc 指定 Steam 音樂的音量，數值介於 0.0 ~ 1.0 之間。
 * @type number
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 * 
 * @command NekoCommands SteamUserStats_ClearAchievement
 * @text 清除指定成就
 * @desc 在遊戲中清除指定的遊戲成就。
 * 
 * @arg pchName
 * @text 成就名稱
 * @desc 指定的成就名稱。
 * @type string
 * 
 * @command NekoCommands SteamUserStats_GetAchievementAndUnlockTime
 * @text 取得成就和解鎖時間
 * @desc 在遊戲中取得成就狀態和成就解鎖時間。
 * 
 * @arg pchName
 * @text 成就名稱
 * @desc 指定的成就名稱。
 * @type string
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUserStats_GetNumAchievements
 * @text 取得成就的總數量
 * @desc 在遊戲中取得所有成就的總數量。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUserStats_GetNumberOfCurrentPlayers
 * @text 取得目前玩家數量
 * @desc 在遊戲中取得目前玩家的數量。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUserStats_SetAchievement
 * @text 解鎖指定成就
 * @desc 在遊戲中解鎖指定的遊戲成就。
 * 
 * @arg pchName
 * @text 成就名稱
 * @desc 指定的成就名稱。
 * @type string
 * 
 * @command NekoCommands SteamUserStats_StoreStats
 * @text 同步資料至伺服器
 * @desc 在遊戲中同步資料至伺服器中。
 * 
 * @command NekoCommands SteamUtils_GetAppID
 * @text 取得目前應用程式 ID
 * @desc 在遊戲中取得目前的應用程式 ID。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUtils_GetCurrentBatteryPower
 * @text 取得主機電池電量
 * @desc 在遊戲中取得主機上的電池電量，如果主機為連接電源時回傳255。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUtils_GetIPCountry
 * @text 取得所在國家
 * @desc 在遊戲中取得玩家所在的國家。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUtils_GetServerRealTime
 * @text 取得伺服器的時間
 * @desc 在遊戲中取得伺服器的現實時間。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUtils_GetSteamUILanguage
 * @text 取得 Steam 客戶端語言
 * @desc 在遊戲中取得 Steam 客戶端所設定的語言。
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUtils_IsOverlayEnabled
 * @text 檢查 Steam 內嵌介面
 * @desc 在遊戲中檢查 Steam 內嵌介面是否正在執行中。
 * 
 * @arg sld
 * @text 開關 ID
 * @desc 將回傳結果顯示在指定的開關 ID。
 * @type switch
 * @default 0
 * 
 * @command NekoCommands SteamUtils_SetOverlayNotificationInset
 * @text 指定 Steam 內嵌介面通知位置
 * @desc 在遊戲中指定的邊角的距離，來設定 Steam 內嵌介面通知的位置。
 * 
 * @arg nHorizontalInset
 * @text 水平像素距離
 * @desc 在遊戲中指定邊角的水平像素距離。
 * @type number
 * @default 0
 * 
 * @arg nVerticalInset
 * @text 垂直像素距離
 * @desc 在遊戲中指定邊角的垂直像素距離。
 * @type number
 * @default 0
 * 
 * @command NekoCommands SteamUtils_SetOverlayNotificationPosition
 * @text 指定 Steam 內嵌介面邊角位置
 * @desc 在遊戲中指定 Steam 內嵌介面通知該從哪個邊角彈出顯示。
 * 
 * @arg eNotificationPosition
 * @text 邊角位置
 * @desc 在遊戲中顯示 Steam 內嵌介面邊角位置。
 * @type select
 * @default 3
 * @option 左上角
 * @value 0
 * @option 右上角
 * @value 1
 * @option 左下角
 * @value 2
 * @option 右下角
 * @value 3
 * 
 * @command NekoCommands SteamUtils_ShowGamepadTextInput
 * @text 呼叫 Big Picture 文字輸入
 * @desc 在遊戲中呼叫 Big Picture 文字輸入對話視窗，僅支援遊戲手把輸入。
 * 
 * @arg eInputMode
 * @text 文字輸入
 * @desc 在遊戲中指定的文字輸入。
 * @type select
 * @default 0
 * @option 一般文字
 * @value 0
 * @option 密碼文字
 * @value 1
 * 
 * @arg eLineInputMode
 * @text 文字行數
 * @desc 在遊戲中指定的文字行數。
 * @type select
 * @default 0
 * @option 單行
 * @value 0
 * @option 多行
 * @value 1
 * 
 * @arg pchDescription
 * @text 指定文字輸入說明
 * @desc 在遊戲中指定文字輸入的說明。
 * @type string
 * @default 你的名字？
 * 
 * @arg unCharMax
 * @text 指定文字最大字數
 * @desc 在遊戲中指定文字輸入的最大字數。
 * @type number
 * @min 1
 * @default 5
 * 
 * @arg pchDescription
 * @text 指定文字輸入預設值
 * @desc 在遊戲中指定文字輸入的預設值。
 * @type string
 * @default 
 * 
 * @arg vld
 * @text 變數 ID
 * @desc 將回傳結果顯示在指定的變數 ID。
 * @type variable
 * @default 0
 * 
 * @command NekoCommands SteamUtils_ShowFloatingGamepadTextInput
 * @text 呼叫浮動式鍵盤
 * @desc 在遊戲中呼叫浮動式鍵盤，僅支援遊戲手把輸入。
 * 
 * @arg eKeyboardMode
 * @text 浮動式鍵盤的模式
 * @desc 在遊戲中指定浮動式鍵盤的模式。
 * @type select
 * @default 0
 * @option 單行
 * @value 0
 * @option 多行
 * @value 1
 * @option 電子郵件
 * @value 2
 * @option 數字
 * @value 3
 * 
 * @arg nTextFieldXPosition
 * @text X 座標
 * @desc 在遊戲中指定 X 座標，建議用預設值就好。
 * @type number
 * @default 0
 * 
 * @arg nTextFieldYPosition
 * @text Y 座標
 * @desc 在遊戲中指定 Y 座標，建議用預設值就好。
 * @type number
 * @default 0
 * 
 * @arg nTextFieldWidth
 * @text 寬度
 * @desc 在遊戲中指定寬度，建議用預設值就好。
 * @type number
 * @default 0
 * 
 * @arg nTextFieldHeight
 * @text 高度
 * @desc 在遊戲中指定高度，建議用預設值就好。
 * @type number
 * @default 0
 * 
 * 
 * 
 * @param Translate Patch
 * @text ＃→翻譯插件補丁
 * @desc 翻譯補丁的插件檔案名稱，不包含副檔名。
 * @type string
 * @default 
 * 
 *
 * @param Steamworks Class
 * @text ◆ Steamworks 核心參數
 * 
 * @param Steam AppID
 * @text 遊戲應用程式 ID
 * @desc 指定在 Steam 上的遊戲應用程式 ID。
 * @type string
 * @parent Steamworks Class
 * @default 480
 * 
 * @param Check BuyGame Boolean
 * @text 開啟 Steam 購買驗證功能
 * @desc 是否開啟 Steam 購買驗證功能。
 * @default true
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Check FullScreen
 * @text 開啟 Steam Deck UI 全螢幕
 * @desc 是否在 Steam Deck UI 上開啟全螢幕顯示。
 * @default true
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Check Music Pause
 * @text 開啟遊戲執行時暫停音樂播放
 * @desc 是否在遊戲執行時暫停遊戲原聲帶的音樂播放。
 * @default false
 * @type boolean
 * @parent Steamworks Class
 * @on 開啟
 * @off 關閉
 * 
 * @param Error Log Class
 * @text ◆ 錯誤訊息參數
 * 
 * @param Error BuyGame Title
 * @text 錯誤標題(未購買遊戲)
 * @desc 當未購買此遊戲時，指定要顯示的錯誤標題。
 * @type string
 * @parent Error Log Class
 * @default 未購買此遊戲
 * 
 * @param Error BuyGame Message
 * @text 錯誤訊息(未購買遊戲)
 * @desc 當未購買此遊戲時，指定要顯示的錯誤訊息。
 * @type string
 * @parent Error Log Class
 * @default 您尚未在 Steam 上購買本遊戲。
 * 
 * @param Error BuyGame Button
 * @text 連結按鈕
 * @desc 指定要前往購買的按鈕名稱。
 * @type string
 * @parent Error Log Class
 * @default 前往購買
 * 
 */
//=============================================================================
'use strict';

let NekoGakuen_SteamworksPlus = {};
function pluginisTChinese(name01, name02) {
    return navigator.language == "zh-TW" ? name01 : name02;
};
const path = require("path");
const koffi = require('koffi');
const options = {
    lazy: true
};
// 定義結構體對應的資料型別
const GetAchievementAndUnlockTimeData = koffi.struct('GetAchievementAndUnlockTimeData', {
    'achieved': 'bool',
    'unlockTime': 'uint32',
});
var base = path.dirname(process.mainModule.filename);
const lib = koffi.load(path.join(base, process.platform !== "darwin" ? 'NekoGakuen_SteamworksPlus.dll' : 'NekoGakuen_SteamworksPlus.dylib'), options);

let NekoGakuen_SteamworksPlus_PluginName = PluginManager._scripts.includes(PluginManager.parameters("NekoGakuen_SteamworksPlus")["Translate Patch"]) ? String(PluginManager.parameters("NekoGakuen_SteamworksPlus")["Translate Patch"]) : "NekoGakuen_SteamworksPlus";
NekoGakuen_SteamworksPlus.Parameters = PluginManager.parameters(NekoGakuen_SteamworksPlus_PluginName);
NekoGakuen_SteamworksPlus = {
    SteamAppID: Number(NekoGakuen_SteamworksPlus.Parameters["Steam AppID"] || 480),
    CheckBuyGameBoolean: String(NekoGakuen_SteamworksPlus.Parameters['Check BuyGame Boolean'] || 'true'),
    CheckFullScreen: String(NekoGakuen_SteamworksPlus.Parameters['Check FullScreen'] || 'true'),
    CheckMusicPause: String(NekoGakuen_SteamworksPlus.Parameters['Check Music Pause'] || 'false'),
    ErrorBuyGameTitle: String(NekoGakuen_SteamworksPlus.Parameters['Error BuyGame Title'] || pluginisTChinese('未購買遊戲', 'No Games Purchased')),
    ErrorBuyGameMessage: String(NekoGakuen_SteamworksPlus.Parameters['Error BuyGame Message'] || pluginisTChinese('您尚未在Steam上購買本遊戲。', 'You have not yet purchased this game on Steam.')),
    ErrorBuyGameButton: String(NekoGakuen_SteamworksPlus.Parameters['Error BuyGame Button'] || pluginisTChinese('前往購買', 'Buy Game')),
    SteamGameLaunch: false,
    ConsoleError01: pluginisTChinese("Steamworks初始化失敗。", "Steamworks initialization failed."),
    ConsoleLog01: pluginisTChinese('已完成Steam API初始化。', 'Steam API initialization has been completed.'),
    SteamAPI_Init: lib.func("bool NekoGakuen_SteamAPI_Init()"),
    SteamAPI_ReleaseCurrentThreadMemory: lib.func("void NekoGakuen_SteamAPI_ReleaseCurrentThreadMemory()"),
    SteamAPI_RestartAppIfNecessary: lib.func("bool NekoGakuen_SteamAPI_RestartAppIfNecessary(uint32 unOwnAppID)"),
    SteamAPI_RunCallbacks: lib.func("void NekoGakuen_SteamAPI_RunCallbacks()"),
    SteamAPI_Shutdown: lib.func("void NekoGakuen_SteamAPI_Shutdown()"),
    SteamAPI_IsSteamOverlayActive: lib.func("bool NekoGakuen_SteamAPI_IsSteamOverlayActive()"),
    //SteamApps_GetDLCDataByIndex: lib.func("bool NekoGakuen_SteamApps_GetDLCDataByIndex(int iDLC, uint32_t * pAppID, bool* pbAvailable, char* pchName, int cchNameBufferSize)"),
    SteamApps_AppInstalled: lib.func("bool NekoGakuen_SteamApps_AppInstalled(uint32_t appID)"),
    SteamApps_DlcInstalled: lib.func("bool NekoGakuen_SteamApps_DlcInstalled(uint32_t appID)"),
    SteamApps_LowViolence: lib.func("bool NekoGakuen_SteamApps_LowViolence()"),
    SteamApps_Subscribed: lib.func("bool NekoGakuen_SteamApps_Subscribed()"),
    SteamApps_SubscribedApp: lib.func("bool NekoGakuen_SteamApps_SubscribedApp(uint32_t appID)"),
    SteamApps_SubscribedFromFamilySharing: lib.func("bool NekoGakuen_SteamApps_SubscribedFromFamilySharing()"),
    SteamApps_SubscribedFromFreeWeekend: lib.func("bool NekoGakuen_SteamApps_SubscribedFromFreeWeekend()"),
    //SteamApps_TimedTrial: lib.func("bool NekoGakuen_SteamApps_TimedTrial(uint32 * punSecondsAllowed, uint32 * punSecondsPlayed)"),
    SteamApps_VACBanned: lib.func("bool NekoGakuen_SteamApps_VACBanned()"),
    //SteamApps_GetAppBuildId: lib.func("int NekoGakuen_SteamApps_GetAppBuildId()"),
    SteamApps_GetAppInstallDir: lib.func("const char* NekoGakuen_SteamApps_GetAppInstallDir(uint32 appID)"),
    SteamApps_GetAppOwner: lib.func("uint64_t NekoGakuen_SteamApps_GetAppOwner()"),
    SteamApps_GetAvailableGameLanguages: lib.func("const char* NekoGakuen_SteamApps_GetAvailableGameLanguages()"),
    //SteamApps_GetCurrentBetaName: lib.func("bool NekoGakuen_SteamApps_GetCurrentBetaName(char* pchName, int cchNameBufferSize)"),
    /* SteamApps_GetNumBetas */
    /* SteamApps_GetBetaInfo */
    /* SteamApps_SetActiveBeta */
    SteamApps_GetCurrentGameLanguage: lib.func("const char* NekoGakuen_SteamApps_GetCurrentGameLanguage()"),
    //SteamApps_GetDLCCount: lib.func("int NekoGakuen_SteamApps_GetDLCCount()"),
    //SteamApps_GetDlcDownloadProgress: lib.func("bool NekoGakuen_SteamApps_GetDlcDownloadProgress(uint32_t nAppID, uint64 * punBytesDownloaded, uint64 * punBytesTotal)"),
    SteamApps_GetEarliestPurchaseUnixTime: lib.func("uint32 NekoGakuen_SteamApps_GetEarliestPurchaseUnixTime(uint32_t nAppID)"),
    //SteamApps_GetFileDetails: lib.func("uint64_t NekoGakuen_SteamApps_GetFileDetails(const char* pszFileName)"),
    //SteamApps_GetInstalledDepots: lib.func("uint32 NekoGakuen_SteamApps_GetInstalledDepots(uint32_t appID, uint32_t * pvecDepots, uint32 cMaxDepots)"),
    //SteamApps_GetLaunchCommandLine: lib.func("int NekoGakuen_SteamApps_GetLaunchCommandLine(char* pszCommandLine, int cubCommandLine)"),
    //SteamApps_GetLaunchQueryParam: lib.func("const char* NekoGakuen_SteamApps_GetLaunchQueryParam(const char* pchKey)"),
    SteamApps_InstallDLC: lib.func("void NekoGakuen_SteamApps_InstallDLC(uint32_t nAppID)"),
    //SteamApps_MarkContentCorrupt: lib.func("bool NekoGakuen_SteamApps_MarkContentCorrupt(bool bMissingFilesOnly)"),
    SteamApps_UninstallDLC: lib.func("void NekoGakuen_SteamApps_UninstallDLC(uint32_t nAppID)"),
    SteamFriends_ActivateGameOverlay: lib.func("void NekoGakuen_SteamFriends_ActivateGameOverlay(const char* pchDialog)"),
    //SteamFriends_ActivateGameOverlayInviteDialog: lib.func("void NekoGakuen_SteamFriends_ActivateGameOverlayInviteDialog(uint64_t steamIDLobby)"),
    SteamFriends_ActivateGameOverlayToStore: lib.func("void NekoGakuen_SteamFriends_ActivateGameOverlayToStore(uint32_t nAppID, int eFlag)"),
    //SteamFriends_ActivateGameOverlayToUser: lib.func("void NekoGakuen_SteamFriends_ActivateGameOverlayToUser(const char* pchDialog, uint64_t steamID_t)"),
    SteamFriends_ActivateGameOverlayToWebPage: lib.func("void NekoGakuen_SteamFriends_ActivateGameOverlayToWebPage(const char* pchURL)"),
    /* SteamFriends_ClearRichPresence */
    /* SteamFriends_CloseClanChatWindowInSteam */
    /* SteamFriends_DownloadClanActivityCounts */
    /* SteamFriends_EnumerateFollowingList */
    /* SteamFriends_GetChatMemberByIndex */
    /* SteamFriends_GetClanActivityCounts */
    /* SteamFriends_GetClanByIndex */
    /* SteamFriends_GetClanChatMemberCount */
    /* SteamFriends_GetClanChatMessage */
    /* SteamFriends_GetClanCount */
    /* SteamFriends_GetClanName */
    /* SteamFriends_GetClanOfficerByIndex */
    /* SteamFriends_GetClanOfficerCount */
    /* SteamFriends_GetClanOwner */
    /* SteamFriends_GetClanTag */
    /* SteamFriends_ SteamFriends_GetCoplayFriend */
    /* SteamFriends_GetCoplayFriendCount */
    /* SteamFriends_GetFollowerCount */
    /* SteamFriends_GetFriendByIndex */
    /* SteamFriends_GetFriendCoplayGame */
    /* SteamFriends_GetFriendCoplayTime */
    /* SteamFriends_GetFriendCount */
    /* SteamFriends_GetFriendCountFromSource */
    /* SteamFriends_GetFriendFromSourceByIndex */
    /* SteamFriends_GetFriendGamePlayed */
    /* SteamFriends_GetFriendMessage */
    /* SteamFriends_GetFriendPersonaName */
    /* SteamFriends_GetFriendPersonaNameHistory */
    /* SteamFriends_GetFriendPersonaState */
    /* SteamFriends_GetFriendRelationship */
    /* SteamFriends_GetFriendRichPresence */
    /* SteamFriends_GetFriendRichPresenceKeyByIndex */
    /* SteamFriends_GetFriendRichPresenceKeyCount */
    /* SteamFriends_GetFriendsGroupCount */
    /* SteamFriends_GetFriendsGroupIDByIndex */
    /* SteamFriends_GetFriendsGroupMembersCount */
    /* SteamFriends_GetFriendsGroupMembersList */
    /* SteamFriends_GetFriendsGroupName */
    /* SteamFriends_GetFriendSteamLevel */
    /* SteamFriends_GetLargeFriendAvatar */
    /* SteamFriends_GetMediumFriendAvatar */
    /* SteamFriends_GetPersonaName */
    /* SteamFriends_GetPersonaState */
    //SteamFriends_GetPlayerNickname: lib.func("const char* NekoGakuen_SteamFriends_GetPlayerNickname(uint64_t steamIDPlayer)"),
    /* SteamFriends_GGetSmallFriendAvatar */
    /* SteamFriends_GGetUserRestrictions */
    /* SteamFriends_GHasFriend */
    /* SteamFriends_GInviteUserToGame */
    /* SteamFriends_GIsClanChatAdmin */
    /* SteamFriends_GIsClanPublic */
    /* SteamFriends_GIsClanOfficialGameGroup */
    //SteamFriends_IsClanChatWindowOpenInSteam: lib.func("bool NekoGakuen_SteamFriends_IsClanChatWindowOpenInSteam(uint64_t steamIDClanChat)"),
    /* SteamFriends_IsFollowing */
    /* SteamFriends_IsUserInSource */
    /* SteamFriends_JoinClanChatRoom */
    /* SteamFriends_LeaveClanChatRoom */
    /* SteamFriends_OpenClanChatWindowInSteam */
    /* SteamFriends_ReplyToFriendMessage */
    /* SteamFriends_RequestClanOfficerList */
    /* SteamFriends_RequestFriendRichPresence */
    /* SteamFriends_RequestUserInformation */
    /* SteamFriends_SendClanChatMessage */
    /* SteamFriends_SetInGameVoiceSpeaking */
    /* SteamFriends_SetListenForFriendsMessages */
    /* SteamFriends_SetPersonaName */
    /* SteamFriends_SetPlayedWith */
    /* SteamFriends_SetRichPresence */
    /* SteamInput_ActivateActionSet */
    /* SteamInput_ActivateActionSetLayer */
    /* SteamInput_DeactivateActionSetLayer */
    /* SteamInput_DeactivateAllActionSetLayers */
    /* SteamInput_GetActiveActionSetLayers */
    /* SteamInput_GetActionSetHandle */
    /* SteamInput_GetAnalogActionData */
    /* SteamInput_GetAnalogActionHandle */
    /* SteamInput_GetAnalogActionOrigins */
    //SteamInput_GetConnectedControllers: lib.func("int NekoGakuen_SteamInput_GetConnectedControllers(uint64 * handlesOut)"),
    //SteamInput_GetControllerForGamepadIndex: lib.func("uint64 NekoGakuen_SteamInput_GetControllerForGamepadIndex(int nIndex)"),
    /* SteamInput_GetCurrentActionSet */
    /* SteamInput_GetDigitalActionData */
    /* SteamInput_GetDigitalActionHandle */
    /* SteamInput_GetDigitalActionOrigins */
    //SteamInput_GetGamepadIndexForController: lib.func("int NekoGakuen_SteamInput_GetGamepadIndexForController(uint64 ulControllerHandle)"),
    //SteamInput_GetGlyphForActionOrigin: lib.func("const char* NekoGakuen_SteamInput_GetGlyphForActionOrigin(int eOrigin)"),
    SteamInput_GetInputTypeForHandle: lib.func("const char* NekoGakuen_SteamInput_GetInputTypeForHandle(int nIndex)"),
    /* SteamInput_GetMotionData */
    /* SteamInput_GetStringForActionOrigin */
    //SteamInput_Init: lib.func("bool NekoGakuen_SteamInput_Init(bool bExplicitlyCallRunFrame)"),
    //SteamInput_RunFrame: lib.func("void NekoGakuen_SteamInput_RunFrame()"),
    /* SteamInput_SetDualSenseTriggerEffect */
    /* SteamInput_SetLEDColor */
    SteamInput_ShowBindingPanel: lib.func("bool NekoGakuen_SteamInput_ShowBindingPanel(int nIndex)"),
    SteamInput_Shutdown: lib.func("bool NekoGakuen_SteamInput_Shutdown()"),
    /* SteamInput_StopAnalogActionMomentum */
    /* SteamInput_TriggerHapticPulse */
    /* SteamInput_TriggerRepeatedHapticPulse */
    //SteamInput_TriggerVibration: lib.func("void NekoGakuen_SteamInput_TriggerVibration(uint64 inputHandle, unsigned short usLeftSpeed, unsigned short usRightSpeed)"),
    //SteamInput_TriggerVibrationExtended: lib.func("void NekoGakuen_SteamInput_TriggerVibrationExtended(uint64 inputHandle, unsigned short usLeftSpeed, unsigned short usRightSpeed, unsigned short usLeftTriggerSpeed, unsigned short usRightTriggerSpeed)"),
    /* SteamInput_GetActionOriginFromXboxOrigin */
    /* SteamInput_TranslateActionOrigin */
    /* SteamInput_GetDeviceBindingRevision */
    /* SteamInput_GetRemotePlaySessionID */
    SteamMusic_IsEnabled: lib.func("bool NekoGakuen_SteamMusic_IsEnabled()"),
    SteamMusic_IsPlaying: lib.func("bool NekoGakuen_SteamMusic_IsPlaying()"),
    SteamMusic_GetPlaybackStatus: lib.func("int NekoGakuen_SteamMusic_GetPlaybackStatus()"),
    SteamMusic_GetVolume: lib.func("float NekoGakuen_SteamMusic_GetVolume()"),
    SteamMusic_Pause: lib.func("void NekoGakuen_SteamMusic_Pause()"),
    SteamMusic_Play: lib.func("void NekoGakuen_SteamMusic_Play()"),
    SteamMusic_PlayNext: lib.func("void NekoGakuen_SteamMusic_PlayNext()"),
    SteamMusic_PlayPrevious: lib.func("void NekoGakuen_SteamMusic_PlayPrevious()"),
    SteamMusic_SetVolume: lib.func("void NekoGakuen_SteamMusic_SetVolume(float flVolume)"),
    /* SteamUserStats_AttachLeaderboardUGC */
    SteamUserStats_ClearAchievement: lib.func("bool NekoGakuen_SteamUserStats_ClearAchievement(const char* pchName)"),
    /* SteamUserStats_DownloadLeaderboardEntries */
    /* SteamUserStats_DownloadLeaderboardEntriesForUsers */
    /* SteamUserStats_FindLeaderboard */
    /* SteamUserStats_FindOrCreateLeaderboard */
    //SteamUserStats_GetAchievement: lib.func("bool NekoGakuen_SteamUserStats_GetAchievement(const char* pchName, bool* pbAchieved)"),
    //SteamUserStats_GetAchievementAchievedPercent: lib.func("bool NekoGakuen_SteamUserStats_GetAchievementAchievedPercent(const char* pchName, float* pflPercent)"),
    SteamUserStats_GetAchievementAndUnlockTime: lib.func("GetAchievementAndUnlockTimeData NekoGakuen_SteamUserStats_GetAchievementAndUnlockTime(const char *pchName)"),
    //SteamUserStats_GetAchievementDisplayAttribute: lib.func("const char* NekoGakuen_SteamUserStats_GetAchievementDisplayAttribute(const char* pchName, const char* pchKey)"),
    //SteamUserStats_GetAchievementIcon: lib.func("int NekoGakuen_SteamUserStats_GetAchievementIcon(const char* pchName)"),
    //SteamUserStats_GetAchievementName: lib.func("const char* NekoGakuen_SteamUserStats_GetAchievementName(uint32 iAchievement)"),
    /* SteamUserStats_GetDownloadedLeaderboardEntry */
    /* SteamUserStats_GetGlobalStat */
    /* SteamUserStats_GetGlobalStatHistory */
    /* SteamUserStats_GetLeaderboardDisplayType */
    /* SteamUserStats_GetLeaderboardEntryCount */
    /* SteamUserStats_GetLeaderboardName */
    /* SteamUserStats_GetLeaderboardSortMethod */
    //SteamUserStats_GetMostAchievedAchievementInfo: lib.func("int NekoGakuen_SteamUserStats_GetMostAchievedAchievementInfo(char* pchName, uint32 unNameBufLen, float* pflPercent, bool* pbAchieved)"),
    //SteamUserStats_GetNextMostAchievedAchievementInfo: lib.func("int NekoGakuen_SteamUserStats_GetNextMostAchievedAchievementInfo(int iIteratorPrevious, char* pchName, uint32 unNameBufLen, float* pflPercent, bool* pbAchieved)"),
    SteamUserStats_GetNumAchievements: lib.func("uint32 NekoGakuen_SteamUserStats_GetNumAchievements()"),
    SteamUserStats_GetNumberOfCurrentPlayers: lib.func("uint64 NekoGakuen_SteamUserStats_GetNumberOfCurrentPlayers()"),
    //SteamUserStats_GetUserAchievement: lib.func("bool NekoGakuen_SteamUserStats_GetUserAchievement(uint64_t steamIDUser, const char* pchName, bool* pbAchieved)"),
    //SteamUserStats_GetUserAchievementAndUnlockTime: lib.func("bool NekoGakuen_SteamUserStats_GetUserAchievementAndUnlockTime(uint64_t steamIDUser, const char* pchName, bool* pbAchieved, uint32 * punUnlockTime)"),
    //SteamUserStats_IndicateAchievementProgress: lib.func("bool NekoGakuen_SteamUserStats_IndicateAchievementProgress(const char* pchName, uint32 nCurProgress, uint32 nMaxProgress)"),
    //SteamUserStats_RequestGlobalAchievementPercentages: lib.func("uint64 NekoGakuen_SteamUserStats_RequestGlobalAchievementPercentages()"),
    /* SteamUserStats_RequestGlobalStats */
    /* SteamUserStats_RequestUserStats */
    /* SteamUserStats_ResetAllStats */
    SteamUserStats_SetAchievement: lib.func("bool NekoGakuen_SteamUserStats_SetAchievement(const char* pchName)"),
    /* SteamUserStats_SetStat */
    SteamUserStats_StoreStats: lib.func("bool NekoGakuen_SteamUserStats_StoreStats()"),
    /* SteamUserStats_UpdateAvgRateStat */
    /* SteamUserStats_UploadLeaderboardScore */
    /* SteamUtils_BOverlayNeedsPresent */
    /* SteamUtils_GetAPICallFailureReason */
    /* SteamUtils_GetAPICallResult */
    SteamUtils_GetAppID: lib.func("uint32 NekoGakuen_SteamUtils_GetAppID()"),
    SteamUtils_GetCurrentBatteryPower: lib.func("uint8 NekoGakuen_SteamUtils_GetCurrentBatteryPower()"),
    //SteamUtils_GetEnteredGamepadTextInput: lib.func("bool NekoGakuen_SteamUtils_GetEnteredGamepadTextInput(char* pchText, uint32 cchText)"),
    //SteamUtils_GetEnteredGamepadTextLength: lib.func("uint32 NekoGakuen_SteamUtils_GetEnteredGamepadTextLength()"),
    //SteamUtils_GetImageRGBA: lib.func("bool NekoGakuen_SteamUtils_GetImageRGBA(int iImage, uint8 * pubDest, int nDestBufferSize)"),
    //SteamUtils_GetImageSize: lib.func("bool NekoGakuen_SteamUtils_GetImageSize(int iImage, uint32 * pnWidth, uint32 * pnHeight)"),
    /* SteamUtils_GetIPCCallCount */
    SteamUtils_GetIPCountry: lib.func("const char* NekoGakuen_SteamUtils_GetIPCountry()"),
    SteamUtils_GetSecondsSinceAppActive: lib.func("uint32 NekoGakuen_SteamUtils_GetSecondsSinceAppActive()"),
    SteamUtils_GetSecondsSinceComputerActive: lib.func("uint32 NekoGakuen_SteamUtils_GetSecondsSinceComputerActive()"),
    SteamUtils_GetServerRealTime: lib.func("uint32 NekoGakuen_SteamUtils_GetServerRealTime()"),
    SteamUtils_GetSteamUILanguage: lib.func("const char* NekoGakuen_SteamUtils_GetSteamUILanguage()"),
    SteamUtils_IsOverlayEnabled: lib.func("bool NekoGakuen_SteamUtils_IsOverlayEnabled()"),
    /* SteamUtils_InitFilterText */
    /* SteamUtils_FilterText */
    SteamUtils_IsSteamInBigPictureMode: lib.func("bool NekoGakuen_SteamUtils_IsSteamInBigPictureMode()"),
    /* SteamUtils_IsSteamRunningInVR */
    /* SteamUtils_IsVRHeadsetStreamingEnabled */
    SteamUtils_IsSteamRunningOnSteamDeck: lib.func("bool NekoGakuen_SteamUtils_IsSteamRunningOnSteamDeck()"),
    SteamUtils_SetOverlayNotificationInset: lib.func("void NekoGakuen_SteamUtils_SetOverlayNotificationInset(int nHorizontalInset, int nVerticalInset)"),
    SteamUtils_SetOverlayNotificationPosition: lib.func("void NekoGakuen_SteamUtils_SetOverlayNotificationPosition(int eNotificationPosition)"),
    /* SteamUtils_SetVRHeadsetStreamingEnabled */
    /* SteamUtils_SetWarningMessageHook */
    SteamUtils_ShowGamepadTextInput: lib.func("const char* NekoGakuen_SteamUtils_ShowGamepadTextInput(int eInputMode, int eLineInputMode, const char* pchDescription, uint32 unCharMax, const char* pchExistingText)"),
    SteamUtils_ShowFloatingGamepadTextInput: lib.func("bool NekoGakuen_SteamUtils_ShowFloatingGamepadTextInput(int eKeyboardMode, int nTextFieldXPosition, int nTextFieldYPosition, int nTextFieldWidth, int nTextFieldHeight)"),
    /* SteamUtils_StartVRDashboard */
    //SteamUtils_SetGameLauncherMode: lib.func("void NekoGakuen_SteamUtils_SetGameLauncherMode(bool bLauncherMode)")
};

function SteamworksPlusManager() {
    throw new Error("This is a static class");
};

//=============================================================================
// SteamAPI_Class
//=============================================================================
SteamworksPlusManager.steamAPI_Init = function () {
    if (!NekoGakuen_SteamworksPlus.SteamAPI_Init()) {
        console.log(`%c${NekoGakuen_SteamworksPlus.ConsoleError01}`, 'color: red;');
        require('nw.gui').Shell.openExternal('steam://launch/' + NekoGakuen_SteamworksPlus.SteamAppID + '/');
        NekoGakuen_SteamworksPlus.SteamAPI_Shutdown();
        SceneManager.exit();
    } else {
        NekoGakuen_SteamworksPlus.SteamAPI_Init();
        console.log(`%c${NekoGakuen_SteamworksPlus.ConsoleLog01}`, 'color: green;');
    }
};

SteamworksPlusManager.steamAPI_RestartAppIfNecessary = function () {
    return NekoGakuen_SteamworksPlus.SteamAPI_RestartAppIfNecessary(NekoGakuen_SteamworksPlus.SteamAppID);
};

SteamworksPlusManager.steamAPI_Shutdown = function () {
    NekoGakuen_SteamworksPlus.SteamAPI_Shutdown();
};

SteamworksPlusManager.steamAPI_RunCallbacks = function () {
    NekoGakuen_SteamworksPlus.SteamAPI_RunCallbacks();
};

SteamworksPlusManager.steamAPI_IsSteamOverlayActive = function () {
    NekoGakuen_SteamworksPlus.SteamAPI_RunCallbacks();
    return NekoGakuen_SteamworksPlus.SteamAPI_IsSteamOverlayActive();
};

//=============================================================================
// SteamApps_Class
//=============================================================================
SteamworksPlusManager.steamApps_AppInstalled = function (steamapp_id, sld) {
    if (steamapp_id == "this") {
        steamapp_id = NekoGakuen_SteamworksPlus.SteamAppID;
    }
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_AppInstalled(steamapp_id));
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_AppInstalled(steamapp_id);
    }
};

SteamworksPlusManager.steamApps_DlcInstalled = function (dlc_id, sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_DlcInstalled(dlc_id));
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_DlcInstalled(dlc_id);
    }
};

SteamworksPlusManager.steamApps_LowViolence = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_LowViolence());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_LowViolence();
    }
};

SteamworksPlusManager.steamApps_Subscribed = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_Subscribed());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_Subscribed();
    }
};

SteamworksPlusManager.steamApps_SubscribedApp = function (steamapp_id, sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_SubscribedApp(steamapp_id));
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_SubscribedApp(steamapp_id);
    }
};

SteamworksPlusManager.steamApps_SubscribedFromFamilySharing = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_SubscribedFromFamilySharing());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_SubscribedFromFamilySharing();
    }
};

SteamworksPlusManager.steamApps_SubscribedFromFreeWeekend = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_SubscribedFromFreeWeekend());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_SubscribedFromFreeWeekend();
    }
};

SteamworksPlusManager.steamApps_VACBanned = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamApps_VACBanned());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_VACBanned();
    }
};

SteamworksPlusManager.steamApps_GetAppInstallDir = function (steamapp_id, vld) {
    if (steamapp_id == "this") {
        steamapp_id = NekoGakuen_SteamworksPlus.SteamAppID;
    }
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamApps_GetAppInstallDir(steamapp_id));
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_GetAppInstallDir(steamapp_id);
    }
};

SteamworksPlusManager.steamApps_GetAppOwner = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamApps_GetAppOwner());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_GetAppOwner();
    }
};

SteamworksPlusManager.steamApps_GetAvailableGameLanguages = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamApps_GetAvailableGameLanguages());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_GetAvailableGameLanguages();
    }
};

SteamworksPlusManager.steamApps_GetCurrentGameLanguage = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamApps_GetCurrentGameLanguage());
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_GetCurrentGameLanguage();
    }
};

SteamworksPlusManager.steamApps_GetEarliestPurchaseUnixTime = function (steamapp_id, vld) {
    if (steamapp_id == "this") {
        steamapp_id = NekoGakuen_SteamworksPlus.SteamAppID;
    }
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamApps_GetEarliestPurchaseUnixTime(steamapp_id));
    } else {
        return NekoGakuen_SteamworksPlus.SteamApps_GetEarliestPurchaseUnixTime(steamapp_id);
    }
};

SteamworksPlusManager.steamApps_InstallDLC = function (dlc_id) {
    NekoGakuen_SteamworksPlus.SteamApps_InstallDLC(dlc_id);
};

SteamworksPlusManager.steamApps_UninstallDLC = function (dlc_id) {
    NekoGakuen_SteamworksPlus.SteamApps_UninstallDLC(dlc_id);
};

//=============================================================================
// SteamFriends_Class
//=============================================================================
SteamworksPlusManager.steamFriends_ActivateGameOverlay = function (pchDialog) {
    NekoGakuen_SteamworksPlus.SteamFriends_ActivateGameOverlay(pchDialog);
};

SteamworksPlusManager.steamFriends_ActivateGameOverlayToStore = function (steamapp_id, eFlag) {
    if (steamapp_id == "this") {
        steamapp_id = NekoGakuen_SteamworksPlus.SteamAppID;
    }
    NekoGakuen_SteamworksPlus.SteamFriends_ActivateGameOverlayToStore(steamapp_id, eFlag);
};

SteamworksPlusManager.steamFriends_ActivateGameOverlayToWebPage = function (pchURL) {
    NekoGakuen_SteamworksPlus.SteamFriends_ActivateGameOverlayToWebPage(pchURL);
};

//=============================================================================
// SteamInput_Class
//=============================================================================
SteamworksPlusManager.steamInput_GetInputTypeForHandle = function (nIndex, vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamInput_GetInputTypeForHandle(nIndex));
    } else {
        return NekoGakuen_SteamworksPlus.SteamInput_GetInputTypeForHandle(nIndex);
    }
};

SteamworksPlusManager.steamInput_ShowBindingPanel = function (nIndex) {
    NekoGakuen_SteamworksPlus.SteamInput_ShowBindingPanel(nIndex);
};

SteamworksPlusManager.steamInput_Shutdown = function () {
    NekoGakuen_SteamworksPlus.SteamInput_Shutdown();
};

//=============================================================================
// SteamMusic_Class
//=============================================================================
SteamworksPlusManager.steamMusic_IsEnabled = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamMusic_IsEnabled());
    } else {
        return NekoGakuen_SteamworksPlus.SteamMusic_IsEnabled();
    }
};

SteamworksPlusManager.steamMusic_IsPlaying = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamMusic_IsPlaying());
    } else {
        return NekoGakuen_SteamworksPlus.SteamMusic_IsPlaying();
    }
};

SteamworksPlusManager.steamMusic_GetPlaybackStatus = function (vld) {
    if (vld) {
        if (NekoGakuen_SteamworksPlus.SteamMusic_GetPlaybackStatus() == 0) {
            $gameVariables.setValue(vld, "AudioPlayback_Undefined");
        }
        if (NekoGakuen_SteamworksPlus.SteamMusic_GetPlaybackStatus() == 1) {
            $gameVariables.setValue(vld, "AudioPlayback_Playing");
        }
        if (NekoGakuen_SteamworksPlus.SteamMusic_GetPlaybackStatus() == 2) {
            $gameVariables.setValue(vld, "AudioPlayback_Paused");
        }
        if (NekoGakuen_SteamworksPlus.SteamMusic_GetPlaybackStatus() == 3) {
            $gameVariables.setValue(vld, "AudioPlayback_Idle");
        }
    } else {
        return NekoGakuen_SteamworksPlus.SteamMusic_GetPlaybackStatus();
    }
};

SteamworksPlusManager.steamMusic_GetVolume = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamMusic_GetVolume());
    } else {
        return NekoGakuen_SteamworksPlus.SteamMusic_GetVolume();
    }
};

SteamworksPlusManager.steamMusic_Pause = function () {
    NekoGakuen_SteamworksPlus.SteamMusic_Pause();
};

SteamworksPlusManager.steamMusic_Play = function () {
    NekoGakuen_SteamworksPlus.SteamMusic_Play();
};

SteamworksPlusManager.steamMusic_PlayNext = function () {
    NekoGakuen_SteamworksPlus.SteamMusic_PlayNext();
};

SteamworksPlusManager.steamMusic_PlayPrevious = function () {
    NekoGakuen_SteamworksPlus.SteamMusic_PlayPrevious();
};

SteamworksPlusManager.steamMusic_SetVolume = function (flVolume) {
    NekoGakuen_SteamworksPlus.SteamMusic_SetVolume(flVolume);
};

//=============================================================================
// SteamUserStats_Class
//=============================================================================
SteamworksPlusManager.steamUserStats_ClearAchievement = function (pchName) {
    NekoGakuen_SteamworksPlus.SteamUserStats_ClearAchievement(pchName);
};

SteamworksPlusManager.steamUserStats_GetAchievementAndUnlockTime = function (pchName, sld, vld) {
    const result = NekoGakuen_SteamworksPlus.SteamUserStats_GetAchievementAndUnlockTime(pchName);
    if (sld) {
        $gameSwitches.setValue(sld, result.achieved);
        $gameVariables.setValue(vld, result.unlockTime);
    } else {
        return result.achieved == true ? result.unlockTime : result.achieve;
    }

};

SteamworksPlusManager.steamUserStats_GetNumAchievements = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUserStats_GetNumAchievements());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUserStats_GetNumAchievements();
    }
};

SteamworksPlusManager.steamUserStats_GetNumberOfCurrentPlayers = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUserStats_GetNumberOfCurrentPlayers());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUserStats_GetNumberOfCurrentPlayers();
    }
};

SteamworksPlusManager.steamUserStats_SetAchievement = function (pchName) {
    NekoGakuen_SteamworksPlus.SteamUserStats_SetAchievement(pchName);
    NekoGakuen_SteamworksPlus.SteamUserStats_StoreStats();
};

SteamworksPlusManager.steamUserStats_StoreStats = function () {
    NekoGakuen_SteamworksPlus.SteamUserStats_StoreStats();
};


//=============================================================================
// SteamUtils_Class
//=============================================================================
SteamworksPlusManager.steamUtils_GetAppID = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetAppID());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetAppID();
    }
};

SteamworksPlusManager.steamUtils_GetCurrentBatteryPower = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetCurrentBatteryPower());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetCurrentBatteryPower();
    }
};

SteamworksPlusManager.steamUtils_GetIPCountry = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetIPCountry());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetIPCountry();
    }
};

SteamworksPlusManager.steamUtils_GetSecondsSinceAppActive = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetSecondsSinceAppActive());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetSecondsSinceAppActive();
    }
};

SteamworksPlusManager.steamUtils_GetSecondsSinceComputerActive = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetSecondsSinceComputerActive());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetSecondsSinceComputerActive();
    }
};

SteamworksPlusManager.steamUtils_GetServerRealTime = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetServerRealTime());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetServerRealTime();
    }
};

SteamworksPlusManager.steamUtils_GetSteamUILanguage = function (vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_GetSteamUILanguage());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_GetSteamUILanguage();
    }
};

SteamworksPlusManager.steamUtils_IsOverlayEnabled = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamUtils_IsOverlayEnabled());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_IsOverlayEnabled();
    }
};

SteamworksPlusManager.steamUtils_IsSteamInBigPictureMode = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamUtils_IsSteamInBigPictureMode());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_IsSteamInBigPictureMode();
    }
};

SteamworksPlusManager.steamUtils_IsSteamRunningOnSteamDeck = function (sld) {
    if (sld) {
        $gameSwitches.setValue(sld, NekoGakuen_SteamworksPlus.SteamUtils_IsSteamRunningOnSteamDeck());
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_IsSteamRunningOnSteamDeck();
    }
};

SteamworksPlusManager.steamUtils_SetOverlayNotificationInset = function (nHorizontalInset, nVerticalInset) {
    NekoGakuen_SteamworksPlus.SteamUtils_SetOverlayNotificationInset(nHorizontalInset, nVerticalInset);
};

SteamworksPlusManager.steamUtils_SetOverlayNotificationPosition = function (eNotificationPosition) {
    NekoGakuen_SteamworksPlus.SteamUtils_SetOverlayNotificationPosition(eNotificationPosition);
};

SteamworksPlusManager.steamUtils_ShowGamepadTextInput = function (eInputMode, eLineInputMode, pchDescription, unCharMax, pchExistingText, vld) {
    if (vld) {
        $gameVariables.setValue(vld, NekoGakuen_SteamworksPlus.SteamUtils_ShowGamepadTextInput(eInputMode, eLineInputMode, pchDescription, unCharMax, pchExistingText));
    } else {
        return NekoGakuen_SteamworksPlus.SteamUtils_ShowGamepadTextInput(eInputMode, eLineInputMode, pchDescription, unCharMax, pchExistingText);
    }
};

SteamworksPlusManager.steamUtils_ShowFloatingGamepadTextInput = function (keyboardMode, x, y, width, height) {
    NekoGakuen_SteamworksPlus.SteamUtils_ShowFloatingGamepadTextInput(keyboardMode, x, y, width, height);
};


if (Utils.RPGMAKER_NAME === "MZ") {
    (() => {

        PluginManager.isPlugins = function (pluginsName) {
            return this._scripts.includes(pluginsName);
        };

        Graphics.showBuyGameButton = function (retry) {
            const button = document.createElement("button");
            button.id = "retryButton";
            button.innerHTML = NekoGakuen_SteamworksPlus.ErrorBuyGameButton;
            // [Note] stopPropagation() is required for iOS Safari.
            button.ontouchstart = e => e.stopPropagation();
            button.onclick = () => {
                Graphics.eraseError();
                retry();
            };
            this._errorPrinter.appendChild(button);
            button.focus();
        };

        NekoGakuen_SteamworksPlus._Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
        Scene_Boot.prototype.startNormalGame = function () {
            if (SteamworksPlusManager.steamUtils_IsSteamRunningOnSteamDeck() || SteamworksPlusManager.steamUtils_IsSteamInBigPictureMode()) {
                Graphics._switchFullScreen();
            }
            if (NekoGakuen_SteamworksPlus.CheckBuyGameBoolean == 'true') {

                setTimeout(() => {
                    if (!SteamworksPlusManager.steamApps_Subscribed()) {
                        Graphics.printError(NekoGakuen_SteamworksPlus.ErrorBuyGameTitle, NekoGakuen_SteamworksPlus.ErrorBuyGameMessage);
                        Graphics.showBuyGameButton(() => {
                            SteamworksPlusManager.steamFriends_ActivateGameOverlayToStore("this", 0);
                        });
                        AudioManager.stopAll();
                        SceneManager.stop();
                    }
                }, 250);
            }
            NekoGakuen_SteamworksPlus.SteamGameLaunch = true;
            NekoGakuen_SteamworksPlus._Scene_Boot_startNormalGame.call(this);
        };

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_AppInstalled", args => {
            SteamworksPlusManager.steamApps_AppInstalled(String(args.steamapp_id), Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_DlcInstalled", args => {
            SteamworksPlusManager.steamApps_DlcInstalled(String(args.dlc_id), Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_LowViolence", args => {
            SteamworksPlusManager.steamApps_LowViolence(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_SubscribedApp", args => {
            SteamworksPlusManager.steamApps_SubscribedApp(String(args.steamapp_id), Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_SubscribedFromFamilySharing", args => {
            SteamworksPlusManager.steamApps_SubscribedFromFamilySharing(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_SubscribedFromFreeWeekend", args => {
            SteamworksPlusManager.steamApps_SubscribedFromFreeWeekend(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_VACBanned", args => {
            SteamworksPlusManager.steamApps_VACBanned(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_GetAppInstallDir", args => {
            SteamworksPlusManager.steamApps_GetAppInstallDir(String(args.steamapp_id), Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_GetAppOwner", args => {
            SteamworksPlusManager.steamApps_GetAppOwner(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_GetAvailableGameLanguages", args => {
            SteamworksPlusManager.steamApps_GetAvailableGameLanguages(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_GetCurrentGameLanguage", args => {
            SteamworksPlusManager.steamApps_GetCurrentGameLanguage(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_GetEarliestPurchaseUnixTime", args => {
            SteamworksPlusManager.steamApps_GetEarliestPurchaseUnixTime(String(args.steamapp_id), Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_InstallDLC", args => {
            SteamworksPlusManager.steamApps_InstallDLC(String(args.dlc_id));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamApps_UninstallDLC", args => {
            SteamworksPlusManager.steamApps_UninstallDLC(String(args.dlc_id));
        });


        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamFriends_ActivateGameOverlay", args => {
            SteamworksPlusManager.steamFriends_ActivateGameOverlay(String(args.pchDialog));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamFriends_ActivateGameOverlayToStore", args => {
            SteamworksPlusManager.steamFriends_ActivateGameOverlayToStore(String(args.steamapp_id), Number(args.eFlag));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamFriends_ActivateGameOverlayToWebPage", args => {
            SteamworksPlusManager.steamFriends_ActivateGameOverlayToWebPage(String(args.pchURL));
        });


        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamInput_GetInputTypeForHandle", args => {
            SteamworksPlusManager.steamInput_GetInputTypeForHandle(Number(args.nIndex), Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamInput_ShowBindingPanel", args => {
            SteamworksPlusManager.steamInput_ShowBindingPanel(Number(args.nIndex));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamInput_Shutdown", args => {
            SteamworksPlusManager.steamInput_Shutdown();
        });


        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_IsEnabled", args => {
            SteamworksPlusManager.steamMusic_IsEnabled(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_IsPlaying", args => {
            SteamworksPlusManager.steamMusic_IsPlaying(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_GetPlaybackStatus", args => {
            SteamworksPlusManager.steamMusic_GetPlaybackStatus(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_GetVolume", args => {
            SteamworksPlusManager.steamMusic_GetVolume(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_Pause", args => {
            SteamworksPlusManager.steamMusic_Pause();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_Play", args => {
            SteamworksPlusManager.steamMusic_Play();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_PlayNext", args => {
            SteamworksPlusManager.steamMusic_PlayNext();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_PlayPrevious", args => {
            SteamworksPlusManager.steamMusic_PlayPrevious();
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamMusic_SetVolume", args => {
            SteamworksPlusManager.steamMusic_SetVolume(Number(args.flVolume).toFixed(1));
        });


        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUserStats_ClearAchievement", args => {
            SteamworksPlusManager.steamUserStats_ClearAchievement(String(args.pchName));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUserStats_GetAchievementAndUnlockTime", args => {
            SteamworksPlusManager.steamUserStats_GetAchievementAndUnlockTime(String(args.pchName), Number(args.sld), Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUserStats_GetNumAchievements", args => {
            SteamworksPlusManager.steamUserStats_GetNumAchievements(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUserStats_GetNumberOfCurrentPlayers", args => {
            SteamworksPlusManager.steamUserStats_GetNumberOfCurrentPlayers(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUserStats_SetAchievement", args => {
            SteamworksPlusManager.steamUserStats_SetAchievement(String(args.pchName));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUserStats_StoreStats", args => {
            SteamworksPlusManager.steamUserStats_StoreStats();
        });


        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_GetAppID", args => {
            SteamworksPlusManager.steamUtils_GetAppID(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_GetCurrentBatteryPower", args => {
            SteamworksPlusManager.steamUtils_GetCurrentBatteryPower(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_GetIPCountry", args => {
            SteamworksPlusManager.steamUtils_GetIPCountry(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_GetServerRealTime", args => {
            SteamworksPlusManager.steamUtils_GetServerRealTime(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_GetSteamUILanguage", args => {
            SteamworksPlusManager.steamUtils_GetSteamUILanguage(Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_IsOverlayEnabled", args => {
            SteamworksPlusManager.steamUtils_IsOverlayEnabled(Number(args.sld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_SetOverlayNotificationInset", args => {
            SteamworksPlusManager.steamUtils_SetOverlayNotificationInset(Number(args.nHorizontalInset), Number(args.nVerticalInset));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_SetOverlayNotificationPosition", args => {
            SteamworksPlusManager.steamUtils_SetOverlayNotificationPosition(Number(args.eNotificationPosition));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_ShowGamepadTextInput", args => {
            SteamworksPlusManager.steamUtils_ShowGamepadTextInput(Number(args.eInputMode), Number(args.eLineInputMode), String(args.pchDescription), Number(args.unCharMax), String(args.pchExistingText), Number(args.vld));
        });

        PluginManager.registerCommand(NekoGakuen_SteamworksPlus_PluginName, "NekoCommands SteamUtils_ShowFloatingGamepadTextInput", args => {
            SteamworksPlusManager.steamUtils_ShowFloatingGamepadTextInput(Number(args.eKeyboardMode), Number(args.nTextFieldXPosition), Number(args.nTextFieldYPosition), Number(args.nTextFieldWidth), Number(args.nTextFieldHeight));
        });


        NekoGakuen_SteamworksPlus._SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function () {
            NekoGakuen_SteamworksPlus._SceneManager_initialize.apply(this, arguments);
            SteamworksPlusManager.steamAPI_Init();
            if (NekoGakuen_SteamworksPlus.CheckMusicPause == 'true') {
                SteamworksPlusManager.steamMusic_Pause();
            }
        };

    })();
}

if (Utils.RPGMAKER_NAME === "MV") {
    (function () {

        var _render = Graphics.render;
        Graphics.render = function (stage) {
            if (this._skipCount < 0) {
                this._skipCount = 0;
            }
            _render.call(this, stage);
        };

        PluginManager.isPlugins = function (pluginsName) {
            return this._scripts.includes(pluginsName);
        };

        Graphics.showBuyGameButton = function () {
            var button = document.createElement('button');
            button.innerHTML = NekoGakuen_SteamworksPlus.ErrorBuyGameButton;
            button.style.fontSize = '24px';
            button.style.color = '#ffffff';
            button.style.backgroundColor = '#000000';
            button.onmousedown = button.ontouchstart = function (event) {
                SteamworksPlusManager.steamFriends_ActivateGameOverlayToStore("this", 0);
                location.reload();
                event.stopPropagation();
            };
            this._errorPrinter.appendChild(button);
            this._loadingCount = -Infinity;
        };

        NekoGakuen_SteamworksPlus._Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function () {
            if (SteamworksPlusManager.steamUtils_IsSteamRunningOnSteamDeck() || SteamworksPlusManager.steamUtils_IsSteamInBigPictureMode()) {
                Graphics._switchFullScreen();
            }
            if (NekoGakuen_SteamworksPlus.CheckMusicPause == 'true') {
                SteamworksPlusManager.steamMusic_Pause();
            }
            if (NekoGakuen_SteamworksPlus.CheckBuyGameBoolean == 'true') {
                setTimeout(() => {
                    if (!SteamworksPlusManager.steamApps_Subscribed()) {
                        Graphics.printError(NekoGakuen_SteamworksPlus.ErrorBuyGameTitle, NekoGakuen_SteamworksPlus.ErrorBuyGameMessage);
                        Graphics.showBuyGameButton()
                        AudioManager.stopAll();
                        SceneManager.stop();
                    }
                }, 250);
            }
            NekoGakuen_SteamworksPlus.SteamGameLaunch = true;
            NekoGakuen_SteamworksPlus._Scene_Boot_start.call(this);
        };

        NekoGakuen_SteamworksPlus._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            NekoGakuen_SteamworksPlus._Game_Interpreter_pluginCommand.call(this, command, args);
            if (command === 'NekoCommands') {
                switch (args[0]) {
                    case 'SteamApps_AppInstalled':
                        SteamworksPlusManager.steamApps_AppInstalled(String(args[1]), Number(args[2]));
                        break;
                    case 'SteamApps_DlcInstalled':
                        SteamworksPlusManager.steamApps_DlcInstalled(String(args[1]), Number(args[2]));
                        break;
                    case 'SteamApps_LowViolence':
                        SteamworksPlusManager.steamApps_LowViolence(Number(args[1]));
                        break;
                    case 'SteamApps_SubscribedApp':
                        SteamworksPlusManager.steamApps_SubscribedApp(String(args[1]), Number(args[2]));
                        break;
                    case 'SteamApps_SubscribedFromFamilySharing':
                        SteamworksPlusManager.steamApps_SubscribedFromFamilySharing(Number(args[1]));
                        break;
                    case 'SteamApps_SubscribedFromFreeWeekend':
                        SteamworksPlusManager.steamApps_SubscribedFromFreeWeekend(Number(args[1]));
                        break;
                    case 'SteamApps_VACBanned':
                        SteamworksPlusManager.steamApps_VACBanned(Number(args[1]));
                        break;
                    case 'SteamApps_GetAppInstallDir':
                        SteamworksPlusManager.steamApps_GetAppInstallDir(String(args[1]), Number(args[2]));
                        break;
                    case 'SteamApps_GetAppOwner':
                        SteamworksPlusManager.steamApps_GetAppOwner(Number(args[1]));
                        break;
                    case 'SteamApps_GetAvailableGameLanguages':
                        SteamworksPlusManager.steamApps_GetAvailableGameLanguages(Number(args[1]));
                        break;
                    case 'SteamApps_GetCurrentGameLanguage':
                        SteamworksPlusManager.steamApps_GetCurrentGameLanguage(Number(args[1]));
                        break;
                    case 'SteamApps_GetEarliestPurchaseUnixTime':
                        SteamworksPlusManager.steamApps_GetEarliestPurchaseUnixTime(String(args[1]), Number(args[2]));
                        break;
                    case 'SteamApps_InstallDLC':
                        SteamworksPlusManager.steamApps_InstallDLC(String(args[1]));
                        break;
                    case 'SteamApps_UninstallDLC':
                        SteamworksPlusManager.steamApps_UninstallDLC(String(args[1]));
                        break;
                    case 'SteamFriends_ActivateGameOverlay':
                        SteamworksPlusManager.steamFriends_ActivateGameOverlay(String(args[1]));
                        break;
                    case 'SteamFriends_ActivateGameOverlayToStore':
                        SteamworksPlusManager.steamFriends_ActivateGameOverlayToStore(String(args[1]), Number(args[2]));
                        break;
                    case 'SteamFriends_ActivateGameOverlayToWebPage':
                        SteamworksPlusManager.steamFriends_ActivateGameOverlayToWebPage(String(args[1]));
                        break;
                    case 'SteamInput_GetInputTypeForHandle':
                        SteamworksPlusManager.steamInput_GetInputTypeForHandle(Number(args[1]), Number(args[2]));
                        break;
                    case 'SteamInput_ShowBindingPanel':
                        SteamworksPlusManager.steamInput_ShowBindingPanel(Number(args[1]));
                        break;
                    case 'SteamInput_Shutdown':
                        SteamworksPlusManager.steamInput_Shutdown();
                        break;
                    case 'SteamMusic_IsEnabled':
                        SteamworksPlusManager.steamMusic_IsEnabled(Number(args[1]));
                        break;
                    case 'SteamMusic_IsPlaying':
                        SteamworksPlusManager.steamMusic_IsPlaying(Number(args[1]));
                        break;
                    case 'SteamMusic_GetPlaybackStatus':
                        SteamworksPlusManager.steamMusic_GetPlaybackStatus(Number(args[1]));
                        break;
                    case 'SteamMusic_GetVolume':
                        SteamworksPlusManager.steamMusic_GetVolume(Number(args[1]));
                        break;
                    case 'SteamMusic_Pause':
                        SteamworksPlusManager.steamMusic_Pause();
                        break;
                    case 'SteamMusic_Play':
                        SteamworksPlusManager.steamMusic_Play();
                        break;
                    case 'SteamMusic_PlayNext':
                        SteamworksPlusManager.steamMusic_PlayNext();
                        break;
                    case 'SteamMusic_PlayPreviou':
                        SteamworksPlusManager.steamMusic_PlayPrevious();
                        break;
                    case 'SteamMusic_SetVolume':
                        SteamworksPlusManager.steamMusic_SetVolume(String(args[1]));
                        break;
                    case 'SteamUserStats_ClearAchievement':
                        SteamworksPlusManager.steamUserStats_ClearAchievement(String(args[1]));
                        break;
                    case 'SteamUserStats_GetAchievementAndUnlockTime':
                        SteamworksPlusManager.steamUserStats_GetAchievementAndUnlockTime(String(args[1]), Number(args[2]), Number(args[3]));
                        break;
                    case 'SteamUserStats_GetNumAchievements':
                        SteamworksPlusManager.steamUserStats_GetNumAchievements(Number(args[1]));
                        break;
                    case 'SteamUserStats_GetNumberOfCurrentPlayers':
                        SteamworksPlusManager.steamUserStats_GetNumberOfCurrentPlayers(Number(args[1]));
                        break;
                    case 'SteamUserStats_SetAchievement':
                        SteamworksPlusManager.steamUserStats_SetAchievement(String(args[1]));
                        break;
                    case 'SteamUserStats_StoreStats':
                        SteamworksPlusManager.steamUserStats_StoreStats();
                        break;
                    case 'SteamUtils_GetAppID':
                        SteamworksPlusManager.steamUtils_GetAppID(Number(args[1]));
                        break;
                    case 'SteamUtils_GetCurrentBatteryPower':
                        SteamworksPlusManager.steamUtils_GetCurrentBatteryPower(Number(args[1]));
                        break;
                    case 'SteamUtils_GetIPCountry':
                        SteamworksPlusManager.steamUtils_GetIPCountry(Number(args[1]));
                        break;
                    case 'SteamUtils_GetServerRealTime':
                        SteamworksPlusManager.steamUtils_GetServerRealTime(Number(args[1]));
                        break;
                    case 'SteamUtils_GetSteamUILanguage':
                        SteamworksPlusManager.steamUtils_GetSteamUILanguage(Number(args[1]));
                        break;
                    case 'SteamUtils_IsOverlayEnabled':
                        SteamworksPlusManager.steamUtils_IsOverlayEnabled(Number(args[1]));
                        break;
                    case 'SteamUtils_SetOverlayNotificationInset':
                        SteamworksPlusManager.steamUtils_SetOverlayNotificationInset(Number(args[1]), Number(args[2]));
                        break;
                    case 'SteamUtils_SetOverlayNotificationPosition':
                        SteamworksPlusManager.steamUtils_SetOverlayNotificationPosition(Number(args[1]));
                        break;
                    case 'SteamUtils_ShowGamepadTextInput':
                        SteamworksPlusManager.steamUtils_ShowGamepadTextInput(Number(args[1]), Number(args[2]), String(args[3]), Number(args[4]), String(args[5]), Number(args[1]));
                        break;
                    case 'SteamUtils_ShowFloatingGamepadTextInput':
                        SteamworksPlusManager.steamUtils_ShowFloatingGamepadTextInput(Number(args[1]), Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]));
                        break;
                }
            }
        };

        NekoGakuen_SteamworksPlus._SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function () {
            NekoGakuen_SteamworksPlus._SceneManager_initialize.apply(this, arguments);
            SteamworksPlusManager.steamAPI_Init();
            if (NekoGakuen_SteamworksPlus.CheckMusicPause == 'true') {
                SteamworksPlusManager.steamMusic_Pause();
            }
        };

    })();
}