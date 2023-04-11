import { Request, Response, NextFunction } from "express";

const validQueryPaginationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage } = req.query;

  if (page == undefined || !Number(page)) {
    req.query.page = "1";
  }
  if (perPage == undefined || !Number(perPage)) {
    req.query.perPage = "10";
  }

  next();
};

export default validQueryPaginationMiddleware;
