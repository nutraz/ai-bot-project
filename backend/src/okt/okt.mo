
import Array "mo:base/Array";
import Principal "mo:base/Principal";

persistent actor OKT {
  // Token metadata

  transient let name = "OpenKey Token";
  transient let symbol = "OKT";
  transient let decimals = 8;
  transient let totalSupplyValue : Nat = 100_000_000 * (10 ** decimals);

  // Owner (replace with your II principal)
  transient let owner : Principal = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");

  stable var balances : [(Principal, Nat)] = [(owner, totalSupplyValue)];

  // Get balance of an account
  public query func balanceOf(account : Principal) : async Nat {
    var sum : Nat = 0;
    for ((principal, amount) in Array.vals(balances)) {
      if (Principal.equal(principal, account)) {
        sum += amount;
      };
    };
    sum;
  };

  // Get total supply
  public query func totalSupply() : async Nat {
    totalSupplyValue;
  };

  // Get token name
  public query func getName() : async Text {
    name;
  };

  // Get symbol
  public query func getSymbol() : async Text {
    symbol;
  };

  // Mint tokens (owner only)
  public shared(msg) func mint(to : Principal, amount : Nat) : async Nat {
    assert (msg.caller == owner);
    let value = amount * (10 ** decimals);
    balances := Array.append<(Principal, Nat)>(balances, [(to, value)]);
    value;
  };
}
