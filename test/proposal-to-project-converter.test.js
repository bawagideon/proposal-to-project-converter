const test = require('node:test');
const assert = require('node:assert');
const { ProposalToProjectConverter } = require('../src/index.js');

test('ProposalToProjectConverter: calculates 50% upfront deposit', () => {
  const converter = new ProposalToProjectConverter();
  const res = converter.processSignedProposal({
    id: 'prop_99',
    title: 'Mobile App Build',
    clientName: 'Nike',
    clientEmail: 'procure@nike.com',
    totalBudget: 20000,
    deliverables: ['Design', 'Frontend', 'Backend']
  });
  assert.strictEqual(res.depositRequired, 10000);
  assert.strictEqual(res.invoice.amount, 10000);
  assert.strictEqual(res.milestones.length, 3);
  assert.strictEqual(res.slackChannel, '#client-nike');
});
