import * as governanceService from '../services/governanceService';

jest.mock('../services/governanceService');

describe('governanceService', () => {
  it('fetchProposals returns proposals', async () => {
    governanceService.fetchProposals.mockResolvedValue([{ id: 1, title: 'Test' }]);
    const proposals = await governanceService.fetchProposals();
    expect(Array.isArray(proposals)).toBe(true);
    expect(proposals[0].title).toBe('Test');
  });

  it('submitVote works', async () => {
    governanceService.submitVote.mockResolvedValue({ success: true });
    const result = await governanceService.submitVote(1, true);
    expect(result.success).toBe(true);
  });

  it('claimPayout returns payout', async () => {
    governanceService.claimPayout.mockResolvedValue({ amount: 10 });
    const payout = await governanceService.claimPayout();
    expect(payout.amount).toBeGreaterThan(0);
  });
});
