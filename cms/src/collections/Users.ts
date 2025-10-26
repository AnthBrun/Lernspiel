import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
      ],
      required: true,
      defaultValue: 'student',
    },
    // ...weitere Felder...
  ],
}
