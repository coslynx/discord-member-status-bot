<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-member-status-bot
</h1>
<h4 align="center">A Discord bot that provides real-time insights into member activity within a server.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" alt="Language: TypeScript">
  <img src="https://img.shields.io/badge/Framework-Discord.js-red" alt="Framework: Discord.js">
  <img src="https://img.shields.io/badge/Database-MySQL-blue" alt="Database: MySQL">
  <img src="https://img.shields.io/badge/API-Discord-black" alt="API: Discord">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/discord-member-status-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/discord-member-status-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/discord-member-status-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses the "discord-member-status-bot" project, a sophisticated Discord bot designed to provide real-time insights into member activity within a server. Utilizing a robust tech stack comprising TypeScript, Discord.js, MySQL, and the Discord API, the bot empowers server administrators with invaluable data to make informed decisions regarding server management and member engagement. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | Real-Time Member Status Updates:  Tracks and displays member join/leave events in real time, showcasing online/offline status indicators. |
| 🎤 | Voice Channel Time Tracking: Monitors the duration of each member's presence in voice channels, calculating and displaying total voice channel time. |
| 💬 | Daily Message Count: Tracks and displays the number of messages sent by each member daily, providing a comprehensive understanding of member activity within the server's text channels. |
| 🤖 | Automated Embed Updates: Ensures embeds displaying real-time member status, voice channel time, and message counts are updated automatically at predefined intervals. |
| 🧑‍💻 | User-Friendly Interface: Provides a user-friendly interface for bot configuration, enabling server administrators to customize settings, access commands, and manage bot functionality. |
| 🛡️ | Robust Error Handling:  Incorporates comprehensive error handling mechanisms to prevent crashes, data loss, and unexpected behavior. |
| 📈 | Advanced Analytics (Optional):  Potential for incorporating advanced analytics capabilities, providing insights into member trends and engagement patterns. |
| 🌐 | Server-Specific Configuration (Optional):  Allows for server-specific configurations, enabling different servers to have customized settings. |

## 📂 Structure

```
discord-member-status-bot/
├── src/
│   ├── events/
│   │   ├── ready.ts
│   │   ├── guildMemberAdd.ts
│   │   ├── guildMemberRemove.ts
│   │   ├── voiceStateUpdate.ts
│   │   ├── messageCreate.ts
│   │   └── interactionCreate.ts
│   ├── commands/
│   │   ├── status.ts
│   │   ├── voicetime.ts
│   │   ├── messagecount.ts
│   │   ├── help.ts
│   │   └── config.ts
│   ├── services/
│   │   ├── memberService.ts
│   │   ├── voiceChannelService.ts
│   │   ├── messageService.ts
│   │   └── embedService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── errorHandler.ts
│   │   ├── database.ts
│   │   └── helper.ts
│   ├── config/
│   │   ├── env.config.ts
│   │   └── database.config.ts
│   ├── models/
│   │   ├── member.ts
│   │   ├── voiceChannel.ts
│   │   ├── message.ts
│   │   └── embed.ts
│   ├── interfaces/
│   │   ├── memberInterface.ts
│   │   ├── voiceChannelInterface.ts
│   │   ├── messageInterface.ts
│   │   └── embedInterface.ts
│   └── index.ts
└── dashboard/
    ├── src/
    │   ├── main.ts
    │   ├── router.ts
    │   ├── components/
    │   │   ├── App.vue
    │   │   ├── Home.vue
    │   │   ├── Members.vue
    │   │   ├── VoiceTime.vue
    │   │   ├── MessageCount.vue
    │   │   ├── Config.vue
    │   │   └── About.vue
    │   ├── styles/
    │   │   ├── index.css
    │   │   └── tailwind.css
    │   ├── store/
    │   │   ├── index.ts
    │   │   └── modules/
    │   │       ├── member.ts
    │   │       ├── voiceTime.ts
    │   │       ├── messageCount.ts
    │   │       ├── config.ts
    │   │       └── embed.ts
    │   ├── utils/
    │   │   ├── fetchAPI.ts
    │   │   ├── auth.ts
    │   │   └── helper.ts
    │   └── main.js
    └── vite.config.js

```

  ## 💻 Installation
  ### 🔧 Prerequisites
  - Node.js
  - npm
  - MySQL
  - Discord Bot Account

  ### 🚀 Setup Instructions
  1. Clone the repository:
     ```bash
     git clone https://github.com/coslynx/discord-member-status-bot.git
     ```
  2. Navigate to the project directory:
     ```bash
     cd discord-member-status-bot
     ```
  3. Install dependencies:
     ```bash
     npm install
     ```
  4. Set up a MySQL database:
     - Create a database and a user with appropriate permissions.
     - Update the database configuration in `src/config/database.config.ts` with your database credentials.
  5. Create a Discord Bot Account:
     - Create a Discord bot account and generate a bot token.
     - Add your bot token to the `.env` file:
       ```bash
       DISCORD_TOKEN="YOUR_BOT_TOKEN"
       ```
  6. Configure the bot:
     - Update the `src/config/env.config.ts` file with any necessary environment variables, such as your Discord server ID, bot prefix, and other settings. 

  ## 🏗️ Usage
  ### 🏃‍♂️ Running the Project
  1. Start the development server:
     ```bash
     npm run dev
     ```
  2. Invite your bot to your server:
     - Use the Discord developer portal to get a link to invite your bot to your server. 
  3. Use the bot's commands:
     - Try using commands like `/status`, `/voicetime`, `/messagecount`, `/help`, and `/config` (as available) to explore the bot's features.

  ### ⚙️ Configuration
  - Environment Variables: Modify settings in the `.env` file to adjust various bot parameters.
  - Bot Settings: Use the `/config` command (if implemented) to customize the bot's behavior within your server.

  ### 📚 Examples
  - `/status`: Displays real-time member status updates.
  - `/voicetime`: Shows the voice channel time for each member.
  - `/messagecount`: Displays the daily message count for each member.
  - `/help`: Provides a list of available commands and their descriptions.

  ## 🌐 Hosting
  ### 🚀 Deployment Instructions
  1. Build the project:
     ```bash
     npm run build
     ```
  2. Set up a server environment:
     - Choose a hosting platform (e.g., Heroku, AWS, Google Cloud) based on your needs.
     - Create a new application or instance on your chosen platform.
     - Configure the environment variables (e.g., `DISCORD_TOKEN`, `DB_HOST`, `DB_USER`, `DB_PASS`) on your server.
  3. Deploy the bot:
     - Follow the specific deployment instructions for your hosting platform.
     - Ensure your bot has the necessary permissions to operate within your server. 

  ## 📜 API Documentation
  ### 🔍 Endpoints
  - GET /api/members: Retrieves a list of members with their activity data.
  - GET /api/voice-channels: Retrieves a list of voice channels with member voice time data.
  - GET /api/messages: Retrieves a list of messages with message count data.

  ### 🔒 Authentication
  - The bot uses Discord's OAuth2 authentication to securely access Discord API data. 
  - You can set up a web-based dashboard (optional) that requires user authentication for managing the bot. 

  ### 📝 Examples
  - `curl -X GET http://localhost:3000/api/members`

  ## 📜 License
  This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

  ## 👥 Authors
  - Author Name - [Spectra.codes](https://spectra.codes)
  - Creator Name - [DRIX10](https://github.com/Drix10)

  <p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>