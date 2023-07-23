---
title: react-router-v6 路由懒加载 
date: 2023-7-13 
categories:  
    - react-router
tags: 
  - react-router-v6
  - 懒加载
sticky: 1
---

##  router 路由 v6 版本 (路由懒加载)
```tsx
   const lazyLoad = (src: () => Promise<{ default: React.ComponentType<any>; }>) => <Suspense fallback={<>...</>}>{React.createElement(lazy(src))}</Suspense>;
  {
    path: '/',
    element: lazyLoad(() => import('../pages/Home')),
    children: [
      {
        index: true,
        element: lazyLoad(() => import('../pages/Children'))
      },
      {
        path:'/other',
        element:lazyLoad(()=>import('../pages/Other'))
      }
    ]
  },
```