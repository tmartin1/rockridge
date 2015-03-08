'use strict';

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  db: {
    host: process.env.ORIENTDB_HOST,
    port: process.env.ORIENTDB_PORT,
    user: process.env.ORIENTDB_USER,
    password: process.env.ORIENTDB_PASSWORD
  },
  nexmo: {
    id: process.env.NEXMO_ID,
    secret: process.env.NEXMO_SECRET
  },
  secrets: {
    session: 'our-secret-session'
  }
}
