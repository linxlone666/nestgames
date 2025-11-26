CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQE,
    name TEXT,
    price TEXT,
    description TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    key TEXT,
    is_used INTEGER DEFAULT 0,
    used_by INTEGER,
    used_at TEXT,
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    key_id INTEGER,
    price REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (key_id) REFERENCES keys(id)
);