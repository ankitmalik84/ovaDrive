import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default function getSession() {
  const session = getServerSession(authOptions);
  return session;
}
