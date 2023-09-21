import { UserToken } from "./src/models/util/AppReqBody";

declare module "jsonwebtoken" {
  export interface JwtPayload extends UserToken {}
}
