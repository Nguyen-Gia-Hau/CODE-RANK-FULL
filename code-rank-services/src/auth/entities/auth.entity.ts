import { JwtService } from "@nestjs/jwt";

export class Auth {
  constructor(
    private jwtService: JwtService
  ) { }
}
