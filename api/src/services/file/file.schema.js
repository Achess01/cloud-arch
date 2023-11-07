// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const fileSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'File', additionalProperties: false }
)
export const fileValidator = getValidator(fileSchema, dataValidator)
export const fileResolver = resolve({})

export const fileExternalResolver = resolve({})

// Schema for creating new entries
export const fileDataSchema = Type.Pick(fileSchema, ['text'], {
  $id: 'FileData'
})
export const fileDataValidator = getValidator(fileDataSchema, dataValidator)
export const fileDataResolver = resolve({})

// Schema for updating existing entries
export const filePatchSchema = Type.Partial(fileSchema, {
  $id: 'FilePatch'
})
export const filePatchValidator = getValidator(filePatchSchema, dataValidator)
export const filePatchResolver = resolve({})

// Schema for allowed query properties
export const fileQueryProperties = Type.Pick(fileSchema, ['_id', 'text'])
export const fileQuerySchema = Type.Intersect(
  [
    querySyntax(fileQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const fileQueryValidator = getValidator(fileQuerySchema, queryValidator)
export const fileQueryResolver = resolve({})
