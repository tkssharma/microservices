import HttpException from "./http.exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, "Wrong credentials provided");
  }
}

export default WrongCredentialsException;
