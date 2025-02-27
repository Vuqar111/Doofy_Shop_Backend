import {Document} from "mongoose";
  
  export interface INotification extends Document {
    receipent: string;
    message: string;
    purpose: string;
  } 
  