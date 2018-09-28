# Analytics

The goal is to analyse the FS from a path to find informations.
		dependencies: [
			{ source: 'react', default: true, name: 'React' },
			{ source: 'cmfConnect', default: false, name: '@talend/react-cmf' },
		]


```javascript
[
    {
        path: 'src/app/component/MyComponent/index.js',
        type: 'index',
        export: [{ default: true, id: 'MyComponent', type: 'import' }]
        dependencies: [
            {
                source: './MyComponent.connect.js',
                name: 'MyComponent',
                default: true,
            }
        ]
    },
    {
        path: 'src/app/component/MyComponent/MyComponent.connect.js'
        type: 'cmfConnect',
        withPropTypes: false,
        export: 'default'
        dependencies: [
            {
                source: '@talend/react-cmf',
                name: 'cmf',
                default: true,
            }
        ]
    },
    {
        path: 'src/app/component/MyComponent/MyComponent.component.js'
        type: 'function',
        withPropTypes: true,
        export: 'default',
        dependencies: [
            {
                source: 'React',
                name: 'react',
                default: true,
            },
            {
                source: 'prop-types',
                name: 'PropTypes',
                default: true,
            },
        ],
    },
]
```
