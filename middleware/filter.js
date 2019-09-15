import moment from 'moment'

export const time = (value) => {

  return moment(value).format("YYYY-MM-DD HH:mm:ss");

}
