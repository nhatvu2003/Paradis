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

/**
 * Vietnamese:
 * Hàm `findCommands` dùng để tìm kiếm lệnh từ input đầu vào và trả về tên lệnh nếu tồn tại.
 * 
 * @param {Object} globalVariables - Đối tượng chứa các biến toàn cục, trong đó có `Application.Commands`.
 * @param {string} commandInput - Chuỗi nhập vào để tìm kiếm lệnh trong danh sách lệnh.
 * @returns {string|undefined} - Trả về tên lệnh nếu tìm thấy, nếu không trả về `undefined`.
 * 
 * English:
 * The `findCommands` function is used to search for a command from the input and returns the command name if it exists.
 * 
 * @param {Object} globalVariables - The object containing global variables, including `Application.Commands`.
 * @param {string} commandInput - The input string used to search for the command in the command list.
 * @returns {string|undefined} - Returns the command name if found, otherwise returns `undefined`.
 */
const findCommands = (globalVariables, commandInput) => {
    const command = globalVariables.Application.Commands;
    if (command.has(commandInput)) return commandInput;
}

export default {
    findCommands
}