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
import Helpers from './helpers/index.js';
import handleCommand from './handleCommand.js';
import {
    Client,
    Events,
    GatewayIntentBits,
    Collection,
    REST,
    Routes
} from "discord.js";
import {
    resolve as resolvePath
} from "path";
import {
    pathToFileURL
} from "url";
import {
    readdirSync
} from "fs";
const configLoader = new Helpers.ConfigHelpers({
    fileName: "config.json",
    path: resolvePath(process.cwd(), "app", "config")
});

const languageLoader = new Helpers.LanguageLoader({
    lng: configLoader.get("LANGUAGE"),
    path: resolvePath(process.cwd(), "app", "language")
});
/**
 * Vietnamese:
 * Class ParaClient là lớp chính cho bot Discord trong dự án Paradis.
 * Lớp này chịu trách nhiệm thiết lập cấu hình, tải các lệnh, lắng nghe các sự kiện, 
 * và quản lý kết nối đến Discord. Nó cũng xử lý việc ghi log và phản hồi lệnh từ người dùng.
 * 
 * English:
 * The ParaClient class is the main class for the Discord bot in the Paradis project.
 * This class is responsible for setting up configurations, loading commands, listening to events,
 * and managing the connection to Discord. It also handles logging and responding to user commands.
 */

class ParaClient {
    /**
     * Constructor khởi tạo một ParaClient mới.
     * @param {Object} config - Cấu hình để khởi tạo bot.
     * @param {string} config.Token - Token dùng để xác thực với Discord API.
     * 
     * Constructor initializes a new ParaClient.
     * @param {Object} config - Configuration to initialize the bot.
     * @param {string} config.Token - Token used for authentication with the Discord API.
     */
    constructor({ Token }) {
        this.Token = Token;

        // Khởi tạo client Discord với các intent cần thiết.
        // Initializes the Discord client with necessary intents.
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        // Biến toàn cục lưu trữ các lệnh, sự kiện, và thông tin cơ sở dữ liệu của bot.
        // Global variables to store commands, events, and database information of the bot.
        this.globalVariables = {
            Application: new Object({
                Commands: new Map(),
                CommandsAliases: new Map(),
                Events: new Map(),
                Cooldowns: new Map()
            }),
            Database: new Object({
                Guild: new Map(),
                Server: new Map(),
                Member: new Map()
            })
        };

        // Tạo một Collection để lưu trữ các lệnh của bot.
        // Creates a Collection to store the bot's commands.
        this.client.commands = new Collection();
    }

    /**
     * Hàm tải các lệnh từ thư mục lệnh và lưu chúng vào trong biến toàn cục Application.
     * 
     * This function loads commands from the command directory and stores them in the global Application variable.
     */
    async ParaLoadCommands() {
        const commandFiles = readdirSync(resolvePath(process.cwd(), "app", "command")).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = resolvePath(process.cwd(), "app", "command", file);
            const command = await import(pathToFileURL(filePath));
            const { Config, onStart } = command.default;

            if (!Config && typeof Config !== "object") {
                Helpers.LoggerHelpers.error(languageLoader.loadLng("PRD_CONFIG_NOT_EXISTS", file));
            } else if (!onStart && typeof onStart !== "function") {
                Helpers.LoggerHelpers.error(languageLoader.loadLng("PRD_ONSTART_NOT_EXISTS", file ));
            } else {
                this.globalVariables.Application.Commands.set(Config.name, onStart);
            }
        }
    }

    /**
     * Hàm này lắng nghe sự kiện "messageCreate" và xử lý các lệnh từ người dùng.
     * 
     * This function listens to the "messageCreate" event and handles user commands.
     */
    async ParaLoadListener() {
        if (configLoader.get("LOG_MESSAGE") === false) return;

        this.client.on("messageCreate", async message => {
            const { content, channelId, guildId, author, reply } = message;
            Helpers.LoggerHelpers.custom(content, `CHANNEL:${channelId}|GUID:${guildId}|BY:${author.id}/${author.username}`);
            await this.handleCommand(message);
        });
    }

    /**
     * Hàm này xử lý các lệnh từ tin nhắn người dùng.
     * 
     * This function processes commands from user messages.
     * @param {Object} message - Tin nhắn người dùng. | The user's message.
     */
    async handleCommand(message) {
        const { content } = message;
        const prefix = (configLoader.get("PREFIX") || "/").trim().toLowerCase();

        if (content.length > 0 && content.startsWith(prefix)) {
            const commandInput = handleCommand.findCommands(this.globalVariables, content.slice(prefix.length)?.toLowerCase());
            const commands = this.globalVariables.Application.Commands.get(commandInput) || null;

            if (commands !== null) {
                commands({
                    message, __GLOBAL__: this.globalVariables
                });
            } else {
                message.reply(languageLoader.loadLng("PRD_COMMAND_NOT_EXISTS", prefix));
            }
        }
    }

    /**
     * Hàm này đăng nhập vào Discord bằng token đã cung cấp và lắng nghe sự kiện ClientReady.
     * 
     * This function logs into Discord using the provided token and listens to the ClientReady event.
     */
    async loginDiscordClient() {
        this.client.once(Events.ClientReady, readyClient => {
            Helpers.LoggerHelpers.custom(
                languageLoader.loadLng("PRD_LOGIN_SUCCESS_USER", readyClient.user.tag),
                languageLoader.loadLng("PRD_LOGIN")
            );
        });

        try {
            await this.client.login(this.Token);
        } catch (err) {
            Helpers.LoggerHelpers.error(languageLoader.loadLng("PRD_LOGIN_FAILED"));
        }
    }
}

export default ParaClient;
