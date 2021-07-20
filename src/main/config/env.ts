export default {
  mongoUrl:
    process.env.MONGO_URL || 'mongodb://mongo:27017/teste-dev-fullstack-api',
  port: process.env.PORT || 5050,
};
