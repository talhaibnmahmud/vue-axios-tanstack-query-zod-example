import { z } from 'zod'

export const authSchema = z.object({
  token: z.string({
    description: 'Sanctum token',
    required_error: 'Token is required',
    invalid_type_error: 'Token is invalid'
  }),
  user: z.object({
    name: z.string({
      description: 'User name',
      required_error: 'User name is required',
      invalid_type_error: 'User name is invalid'
    }),
    email: z
      .string({
        description: 'Email address',
        required_error: 'Email address is required',
        invalid_type_error: 'Email address is invalid'
      })
      .email('Invalid email address'),
    role_id: z.coerce.number({
      description: 'Role ID',
      required_error: 'Role ID is required',
      invalid_type_error: 'Role ID is invalid'
    }),
    create_for_payment: z.coerce.boolean(),
    ip: z.coerce
      .string({
        description: 'IP address',
        required_error: 'IP address is required',
        invalid_type_error: 'IP address is invalid'
      })
      .ip({ version: 'v4', message: 'Invalid IP address' }),
    device_id: z
      .string({
        description: 'Device ID',
        required_error: 'Device ID is required',
        invalid_type_error: 'Device ID is invalid'
      })
      .nullable(),
    is_guest: z.coerce.boolean({
      description: 'Guest status',
      required_error: 'Guest status is required',
      invalid_type_error: 'Guest status is invalid'
    }),
    facebook_id: z.coerce
      .number({
        description: 'Facebook ID',
        required_error: 'Facebook ID is required',
        invalid_type_error: 'Facebook ID is invalid'
      })
      .nullable(),
    updated_at: z
      .string({
        description: 'Updated at',
        required_error: 'Updated at is required',
        invalid_type_error: 'Updated at is invalid'
      })
      .datetime({
        offset: true,
        message: 'Invalid date time'
      }),
    created_at: z
      .string({
        description: 'Created at',
        required_error: 'Created at is required',
        invalid_type_error: 'Created at is invalid'
      })
      .datetime({
        offset: true,
        message: 'Invalid date time'
      }),
    id: z.coerce
      .number({
        description: 'User ID',
        required_error: 'User ID is required',
        invalid_type_error: 'User ID is invalid'
      })
      .positive('User ID must be positive')
      .int('User ID must be an integer'),
    player_id: z.coerce
      .number({
        description: 'Player ID',
        required_error: 'Player ID is required',
        invalid_type_error: 'Player ID is invalid'
      })
      .nullable()
      .optional(),
    user_access_key: z.string({
      description: 'User access key',
      required_error: 'User access key is required',
      invalid_type_error: 'User access key is invalid'
    }),
    activePackage: z.any().nullable().optional(),
    codeDeails: z
      .string({
        description: 'Code details',
        required_error: 'Code details is required',
        invalid_type_error: 'Code details is invalid'
      })
      .nullable()
      .optional(),
    active_code: z.null(),
    my_time: z.object({
      id: z.coerce.number(),
      user_id: z.coerce.number(),
      time: z.coerce.number(),
      used_time: z.coerce.number(),
      total: z.coerce.number(),
      created_at: z.string({
        description: 'Created at',
        required_error: 'Created at is required',
        invalid_type_error: 'Created at is invalid'
      }),
      updated_at: z.string({
        description: 'Updated at',
        required_error: 'Updated at is required',
        invalid_type_error: 'Updated at is invalid'
      })
    })
  })
})

export type AuthType = z.infer<typeof authSchema>

export const demoUser: AuthType = {
  token: '257814|TzDyZhXSWS3JzxBX3pbhX8nlmeQEBrtN3wDzKXwT4f993b28',
  user: {
    name: 'John Doe',
    email: 'john@exampe.com',
    role_id: 1,
    create_for_payment: true,
    ip: '127.0.0.1',
    device_id: 'device-id',
    is_guest: false,
    facebook_id: null,
    updated_at: '2022-01-01T00:00:00',
    created_at: '2022-01-01T00:00:00',
    id: 1,
    player_id: null,
    user_access_key: 'user-access-key',
    activePackage: null,
    codeDeails: null,
    active_code: null,
    my_time: {
      id: 1,
      user_id: 1,
      time: 100,
      used_time: 0,
      total: 100,
      created_at: '2022-01-01T00:00:00',
      updated_at: '2022-01-01T00:00:00'
    }
  }
}
