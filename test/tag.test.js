// const app = require('../server')

const { expect } = require('chai')
const mongoose = require('mongoose')
const request = require('supertest')(require('../server/server'))


const Tag = mongoose.model('Tag')

describe('test/tag.test.js', () => {
    let token = ''
    let tag = null
    before((done) => {
        request
            .post('/api/login')
            .send({
                email: 'qq22337383@gmail.com',
                password: '123456',
            })
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                ({ token } = res.body.data) // 无奈，不这么做 eslint 不允许
                done()
            })
    })
    describe('POST /api/tag', () => {
        it('添加标签', (done) => {
            request
                .post('/api/tag')
                .set('Token', token)
                .send({
                    name: '标签',
                })
                .end((err, res) => {
                    expect(res.body.data).to.be.a('object').that.include({ name: '标签' })
                    tag = res.body.data
                    done()
                })
        })
    })
    describe('PATCH /api/tag', () => {
        it('修改标签', (done) => {
            request
                .patch('/api/tag')
                .set('Token', token)
                .send({
                    name: '新标签',
                    id: tag.id,
                })
                .end((err, res) => {
                    expect(res.body.data).to.be.a('object').that.include({ name: '标签' })
                    done()
                })
        })
    })
    describe('delete /api/tag', () => {
        it('删除标签', (done) => {
            request
                .delete(`/api/tag/${tag.id}`)
                .set('Token', token)
                .end((err, res) => {
                    expect(res.body.data).to.be.a('object').that.include({ name: '新标签' })
                    done()
                })
        })
    })
    describe('GET /api/tags', () => {
        it('获取标签', (done) => {
            request
                .get('/api/tags')
                .end((err, res) => {
                    expect(res.body.data).to.be.an('array')
                    done()
                })
        })
    })
    after((done) => {
        Tag.deleteMany({}, (err) => {
            if (err) {
                done(err)
                return
            }
            done()
        })
    })
})
