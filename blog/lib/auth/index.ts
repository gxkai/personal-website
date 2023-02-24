import email from "./email";
import discord from "./discord";
import github from "./github";
import { AuthHandler, GetUser } from "./util";

export default { email, discord, github } as Record<
  string,
  { handler: AuthHandler; getUser: GetUser }
>;
