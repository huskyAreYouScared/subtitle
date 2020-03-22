## 0.1.3 (2020-03-22)


### Bug Fixes

* **main index.js global.js renderer sidebar.vue subtitle.vue main.js:** can use ([7adcfee](https://github.com/huskyAreYouScared/subtitle/commit/7adcfeef542b9dc7f4bcc5d0c6d3ebf5165e902d))
* **main index.js,ci related,all code format:** replace single instance old version of api ([87f83bf](https://github.com/huskyAreYouScared/subtitle/commit/87f83bfbe4df4a71ca5a3a5a38ebb5aa3c427b27))
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



## 0.1.2 (2020-03-22)


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



## 0.1.1 (2020-03-22)


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



## [0.5.11](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.10...v0.5.11) (2020-03-21)


### Features

* **main updatechecker,renderer utils recognize,travis.yml appveyor.yml:** add auto update,add CI ([d210b69](https://github.com/huskyAreYouScared/subtitle/commit/d210b692f6bd63b0f70be320a7418d556620689e))



## [0.5.10](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.6...v0.5.10) (2020-03-21)


### Bug Fixes

* **main ipc-event,renderer subtitle:** export srt cancel show save success bug ([52e0701](https://github.com/huskyAreYouScared/subtitle/commit/52e0701b5aa737a82dca7f43f252b29d767910e8))
* **renderer main.js:** ffmpeg production path error bug fix ([ac62622](https://github.com/huskyAreYouScared/subtitle/commit/ac626223bf337de0cc68032cf712f454216aa1ea))
* **renderer subtitle:** 修复语音切割bug ([807669e](https://github.com/huskyAreYouScared/subtitle/commit/807669e9d5181ceba285c62ab6c0b14105592dc1))
* **renderer subtitle video mergesubtitlevideo loading recognize:** merge subtitle,digit correct fix ([343b8dd](https://github.com/huskyAreYouScared/subtitle/commit/343b8dd104d18bd42d138eb314263ff95faddf5d))


### Features

* **add new store currenttime:** add store currentTime ([02ea79f](https://github.com/huskyAreYouScared/subtitle/commit/02ea79fd57452fe6a584696030ff1a0f0cc9e657))
* **new mergesubtitleinvideo.vue ,utils in tools, renderer subtitle:** add merge srt file in video ([dbe13e2](https://github.com/huskyAreYouScared/subtitle/commit/dbe13e24e29c0a946a20d01e59d26e58c3ea1a5f))
* **package.json:** with user select install path ([01dc287](https://github.com/huskyAreYouScared/subtitle/commit/01dc2876d88a24d09627fdd830f32312940ddac9))
* **recognize.js subtitle.vue:** add tencent Cloud audio recognize api ([f023856](https://github.com/huskyAreYouScared/subtitle/commit/f023856223ae592c7b544d15702f43ae1f9f5dde))
* **renderer merge... subtitle ,utils tools recognize:** merge subtitle in video extra content wrap ([89d25a2](https://github.com/huskyAreYouScared/subtitle/commit/89d25a28f6822eef65bf54db7ba3a8d676fd7b79))
* **renderer setting subtitle viewport,utils datastore.js:** audio cutting time dynamic config ([4f5ab80](https://github.com/huskyAreYouScared/subtitle/commit/4f5ab809dba81d21090576e41bf78937e8b7b1d3))
* **renderer store videinfo.js video.vue:** add video Eventlistener ([d42bc3a](https://github.com/huskyAreYouScared/subtitle/commit/d42bc3afc66a79601f0e390a608f92566b55a8c3))
* **renderer subtitle.vue:** 增加字幕容器跟所视频进度移动功能 ([c38aa58](https://github.com/huskyAreYouScared/subtitle/commit/c38aa589dc44c8337bbd16c4c509c2f63e1cf047))
* **renderer subtitle.vue recognize.js:** audio recognize  abstract to function ([67a9460](https://github.com/huskyAreYouScared/subtitle/commit/67a946037f7c1065cb42eb9ba363594823ff4283))
* **renderer utils subtitle sidebar:** last audio time cross question bug fix ([f1b87dc](https://github.com/huskyAreYouScared/subtitle/commit/f1b87dcffa4a6e4614c0bf7bb06030a5c23e2a46))
* **setting change dialog,subtitle date error bug fix:** 将配置改为dialog，修复字幕时间不准bug，接入腾讯云准备 ([2fa5d8e](https://github.com/huskyAreYouScared/subtitle/commit/2fa5d8e919be264e1769a60b40b6f53ed68ad75e))
* **store state relate file change:** update store manage ([f8e295f](https://github.com/huskyAreYouScared/subtitle/commit/f8e295f66467d0c0de1966f70139cd4b6d4288b0))



## [0.5.9](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.8...v0.5.9) (2020-03-11)


### Bug Fixes

* **main ipc-event,renderer subtitle:** export srt cancel show save success bug ([52e0701](https://github.com/huskyAreYouScared/subtitle/commit/52e0701b5aa737a82dca7f43f252b29d767910e8))



## [0.5.8](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.7...v0.5.8) (2020-03-10)


### Features

* **add new store currenttime:** add store currentTime ([02ea79f](https://github.com/huskyAreYouScared/subtitle/commit/02ea79fd57452fe6a584696030ff1a0f0cc9e657))



## [0.5.7](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.3...v0.5.7) (2020-03-09)


### Bug Fixes

* **renderer sidebar.vue viewport.vue:** ffmpeg 路径中有 空格 bug修复 ([2188286](https://github.com/huskyAreYouScared/subtitle/commit/218828676394f0179affa618580c32deb5ee224d))


### Features

* **new config at utils,setting all file,sidbar.vue viewport.vue ..:** 支持上传音频，format m4a,mp3,wav,pcm ([5f3ec65](https://github.com/huskyAreYouScared/subtitle/commit/5f3ec650c89fcbb2b3580810b7a67336454169a0))
* **renderer sidebar drag style,subtitle too-bar style:** update sidebar subtitle too-bar style ([fbc7877](https://github.com/huskyAreYouScared/subtitle/commit/fbc78778013f39f2ed8c8305f4b84c560347b4c1))
* **renderer store videinfo.js video.vue:** add video Eventlistener ([d42bc3a](https://github.com/huskyAreYouScared/subtitle/commit/d42bc3afc66a79601f0e390a608f92566b55a8c3))



## [0.5.6](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.5...v0.5.6) (2020-03-08)


### Bug Fixes

* **renderer sidebar.vue viewport.vue:** ffmpeg 路径中有 空格 bug修复 ([2188286](https://github.com/huskyAreYouScared/subtitle/commit/218828676394f0179affa618580c32deb5ee224d))



## [0.5.5](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.4...v0.5.5) (2020-03-08)


### Features

* **renderer sidebar drag style,subtitle too-bar style:** update sidebar subtitle too-bar style ([fbc7877](https://github.com/huskyAreYouScared/subtitle/commit/fbc78778013f39f2ed8c8305f4b84c560347b4c1))



## [0.5.4](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.2...v0.5.4) (2020-03-07)


### Features

* **main ipc-event renderer sidebar, assets iconfont file:** add audio file correlation function ([94c7ce2](https://github.com/huskyAreYouScared/subtitle/commit/94c7ce2e605dac447f8620f30535cfcaea51be12))
* **new config at utils,setting all file,sidbar.vue viewport.vue ..:** 支持上传音频，format m4a,mp3,wav,pcm ([5f3ec65](https://github.com/huskyAreYouScared/subtitle/commit/5f3ec650c89fcbb2b3580810b7a67336454169a0))



## [0.5.3](https://github.com/huskyAreYouScared/subtitle/compare/v0.1.0...v0.5.3) (2020-03-03)


### Bug Fixes

* **main index.js global.js renderer sidebar.vue subtitle.vue main.js:** can use ([7adcfee](https://github.com/huskyAreYouScared/subtitle/commit/7adcfeef542b9dc7f4bcc5d0c6d3ebf5165e902d))


### Features

* **main ipc-event renderer sidebar, assets iconfont file:** add audio file correlation function ([94c7ce2](https://github.com/huskyAreYouScared/subtitle/commit/94c7ce2e605dac447f8620f30535cfcaea51be12))
* **renderer setting and style:** 增加语音识别参数配置 ([5e574b1](https://github.com/huskyAreYouScared/subtitle/commit/5e574b163287b04a4b3509d2132a1fae4efbadea))
* **renderer setting and style,tool.js,menubar.vue and style:** add setting page ([7c17356](https://github.com/huskyAreYouScared/subtitle/commit/7c173565fa3b6b1e275002bd2388c9001d9c64ad))
* **renderer subtitle:** 增加文件过滤，保存文件自动处理后缀名 ([eda313c](https://github.com/huskyAreYouScared/subtitle/commit/eda313c400953dc88ad89c3c38f3d5dfe9546449))
* **renderer subtitle and style file:** add subtitle bcc type file ([e942d7b](https://github.com/huskyAreYouScared/subtitle/commit/e942d7bdd3764008d9cef6045eb01f5da6bfae61))
* **utils datastore,renderer subtitle main:** add local storage ([8ab22d8](https://github.com/huskyAreYouScared/subtitle/commit/8ab22d80330f4fc2bc18ca4d3390d909c10ad489))



## [0.5.2](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.1...v0.5.2) (2020-03-01)


### Features

* **renderer setting and style:** 增加语音识别参数配置 ([5e574b1](https://github.com/huskyAreYouScared/subtitle/commit/5e574b163287b04a4b3509d2132a1fae4efbadea))



## [0.5.1](https://github.com/huskyAreYouScared/subtitle/compare/v0.5.0...v0.5.1) (2020-02-28)


### Features

* **renderer setting and style,tool.js,menubar.vue and style:** add setting page ([7c17356](https://github.com/huskyAreYouScared/subtitle/commit/7c173565fa3b6b1e275002bd2388c9001d9c64ad))



# [0.5.0](https://github.com/huskyAreYouScared/subtitle/compare/v0.4.0...v0.5.0) (2020-02-27)


### Features

* **utils datastore,renderer subtitle main:** add local storage ([8ab22d8](https://github.com/huskyAreYouScared/subtitle/commit/8ab22d80330f4fc2bc18ca4d3390d909c10ad489))



# [0.4.0](https://github.com/huskyAreYouScared/subtitle/compare/v0.3.0...v0.4.0) (2020-02-25)


### Features

* **renderer subtitle:** 增加文件过滤，保存文件自动处理后缀名 ([eda313c](https://github.com/huskyAreYouScared/subtitle/commit/eda313c400953dc88ad89c3c38f3d5dfe9546449))



# [0.3.0](https://github.com/huskyAreYouScared/subtitle/compare/v0.2.0...v0.3.0) (2020-02-24)


### Features

* **renderer subtitle and style file:** add subtitle bcc type file ([e942d7b](https://github.com/huskyAreYouScared/subtitle/commit/e942d7bdd3764008d9cef6045eb01f5da6bfae61))



# 0.2.0 (2020-02-24)


### Bug Fixes

* **main index.js global.js renderer sidebar.vue subtitle.vue main.js:** can use ([7adcfee](https://github.com/huskyAreYouScared/subtitle/commit/7adcfeef542b9dc7f4bcc5d0c6d3ebf5165e902d))


### Features

* **changelog.md:** 增加日志给予convertional-changelog ([0b74345](https://github.com/huskyAreYouScared/subtitle/commit/0b74345450d73194cc9f3a0203e7fc72722e4f1b))


### Performance Improvements

* version命令修改 ([b9b9218](https://github.com/huskyAreYouScared/subtitle/commit/b9b9218bdfe167b86d7fba3808306926a44c7a90))



# 0.1.0 (2020-02-24)


### Features

* **changelog.md:** 增加日志给予convertional-changelog ([0b74345](https://github.com/huskyAreYouScared/subtitle/commit/0b74345450d73194cc9f3a0203e7fc72722e4f1b))


### Performance Improvements

* version命令修改 ([b9b9218](https://github.com/huskyAreYouScared/subtitle/commit/b9b9218bdfe167b86d7fba3808306926a44c7a90))



# 0.1.0 (2020-02-05)


### Features

* **changelog.md:** 增加日志给予convertional-changelog ([0b74345](https://github.com/huskyAreYouScared/subtitle/commit/0b74345450d73194cc9f3a0203e7fc72722e4f1b))


### Performance Improvements

* version命令修改 ([b9b9218](https://github.com/huskyAreYouScared/subtitle/commit/b9b9218bdfe167b86d7fba3808306926a44c7a90))



## 0.0.1 (2020-02-05)



