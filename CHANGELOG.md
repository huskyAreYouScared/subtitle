## [0.2.1](https://github.com/huskyAreYouScared/subtitle/compare/v0.2.0...v0.2.1) (2020-08-09)


### Bug Fixes

* **track:** don't auto position subtile chunk ([25010f7](https://github.com/huskyAreYouScared/subtitle/commit/25010f706a4a0059075e93e8a55e5d07056a4296))



# [0.2.0](https://github.com/huskyAreYouScared/subtitle/compare/v0.1.4...v0.2.0) (2020-07-19)


### Bug Fixes

* **new store updatesubtitlesstatus,historymanger:** fix video track subtitles don't update ([4e44096](https://github.com/huskyAreYouScared/subtitle/commit/4e4409676c084483cd63d5efba92fccdbe79c1c1))
* **readme,video,track:** interview update,document update,video and timeline bug fix ([74d59e3](https://github.com/huskyAreYouScared/subtitle/commit/74d59e388035228a8bb0e14f9d0a51017f7a2697))
* **recognize.js:** no recognize config no feedback,menubar keep top ([a3616e2](https://github.com/huskyAreYouScared/subtitle/commit/a3616e26c38ae20a10d354214bb51db6d555170d))
* **tools:** fix srt character garbled ([e5813c2](https://github.com/huskyAreYouScared/subtitle/commit/e5813c25fbc5d235548f1b4d046a577b3657b6f6))


### Features

* **addsubtitleschunk:** can be added and deleted chunk of subtitles ([c8acf4d](https://github.com/huskyAreYouScared/subtitle/commit/c8acf4dab7a2eff9c2b3f99a9a843a7474aa78c0))
* **chunk:** border value limit compare ([9888adc](https://github.com/huskyAreYouScared/subtitle/commit/9888adc97ab9a2d3a4d5f96066f6c50edb660acb))
* **chunk track timeline:** change subtitles item,scroll relate postion ([35330f4](https://github.com/huskyAreYouScared/subtitle/commit/35330f436ad4fadd3731552a01af1c722de1f47c))
* **createsubtitles , timeline ,chunk , track:** subtitles data of recognize,pass to timeline,etc ([6b544ae](https://github.com/huskyAreYouScared/subtitle/commit/6b544ae9181ba41912d998f6c86db66900b88426))
* **createsubtitles, subtitle:** complete new version subtitles edit speech recognize algorithm ([16d8e8a](https://github.com/huskyAreYouScared/subtitle/commit/16d8e8ae4c96f87676b9437a853d91951bcf7580))
* **datastore, setting createsubtitles, dataoperator:** complete recognize auto save subtitles data ([4041894](https://github.com/huskyAreYouScared/subtitle/commit/40418949fa138052effb9ab5fad299b224687019))
* **lastornext:** add next and last button ,control subtitles of current select ([e124521](https://github.com/huskyAreYouScared/subtitle/commit/e12452185c47ee92c8eb9da7a95458eb579e02ca))
* **new srtshow,timelinelayout relative file:** amend srt time value,new srt time show component ([895c080](https://github.com/huskyAreYouScared/subtitle/commit/895c080e066d869b3bc48daba23f1da0a88e6135))
* **plugins track:** add change div size instruction plugins , use v-changeSize instruction in track ([e3feba7](https://github.com/huskyAreYouScared/subtitle/commit/e3feba7bc66e4c0a8727d0084cf7add5e09e248d))
* **setting.vue mergesubtitleinvideo datastore.js:** add video quality config ([4c18c83](https://github.com/huskyAreYouScared/subtitle/commit/4c18c83630c3ca05d9704981998badb94043ac5a))
* **subtitle,track,chank:** amend subtitles value ([93986df](https://github.com/huskyAreYouScared/subtitle/commit/93986df34aaefc91d47f09a7cb96aeea634526ec))
* **themecolor:** dynamic change theme color ([ecfe089](https://github.com/huskyAreYouScared/subtitle/commit/ecfe08925c3fffacf16f50cdb76b4b562aa74d18))
* **timeline.vue new historyoperator.vue:** operate timeline history,add delete timeline item ([993be57](https://github.com/huskyAreYouScared/subtitle/commit/993be57657d8ca5f9ff5698295e9787a5e237cf7))
* **timelinelayout:** add edit subtitles function ([225d441](https://github.com/huskyAreYouScared/subtitle/commit/225d4412cd8836f267af983b913710d4ed69d93c))
* **timelinelayout view etc:** view edit ([7eb5356](https://github.com/huskyAreYouScared/subtitle/commit/7eb535615ed0a669425b8edcc86c113eb555a970))
* **tools video components historymanager:** add vtt subtitles track in the video element ([568d54c](https://github.com/huskyAreYouScared/subtitle/commit/568d54c63e8a947feaf9f8a090b1aea2439ef2f4))
* **variable.scss:** change text style ([2c3338f](https://github.com/huskyAreYouScared/subtitle/commit/2c3338ff8550a1a84b24199e0204c156ec88c8b9))
* style optimization, text update ([5bddb3c](https://github.com/huskyAreYouScared/subtitle/commit/5bddb3c26c504cd3d7db52a49fad151cb1da0023))
* **track:** add timescale ([57ed0f4](https://github.com/huskyAreYouScared/subtitle/commit/57ed0f42306a0b01e79a7a7ab3dd7e5891df38be))
* **track timeline:** add track components ([d4a88bd](https://github.com/huskyAreYouScared/subtitle/commit/d4a88bd32d5a220ecf9fd672a31ded1cac8db351))


### Performance Improvements

* **chunk:** optimization chunk slider component ([e770b8e](https://github.com/huskyAreYouScared/subtitle/commit/e770b8ec780ec3c6a20f10ac85dfe1618b6cd2ba))
* **track:** track compute optimization ([066829c](https://github.com/huskyAreYouScared/subtitle/commit/066829c267185fe9d8f5bfd04fa4919c0e412c84))



## [0.1.4](https://github.com/huskyAreYouScared/subtitle/compare/v0.1.2...v0.1.4) (2020-04-28)


### Bug Fixes

* **fs.js and subtitlesexport.vue:** fix export bcc file last timeline empty ([32561f5](https://github.com/huskyAreYouScared/subtitle/commit/32561f5c89daa4a29edaf2a37dec9fbc35a53514))
* **subtitlesexport:** fix export bcc filte can't use,add custom timeline ([ddf3d0f](https://github.com/huskyAreYouScared/subtitle/commit/ddf3d0f6a68fd71b227a348716674d3bbd3096b0))


### Features

* **timeline:** add custom timeline ([9225f1e](https://github.com/huskyAreYouScared/subtitle/commit/9225f1eb9f021407499e9643af1aa089a91921e6))


### Performance Improvements

* **components of subtitle:** optimization timeline component ([419a7e6](https://github.com/huskyAreYouScared/subtitle/commit/419a7e64022be35e9933b4535e4631db86ba5938))



## [0.1.3](https://github.com/huskyAreYouScared/subtitle/compare/v0.1.1-alpha.0...v0.1.3) (2020-04-27)


### Bug Fixes

* **subtitlesexport:** fix export bcc filte can't use,add custom timeline ([ddf3d0f](https://github.com/huskyAreYouScared/subtitle/commit/ddf3d0f6a68fd71b227a348716674d3bbd3096b0))


### Features

* **datastore,setting,iconfont:** add show and hide toggle button to main config params ([d243646](https://github.com/huskyAreYouScared/subtitle/commit/d2436465ad5e794b8739bba53e01500b30af1d2a))
* **mergesubtitleinvideo:** merge subtitle file type change ,change to ass subtitle file ([e227470](https://github.com/huskyAreYouScared/subtitle/commit/e22747081157b5c2d62e7c797dd709b4db19c921))
* **preview relate file,datastore.js:** add special effects subtitle ([b1023ff](https://github.com/huskyAreYouScared/subtitle/commit/b1023ff859e32811d1ba3e6eff530a2427c54aba))
* **renderer new about and update setting relative style,main index ipc-event:** add new about page ([fdaf945](https://github.com/huskyAreYouScared/subtitle/commit/fdaf9455ec22a23db1bff567e2808b3ce5f8d9e1))
* **timeline:** add custom timeline ([9225f1e](https://github.com/huskyAreYouScared/subtitle/commit/9225f1eb9f021407499e9643af1aa089a91921e6))
* **vue-plugins,preview:** add ass subtitle preview ([4dfe72c](https://github.com/huskyAreYouScared/subtitle/commit/4dfe72cfbc40e2565fc5df9e6ffb68867c347145))


### Performance Improvements

* **components of subtitle:** optimization timeline component ([419a7e6](https://github.com/huskyAreYouScared/subtitle/commit/419a7e64022be35e9933b4535e4631db86ba5938))
* **recognize.js,tools.js:** ass template optimization ([00dc997](https://github.com/huskyAreYouScared/subtitle/commit/00dc997f04aed260c1e816175cd7ad8d3d8f3e5d))
* **renderer subtitle,viewport:** export subtitles file optimization ([ff4a06a](https://github.com/huskyAreYouScared/subtitle/commit/ff4a06ab8d30cf87df144f0475b7c4f2a39e8c10))



## [0.1.2](https://github.com/huskyAreYouScared/subtitle/compare/v0.1.1...v0.1.2) (2020-04-19)


### Features

* **datastore,setting,iconfont:** add show and hide toggle button to main config params ([d243646](https://github.com/huskyAreYouScared/subtitle/commit/d2436465ad5e794b8739bba53e01500b30af1d2a))
* **mergesubtitleinvideo:** merge subtitle file type change ,change to ass subtitle file ([e227470](https://github.com/huskyAreYouScared/subtitle/commit/e22747081157b5c2d62e7c797dd709b4db19c921))
* **preview relate file,datastore.js:** add special effects subtitle ([b1023ff](https://github.com/huskyAreYouScared/subtitle/commit/b1023ff859e32811d1ba3e6eff530a2427c54aba))
* **vue-plugins,preview:** add ass subtitle preview ([4dfe72c](https://github.com/huskyAreYouScared/subtitle/commit/4dfe72cfbc40e2565fc5df9e6ffb68867c347145))


### Performance Improvements

* **recognize.js,tools.js:** ass template optimization ([00dc997](https://github.com/huskyAreYouScared/subtitle/commit/00dc997f04aed260c1e816175cd7ad8d3d8f3e5d))
* **renderer subtitle,viewport:** export subtitles file optimization ([ff4a06a](https://github.com/huskyAreYouScared/subtitle/commit/ff4a06ab8d30cf87df144f0475b7c4f2a39e8c10))



## [0.1.1](https://github.com/huskyAreYouScared/subtitle/compare/v0.1.1-alpha.0...v0.1.1) (2020-03-23)



## 0.0.2 (2020-03-21)


### Bug Fixes

* **main index.js global.js renderer sidebar.vue subtitle.vue main.js:** can use ([7adcfee](https://github.com/huskyAreYouScared/subtitle/commit/7adcfeef542b9dc7f4bcc5d0c6d3ebf5165e902d))
* **main ipc-event,renderer subtitle:** export srt cancel show save success bug ([52e0701](https://github.com/huskyAreYouScared/subtitle/commit/52e0701b5aa737a82dca7f43f252b29d767910e8))
* **main others format:** replace single instance old version of api ([d6d2b62](https://github.com/huskyAreYouScared/subtitle/commit/d6d2b6279fafdb7904c9582af1b48746b53ccb31))
* **renderer main.js:** ffmpeg production path error bug fix ([ac62622](https://github.com/huskyAreYouScared/subtitle/commit/ac626223bf337de0cc68032cf712f454216aa1ea))
* **renderer sidebar.vue viewport.vue:** ffmpeg 路径中有 空格 bug修复 ([2188286](https://github.com/huskyAreYouScared/subtitle/commit/218828676394f0179affa618580c32deb5ee224d))
* **renderer subtitle:** 修复语音切割bug ([807669e](https://github.com/huskyAreYouScared/subtitle/commit/807669e9d5181ceba285c62ab6c0b14105592dc1))
* **renderer subtitle video mergesubtitlevideo loading recognize:** merge subtitle,digit correct fix ([343b8dd](https://github.com/huskyAreYouScared/subtitle/commit/343b8dd104d18bd42d138eb314263ff95faddf5d))


### Features

* **add new store currenttime:** add store currentTime ([02ea79f](https://github.com/huskyAreYouScared/subtitle/commit/02ea79fd57452fe6a584696030ff1a0f0cc9e657))
* **changelog.md:** 增加日志给予convertional-changelog ([0b74345](https://github.com/huskyAreYouScared/subtitle/commit/0b74345450d73194cc9f3a0203e7fc72722e4f1b))
* **main index.js,travis appveyor:** delete useless tag,once instance,CI config change ([43dd5c4](https://github.com/huskyAreYouScared/subtitle/commit/43dd5c41e11aa62b77e4cc9c8f47f64668103d77))
* **main ipc-event renderer sidebar, assets iconfont file:** add audio file correlation function ([94c7ce2](https://github.com/huskyAreYouScared/subtitle/commit/94c7ce2e605dac447f8620f30535cfcaea51be12))
* **main updatechecker,renderer utils recognize,travis.yml appveyor.yml:** add auto update,add CI ([d210b69](https://github.com/huskyAreYouScared/subtitle/commit/d210b692f6bd63b0f70be320a7418d556620689e))
* **new config at utils,setting all file,sidbar.vue viewport.vue ..:** 支持上传音频，format m4a,mp3,wav,pcm ([5f3ec65](https://github.com/huskyAreYouScared/subtitle/commit/5f3ec650c89fcbb2b3580810b7a67336454169a0))
* **new mergesubtitleinvideo.vue ,utils in tools, renderer subtitle:** add merge srt file in video ([dbe13e2](https://github.com/huskyAreYouScared/subtitle/commit/dbe13e24e29c0a946a20d01e59d26e58c3ea1a5f))
* **package.json:** with user select install path ([01dc287](https://github.com/huskyAreYouScared/subtitle/commit/01dc2876d88a24d09627fdd830f32312940ddac9))
* **recognize.js subtitle.vue:** add tencent Cloud audio recognize api ([f023856](https://github.com/huskyAreYouScared/subtitle/commit/f023856223ae592c7b544d15702f43ae1f9f5dde))
* **renderer merge... subtitle ,utils tools recognize:** merge subtitle in video extra content wrap ([89d25a2](https://github.com/huskyAreYouScared/subtitle/commit/89d25a28f6822eef65bf54db7ba3a8d676fd7b79))
* **renderer setting and style:** 增加语音识别参数配置 ([5e574b1](https://github.com/huskyAreYouScared/subtitle/commit/5e574b163287b04a4b3509d2132a1fae4efbadea))
* **renderer setting and style,tool.js,menubar.vue and style:** add setting page ([7c17356](https://github.com/huskyAreYouScared/subtitle/commit/7c173565fa3b6b1e275002bd2388c9001d9c64ad))
* **renderer setting subtitle viewport,utils datastore.js:** audio cutting time dynamic config ([4f5ab80](https://github.com/huskyAreYouScared/subtitle/commit/4f5ab809dba81d21090576e41bf78937e8b7b1d3))
* **renderer sidebar drag style,subtitle too-bar style:** update sidebar subtitle too-bar style ([fbc7877](https://github.com/huskyAreYouScared/subtitle/commit/fbc78778013f39f2ed8c8305f4b84c560347b4c1))
* **renderer store videinfo.js video.vue:** add video Eventlistener ([d42bc3a](https://github.com/huskyAreYouScared/subtitle/commit/d42bc3afc66a79601f0e390a608f92566b55a8c3))
* **renderer subtitle:** 增加文件过滤，保存文件自动处理后缀名 ([eda313c](https://github.com/huskyAreYouScared/subtitle/commit/eda313c400953dc88ad89c3c38f3d5dfe9546449))
* **renderer subtitle and style file:** add subtitle bcc type file ([e942d7b](https://github.com/huskyAreYouScared/subtitle/commit/e942d7bdd3764008d9cef6045eb01f5da6bfae61))
* **renderer subtitle.vue:** 增加字幕容器跟所视频进度移动功能 ([c38aa58](https://github.com/huskyAreYouScared/subtitle/commit/c38aa589dc44c8337bbd16c4c509c2f63e1cf047))
* **renderer subtitle.vue recognize.js:** audio recognize  abstract to function ([67a9460](https://github.com/huskyAreYouScared/subtitle/commit/67a946037f7c1065cb42eb9ba363594823ff4283))
* **renderer utils subtitle sidebar:** last audio time cross question bug fix ([f1b87dc](https://github.com/huskyAreYouScared/subtitle/commit/f1b87dcffa4a6e4614c0bf7bb06030a5c23e2a46))
* **setting change dialog,subtitle date error bug fix:** 将配置改为dialog，修复字幕时间不准bug，接入腾讯云准备 ([2fa5d8e](https://github.com/huskyAreYouScared/subtitle/commit/2fa5d8e919be264e1769a60b40b6f53ed68ad75e))
* **store state relate file change:** update store manage ([f8e295f](https://github.com/huskyAreYouScared/subtitle/commit/f8e295f66467d0c0de1966f70139cd4b6d4288b0))
* **utils datastore,renderer subtitle main:** add local storage ([8ab22d8](https://github.com/huskyAreYouScared/subtitle/commit/8ab22d80330f4fc2bc18ca4d3390d909c10ad489))


### Performance Improvements

* version命令修改 ([b9b9218](https://github.com/huskyAreYouScared/subtitle/commit/b9b9218bdfe167b86d7fba3808306926a44c7a90))



## 0.0.1 (2020-03-22)


### Bug Fixes

* **main index.js global.js renderer sidebar.vue subtitle.vue main.js:** can use ([7adcfee](https://github.com/huskyAreYouScared/subtitle/commit/7adcfeef542b9dc7f4bcc5d0c6d3ebf5165e902d))
* **main ipc-event,renderer subtitle:** export srt cancel show save success bug ([52e0701](https://github.com/huskyAreYouScared/subtitle/commit/52e0701b5aa737a82dca7f43f252b29d767910e8))
* **renderer main.js:** ffmpeg production path error bug fix ([ac62622](https://github.com/huskyAreYouScared/subtitle/commit/ac626223bf337de0cc68032cf712f454216aa1ea))
* **renderer sidebar.vue viewport.vue:** ffmpeg 路径中有 空格 bug修复 ([2188286](https://github.com/huskyAreYouScared/subtitle/commit/218828676394f0179affa618580c32deb5ee224d))
* **renderer subtitle:** 修复语音切割bug ([807669e](https://github.com/huskyAreYouScared/subtitle/commit/807669e9d5181ceba285c62ab6c0b14105592dc1))
* **renderer subtitle video mergesubtitlevideo loading recognize:** merge subtitle,digit correct fix ([343b8dd](https://github.com/huskyAreYouScared/subtitle/commit/343b8dd104d18bd42d138eb314263ff95faddf5d))


### Features

* **add new store currenttime:** add store currentTime ([02ea79f](https://github.com/huskyAreYouScared/subtitle/commit/02ea79fd57452fe6a584696030ff1a0f0cc9e657))
* **changelog.md:** 增加日志给予convertional-changelog ([0b74345](https://github.com/huskyAreYouScared/subtitle/commit/0b74345450d73194cc9f3a0203e7fc72722e4f1b))
* **main index.js,travis appveyor:** delete useless tag,once instance,CI config change ([43dd5c4](https://github.com/huskyAreYouScared/subtitle/commit/43dd5c41e11aa62b77e4cc9c8f47f64668103d77))
* **main ipc-event renderer sidebar, assets iconfont file:** add audio file correlation function ([94c7ce2](https://github.com/huskyAreYouScared/subtitle/commit/94c7ce2e605dac447f8620f30535cfcaea51be12))
* **main updatechecker,renderer utils recognize,travis.yml appveyor.yml:** add auto update,add CI ([d210b69](https://github.com/huskyAreYouScared/subtitle/commit/d210b692f6bd63b0f70be320a7418d556620689e))
* **new config at utils,setting all file,sidbar.vue viewport.vue ..:** 支持上传音频，format m4a,mp3,wav,pcm ([5f3ec65](https://github.com/huskyAreYouScared/subtitle/commit/5f3ec650c89fcbb2b3580810b7a67336454169a0))
* **new mergesubtitleinvideo.vue ,utils in tools, renderer subtitle:** add merge srt file in video ([dbe13e2](https://github.com/huskyAreYouScared/subtitle/commit/dbe13e24e29c0a946a20d01e59d26e58c3ea1a5f))
* **package.json:** with user select install path ([01dc287](https://github.com/huskyAreYouScared/subtitle/commit/01dc2876d88a24d09627fdd830f32312940ddac9))
* **recognize.js subtitle.vue:** add tencent Cloud audio recognize api ([f023856](https://github.com/huskyAreYouScared/subtitle/commit/f023856223ae592c7b544d15702f43ae1f9f5dde))
* **renderer merge... subtitle ,utils tools recognize:** merge subtitle in video extra content wrap ([89d25a2](https://github.com/huskyAreYouScared/subtitle/commit/89d25a28f6822eef65bf54db7ba3a8d676fd7b79))
* **renderer setting and style:** 增加语音识别参数配置 ([5e574b1](https://github.com/huskyAreYouScared/subtitle/commit/5e574b163287b04a4b3509d2132a1fae4efbadea))
* **renderer setting and style,tool.js,menubar.vue and style:** add setting page ([7c17356](https://github.com/huskyAreYouScared/subtitle/commit/7c173565fa3b6b1e275002bd2388c9001d9c64ad))
* **renderer setting subtitle viewport,utils datastore.js:** audio cutting time dynamic config ([4f5ab80](https://github.com/huskyAreYouScared/subtitle/commit/4f5ab809dba81d21090576e41bf78937e8b7b1d3))
* **renderer sidebar drag style,subtitle too-bar style:** update sidebar subtitle too-bar style ([fbc7877](https://github.com/huskyAreYouScared/subtitle/commit/fbc78778013f39f2ed8c8305f4b84c560347b4c1))
* **renderer store videinfo.js video.vue:** add video Eventlistener ([d42bc3a](https://github.com/huskyAreYouScared/subtitle/commit/d42bc3afc66a79601f0e390a608f92566b55a8c3))
* **renderer subtitle:** 增加文件过滤，保存文件自动处理后缀名 ([eda313c](https://github.com/huskyAreYouScared/subtitle/commit/eda313c400953dc88ad89c3c38f3d5dfe9546449))
* **renderer subtitle and style file:** add subtitle bcc type file ([e942d7b](https://github.com/huskyAreYouScared/subtitle/commit/e942d7bdd3764008d9cef6045eb01f5da6bfae61))
* **renderer subtitle.vue:** 增加字幕容器跟所视频进度移动功能 ([c38aa58](https://github.com/huskyAreYouScared/subtitle/commit/c38aa589dc44c8337bbd16c4c509c2f63e1cf047))
* **renderer subtitle.vue recognize.js:** audio recognize  abstract to function ([67a9460](https://github.com/huskyAreYouScared/subtitle/commit/67a946037f7c1065cb42eb9ba363594823ff4283))
* **renderer utils subtitle sidebar:** last audio time cross question bug fix ([f1b87dc](https://github.com/huskyAreYouScared/subtitle/commit/f1b87dcffa4a6e4614c0bf7bb06030a5c23e2a46))
* **setting change dialog,subtitle date error bug fix:** 将配置改为dialog，修复字幕时间不准bug，接入腾讯云准备 ([2fa5d8e](https://github.com/huskyAreYouScared/subtitle/commit/2fa5d8e919be264e1769a60b40b6f53ed68ad75e))
* **store state relate file change:** update store manage ([f8e295f](https://github.com/huskyAreYouScared/subtitle/commit/f8e295f66467d0c0de1966f70139cd4b6d4288b0))
* **utils datastore,renderer subtitle main:** add local storage ([8ab22d8](https://github.com/huskyAreYouScared/subtitle/commit/8ab22d80330f4fc2bc18ca4d3390d909c10ad489))


### Performance Improvements

* version命令修改 ([b9b9218](https://github.com/huskyAreYouScared/subtitle/commit/b9b9218bdfe167b86d7fba3808306926a44c7a90))