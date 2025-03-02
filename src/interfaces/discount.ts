import  {Document} from "mongoose"
  
  export interface IDiscount extends Document {
    code: string;
    type: string;
    value: number;
    startDate: Date;
    expiryDate: Date;
    usedCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  } 
  