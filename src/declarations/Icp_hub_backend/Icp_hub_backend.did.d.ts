import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface User { 'id' : UserId, 'name' : string, 'joined' : bigint }
export type UserId = Principal;
export interface _SERVICE {
  'getUser' : ActorMethod<[UserId], [] | [User]>,
  'greet' : ActorMethod<[string], string>,
  'listUsers' : ActorMethod<[], Array<User>>,
  'registerUser' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
