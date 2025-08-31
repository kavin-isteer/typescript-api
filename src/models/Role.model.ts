import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"

export class Role extends Model{
    declare id:number;
    declare name:string;
}

Role.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,modelName:'role'});

