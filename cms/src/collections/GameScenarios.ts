import type { CollectionConfig } from 'payload'

export const GameScenarios: CollectionConfig = {
  slug: 'gameScenarios',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'scenarioType', 'difficulty', 'estimatedDuration'],
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
      label: 'Scenario Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Scenario Slug',
    },
    {
      name: 'scenarioType',
      type: 'select',
      required: true,
      options: [
        { label: 'Economic Crisis', value: 'economic-crisis' },
        { label: 'Inflation Scenario', value: 'inflation' },
        { label: 'Recession Response', value: 'recession' },
        { label: 'Budget Planning', value: 'budget-planning' },
        { label: 'Public Investment', value: 'public-investment' },
        { label: 'Debt Management', value: 'debt-management' },
        { label: 'Employment Crisis', value: 'employment-crisis' },
        { label: 'International Trade', value: 'international-trade' },
        { label: 'Climate Economics', value: 'climate-economics' },
        { label: 'Social Policy', value: 'social-policy' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Scenario Description',
    },
    {
      name: 'backgroundStory',
      type: 'richText',
      required: true,
      label: 'Background Story',
      admin: {
        description: 'The narrative context that sets up the economic situation',
      },
    },
    {
      name: 'learningObjectives',
      type: 'array',
      label: 'Learning Objectives',
      minRows: 1,
      fields: [
        {
          name: 'objective',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'initialConditions',
      type: 'group',
      label: 'Initial Economic Conditions',
      fields: [
        {
          name: 'gdp',
          type: 'number',
          label: 'GDP Growth Rate (%)',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'inflation',
          type: 'number',
          label: 'Inflation Rate (%)',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'unemployment',
          type: 'number',
          label: 'Unemployment Rate (%)',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'publicDebt',
          type: 'number',
          label: 'Public Debt (% of GDP)',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'budgetBalance',
          type: 'number',
          label: 'Budget Balance (% of GDP)',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'interestRate',
          type: 'number',
          label: 'Central Bank Interest Rate (%)',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'publicSentiment',
          type: 'number',
          label: 'Public Sentiment Score (0-100)',
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'crisisEvents',
      type: 'array',
      label: 'Crisis Events',
      fields: [
        {
          name: 'eventTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'eventDescription',
          type: 'richText',
          required: true,
        },
        {
          name: 'triggerRound',
          type: 'number',
          label: 'Trigger at Round',
          defaultValue: 1,
          min: 1,
        },
        {
          name: 'economicImpact',
          type: 'group',
          label: 'Economic Impact',
          fields: [
            {
              name: 'gdpImpact',
              type: 'number',
              label: 'GDP Impact (%)',
              admin: {
                step: 0.1,
              },
            },
            {
              name: 'inflationImpact',
              type: 'number',
              label: 'Inflation Impact (%)',
              admin: {
                step: 0.1,
              },
            },
            {
              name: 'unemploymentImpact',
              type: 'number',
              label: 'Unemployment Impact (%)',
              admin: {
                step: 0.1,
              },
            },
            {
              name: 'sentimentImpact',
              type: 'number',
              label: 'Public Sentiment Impact',
              min: -50,
              max: 50,
            },
          ],
        },
      ],
    },
    {
      name: 'availableRoles',
      type: 'relationship',
      relationTo: 'gameRoles',
      hasMany: true,
      required: true,
      label: 'Available Roles for this Scenario',
    },
    {
      name: 'requiredRoles',
      type: 'relationship',
      relationTo: 'gameRoles',
      hasMany: true,
      label: 'Required Roles (minimum for game to start)',
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
      name: 'estimatedDuration',
      type: 'number',
      required: true,
      label: 'Estimated Duration (minutes)',
      defaultValue: 45,
      min: 15,
      max: 180,
    },
    {
      name: 'maxRounds',
      type: 'number',
      required: true,
      label: 'Maximum Rounds',
      defaultValue: 6,
      min: 3,
      max: 20,
    },
    {
      name: 'successCriteria',
      type: 'array',
      label: 'Success Criteria',
      fields: [
        {
          name: 'criterion',
          type: 'text',
          required: true,
        },
        {
          name: 'targetValue',
          type: 'number',
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'comparisonType',
          type: 'select',
          options: [
            { label: 'Greater than', value: 'gt' },
            { label: 'Less than', value: 'lt' },
            { label: 'Equal to', value: 'eq' },
            { label: 'Between', value: 'between' },
          ],
        },
      ],
    },
    {
      name: 'debriefingQuestions',
      type: 'array',
      label: 'Debriefing Questions',
      fields: [
        {
          name: 'question',
          type: 'textarea',
          required: true,
        },
        {
          name: 'perspective',
          type: 'select',
          options: [
            { label: 'MMT Perspective', value: 'mmt' },
            { label: 'Traditional Perspective', value: 'traditional' },
            { label: 'Comparison', value: 'comparison' },
            { label: 'General Reflection', value: 'general' },
          ],
        },
      ],
    },
    {
      name: 'teacherNotes',
      type: 'richText',
      label: 'Teacher Notes',
      admin: {
        description: 'Private notes for teachers/facilitators',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Scenario',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Scenario',
      admin: {
        description: 'Show in featured scenarios list',
      },
    },
  ],
}
