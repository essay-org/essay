import ajax from '@/assets/scripts/ajax'


export const actions = {
    async nuxtServerInit({ commit, getters, dispatch }, { req, res }) {
        await Promise.all([dispatch('page/getPages'), dispatch('global/getSystemConfig')])
        if (req.cookies.token) {
            // init data
            await ajax.get('/user', {
                headers: {
                    token: req.cookies.token,
                },
            }).then((ret) => {
                if (ret.success) {
                    commit('user/setData', {
                        key: 'user',
                        value: ret.data,
                    })

                    commit('global/setData', {
                        key: 'token',
                        value: req.cookies.token,
                    })
                }
            })
        }
    },
}

export const state = () => ({
})
