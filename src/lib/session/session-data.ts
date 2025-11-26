export interface User {
  id: string;
  email: string;
}

export interface SessionData {
  user?: User;
}
