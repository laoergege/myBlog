export default {
    APIADDR: process.env.API_ROOT,

    BOOKSADDR: '/markbooks/articles/all',

    // 主页展示配置
    HOME_CONFIG: [
        {
            "markbook": "Top posts", "icon": "#icon-jiangbei", "theme": "item", "tops": []
        },
        {
            "markbook": "Angular", "icon": "#icon-angular", "theme": "item", "tops": []
        },
        {
            "markbook": "Vue", "icon": "#icon-vuejs", "theme": "item", "tops": []
        },
        {
            "markbook": "JavaScript", "icon": "#icon-JS", "theme": "item", "tops": []
        }
    ],

    GITMEN_CONFIG: {
        owner: 'laoergege',
        repo: 'blogComment',
        oauth: {
          client_id: '49ecffd2b6139e31b3aa',
          client_secret: 'f79a9c45f39b745f8ce4a66956949300fc0d4c14',
        },
    }
}
