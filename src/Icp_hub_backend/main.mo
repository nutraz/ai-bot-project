
import Okt "canister:okt";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

persistent actor Icp_hub_backend {
  public func createRepo(name : Text, description : Text) : async Text {
    "Repo created: " # name
  };

  public func getRepo(id : Nat) : async ?Text {
    null
  };

  public func rewardContributor(principal : Principal, amount : Nat) : async Text {
    let result = await Okt.mint(principal, amount);
    Debug.print("Rewarded " # Principal.toText(principal) # " with " # Nat.toText(result) # " OKT");
    "Rewarded " # Principal.toText(principal) # " with " # Nat.toText(result) # " OKT"
  };
};
