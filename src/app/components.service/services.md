# CMF module

Short version: It s the last piece to help developers to organize their code.

## Code organisation

When we talk about code organisation there are two schools:

by technical names, so app folders layout will be:

* components
* * User
* sagas
* * handleUser
* selectors
* * getUsers
* actions
* * addUser

or by feature then by technical names so it will be:

* service.user
* * actions/addUser
* * components/User
* * sagas/handleUser
* * selectors/getUsers

Services will contains selectors to read data, actionCreators, sagas and reducer to write datas and keep consistency. They can also contains dedicated components.

You can split the needs into the following categories:

* *rendering* (handled by components)
* *feature* aka calling APIs to communicate with the backend
* *data projection* into UI (transform backend data to fit component props, today handled by expressions / mapStateToProps)
* *user events effects* the user click in the UI which trigger effects (user -> event -> dispatch action -> saga -> reducer -> store -> render)

## A module is a configuration to put in cmf.bootstrap

It has dependencies and so must be setup as a module using cmf.bootstrap.

That means the index.js should only expose the configuration nothing else.

```javascript
import cmf from "@talend/react-cmf";
import user from './module.user';

cmf.bootstrap(cmf.module.merge(user, ..));
```


## How to create a module

A module should start by a folder at the root of your project
Naming convention is `module.user`

The folder should contains one file or folder by technical names:

* actionCreators
* components
* sagas
* selectors

Then you give to cmf.bootstrap with the `modules` key:

```javascript
import actionCreators from './actionCreators';
import components from './components';
import sagas from './sagas';
import selectors from './selectors';

// This is the CMFModule
export default {
    modules: {
        user: {
            actionCreators,
            sagas,
            saga, // main saga
            selectors,
        },
    },
};
```

## Dependency Injection / How to get a module

Do not import a module, let cmf give it to you. DI let you override when its needed some part of the code.

```javascript
import cmf from "@talend/react-cmf";

function test() {
    const user = cmf.modules.get('user');
    // this is a very low level API
    const action = user.actionCreators.fetchAll();
    // ...
}
```

## Generated API in dedicated context

When you register a module you don t know where it will be used.
It can be used in different context:

* in a component
* in a selector
* in a saga

For this reason when you register a module cmf will add the following API to get a ready to use module in each context:

* cmf.modules.get('user').inComponent(props) (it must be cmfConnected)
* cmf.modules.get('user').inSaga()
* cmf.modules.get('user').inSelector(state)
* cmf.modules.get('user').inExpression(context)

Those accessors will just wrap each APIs to be usefull in this context.

If an API can't be applied it will either: (TODO: choose one or the other)
* doesn t exists (be undefined)
* or throw an Error object

```javascript
// High level API
export function* inSaga() {
	const user = cmf.modules.get('user').inSaga();
	const users = yield user.getAll();
}

export function MyComponent(props) {
	const user = cmf.modules.get('user').inComponent(props);
    user.fetchAll(); // dispatch an action creator
}

export function myExpression({ context }) {
	const user = cmf.modules.get('user').inExpression(context);
	const users = user.getAll();
}
```

## Namespace / Override

TODO: not sure if we should force namespace here to avoid name conflict so the following will be applied only if we keep that feature

CMF main feature is DI so that means we can override any part of the code in the app.

The module name must be unique in an app. It will be used as prefix to register all sub apis.

So an actionCreator named 'getAll' in the 'user' module will be registred under 'actionCreators.module.user.getAll' in the CMF registry

to override during the bootstrap you can do the following:

```javascript
import cmf from '@talend/react-cmf';
import user from '@talend/iam';
import myapp from './cmfModule';

user.modules.user.actionCreators.foo = myFunction
cmf.bootstrap(cmf.module.merge(user, myapp));
```

or in the app module:

```javascript
import user from '@talend/iam';

function getAll() {
    const action = user.modules.user.getAll();
    action.cmf.routerPush = '/myuser/';
    return action;
}

export default {
    registry: {
        'actionCreators.modules.user.getAll': getAll,
    },
    // ===
    actionCreators: {
        'modules.user.getAll': getAll,
    },
};
```

## How to use a component from a module

```javascript
import React from 'react';
import cmf from '@talend/react-cmf';

function MyArticle(props) {
    const user = cmf.modules.get('user').inComponent(props);
    return (
        <article>
            <h1>{props.title}<h1>
            {props.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <p>This article has been written by: <user.UserName userId={props.id} /></p>
        </article>
    )
}
```
