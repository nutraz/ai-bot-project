module token {
  public type Account = { owner : Principal; subaccount : ?Blob };
  public func account_from(principal : Principal) : Account {
    { owner = principal; subaccount = null };
  };
};
EOF
