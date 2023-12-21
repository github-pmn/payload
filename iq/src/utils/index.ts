export function getParamFormString(key, str) {
  let start, end;
  if (
    ('?' == str.substring(0, 1) && (str = '&' + str.substring(1, str.length)),
    (str = '&' + str),
    'string' != typeof key)
  )
    throw new Error('key必须是字符串型');
  return key && str && new RegExp(key + '=', 'g').test(str)
    ? ((key = '&' + key),
      (key += '='),
      (start = str.indexOf(key) + key.length),
      -1 == (end = str.indexOf('&', start)) && (end = str.length),
      str.substring(start, end))
    : '';
}
