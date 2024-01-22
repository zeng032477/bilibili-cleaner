import { GM_getValue } from '$'
import { WordList } from '../../../components/wordlist'
import { debugFilter } from '../../../utils/logger'
import agencyInstance from '../../agency/agency'
import bvidFilterInstance from '../../filters/subfilters/bvid'
import durationFilterInstance from '../../filters/subfilters/duration'
import titleKeywordFilterInstance from '../../filters/subfilters/titleKeyword'
import titleKeywordWhitelistFilterInstance from '../../filters/subfilters/titleKeywordWhitelist'
import uploaderFilterInstance from '../../filters/subfilters/uploader'
import uploaderWhitelistFilterInstance from '../../filters/subfilters/uploaderWhitelist'

// 定义各种黑名单功能、白名单功能的属性和行为
interface Action {
    statusKey: string
    valueKey: string
    status: boolean
    value: number | string | string[]
    // 检测视频列表的函数
    checkVideoList(fullSite: boolean): void
    blacklist?: WordList
    whitelist?: WordList

    enable(): void
    disable(): void
    change?(value: number): void
    add?(value: string): void
    edit?(value: string[]): void
}

/**
 * 将类的成员函数作为参数传递时，【必须】使用箭头函数包裹，避免出现this上下文丢失问题
 */

export class DurationAction implements Action {
    statusKey: string
    valueKey: string
    checkVideoList: (fullSite: boolean) => void
    status: boolean
    value: number

    /**
     * 时长过滤操作
     * @param statusKey 是否启用的GM key
     * @param valueKey 存储数据的GM key
     * @param checkVideoList 检测视频列表函数
     */
    constructor(statusKey: string, valueKey: string, checkVideoList: (fullSite: boolean) => void) {
        this.statusKey = statusKey
        this.valueKey = valueKey
        this.checkVideoList = checkVideoList
        this.status = GM_getValue(`BILICLEANER_${this.statusKey}`, false)
        this.value = GM_getValue(`BILICLEANER_${this.valueKey}`, 60)
        // 配置子过滤器
        durationFilterInstance.setStatus(this.status)
        durationFilterInstance.setParams(this.value)
    }
    enable() {
        debugFilter(`DurationAction enable`)
        // 告知agency
        agencyInstance.notifyDuration('enable')
        // 触发全站过滤
        this.checkVideoList(true)
    }
    disable() {
        debugFilter(`DurationAction disable`)
        agencyInstance.notifyDuration('disable')
        this.checkVideoList(true)
    }
    change(value: number) {
        debugFilter(`DurationAction change ${value}`)
        agencyInstance.notifyDuration('change', value)
        this.checkVideoList(true)
    }
}

export class UploaderAction implements Action {
    statusKey: string
    valueKey: string
    checkVideoList: (fullSite: boolean) => void
    status: boolean
    value: string[]
    blacklist: WordList

    /**
     * UP主过滤操作
     * @param statusKey 是否启用的GM key
     * @param valueKey 存储数据的GM key
     * @param checkVideoList 检测视频列表函数
     */
    constructor(statusKey: string, valueKey: string, checkVideoList: (fullSite: boolean) => void) {
        this.statusKey = statusKey
        this.valueKey = valueKey
        this.status = GM_getValue(`BILICLEANER_${this.statusKey}`, false)
        this.value = GM_getValue(`BILICLEANER_${this.valueKey}`, [])
        this.checkVideoList = checkVideoList

        // 配置子过滤器
        uploaderFilterInstance.setStatus(this.status)
        uploaderFilterInstance.setParams(this.value)
        // 初始化黑名单, callback触发edit, 必需用箭头函数
        this.blacklist = new WordList(this.valueKey, 'UP主 黑名单', (values: string[]) => {
            this.edit(values)
        })
    }

    enable() {
        // 告知agency
        agencyInstance.notifyUploader('enable')
        // 触发全站过滤
        this.checkVideoList(true)
    }
    disable() {
        agencyInstance.notifyUploader('disable')
        this.checkVideoList(true)
    }
    add(value: string) {
        this.blacklist.addValue(value)
        agencyInstance.notifyUploader('add', value)
        this.checkVideoList(true)
    }
    // edit由编辑黑名单的保存动作回调, 数据由编辑器实例存储
    edit(values: string[]) {
        agencyInstance.notifyUploader('edit', values)
        this.checkVideoList(true)
    }
}

export class BvidAction implements Action {
    statusKey: string
    valueKey: string
    checkVideoList: (fullSite: boolean) => void
    status: boolean
    value: string[]
    blacklist: WordList

    /**
     * BV号过滤操作
     * @param statusKey 是否启用的GM key
     * @param valueKey 存储数据的GM key
     * @param checkVideoList 检测视频列表函数
     */
    constructor(statusKey: string, valueKey: string, checkVideoList: (fullSite: boolean) => void) {
        this.statusKey = statusKey
        this.valueKey = valueKey
        this.status = GM_getValue(`BILICLEANER_${this.statusKey}`, false)
        this.value = GM_getValue(`BILICLEANER_${this.valueKey}`, [])
        this.checkVideoList = checkVideoList

        // 配置子过滤器
        bvidFilterInstance.setStatus(this.status)
        bvidFilterInstance.setParams(this.value)
        // 初始化黑名单, callback触发edit
        this.blacklist = new WordList(this.valueKey, 'BV号 黑名单', (values: string[]) => {
            this.edit(values)
        })
    }

    enable() {
        // 告知agency
        agencyInstance.notifyBvid('enable')
        // 触发全站过滤
        this.checkVideoList(true)
    }
    disable() {
        agencyInstance.notifyBvid('disable')
        this.checkVideoList(true)
    }
    add(value: string) {
        this.blacklist.addValue(value)
        agencyInstance.notifyBvid('add', value)
        this.checkVideoList(true)
    }
    // edit由编辑黑名单的保存动作回调, 数据由编辑器实例存储
    edit(values: string[]) {
        agencyInstance.notifyBvid('edit', values)
        this.checkVideoList(true)
    }
}

export class TitleKeywordAction implements Action {
    statusKey: string
    valueKey: string
    checkVideoList: (fullSite: boolean) => void
    status: boolean
    value: string[]
    blacklist: WordList

    /**
     * 标题关键字过滤操作
     * @param statusKey 是否启用的GM key
     * @param valueKey 存储数据的GM key
     * @param checkVideoList 检测视频列表函数
     */
    constructor(statusKey: string, valueKey: string, checkVideoList: (fullSite: boolean) => void) {
        this.statusKey = statusKey
        this.valueKey = valueKey
        this.status = GM_getValue(`BILICLEANER_${this.statusKey}`, false)
        this.value = GM_getValue(`BILICLEANER_${this.valueKey}`, [])
        this.checkVideoList = checkVideoList

        // 配置子过滤器
        titleKeywordFilterInstance.setStatus(this.status)
        titleKeywordFilterInstance.setParams(this.value)
        // 初始化黑名单, callback触发edit
        this.blacklist = new WordList(this.valueKey, '标题关键词 黑名单', (values: string[]) => {
            this.edit(values)
        })
    }

    enable() {
        // 告知agency
        agencyInstance.notifyTitleKeyword('enable')
        // 触发全站过滤
        this.checkVideoList(true)
    }
    disable() {
        agencyInstance.notifyTitleKeyword('disable')
        this.checkVideoList(true)
    }
    add(value: string) {
        this.blacklist.addValue(value)
        agencyInstance.notifyTitleKeyword('add', value)
        this.checkVideoList(true)
    }
    // edit由编辑黑名单的保存动作回调, 数据由编辑器实例存储
    edit(values: string[]) {
        agencyInstance.notifyTitleKeyword('edit', values)
        this.checkVideoList(true)
    }
}

export class UploaderWhitelistAction implements Action {
    statusKey: string
    valueKey: string
    checkVideoList: (fullSite: boolean) => void
    status: boolean
    value: string[]
    whitelist: WordList

    /**
     * UP主白名单, 不被过滤
     * @param statusKey 是否启用的GM key
     * @param valueKey 存储数据的GM key
     * @param checkVideoList 检测视频列表函数
     */
    constructor(statusKey: string, valueKey: string, checkVideoList: (fullSite: boolean) => void) {
        this.statusKey = statusKey
        this.valueKey = valueKey
        this.status = GM_getValue(`BILICLEANER_${this.statusKey}`, false)
        this.value = GM_getValue(`BILICLEANER_${this.valueKey}`, [])
        this.checkVideoList = checkVideoList

        // 配置子过滤器
        uploaderWhitelistFilterInstance.setStatus(this.status)
        uploaderWhitelistFilterInstance.setParams(this.value)
        // 初始化白名单, callback触发edit
        this.whitelist = new WordList(this.valueKey, 'UP主 白名单', (values: string[]) => {
            this.edit(values)
        })
    }

    enable() {
        // 告知agency
        agencyInstance.notifyUploaderWhitelist('enable')
        // 触发全站过滤
        this.checkVideoList(true)
    }
    disable() {
        agencyInstance.notifyUploaderWhitelist('disable')
        this.checkVideoList(true)
    }
    // edit由编辑白名单的保存动作回调, 数据由编辑器实例存储
    edit(values: string[]) {
        agencyInstance.notifyUploaderWhitelist('edit', values)
        this.checkVideoList(true)
    }
}

export class TitleKeywordWhitelistAction implements Action {
    statusKey: string
    valueKey: string
    checkVideoList: (fullSite: boolean) => void
    status: boolean
    value: string[]
    whitelist: WordList

    /**
     * 标题关键词白名单, 不被过滤
     * @param statusKey 是否启用的GM key
     * @param valueKey 存储数据的GM key
     * @param checkVideoList 检测视频列表函数
     */
    constructor(statusKey: string, valueKey: string, checkVideoList: (fullSite: boolean) => void) {
        this.statusKey = statusKey
        this.valueKey = valueKey
        this.status = GM_getValue(`BILICLEANER_${this.statusKey}`, false)
        this.value = GM_getValue(`BILICLEANER_${this.valueKey}`, [])
        this.checkVideoList = checkVideoList

        // 配置子过滤器
        titleKeywordWhitelistFilterInstance.setStatus(this.status)
        titleKeywordWhitelistFilterInstance.setParams(this.value)
        // 初始化白名单, callback触发edit
        this.whitelist = new WordList(this.valueKey, '标题关键词 白名单', (values: string[]) => {
            this.edit(values)
        })
    }

    enable() {
        // 告知agency
        agencyInstance.notifyTitleKeywordWhitelist('enable')
        // 触发全站过滤
        this.checkVideoList(true)
    }
    disable() {
        agencyInstance.notifyTitleKeywordWhitelist('disable')
        this.checkVideoList(true)
    }
    // edit由编辑白名单的保存动作回调, 数据由编辑器实例存储
    edit(values: string[]) {
        agencyInstance.notifyTitleKeywordWhitelist('edit', values)
        this.checkVideoList(true)
    }
}
