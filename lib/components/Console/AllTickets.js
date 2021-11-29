const MakeDisplayReady = require('./MakeDisplayReady')
/**
 * Prints a ticket details in the console
 * @param {*} tickets Array of Ticket class object
 */
const AllTickets = (tickets) => {
  const dummyTicket = {
    id: 'Id',
    updateTime: 'UpdateTime',
    subject: 'Subject',
    description: ''
  }
  console.log(MakeDisplayReady(dummyTicket, true))
  tickets.map((ticket) => {
    console.log('\x1b[2m' + MakeDisplayReady(ticket, true) + '\x1b[0m')
  })
}

module.exports = AllTickets
