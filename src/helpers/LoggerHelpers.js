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
import gradient from "gradient-string";

/**
 * Defines various log levels used for categorizing log messages.
 * 
 * Định nghĩa các cấp độ log khác nhau được sử dụng để phân loại các thông điệp log.
 * 
 * @constant {Object}
 */
const LOG_LEVELS = {
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    SYSTEM: "system",
    CUSTOM: "custom"
};
/**
 * LoggerHelpers is a class that provides methods for logging messages to the console
 * with various log levels. Each log level can be configured with different colors and
 * gradients to enhance readability and distinction.
 * 
 * LoggerHelpers là một lớp cung cấp các phương thức để ghi log thông điệp ra console
 * với các cấp độ log khác nhau. Mỗi cấp độ log có thể được cấu hình với màu sắc và
 * gradient khác nhau để tăng cường khả năng đọc và phân biệt.
 * 
 * Supported log levels:
 * - INFO: General informational messages.
 * - WARN: Warning messages indicating potential issues.
 * - ERROR: Error messages indicating something went wrong.
 * - SYSTEM: System-related messages.
 * - CUSTOM: Custom messages with user-defined tags and gradients.
 * 
 * Các cấp độ log hỗ trợ:
 * - INFO: Thông điệp thông tin chung.
 * - WARN: Thông điệp cảnh báo chỉ ra vấn đề tiềm ẩn.
 * - ERROR: Thông điệp lỗi chỉ ra điều gì đó đã xảy ra không đúng.
 * - SYSTEM: Thông điệp liên quan đến hệ thống.
 * - CUSTOM: Thông điệp tùy chỉnh với nhãn và gradient do người dùng định nghĩa.
 * 
 * Key methods:
 * - info(message): Logs a message with the INFO level.
 * - warn(message): Logs a message with the WARN level.
 * - error(message): Logs a message with the ERROR level.
 * - system(message): Logs a message with the SYSTEM level.
 * - custom(message, type, customGradient): Logs a custom message with a user-defined tag
 *   and gradient.
 * 
 * Các phương thức chính:
 * - info(message): Ghi log thông điệp với cấp độ INFO.
 * - warn(message): Ghi log thông điệp với cấp độ WARN.
 * - error(message): Ghi log thông điệp với cấp độ ERROR.
 * - system(message): Ghi log thông điệp với cấp độ SYSTEM.
 * - custom(message, type, customGradient): Ghi log thông điệp tùy chỉnh với nhãn do người dùng
 *   định nghĩa và gradient.
 * 
 * Properties:
 * - settings: Configuration for colors and gradients for each log level.
 * 
 * Các thuộc tính:
 * - settings: Cấu hình màu sắc và gradient cho từng cấp độ log.
 * 
 * @class
 */
class LoggerHelpers {
    constructor() {
        // Configuration for colors and gradients for each log level
        // Cấu hình màu sắc và gradient cho từng cấp độ log
        this.settings = {
            [LOG_LEVELS.INFO]: {
                color: "\x1b[32m",  // Green color for INFO
                gradient: gradient.retro  // Retro gradient for INFO
            },
            [LOG_LEVELS.WARN]: {
                color: "\x1b[33m",  // Yellow color for WARN
                gradient: gradient.rainbow  // Rainbow gradient for WARN
            },
            [LOG_LEVELS.ERROR]: {
                color: "\x1b[31m",  // Red color for ERROR
                gradient: gradient.retro  // Retro gradient for ERROR
            },
            [LOG_LEVELS.SYSTEM]: {
                color: "\x1b[34m",  // Blue color for SYSTEM
                gradient: gradient.atlas  // Atlas gradient for SYSTEM
            },
            [LOG_LEVELS.CUSTOM]: {
                color: "\x1b[36m",  // Cyan color for CUSTOM
                gradient: gradient.pastel  // Pastel gradient for CUSTOM
            }
        };
    }

    // General method to log messages
    // Phương thức chung để ghi log thông điệp
    log(level, message, type) {
        const { color, gradient } = this.settings[level];
        const tag = `\x1b[1m${color}[${level.toUpperCase()}]\x1b[0m`;
        const formattedMessage = `\x1b[1m${gradient(message)}\x1b[0m`;

        console.log(`${tag} ${formattedMessage}`);
    }

    // Logs a message with the INFO level
    // Ghi log thông điệp với cấp độ INFO
    info(message) {
        this.log(LOG_LEVELS.INFO, message);
    }

    // Logs a message with the WARN level
    // Ghi log thông điệp với cấp độ WARN
    warn(message) {
        this.log(LOG_LEVELS.WARN, message);
    }

    // Logs a message with the ERROR level
    // Ghi log thông điệp với cấp độ ERROR
    error(message) {
        this.log(LOG_LEVELS.ERROR, message);
    }

    // Logs a message with the SYSTEM level
    // Ghi log thông điệp với cấp độ SYSTEM
    system(message) {
        this.log(LOG_LEVELS.SYSTEM, message);
    }

    /**
     * Logs a message with the CUSTOM level, allowing user-defined tags and gradients.
     * 
     * Ghi log thông điệp với cấp độ CUSTOM, cho phép nhãn và gradient do người dùng định nghĩa.
     * 
     * @param {string} message - The message to be logged.
     * @param {string} [type="CUSTOM"] - The custom tag to be used in the log.
     * @param {function} [customGradient=gradient.pastel] - The gradient function to format the message.
     */
    custom(message, type = "CUSTOM", customGradient = gradient.pastel) {
        const color = this.settings[LOG_LEVELS.CUSTOM].color;
        const tag = `\x1b[1m${color}[${type.toUpperCase()}]\x1b[0m`;
        const formattedMessage = `\x1b[1m${customGradient(message)}\x1b[0m`;

        console.log(`${tag} ${formattedMessage}`);
    }
}

export default new LoggerHelpers();
