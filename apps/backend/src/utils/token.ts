import {
  AuthTokenResult,
  IUserToken,
} from 'src/authentication/interfaces/authentication.interface';
import * as jwt from 'jsonwebtoken';

export const decodeToken = (token: string): IUserToken | string => {
  try {
    const decodedToken = jwt.decode(token) as AuthTokenResult;

    if (!decodedToken) {
      return 'Token inválido';
    }

    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const expirationTimestamp = decodedToken.exp;

    const isExpired = expirationTimestamp <= currentTimestampInSeconds;

    return {
      sub: decodedToken.sub,
      role: decodedToken.role,
      isExpired,
    };
  } catch (error) {
    return 'Error al decodificar el token';
  }
};
