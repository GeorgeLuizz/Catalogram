export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const userId = getRouterParam(event, 'userId')

  const products = await prisma.product.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      price: 'desc'
    }
  })

  return products //produtos do catalogo
})