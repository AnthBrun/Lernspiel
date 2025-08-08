import type { CollectionConfig } from 'payload'

export const EconomicIndicators: CollectionConfig = {
  slug: 'economicIndicators',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'currentValue', 'trend', 'category'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Indicator Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Indicator Slug',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Growth & Output', value: 'growth' },
        { label: 'Employment', value: 'employment' },
        { label: 'Inflation & Prices', value: 'inflation' },
        { label: 'Fiscal Policy', value: 'fiscal' },
        { label: 'Monetary Policy', value: 'monetary' },
        { label: 'Trade & Balance', value: 'trade' },
        { label: 'Social Indicators', value: 'social' },
        { label: 'Market Confidence', value: 'confidence' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Indicator Description',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 100,
      label: 'Short Description',
    },
    {
      name: 'unit',
      type: 'text',
      required: true,
      label: 'Unit of Measurement',
      admin: {
        description: 'e.g., %, billions, points, index',
      },
    },
    {
      name: 'currentValue',
      type: 'number',
      required: true,
      label: 'Current Value',
      admin: {
        step: 0.01,
      },
    },
    {
      name: 'baselineValue',
      type: 'number',
      required: true,
      label: 'Baseline Value',
      admin: {
        description: 'Starting value for scenarios',
        step: 0.01,
      },
    },
    {
      name: 'historicalValues',
      type: 'array',
      label: 'Historical Values',
      fields: [
        {
          name: 'period',
          type: 'text',
          required: true,
          label: 'Period',
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          admin: {
            step: 0.01,
          },
        },
      ],
    },
    {
      name: 'trend',
      type: 'select',
      required: true,
      options: [
        { label: 'Improving', value: 'improving' },
        { label: 'Stable', value: 'stable' },
        { label: 'Declining', value: 'declining' },
        { label: 'Volatile', value: 'volatile' },
      ],
    },
    {
      name: 'ranges',
      type: 'group',
      label: 'Value Ranges',
      fields: [
        {
          name: 'optimal',
          type: 'group',
          label: 'Optimal Range',
          fields: [
            {
              name: 'min',
              type: 'number',
              label: 'Minimum',
              admin: {
                step: 0.01,
              },
            },
            {
              name: 'max',
              type: 'number',
              label: 'Maximum',
              admin: {
                step: 0.01,
              },
            },
          ],
        },
        {
          name: 'acceptable',
          type: 'group',
          label: 'Acceptable Range',
          fields: [
            {
              name: 'min',
              type: 'number',
              label: 'Minimum',
              admin: {
                step: 0.01,
              },
            },
            {
              name: 'max',
              type: 'number',
              label: 'Maximum',
              admin: {
                step: 0.01,
              },
            },
          ],
        },
        {
          name: 'critical',
          type: 'group',
          label: 'Critical Thresholds',
          fields: [
            {
              name: 'dangerLow',
              type: 'number',
              label: 'Danger Low',
              admin: {
                step: 0.01,
              },
            },
            {
              name: 'dangerHigh',
              type: 'number',
              label: 'Danger High',
              admin: {
                step: 0.01,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'formula',
      type: 'code',
      label: 'Calculation Formula',
      admin: {
        language: 'javascript',
        description: 'JavaScript formula for calculating this indicator',
      },
    },
    {
      name: 'dependencies',
      type: 'array',
      label: 'Dependencies',
      admin: {
        description: 'Other indicators that affect this one',
      },
      fields: [
        {
          name: 'indicator',
          type: 'text',
          required: true,
          label: 'Indicator Slug',
        },
        {
          name: 'weight',
          type: 'number',
          required: true,
          label: 'Impact Weight',
          min: 0,
          max: 1,
          admin: {
            step: 0.01,
          },
        },
        {
          name: 'relationship',
          type: 'select',
          required: true,
          options: [
            { label: 'Positive', value: 'positive' },
            { label: 'Negative', value: 'negative' },
            { label: 'Complex', value: 'complex' },
          ],
        },
      ],
    },
    {
      name: 'visibilityRoles',
      type: 'array',
      label: 'Visible to Roles',
      admin: {
        description: 'Which roles can see this indicator',
      },
      fields: [
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'Role Slug',
        },
        {
          name: 'precision',
          type: 'select',
          required: true,
          options: [
            { label: 'Exact', value: 'exact' },
            { label: 'Rounded', value: 'rounded' },
            { label: 'Range', value: 'range' },
            { label: 'Trend Only', value: 'trend' },
          ],
        },
        {
          name: 'delay',
          type: 'number',
          label: 'Information Delay (rounds)',
          defaultValue: 0,
          min: 0,
          max: 5,
        },
      ],
    },
    {
      name: 'mmtPerspective',
      type: 'group',
      label: 'MMT Perspective',
      fields: [
        {
          name: 'importance',
          type: 'select',
          options: [
            { label: 'Critical', value: 'critical' },
            { label: 'Important', value: 'important' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Low Priority', value: 'low' },
            { label: 'Misleading', value: 'misleading' },
          ],
        },
        {
          name: 'analysis',
          type: 'richText',
          label: 'MMT Analysis',
        },
        {
          name: 'preferredRange',
          type: 'group',
          label: 'MMT Preferred Range',
          fields: [
            {
              name: 'min',
              type: 'number',
              admin: {
                step: 0.01,
              },
            },
            {
              name: 'max',
              type: 'number',
              admin: {
                step: 0.01,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'traditionalPerspective',
      type: 'group',
      label: 'Traditional Economics Perspective',
      fields: [
        {
          name: 'importance',
          type: 'select',
          options: [
            { label: 'Critical', value: 'critical' },
            { label: 'Important', value: 'important' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Low Priority', value: 'low' },
          ],
        },
        {
          name: 'analysis',
          type: 'richText',
          label: 'Traditional Analysis',
        },
        {
          name: 'preferredRange',
          type: 'group',
          label: 'Traditional Preferred Range',
          fields: [
            {
              name: 'min',
              type: 'number',
              admin: {
                step: 0.01,
              },
            },
            {
              name: 'max',
              type: 'number',
              admin: {
                step: 0.01,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publicDisplay',
      type: 'group',
      label: 'Public Display Settings',
      fields: [
        {
          name: 'showOnDashboard',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show on Dashboard',
        },
        {
          name: 'chartType',
          type: 'select',
          options: [
            { label: 'Line Chart', value: 'line' },
            { label: 'Bar Chart', value: 'bar' },
            { label: 'Gauge', value: 'gauge' },
            { label: 'Number', value: 'number' },
            { label: 'Trend Arrow', value: 'trend' },
          ],
          defaultValue: 'number',
        },
        {
          name: 'displayOrder',
          type: 'number',
          label: 'Display Order',
          defaultValue: 0,
        },
        {
          name: 'color',
          type: 'text',
          label: 'Chart Color',
          defaultValue: '#3b82f6',
          admin: {
            description: 'Hex color code for charts',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Indicator',
    },
  ],
}
