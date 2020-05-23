<!--  -->
<template>
  <div class='setting-main bg-alpha'>
    <div class="round-area">
      <img class="about-logo" src="@/assets/logo.png" alt="">
      <p class="header text">软件名称：{{huskyInfo.name}}-({{huskyInfo.englishName}})</p>
      <br>
      <p class="header text">软件版本：{{ packageJSON.version}}</p>
      <br>
      <p class="header text">
        开发文档
        <br><br>
        <span class="hyperlink" @click="openBrowser(huskyInfo.blog)">(gitee)地址一：{{ huskyInfo.blog}}</span>
        <br><br>
        <span class="hyperlink" @click="openBrowser(huskyInfo.blogBack)">(github)地址二：{{ huskyInfo.blogBack}}</span>
      </p>
      <br>
      <p class="header text">
        使用教程
        <br><br>
        <span class="hyperlink" @click="openBrowser(huskyInfo.tutorial)">B站：{{ huskyInfo.tutorial}}</span>
      </p>
      <br>
      <p class="header text">
        提意见：
        <span class="hyperlink" @click="openBrowser(huskyInfo.githubIssue)">{{ huskyInfo.githubIssue}}</span>
      </p>
    </div>
    <div class="back-btn text" @click="closeDialog('about')">返回(back)</div>
  </div>
</template>

<script>
let packageJSON = require('../../../../../package.json')
let { shell } = require('electron')
export default {
  components: {},
  data () {
    return {
      packageJSON: packageJSON,
      huskyInfo: {
        githubIssue: 'https://github.com/huskyAreYouScared/subtitle/issues',
        blog: 'https://husky_are_you_scared.gitee.io/blog/',
        blogBack: 'https://huskyareyouscared.github.io/blog/',
        tutorial: 'https://www.bilibili.com/video/BV1hp4y1C74N',
        englishName: 'husky-subtitle',
        name: '哈哈字幕'
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    },
    openBrowser (url) {
      shell.openExternal(url)
    },
    init () {

    }
  },
  mounted () {

  }
}
</script>
