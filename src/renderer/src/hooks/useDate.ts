import moment from "moment"

/**
 * 使用YYYY-MM-DD格式的日期作为每一个元素的日期
 * @returns 返回一个YYYY-MM-DD格式的日期
 */
const useDate = (): string => moment().format('YYYY-MM-DD')

export {
    useDate
}