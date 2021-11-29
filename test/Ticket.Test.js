'use-strict'
const Ticket = require('../lib/components/Ticket/Ticket')
const { test } = require('tap')
/**
 * The created Ticket format should be as expected
 */
// When All keys are present
test('ticket test', async (t) => {
  t.test('basic ticket structure', async (tt) => {
    const mockTicket = {
      id: 123,
      subject: 'Hello World!',
      description: 'foo bar',
      updated_at: '2021-01-01T00:50:07Z',
      requester_id: 123123
    }
    const expected = {
      id: 123,
      subject: 'Hello World!',
      description: 'foo bar',
      updateTime: '2021-01-01T00:50:07Z',
      requesterId: 123123
    }
    console.log(new Ticket(mockTicket))
    tt.same(new Ticket(mockTicket), expected, 'ticket testing')
  })
  //When all keys are none or zero
  t.test('basic ticket structure when all keys are none', async (tt) => {
    const mockTicket = {}
    const expected = {
      id: 0,
      subject: 'None',
      description: 'None',
      updateTime: '1970-01-01T00:00:00Z',
      requesterId: 0
    }
    console.log(new Ticket(mockTicket))
    tt.same(new Ticket(mockTicket), expected, 'ticket testing')
  })
})
