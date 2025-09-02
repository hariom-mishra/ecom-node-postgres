export async function initializeTables() {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
        );

        await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT now()
        )
    `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS variants (
        id SERIAL PRIMARY KEY,
        imageUrl TEXT NOT NULL,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        price DECIMAL(10, 2) NOT NULL,
        selling_price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
        )
        `);

        await pool.query(`CREATE TABLE IF NOT EXISTS variant_attributes(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL
        )`
        )

        await pool.query(`
            CREATE TABLE IF NOT EXISTS variant_attribute_value(
            id SERIAL PRIMARY KEY,
            variant_id INT NOT NULL REFERENCES variant(id) ON DELETE CASCADE,
            attribute_id INT NOT NULL REFERENCES variant_attributes(id) ON DELETE CASCADE
            )
            `)

        await pool.query(`CREATE TABLE variant_images(
            id SERIAL PRIMARY KEY,
            variant_id INT NOT NUL REFERENCES variant(id) ON DELETE CASCADE,
            image_url TEXT NOT NULL
            )`)
    } catch (e) {
        throw Error("Error creating table");
    }
}