# Next.js 9 is out!!

This version includes official dynamic routing using file system.

So, you may not need this repository. See this.

https://nextjs.org/blog/next-9#dynamic-route-segments



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

This project provides a cli for creating new page. For example, if you want to add a new page named profile, run `npm run new:page profile` commands:

```shell
npm run new:page profile

create new page
  path: /next-ts-template/pages/profile/index.tsx
create new controller
  path: /next-ts-template/controllers/profile/index.tsx
create new layout
  path: /next-ts-template/layouts/profile/index.tsx
update pattern.json
  pattern:  { page: '/profile', pattern: '/profile' }
update createRoute.ts
  export const profile = () => ({
      as: `/profile`,
      href: `/profile`
    })
```

The command creates 3 files and updates 2 file.

### Page

After the cli ran, a file is created under the pages dir.

The file includes only default export from the controllers.

```js
// pages/profile/index.tsx
export { default } from '@controllers/profile'

```

### Controller

What is the Controller? I call that a file includes `getInitialProps`.

A controller needs to process `getInitialProps`. It is a component but it should not have complex logics for the render. It's obligation is just processing `getInitialProps`.

Since v1.5.0, `PageContext` is added. It provides it's pages's props via React Context API. Components under the page can use them via `usePageContext` hook.

```js
import React, { useContext } from 'react'
import { NextContext } from 'next'
import { AppInitialProps, AppProps } from '@src/app'
import Layout from '@layouts/profile'

interface InitialProps {}

type Query = {}

type Props = AppProps<Query> & InitialProps

const getInitialProps = async ({

}: NextContext<Query> & AppInitialProps): Promise<InitialProps> => {
  return {}
}

const PageContext = React.createContext<AppProps<Query> & InitialProps>({} as any)

const Page = (props: Props) => (
  <PageContext.Provider value={pageProps}>
    <Layout />
  </PageContext.Provider>
)

Page.getInitialProps = getInitialProps

export default Page
export const usePageContext = () => useContext(PageContext)
```

### Layout

The layout is just a React component called by the controller.

```js
import React from 'react'
import styled from 'styled-components'

const Layout = () => {
  return <Wrapper>Hello World from profile</Wrapper>
}

const Wrapper = styled.div``

export default Layout
```

## Add Parameterized routing

We often need a Parameterized routing. But Next.js has no smart way. So, we can create it easily by using cli.

For example, if you need `/users/:id`, you input following argument:

```shell
npm run new:page users/:id

create new page
  path: /next-ts-template/pages/users/_id/index.tsx
create new controller
  path: /next-ts-template/controllers/users/_id/index.tsx
create new layout
  path: /next-ts-template/layouts/users/_id/index.tsx
update pattern.json
  pattern:  { page: '/users/_id', pattern: '/users/:id' }
update createRoute.ts
  export const users__id = ({user_id}: {
    user_id: string
  }) => ({
      as: `/users/${user_id}`,
      href: `/users/_id?user_id=${user_id}`
    })
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

And it provides the route creating function `route/createRoute`. If you reference `users_id`, import `user_id` function from `createRoute`. It is added automatically at a creating new page, so you can invoke route path safely.

```js

export const users_id = ({user_id}: {
  user_id: string
}) => ({
  as: `/users/${user_id}`,
  href: `/users/_id?user_id=${user_id}`
})

// For example...
<Link {...users_id({ user_id: user.id })}>
...
```


Also multiple query parameters are ok.

```shell
npm run new:page users/:id/items/:id

create new page
  path: /next-ts-template/pages/users/_id/items/_id/index.tsx
create new controller
  path: /next-ts-template/controllers/users/_id/items/_id/index.tsx
create new layout
  path: /next-ts-template/layouts/users/_id/items/_id/index.tsx
update pattern.json
  pattern:  { page: '/users/_id/items/_id',
    pattern: '/users/:user_id/items/:item_id' }
update createRoute.ts
  export const users_items_show = ({user_id, item_id}: {
    user_id: string,
    item_id: string
  }) => ({
      as: `/users/${user_id}/items/${item_id}`,
      href: `/users/_id/items/_id?user_id=${user_id}&item_id=${item_id}`
    })
```

```js
// users/_id/items/_id.tsx

...

type Query = {
  user_id: string,
  item_id: string
}

...

```

# Usage
In June 6, 2019, Github released the repository templates feature.(https://github.blog/2019-06-06-generate-new-repositories-with-repository-templates/)
This repository is compatible with it.
Create your repository by clicking 'Use this template' top of the page.

# License
The MIT License (MIT)
