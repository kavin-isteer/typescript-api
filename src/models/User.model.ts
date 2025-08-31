import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Role } from './Role.model';

export class User extends Model{
    declare id:number;
    declare username:string;
    declare password:string;
    declare roleId:number;

}

User.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
},{
    sequelize,
    modelName:'user'
});

User.belongsTo(Role,{foreignKey:"roleId"})
Role.hasMany(User,{foreignKey:"roleId"})