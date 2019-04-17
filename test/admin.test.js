const { expect } = require('chai')
const mongoose = require('mongoose')

const request = require('supertest')(require('../server/server'))

const User = mongoose.model('User')

describe('test/admin.test.js', () => {
    let token = ''
    before((done) => {
        request
            .post('/api/login')
            .send({
                email: 'qq22337383@gmail.com',
                password: '123456',
            })
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                ({ token } = res.body.data)
                done()
            })
    })
    describe('GET /api/user', () => {
        it('获取管理员信息', (done) => {
            request
                .get('/api/user')
                .set('Token', token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    done()
                })
        })
    })
    describe('PATCH /api/user', () => {
        it('修改管理员信息', (done) => {
            request
                .patch('/api/user')
                .set('Token', token)
                .send({
                    description: 'hello world',
                })
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    done()
                })
        })
    })
    describe('POST /api/logout', () => {
        it('退出登录', (done) => {
            request
                .post('/api/logout')
                .set('Token', token)
                .end((err, res) => {
                    expect(res.headers['set-cookie']).to.not.contain('token')
                    done()
                })
        })
    })
})
