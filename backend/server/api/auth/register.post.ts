import { hashPassword, generateToken } from '../../utils/authService'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const body = await readBody(event)

  const { email, password, username } = body

  if (!email || !password || !username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: email, password, username'
    })
  }

  // Verificar se email já existe
  const existingEmail = await prisma.user.findUnique({
    where: { email }
  })

  if (existingEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already registered'
    })
  }

  // Verificar se username já existe
  const existingUsername = await prisma.user.findUnique({
    where: { username }
  })

  if (existingUsername) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username already taken'
    })
  }

  // Hashear senha
  const hashedPassword = await hashPassword(password)

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    },
    select: {
      id: true,
      email: true,
      username: true
    }
  })

  // Gerar token
  const token = generateToken({
    id: user.id,
    email: user.email,
    username: user.username
  })

  return {
    user,
    token
  }
})