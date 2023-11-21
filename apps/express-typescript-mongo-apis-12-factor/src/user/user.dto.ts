import { IsOptional, IsString, ValidateNested } from "class-validator";

class CreateAddressDto {
  @IsString()
  public street: string;

  @IsString()
  public city: string;

  @IsString()
  public country: string;
}

class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  @ValidateNested()
  public address?: CreateAddressDto;
}

export default CreateUserDto;
