//NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    MYSQ_PASSWORD: string;
    MYSQL_USER: string;
    MYSQL_DB_NAME: string;
    MYSQL_PORT: number;
    MYSQL_HOST: string;
    PORT: number;
    SALT: string;
  }
}
