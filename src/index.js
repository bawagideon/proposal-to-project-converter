// Proposal to Project Kickoff Converter Engine
class ProposalToProjectConverter {
  constructor(options = {}) {
    this.depositPercent = options.depositPercent || 50;
  }

  processSignedProposal(proposal) {
    const { id, title, clientName, clientEmail, totalBudget, deliverables } = proposal;
    const depositAmount = Math.round((totalBudget * (this.depositPercent / 100)));

    const workspaceId = 'proj_' + Math.random().toString(36).substr(2, 8);
    const milestones = (deliverables || []).map((del, idx) => ({
      milestoneId: 'ms_' + (idx + 1),
      title: del,
      status: 'PLANNED',
      dueDateEstimateDays: (idx + 1) * 14
    }));

    const invoice = {
      invoiceId: 'inv_' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      clientEmail,
      amount: depositAmount,
      type: `${this.depositPercent}% Upfront Project Deposit`,
      status: 'AWAITING_PAYMENT'
    };

    return {
      proposalId: id,
      clientName,
      workspaceId,
      slackChannel: `#client-${clientName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      totalBudget,
      depositRequired: depositAmount,
      milestones,
      invoice,
      status: 'WORKSPACE_PROVISIONED',
      provisionedAt: new Date().toISOString()
    };
  }
}

module.exports = { ProposalToProjectConverter };
