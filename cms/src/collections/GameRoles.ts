import type { CollectionConfig } from 'payload'

export const GameRoles: CollectionConfig = {
  slug: 'gameRoles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'roleType', 'maxPlayers', 'difficulty'],
  },
  access: {
    read: () => true, // Public access for game frontend
    create: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Role Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Role Slug',
      admin: {
        description: 'Used for API calls (e.g., "finance-minister", "central-banker")',
      },
    },
    {
      name: 'roleType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Government Official',
          value: 'government',
        },
        {
          label: 'Central Bank',
          value: 'central-bank',
        },
        {
          label: 'Opposition Party',
          value: 'opposition',
        },
        {
          label: 'Media Representative',
          value: 'media',
        },
        {
          label: 'Citizen/Public',
          value: 'citizen',
        },
        {
          label: 'Business Leader',
          value: 'business',
        },
        {
          label: 'Academic/Economist',
          value: 'academic',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Role Description',
      admin: {
        description: 'Detailed explanation of the role for players',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      label: 'Short Description',
      admin: {
        description: 'Brief description for role selection screen',
      },
    },
    {
      name: 'responsibilities',
      type: 'array',
      label: 'Key Responsibilities',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'responsibility',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'powers',
      type: 'array',
      label: 'Available Powers/Actions',
      fields: [
        {
          name: 'powerName',
          type: 'text',
          required: true,
          label: 'Power Name',
        },
        {
          name: 'powerDescription',
          type: 'textarea',
          required: true,
          label: 'Power Description',
        },
        {
          name: 'economicImpact',
          type: 'select',
          options: [
            { label: 'High Impact', value: 'high' },
            { label: 'Medium Impact', value: 'medium' },
            { label: 'Low Impact', value: 'low' },
          ],
        },
        {
          name: 'mmtPerspective',
          type: 'richText',
          label: 'MMT Perspective',
          admin: {
            description: 'How MMT views this power/action',
          },
        },
        {
          name: 'traditionalPerspective',
          type: 'richText',
          label: 'Traditional Economics Perspective',
          admin: {
            description: 'How traditional economics views this power/action',
          },
        },
      ],
    },
    {
      name: 'informationAccess',
      type: 'group',
      label: 'Information Access Level',
      fields: [
        {
          name: 'economicData',
          type: 'select',
          options: [
            { label: 'Full Access', value: 'full' },
            { label: 'Partial Access', value: 'partial' },
            { label: 'Public Data Only', value: 'public' },
            { label: 'Limited Access', value: 'limited' },
          ],
        },
        {
          name: 'budgetData',
          type: 'select',
          options: [
            { label: 'Full Access', value: 'full' },
            { label: 'Partial Access', value: 'partial' },
            { label: 'Public Data Only', value: 'public' },
            { label: 'No Access', value: 'none' },
          ],
        },
        {
          name: 'publicSentiment',
          type: 'select',
          options: [
            { label: 'Real-time Data', value: 'realtime' },
            { label: 'Delayed Data', value: 'delayed' },
            { label: 'Polls Only', value: 'polls' },
            { label: 'No Access', value: 'none' },
          ],
        },
      ],
    },
    {
      name: 'maxPlayers',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
      max: 10,
      label: 'Maximum Players for this Role',
    },
    {
      name: 'difficulty',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
    },
    {
      name: 'gameplayTips',
      type: 'array',
      label: 'Gameplay Tips',
      fields: [
        {
          name: 'tip',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Role Avatar/Icon',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Role',
      admin: {
        description: 'Uncheck to temporarily disable this role',
      },
    },
  ],
}
