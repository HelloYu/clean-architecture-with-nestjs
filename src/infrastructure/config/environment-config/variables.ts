import { IsEnum } from "class-validator";
import { Environment } from "./environment";

export class AppVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
}
