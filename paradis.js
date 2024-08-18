/**
 * Vietnamese:
 * Dự án:     Paradis - Một bot đơn giản dành cho máy chủ discord
 * URL:       https://github.com/nhatvu2003/Paradis
 * Mô tả:     Paradis là mã nguồn bot đơn giản giúp bạn tạo bot tương tác và quản lý máy chủ discord
 * Phiên bản: 1.0.0
 * Tác Giả:   NVCoder (Nhật Vũ)
 * Email:     nhatvu10092003@gmail.com
 * Website:   https://www.nhatvu.io.vn
 * 
 * ----------------------------------------------------------------
 * 
 * Vui lòng không xoá dòng này để tôn trọng tác giả
 * 
 * ----------------------------------------------------------------
 * 
 * ======================================================================
 * 
 * English:
 * Project:    Paradis - A simple bot for Discord servers
 * URL:        https://github.com/nhatvu2003/Paradis
 * Description: Paradis is a simple bot source code to help you create interactive bots and manage Discord servers
 * Version:    1.0.0
 * Author:     NVCoder (Nhật Vũ)
 * Email:      nhatvu10092003@gmail.com
 * Website:    https://www.nhatvu.io.vn
 * 
 * ----------------------------------------------------------------
 * 
 * Please do not remove this line to respect the author
 * 
 * ----------------------------------------------------------------
 */

import axios from "axios";
import semver from "semver";
import {
    resolve as resolvePath
} from "path";
import Helpers from "./src/helpers/index.js";
import {
    createRequire
} from 'module';
import Core from "./src/ParaClient.js";
const require = createRequire(
    import.meta.url);
const configLoader = new Helpers.ConfigHelpers({
    fileName: "config.json",
    path: resolvePath(process.cwd(), "app", "config")
})
const languageLoader = new Helpers.LanguageLoader({
    lng: configLoader.get("LANGUAGE"),
    path: resolvePath(process.cwd(), "app", "language")
})
const ParaClient = new Core({Token:configLoader.get("TOKEN")});
class Paradis {
    constructor() {
        this.updateCheckingURL = "https://raw.githubusercontent.com/nhatvu2003/Paradis/master/package.json"

    }
    async initialize() {
        /**
         * Clean console
         * Làm sạch console
         */       
        console.clear();

        /**
         * Checking update
         * Kiểm tra cập nhật
         */
        await this.updateCheck();
        await ParaClient.ParaLoadCommands();
        await ParaClient.ParaLoadListener();
        await ParaClient.loginDiscordClient();
    }
    async updateCheck() {
        try {
            const response = await axios.get(this.updateCheckingURL);
            const latestVersion = response.data.version;
            const currentVersion = require("./package.json").version;
            if (semver.lt(currentVersion, latestVersion)) {

            } else {
                Helpers.LoggerHelpers.custom(languageLoader.loadLng("PRD_CURRENT_NEW_VERSION"), "UPDATE")
            }
        } catch (e) {
            Helpers.LoggerHelpers.warn(languageLoader.loadLng("PRD_CONNECTION_SERVER_FAILED"));
        }
    }
    async infoParadis() {

    }
}
const ParadisInstance = new Paradis;
ParadisInstance.initialize();