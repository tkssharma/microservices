import UserWithThatEmailAlreadyExistsException from "../exceptions/user.register.exception";
import CreateUserDto from "../user/user.dto";
import userModel from "../user/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthenticationService {
  public user = userModel;
  public async register(data: CreateUserDto) {
    const { email } = data;
    const existingUser = await this.user.findOne({ email });
    if (existingUser) {
      throw new UserWithThatEmailAlreadyExistsException(email);
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await this.user.create({
      ...data,
      password: hashPassword,
    });
    delete user.password;
    return {
      user: {
        email: user.email,
      },
    };
  }
}

export default AuthenticationService;
