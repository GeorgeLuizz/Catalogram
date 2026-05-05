import { verifyToken } from '../utils/authService'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function authMiddleware(event: any) {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No token provided'
    })
  }

  const token = authHeader.replace('Bearer ', '')
  const userPayload = verifyToken(token) 

  if (!userPayload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token'
    })
  }

  // Buscar usuário completo no banco
  const user = await prisma.user.findUnique({
    where: { id: userPayload.id },
    select: {
      id: true,
      email: true,
      username: true
    }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not found'
    })
  }

  // Adicionar usuário ao contexto
  event.context.user = user
}

//resolve a autenticação.