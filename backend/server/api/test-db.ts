export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma

  const users = await prisma.user.findMany()

  return users
})