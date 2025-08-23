export const idlFactory = ({ IDL }) => {
  const UserId = IDL.Principal;
  const User = IDL.Record({
    'id' : UserId,
    'name' : IDL.Text,
    'joined' : IDL.Int,
  });
  return IDL.Service({
    'getUser' : IDL.Func([UserId], [IDL.Opt(User)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'listUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'registerUser' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
