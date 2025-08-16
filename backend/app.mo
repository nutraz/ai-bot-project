// File: backend/app.mo

import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

type RepoId = Nat;
type CommitHash = Text;
type Role = variant { Owner; Maintainer; Contributor; Viewer };

// A single commit
record Commit {
  hash : CommitHash;
  message : Text;
  author : Principal;
  timestamp : Time.Time;
};

// Repository structure
record Repo {
  id : RepoId;
  name : Text;
  description : Text;
  owner : Principal;
  contributors : [(Principal, Role)];
  commits : [Commit];
  createdAt : Time.Time;
};

// Global state
var var repos : [Repo] := [];
var nextRepoId : RepoId := 0;

// Helper: get caller
func caller() : Principal {
  debug.print(debug.toText(Principal.toText(ic.caller())));
  return ic.caller();
}

// Create a new repo
public func createRepo(name : Text, description : Text) : async RepoId {
  let owner = caller();
  let repo = Repo({
    id = nextRepoId;
    name;
    description;
    owner;
    contributors = [(owner, #Owner)];
    commits = [];
    createdAt = Time.now()
  });
  repos := Array.append<Repo>(repos, [repo]);
  nextRepoId += 1;
  return repo.id;
};

// Add a commit
public func addCommit(repoId : RepoId, hash : CommitHash, message : Text) : async Bool {
  let author = caller();
  var updated = false;
  repos := Array.map<Repo>(repos, func (repo) : Repo {
    if (repo.id == repoId) {
      // Check if user is contributor
      if (Array.exists<(Principal, Role)>(repo.contributors, func (c) = c.0 == author)) {
        let commit : Commit = {
          hash;
          message;
          author;
          timestamp = Time.now()
        };
        return Repo(repo with { commits = Array.append<Commit>(repo.commits, [commit]) });
      } else {
        debug.print("Unauthorized commit attempt");
        return repo;
      }
    };
    return repo;
  });
  return updated;
};

// Get repo by ID
public query func getRepo(repoId : RepoId) : async ?Repo {
  return Array.find<Repo>(repos, func (r) = r.id == repoId);

};

// List all repos
public query func listRepos() : async [Repo] {
  return repos;
};

// Add contributor
public func addContributor(repoId : RepoId, user : Principal, role : Role) : async Bool {
  let admin = caller();
  var found = false;
  repos := Array.map<Repo>(repos, func (repo) : Repo {
    if (repo.id == repoId and (repo.owner == admin or Array.exists<(Principal, Role)>(repo.contributors, func (c) = c.0 == admin and (c.1 == #Owner or c.1 == #Maintainer)))) {
      // Add or update role
      let filtered = Array.filter<(Principal, Role)>(repo.contributors, func (c) = c.0 != user);
      let updated = Array.append<(Principal, Role)>(filtered, [(user, role)]);
      found := true;
      return Repo(repo with { contributors = updated });
    };
    return repo;
  });
  return found;
};
