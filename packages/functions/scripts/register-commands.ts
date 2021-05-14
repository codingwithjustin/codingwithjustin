import * as fetch from 'node-fetch'
import * as commands from './commands.json'
import * as dotenv from 'dotenv'

dotenv.config()

const applicationId = process.env.DISCORD_APPLICATION_ID
const token = process.env.DISCORD_TOKEN
const guildId = process.env.DISCORD_GUILD_ID

const auth = `Bot ${token}`
const url = `https://discord.com/api/v8/applications/${applicationId}/guilds/${guildId}/commands`

fetch(url, {
  method: 'POST',
  headers: { auth },
  body: JSON.stringify(commands[0])
})
