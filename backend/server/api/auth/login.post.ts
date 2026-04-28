import { comparePassword, generateToken } from '../../utils/authService'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const body = await readBody(event)

  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: email, password'
    })
  }

  // Buscar usuário pelo email
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  // Verificar senha
  const isValidPassword = await comparePassword(password, user.password)

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  // Gerar token
  const token = generateToken({
    id: user.id,
    email: user.email,
    username: user.username
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username
    },
    token
  }
})