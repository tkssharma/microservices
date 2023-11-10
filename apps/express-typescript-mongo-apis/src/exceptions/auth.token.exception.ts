import HttpException from "./http.exception";

class AuthTokenMissing extends HttpException {
  constructor() {
    super(401, `auth token missing in cookies`);
  }
}

export default AuthTokenMissing;
