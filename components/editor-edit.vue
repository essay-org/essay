<template>
    <div
        class="editor-edit"
        :style="{zIndex:zIndex, height:realHeight}"
        :class="{'full-screen':isFullScreen}"
    >
        <div class="editor-wrap">
            <!-- 菜单栏 -->
            <div class="editor-menu">
                <div class="menu-group-left">
                    <i
                        class="wmui icon-image"
                        title="上传图片 Ctrl+g"
                        hotkey="Ctrl+g"
                        @click="uploadClick"
                        v-if="uploadOpt.url"
                    >
                        <input
                            ref="upload"
                            type="file"
                            :name="uploadOpt.name"
                            v-show="false"
                            :accept="uploadOpt.accept"
                            @change="fileUpload"
                        >
                    </i>
                    <i
                        class="wmui icon-undo"
                        title="撤销 Ctrl+z"
                        @click="undo"
                        hotkey="Ctrl+z"
                        :class="{'disable':!canUndo}"
                    ></i>
                    <i
                        class="wmui icon-redo"
                        title="恢复 Ctrl+y"
                        @click="redo"
                        hotkey="Ctrl+y"
                        :class="{'disable':!canRedo}"
                    ></i>
                    <i
                        class="wmui icon-preview"
                        @click="doPreview"
                        title="预览"
                    ></i>
                    <i
                        class="wmui icon-save"
                        title="保存 Ctrl+s"
                        @click="doSave"
                        hotkey="Ctrl+s"
                    ></i>
                </div>
                <div class="menu-group-right">
                    <i
                        class="wmui icon-fullscreen"
                        @click="isFullScreen = !isFullScreen"
                        title="全屏"
                    ></i>
                </div>
            </div>
            <!-- 内容区 -->
            <div class="editor-content">
                <div class="content-wrap">
                    <!-- 编辑区 -->
                    <textarea
                        class="content-editor"
                        v-model="content"
                        @scroll="scrollReset"
                        @keydown="keydown"
                        @paste="pasteEvent"
                        ref="editor"
                        v-show="showContent"
                        autocapitalize="off"
                    ></textarea>
                    <!-- 预览区 -->
                    <base-editor-preview
                        ref="preview"
                        v-show="showPreview"
                        :content="content"
                        :options="options"
                    ></base-editor-preview>
                </div>
                <transition name="wmui-animation-fade">
                    <div
                        class="upload-status"
                        :class="statusMessage.type"
                        v-show="statusMessage.show"
                    >{{statusMessage.text}}</div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import BaseEditorPreview from './editor-preview.vue'

const isServer = Vue.prototype.$isServer || process.server
// 选中内容的位置
function getEditorSelection(editor) {
    return {
        start: editor.selectionStart,
        end: editor.selectionEnd,
    }
}
// 设置选中区域
function setEditorRange(editor, start, length = 0) {
    editor.setSelectionRange(start, start + length)
    editor.focus()
}
export default {
    name: 'BaseEditorEdit',
    props: {
        value: {
            type: String,
            default: '',
        },
        options: {
            type: Object,
        },
        upload: {
            type: Object,
        },
        zIndex: {
            type: Number,
            default: 999,
        },
        height: {
            type: String,
            default: '70vh',
        },
        preview: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            content: '',
            html: '',
            history: [],
            uploadOpt: {
                name: 'file',
                accept: 'image/jpg,image/jpeg,image/png,image/gif',
                url: false,
                headers: {},
            },
            isFullScreen: false,
            currentIndex: 0,
            currentTimeout: null,
            showContent: true,
            showPreview: true,
            statusMessage: {
                type: '', text: '', timeout: 0, show: false,
            },
        }
    },
    mounted() {
        this.uploadOpt = { ...this.uploadOpt, ...this.upload }
        // console.log(this.uploadOpt)
        // this.value接收v-model中的值
        this.content = this.value
        // 保存一条历史记录
        this.history.push(this.content)
        if (!this.preview) {
            this.showPreview = false
        }
    },
    watch: {
        value(value) {
            if (this.content !== value) this.content = value
        },
        content() {
            if (isServer) return
            this.$emit('input', this.content)
            this.scrollReset()
            if (this.content === this.history[this.currentIndex]) return
            // 内容变化，重新保存到历史记录，每隔500毫秒添加一条历史记录
            window.clearTimeout(this.currentTimeout)
            this.currentTimeout = setTimeout(() => {
                this.saveHistory()
                this.$emit('save-history')
            }, 500)
        },
        // 执行了撤销或恢复，currentIndex会变化，重置内容
        currentIndex() {
            const history = this.history[this.currentIndex]
            this.content = history
        },
    },
    computed: {
        realHeight() {
            if (this.isFullScreen) return '100%'
            return this.height
        },
        // ctrl+z
        canUndo() {
            return this.currentIndex > 0
        },
        // ctrl+y
        canRedo() {
            return this.currentIndex < this.history.length - 1
        },
    },
    methods: {
        pasteEvent(event) {
            if (isServer) return
            const { items } = event.clipboardData || event.originalEvent.clipboardData
            for (const key in items) {
                if ({}.hasOwnProperty.call(items, key)) {
                    const item = items[key]
                    // 如果是图片
                    if (item.kind === 'file') {
                        const blob = item.getAsFile()
                        const fileData = new window.FormData()
                        fileData.append(this.uploadOpt.name, blob)
                        this.uploadFormData(fileData)
                    }
                }
            }
        },
        doPreview() {
            if (!this.preview) {
                this.showContent = !this.showContent
                this.showPreview = !this.showPreview
            } else {
                this.showContent = !this.showContent
            }
        },
        doSave() {
            this.$emit('save', true)
        },
        scrollReset() {
            const { editor } = this.$refs
            const scrollHeight = (editor.scrollHeight - editor.clientHeight) || editor.scrollHeight
            // 获得被卷去的比例
            const scroll = editor.scrollTop / scrollHeight
            const preview = this.$refs.preview.$el
            // 设置预览区被卷去的头部
            const preTop = (preview.scrollHeight - preview.clientHeight) * scroll
            preview.scrollTop = preTop
        },
        // 快捷键配置
        keydown(e) {
            const code = e.key
            if (e.ctrlKey === true || e.Meta) {
                const hotkey = `Ctrl+${code}`
                const el = this.$el.querySelector(`[hotkey='${hotkey}']`)
                if (el) {
                    e.preventDefault()
                    el.click()
                }
            } else if (code === 'Tab') {
                e.preventDefault()
                const TAB_SPACE = '  '
                const { editor } = this.$refs
                const { start, end } = getEditorSelection(editor)
                const { after } = this.selectedStr(start, end)
                let { before, select } = this.selectedStr(start, end)
                if (select.indexOf('\n') > -1) {
                    // 一共10行，选中了5-6行中某段，beforeLR表示1-4行
                    const beforeLR = before.substr(0, before.lastIndexOf('\n') + 1)
                    // afterLR表示5行前未选中部分
                    const afterLR = before.substr(beforeLR.length)
                    before = beforeLR
                    // 5行开头到选中文本末尾
                    select = afterLR + select
                    let lines = select.split('\n')
                    if (e.shiftKey) {
                        lines = lines.map(l => l.substr(0, TAB_SPACE.length).replace(/(^\s*)/g, '') + l.substr(TAB_SPACE.length))
                    } else {
                        lines = lines.map(l => TAB_SPACE + l)
                    }
                    const newInsert = lines.join('\n')
                    this.content = before + newInsert + after
                    this.$nextTick(() => {
                        setEditorRange(editor, before.length, newInsert.length)
                    })
                } else {
                    // 单行缩进
                    this.insertTo(TAB_SPACE, start)
                }
            }
        },

        insertTo(text, position = getEditorSelection(this.$refs.editor).start) {
            const before = this.content.substr(0, position)
            const after = this.content.substr(position)
            this.content = before + text + after
            this.$nextTick(() => {
                setEditorRange(this.$refs.editor, position + text.length)
            })
        },

        undo() {
            // 光标位置
            let { start } = getEditorSelection(this.$refs.editor)
            // 撤销前内容的长度
            const currentLength = this.content.length
            // 内容重置
            if (this.canUndo) {
                this.currentIndex -= 1
            }
            // 光标重置
            this.$nextTick(() => {
                // this.content.length是撤销后的内容长度
                // start是撤销内容后的光标位置
                start -= currentLength - this.content.length
                setEditorRange(this.$refs.editor, start)
            })
        },
        redo() {
            // 如果可以恢复，则currentIndex++
            let { start } = getEditorSelection(this.$refs.editor)
            const currentLength = this.content.length
            if (this.canRndo) {
                this.currentIndex += 1
            }
            this.$nextTick(() => {
                start += this.content.length - currentLength
                setEditorRange(this.$refs.editor, start)
            })
        },

        _status(type, text, time = text.length / 10 * 1000) {
            if (isServer) return
            window.clearTimeout(this.statusMessage.timeout)
            const timeout = setTimeout(() => {
                this.statusMessage.show = false
            }, time)
            this.statusMessage = {
                type, text, timeout, show: true,
            }
        },
        success(message, timeout) {
            this._status('success', message, timeout)
        },
        error(message, timeout) {
            this._status('error', message, timeout)
        },
        info(message, timeout) {
            this._status('info', message, timeout)
        },
        closeStatus() {
            this.statusMessage.show = false
        },

        uploadClick() {
            this.$refs.upload.click()
        },
        fileUpload() {
            if (isServer) return
            const input = this.$refs.upload
            const upload = this.$emit('custom-upload', input)
            if (upload === false) return
            if (input.files.length) {
                const fileData = new window.FormData()
                fileData.append(input.name, input.files[0])
                this.uploadFormData(fileData)
            }
        },
        uploadFormData(formData) {
            if (isServer) return
            if (!this.uploadOpt.url) {
                this.error('请先配置上传路径')
                return
            }
            const xhr = new window.XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const success = this.$emit('upload-success', xhr.responseText)
                        if (success !== false) {
                            // 新的URL
                            this.insertTo(`\n![](${xhr.responseText})\n`)
                        }
                    } else {
                        const error = this.$emit('upload-error', xhr)
                        if (error !== false) {
                            this.error('上传失败')
                        }
                    }
                }
            }
            // 上传进度条
            xhr.upload.onprogress = (e) => {
                const upload = this.$emit('uploading', { loaded: e.loaded, total: e.total })
                if (upload !== false) {
                    const pre = parseInt(e.loaded / e.total * 100, 10)
                    const loaded = parseInt(e.loaded / 1024, 10)
                    const total = parseInt(e.total / 1024, 10)
                    this.info(`上传进度： ${loaded}kb / ${total}kb | ${pre}%`)
                }
            }
            // 发送请求，并设置请求头
            xhr.open('POST', this.uploadOpt.url, true)
            if (this.uploadOpt.headers) {
                Object.keys(this.uploadOpt.headers).forEach((k) => {
                    xhr.setRequestHeader(k, this.uploadOpt.headers[k])
                })
            }
            xhr.send(formData)
        },

        // 内容发生变化，执行
        saveHistory() {
            // 第一次变化 this.history中还是原来的一项,
            this.history.splice(this.currentIndex + 1, this.history.length)
            // 变化后的内容添加进去，此时有两项
            this.history.push(this.content)
            // currentIndex表示当前内容在history中的下标
            this.currentIndex = this.history.length - 1
        },
        // 获取选中的文本
        getSelectStr() {
            const { editor } = this.$refs
            const { start, end } = getEditorSelection(editor)
            const { select } = this.selectedStr(start, end)
            return select
        },
        selectedStr(start, end) {
            // 选中文本前的文本
            const before = this.content.substr(0, start)
            // 选中的文本
            const select = this.content.substr(start, end - start)
            // 选中后的文本
            const after = this.content.substr(end, this.content.length)
            return { before, select, after }
        },
    },
    components: {
        BaseEditorPreview,
    },
}
</script>
<style>
@import url("~/assets/iconfont/iconfont.css");
.editor-edit {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
}

.editor-edit.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.editor-edit .editor-wrap {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.editor-edit .editor-wrap .editor-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 0;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
}

.editor-edit .editor-wrap .editor-menu .wmui {
    display: inline-block;
    padding: 10px;
    font-size: 18px;
    color: #a9a9a9;
    cursor: pointer;
}

.editor-edit .editor-wrap .editor-menu .disable {
    color: #eee;
    cursor: not-allowed;
}

.editor-edit .editor-wrap .editor-content {
    position: relative;
    flex: 1;
    background: #fff;
}

.editor-edit .editor-wrap .editor-content .content-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}

.editor-edit .editor-wrap .editor-content .content-wrap .content-editor {
    flex: 1;
    position: relative;
    font-size: 14px;
    line-height: 24px;
    border: 0;
    border-right: 1px solid #ccc;
    resize: none;
    background-color: #f8f8f8;
    padding: 15px;
    outline: none;
    overflow: auto;
}

.editor-edit .editor-wrap .editor-content .content-wrap .content-preview {
    flex: 1;
    position: relative;
    padding: 15px;
    overflow: auto;
    background-color: #fff;
}

.editor-edit .editor-wrap .upload-status {
    position: absolute;
    top: 0;
    padding: 8px;
    background: rgba(0, 0, 0, 0.1);
    width: 100%;
    color: #333;
}

.editor-edit .editor-wrap .upload-status.info {
    background: rgba(130, 232, 255, 0.2);
}

.editor-edit .editor-wrap .upload-status.success {
    background: rgba(101, 255, 177, 0.2);
}

.editor-edit .editor-wrap .upload-status.error {
    background: rgba(255, 101, 101, 0.2);
}
</style>
