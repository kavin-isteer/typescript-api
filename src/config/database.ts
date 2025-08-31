import {Sequelize} from 'sequelize';

const dbUsername = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || '';
const dbName = process.env.DB_NAME || '';

const sequelize = new Sequelize(dbName,dbUsername,dbPassword,
{
    host:dbHost,
    dialect:'postgres'
});

export default sequelize;