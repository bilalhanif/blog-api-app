import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);

    const token = req.headers.authorization?.split(' ')[1]; 

    if (token) {
      try {
        const user = this.jwtService.verify(token);
        req.user = user;
      } catch (error) {
        console.error('Token verification failed:', error.message);
      }
    }

    next();
  }
}
