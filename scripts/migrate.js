import { query } from './db.js';

async function createTables() {
  try {
    // Create books table
    await query(`
      CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        isbn VARCHAR(13) NOT NULL,
        status VARCHAR(20) NOT NULL,
        current_page INTEGER NOT NULL DEFAULT 0,
        total_pages INTEGER NOT NULL,
        rating INTEGER,
        genre VARCHAR(100),
        date_started TIMESTAMP WITH TIME ZONE,
        date_finished TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create notes table
    await query(`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        page INTEGER,
        version INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tables created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

createTables();