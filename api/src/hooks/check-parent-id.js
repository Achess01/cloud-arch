import { BadRequest } from '@feathersjs/errors'
import { checkContext, getItems } from 'feathers-hooks-common'

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

    // let children = await service.find() TODO: Search if the destiny directory (parent_id) is not children of current

    throw new BadRequest('No se puede mover el directorio a esta dirección')
  }
