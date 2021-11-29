const readline = require('readline-sync')
const ticketFetcher = require('./components/FetchApi/TicketFetcher')
const { messages } = require('./components/Console/Messages')
const MakeDisplayReady = require('./components/Console/MakeDisplayReady')
const AllTickets = require('./components/Console/AllTickets')
const {
  USERNAME,
  TOKEN,
  MENU,
  EXIT,
  GET_ALL_TICKETS,
  GET_TICKET_BY_ID,
  TICKETS_PER_PAGE
} = require('./config')

console.log(messages.welcome)
var nextmessage = messages.displayMsg
var ticketDetails

const ticketFetched = new ticketFetcher(USERNAME, TOKEN)
;(async function main() {
  var userLive = true
  var consoleInput

  const readInput = (message) => {
    return readline.question(message).toLowerCase()
  }

  const actions = {
    // When user enters 'menu'
    [MENU]: async () => {
      nextmessage = messages.menuItems
    },
    // When user enters '1'
    [GET_ALL_TICKETS]: async () => {
      const ticketAsyncCaller = await ticketFetched.fetchAllTickets(TICKETS_PER_PAGE)
      let scrolling = true
      console.log(messages.fetch)
      while (scrolling) {
        const tickets = await ticketAsyncCaller()
        if (tickets) {
          AllTickets(tickets)
          scrolling = tickets.nextPage ? !readInput(messages.scrolling) : false
        } else scrolling = false
      }
    },
    // When user enters '2' and then ticket id when prompted
    [GET_TICKET_BY_ID]: async () => {
      const ticketId = readInput(messages.ticketIdInput)
      ticketDetails = await ticketFetched.fetchTicketById(ticketId)
      console.log(MakeDisplayReady(ticketDetails, false))
    },
    // When user enters 'exit'
    [EXIT]: async () => {
      console.log(messages.goodbuy)
      userLive = false
    }
  }
  // The while loop runs as long as user is engaged in the console
  while (userLive) {
    consoleInput = readInput(nextmessage)
    if (consoleInput in actions) {
      await actions[consoleInput]()
    } else {
      console.log('Invalid Input')
    }
  }
})()
