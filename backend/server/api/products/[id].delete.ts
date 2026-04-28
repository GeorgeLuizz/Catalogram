import { authMiddleware } from '../../utils/authMiddleware'

export default defineEventHandler(async (event) => {
  // Verificar autenticação
  await authMiddleware(event)

  const prisma = event.context.prisma
  const productId = getRouterParam(event, 'id')

  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID is required'
    })
  }

  // Verificar se o produto pertence ao usuário
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      userId: event.context.user.id
    }
  })

  if (!existingProduct) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found or not owned by user'
    })
  }

  await prisma.product.delete({
    where: { id: productId }
  })

  return { message: 'Product deleted successfully' }
})