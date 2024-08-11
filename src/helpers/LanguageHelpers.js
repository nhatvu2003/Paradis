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
 * LanguageLoader is a class that handles loading and parsing language files for
 * internationalization purposes. It loads a language file, parses it into a key-value
 * format, and provides a method to retrieve localized messages with placeholders.
 * 
 * LanguageLoader là một lớp xử lý việc tải và phân tích các file ngôn ngữ cho mục đích
 * quốc tế hóa. Nó tải một file ngôn ngữ, phân tích nó thành định dạng key-value, và
 * cung cấp phương thức để truy xuất các thông điệp đã địa phương hóa với các placeholder.
 * 
 * Constructor:
 * - {Object} options - Configuration options.
 * - {string} options.lng - The language code for the language file.
 * - {string} [options.path] - The path to the folder containing the language file.
 * 
 * Constructor:
 * - {Object} options - Tùy chọn cấu hình.
 * - {string} options.lng - Mã ngôn ngữ cho file ngôn ngữ.
 * - {string} [options.path] - Đường dẫn đến thư mục chứa file ngôn ngữ.
 * 
 * Key methods:
 * - loadLanguageFile(): Loads and parses the language file.
 * - parseLanguageFile(content): Parses the content of the language file into a key-value object.
 * - loadLng(key, ...params): Retrieves a localized message by key and replaces placeholders with provided parameters.
 * 
 * Các phương thức chính:
 * - loadLanguageFile(): Tải và phân tích file ngôn ngữ.
 * - parseLanguageFile(content): Phân tích nội dung của file ngôn ngữ thành đối tượng key-value.
 * - loadLng(key, ...params): Truy xuất thông điệp đã địa phương hóa bằng key và thay thế các placeholder bằng các tham số được cung cấp.
 * 
 * Properties:
 * - languageFile: The name of the language file based on the language code.
 * - folderPath: The path to the folder containing the language file.
 * - languageData: The parsed language data as a key-value object.
 * 
 * Các thuộc tính:
 * - languageFile: Tên của file ngôn ngữ dựa trên mã ngôn ngữ.
 * - folderPath: Đường dẫn đến thư mục chứa file ngôn ngữ.
 * - languageData: Dữ liệu ngôn ngữ đã phân tích dưới dạng đối tượng key-value.
 * 
 * @class
 */
class LanguageLoader {
  /**
   * Creates an instance of LanguageLoader.
   * 
   * Tạo một instance của LanguageLoader.
   * 
   * @param {Object} options - Configuration options.
   * @param {string} options.lng - The language code for the language file.
   * @param {string} [options.path] - The path to the folder containing the language file.
   */
  constructor({ lng, path: folderPath }) {
    if (!lng) {
      throw new Error('Language code must be provided.');
    }

    this.languageFile = `${lng}.lng`;
    this.folderPath = folderPath || path.resolve(__dirname, 'language');
    this.languageData = {};

    this.loadLanguageFile();
  }

  /**
   * Loads and parses the language file.
   * 
   * Tải và phân tích file ngôn ngữ.
   */
  loadLanguageFile() {
    const filePath = path.join(this.folderPath, this.languageFile);
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Language file "${this.languageFile}" not found in "${this.folderPath}".`);
      }

      const content = fs.readFileSync(filePath, 'utf8');
      this.languageData = this.parseLanguageFile(content);
    } catch (error) {
      console.error(`Error loading language file:`, error.message);
    }
  }

  /**
   * Parses the content of the language file into a key-value object.
   * 
   * Phân tích nội dung của file ngôn ngữ thành đối tượng key-value.
   * 
   * @param {string} content - The content of the language file.
   * @returns {Object} Parsed key-value pairs.
   */
  parseLanguageFile(content) {
    return content
      .split('\n')
      .filter(line => line.trim() !== '')
      .reduce((acc, line) => {
        const [key, ...value] = line.split('=');
        if (key) {
          acc[key.trim()] = value.join('=').trim();
        }
        return acc;
      }, {});
  }

  /**
   * Retrieves a localized message by key and replaces placeholders with provided parameters.
   * 
   * Truy xuất thông điệp đã địa phương hóa bằng key và thay thế các placeholder bằng các tham số được cung cấp.
   * 
   * @param {string} key - The key for the localized message.
   * @param {...*} params - Parameters to replace placeholders in the message.
   * @returns {string} The localized message with placeholders replaced.
   */
  loadLng(key, ...params) {
    let message = this.languageData[key] || `Key "${key}" not found.`;
    if (message) {
      params.forEach((param, index) => {
        const placeholder = `%${index + 1}`;
        message = message.replace(new RegExp(placeholder, 'g'), param);
      });
    }
    return message;
  }
}

export default LanguageLoader;
