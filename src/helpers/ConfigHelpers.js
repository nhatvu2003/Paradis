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
import fs from 'fs';
import path from 'path';

class ConfigLoader {
  constructor({ fileName, path: folderPath }) {
    if (!fileName) {
      throw new Error('Configuration file name must be provided.');
    }

    this.configFile = fileName;
    this.folderPath = folderPath || path.resolve(__dirname, 'config');
    this.configData = {};

    this.loadConfigFile();
  }

  loadConfigFile() {
    const filePath = path.join(this.folderPath, this.configFile);
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Configuration file "${this.configFile}" not found in "${this.folderPath}".`);
      }

      const content = fs.readFileSync(filePath, 'utf8');
      this.configData = this.parseConfigFile(content);
    } catch (error) {
      console.error(`Error loading configuration file:`, error.message);
    }
  }

  parseConfigFile(content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error('Error parsing configuration file. Ensure it is valid JSON.');
    }
  }

  get(key, defaultValue = null) {
    return this.configData.hasOwnProperty(key) ? this.configData[key] : defaultValue;
  }

  set(key, value) {
    this.configData[key] = value;
    this.saveConfigFile();
  }

  saveConfigFile() {
    const filePath = path.join(this.folderPath, this.configFile);
    try {
      const content = JSON.stringify(this.configData, null, 2);
      fs.writeFileSync(filePath, content, 'utf8');
    } catch (error) {
      console.error(`Error saving configuration file:`, error.message);
    }
  }
}

export default ConfigLoader;
