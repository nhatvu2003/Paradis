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

/**
 * ConfigLoader is a class designed to handle loading, parsing, and saving configuration files.
 * It provides methods to load configuration from a file, access and modify configuration data, and save updates back to the file.
 * 
 * ConfigLoader là một lớp được thiết kế để xử lý việc tải, phân tích và lưu trữ các file cấu hình.
 * Nó cung cấp các phương thức để tải cấu hình từ file, truy cập và chỉnh sửa dữ liệu cấu hình, và lưu các cập nhật trở lại file.
 * 
 * Constructor:
 * - {Object} options - Configuration options.
 * - {string} options.fileName - The name of the configuration file.
 * - {string} [options.path] - The path to the folder containing the configuration file.
 * 
 * Constructor:
 * - {Object} options - Tùy chọn cấu hình.
 * - {string} options.fileName - Tên của file cấu hình.
 * - {string} [options.path] - Đường dẫn đến thư mục chứa file cấu hình.
 * 
 * Key methods:
 * - loadConfigFile(): Loads and parses the configuration file.
 * - parseConfigFile(content): Parses the content of the configuration file from JSON format.
 * - get(key, defaultValue): Retrieves a configuration value by key with an optional default value.
 * - set(key, value): Sets a configuration value by key and saves the updated configuration.
 * - saveConfigFile(): Saves the current configuration data back to the file.
 * 
 * Các phương thức chính:
 * - loadConfigFile(): Tải và phân tích file cấu hình.
 * - parseConfigFile(content): Phân tích nội dung của file cấu hình từ định dạng JSON.
 * - get(key, defaultValue): Truy xuất giá trị cấu hình bằng key với giá trị mặc định tùy chọn.
 * - set(key, value): Đặt giá trị cấu hình bằng key và lưu cấu hình đã cập nhật.
 * - saveConfigFile(): Lưu dữ liệu cấu hình hiện tại trở lại file.
 * 
 * Properties:
 * - configFile: The name of the configuration file.
 * - folderPath: The path to the folder containing the configuration file.
 * - configData: The parsed configuration data as a key-value object.
 * 
 * Các thuộc tính:
 * - configFile: Tên của file cấu hình.
 * - folderPath: Đường dẫn đến thư mục chứa file cấu hình.
 * - configData: Dữ liệu cấu hình đã phân tích dưới dạng đối tượng key-value.
 * 
 * @class
 */
class ConfigLoader {
  /**
   * Creates an instance of ConfigLoader.
   * 
   * Tạo một instance của ConfigLoader.
   * 
   * @param {Object} options - Configuration options.
   * @param {string} options.fileName - The name of the configuration file.
   * @param {string} [options.path] - The path to the folder containing the configuration file.
   * @throws {Error} Throws an error if the file name is not provided.
   */
  constructor({ fileName, path: folderPath }) {
    if (!fileName) {
      throw new Error('Configuration file name must be provided.');
    }

    this.configFile = fileName;
    this.folderPath = folderPath || path.resolve(__dirname, 'config');
    this.configData = {};

    this.loadConfigFile();
  }

  /**
   * Loads and parses the configuration file.
   * 
   * Tải và phân tích file cấu hình.
   */
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

  /**
   * Parses the content of the configuration file from JSON format.
   * 
   * Phân tích nội dung của file cấu hình từ định dạng JSON.
   * 
   * @param {string} content - The content of the configuration file.
   * @returns {Object} Parsed configuration data as key-value pairs.
   * @throws {Error} Throws an error if the content is not valid JSON.
   */
  parseConfigFile(content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error('Error parsing configuration file. Ensure it is valid JSON.');
    }
  }

  /**
   * Retrieves a configuration value by key with an optional default value.
   * 
   * Truy xuất giá trị cấu hình bằng key với giá trị mặc định tùy chọn.
   * 
   * @param {string} key - The key for the configuration value.
   * @param {*} [defaultValue=null] - The default value to return if the key is not found.
   * @returns {*} The configuration value associated with the key or the default value.
   */
  get(key, defaultValue = null) {
    return this.configData.hasOwnProperty(key) ? this.configData[key] : defaultValue;
  }

  /**
   * Sets a configuration value by key and saves the updated configuration.
   * 
   * Đặt giá trị cấu hình bằng key và lưu cấu hình đã cập nhật.
   * 
   * @param {string} key - The key for the configuration value.
   * @param {*} value - The value to set for the key.
   */
  set(key, value) {
    this.configData[key] = value;
    this.saveConfigFile();
  }

  /**
   * Saves the current configuration data back to the file.
   * 
   * Lưu dữ liệu cấu hình hiện tại trở lại file.
   */
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
