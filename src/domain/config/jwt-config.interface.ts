export interface IJwtConfig {
  SECRET: string;
  EXPIRATION_TIME: number;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION_TIME: number;
}
