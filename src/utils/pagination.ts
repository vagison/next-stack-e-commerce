import { Request } from 'express'

interface PaginationParams {
  page?: number
  limit?: number
}

const paginate = (req: Request, defaultLimit: number = 10): { offset: number; limit: number; page: number } => {
  const page: number = req.query.page ? +req.query.page : 1
  const limit: number = req.query.limit ? +req.query.limit : defaultLimit
  const offset: number = (page - 1) * limit
  return { offset, limit, page }
}

interface PaginatedResponse<T> {
  data: T
  meta: {
    total: number
    page: number
    pages: number
  }
}

const generatePaginatedRes = <T>(data: T, { total, page, limit }: { total: number; page: number; limit: number }): PaginatedResponse<T> => {
  const totalPages: number = Math.ceil(total / limit)
  return {
    data,
    meta: {
      total,
      page,
      pages: totalPages,
    },
  }
}

export { paginate, generatePaginatedRes }
