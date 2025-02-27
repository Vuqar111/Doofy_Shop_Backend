import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Extend the Request type to include the userId property
interface CustomerRequest extends Request {
  customer?: any;
}

const generateToken = (customer: any) => {
  return jwt.sign(
    {
      _id: customer._id,
      fullName: customer.fullName,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
    },
    process.env.JWT_SECRET || 'secret_key',
    {
      expiresIn: '1h',
    }
  );
};

const isCustomerAuth = (req: CustomerRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret_key',
      (err: any, decode: any) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.customer = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export { isCustomerAuth, CustomerRequest, generateToken };
