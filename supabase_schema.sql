-- Tabla de Consultas (Chatbot)
CREATE TABLE IF NOT EXISTS inquiries (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT,
    email TEXT,
    contact TEXT,
    problem TEXT,
    date TEXT
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT UNIQUE,
    email TEXT,
    phone TEXT,
    address TEXT,
    services INTEGER DEFAULT 0
);

-- Tabla de Órdenes de Servicio
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    client TEXT,
    device TEXT,
    problem TEXT,
    status TEXT DEFAULT 'received',
    progress INTEGER DEFAULT 0,
    notes TEXT,
    date TEXT
);

-- Tabla de Inventario
CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    price DECIMAL(10,2),
    status TEXT
);

-- Habilitar Realtime para la tabla de consultas
ALTER PUBLICATION supabase_realtime ADD TABLE inquiries;
