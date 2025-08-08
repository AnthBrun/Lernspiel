import type { CollectionConfig } from 'payload'

export const LearningContent: CollectionConfig = {
  slug: 'learningContent',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'contentType', 'difficulty', 'topic'],
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
      label: 'Content Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Content Slug',
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Explanation', value: 'explanation' },
        { label: 'Case Study', value: 'case-study' },
        { label: 'Comparison', value: 'comparison' },
        { label: 'Historical Example', value: 'historical' },
        { label: 'Quiz', value: 'quiz' },
        { label: 'Interactive Simulation', value: 'simulation' },
        { label: 'Video', value: 'video' },
        { label: 'Reading Material', value: 'reading' },
        { label: 'Glossary Entry', value: 'glossary' },
      ],
    },
    {
      name: 'topic',
      type: 'select',
      required: true,
      options: [
        { label: 'Modern Monetary Theory', value: 'mmt' },
        { label: 'Traditional Economics', value: 'traditional' },
        { label: 'Fiscal Policy', value: 'fiscal-policy' },
        { label: 'Monetary Policy', value: 'monetary-policy' },
        { label: 'Inflation', value: 'inflation' },
        { label: 'Employment', value: 'employment' },
        { label: 'Government Debt', value: 'debt' },
        { label: 'Budget Deficits', value: 'deficits' },
        { label: 'Economic Growth', value: 'growth' },
        { label: 'Trade Balance', value: 'trade' },
        { label: 'Central Banking', value: 'central-banking' },
        { label: 'Currency Sovereignty', value: 'currency-sovereignty' },
        { label: 'Job Guarantee', value: 'job-guarantee' },
        { label: 'Basic Income', value: 'basic-income' },
        { label: 'Economic Crises', value: 'crises' },
      ],
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
      name: 'estimatedReadTime',
      type: 'number',
      label: 'Estimated Read Time (minutes)',
      min: 1,
      max: 120,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Main Content',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: 'Content Summary',
    },
    {
      name: 'keyPoints',
      type: 'array',
      label: 'Key Learning Points',
      minRows: 1,
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'mmtPerspective',
      type: 'group',
      label: 'MMT Perspective',
      fields: [
        {
          name: 'position',
          type: 'richText',
          label: 'MMT Position',
        },
        {
          name: 'keyArguments',
          type: 'array',
          label: 'Key MMT Arguments',
          fields: [
            {
              name: 'argument',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'evidence',
          type: 'richText',
          label: 'Supporting Evidence',
        },
      ],
    },
    {
      name: 'tradPerspective',
      type: 'group',
      label: 'Traditional Economics Perspective',
      fields: [
        {
          name: 'position',
          type: 'richText',
          label: 'Traditional Position',
        },
        {
          name: 'keyArguments',
          type: 'array',
          label: 'Key Traditional Arguments',
          fields: [
            {
              name: 'argument',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'evidence',
          type: 'richText',
          label: 'Supporting Evidence',
        },
      ],
    },
    {
      name: 'comparisonPoints',
      type: 'array',
      label: 'Direct Comparison Points',
      admin: {
        description: 'Side-by-side comparison of MMT vs Traditional views',
      },
      fields: [
        {
          name: 'aspect',
          type: 'text',
          required: true,
          label: 'Economic Aspect',
        },
        {
          name: 'mmtView',
          type: 'textarea',
          required: true,
          label: 'MMT View',
        },
        {
          name: 'traditionalView',
          type: 'textarea',
          required: true,
          label: 'Traditional View',
        },
        {
          name: 'practicalImplication',
          type: 'textarea',
          label: 'Practical Implications',
        },
      ],
    },
    {
      name: 'realWorldExamples',
      type: 'array',
      label: 'Real World Examples',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'timeframe',
          type: 'text',
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
        {
          name: 'lessonLearned',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'prerequisites',
      type: 'array',
      label: 'Prerequisites',
      admin: {
        description: 'Other content that should be understood first',
      },
      fields: [
        {
          name: 'content',
          type: 'text',
          required: true,
          label: 'Content Slug',
        },
        {
          name: 'importance',
          type: 'select',
          required: true,
          options: [
            { label: 'Essential', value: 'essential' },
            { label: 'Recommended', value: 'recommended' },
            { label: 'Helpful', value: 'helpful' },
          ],
        },
      ],
    },
    {
      name: 'followUpContent',
      type: 'array',
      label: 'Follow-up Content',
      admin: {
        description: 'Content to explore next',
      },
      fields: [
        {
          name: 'content',
          type: 'text',
          required: true,
          label: 'Content Slug',
        },
        {
          name: 'reason',
          type: 'text',
          label: 'Why this follows logically',
        },
      ],
    },
    {
      name: 'media',
      type: 'array',
      label: 'Associated Media',
      fields: [
        {
          name: 'mediaFile',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mediaType',
          type: 'select',
          options: [
            { label: 'Illustration', value: 'illustration' },
            { label: 'Chart/Graph', value: 'chart' },
            { label: 'Video', value: 'video' },
            { label: 'Audio', value: 'audio' },
            { label: 'Document', value: 'document' },
          ],
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Media Caption',
        },
      ],
    },
    {
      name: 'quiz',
      type: 'group',
      label: 'Interactive Quiz',
      admin: {
        condition: (_, { contentType }) => contentType === 'quiz',
      },
      fields: [
        {
          name: 'questions',
          type: 'array',
          label: 'Quiz Questions',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Multiple Choice', value: 'multiple-choice' },
                { label: 'True/False', value: 'true-false' },
                { label: 'Short Answer', value: 'short-answer' },
                { label: 'Ranking', value: 'ranking' },
              ],
            },
            {
              name: 'options',
              type: 'array',
              label: 'Answer Options',
              admin: {
                condition: (_, { type }) => type === 'multiple-choice' || type === 'ranking',
              },
              fields: [
                {
                  name: 'option',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'isCorrect',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'correctAnswer',
              type: 'text',
              label: 'Correct Answer',
              admin: {
                condition: (_, { type }) => type === 'true-false' || type === 'short-answer',
              },
            },
            {
              name: 'explanation',
              type: 'richText',
              required: true,
              label: 'Answer Explanation',
            },
            {
              name: 'mmtExplanation',
              type: 'richText',
              label: 'MMT Perspective on Answer',
            },
            {
              name: 'traditionalExplanation',
              type: 'richText',
              label: 'Traditional Perspective on Answer',
            },
          ],
        },
        {
          name: 'passingScore',
          type: 'number',
          label: 'Passing Score (%)',
          min: 50,
          max: 100,
          defaultValue: 70,
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
      name: 'targetAudience',
      type: 'array',
      label: 'Target Audience',
      fields: [
        {
          name: 'audience',
          type: 'select',
          options: [
            { label: 'Students', value: 'students' },
            { label: 'Teachers', value: 'teachers' },
            { label: 'Policymakers', value: 'policymakers' },
            { label: 'General Public', value: 'public' },
            { label: 'Economists', value: 'economists' },
            { label: 'Business Leaders', value: 'business' },
          ],
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        date: {
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      label: 'Published',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Content',
    },
  ],
}
