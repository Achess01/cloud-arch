import { BadRequest } from '@feathersjs/errors'
import { checkContext, getItems } from 'feathers-hooks-common'

const isCurrentChild = async ({ service, newParentId, currentId }) => {
  const children = await service.find({
    query: {
      parent_id: currentId
    }
  })

  if (!children.total) return false
  if (children.data.some((dir) => JSON.stringify(dir._id) === JSON.stringify(newParentId))) return true
  for (let child of children.data) {
    const value = await isCurrentChild({ service, newParentId, currentId: child._id })
    if (value) {
      return true
    }
  }
  return false
}

export const checkParentId =
  (options = {}) =>
  async (context) => {
    checkContext(context, 'before', ['update', 'patch'])
    const items = getItems(context)
    const { id, service } = context
    const instance = id ? await service.get(id) : undefined

    const { parent_id } = items

    if (!parent_id || !instance) return context

    if (JSON.stringify(parent_id) === JSON.stringify(instance.parent_id)) return context

    if (await isCurrentChild({ service, newParentId: parent_id, currentId: id }))
      throw new BadRequest('No se puede mover el directorio a esta dirección')

    return context
  }
