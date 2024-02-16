db.createUser({
  user: _getEnv('MONGO_USER'),
  pwd: _getEnv('MONGO_PASSWORD'),
  roles: ['readWrite', 'dbAdmin'],
});
