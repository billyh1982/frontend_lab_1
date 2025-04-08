//import { User } from '@auth0/auth0-react';

import { User } from './user';


export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}