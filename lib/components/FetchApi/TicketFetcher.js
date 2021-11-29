'use-strict'
const axios = require('axios')
const Ticket = require('../Ticket/Ticket')

class ApiTicketFetcher {
  /**
   * HttpTicketRequest Class.
   *
   * @param {String} username=>emailId/token and password=>API_Token used to authenticate the client.
   */
  constructor(username, password) {
    this.axiosConfig = {
      method: 'post',
      timeout: 2000, // default is `0` (no timeout)
      auth: {
        username,
        password
      }
    }
  }

  /**
   * Makes a fetch request to the Zendesk API for all tickets and uses closure to pass the next page url back to itself if there is one.
   *
   * @returns {Mixed} Returns a list of tickets from the Zendesk API or null if an error occurs.
   */
  async fetchAllTickets(perPage) {
    // const perPage = 25
    let url = `https://zccsagnikhajra.zendesk.com/api/v2/tickets.json?per_page=${perPage}`
    let page = 0
    return async () => {
      if (url) {
        let apiResponse = await this.fetchApi(url)
        if (apiResponse) {
          let result = this.formTickets(apiResponse.tickets)
          url = apiResponse.next_page
          result.nextPage = apiResponse.next_page
          result.page = this.getPageNumberFromUrl(url)
          result.page = result.page === -1 ? ++page : result.page
          result.count = apiResponse.count
          result.perPage = perPage
          page = result.page
          return result
        } else return null
      } else return null
    }
  }

  /**
   * Fetch request to Zendesk API for a single tickets by its id.
   *
   * @param {Number} ticketId Id for ticket.
   * @returns {Mixed} Returns a single ticket from the Zendesk API.
   */
  async fetchTicketById(ticketId) {
    let url = `https://zccsagnikhajra.zendesk.com/api/v2/tickets/${ticketId}.json`
    let response = await this.fetchApi(url)
    return response ? new Ticket(response.ticket) : null
  }

  /**
   * Template fetch request.
   *
   * @returns {Promise} Returns Promise from fetch request.
   */
  async fetchApi(url) {
    return axios
      .get(url, this.axiosConfig)
      .then(this.handleErrors)
      .then((result) => result.data)
      .catch(
        (err) => console.log(err)
        // console.log("Sorry, the requested data might not be available!!")
      )
  }

  /**
   * Basic error handling for the fetch request to the Zendesk API.
   *
   * @param {Object} response Response returned from fetch request to the Zendesk API.
   */
  handleErrors(response) {
    if (response.status != 200) {
      console.log('\x1b[31mAPI Request Issue..')
      switch (response.status) {
        case 401:
          throw response.statusText + ": Couldn't authenticate user\x1b[0m"
        case 404:
          throw response.statusText + ': Ticket not found\x1b[0m'
        case 400:
          throw response.statusText + ': Invalid Ticket Id\x1b[0m'
        default:
          throw response.statusText + '\x1b[0m'
      }
    }
    return response
  }

  /**
   * Uses a get function of URL module(node built in) to find and return the current page number from URL.
   *
   * @returns {String} Page number of the current URL.
   */
  getPageNumberFromUrl(url) {
    if (!url) return -1
    const pageUrl = new URL(url)
    return pageUrl.searchParams.get('page') || -1
  }

  /**
   * Formats a list of tickets retrieved from the Zendesk API into the Ticket data model.
   *
   * @param {Array} ticketsList Tickets list retrieved from Zendesk API.
   * @returns {Array} Returns array with Ticket objects.
   */
  formTickets(ticketsList) {
    return ticketsList.map((ticketObject) => {
      return new Ticket(ticketObject)
    })
  }
}

module.exports = ApiTicketFetcher
