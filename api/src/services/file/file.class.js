import { MongoDBService } from '@feathersjs/mongodb'

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class FileService extends MongoDBService {
  async remove(id, params) {
    const { query } = params
    const { keepParent = false } = query
    const instance = await this.get(id)
    if (instance.is_shared) return super.remove(id, params)

    let data = await this.patch(id, {
      is_trash: true
    })

    if (!keepParent) {
      delete data.parent_id
      data = await this.update(id, data)
    }

    return data
  }

}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('file'))
  }
}
