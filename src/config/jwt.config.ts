export default {
  secret: process.env.JWT_SECRET || 'supercalifragilisticexpialidocious',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
}
