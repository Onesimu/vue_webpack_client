const menus=[
    {
      name:'首页',
      path:'main.html',
      sort:0,
      show:true,
      icon:'&#xe690;',
      childs:[
        {
          name:'首页',
          path:'/main',
          icon:'&#xe690;',
          code:'home',
          show:true,
          sort:1
        }
      ]
    }
  ]

export const CHANNELS = menus.filter(v=>v.show).sort((a,b)=>a.sort-b.sort)
