const { expect } = require('chai')
const mongoose = require('mongoose')
const request = require('supertest')(require('../server/server'))


const Article = mongoose.model('Article')
const Tag = mongoose.model('Tag')

describe('test/article.test.js', () => {
    let token = ''
    let article = null
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
    before((done) => {
        request
            .post('/api/tag')
            .set('Token', token)
            .send({
                name: '标签',
            })
            .end((err, res) => {
                expect(res.body.data).to.be.a('object')
                tag = res.body.data
                done()
            })
    })
    describe('POST /api/article', () => {
        it('添加文章', (done) => {
            request
                .post('/api/article')
                .set('Token', token)
                .send({
                    title: '文章标题',
                    content: '文章内容',
                    tags: [],
                })
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    article = res.body.data
                    done()
                })
        })
    })
    describe('PATCH /api/article', () => {
        it('修改文章', (done) => {
            request
                .patch(`/api/article/${article.id}`)
                .set('Token', token)
                .send({
                    title: '新标题',
                    content: '新内容',
                    tags: [],
                })
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    done()
                })
        })
    })
    describe('GET /api/articles', () => {
        it('获取首页文章列表', (done) => {
            request
                .get('/api/articles')
                .end((err, res) => {
                    expect(res.body.data).to.have.lengthOf(1)
                    done()
                })
        })
    })
    describe('delete /api/article', () => {
        it('删除文章', (done) => {
            request
                .delete(`/api/article/${article.id}`)
                .set('Token', token)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true)
                    done()
                })
        })
    })
    after((done) => {
        Article.deleteMany({}, (err) => {
            if (err) return done(err)
            return done()
        })
    })
    after((done) => {
        Tag.deleteMany({}, (err) => {
            if (err) return done(err)
            return done()
        })
    })
})
