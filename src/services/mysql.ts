import mysql from 'mysql2/promise';

export async function initConnection() {
  // create the connection to database
  const connection = await mysql.createPool({
    host: process.env.TIDB_HOST || 'localhost',
    port: process.env.TIDB_PORT ? parseInt(process.env.TIDB_PORT) : 4000,
    password: process.env.TIDB_PASSWORD || 'password',
    user: process.env.TIDB_USER,
    database: process.env.TIDB_DATABASE || 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
    waitForConnections: true,
    connectionLimit: 1,
  });
  return connection;
}

export default class MySQLService {
  connection: mysql.Pool | mysql.Connection;

  constructor(connection: mysql.Pool | mysql.Connection) {
    this.connection = connection;
  }

  async execute(sql: string) {
    try {
      const [rows, fields] = await this.connection.execute(sql);
      return { rows, fields };
    } catch (error: any) {
      return { error };
    }
  }

  async cleanUp() {
    await this.connection.end();
  }
}
