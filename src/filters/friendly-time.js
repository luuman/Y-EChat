export const formatBack = (time) => {
  let date = (typeof time === 'number') ? new Date(time) : new Date((time || '').replace(/-/g, '/'))
  // let diff = (((new Date()).getTime() - date.getTime()) / 1000)
  // console.log((new Date()).getTime() - date.getTime())
  console.log(date)
  // let dayDiff = Math.floor(diff / 86400)

  let isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())

  if (!isValidDate) {
    console.error('not a valid date')
  }
  const formatDate = function (date) {
    let today = new Date(date)
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let hour = today.getHours()
    let minute = today.getMinutes()
    let second = today.getSeconds()
    return `${year}-${month}-${day} ${hour}-${minute}-${second}`
  }
  return formatDate(date)
}

export const friendlyTime = (time) => {
}

export const formatTimeRead = (time) => {
  let date = (typeof time === 'number') ? new Date(time) : new Date((time || '').replace(/-/g, '/'))
  let diff = (((new Date()).getTime() - date.getTime()) / 1000)
  console.log((new Date()).getTime() - date.getTime())
  console.log(diff)
  let dayDiff = Math.floor(diff / 86400)

  let isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())

  if (!isValidDate) {
    console.error('not a valid date')
  }
  const formatDate = function (date) {
    let today = new Date(date)
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let hour = today.getHours()
    let minute = today.getMinutes()
    let second = today.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return formatDate(date)
  }

  return dayDiff === 0 && (
      diff < 60 && '刚刚' ||
      diff < 120 && '1分钟前' ||
      diff < 3600 && Math.floor(diff / 60) + '分钟前' ||
      diff < 7200 && '1小时前' ||
      diff < 86400 && Math.floor(diff / 3600) + '小时前') ||
    dayDiff === 1 && '昨天' ||
    dayDiff < 7 && dayDiff + '天前' ||
    dayDiff < 31 && Math.ceil(dayDiff / 7) + '周前'
}

// http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
// [1, 'Just Now', 'Just Now'],
// [2, '1 Second Ago', '1 Second From Now'],
// [60, 'Seconds', 1],                         // 60
// [120, '1 Minute Ago', '1 Minute From Now'], // 60*2
// [3600, 'Minutes', 60],                      // 60*60, 60
// [7200, '1 Hour Ago', '1 Hour From Now'],    // 60*60*2
// [86400, 'Hours', 3600],                     // 60*60*24, 60*60
// [172800, 'Yesterday', 'Tomorrow'],          // 60*60*24*2
// [604800, 'Days', 86400],                    // 60*60*24*7, 60*60*24
// [1209600, 'Last Week', 'Next Week'],        // 60*60*24*7*4*2
// [2628000, 'Weeks', 604800],                 // 30.416 days
// [5256000, 'Last Month', 'Next Month'],      // 60.832 days
// [31557600, 'Months', 2628000],              // 365.25 days
// [63115200, 'Last Year', 'Next Year']
