import { loginPayloadDto } from 'src/auth/dtos';

export const authorizationToLoginPayload = (
  authorization: string
): loginPayloadDto | undefined => {
  const authorizationSplited = authorization.split('.');

  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii')
  );
};
