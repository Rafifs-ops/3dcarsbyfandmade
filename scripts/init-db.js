import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_DATABASE_AUTH || process.env.TURSO_AUTH_TOKEN

console.log('Connecting to Turso database at:', url)

const client = createClient({
  url,
  authToken
})

async function main() {
  console.log('Creating tables in Turso SQLite...')

  await client.execute(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'ADMIN',
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS News (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT NOT NULL,
      isFeatured BOOLEAN NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS Character (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      racingNumber TEXT,
      title TEXT NOT NULL,
      tagline TEXT NOT NULL,
      category TEXT NOT NULL,
      categoryLabel TEXT NOT NULL,
      modelFile TEXT NOT NULL,
      coverUrl TEXT,
      gameCoverUrl TEXT,
      defaultSkinId TEXT,
      scale REAL NOT NULL DEFAULT 0.95,
      positionOffset TEXT,
      rotationOffset TEXT,
      topSpeed INTEGER NOT NULL DEFAULT 200,
      sponsor TEXT NOT NULL,
      engineType TEXT NOT NULL,
      voiceQuote TEXT,
      soundEffect TEXT,
      bio TEXT NOT NULL,
      funFact TEXT NOT NULL,
      primaryColor TEXT NOT NULL DEFAULT '#E11D2A',
      accentColor TEXT NOT NULL DEFAULT '#FFC700',
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS CharacterSkin (
      id TEXT PRIMARY KEY,
      characterId TEXT NOT NULL,
      skinId TEXT NOT NULL,
      name TEXT NOT NULL,
      modelFile TEXT NOT NULL,
      previewColor TEXT NOT NULL,
      description TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (characterId) REFERENCES Character(id) ON DELETE CASCADE
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS TrackCircuit (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      surfaceType TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      ambientColor TEXT NOT NULL DEFAULT '#E11D2A',
      "order" INTEGER NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS GameSpec (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      releaseYear INTEGER NOT NULL,
      developer TEXT NOT NULL,
      publisher TEXT NOT NULL,
      genre TEXT NOT NULL,
      steamAppId TEXT NOT NULL,
      steamUrl TEXT NOT NULL,
      coverUrl TEXT NOT NULL,
      summary TEXT NOT NULL,
      os TEXT NOT NULL,
      processor TEXT NOT NULL,
      memory TEXT NOT NULL,
      graphics TEXT NOT NULL,
      directx TEXT NOT NULL,
      storage TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS GameplayVideo (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      youtubeId TEXT NOT NULL,
      duration TEXT NOT NULL,
      game TEXT NOT NULL,
      description TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log('Tables created successfully!')

  // Create default admin user
  const adminCheck = await client.execute({
    sql: 'SELECT * FROM User WHERE username = ?',
    args: ['admin']
  })

  if (adminCheck.rows.length === 0) {
    console.log('Creating default admin user...')
    const hashedPassword = bcrypt.hashSync('admin123', 10)
    await client.execute({
      sql: `INSERT INTO User (id, username, email, password, name, role) VALUES (?, ?, ?, ?, ?, ?)`,
      args: ['admin_user_01', 'admin', 'admin@carsgame.com', hashedPassword, 'Administrator', 'ADMIN']
    })
    console.log('Admin user created: admin / admin123')
  }

  console.log('Database initialization done.')
}

main().catch(console.error)
