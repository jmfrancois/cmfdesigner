# Analytics scripts

The goal is to analyse the FS from a path to find the following informations:

* current component exposed
* is cmfConnect
* is connect
* is es6
* is arrow funct

```javascript
[
    {
        id: undefined,  // ok for default export
        type: 'index',
        path: 'src/app/component/MyComponent/index.js',
        withPropTypes: false,
        export: 'default'
        dependencies: []
        localDependencies: ['src/app/component/MyComponent.connect.js']
    },
    {
        id: undefined,  // ok for default export
        type: 'cmfConnect',
        path: 'src/app/component/MyComponent/MyComponent.connect.js'
        withPropTypes: false,
        export: 'default'
        dependencies: ['@talend/react-cmf']
        localDependencies: ['src/app/component/MyComponent.component.js']
    },
    {
        id: 'MyComponent',
        type: 'function',
        withPropTypes: true,
        path: 'src/app/component/MyComponent/MyComponent.component.js'
        export: 'default',
        dependencies: ['React', 'prop-types'],
    },
]
```
