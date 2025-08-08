import type { CollectionConfig } from 'payload'

export const DecisionOptions: CollectionConfig = {
  slug: 'decisionOptions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'impact', 'availableToRoles'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Decision Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Decision Slug',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Fiscal Policy', value: 'fiscal' },
        { label: 'Monetary Policy', value: 'monetary' },
        { label: 'Social Policy', value: 'social' },
        { label: 'Infrastructure', value: 'infrastructure' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Education', value: 'education' },
        { label: 'Environment', value: 'environment' },
        { label: 'Trade Policy', value: 'trade' },
        { label: 'Labor Policy', value: 'labor' },
        { label: 'Taxation', value: 'taxation' },
        { label: 'Regulation', value: 'regulation' },
        { label: 'Communication', value: 'communication' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Decision Description',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 150,
      label: 'Short Description',
      admin: {
        description: 'Brief description for decision buttons/cards',
      },
    },
    {
      name: 'availableToRoles',
      type: 'relationship',
      relationTo: 'gameRoles',
      hasMany: true,
      required: true,
      label: 'Available to Roles',
    },
    {
      name: 'prerequisites',
      type: 'array',
      label: 'Prerequisites',
      fields: [
        {
          name: 'prerequisiteType',
          type: 'select',
          options: [
            { label: 'Minimum Round', value: 'round' },
            { label: 'Economic Indicator', value: 'economic' },
            { label: 'Previous Decision', value: 'decision' },
            { label: 'Role Cooperation', value: 'cooperation' },
            { label: 'Budget Available', value: 'budget' },
          ],
        },
        {
          name: 'condition',
          type: 'text',
          label: 'Condition Description',
        },
        {
          name: 'value',
          type: 'number',
          label: 'Required Value',
          admin: {
            step: 0.1,
          },
        },
      ],
    },
    {
      name: 'cost',
      type: 'group',
      label: 'Decision Cost',
      fields: [
        {
          name: 'budgetCost',
          type: 'number',
          label: 'Budget Cost (billions)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'politicalCost',
          type: 'number',
          label: 'Political Cost (0-100)',
          min: 0,
          max: 100,
          defaultValue: 0,
        },
        {
          name: 'timeCost',
          type: 'number',
          label: 'Time to Implement (months)',
          defaultValue: 1,
          min: 0,
          max: 60,
        },
      ],
    },
    {
      name: 'immediateEffects',
      type: 'group',
      label: 'Immediate Effects',
      admin: {
        description: 'Effects that happen immediately when decision is made',
      },
      fields: [
        {
          name: 'gdpImpact',
          type: 'number',
          label: 'GDP Impact (%)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'inflationImpact',
          type: 'number',
          label: 'Inflation Impact (%)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'unemploymentImpact',
          type: 'number',
          label: 'Unemployment Impact (%)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'publicSentimentImpact',
          type: 'number',
          label: 'Public Sentiment Impact',
          defaultValue: 0,
          min: -50,
          max: 50,
        },
        {
          name: 'debtImpact',
          type: 'number',
          label: 'Public Debt Impact (% of GDP)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'budgetImpact',
          type: 'number',
          label: 'Budget Balance Impact (% of GDP)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
      ],
    },
    {
      name: 'delayedEffects',
      type: 'array',
      label: 'Delayed Effects',
      admin: {
        description: 'Effects that happen after a delay',
      },
      fields: [
        {
          name: 'delayRounds',
          type: 'number',
          required: true,
          label: 'Delay (rounds)',
          min: 1,
          max: 10,
        },
        {
          name: 'gdpImpact',
          type: 'number',
          label: 'GDP Impact (%)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'inflationImpact',
          type: 'number',
          label: 'Inflation Impact (%)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'unemploymentImpact',
          type: 'number',
          label: 'Unemployment Impact (%)',
          defaultValue: 0,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'publicSentimentImpact',
          type: 'number',
          label: 'Public Sentiment Impact',
          defaultValue: 0,
          min: -50,
          max: 50,
        },
      ],
    },
    {
      name: 'mmtAnalysis',
      type: 'group',
      label: 'MMT Analysis',
      fields: [
        {
          name: 'recommendation',
          type: 'select',
          options: [
            { label: 'Strongly Recommended', value: 'strongly-recommended' },
            { label: 'Recommended', value: 'recommended' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Not Recommended', value: 'not-recommended' },
            { label: 'Strongly Discouraged', value: 'strongly-discouraged' },
          ],
        },
        {
          name: 'reasoning',
          type: 'richText',
          label: 'MMT Reasoning',
        },
        {
          name: 'alternative',
          type: 'richText',
          label: 'MMT Alternative Suggestion',
        },
      ],
    },
    {
      name: 'tradAnalysis',
      type: 'group',
      label: 'Traditional Economics Analysis',
      fields: [
        {
          name: 'recommendation',
          type: 'select',
          options: [
            { label: 'Strongly Recommended', value: 'strongly-recommended' },
            { label: 'Recommended', value: 'recommended' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Not Recommended', value: 'not-recommended' },
            { label: 'Strongly Discouraged', value: 'strongly-discouraged' },
          ],
        },
        {
          name: 'reasoning',
          type: 'richText',
          label: 'Traditional Economics Reasoning',
        },
        {
          name: 'concerns',
          type: 'richText',
          label: 'Traditional Economics Concerns',
        },
      ],
    },
    {
      name: 'playerFeedback',
      type: 'group',
      label: 'Player Feedback Messages',
      fields: [
        {
          name: 'successMessage',
          type: 'richText',
          label: 'Success Message',
        },
        {
          name: 'cautionMessage',
          type: 'richText',
          label: 'Caution Message',
        },
        {
          name: 'failureMessage',
          type: 'richText',
          label: 'Failure Message',
        },
      ],
    },
    {
      name: 'realWorldExamples',
      type: 'array',
      label: 'Real World Examples',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'outcome',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Decision',
    },
  ],
}
