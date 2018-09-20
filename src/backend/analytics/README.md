# Analytics

The goal is to analyse the FS from a path to find informations.


```javascript
[
    {
        path: 'src/app/component/MyComponent/index.js',
        type: 'index',
        export: [{ default: true, id: 'MyComponent', type: 'import' }]
        dependencies: [ './MyComponent.connect.js']
    },
    {
        path: 'src/app/component/MyComponent/MyComponent.connect.js'
        type: 'cmfConnect',
        withPropTypes: false,
        export: 'default'
        dependencies: ['@talend/react-cmf']
    },
    {
        path: 'src/app/component/MyComponent/MyComponent.component.js'
        type: 'function',
        withPropTypes: true,
        export: 'default',
        dependencies: ['React', 'prop-types'],
    },
]
```
