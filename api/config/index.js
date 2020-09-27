const path = require('path')
const isBase64 = require('is-base64')

const root = path.normalize(`${__dirname}/../..`)

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NODE_ENV === 'production'
const isCI = process.env.CI === 'true' // CircleCI env var

const decodeBase64Key = (key, envVar) => {
  if (isTest) {
    return
  }

  if (!key) {
    throw new Error(`Missing env var ${envVar}`)
  }

  if (!isBase64(key)) {
    throw new Error(
      `The env var ${envVar} should be base64 encoded, run keygen.sh`
    )
  }

  return Buffer.from(key, 'base64').toString()
}

const config = {
  root,
  isCI,
  isDev,
  isTest,
  isProd,
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  mysql: {
    port: process.env.MYSQL_PORT,
    rootPassword: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
    privateKey: decodeBase64Key(process.env.JWT_PRIVATE_KEY, 'JWT_PRIVATE_KEY'),
    publicKey: decodeBase64Key(process.env.JWT_PUBLIC_KEY, 'JWT_PUBLIC_KEY'),
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
  },
}

module.exports = config
