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
import {resolve as resolvePath} from "path";
import Helpers from "./src/helpers/index.js";
import Core from "./src/core/index.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const configLoader = new Helpers.ConfigHelpers({fileName:"config.json",path:resolvePath(process.cwd(),"app","config")})
const languageLoader = new Helpers.LanguageLoader({lng:configLoader.get("LANGUAGE"),path:resolvePath(process.cwd(),"app","language")})
class Paradis {
    constructor() {
        this.updateCheckingURL = "https://raw.githubusercontent.com/nhatvu2003/Paradis/master/package.json"

    }
    async initialize() {
        await this.updateCheck();

    }

    async updateCheck() {
        try {
            const response = await axios.get(this.updateCheckingURL);
            const latestVersion = response.data.version;
            const currentVersion = require("./package.json").version;
            if(semver.lt(currentVersion, latestVersion)) {

            }else {
                Helpers.LoggerHelpers.custom(languageLoader.loadLng("CURRENT_NEW_VERSION"),"UPDATE")
            }
        } catch (e) {
            Helpers.LoggerHelpers.warn("Không thể kết nối tới máy chủ cập nhật vui lòng kiểm tra lại" + e);
        }
    }
    async info() {
        
    }
}
const ParadisInstance = new Paradis;
ParadisInstance.initialize();