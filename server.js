// server.js
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = 'sirtaada_khaaska_ah'

// Fake database
let users = [
  {
    id: 1,
    email: 'user@example.com',
    passwordHash: bcrypt.hashSync('password123', 8),
  },
]

let customers = [
  { id: 1, name: 'Ahmed', email: 'ahmed@example.com', phone: '123456789', address: 'Mogadishu' },
  { id: 2, name: 'Hassan', email: 'hassan@example.com', phone: '987654321', address: 'Hargeisa' },
]

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' })
    req.user = decoded
    next()
  })
}

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const isPasswordValid = bcrypt.compareSync(password, user.passwordHash)
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

// Customers routes (protected)
app.get('/api/customers', authenticate, (req, res) => {
  res.json(customers)
})

app.get('/api/customers/:id', authenticate, (req, res) => {
  const id = parseInt(req.params.id)
  const customer = customers.find(c => c.id === id)
  if (!customer) return res.status(404).json({ message: 'Customer not found' })
  res.json(customer)
})

app.post('/api/customers', authenticate, (req, res) => {
  const { name, email, phone, address } = req.body
  const newCustomer = {
    id: customers.length ? customers[customers.length - 1].id + 1 : 1,
    name,
    email,
    phone,
    address,
  }
  customers.push(newCustomer)
  res.status(201).json(newCustomer)
})

app.put('/api/customers/:id', authenticate, (req, res) => {
  const id = parseInt(req.params.id)
  const customer = customers.find(c => c.id === id)
  if (!customer) return res.status(404).json({ message: 'Customer not found' })

  const { name, email, phone, address } = req.body
  customer.name = name
  customer.email = email
  customer.phone = phone
  customer.address = address

  res.json(customer)
})

app.delete('/api/customers/:id', authenticate, (req, res) => {
  const id = parseInt(req.params.id)
  const index = customers.findIndex(c => c.id === id)
  if (index === -1) return res.status(404).json({ message: 'Customer not found' })

  customers.splice(index, 1)
  res.json({ message: 'Customer deleted' })
})

// Start server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000')
})
