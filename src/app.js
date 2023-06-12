import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Routes
import toolRoutes from './routes/tool.routes';
import userRoutes from './routes/user.routes';
import toolcategoryRoutes from './routes/toolcategory.routes';
import loanRoutes from './routes/loan.routes';
import loginRoutes from './routes/login.routes';

const app=express();

//SETTINGS
app.set("port",4000);

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//ROUTES
//tools
app.use("/api/tools",toolRoutes);
//users
app.use("/api/users",userRoutes);
//loans
app.use("/api/loans",loanRoutes);
//toolcategories
app.use("/api/toolcategories",toolcategoryRoutes);
//login
app.use("/api/login",loginRoutes);
export default app;