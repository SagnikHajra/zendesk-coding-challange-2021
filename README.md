# zendesk-coding-challange-2021
Project is about fetching dumy support ticket details from Zendesk Api
A command line interface based application that is written in javascript using the Node.js runtime. The app makes HTTP requests to the Zendesk API to retrieve account tickets displayed in either a summary table or full details format. The task had a one week deadline to create and submit the application.

## Prerequisite Installations

- [NodeJS](https://nodejs.org/en/) v14.18.0 or greater
- NPM 8.1.4 or greater

## How to run (MacOS/Windows)

1. Download the repository to your local machine.

```
Redirect to the directory
```

```
$ npm install
```

4. Run the program with the following code.

```
$ npm start
```

#### Run Tests

1. Navigate to the repository directory in your MacOS Terminal or equivalent command line application.
2. Run the tests with the following code

```
$ npm test
```

## Architectural Design Overview

### Assumptions

- Users are familar with CLI usage.
- Ticket requests to the Zendesk API will always return JSON with the same structure.
- Error responses from the Zendesk API will always return JSON with the same structure.

### Main Component Description

- `app.js` : Program entry point, communicates data between components takes user input.
- `Ticket.js` : Data model for tickets.
- `TicketFetcher.js` : Makes requests to the Zendesk API and returns tickets.
- `AllTickets.js/MakeDisplayReady.js` : Create the output formats/font-color.
- `test/Ticket.Test.js` : Test the Ticket object created by Ticket.js.

### Design Choices

#### Connect to the Zendesk API & Request the tickets for your account

1. The login password is no longer hardcoded in plain text, which would have left them vulnerable to being compomised.
2. API token allows scope limits to be set that can restrict token access to **_only reading ticket data_** from the Zendesk API.

#### Display tickets in a list & Display individual ticket details

#### Page through tickets when more than 25 are returned

## Learning Resources

The following section contains links to resources I found super useful while building this application.

- Zendesk docs quick links

  - [Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#show-ticket)

  - [Basic Authentication](https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication)

  - [Pagination](https://developer.zendesk.com/rest_api/docs/support/introduction#pagination)

- Basic reference I found on stackoverflow for changing terminal output colours.

  - [Terminal Colour Reference](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
