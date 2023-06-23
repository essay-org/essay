FROM node:18
FROM nouchka/sqlite3

LABEL maintainer="qq22337383@gmail.com"

# 这个是容器中的文件目录
RUN mkdir -p /usr/src/essay 

# 设置工作目录
WORKDIR /usr/src/essay

COPY package.json ./

RUN npm config set registry https://registry.npm.taobao.org && npm install -g --force yarn && yarn install --production

# 拷贝所有源代码到工作目
COPY . .

# 暴露容器端口
EXPOSE 7001

CMD [ "sh", "-c", "npm start" ]