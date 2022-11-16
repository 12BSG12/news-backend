export const jwtConstants = {
  secret: require('crypto').randomBytes(256).toString('base64'),
};