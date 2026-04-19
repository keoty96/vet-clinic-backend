import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const passwordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  res.json({ token })
}