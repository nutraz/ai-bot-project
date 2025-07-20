import Types "./types";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

module {
    // Helper: Find first index of a char in Text
    public func findCharIndex(t: Text, target: Char): ?Nat {
        var i = 0;
        for (c in Text.toIter(t)) {
            if (c == target) { return ?i };
            i += 1;
        };
        return null;
    };

    // Helper: Find last index of a char in Text
    public func rfindCharIndex(t: Text, target: Char): ?Nat {
        var i = 0;
        var last : ?Nat = null;
        for (c in Text.toIter(t)) {
            if (c == target) { last := ?i };
            i += 1;
        };
        return last;
    };

    // Helper: Check if Text contains a substring
    public func containsSubstring(t: Text, sub: Text): Bool {
        let n = Text.size(t);
        let m = Text.size(sub);
        if (m == 0 or m > n) return false;

        let tArr = Text.toArray(t);
        let subArr = Text.toArray(sub);

        for (i in Iter.range(0, n - m)) {
            var isMatch : Bool = true;
            label inner for (j in Iter.range(0, m - 1)) {
                if (tArr[i + j] != subArr[j]) {
                    isMatch := false;
                    break inner;
                }
            };
            if (isMatch) return true;
        };

        return false;
    };

    // Helper: Get substring from index to end
    public func textDrop(t: Text, start: Nat): Text {
        let arr = Text.toArray(t);
        let sub = Array.subArray<Char>(arr, start, arr.size() - start);
        Text.fromArray(sub);
    };

    // Helper: Get substring from start to index (exclusive)
    public func textTake(t: Text, end_: Nat): Text {
        let arr = Text.toArray(t);
        let sub = Array.subArray<Char>(arr, 0, end_);
        Text.fromArray(sub);    
    };

    // Helper: Convert text to lowercase
    public func toLower(t: Text): Text {
        Text.map(t, func(c) {
            if (c >= 'A' and c <= 'Z') {
                Char.fromNat32(Char.toNat32(c) + 32);
            } else {
                c;
            };
        });
    };

    // Validation utilities
    public func isValidUsername(username: Text): Bool {
        let usernameLength = Text.size(username);
        if (usernameLength < 3 or usernameLength > 20) {
            return false;
        };

        // Check if username contains only allowed characters
        let chars = Text.toIter(username);
        for (char in chars) {
            let c = Nat32.toNat(Char.toNat32(char));
            if (not (
                (c >= 48 and c <= 57) or  // 0-9
                (c >= 65 and c <= 90) or  // A-Z
                (c >= 97 and c <= 122) or // a-z
                c == 45 or c == 95        // - and _
            )) {
                return false;
            };
        };
        
        return true;
    };

    public func isValidRepositoryName(name: Text): Bool {
        let nameLength = Text.size(name);
        if (nameLength < 1 or nameLength > 100) {
            return false;
        };

        // Repository name should not start or end with special characters
        let chars = Text.toArray(name);
        if (chars.size() == 0) return false;
        
        let firstChar = chars[0];
        let lastChar = chars[chars.size() - 1];
        
        if (firstChar == '-' or firstChar == '_' or firstChar == '.') return false;
        if (lastChar == '-' or lastChar == '_' or lastChar == '.') return false;
        
        return true;
    };

    public func isValidEmail(email: Text): Bool {
        // Basic email validation
        let atIndex = findCharIndex(email, '@');
        let dotIndex = rfindCharIndex(email, '.');
        
        switch (atIndex, dotIndex) {
            case (?at, ?dot) {
                at > 0 and dot > at + 1 and dot < Text.size(email) - 1;
            };
            case _ false;
        };
    };

    public func isValidPath(path: Text): Bool {
        if (Text.size(path) == 0) return false;
        
        // Check for invalid characters in path
        let chars = Text.toIter(path);
        for (char in chars) {
            let c = Nat32.toNat(Char.toNat32(char));
            // Allow alphanumeric, slash, dot, dash, underscore
            if (not (
                (c >= 48 and c <= 57) or  // 0-9
                (c >= 65 and c <= 90) or  // A-Z
                (c >= 97 and c <= 122) or // a-z
                c == 47 or c == 46 or c == 45 or c == 95  // / . - _
            )) {
                return false;
            };
        };
        
        // Check for path traversal attempts
        return not containsSubstring(path, "..");
    };

    public func isValidCommitMessage(message: Text): Bool {
        let messageLength = Text.size(message);
        messageLength > 0 and messageLength <= 1000;
    };

    // Hash utilities
    public func hashText(text: Text): Nat {
        Nat32.toNat(Text.hash(text));
    };

    public func generateFileHash(content: Blob): Text {
        // Simplified hash - in production, use proper SHA-256
        let contentSize = content.size();
        let timestamp = Time.now();
        "sha256_" # Nat.toText(contentSize) # "_" # Int.toText(timestamp);
    };

    public func generateRepositoryId(owner: Principal, name: Text): Text {
        let ownerText = Principal.toText(owner);
        let combined = ownerText # "_" # name # "_" # Int.toText(Time.now());
        "repo_" # Nat.toText(Nat32.toNat(Text.hash(combined)));
    };

    public func generateCommitHash(
        repositoryId: Text,
        author: Principal,
        message: Text,
        timestamp: Int
    ): Text {
        let combined = repositoryId # Principal.toText(author) # message # Int.toText(timestamp);
        "commit_" # Nat.toText(Nat32.toNat(Text.hash(combined)));
    };

    // Time utilities
    public func formatTimestamp(timestamp: Int): Text {
        // Basic timestamp formatting - in production, use proper date formatting
        Int.toText(timestamp);
    };

    public func isRecentTimestamp(timestamp: Int, hoursAgo: Int): Bool {
        let now = Time.now();
        let hoursInNanoseconds = hoursAgo * 60 * 60 * 1_000_000_000;
        timestamp >= (now - hoursInNanoseconds);
    };

    public func timestampToReadable(timestamp: Int): Text {
        // Convert nanoseconds to seconds for readability
        let seconds = timestamp / 1_000_000_000;
        Int.toText(seconds) # "s";
    };

    // Array utilities
    public func arrayContains<T>(array: [T], item: T, equal: (T, T) -> Bool): Bool {
        switch (Array.find<T>(array, func(x) { equal(x, item) })) {
            case null false;
            case (?_) true;
        };
    };

    public func arrayRemove<T>(array: [T], item: T, equal: (T, T) -> Bool): [T] {
        Array.filter<T>(array, func(x) { not equal(x, item) });
    };

    public func arrayUnique<T>(array: [T], equal: (T, T) -> Bool): [T] {
        let result = Array.foldLeft<T, [T]>(array, [], func(acc, item) {
            if (arrayContains<T>(acc, item, equal)) {
                acc;
            } else {
                Array.append<T>(acc, [item]);
            };
        });
        return result;
    };

    public func arrayUpdate<T>(array: [T], index: Nat, newItem: T): [T] {
        Array.tabulate<T>(array.size(), func(i) {
            if (i == index) newItem else array[i];
        });
    };

    public func arrayInsert<T>(array: [T], index: Nat, item: T): [T] {
        let buffer = Buffer.fromArray<T>(array);
        buffer.insert(index, item);
        Buffer.toArray(buffer);
    };

    // Permission utilities
    public func hasPermission(
        user: Principal,
        repo: Types.Repository,
        requiredPermission: Types.CollaboratorPermission
    ): Bool {
        // Owner has all permissions
        if (repo.owner == user) return true;

        // Check collaborator permissions
        switch (Array.find<Types.Collaborator>(repo.collaborators, func(collab) {
            collab.principal == user;
        })) {
            case null false;
            case (?collab) {
                switch (requiredPermission, collab.permission) {
                    case (#Read, _) true;
                    case (#Write, #Write or #Admin or #Owner) true;
                    case (#Admin, #Admin or #Owner) true;
                    case (#Owner, #Owner) true;
                    case _ false;
                };
            };
        };
    };

    public func canReadRepository(user: Principal, repo: Types.Repository): Bool {
        if (not repo.isPrivate) return true;
        hasPermission(user, repo, #Read);
    };

    public func canWriteRepository(user: Principal, repo: Types.Repository): Bool {
        hasPermission(user, repo, #Write);
    };

    public func canAdminRepository(user: Principal, repo: Types.Repository): Bool {
        hasPermission(user, repo, #Admin);
    };

    public func isRepositoryOwner(user: Principal, repo: Types.Repository): Bool {
        repo.owner == user;
    };

    // File utilities
    public func getFileExtension(path: Text): ?Text {
        let lastDotIndex = rfindCharIndex(path, '.');
        switch (lastDotIndex) {
            case null null;
            case (?index) {
                if (index == Text.size(path) - 1) {
                    null;
                } else {
                    let extension = textDrop(path, index + 1);
                    ?extension;
                };
            };
        };
    };

    public func getFileName(path: Text): Text {
        let lastSlashIndex = rfindCharIndex(path, '/');
        switch (lastSlashIndex) {
            case null path;
            case (?index) {
                if (index == Text.size(path) - 1) {
                    "";
                } else {
                    textDrop(path, index + 1);
                };
            };
        };
    };

    public func getDirectoryPath(path: Text): Text {
        let lastSlashIndex = rfindCharIndex(path, '/');
        switch (lastSlashIndex) {
            case null "";
            case (?index) {
                if (index == 0) {
                    "/";
                } else {
                    textTake(path, index);
                };
            };
        };
    };

    public func isImageFile(path: Text): Bool {
        switch (getFileExtension(path)) {
            case null false;
            case (?ext) {
                let lowerExt = toLower(ext);
                lowerExt == "jpg" or lowerExt == "jpeg" or lowerExt == "png" or 
                lowerExt == "gif" or lowerExt == "bmp" or lowerExt == "webp" or lowerExt == "svg";
            };
        };
    };

    public func isCodeFile(path: Text): Bool {
        let lowerPath = toLower(path);
        Text.endsWith(lowerPath, #text ".mo") or
        Text.endsWith(lowerPath, #text ".js") or
        Text.endsWith(lowerPath, #text ".ts") or
        Text.endsWith(lowerPath, #text ".py") or
        Text.endsWith(lowerPath, #text ".rs") or
        Text.endsWith(lowerPath, #text ".go") or
        Text.endsWith(lowerPath, #text ".java") or
        Text.endsWith(lowerPath, #text ".cpp") or
        Text.endsWith(lowerPath, #text ".c") or
        Text.endsWith(lowerPath, #text ".h");
    };

    public func getFileSize(content: Blob): Nat {
        content.size();
    };

    public func formatFileSize(size: Nat): Text {
        if (size < 1024) {
            Nat.toText(size) # " B";
        } else if (size < 1024 * 1024) {
            Nat.toText(size / 1024) # " KB";
        } else if (size < 1024 * 1024 * 1024) {
            Nat.toText(size / (1024 * 1024)) # " MB";
        } else {
            Nat.toText(size / (1024 * 1024 * 1024)) # " GB";
        };
    };

    // Repository utilities
    public func sortRepositoriesByName(repos: [Types.Repository]): [Types.Repository] {
        Array.sort<Types.Repository>(repos, func(a, b) {
            Text.compare(a.name, b.name);
        });
    };

    public func sortRepositoriesByDate(repos: [Types.Repository]): [Types.Repository] {
        Array.sort<Types.Repository>(repos, func(a, b) {
            Int.compare(b.createdAt, a.createdAt); // Newest first
        });
    };

    public func filterRepositoriesByVisibility(repos: [Types.Repository], showPrivate: Bool): [Types.Repository] {
        Array.filter<Types.Repository>(repos, func(repo) {
            if (showPrivate) true else not repo.isPrivate;
        });
    };

    public func searchRepositories(repos: [Types.Repository], searchRepositories: Text): [Types.Repository] {
        let lowerQuery = toLower(searchRepositories);
        Array.filter<Types.Repository>(repos, func(repo) {
            let lowerName = toLower(repo.name);
            let lowerDesc = switch (repo.description) {
                case null "";
                case (?desc) toLower(desc);
            };
            containsSubstring(lowerName, lowerQuery) or containsSubstring(lowerDesc, lowerQuery);
        });
    };

    // User utilities
    public func formatUserProfile(user: Types.User): Text {
        let repoCount = Array.size(user.repositories);
        user.username # " (" # Nat.toText(repoCount) # " repositories)";
    };

    // Error handling utilities
    public func createErrorResult<T>(message: Text): {#err: Text} {
        #err(message);
    };

    public func createSuccessResult<T>(data: T): {#ok: T} {
        #ok(data);
    };

    // Logging utilities
    public func logInfo(message: Text) {
        Debug.print("[INFO] " # message);
    };

    public func logError(message: Text) {
        Debug.print("[ERROR] " # message);
    };

    public func logDebug(message: Text) {
        Debug.print("[DEBUG] " # message);
    };

    // Pagination utilities
    public func paginateArray<T>(array: [T], page: Nat, pageSize: Nat): [T] {
        let startIndex = page * pageSize;
        let endIndex = startIndex + pageSize;
        let arraySize = Array.size(array);
        
        if (startIndex >= arraySize) {
            return [];
        };
        
        let actualEndIndex = if (endIndex > arraySize) arraySize else endIndex;
        Array.subArray<T>(array, startIndex, actualEndIndex - startIndex);
    };

    public func getTotalPages(totalItems: Nat, pageSize: Nat): Nat {
        if (pageSize == 0) return 0;
        (totalItems + pageSize - 1) / pageSize;
    };

    // Branch utilities
    public func isValidBranchName(name: Text): Bool {
        let nameLength = Text.size(name);
        if (nameLength < 1 or nameLength > 100) {
            return false;
        };
        
        // Branch names cannot start with dash or contain certain characters
        let chars = Text.toArray(name);
        if (chars.size() == 0) return false;
        
        let firstChar = chars[0];
        if (firstChar == '-' or firstChar == '.') return false;
        
        // Check for invalid characters
        let iter = Text.toIter(name);
        for (char in iter) {
            let c = Nat32.toNat(Char.toNat32(char));
            if (c == 32 or c == 126 or c == 94 or c == 58 or c == 63 or c == 42 or c == 91) {
                return false; // space, ~, ^, :, ?, *, [
            };
        };
        
        return true;
    };

    public func getDefaultBranch(): Text {
        "main";
    };

    // Collaboration utilities
    public func addCollaborator(
        repo: Types.Repository,
        newCollaborator: Types.Collaborator
    ): Types.Repository {
        // Check if collaborator already exists
        let exists = Array.find<Types.Collaborator>(repo.collaborators, func(collab) {
            collab.principal == newCollaborator.principal;
        });
        
        let updatedCollaborators = switch (exists) {
            case null {
                Array.append<Types.Collaborator>(repo.collaborators, [newCollaborator]);
            };
            case (?_) {
                // Update existing collaborator
                Array.map<Types.Collaborator, Types.Collaborator>(repo.collaborators, func(collab) {
                    if (collab.principal == newCollaborator.principal) {
                        newCollaborator;
                    } else {
                        collab;
                    };
                });
            };
        };
        
        {
            repo with
            collaborators = updatedCollaborators;
            updatedAt = Time.now();
        };
    };

    public func removeCollaborator(
        repo: Types.Repository,
        principal: Principal
    ): Types.Repository {
        let updatedCollaborators = Array.filter<Types.Collaborator>(repo.collaborators, func(collab) {
            collab.principal != principal;
        });
        
        {
            repo with
            collaborators = updatedCollaborators;
            updatedAt = Time.now();
        };
    };

    // Memory management utilities
    public func getMemoryUsage(): Nat {
        // This would need to be implemented based on specific memory tracking
        0;
    };

    public func shouldOptimizeMemory(threshold: Nat): Bool {
        getMemoryUsage() > threshold;
    };
    
    // public func canReadRepository(caller: Principal, repo: Types.Repository): Bool {
    //     if (repo.owner == caller) return true;
    //     if (not repo.isPrivate) return true;
    //     // Check collaborators
    //     Array.find<Types.Collaborator>(repo.collaborators, func(collab) {
    //         collab.principal == caller;
    //     }) != null;
    // };

    // public func arrayContains<T>(arr: [T], item: T, equal: (T, T) -> Bool): Bool {
    //     Array.find<T>(arr, func(x) { equal(x, item) }) != null;
    // };

    // public func paginateArray<T>(arr: [T], page: Nat, limit: Nat): [T] {
    //     let startIndex = page * limit;
    //     let endIndex = Nat.min(startIndex + limit, arr.size());
        
    //     if (startIndex >= arr.size()) {
    //         return [];
    //     };
        
    //     Array.tabulate<T>(endIndex - startIndex, func(i) {
    //         arr[startIndex + i];
    //     });
    // };
};
