import app from './app';
import sequelize from "./config/database";
import { Role } from './models';

const PORT = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.json("Welcome to the API!!")
})
async function start(){
    try{
        await sequelize.sync({force:true});
        // Create or find roles
    const [adminRole, adminCreated] = await Role.findOrCreate({
      where: { name: 'admin' },
      defaults: { name: 'admin' }
    });

    const [userRole, userCreated] = await Role.findOrCreate({
      where: { name: 'user' },
      defaults: { name: 'user' }
    });

    // Log roles
    console.log(`Admin Role: ${adminRole.name}, Created: ${adminCreated}`);
    console.log(`User Role: ${userRole.name}, Created: ${userCreated}`);

        app.listen(PORT,()=>{
            console.log(`Server started and running on port ${PORT}`)
        });
    }catch(err){
         console.error('Unable to start server:', err);
    }
}

start();