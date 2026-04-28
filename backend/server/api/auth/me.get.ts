import { authMiddleware } from '../../utils/authMiddleware'

export default defineEventHandler(async (event) => {
  // Verificar autenticação
  await authMiddleware(event)

  return {
    id: event.context.user.id,
    email: event.context.user.email,
    username: event.context.user.username
  }
})