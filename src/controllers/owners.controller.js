import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getAllOwners = asyncHandler (async (req, res) => {
  const owners = await prisma.owner.findMany({
    include: { patients: true }
  })
  res.json(owners)
})

export const getOwnerById = asyncHandler (async (req, res) => {
  const { id } = req.params

  const owner = await prisma.owner.findUnique({
    where: { id },
    include: { patients: true }
  })

  if (!owner) {
    return res.status(404).json({ error: 'Owner not found' })
  }

  res.json(owner)
})

export const createOwner = asyncHandler (async (req, res) => {
  const { firstName, lastName, phone, email, address } = req.body

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: 'First name, last name and phone are required' })
  }

  const owner = await prisma.owner.create({
    data: { firstName, lastName, phone, email, address }
  })

  res.status(201).json(owner)
})

export const updateOwner = asyncHandler (async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, phone, email, address } = req.body

  const owner = await prisma.owner.update({
    where: { id },
    data: { firstName, lastName, phone, email, address }
  })

  res.json(owner)
})

export const deleteOwner = asyncHandler (async (req, res) => {
  const { id } = req.params

  await prisma.owner.delete({ where: { id } })

  res.json({ message: 'Owner deleted' })
})