export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  publicUrl: process.env.PUBLIC_URL || 'http://localhost:4000',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novacraft',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  seed: {
    email: process.env.SEED_ADMIN_EMAIL || 'admin@novacraft.dev',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin@12345',
    name: process.env.SEED_ADMIN_NAME || 'Super Admin',
  },
});
