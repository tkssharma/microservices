import HttpException from "./http.exception";

class InavlidCredsPassedException extends HttpException {
  constructor(email: string) {
    super(404, `User with provided Creds doesn't exists`);
  }
}

export default InavlidCredsPassedException;
