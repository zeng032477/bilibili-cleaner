import { Group } from '../components/group'
import { CheckboxItem, NumberItem } from '../components/item'
import { isPageChannel } from '../utils/page-type'

const channelGroupList: Group[] = []

if (isPageChannel()) {
    // 基础项
    const basicItems = [
        // 隐藏 横幅banner, 同步首页设定
        new CheckboxItem({
            itemID: 'homepage-hide-banner',
            description: '隐藏 横幅banner',
            itemCSS: `.header-banner__inner, .bili-header__banner {
                    display: none !important;
                }
                .bili-header .bili-header__bar:not(.slide-down) {
                    position: relative !important;
                    box-shadow: 0 2px 4px #00000014;
                }
                .bili-header__channel {
                    margin-top: 5px !important;
                }
                /* icon和文字颜色 */
                .bili-header .right-entry__outside .right-entry-icon {
                    color: #18191c !important;
                }
                .bili-header .left-entry .entry-title, .bili-header .left-entry .download-entry, .bili-header .left-entry .default-entry, .bili-header .left-entry .loc-entry {
                    color: #18191c !important;
                }
                .bili-header .left-entry .entry-title .zhuzhan-icon {
                    color: #00aeec !important;
                }
                .bili-header .right-entry__outside .right-entry-text {
                    color: #61666d !important;
                }
                /* header滚动后渐变出现, 否则闪动 */
                #i_cecream .bili-header__bar.slide-down {
                    transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out !important;
                }
                #i_cecream .bili-header__bar:not(.slide-down) {
                    transition: background-color 0.3s ease-out !important;
                }
                /* header高度 */
                #biliMainHeader {min-height: unset !important;}
                `,
        }),
        // 隐藏 全站分区栏
        new CheckboxItem({
            itemID: 'channel-hide-subarea',
            description: '隐藏 全站分区栏',
            itemCSS: `#i_cecream .bili-header__channel {display: none !important;}`,
        }),
        // 隐藏 大图轮播
        new CheckboxItem({
            itemID: 'channel-hide-carousel',
            description: '隐藏 大图轮播',
            itemCSS: `.channel-swiper, .channel-swiper-client {display: none !important;}`,
        }),
        // 隐藏 滚动页面时 顶部吸附频道分区
        new CheckboxItem({
            itemID: 'channel-hide-sticky-subchannel',
            description: '隐藏 滚动页面时 顶部吸附 频道分区',
            itemCSS: `.fixed-header-nav-sticky {display: none !important;}
                    .fixed-wrapper-shown {box-shadow: unset !important;}`,
        }),
        // 隐藏 滚动页面时 顶部吸附顶栏
        new CheckboxItem({
            itemID: 'channel-hide-sticky-header',
            description: '隐藏 滚动页面时 顶部吸附 顶栏',
            itemCSS: `.bili-header__bar.slide-down {display: none !important;}`,
        }),
        // 修改 页面两侧边距
        new NumberItem({
            itemID: 'channel-layout-padding',
            description: '修改 页面两侧边距 (-1禁用)',
            defaultValue: -1,
            minValue: -1,
            maxValue: 500,
            disableValue: -1,
            unit: 'px',
            itemCSS: `.go-back-btn, .channel-layout, .channel-outer-nav {padding: 0 ???px !important;}`,
            itemCSSPlaceholder: '???',
        }),
    ]
    channelGroupList.push(new Group('channel-basic', '频道页 基础功能', basicItems))

    // 视频列表
    const videoListItems = [
        // 隐藏 前方高能右侧 话题精选
        // 适配视频过滤，不对元素做nth-child判断
        // 使用grid-template-rows: 1fr auto 控制两行显示
        // 使用grid-auto-rows: 0px隐藏第三行
        new CheckboxItem({
            itemID: 'channel-hide-high-energy-topic',
            description: '隐藏 前方高能右侧 话题精选',
            itemCSS: `
            .bili-grid:has([data-report="high_energy.content"]) {
                grid-template-columns: unset !important;
                margin-top: 0 !important;
                margin-bottom: 20px !important;
            }
            .bili-grid:has([data-report="high_energy.content"]) aside[data-report="topic.card"] {
                display: none !important;
            }
            .bili-grid:has([data-report="high_energy.content"]) .video-card-list,
            .video-double-full {
                min-height: unset !important;
            }
            @media (max-width: 1099.9px) {
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body {
                    grid-column: span 4;
                    grid-template-columns: repeat(4, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body>*:nth-of-type(1n + 7) {
                    display: unset !important
                }
            }
            @media (min-width: 1100px) and (max-width: 1366.9px) {
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body {
                    grid-column: span 5;
                    grid-template-columns: repeat(5, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body>*:nth-of-type(1n + 9) {
                    display: unset !important
                }
            }
            @media (min-width: 1367px) and (max-width: 1700.9px) {
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body {
                    grid-column: span 5;
                    grid-template-columns: repeat(5, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body>*:nth-of-type(1n + 9) {
                    display: unset !important
                }
            }
            @media (min-width: 1701px) and (max-width: 2199.9px) {
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body {
                    grid-column: span 6;
                    grid-template-columns: repeat(6, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body>*:nth-of-type(1n + 11) {
                    display: unset !important
                }
            }
            @media (min-width: 2200px) {
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body {
                    grid-column: span 6;
                    grid-template-columns: repeat(6, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has([data-report="high_energy.content"]) .video-card-list .video-card-body>*:nth-of-type(1n + 13) {
                    display: unset !important
                }
            }
            `,
        }),
        // 隐藏 前方高能栏目
        new CheckboxItem({
            itemID: 'channel-hide-high-energy',
            description: '隐藏 前方高能栏目',
            itemCSS: `.bili-grid:has([data-report="high_energy.content"]) {display: none !important;}`,
        }),
        // 隐藏 视频栏目右侧 热门列表
        new CheckboxItem({
            itemID: 'channel-hide-rank-list',
            description: '隐藏 视频栏目右侧 热门列表',
            itemCSS: `
            .bili-grid:has(.rank-list) {
                grid-template-columns: unset !important;
                margin-top: 0 !important;
                margin-bottom: 20px !important;
            }
            .bili-grid:has(.rank-list) aside {
                display: none !important;
            }
            .bili-grid.sub-dynamic:has(.rank-list),
            .bili-grid:has(.rank-list) .video-card-list {
                min-height: unset !important;
            }
            @media (max-width: 1099.9px) {
                .bili-grid:has(.rank-list) .video-card-list .video-card-body {
                    grid-column: span 4;
                    grid-template-columns: repeat(4, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has(.rank-list) .video-card-list .video-card-body>*:nth-of-type(1n + 7) {
                    display: unset !important
                }
            }
            @media (min-width: 1100px) and (max-width: 1366.9px) {
                .bili-grid:has(.rank-list) .video-card-list .video-card-body {
                    grid-column: span 5;
                    grid-template-columns: repeat(5, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has(.rank-list) .video-card-list .video-card-body>*:nth-of-type(1n + 9) {
                    display: unset !important
                }
            }
            @media (min-width: 1367px) and (max-width: 1700.9px) {
                .bili-grid:has(.rank-list) .video-card-list .video-card-body {
                    grid-column: span 5;
                    grid-template-columns: repeat(5, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has(.rank-list) .video-card-list .video-card-body>*:nth-of-type(1n + 9) {
                    display: unset !important
                }
            }
            @media (min-width: 1701px) and (max-width: 2199.9px) {
                .bili-grid:has(.rank-list) .video-card-list .video-card-body {
                    grid-column: span 6;
                    grid-template-columns: repeat(6, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has(.rank-list) .video-card-list .video-card-body>*:nth-of-type(1n + 11) {
                    display: unset !important
                }
            }
            @media (min-width: 2200px) {
                .bili-grid:has(.rank-list) .video-card-list .video-card-body {
                    grid-column: span 6;
                    grid-template-columns: repeat(6, 1fr);
                    overflow: hidden;
                    /* grid-template-rows: repeat(2, 1fr); */
                    grid-template-rows: 1fr auto;
                    grid-auto-rows: 0px;
                }
                .bili-grid:has(.rank-list) .video-card-list .video-card-body>*:nth-of-type(1n + 13) {
                    display: unset !important
                }
            }`,
        }),
        // 隐藏 广告banner
        new CheckboxItem({
            itemID: 'channel-hide-ad-banner',
            description: '隐藏 广告banner',
            defaultStatus: true,
            itemCSS: `.eva-banner {display: none !important;}
                    .bili-grid {margin-bottom: 20px !important;}`,
        }),
        // 隐藏 发布时间
        new CheckboxItem({
            itemID: 'channel-hide-video-info-date',
            description: '隐藏 发布时间',
            itemCSS: `.bili-video-card__info--date {display: none !important;}`,
        }),
        // 隐藏 弹幕数, 默认开启
        new CheckboxItem({
            itemID: 'channel-hide-danmaku-count',
            description: '隐藏 弹幕数',
            defaultStatus: true,
            itemCSS: `.bili-video-card__stats--item:nth-child(2) {visibility: hidden;}`,
        }),
        // 隐藏 稍后再看按钮
        new CheckboxItem({
            itemID: 'channel-hide-bili-watch-later',
            description: '隐藏 稍后再看按钮',
            itemCSS: `.bili-watch-later {display: none !important;}`,
        }),
        // 优化 近期投稿栏目 视频行距, 默认开启
        new CheckboxItem({
            itemID: 'channel-feed-card-body-grid-gap',
            description: '优化 近期投稿栏目 视频行距',
            defaultStatus: true,
            itemCSS: `.feed-card-body {grid-gap: 20px 12px !important;}`,
        }),
        // 增大 视频信息字号
        new CheckboxItem({
            itemID: 'channel-increase-rcmd-list-font-size',
            description: '增大 视频信息字号',
            itemCSS: `.bili-video-card .bili-video-card__info--tit,
                .bili-live-card .bili-live-card__info--tit,
                .single-card.floor-card .title {
                    font-size: 16px !important;
                }
                .bili-video-card .bili-video-card__info--bottom,
                .floor-card .sub-title.sub-title {
                    font-size: 14px !important;
                }
                .bili-video-card__stats,
                .bili-video-card__stats .bili-video-card__stats--left,
                .bili-video-card__stats .bili-video-card__stats--right {
                    font-size: 14px !important;
                }`,
        }),
    ]
    channelGroupList.push(new Group('channel-video', '视频列表', videoListItems))

    // 页面右下角 小按钮
    const sidebarItems = [
        // 隐藏 新版反馈, 默认开启
        new CheckboxItem({
            itemID: 'channel-hide-feedback',
            description: '隐藏 新版反馈',
            defaultStatus: true,
            itemCSS: `.palette-button-wrap .feedback {display: none !important;}`,
        }),
        // 隐藏 回顶部
        new CheckboxItem({
            itemID: 'channel-hide-top-btn',
            description: '隐藏 回顶部',
            itemCSS: `.palette-button-wrap .top-btn-wrap {display: none !important;}`,
        }),
    ]
    channelGroupList.push(new Group('channel-sidebar', '页面右下角 小按钮', sidebarItems))
}

export { channelGroupList }
