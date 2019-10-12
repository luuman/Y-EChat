// 日期计算--兼容问题
export const formatDate = (today) => {
  let Times = new Date(today)
  let month = '' + (Times.getMonth() + 1)
  let day = '' + Times.getDate()
  let year = Times.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  let data = `${year}.${month}.${day}`
  return data
}

export const formatType = (today) => {
  let Times = new Date(today)
  let month = '' + (Times.getMonth() + 1)
  let day = '' + Times.getDate()
  let year = Times.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  let data = `${month} ${day},${year}`
  return data
}

// 字母排序对象数据（A -> Z, 65 -> 90）
export const formatAlphabeticalOrder = (data) => {
  let sortObj = {}
  for (let i = 65; i <= 90; i++) {
    if (data[String.fromCharCode(i)]) {
      sortObj[String.fromCharCode(i)] = data[String.fromCharCode(i)]
    }
  }
  return sortObj
}

/**
 * 时间戳格式化函数
 * @param {string} format 格式
 * @param {int} timestamp 要格式化的时间 默认为当前时间
 * @return {string}   格式化的时间字符串
 * Y-m-d H:i:s
 */
export const formatTimestamp = (format, timestamp) => {
  // let a
  let jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date())
  let pad = (n, c) => {
    if ((n = n + '').length < c) {
      return new Array(++c - n.length).join('0') + n
    } else {
      return n
    }
  }
  let txtWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let txtOrdin = {1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st'}
  let txtMonths = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let f = {
    d () {
      return pad(f.j(), 2)
    },
    D () {
      return f.l().substr(0, 3)
    },
    j () {
      return jsdate.getDate()
    },
    l () {
      return txtWeekdays[f.w()]
    },
    N () {
      return f.w() + 1
    },
    S () {
      return txtOrdin[f.j()] ? txtOrdin[f.j()] : 'th'
    },
    w () {
      return jsdate.getDate()
    },
    z () {
      return (jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 864e5 >> 0
    },
    // Week
    W () {
      let a = f.z()
      let b = 364 + f.L() - a
      let nd2
      let nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return formatTimestamp('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0)
        }
      }
    },
    // Month
    F () {
      return txtMonths[f.n()]
    },
    m () {
      return pad(f.n(), 2)
    },
    M () {
      return f.F().substr(0, 3)
    },
    n () {
      return jsdate.getMonth() + 1
    },
    t () {
      let n = jsdate.getMonth() + 1
      if (n === 2) {
        return 28 + f.L()
      } else {
        if (n & 1 && n < 8 || !(n & 1) && n > 7) {
          return 31
        } else {
          return 30
        }
      }
    },
    // Year
    L () {
      let y = f.Y()
      return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
    },
    // o not supported yet
    Y () {
      return jsdate.getFullYear()
    },
    y () {
      return (jsdate.getFullYear() + '').slice(2)
    },
    // Time
    a () {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A () {
      return f.a().toUpperCase()
    },
    B () {
      let off = (jsdate.getTimezoneOffset() + 60) * 60
      let theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) beat -= 1000
      if (beat < 0) beat += 1000
      if ((String(beat)).length === 1) beat = '00' + beat
      if ((String(beat)).length === 2) beat = '0' + beat
      return beat
    },
    g () {
      return jsdate.getHours() % 12 || 12
    },
    G () {
      return jsdate.getHours()
    },
    h () {
      return pad(f.g(), 2)
    },
    H () {
      return pad(jsdate.getHours(), 2)
    },
    i () {
      return pad(jsdate.getMinutes(), 2)
    },
    s () {
      return pad(jsdate.getSeconds(), 2)
    },
    // u not supported yet
    // Timezone
    O () {
      let t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) t = '-' + t
      else t = '+' + t
      return t
    },
    P () {
      let O = f.O()
      return (O.substr(0, 3) + ':' + O.substr(3, 2))
    },
    c () {
      return f.Y() + '-' + f.m() + '-' + f.d() + 'T' + f.h() + ':' + f.i() + ':' + f.s() + f.P()
    },
    U () {
      return Math.round(jsdate.getTime() / 1000)
    }
  }
  let reg = /[\\]?([a-zA-Z])/g
  return format.replace(reg, function (t, s) {
    let ret
    if (t !== s) {
      // escaped
      ret = s
    } else if (f[s]) {
      // a date function exists
      ret = f[s]()
    } else {
      // nothing special
      ret = s
    }
    return ret
  })
}
