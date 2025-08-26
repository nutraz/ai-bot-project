// Motoko canister stub for search CRUD (Create, Read, Update, Delete) operations
module {
  public type SearchResult = {
    id: Nat;
    title: Text;
    snippet: Text;
    type_: Text;
  };
  stable var results: [SearchResult] = [];

  public func createResult(title: Text, snippet: Text, type_: Text): async SearchResult {
    let id = Nat64.toNat(Int.abs(Time.now()));
    let result = { id; title; snippet; type_ };
    results := Array.append(results, [result]);
    return result;
  };

  public func getResults(): async [SearchResult] {
    return results;
  };

  public func updateResult(id: Nat, title: Text, snippet: Text, type_: Text): async ?SearchResult {
    var found = false;
    results := Array.map<SearchResult, SearchResult>(results, func(r) {
      if (r.id == id) {
        found := true;
        { id; title; snippet; type_ }
      } else r
    });
    if (found) return ?{ id; title; snippet; type_ } else return null;
  };

  public func deleteResult(id: Nat): async Bool {
    let before = results.size();
    results := Array.filter<SearchResult>(results, func(r) { r.id != id });
    return results.size() < before;
  };
}
