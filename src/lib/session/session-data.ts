export interface User {
  id: string;
  email: string;
}

export default interface SessionData {
  user?: User;
}
