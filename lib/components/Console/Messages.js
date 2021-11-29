// The color code to be displayed in the console
const color = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  grey: '\x1b[2m'
}
// Different messages to be displayed in the console
const messages = {
  welcome: `\n${color.magenta}!!Welcome to Zendesk ticketing system!!${color.reset}\n`,
  displayMsg: `> Type ${color.green}'menu'${color.reset} or ${color.green}'exit'${color.reset}\n>`,
  menuItems: `> Enter ${color.green}1${color.reset} for ticket list\n  Enter ${color.green}2${color.reset} to get details by ticket id\n  Enter ${color.green}'exit'${color.reset} to say goodbye..\n>`,
  ticketIdInput: '> Enter the ticket id:',
  fetch: 'Fetching tickets....',
  scrolling: `\nPress ${color.green}Enter${color.reset} to continue scrolling else ${color.green}type anything${color.reset}\n>`,
  goodbuy: `${color.magenta}Goodbuy....${color.reset}`
}

module.exports = { messages, color }
