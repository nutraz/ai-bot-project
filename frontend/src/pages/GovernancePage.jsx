import React, { useState, useEffect } from 'react';
import ProposalList from '../components/Governance/ProposalList';
import ProposalDetail from '../components/Governance/ProposalDetail';
import { fetchProposals, vote as voteProposal } from '../services/daoGovernanceService';

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProposals()
      .then(setProposals)
      .catch((e) => setError('Failed to load proposals'))
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (vote) => {
    if (!selectedProposal) return;
    await voteProposal(selectedProposal.id, vote === 'for');
    alert(`You voted: ${vote}`);
    setSelectedProposal(null);
    setLoading(true);
    fetchProposals().then(setProposals).finally(() => setLoading(false));
  };

  if (loading) return <div className="text-center py-8">Loading proposals...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {!selectedProposal ? (
        <ProposalList proposals={proposals} onSelect={setSelectedProposal} />
      ) : (
        <ProposalDetail proposal={selectedProposal} onBack={() => setSelectedProposal(null)} onVote={handleVote} />
      )}
    </div>
  );
}
