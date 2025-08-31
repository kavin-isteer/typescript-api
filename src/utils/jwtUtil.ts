import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, role: user.role.name }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
};