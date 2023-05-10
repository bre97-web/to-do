import moment from "moment"


type Index = number

function useIndex(): Index {
    return parseInt(moment().format('x'))
}

export {
    useIndex
}