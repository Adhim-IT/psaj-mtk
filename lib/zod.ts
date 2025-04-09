import { object, string, z } from 'zod';



export const LoginSchema = object({
  email: string().email('Email tidak valid'),
  password: string().min(5, 'Kata sandi harus lebih dari 5 karakter').max(32, 'Kata sandi harus kurang dari 32 karakter'),
});
