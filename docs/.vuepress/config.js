module.exports = {
    base: '/blogs/',
    title: '涂毒田的博客',
    description: '一点滴，一故事。',
    theme: 'reco',
    //配置主题
    themeConfig: {
        type: "blog",
        author: '涂毒田',
        logo: "https://tse3-mm.cn.bing.net/th/id/OIP-C.dIEcwnGxRI9qemBPD-WuZgHaEK?pid=ImgDet&rs=1",
        authorAvatar: "https://pic1.zhimg.com/v2-dfe83a0d6e64cded0e55dec562e26398_b.jpg",
        nav: [
            { text: "首页", link: "/" },
            {
                text: "涂毒田的博客",
                items: [
                    { text: "掘金", link: "https://juejin.cn/frontend" },
                    { text: "Github", link: "https://github.com/TuduTian" }
                ]
            }
        ],
        subSidebar: 'auto',
        //时间的配置
        locales: {
            "/": {
                lang: "zh-CN",
            },
        },
        // 博客配置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: "博客", // 默认文案 “分类”
            },
            tag: {
                location: 4, // 在导航栏菜单中所占的位置，默认4
                text: "Tag", // 默认文案 “标签”
            },
        },
    },
    //配置樱花特效
    plugins: [
        [
            "sakura",
            {
                num: 20, // 默认数量
                show: true, //  是否显示
                zIndex: -1, // 层级
                img: {
                    replace: false, // false 默认图 true 换图 需要填写httpUrl地址
                },
            },
        ],
        //鼠标点击效果
        [
            "cursor-effects",
            {
                size: 4, // size of the particle, default: 2
                shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
                zIndex: 999999999, // z-index property of the canvas, default: 999999999
            },
        ],

        //音乐播放器的插件
        [
            "@vuepress-reco/vuepress-plugin-bgm-player",
            {
                audios: [
                    {
                        name: "会魔法的老人-法老",
                        artist: "法老-我的偶像",
                        url: "https://ws.stream.qqmusic.qq.com/C400001ToNNm4S1Zdv.m4a?guid=4220211900&vkey=6892313D528D7B805232615BC96EDF803D9CCE3B24E32652BF25B19FBDB7C5A910E853903BDA1B8F35E9951073A041367AD24EE1189C5ECE&uin=&fromtag=123032",
                        cover: "https://ts4.cn.mm.bing.net/th?id=OIP.nk4rn3t4OjUgVQsctVm-vgAAAA&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&o=6&cdv=1&dpr=1.3&pid=18.2",
                    },
                ],
                // 是否默认缩小
                autoShrink: true,
                // 缩小时缩为哪种模式
                shrinkMode: "float",
                // 悬浮窗样式
                floatStyle: { bottom: "20px", "z-index": "999999" },
            },
        ],

    ]
}