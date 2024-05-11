import { z } from 'zod'

export const postSchema = z.object({
  id: z
    .number({
      message: 'id is required',
      description: 'ID of the post',
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a number'
    })
    .int('ID must be an integer')
    .positive('ID must be a positive number'),
  userId: z
    .number({
      message: 'userId is required',
      description: 'User ID of the post',
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a number'
    })
    .int('User ID must be an integer')
    .positive('User ID must be a positive number'),
  title: z.string({
    message: 'title is required',
    description: 'Title of the post',
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  body: z.string({
    message: 'body is required',
    description: 'Body of the post',
    required_error: 'Body is required',
    invalid_type_error: 'Body must be a string'
  })
})

export type Post = z.infer<typeof postSchema>
