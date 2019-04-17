// https://www.chaijs.com/api/
// https://mochajs.org/
// 测试前请确定已经全局安装了 mocha
/*
const expect = require('chai').expect

describe('test/demo.test.js', function () {
  it('not 否定断言', function () {
    expect(function () {}).to.not.throw();
    expect({a: 1}).to.not.have.property('b');
    expect(2).to.not.equal(1);
    expect([1, 2]).to.be.an('array').that.does.not.include(3);
  })
  it('deep 相等', function () {
    // object
    expect({a: 1}).to.deep.equal({a: 1});
    expect([{a: 1}]).to.deep.include({a: 1});
    expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
    // array
    expect([{a: 1}]).to.have.deep.members([{a: 1}]);
    // set
    expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
  })
  it('a 类型判断', function () {
    expect('foo').to.be.a('string');
    expect({a: 1}).to.be.an('object');
    expect(null).to.be.a('null');
    expect(undefined).to.be.an('undefined');
    expect(new Error).to.be.an('error');
    expect(Promise.resolve()).to.be.a('promise');
    expect(new Float32Array).to.be.a('float32array');
    expect(Symbol()).to.be.a('symbol');
  })
})
*/
