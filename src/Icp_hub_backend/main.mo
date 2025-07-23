import Types "./types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";
import Utils "./utils";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Int "mo:base/Int";
import Float "mo:base/Float";
import Timer "mo:base/Timer";
import Prim "mo:prim";
import CollaboratorManager "./collaborator";
import Governance "./governance";
import Auth "./auth";
import GitOps "./git_operations";

actor ICPHub {
    type User = Types.User;
    type Repository = Types.Repository;
    type FileEntry = Types.FileEntry;
    type Result<T, E> = Types.Result<T, E>;
    type Error = Types.Error;
    type CreateRepositoryRequest = Types.CreateRepositoryRequest;
    type UploadFileRequest = Types.UploadFileRequest;
    type RegisterUserRequest = Types.RegisterUserRequest;
    type UpdateRepositoryRequest = Types.UpdateRepositoryRequest;
    type MemoryStats = Types.MemoryStats;
    type RepositoryListResponse = Types.RepositoryListResponse;
    type FileListResponse = Types.FileListResponse;
    type PaginationParams = Types.PaginationParams;

//collaborator types
    type AddCollaboratorRequest = CollaboratorManager.AddCollaboratorRequest;
    type UpdateCollaboratorRequest = CollaboratorManager.UpdateCollaboratorRequest;
    type RemoveCollaboratorRequest = CollaboratorManager.RemoveCollaboratorRequest;
    type CollaboratorListRequest = CollaboratorManager.CollaboratorListRequest;
    type CollaboratorInfo = CollaboratorManager.CollaboratorInfo;
    type CollaboratorListResponse = CollaboratorManager.CollaboratorListResponse;

//governance types
    type ProposalId = Governance.ProposalId;
    type VotingPower = Governance.VotingPower;
    type TokenAmount = Governance.TokenAmount;
    type ProposalStatus = Governance.ProposalStatus;
    type ProposalType = Governance.ProposalType;
    type Vote = Governance.Vote;
    type VoteRecord = Governance.VoteRecord;
    type Proposal = Governance.Proposal;
    type GovernanceConfig = Governance.GovernanceConfig;
    type GovernanceToken = Governance.GovernanceToken;
    type VotingStats = Governance.VotingStats;
    type CreateProposalRequest = Governance.CreateProposalRequest;
    type CastVoteRequest = Governance.CastVoteRequest;
    type ProposalListRequest = Governance.ProposalListRequest;
    type ProposalListResponse = Governance.ProposalListResponse;
    type AddDiscussionPostRequest = Governance.AddDiscussionPostRequest;
    type DiscussionPost = Governance.DiscussionPost;

//auth types
    type SessionToken = Auth.SessionToken;
    type ApiKey = Auth.ApiKey;
    type ApiPermission = Auth.ApiPermission;
    type AuthMethod = Auth.AuthMethod;
    type AuthContext = Auth.AuthContext;
    type Permission = Auth.Permission;

    //git opertations types
    type CommitRequest = GitOps.CommitRequest;
    type FileAction = GitOps.FileAction;
    type DiffResult = GitOps.DiffResult;
    type MergeRequest = GitOps.MergeRequest;
    type MergeConflict = GitOps.MergeConflict;
    type MergeResult = GitOps.MergeResult;
    type BranchRequest = GitOps.BranchRequest;
    type TagRequest = GitOps.TagRequest;
    type Tag = GitOps.Tag;
    type GitLog = GitOps.GitLog;
    type CloneRequest = GitOps.CloneRequest;
    type GitStatus = GitOps.GitStatus;

    type ChainType = Types.ChainType;
    type DeploymentConfig = Types.DeploymentConfig;
    type ChainConfig = Types.ChainConfig;    

    type SearchScope = {
    #All;
    #Repositories;
    #Users;
    #Files;
    #Code;
};

type SearchSortBy = {
    #Relevance;
    #Name;
    #CreatedAt;
    #UpdatedAt;
    #Stars;
    #Size;
};

type SearchFilter = {
    owner: ?Principal;
    language: ?Text;
    isPrivate: ?Bool;
    hasFiles: ?Bool;
    minSize: ?Nat;
    maxSize: ?Nat;
    createdAfter: ?Int;
    createdBefore: ?Int;
};

type SearchRequest = {
    searchQuery : Text;
    scope: SearchScope;
    filters: ?SearchFilter;
    sortBy: ?SearchSortBy;
    pagination: ?Types.PaginationParams;
};

type RepositorySearchResult = {
    repository: Types.Repository;
    score: Float;
    matchedFields: [Text];
};

type UserSearchResult = {
    user: Types.User;
    score: Float;
    matchedFields: [Text];
};

type FileSearchResult = {
    file: Types.FileEntry;
    repository: Types.Repository;
    score: Float;
    matchedFields: [Text];
    snippets: [Text];
};

type SearchResults = {
    repositories: [RepositorySearchResult];
    users: [UserSearchResult];
    files: [FileSearchResult];
    totalCount: Nat;
    hasMore: Bool;
    searchQuery: Text;
    scope: SearchScope;
};

type CombinedSearchResults = {
    repoResults: [RepositorySearchResult];
    userResults: [UserSearchResult];
    fileResults: [FileSearchResult];
};

type UpdateUserProfileRequest = {
        displayName: ?Text;
        bio: ?Text;
        avatar: ?Text;
        location: ?Text;
        website: ?Text;
    };

type SerializableRepository = Types.SerializableRepository;
type SerializableSearchResults = Types.SerializableSearchResults;
type DeploymentRecord = Types.DeploymentRecord;


    // Stable variables for upgrade persistence
    private stable var usernamesEntries: [(Text, Principal)] = [];
    private stable var usersEntries: [(Principal, User)] = [];
    private stable var repositoriesEntries: [(Text, SerializableRepository)] = [];
    private stable var nextRepositoryId: Nat = 1;

    // In-memory storage
    private var users = HashMap.HashMap<Principal, User>(10, Principal.equal, Principal.hash);
    private var repositories = HashMap.HashMap<Text, Repository>(10, Text.equal, Text.hash);
    private var usernames = HashMap.HashMap<Text, Principal>(10, Text.equal, Text.hash);

    //governance state
    //private stable var governanceTimerId: ?Nat = null;//need to implement

    private stable var governanceStateData: ?{
        proposals: [(ProposalId, Proposal)];
        governanceTokens: [(Principal, GovernanceToken)];
        config: GovernanceConfig;
        treasury: TokenAmount;
        nextProposalId: ProposalId;
    } = null;

    private var governanceState = Governance.GovernanceState();

    private stable var sessionManagerData: ?[(Text, SessionToken)] = null;
    private stable var apiKeyManagerData: ?{
        apiKeys: [(Text, ApiKey)];
        keysByPrincipal: [(Principal, [Text])];
    } = null;

    private var sessionManager = Auth.SessionManager();
    private var apiKeyManager = Auth.ApiKeyManager();

    private var deployments = HashMap.HashMap<Text, [DeploymentRecord]>(10, Text.equal, Text.hash);

    // System functions for upgrades
    system func preupgrade() {
        usersEntries := Iter.toArray(users.entries());
        repositoriesEntries := Array.map<(Text, Repository),
        (Text, SerializableRepository)>(
            Iter.toArray(repositories.entries()),
            func((id, repo)) {
                (id, Types.repositoryToSerializable(repo))
            }
        );
        usernamesEntries := Iter.toArray(usernames.entries());
        governanceStateData := ?governanceState.preupgrade();

        sessionManagerData := ?sessionManager.getAllSessions();
        apiKeyManagerData := ?apiKeyManager.getUpgradeData();
    };

    system func postupgrade() {
    users := HashMap.fromIter<Principal, User>(usersEntries.vals(),
            usersEntries.size(), 
            Principal.equal, 
            Principal.hash);
    
    repositories := HashMap.HashMap<Text, Repository>(repositoriesEntries.size(), 
                    Text.equal, 
                    Text.hash);
    for ((id, serRepo) in repositoriesEntries.vals()) {
        repositories.put(id, Types.serializableToRepository(serRepo));
    };
    
    usernames := HashMap.fromIter<Text, Principal>(usernamesEntries.vals(), 
                usernamesEntries.size(),
                 Text.equal, 
                 Text.hash);
    usernamesEntries := []; 

    usersEntries := [];
    repositoriesEntries := [];
    switch(governanceStateData) {
      case null { };
      case(?data) {
        governanceState.postupgrade(data);
        governanceStateData := null;
       };
    };
    switch (sessionManagerData) {
        case (?data) {
            sessionManager.restoreSessions(data);
            sessionManagerData := null;
        };
        case null {};
    };
    switch (apiKeyManagerData) {
        case (?data) {
            apiKeyManager.restoreData(data);
            apiKeyManagerData := null;
        };
        case null {};
      };
    };

    // Helper functions
    private func generateRepositoryId(): Text {
        let id = "repo_" # Nat.toText(nextRepositoryId);
        nextRepositoryId += 1;
        id;
    };

    private func intToNat(i: Int): Nat {
    if (i < 0) { Prim.trap("Cannot convert negative Int to Nat") };
    
    // Manually construct the Nat value to bypass the compiler issue.
    var n : Nat = 0;
    var counter : Int = 0;
    while (counter < i) {
        n += 1;
        counter += 1;
    };
    return n;
    };
    
    private func canWrite(caller: Principal, repositoryId: Text): Bool {
        switch (repositories.get(repositoryId)) {
            case null false;
            case (?repo) {
                if (repo.owner == caller) return true;
                // Check collaborators with write permission
                switch (repo.collaborators.get(caller)) {
                    case null false;
                    case (?collab) {
                        switch (collab.permission) {
                            case (#Write or #Admin) true;
                            case _ false;
                        };
                    };
                };
            };
        };
    };

    // Helper function to calculate search relevance score
    private func calculateRelevanceScore(searchQuery: Text, text: Text, fieldWeight: Float): Float {
        let lowerQuery = Utils.toLower(searchQuery);
        let lowerText = Utils.toLower(text);
        
        if (lowerText == lowerQuery) {
            return 100.0 * fieldWeight; // Exact match
        };
        
        if (Text.startsWith(lowerText, #text lowerQuery)) {
            return 80.0 * fieldWeight; // Starts with query
        };
        
        if (Utils.containsSubstring(lowerText, lowerQuery)) {
            return 60.0 * fieldWeight; // Contains query
        };
        
        // Check for partial word matches
        let queryWords = Text.split(lowerQuery, #char ' ');
        var partialScore: Float = 0.0;
        
        for (word in queryWords) {
            if (Utils.containsSubstring(lowerText, word)) {
                partialScore += 20.0;
            };
        };
        
        return partialScore * fieldWeight;
    };

    // Search repositories
private func searchRepositories(searchQuery: Text,
                                 caller: Principal,
                                 filters: ?SearchFilter): [RepositorySearchResult] {
    let results = Buffer.Buffer<RepositorySearchResult>(0);

    label repo_loop for ((_, repo) in repositories.entries()) {
        if (not Utils.canReadRepository(caller, repo)) {
            continue repo_loop;
        };

        // Filtering Logic
        let passesFilter = switch (filters) {
            case null true;
            case (?f) {
                let ownerMatch = switch (f.owner) {
                    case null true;
                    case (?owner) repo.owner == owner;
                };

                let languageMatch = switch (f.language) {
                    case null true;
                    case (?lang) {
                        switch (repo.language) {
                            case null false;
                            case (?repoLang) Utils.toLower(repoLang) == Utils.toLower(lang);
                        };
                    };
                };

                let privateMatch = switch (f.isPrivate) {
                    case null true;
                    case (?isPrivate) repo.isPrivate == isPrivate;
                };

                let sizeMatch = switch (f.minSize, f.maxSize) {
                    case (null, null) true;
                    case (?minSize, null) repo.size >= minSize;
                    case (null, ?maxSize) repo.size <= maxSize;
                    case (?minSize, ?maxSize) repo.size >= minSize and repo.size <= maxSize;
                };

                let dateMatch = switch (f.createdAfter, f.createdBefore) {
                    case (null, null) true;
                    case (?after, null) repo.createdAt >= after;
                    case (null, ?before) repo.createdAt <= before;
                    case (?after, ?before) repo.createdAt >= after and repo.createdAt <= before;
                };

                ownerMatch and languageMatch and privateMatch and sizeMatch and dateMatch;
            };
        };

        if (not passesFilter) {
            continue repo_loop;
        };

        // Relevance Scoring
        let totalScore = do {
            var score = 0.0;
            let matchedFields = Buffer.Buffer<Text>(0);

            let nameScore = calculateRelevanceScore(searchQuery, repo.name, 3.0);
            if (nameScore > 0) {
                score += nameScore;
                matchedFields.add("name");
            };

            switch (repo.description) {
                case null {};
                case (?desc) {
                    let descScore = calculateRelevanceScore(searchQuery, desc, 2.0);
                    if (descScore > 0) {
                        score += descScore;
                        matchedFields.add("description");
                    };
                };
            };

            for (topic in repo.settings.topics.vals()) {
                let topicScore = calculateRelevanceScore(searchQuery, topic, 1.0);
                if (topicScore > 0) {
                    score += topicScore;
                    if (not Utils.arrayContains(Buffer.toArray(matchedFields), "topics", Text.equal)) {
                        matchedFields.add("topics");
                    };
                };
            };

            // Popularity Boost
            let popularityBoost = Float.fromInt(repo.stars) * 0.1 + Float.fromInt(repo.forks) * 0.05;
            score += popularityBoost;

            // Result Aggregation
            if (score > 0) {
                results.add({
                    repository = repo;
                    score = score;
                    matchedFields = Buffer.toArray(matchedFields);
                });
            };
            score;
        };
    };

    // Sorting
    let resultArray = Buffer.toArray(results);
    let sortedResults = Array.sort<RepositorySearchResult>(resultArray, func(a, b) {
        if (a.score < b.score) { #greater }
        else if (a.score > b.score) { #less }
        else { #equal }
    });
    sortedResults;
};

// Search files and code
private func searchFiles(searchQuery: Text, caller: Principal, codeOnly: Bool): [FileSearchResult] {
    let results = Buffer.Buffer<FileSearchResult>(0);

    label repo_loop for ((_, repo) in repositories.entries()) {
        // Authorization Check
        if (not Utils.canReadRepository(caller, repo)) {
            continue repo_loop;
        };

        label file_loop for ((path, file) in repo.files.entries()) {
            // Code-Only Filter
            if (codeOnly and not Utils.isCodeFile(file.path)) {
                continue file_loop;
            };

            var totalScore = 0.0;
            let matchedFields = Buffer.Buffer<Text>(0);
            let snippets = Buffer.Buffer<Text>(0);

            // Score File Path
            let pathScore = calculateRelevanceScore(searchQuery, file.path, 2.0);
            if (pathScore > 0) {
                totalScore += pathScore;
                matchedFields.add("path");
            };

            // Score File Content
            let contentWeight = if (codeOnly) 3.0 else 1.5;
            
            switch (Text.decodeUtf8(file.content)) {
                case null {
                     /* File is not text-based (e.g., an image), so we can't search its content. */ 
                     };
                case (?contentText) {
                    let contentScore = calculateRelevanceScore(searchQuery, contentText, contentWeight);
                    if (contentScore > 0) {
                        totalScore += contentScore;
                        matchedFields.add("content");

                        // Create a Snippet
                        let snippet = if (Text.size(contentText) > 150) {
                            Utils.textTake(contentText, 150) # "...";
                        } else {
                            contentText;
                        };
                        snippets.add(snippet);
                    };
                };
            };

            // Result Aggregation
            if (totalScore > 0) {
                results.add({
                    file = file;
                    repository = repo;
                    score = totalScore;
                    matchedFields = Buffer.toArray(matchedFields);
                    snippets = Buffer.toArray(snippets);
                });
            };
        };
    };

    // Sorting
    let sortedResults = Buffer.toArray(results);
    return Array.sort<FileSearchResult>(sortedResults, func(a, b) {
        if (a.score < b.score) { #greater }
        else if (a.score > b.score) { #less }
        else { #equal }
    });
};

    // Main search function api
private func searchUsers(searchQuery: Text, 
                            caller: Principal): [UserSearchResult] {
    let results = Buffer.Buffer<UserSearchResult>(0);
    
    for ((_, user) in users.entries()) {
        var totalScore: Float = 0.0;
        let matchedFields = Buffer.Buffer<Text>(0);
        
        let usernameScore = calculateRelevanceScore(searchQuery, user.username, 2.5);
        if (usernameScore > 0) {
            totalScore += usernameScore;
            matchedFields.add("username");
        };
        
        switch (user.profile.displayName) {
            case null {};
            case (?displayName) {
                let displayScore = calculateRelevanceScore(searchQuery, displayName, 1.5);
                if (displayScore > 0) {
                    totalScore += displayScore;
                    matchedFields.add("displayName");
                };
            };
        };

        if (totalScore > 0) {
            results.add({
                user = user;
                score = totalScore;
                matchedFields = Buffer.toArray(matchedFields);
            });
        };
    };

    let sortedResults = Buffer.toArray(results);
    let sorted = Array.sort<UserSearchResult>(sortedResults, func(a, b) {
        if (a.score < b.score) { #greater }
        else if (a.score > b.score) { #less }
        else { #equal }
    });
    return sorted;
};

// Main search API
public shared({ caller }) func search(request: SearchRequest): 
                                        async Result<SerializableSearchResults, Error> {
    let principal = caller;
    
    // Validate search query
    let searchQuery = Text.trim(request.searchQuery, #char ' ');
    if (Text.size(searchQuery) == 0) {
        return #Err(#BadRequest("Search query cannot be empty"));
    };

    if (Text.size(searchQuery) > 100) {
        return #Err(#BadRequest("Search query too long"));
    };
    
    let page = switch (request.pagination) {
        case null { 0 };
        case (?p) { p.page };
    };
    let limit = switch (request.pagination) {
        case null { 10 };
        case (?p) { Nat.min(p.limit, 100) };
    };

    let searchResults: CombinedSearchResults = switch (request.scope) {
        case (#All) {
            {
                repoResults = searchRepositories(searchQuery, principal, request.filters);
                userResults = searchUsers(searchQuery, principal);
                fileResults = searchFiles(searchQuery, principal, false);
            }
        };
        case (#Repositories) {
            {
                repoResults = searchRepositories(searchQuery, principal, request.filters);
                userResults = [];
                fileResults = [];
            }
        };
        case (#Users) {
            {
                repoResults = [];
                userResults = searchUsers(searchQuery, principal);
                fileResults = [];
            }
        };
        case (#Files) {
            {
                repoResults = [];
                userResults = [];
                fileResults = searchFiles(searchQuery, principal, false);
            }
        };
        case (#Code) {
            {
                repoResults = [];
                userResults = [];
                fileResults = searchFiles(searchQuery, principal, true);
            }
        };
    };

    // Sorting and Pagination Logic
    
    // Apply sorting if specified (only for repositories)
    let sortedRepos = switch (request.sortBy) {
        case null { searchResults.repoResults }; 
        case (?#Relevance) { searchResults.repoResults };
        case (?sortBy) {
            Array.sort<RepositorySearchResult>(searchResults.repoResults, func(a, b) {
                switch (sortBy) {
                    case (#Name) { Text.compare(a.repository.name, b.repository.name) };
                    case (#CreatedAt) { Int.compare(b.repository.createdAt, a.repository.createdAt) };
                    case (#UpdatedAt) { Int.compare(b.repository.updatedAt, a.repository.updatedAt) };
                    case (#Stars) { Nat.compare(b.repository.stars, a.repository.stars) };
                    case (#Size) { Nat.compare(b.repository.size, a.repository.size) };
                    case (#Relevance) { Float.compare(b.score, a.score) };
                }
            })
        };
};

    let totalCount = sortedRepos.size() + searchResults.userResults.size() + searchResults.fileResults.size();
    
    let paginatedRepos = Utils.paginateArray<RepositorySearchResult>(sortedRepos, page, limit);
    let paginatedUsers = Utils.paginateArray<UserSearchResult>(searchResults.userResults, page, limit);
    let paginatedFiles = Utils.paginateArray<FileSearchResult>(searchResults.fileResults, page, limit);
    
    let hasMore = (page + 1) * limit < totalCount;

    let finalResult: SearchResults = {
        repositories = paginatedRepos;
        users = paginatedUsers;
        files = paginatedFiles;
        totalCount = totalCount;
        hasMore = hasMore;
        searchQuery = searchQuery;
        scope = request.scope;
    };

    return #Ok(Types.searchResultsToSerializable(finalResult));
};

// Advanced search with auto-complete suggestions
public shared query({ caller}) func searchSuggestions(
    searchQuery: Text,
    maxSuggestions: ?Nat,
): async Result<[Text], Error> {
    
    if (Text.size(searchQuery) < 2) {
        return #Ok([]);
    };
    
    let limit = switch (maxSuggestions) {
        case null 10;
        case (?max) Nat.min(max, 20);
    };
    
    let uniqueSuggestions = HashMap.HashMap<Text, ()>(limit, Text.equal, Text.hash);
    let lowerQuery = Utils.toLower(searchQuery);
    
    // Collect repository names
    label repoLoop for ((_, repo) in repositories.entries()) {
        if (uniqueSuggestions.size() == limit) { break repoLoop }; // Stop searching if we have enough
        
        if (Utils.canReadRepository(caller, repo)) {
            let lowerName = Utils.toLower(repo.name);
            if (Text.startsWith(lowerName, #text lowerQuery)) {
                uniqueSuggestions.put(repo.name, ());
            };
        };
    };
    
    // Collect usernames
    label userLoop for ((_, user) in users.entries()) {
        if (uniqueSuggestions.size() == limit) { break userLoop }; // Stop searching if we have enough
        
        let lowerUsername = Utils.toLower(user.username);
        if (Text.startsWith(lowerUsername, #text lowerQuery)) {
            uniqueSuggestions.put(user.username, ());
        };
    };
    
    // Convert the unique keys from the HashMap to an array.
    let suggestions = Iter.toArray(uniqueSuggestions.keys());
    
    return #Ok(suggestions);
};

    // Search within a specific repository
   public shared({ caller }) func searchRepository(
    repositoryId: Text,
    searchQuery: Text,
    params: ?PaginationParams
): async Result<FileListResponse, Error> {
    
    switch (repositories.get(repositoryId)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) {

            // Standardized Authorization

            if (not Utils.canReadRepository(caller, repo)) {
                return #Err(#Forbidden("Access denied"));
            };
            
            let lowerQuery = Utils.toLower(searchQuery);
            
            // Optimized Search and Pagination

            let page = switch (params) { case null 0; case (?p) p.page; };
            let limit = switch (params) { case null 20; case (?p) p.limit; };
            let startIndex = page * limit;
            let endIndex = startIndex + limit;

            var totalMatches: Nat = 0;
            let paginatedFiles = Buffer.Buffer<FileEntry>(limit);

            // CHANGE: Use HashMap.entries() instead of Array.vals()
            for ((path, file) in repo.files.entries()) {
                // Check if the file's path or content matches the query
                let isMatch = do {
                    if (Utils.containsSubstring(Utils.toLower(file.path), lowerQuery)) {
                        true
                    } else {
                        switch (Text.decodeUtf8(file.content)) {
                            case null false;
                            case (?content) {
                                Utils.containsSubstring(Utils.toLower(content), lowerQuery);
                            };
                        }
                    }
                };
                
                if (isMatch) {
                    // If it's a match
                    if (totalMatches >= startIndex and totalMatches < endIndex) {
                        paginatedFiles.add(file);
                    };
                    totalMatches += 1;
                };
            };
            
            let response: FileListResponse = {
                files = Buffer.toArray(paginatedFiles);
                totalCount = totalMatches;
                path = searchQuery; // Use the original query for the response path
            };
            
            return #Ok(response);
        };
    };
};

    // User Management APIs
public shared({ caller }) func registerUser(
    request: RegisterUserRequest): async Result<User, Error> {
    // if Principal is already registered
    if (users.get(caller) != null) {
        return #Err(#Conflict("This Principal is already registered."));
    };

    // Validate the username format
    if (not Utils.isValidUsername(request.username)) {
        return #Err(#BadRequest("Invalid username format. Use 3-20 alphanumeric characters, dashes, or underscores."));
    };

    // Check if the username is already taken
    if (usernames.get(request.username) != null) {
        return #Err(#Conflict("Username is already taken."));
    };
    
    // 4. Validate email format if provided
    switch(request.email) {
        case null {}; // No email provided, that's fine.
        case (?email) {
            if (not Utils.isValidEmail(email)) {
                return #Err(#BadRequest("Invalid email format."));
            };
        };
    };

    // Create and store the new user
    let now = Time.now();
    let newUser: User = {
        principal = caller;
        username = request.username;
        email = request.email;
        profile = request.profile;
        repositories = [];
        createdAt = now;
        updatedAt = now;
    };

    users.put(caller, newUser);
    usernames.put(newUser.username, newUser.principal); // Add to username index

    return #Ok(newUser);
};

// get user profile
public query func getUser(principal: Principal): async Result<User, Error> {
    switch (users.get(principal)) {
        case null #Err(#NotFound("User not found"));
        case (?user) #Ok(user);
    };
};

// Update user profile
public shared({ caller }) func updateUser(
    request: UpdateUserProfileRequest): async Result<User, Error> {
    
    switch (users.get(caller)) {
        case null { return #Err(#NotFound("User not found, please register first.")); };
        case (?user) {
            
            if (switch (request.displayName) { case null false; case (?d) Text.size(d) > 50; }) {
                return #Err(#BadRequest("Display name cannot exceed 50 characters."));
            };
            if (switch (request.bio) { case null false; case (?b) Text.size(b) > 500; }) {
                return #Err(#BadRequest("Bio cannot exceed 500 characters."));
            };

            let newProfile: Types.UserProfile = {
                displayName = switch (request.displayName) {
                    case null { user.profile.displayName }; 
                    case (?newName) { ?newName };         
                };
                bio = switch (request.bio) {
                    case null { user.profile.bio };
                    case (?newBio) { ?newBio };
                };
                avatar = switch (request.avatar) {
                    case null { user.profile.avatar };
                    case (?newAvatar) { ?newAvatar };
                };
                location = switch (request.location) {
                    case null { user.profile.location };
                    case (?newLocation) { ?newLocation };
                };
                website = switch (request.website) {
                    case null { user.profile.website };
                    case (?newWebsite) { ?newWebsite };
            };
                socialLinks = user.profile.socialLinks;
            };

            let updatedUser: User = {
                user with
                profile = newProfile;
                updatedAt = Time.now();
            };
            
            users.put(caller, updatedUser);
            return #Ok(updatedUser);
        };
    };
};

//Repository Management APIs
public shared({ caller }) func createRepository(request: CreateRepositoryRequest): 
                                                async Result<SerializableRepository, Error> {
    
    // if user exists and get user object
    let user = switch (users.get(caller)) {
        case null { return #Err(#Unauthorized("User not registered")); };
        case (?user) { user };
    };

    // Input Validation
    if (not Utils.isValidRepositoryName(request.name)) {
        return #Err(#BadRequest(
            "Invalid repository name. Use 1-100 characters without leading/trailing special characters."
            ));
    };

    if(switch(request.description) { case null false; case (?d) Text.size(d) > 500; }) {
        return #Err(#BadRequest("Description cannot exceed 500 characters."));
    };

    if (request.targetChains.size() == 0) {
            return #Err(#BadRequest("At least one target chain must be specified"));
        };

    let chainConfigs = Buffer.Buffer<(Types.BlockchainType, Types.ChainConfig)>(request.targetChains.size());
      for (chain in request.targetChains.vals()) {
      chainConfigs.add((chain, Utils.getDefaultChainConfig(chain)));
    };

    let now = Time.now();
    let repositoryId = generateRepositoryId();

    let targetChains = if (request.targetChains.size() == 0) {
        [#ICP];
    } else {
        request.targetChains;
    };

    let chainConfigsBuffer = Buffer.Buffer<(Types.BlockchainType, Types.ChainConfig)>(targetChains.size());
    for (chain in targetChains.vals()) {
        chainConfigsBuffer.add((chain, Utils.getDefaultChainConfig(chain)));
    };
    
    let defaultSettings: Types.RepositorySettings = {
        defaultBranch = "main";
        allowForking = true;
        allowIssues = true;
        allowWiki = true;
        allowProjects = true;
        visibility = if (request.isPrivate) #Private else #Public;
        license = request.license;
        topics = [];
    };

    let mainBranch: Types.Branch = {
        name = "main";
        commitId = "initial_commit";
        isDefault = true;
        createdAt = now;
        createdBy = caller;
    };

    let repository: Repository = {
        id = repositoryId;
        name = request.name;
        description = request.description;
        owner = caller;
        collaborators = HashMap.HashMap<Principal,
        Types.Collaborator>(0, Principal.equal, Principal.hash);
        isPrivate = request.isPrivate;
        settings = defaultSettings;
        createdAt = now;
        updatedAt = now;
        files = HashMap.HashMap<Text, FileEntry>(10, Text.equal, Text.hash); 
        commits = [];
        branches = [mainBranch];
        stars = 0;
        forks = 0;
        language = null;
        size = 0;
        supportedChains = targetChains;
        deploymentTargets = [];
        chainConfigs = Buffer.toArray(chainConfigsBuffer);
        lastDeployment = null;
    };

    // Update State
    repositories.put(repositoryId, repository);
    
    // Update user's repository list using the user object
    let updatedRepos = Array.append<Text>(user.repositories, [repositoryId]);
    
    // Use cleaner 'with' syntax for the update
    let updatedUser: User = { 
        user with
        repositories = updatedRepos;
        updatedAt = now;
    };
    users.put(caller, updatedUser);

    return #Ok(Types.repositoryToSerializable(repository));
};

public shared query({ caller }) func getRepository(id: Text): async Result<SerializableRepository, Error> {
    switch (repositories.get(id)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) {
            if (Utils.canReadRepository(caller, repo)) {
                return #Ok(Types.repositoryToSerializable(repo));
            } else {
                return #Err(#Forbidden("Access denied"));
            };
        };
    };
};

public shared query({ caller}) func listRepositories(
    owner: Principal,
    params: ?PaginationParams
): async Result<RepositoryListResponse, Error> {
    
    // Get the user object for the specified owner
    let user = switch (users.get(owner)) {
        case null { return #Err(#NotFound("User not found")); };
        case (?user) { user };
    };

    let page = switch (params) { case null 0; case (?p) p.page; };
    let limit = switch (params) { case null 10; case (?p) p.limit; };
    let startIndex = page * limit;
    
    var visibleReposCount: Nat = 0;
    let paginatedRepos = Buffer.Buffer<Repository>(limit);

    // Optimized Loop
    for (repoId in user.repositories.vals()) {
        switch (repositories.get(repoId)) {
            case null {};
            case (?repo) {

                // Auth Check

                if (Utils.canReadRepository(caller, repo)) {

                    // Pagination

                    if (visibleReposCount >= startIndex and paginatedRepos.size() < limit) {
                        paginatedRepos.add(repo);
                    };
                    visibleReposCount += 1;
                };
            };
        };
    };

    let response: RepositoryListResponse = {
        repositories = Array.map<Repository, SerializableRepository>(
            Buffer.toArray(paginatedRepos),
            func(repo) { Types.repositoryToSerializable(repo) }
        );
        totalCount = visibleReposCount;
        hasMore = (startIndex + paginatedRepos.size()) < visibleReposCount;
    };

    return #Ok(response);
};

public shared({ caller }) func deleteRepository(id: Text): async Result<Bool, Error> {
    switch (repositories.get(id)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) {
            // Authorization
            if (repo.owner != caller) {
                return #Err(#Forbidden("Only the repository owner can delete it."));
            };

            // Delete the repository from the main map.
            repositories.delete(id);
            
            // Update the owner's list of repositories.
            switch (users.get(repo.owner)) {
                case null {
                    // If the user is not found, we can't update their repository list.
                    // This could happen if the user was deleted after the repository was created.
                    // This case should ideally not happen if data is consistent,
                    // The repo is deleted, but we can't update the user's repositories list.

                };
                case (?user) {
                    let updatedRepos = Array.filter<Text>(user.repositories, func(repoId) {
                        repoId != id;
                    });
                    
                    // 'with' keyword for the update.
                    let updatedUser: User = { 
                        user with
                        repositories = updatedRepos;
                        updatedAt = Time.now();
                    };
                    users.put(user.principal, updatedUser);
                };
            };

            return #Ok(true);
        };
    };
};

public shared({ caller }) func updateRepository(
    id: Text,
    request: UpdateRepositoryRequest
): async Result<SerializableRepository, Error> {

    switch (repositories.get(id)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) {

            // Authorization
            if (repo.owner != caller) {
                return #Err(#Forbidden("Only the repository owner can update it."));
            };

            // Input Validation
            if(switch(request.description) { case null false; case (?d) Text.size(d) > 500; }) {
                return #Err(#BadRequest("Description cannot exceed 500 characters."));
            };


            let updatedRepo: Repository = {
                repo with
                description = switch (request.description) {
                    case null repo.description;
                    case (?desc) ?desc;
                };
                settings = switch (request.settings) {
                    case null repo.settings;
                    case (?settings) settings;
                };
                updatedAt = Time.now();
            };

            repositories.put(id, updatedRepo);
            return #Ok(Types.repositoryToSerializable(updatedRepo));
        };
    };
};

//File management APIs
public shared({ caller }) func uploadFile(request: UploadFileRequest): async Result<FileEntry, Error> {
    let fileType = Utils.detectFileType(request.path, request.content);
    let repo = switch (repositories.get(request.repositoryId)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) { repo };
    };
    let contractMetadata = switch (fileType) {
      case (?#SmartContract(info)) {
        let languageVariant = switch (info.language) {
            case "solidity" { #Solidity };
            case "motoko" { #Motoko };
            case "rust" { #Rust };
            case "vyper" { #Vyper };
            case "cairo" { #Cairo };
            case "clarity" { #Clarity };
            case "michelson" { #Michelson };
            case "move" { #Move };
            case "plutus" { #Plutus };
            case "wasm" { #Wasm };
            case _ { #Solidity }; // Default case
        };
         ?GitOps.parseContractMetadata(
            request.path,
            request.content,
            info.chain,
            languageVariant
        );
        };
        case _ null;
    };

    if (not Utils.canWriteRepository(caller, repo)) {
        return #Err(#Forbidden("You do not have write permission for this repository."));
    };

    if (not Utils.isValidPath(request.path)) { return #Err(#BadRequest("Invalid file path.")); };
    if (not Utils.isValidCommitMessage(request.commitMessage)){ 
        return #Err(#BadRequest("Commit message must be between 1 and 1000 characters.")); 
        };
    
    let contentSize = request.content.size();
    if (contentSize > 10_000_000) { return #Err(#BadRequest("File size cannot exceed 10 MB.")); };

    let now = Time.now();
    var oldFileSize : Nat = 0;
    
    // Use HashMap.get to check if file exists
    let fileExists = switch (repo.files.get(request.path)) {
        case (?existingFile) { 
            oldFileSize := existingFile.size;
            true;
        };
        case null { false };
    };
    
    // Create the file entry
    let fileEntry: FileEntry = {
        path = request.path;
        content = request.content;
        size = contentSize;
        hash = Utils.generateFileHash(request.content);
        version = if (fileExists) {

            // Get existing file version and increment

            switch (repo.files.get(request.path)) {
                case (?file) { file.version + 1 };
                case null { 1 };
            }
        } else { 1 }; // New file starts at version 1
        lastModified = now;
        author = caller;
        commitMessage = ?request.commitMessage;
        fileType = fileType;
        contractMetadata = contractMetadata;
        targetChain = switch (fileType) {
            case (?#SmartContract(info)) ?info.chain;
            case _ null;
        };

    };
    
    // Use HashMap.put to add or update the file entry
    // This will automatically handle both adding a new file and updating an existing one.
    repo.files.put(request.path, fileEntry);

    // Update repository size
    let newSizeAsInt : Int = repo.size - oldFileSize + contentSize;
    let newSize = if (newSizeAsInt < 0) 0 else intToNat(newSizeAsInt);

    let updatedRepo: Repository = {
        repo with
        files = repo.files; // Include updated files
        updatedAt = now;
        size = newSize;
    };

    repositories.put(request.repositoryId, updatedRepo);
    return #Ok(fileEntry);
};

public shared query({ caller }) func getFile(repositoryId: Text, path: Text): async Result<FileEntry, Error> {
    switch (repositories.get(repositoryId)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) {
            if (not Utils.canReadRepository(caller, repo)) {
                return #Err(#Forbidden("Access denied"));
            };

            // direct HashMap lookup instead of Array.find
            // This is more efficient for large repositories.
            switch (repo.files.get(path)) {
                case null { return #Err(#NotFound("File not found")); };
                case (?file) { return #Ok(file); };
            };
        };
    };
};


// List files
public shared query({ caller }) func listFiles(
    repositoryId: Text,
    path: ?Text
): async Result<FileListResponse, Error> {
    
    switch (repositories.get(repositoryId)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) {
            // Caller Access & Authorization
            if (not Utils.canReadRepository(caller, repo)) {
                return #Err(#Forbidden("Access denied"));
            };

            // HashMap Structure
            let searchPath = switch (path) {
                case null "";
                case (?p) p;
            };

            let matchingFiles = Buffer.Buffer<FileEntry>(0);
            for ((filePath, file) in repo.files.entries()) {
                if (Text.startsWith(filePath, #text searchPath)) {
                    matchingFiles.add(file);
                };
            };
            
            let filesArray = Buffer.toArray(matchingFiles);
            let response: FileListResponse = {
                files = filesArray;
                totalCount = filesArray.size();
                path = searchPath;
            };

            return #Ok(response);
        };
    };
};


// Delete file
public shared({ caller }) func deleteFile(repositoryId: Text, path: Text): async Result<Bool, Error> {
    
    let repo = switch (repositories.get(repositoryId)) {
        case null { return #Err(#NotFound("Repository not found")); };
        case (?repo) { repo };
    };

    if (not Utils.canWriteRepository(caller, repo)) {
        return #Err(#Forbidden("You do not have write permission for this repository."));
    };

    // Get the file to find its size before deleting
    let fileToDelete = switch (repo.files.get(path)) {
        case null { return #Err(#NotFound("File not found in repository.")); };
        case (?file) { file };
    };

    let fileSize = fileToDelete.size;

    // Instantly remove the file from the HashMap
    repo.files.delete(path);

    // Correctly recalculate the new repository size
    let newSizeAsInt : Int = repo.size - fileSize;
    let newSize = if (newSizeAsInt < 0) 0 else intToNat(newSizeAsInt);

    let updatedRepo: Repository = {
        repo with
        // files field is already updated by the .delete() method
        updatedAt = Time.now();
        size = newSize;
    };

    repositories.put(repositoryId, updatedRepo);
    return #Ok(true);
};

    // System monitoring
    public query func getMemoryStats(): async MemoryStats {
        {
            totalMemory = 0; // Placeholder - implement actual memory calculation
            usedMemory = 0;
            availableMemory = 0;
            heapSize = 0;
            cycles = 0;
        };
    };

    // Health check
    public query func health(): async Bool {
        true;
    };

    public shared({ caller }) func deployContract(
        repositoryId: Text,
        filePath: Text,
        targetChain: ChainType,
        deployConfig: ?DeploymentConfig
    ): async Result<DeploymentRecord, Error> {
        // Check permissions
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canWriteRepository(caller, repo)) {
                    return #Err(#Forbidden("No deployment permission"));
                };
                
                // Get the contract file
                switch (repo.files.get(filePath)) {
                    case null { #Err(#NotFound("Contract file not found")); };
                    case (?file) {
                        // Verify it's a smart contract
                        switch (file.fileType) {
                            case (?#SmartContract(contractInfo)) {
                                if (contractInfo.chain != targetChain) {
                                    return #Err(#BadRequest("Contract not compatible with target chain"));
                                };
                                
                                // Call chain_fusion module to deploy
                                let deploymentResult = await ChainFusion.deployContract({
                                    chain = targetChain;
                                    bytecode = file.content;
                                    config = deployConfig;
                                    metadata = file.contractMetadata;
                                });
                                
                                switch (deploymentResult) {
                                    case (#Ok(deployment)) {
                                        // Track deployment
                                        addDeploymentRecord(repositoryId, deployment);
                                        #Ok(deployment);
                                    };
                                    case (#Err(e)) { #Err(e); };
                                };
                            };
                            case _ { #Err(#BadRequest("File is not a smart contract")); };
                        };
                    };
                };
            };
        };
    };

    public func autoDeployOnCommit(
        repositoryId: Text,
        commitId: Text,
        changedFiles: [Text]
    ): async () {
        switch (repositories.get(repositoryId)) {
            case null {};
            case (?repo) {
                // Check each changed file
                for (filePath in changedFiles.vals()) {
                    switch (repo.files.get(filePath)) {
                        case null {};
                        case (?file) {
                            switch (file.fileType) {
                                case (?#SmartContract(contractInfo)) {
                                    // Auto-deploy if configured
                                    for (target in repo.deploymentTargets.vals()) {
                                        if (target.chain == contractInfo.chain and target.autoDeploy) {
                                            let _ = await deployContract(
                                                repositoryId,
                                                filePath,
                                                target.chain,
                                                ?target.config
                                            );
                                        };
                                    };
                                };
                                case _ {};
                            };
                        };
                    };
                };
            };
        };
    };

    //Collaborator Management APIs
    public shared({ caller }) func addCollaborator(request: AddCollaboratorRequest): async Result<CollaboratorInfo, Error> {
    return CollaboratorManager.addCollaborator(
        caller,
        request,
        repositories,
        users,
        usernames
    );
};

public shared({ caller }) func removeCollaborator(request: RemoveCollaboratorRequest): async Result<Bool, Error> {
    return CollaboratorManager.removeCollaborator(
        caller,
        request,
        repositories,
        usernames
    );
};

public shared({ caller }) func updateCollaboratorPermission(request: UpdateCollaboratorRequest): async Result<CollaboratorInfo, Error> {
    return CollaboratorManager.updateCollaboratorPermission(
        caller,
        request,
        repositories,
        usernames,
        users
    );
};

public shared({ caller }) func listCollaborators(request: CollaboratorListRequest): async Result<CollaboratorListResponse, Error> {
    return CollaboratorManager.listCollaborators(
        caller,
        request,
        repositories,
        users
    );
};

public shared({ caller }) func initializeGovernanceTokens(amount: TokenAmount): async Result<Bool, Error> {
        // Check if user is registered
        switch (users.get(caller)) {
            case null { return #Err(#Unauthorized("User not registered")); };
            case (?user) {
                governanceState.initializeGovernanceToken(caller, amount);
                return #Ok(true);
            };
        };
    };

    // Get user's voting power
    public query({ caller }) func getVotingPower(user: ?Principal): async VotingPower {
        let targetUser = switch (user) {
            case null { caller };
            case (?p) { p };
        };
        governanceState.getVotingPower(targetUser);
    };

    // Create a new proposal
    public shared({ caller }) func createProposal(request: CreateProposalRequest): async Result<Proposal, Error> {
        return governanceState.createProposal(caller, request, users);
    };

    // Cast a vote on a proposal
    public shared({ caller }) func castVote(request: CastVoteRequest): async Result<Bool, Error> {
        return governanceState.castVote(caller, request);
    };

    // Get a specific proposal
    public query func getProposal(proposalId: ProposalId): async Result<Proposal, Error> {
        switch (governanceState.getProposal(proposalId)) {
            case null { #Err(#NotFound("Proposal not found")); };
            case (?proposal) { #Ok(proposal); };
        };
    };

    // List proposals with filters
    public query func listProposals(request: ProposalListRequest): async ProposalListResponse {
        governanceState.listProposals(request);
    };

    // Process proposal results (should be called periodically)
    public shared func processProposalResults(): async [ProposalId] {
        governanceState.processProposalResults();
    };

    // Execute a passed proposal
    public shared({ caller }) func executeProposal(proposalId: ProposalId): async Result<Bool, Error> {
        return governanceState.executeProposal(caller, proposalId, repositories);
    };

    // Add a discussion post to a proposal
    public shared({ caller }) func addDiscussionPost(request: AddDiscussionPostRequest): async Result<DiscussionPost, Error> {
        return governanceState.addDiscussionPost(caller, request);
    };

    // Get voting statistics
    public query func getVotingStats(): async VotingStats {
        governanceState.getVotingStats();
    };

    // Helper function to check if a user can create proposals
    public query({ caller }) func canCreateProposal(): async Bool {
        switch (users.get(caller)) {
            case null { false };
            case (?user) {
                let votingPower = governanceState.getVotingPower(caller);
                votingPower >= 10;
            };
        };
    };

    // Get user's governance token balance
    public query({ caller }) func getGovernanceTokenBalance(user: ?Principal): async Result<{balance: TokenAmount; staked: TokenAmount; votingPower: VotingPower}, Error> {
        let targetUser = switch (user) {
            case null { caller };
            case (?p) { p };
        };
        
        let votingPower = governanceState.getVotingPower(targetUser);

        // returning voting power as both balance and staked
        #Ok({
            balance = votingPower;
            staked = 0;
            votingPower = votingPower;
        });
    };

    // Create a repository update proposal
    public shared({ caller }) func proposeRepositoryUpdate(
        repositoryId: Text,
        newSettings: Types.RepositorySettings,
        title: Text,
        description: Text
    ): async Result<Proposal, Error> {

        // Verify repository exists and caller has permission
        switch (repositories.get(repositoryId)) {
            case null { return #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canWriteRepository(caller, repo)) {
                    return #Err(#Forbidden("You don't have permission to propose updates for this repository"));
                };
                
                let proposalRequest: CreateProposalRequest = {
                    proposalType = #RepositoryUpdate({
                        repositoryId = repositoryId;
                        newSettings = newSettings;
                    });
                    title = title;
                    description = description;
                    votingDuration = null;
                    executionDelay = null; 
                };
                
                return governanceState.createProposal(caller, proposalRequest, users);
            };
        };
    };

    // Create a collaborator promotion proposal
    public shared({ caller }) func proposeCollaboratorPromotion(
        repositoryId: Text,
        collaboratorUsername: Text,
        newPermission: Types.CollaboratorPermission,
        title: Text,
        description: Text
    ): async Result<Proposal, Error> {

        // Verify repository exists
        switch (repositories.get(repositoryId)) {
            case null { return #Err(#NotFound("Repository not found")); };
            case (?repo) {
                // Check if caller can manage collaborators
                if (not CollaboratorManager.canManageCollaborators(caller, repo)) {
                    return #Err(#Forbidden("You don't have permission to propose collaborator changes"));
                };
                
                // Get collaborator principal from username
                let collaboratorPrincipal = switch (usernames.get(collaboratorUsername)) {
                    case null { return #Err(#NotFound("User not found")); };
                    case (?principal) { principal };
                };
                
                // Verify collaborator exists
                switch (repo.collaborators.get(collaboratorPrincipal)) {
                    case null { return #Err(#NotFound("User is not a collaborator")); };
                    case (?collab) {
                        let proposalRequest: CreateProposalRequest = {
                            proposalType = #CollaboratorPromotion({
                                repositoryId = repositoryId;
                                collaborator = collaboratorPrincipal;
                                newPermission = newPermission;
                            });
                            title = title;
                            description = description;
                            votingDuration = null;
                            executionDelay = null;
                        };
                        
                        return governanceState.createProposal(caller, proposalRequest, users);
                    };
                };
            };
        };
    };

    // Timer function to automatically process proposals (call this periodically)
    public shared func processGovernanceTimers(): async () {
        let processedProposals = governanceState.processProposalResults();
        // for logging or notifications
    };

     public shared({ caller }) func login(): async Result<SessionToken, Error> {
        if (Principal.isAnonymous(caller)) {
            return #Err(#Unauthorized("Anonymous principals cannot login"));
        };
        
        // Check if user is registered
        switch (users.get(caller)) {
            case null {
                return #Err(#NotFound("User not registered. Please register first."));
            };
            case (?user) {
                let session = sessionManager.createSession(caller);
                #Ok(session);
            };
        };
    };

    // Logout
    public shared func logout(sessionToken: Text): async Bool {
        sessionManager.deleteSession(sessionToken);
    };

    // Validate session
    public query func validateSession(sessionToken: Text): async Result<Principal, Error> {
        sessionManager.validateSession(sessionToken);
    };

    // Create API key
    public shared({ caller }) func createApiKey(
        name: Text,
        permissions: [ApiPermission],
        expiresInDays: ?Nat
    ): async Result<Text, Error> {
        // Check if user is registered
        switch (users.get(caller)) {
            case null {
                return #Err(#Unauthorized("User not registered"));
            };
            case (?user) {
                let expiresAt = switch (expiresInDays) {
                case null { null };
                case (?days) {

                    // Convert days to nanoseconds and add to current time
                    let durationNanos: Int = days * 24 * 60 * 60 * 1_000_000_000;
                    let expirationTime: Int = Time.now() + durationNanos;
                    ?expirationTime;
                };
            };
                
                return apiKeyManager.createApiKey(caller, name, permissions, expiresAt);
            };
        };
    };

    // List user's API keys
    public query({ caller }) func listApiKeys(): async [ApiKey] {
        apiKeyManager.listApiKeys(caller);
    };

    // Revoke API key
    public shared({ caller }) func revokeApiKey(keyId: Text): async Result<Bool, Error> {
        apiKeyManager.revokeApiKey(caller, keyId);
    };

    // Check permissions
    public query({ caller }) func checkPermission(permission: Permission): async Bool {
        Auth.hasPermission(caller, permission, users);
    };

    // Get auth context
    public query({ caller }) func getAuthContext(): async AuthContext {
        Auth.createAuthContext(caller, #InternetIdentity, users);
    };

    // Protected endpoint example - update existing functions
    public shared({ caller }) func createRepositoryWithAuth(
    request: CreateRepositoryRequest,
    sessionToken: ?Text
): async Result<SerializableRepository, Error> {
    // Validate authentication
    let principal = switch (sessionToken) {
        case null caller;
        case (?token) {
            switch (sessionManager.validateSession(token)) {
                case (#Err(e)) { return #Err(e); };
                case (#Ok(p)) p;
            };
        };
    };
    
    // Check permission
    if (not Auth.hasPermission(principal, #CreateRepository, users)) {
        return #Err(#Forbidden("You don't have permission to create repositories"));
    };
    
    // Call existing createRepository logic and await its result
    return await createRepository(request);
};

    // Cleanup expired sessions (call periodically)
    public shared func cleanupExpiredSessions(): async Nat {
        sessionManager.cleanupExpiredSessions();
    };

    // Rate limiting example
    private var rateLimitStore = HashMap.HashMap<Text, Auth.RateLimitEntry>(100, Text.equal, Text.hash);
    
    public shared({ caller }) func rateLimitedEndpoint(): async Result<Text, Error> {
        let config: Auth.RateLimitConfig = {
            maxRequests = 100;
            windowSeconds = 3600; // 1 hour
            identifier = Principal.toText(caller);
        };
        
        if (not Auth.checkRateLimit(config.identifier, config, rateLimitStore)) {
            return #Err(#BadRequest("Rate limit exceeded"));
        };
        
        #Ok("Success");
    };

    //git operations apis

    public shared({ caller }) func commit(request: CommitRequest): async Result<Types.Commit, Error> {
        GitOps.createCommit(caller, request, repositories);
    };

    // Create a new branch
    public shared({ caller }) func createBranch(request: BranchRequest): async Result<Types.Branch, Error> {
        GitOps.createBranch(caller, request, repositories);
    };

    // Delete a branch
    public shared({ caller }) func deleteBranch(
        repositoryId: Text,
        branchName: Text
    ): async Result<Bool, Error> {
        GitOps.deleteBranch(caller, repositoryId, branchName, repositories);
    };

    // Get commit history
    public query({ caller }) func getCommitHistory(
        repositoryId: Text,
        branch: ?Text,
        limit: ?Nat,
        offset: ?Nat
    ): async Result<GitLog, Error> {
        let actualLimit = switch (limit) {
            case null 50;
            case (?l) Nat.min(l, 100);
        };
        
        let actualOffset = switch (offset) {
            case null 0;
            case (?o) o;
        };
        
        GitOps.getCommitHistory(repositoryId, branch, actualLimit, actualOffset, repositories);
    };

    // Get commit diff
    public query({ caller }) func getCommitDiff(
        repositoryId: Text,
        commitId: Text
    ): async Result<[DiffResult], Error> {
        // Check read permission
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    #Err(#Forbidden("No read permission"));
                } else {
                    GitOps.getCommitDiff(repositoryId, commitId, repositories);
                };
            };
        };
    };

    // Merge branches
    public shared({ caller }) func mergeBranches(request: MergeRequest): async Result<MergeResult, Error> {
        GitOps.mergeBranches(caller, request, repositories);
    };

    // Clone repository
    public shared({ caller }) func cloneRepository(request: CloneRequest): async Result<SerializableRepository, Error> {
        // Check if user is registered
        switch (users.get(caller)) {
            case null { #Err(#Unauthorized("User not registered")); };
            case (?user) {
                // Validate new repository name
                if (not Utils.isValidRepositoryName(request.newName)) {
                    return #Err(#BadRequest("Invalid repository name"));
                };
                
                let result = GitOps.cloneRepository(
                    caller,
                    request,
                    repositories,
                    generateRepositoryId
                );
                
                switch (result) {
                    case (#Err(e)) { #Err(e); };
                    case (#Ok(clonedRepo)) {
                        // Update user's repository list
                        let updatedRepos = Array.append(user.repositories, [clonedRepo.id]);
                        let updatedUser = {
                            user with
                            repositories = updatedRepos;
                            updatedAt = Time.now();
                        };
                        users.put(caller, updatedUser);
                        
                        #Ok(Types.repositoryToSerializable(clonedRepo));
                    };
                };
            };
        };
    };

    // Get repository status
    public query({ caller }) func getGitStatus(
        repositoryId: Text,
        branch: Text
    ): async Result<GitStatus, Error> {

        // Check read permission
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    #Err(#Forbidden("No read permission"));
                } else {
                    GitOps.getStatus(repositoryId, branch, repositories);
                };
            };
        };
    };

    // Create tag
    public shared({ caller }) func createTag(request: TagRequest): async Result<Tag, Error> {
        GitOps.createTag(caller, request, repositories);
    };

    // List branches
    public query({ caller }) func listBranches(repositoryId: Text): async Result<[Types.Branch], Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    #Err(#Forbidden("No read permission"));
                } else {
                    #Ok(repo.branches);
                };
            };
        };
    };

    // Get current branch
    public query({ caller }) func getCurrentBranch(repositoryId: Text): async Result<Types.Branch, Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    #Err(#Forbidden("No read permission"));
                } else {
                    switch (Array.find<Types.Branch>(repo.branches, func(b) { b.isDefault })) {
                        case null { #Err(#NotFound("No default branch found")); };
                        case (?branch) { #Ok(branch); };
                    };
                };
            };
        };
    };

    public shared({ caller }) func switchBranch(
        repositoryId: Text,
        branchName: Text
    ): async Result<Bool, Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canWriteRepository(caller, repo)) {
                    return #Err(#Forbidden("No write permission"));
                };
                
                // Check if branch exists
                let branchExists = Array.find<Types.Branch>(
                    repo.branches,
                    func(b) { b.name == branchName }
                );
                
                switch (branchExists) {
                    case null { #Err(#NotFound("Branch not found")); };
                    case (?_) {

                        // Update branches
                        let updatedBranches = Array.map<Types.Branch, Types.Branch>(
                            repo.branches,
                            func(b) {
                                if (b.name == branchName) {
                                    { b with isDefault = true }
                                } else {
                                    { b with isDefault = false }
                                }
                            }
                        );
                        
                        let updatedRepo = {
                            repo with
                            branches = updatedBranches;
                            updatedAt = Time.now();
                        };
                        
                        repositories.put(repositoryId, updatedRepo);
                        #Ok(true);
                    };
                };
            };
        };
    };

    // Get file history

    public query({ caller }) func getFileHistory(
        repositoryId: Text,
        filePath: Text,
        limit: ?Nat
    ): async Result<[Types.Commit], Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    return #Err(#Forbidden("No read permission"));
                };
                
                // Filter commits that changed this file
                let fileCommits = Array.filter<Types.Commit>(
                    repo.commits,
                    func(commit) {
                        Array.find<Text>(
                            commit.changedFiles,
                            func(path) { path == filePath }
                        ) != null
                    }
                );
                
                // Sort by timestamp
                let sortedCommits = Array.sort<Types.Commit>(
                    fileCommits,
                    func(a, b) { Int.compare(b.timestamp, a.timestamp) }
                );
                
                // Apply limit
                let actualLimit = switch (limit) {
                    case null sortedCommits.size();
                    case (?l) Nat.min(l, sortedCommits.size());
                };
                
                #Ok(Array.subArray(sortedCommits, 0, actualLimit));
            };
        };
    };

    // Compare two branches
    public query({ caller }) func compareBranches(
        repositoryId: Text,
        baseBranch: Text,
        compareBranch: Text
    ): async Result<{ahead: Nat; behind: Nat; commits: [Types.Commit]}, Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    return #Err(#Forbidden("No read permission"));
                };
                
                // Find branches
                let base = Array.find<Types.Branch>(
                    repo.branches,
                    func(b) { b.name == baseBranch }
                );
                
                let compare = Array.find<Types.Branch>(
                    repo.branches,
                    func(b) { b.name == compareBranch }
                );
                
                switch (base, compare) {
                    case (null, _) { #Err(#NotFound("Base branch not found")); };
                    case (_, null) { #Err(#NotFound("Compare branch not found")); };
                    case (?baseBr, ?compareBr) {
                        // Simplified comparison
                        #Ok({
                            ahead = 0;
                            behind = 0;
                            commits = [];
                        });
                    };
                };
            };
        };
    };

    // Revert a commit

    public shared({ caller }) func revertCommit(
        repositoryId: Text,
        commitId: Text,
        message: ?Text
    ): async Result<Types.Commit, Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canWriteRepository(caller, repo)) {
                    return #Err(#Forbidden("No write permission"));
                };
                
                // Find the commit to revert
                let commitToRevert = Array.find<Types.Commit>(
                    repo.commits,
                    func(c) { c.id == commitId }
                );
                
                switch (commitToRevert) {
                    case null { #Err(#NotFound("Commit not found")); };
                    case (?commit) {
                        // Create revert commit
                        let revertMessage = switch (message) {
                            case null { "Revert \"" # commit.message # "\"" };
                            case (?msg) { msg };
                        };
                        
                        // Get current default branch
                        let defaultBranch = Array.find<Types.Branch>(
                            repo.branches,
                            func(b) { b.isDefault }
                        );
                        
                        switch (defaultBranch) {
                            case null { #Err(#NotFound("No default branch")); };
                            case (?branch) {
                                // Create a commit that reverts the changes
                                let revertRequest: CommitRequest = {
                                    repositoryId = repositoryId;
                                    branch = branch.name;
                                    message = revertMessage;
                                    files = [];
                                    parentCommit = ?branch.commitId;
                                };
                                
                                GitOps.createCommit(caller, revertRequest, repositories);
                            };
                        };
                    };
                };
            };
        };
    };

    // Get repository statistics
    public query({ caller }) func getRepositoryStats(repositoryId: Text): async Result<{
        totalCommits: Nat;
        totalBranches: Nat;
        totalFiles: Nat;
        contributors: [Principal];
        languages: [Text];
    }, Error> {
        switch (repositories.get(repositoryId)) {
            case null { #Err(#NotFound("Repository not found")); };
            case (?repo) {
                if (not Utils.canReadRepository(caller, repo)) {
                    return #Err(#Forbidden("No read permission"));
                };
                
                // Get unique contributors
                let contributorsBuffer = Buffer.Buffer<Principal>(10);
                contributorsBuffer.add(repo.owner);
                
                for (commit in repo.commits.vals()) {
                    let exists = Buffer.contains<Principal>(
                        contributorsBuffer,
                        commit.author,
                        Principal.equal
                    );
                    if (not exists) {
                        contributorsBuffer.add(commit.author);
                    };
                };
                
                // Get languages
                let languagesBuffer = Buffer.Buffer<Text>(5);
                for ((path, _) in repo.files.entries()) {
                    switch (Utils.getFileExtension(path)) {
                        case null {};
                        case (?ext) {
                            let lang = switch (ext) {
                                case "mo" { "Motoko" };
                                case "js" { "JavaScript" };
                                case "ts" { "TypeScript" };
                                case "py" { "Python" };
                                case "rs" { "Rust" };
                                case "go" { "Go" };
                                case "java" { "Java" };
                                case "cpp" { "C++" };
                                case "cc" { "C++" };
                                case "c" { "C" };
                                case "h" { "C" };
                                case _ { ext };
                            };
                            
                            let exists = Buffer.contains<Text>(
                                languagesBuffer,
                                lang,
                                Text.equal
                            );
                            if (not exists) {
                                languagesBuffer.add(lang);
                            };
                        };
                    };
                };
                
                #Ok({
                    totalCommits = repo.commits.size();
                    totalBranches = repo.branches.size();
                    totalFiles = repo.files.size();
                    contributors = Buffer.toArray(contributorsBuffer);
                    languages = Buffer.toArray(languagesBuffer);
                });
            };
        };
    };

}
