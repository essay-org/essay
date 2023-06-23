'use strict';
const { uid } = require('uid');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const mkdirp = require('mz-modules/mkdirp');
const Jimp = require('jimp');
const pump = require('mz-modules/pump');
const Service = require('egg').Service;

class PostService extends Service {
  async save({ id = '', ...rest }) {
    // 创建/更新成功返回id
    let result = null;
    if (id) {
      result = await this.ctx.model.Post.update({ id }, {
        ...rest,
      });
      result && (result = id);
    } else {
      const newId = uid();
      await this.ctx.model.Post.create({
        id: newId,
        ...rest,
      });
      result = newId;
    }
    return result;
  }
  async remove(id) {
    const result = await this.ctx.model.Post.remove({ id });
    return result;
  }
  async find(query) {
    const result = query.id
      ? await this.ctx.model.Post.findOne(query)
      : await this.ctx.model.Post.find(query).order({ isTop: 'desc', createdAt: 'desc' });

    return result;
  }
  async findByPage(query) {
    const { page = 1, limit = 15 } = query;
    const result = await this.ctx.model.Post.find(query).order({ isTop: 'desc', createdAt: 'desc' })
      .limit(limit)
      .offset(limit * (page - 1));
    return result;
  }

  async totalCount() {
    return await this.ctx.model.Post.find({ status: 'pushed' }).count();
  }
  async pre({ createdAt }) {
    const data = await this.ctx.model.Post.findOne({ createdAt: { $lt: createdAt }, status: 'pushed' });
    return data && {
      id: data.id,
      title: data.title,
    };
  }

  async next({ createdAt }) {
    const data = await this.ctx.model.Post.findOne({ createdAt: { $gt: createdAt }, status: 'pushed' });
    return data && {
      id: data.id,
      title: data.title,
    };
  }
  async upload(enableThumbnail) {
    const parts = this.ctx.multipart({ autoFields: true });
    let stream = null;
    let body = {};
    while ((stream = await parts()) !== null) {
      if (!(stream && stream.filename)) break;
      const { filename, fieldname } = stream;

      const { uploadFilepath, saveFilepath } = await this.createFolder(
        filename
      );

      const writeStream = await fs.createWriteStream(uploadFilepath);
      await pump(stream, writeStream);
      if (enableThumbnail) this.jimp(uploadFilepath); // 生成缩略图
      body = Object.assign(parts.field, { [fieldname]: saveFilepath });
    }
    body = Object.assign(body, parts.field);
    return body;
  }

  async jimp(target) {
    await Jimp.read(target, (err, lenna) => {
      // lenna.resize(400, Jimp.AUTO)
      if (err) throw err;
      lenna.quality(80).write(target + '?q80');
      lenna.quality(60).write(target + '?q60');
    });
  }

  async createFolder(filename) {
    // 根据日期创建文件夹，并把文件按照时间戳方式命名
    const day = dayjs().format('YYYYMMDD');
    const dir = path.join('app/public/media', day);
    await mkdirp(dir);
    const uploadFilepath = path.join(dir, Date.now() + path.extname(filename));
    return {
      uploadFilepath,
      saveFilepath: uploadFilepath.slice(3).replace(/\\/g, '/'),
    };
  }
}

module.exports = PostService;
