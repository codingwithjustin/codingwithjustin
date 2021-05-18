import * as functions from 'firebase-functions'

const config = functions.config()

export const discordPublicKey = config.discord.publickey
export const discordBotToken = config.discord.token
export const discordGuild = config.discord.guild
export const discordRole = config.discord.role
