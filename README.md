# Next.js TypeScript project template

## Requirement

node > 10.12.0

## What is this?

This is a template for Next.js. This. template includes followings:

- TypeScript
- Parameterized routing
- custom server
- styled-components
- cli for new page

## What is the Cli?

This project provides a cli for creating new page. For example, if you want to add a new page named profile, run `npm run new:page profile` commands:

```shell
npm run add:page profile

create new page
  path: /{PROJECT_PATH}/next-ts-template/pages/profile/index.tsx
create new controller
  path: /{PROJECT_PATH}/next-ts-template/controllers/profile/index.tsx
create new layout
  path: /{PROJECT_PATH}/next-ts-template/layouts/profile/index.tsx
create new routes
  pattern:  { page: 'profile/index', pattern: '/profile' }
```

It's command create 3 files and updates 2 file.

### New Page

After the cli ran, a file is created under the pages dir.

The file includes only default export from the controllers.

```js
// pages/profile/index.tsx
export { default } from '@controllers/profile'

```

### New Controller

What is the Controller? I call that a file includes `getInitialProps`  'controller'.

A controller needs to process `getInitialProps`. It is a component but it should not have complex logics for the render. It's obligation is just processing `getInitialProps`.

And the props are passed using Context.

```js
import React from 'react'
import { NextContext } from 'next'
import { AppInitialProps, AppProps } from '@src/app'
import Layout from '@layouts/profile'

interface InitialProps {}

type Query = {}

type Props = AppProps<Query> & InitialProps

export const context = React.createContext<Props>({} as any)

const getInitialProps = async ({

}: NextContext<Query> & AppInitialProps): Promise<InitialProps> => {
  return {}
}

const Page = (props: Props) => (
  <context.Provider value={props}>
    <Layout />
  </context.Provider>
)

Page.getInitialProps = getInitialProps

export default Page
```

### New Layout

The layout is just a React component called by the controller.

And the Layout can receive controller's props using context and useContext.

Controller's props are special props. Because only the controller can process the getInitialProps. So, we often need them at a lot of components.

Context API is very suitable and useContext makes it simpler.

```js
import React, { useContext } from 'react'
import styled from 'styled-components'
import { context } from '@controllers/profile'

const Layout = () => {
  const {} = useContext(context)
  return <Wrapper>Hello World from profile</Wrapper>
}

const Wrapper = styled.div``

export default Layout
```

## Add Parameterized routing

We often need a Parameterized routing. But Next.js has no smart way. So, we can create it easily by using cli.

For example, if you need `/users/:user_id`, you input following argument:

```shell
npm run add:page users/:user_id

create new page
  path: /{PROJECT_PATH}/next-ts-template/pages/users/show.tsx
create new controller
  path: /{PROJECT_PATH}/next-ts-template/controllers/users/show.tsx
create new layout
  path: /{PROJECT_PATH}/next-ts-template/layouts/users/show.tsx
create new routes
  pattern:  {
    page: 'users/show',
    pattern: '/users/:user_id' }
```

Then, you can access `/users/1`!

And the controller can take query parameters. It is created automatically.

```js
// users/show.tsx
...

type Query = {
  user_id: string
}
...
```

And it provides the route creating function `route/createRoute`. If you reference `users_show`, import `user_show` function from `createRoute`. It is added automatically at a creating new page, so you can invoke route path safely.

```js

export const users_show = ({user_id}: {
  user_id: string
}) => ({
  as: `/users/${user_id}`,
  href: `/users/show?user_id=${user_id}`
})

// For example...
<Link {...users_show({ user_id: user.id })}>
...
```


Also multiple query parameters are ok.

```shell
npm run add:page users/:user_id/items/:item_id

create new page
  path: /{PROJECT_PATH}/next-ts-template/pages/users/items/show.tsx
create new controller
  path: /{PROJECT_PATH}/next-ts-template/controllers/users/items/show.tsx
create new layout
  path: /{PROJECT_PATH}/next-ts-template/layouts/users/items/show.tsx
create new routes
  pattern:  {
    page: 'users/items/show',
    pattern: '/users/:user_id/items/:item_id' }
```

```js
// users/items/show.tsx

...

type Query = {
  user_id: string,
  item_id: string
}

...

```

# License
The MIT License (MIT)
