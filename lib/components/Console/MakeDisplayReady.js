/**
 * The color code to display messages in the console
 */
const color = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  grey: '\x1b[2m'
}

/**
 *
 * @param {*} ticket Single Ticket object
 * @param {*} listFlag To distinguish TicketList and single ticket
 * @returns display ready ticket details
 */
const MakeDisplayReady = (ticket, listFlag) => {
  const id = ticket.id
  const subject = ticket.subject
  const desc = ticket.description
  const updateTime = ticket.updateTime
  var out
  if (listFlag) {
    out =
      id +
      ''.padStart(5 - id.toString().length, ' ') +
      updateTime +
      ''.padStart(25 - updateTime.length, ' ') +
      subject
  } else {
    out = '\n\nId: ' + color.grey + id + color.reset + '\n'
    out += 'Subject: ' + color.grey + subject + color.reset + '\n'
    out += 'Last Update Time: ' + color.grey + updateTime + color.reset + '\n\n'
    out += 'Description: ' + color.grey + desc + color.reset + '\n\n'
  }
  return out
}
module.exports = MakeDisplayReady
