/**
 * 请勿修改该文件
 */
module.exports = [
    {
        name: 'all',
        description: '所有权限',
        code: 100000,
    },
    {
        name: 'articles',
        description: '文章管理',
        code: 100100,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100101,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100102,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100103,
            },
        ],
    },
    {
        name: 'tags',
        description: '标签管理',
        code: 100200,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100201,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100202,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100203,
            },
        ],
    },
    {
        name: 'categories',
        description: '分类管理',
        code: 100300,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100301,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100302,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100303,
            },
        ],
    },
    {
        name: 'mediums',
        description: '媒体库管理',
        code: 100400,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100401,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100402,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100403,
            },
        ],
    },
    {
        name: 'users',
        description: '用户管理',
        code: 100500,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100501,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100502,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100503,
            },
        ],
    },
    {
        name: 'pages',
        description: '单页管理',
        code: 100600,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100601,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100602,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100603,
            },
        ],
    },
    {
        name: 'comments',
        description: '评论管理',
        code: 100700,
        authorities: [
            {
                name: 'create',
                description: '新增',
                code: 100701,
            },
            {
                name: 'edit',
                description: '编辑',
                code: 100702,
            },
            {
                name: 'delete',
                description: '删除',
                code: 100703,
            },
        ],
    },
]
