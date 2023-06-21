import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.host ===
      `${this.configService.get("HOST")}:${this.configService.get("PORT")}`
    ) {
      return res.redirect(HttpStatus.MOVED_PERMANENTLY, "/api-docs");
    }
    next();
  }
}
