import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Logger } from 'nest-logs';
import { getParamFormString } from './utils';
import { encode } from './utils/obfuscator';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async sendMsg(d, msisdn): Promise<any> {
    if (d == null || d == '') return '错误';
    const params = new Buffer(d.replace(/_/g, '='), 'base64').toString();
    // const appId = getParamFormString('a', params);
    const clickId = getParamFormString('k', params);
    const bundleId = getParamFormString('b', params);
    // const channelId = getParamFormString('c', params);
    const sign = getParamFormString('s', params);
    const ts = getParamFormString('t', params);
    // const msisdn = getParamFormString('m', params);
    const type = msisdn ? 2 : 1;
    const dataInfo = {
      mobileNumber: msisdn.substring(3),
      code: '',
      clickId: clickId,
      bundleId: bundleId,
      sign: sign,
      ts: ts,
      type: type,
      deviceInfo: '',
    };
    Logger.debug(dataInfo);
    const checkResultObservable = this.httpService.post(
      'http://www.games-box.net/vas/user/land/login',
      dataInfo,
    );
    return (await lastValueFrom(checkResultObservable)).data;
  }
  clObfuscator(sourceCode) {
    return encode(sourceCode);
  }
}
