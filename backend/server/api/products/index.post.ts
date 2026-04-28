import { authMiddleware } from '../../utils/authMiddleware'

export default defineEventHandler(async (event) => {
  // Verificar autenticação
  await authMiddleware(event)

  const prisma = event.context.prisma
  const body = await readBody(event)

  const { name, description, price, imageUrl } = body

  if (!name || !price || !imageUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: name, price, imageUrl'
    })
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      userId: event.context.user.id
    }
  })

  return product
})