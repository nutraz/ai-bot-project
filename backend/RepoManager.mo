import Array "mo:base/Array";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

type Visibility = variant { Public; Private };

type Repository = {
  id : Nat;
  owner : Principal;
  name : Text;
  description : Text;
  visibility : Visibility;
  created_at : Nat64;
};

actor RepoManager {
  var nextId : Nat = 0;
  var repositories : [var Repository] = [];

  public query func getRepositories() : async [Repository] {
    return repositories;
  };

  public query func getRepositoryById(id : Nat) : async ?Repository {
    for (repo in repositories.vals()) {
      if (repo.id == id) {
        return ?repo;
      };
    };
    null;
  };

  public update func createRepository(
    name : Text,
    description : Text,
    visibility : Visibility
  ) : async Repository {
    let owner = Principal.self();
    let repo = Repository(
      id = nextId,
      owner = owner,
      name = name,
      description = description,
      visibility = visibility,
      created_at = Time.now()
    );
    repositories := repositories # [repo];
    nextId += 1;
    repo;
  };

  public update func deleteRepository(id : Nat) : async Bool {
    let before = repositories.size();
    repositories := Array.filter<Repository>(repositories, func(r) r.id != id);
    return repositories.size() < before;
  };
};
