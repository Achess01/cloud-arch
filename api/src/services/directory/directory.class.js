import { MongoDBService } from '@feathersjs/mongodb'

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DirectoryService extends MongoDBService {
  async remove(id, params) {
    const { query } = params
    const { keepParent = false } = query

    const { fileService } = this.options
    const data = await this.patch(id, {
      is_trash: true
    })

    if (!keepParent) {
      delete data.parent_id
      await this.update(id, data)
    }

    const children = await this.find({
      query: {
        parent_id: id,
        is_trash: false,
        $limit: 50
      }
    })

    const fileChildren = await fileService.find({
      query: {
        parent_id: id,
        is_trash: false,
        $limit: 50
      }
    })

    // Delete sub directories
    for (let child of children.data) {
      await this.remove(child._id, { query: { keepParent: true } })
    }

    // Delete files inside
    console.log(fileChildren)
    for (let child of fileChildren.data) {
      await fileService.remove(child._id, { query: { keepParent: true } })
    }

    return { message: 'deleted' }
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('directory')),
    fileService: app.service('file')
  }
}
