export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const username = getRouterParam(event, 'username')

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required'
    })
  }

  // Buscar usuário pelo username
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true
    }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Buscar produtos do usuário
  const products = await prisma.product.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    user: {
      id: user.id,
      username: user.username
    },
    products
  }
})