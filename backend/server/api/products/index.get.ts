import { authMiddleware } from '../../utils/authMiddleware'

export default defineEventHandler(async (event) => {
  // Verificar autenticação
  await authMiddleware(event)

  const prisma = event.context.prisma

  const products = await prisma.product.findMany({
    where: {
      userId: event.context.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return products
})