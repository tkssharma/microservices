import HttpException from "./http.exception";

class UnauthorizedException extends HttpException {
  constructor(id: string) {
    super(401, `User with id ${id} not found`);
  }
}

export default UnauthorizedException;
