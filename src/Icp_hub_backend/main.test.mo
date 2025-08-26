import Assert "mo:base/Assert";
import Icp_hub_backend "canister:Icp_hub_backend";

actor class {
    public shared func testCreateRepo() : async () {
        let result = await Icp_hub_backend.createRepo("test-repo", "A test repository");
        Assert.equal(result, "Repo created: test-repo");
    };
}
