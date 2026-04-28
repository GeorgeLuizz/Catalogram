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

  const body = await readBody(event)
  const { name, description, price, imageUrl } = body

  const updateData: any = {}
  if (name) updateData.name = name
  if (description !== undefined) updateData.description = description
  if (price) updateData.price = parseFloat(price)
  if (imageUrl) updateData.imageUrl = imageUrl

  const product = await prisma.product.update({
    where: { id: productId },
    data: updateData
  })

  return product
})