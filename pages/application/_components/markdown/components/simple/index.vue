<template lang="html">
  <div
    ref="markdown"
    :class="`markdown ${fullscreen ? 'fullscreen' : ''} ${bordered ? 'border' : ''}`"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <!-- 头部工具栏 -->
    <ul v-show="!preview" class="markdown-toolbars">
      <li>
        <slot name="title" />
      </li>
      <li v-if="tools.strong" name="粗体">
        <span class="iconfont icon-bold" @click="insertStrong"></span>
      </li>
      <li v-if="tools.italic" name="斜体">
        <span class="iconfont icon-italic" @click="insertItalic"></span>
      </li>
      <li v-if="tools.overline" name="删除线">
        <span class="iconfont icon-overline" @click="insertOverline"></span>
      </li>
      <li v-if="tools.overline" name="下划线">
        <span class="iconfont icon-under-line" @click="insertUnderline"></span>
      </li>
      <li v-if="tools.h1" name="标题1">
        <span style="font-size: 16px" @click="insertTitle(1)">h1</span>
      </li>
      <li v-if="tools.h2" name="标题2">
        <span style="font-size: 16px" @click="insertTitle(2)">h2</span>
      </li>
      <li v-if="tools.h3" name="标题3">
        <span style="font-size: 16px" @click="insertTitle(3)">h3</span>
      </li>
      <li v-if="tools.h4" name="标题4">
        <span style="font-size: 16px" @click="insertTitle(4)">h4</span>
      </li>
      <li v-if="tools.h5" name="标题5">
        <span style="font-size: 16px" @click="insertTitle(5)">h5</span>
      </li>
      <li v-if="tools.h6" name="标题6">
        <span style="font-size: 16px" @click="insertTitle(6)">h6</span>
      </li>
      <li v-if="tools.hr" name="分割线">
        <span class="iconfont icon-horizontal" @click="insertLine"></span>
      </li>
      <li v-if="tools.quote" name="引用">
        <span style="font-size: 16px" class="iconfont icon-quote" @click="insertQuote"></span>
      </li>
      <li v-if="tools.ul" name="无序列表">
        <span class="iconfont icon-ul" @click="insertUl"></span>
      </li>
      <li v-if="tools.ol" name="有序列表">
        <span class="iconfont icon-ol" @click="insertOl"></span>
      </li>
      <li v-if="tools.code" name="代码块">
        <span class="iconfont icon-code" @click="insertCode"></span>
      </li>
      <li v-if="tools.notChecked" name="未完成列表">
        <span class="iconfont icon-checked-false" @click="insertNotFinished"></span>
      </li>
      <li v-if="tools.checked" name="已完成列表">
        <span class="iconfont icon-checked" @click="insertFinished"></span>
      </li>
      <li v-if="tools.link" name="链接">
        <span class="iconfont icon-link" @click="insertLink"></span>
      </li>
      <li v-if="tools.image" name="图片">
        <span class="iconfont icon-img" @click="insertImage"></span>
      </li>
      <li v-if="tools.uploadImage" name="本地图片">
        <span class="iconfont icon-upload-img" @click="chooseImage"></span>
      </li>
      <li v-if="tools.table" name="表格">
        <span class="iconfont icon-table" @click="insertTable"></span>
      </li>
      <li v-if="tools.theme" class="shift-theme" name="代码块主题">
        <div>
          <span class="iconfont icon-theme" @click="themeSlideDown = !themeSlideDown"></span>
          <ul :class="{ active: themeSlideDown }" @mouseleave="themeSlideDown = false">
            <li @click="setThemes('light')">Light</li>
            <li @click="setThemes('dark')">VS Code</li>
            <li @click="setThemes('oneDark')">Atom OneDark</li>
            <li @click="setThemes('gitHub')">GitHub</li>
          </ul>
        </div>
      </li>
      <li v-show="tools.importmd" name="导入文件" class="import-file">
        <span class="iconfont icon-daoru" @click="importFile"></span>
        <input type="file" accept="text/markdown" @change="importFile($event)" />
      </li>
      <li v-show="tools.exportmd" name="保存到本地">
        <span class="iconfont icon-download" @click="exportFile"></span>
      </li>
      <li v-if="tools.split && split" name="全屏编辑">
        <span class="iconfont icon-md" @click="split = false"></span>
      </li>
      <li v-if="tools.split && !split" name="分屏显示">
        <span class="iconfont icon-group" @click="split = true"></span>
      </li>
      <li v-if="tools.preview" name="预览">
        <span class="iconfont icon-preview" @click="preview = true"></span>
      </li>
      <li v-if="tools.clear" name="清空" @click="value = ''">
        <span class="iconfont icon-clear"></span>
      </li>
      <li v-if="tools.save" name="保存" @click="handleSave">
        <span class="iconfont icon-save"></span>
      </li>
      <li :name="scrolling ? '同步滚动:开' : '同步滚动:关'">
        <span v-show="scrolling" class="iconfont icon-on" @click="scrolling = !scrolling"></span>
        <span v-show="!scrolling" class="iconfont icon-off" @click="scrolling = !scrolling"></span>
      </li>
      <li class="empty"></li>
      <li v-if="tools.fullscreen && !fullscreen" name="全屏">
        <span class="iconfont icon-fullscreen" @click="fullscreen = !fullscreen"></span>
      </li>
      <li v-if="tools.fullscreen && fullscreen" name="退出全屏">
        <span class="iconfont icon-quite" @click="fullscreen = !fullscreen"></span>
      </li>
    </ul>
    <!-- 关闭预览按钮 -->
    <div v-show="preview && !isPreview" class="close-preview" @click="preview = false">
      <span class="iconfont icon-close"></span>
    </div>
    <!-- 编辑器 -->
    <div class="markdown-content" :style="{ background: preview ? '#fff' : '' }">
      <div v-show="!preview" ref="markdownEditor" class="markdown-editor" @scroll="markdownScroll" @mouseenter="mousescrollSide('markdown')">
        <ul
          ref="index"
          class="index"
          :style="{
            height: textareaHeight ? `${textareaHeight}px` : '100%',
          }"
        >
          <li v-for="index in indexLenth" :key="index">
            {{ index }}
          </li>
        </ul>
        <textarea
          ref="textarea"
          v-model="currentValue"
          :style="{
            height: textareaHeight ? `${textareaHeight}px` : '100%',
          }"
          @keydown.tab="tab"
          @keyup.enter="enter"
          @keyup.delete="onDelete"
          @mouseenter="mousescrollSide('left')"
        ></textarea>
      </div>
      <div
        v-show="preview ? preview : split"
        ref="preview"
        :class="`markdown-preview ${'markdown-theme-' + themeName}`"
        @scroll="previewScroll"
        @mouseenter="mousescrollSide('right')"
      >
        <div ref="previewInner" v-html="html"></div>
      </div>
    </div>
    <!--    预览图片-->
    <div :class="['preview-img', previewImgModal ? 'active' : '']">
      <span class="close icon-close iconfont" @click="previewImgModal = false"></span>
      <img :src="previewImgSrc" :class="[previewImgMode]" alt="" />
    </div>
  </div>
</template>

<script>
import markdown from './simple'

export default markdown
</script>

<style scoped lang="scss">
@import '../../assets/font/iconfont.css';
@import '../../assets/css/light.css';
@import '../../assets/css/index.css';
</style>
