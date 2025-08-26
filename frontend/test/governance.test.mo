import { test; assertEqual; assert } = "mo:test";
import G = "canister:governance";

test("create proposal", () -> async {
  let id = await G.createProposal("Test Proposal");
  assert(id > 0);
});

test("vote on proposal", () -> async {
  let id = await G.createProposal("Vote Proposal");
  await G.vote(id, true);
  let p = await G.getProposal(id);
  assertEqual(p.votesFor, 1);
});

test("revenue accrual", () -> async {
  await G.addRevenue(100);
  assertEqual(await G.getTotalRevenue(), 100);
});

test("payout", () -> async {
  await G.addRevenue(100);
  let paid = await G.claimPayout("user1");
  assert(paid > 0);
});
