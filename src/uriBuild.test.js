/* @flow */

import { urlBuild } from './index';

describe('uriBuild()', () => {
  const
    scheme = 'http:',
    host = 'my.happy.world'
    // port = 3222,
    // path = 'find/us',
    // pathParams = {
    //   country: 'Russia',
    //   town: 'Sevastopol',
    // },
    // query = {
    //   c: '44.6007689,33.4596395',
    //   hl: 'en',
    // }
    ;

  it('should build scheme with host', () => {
    expect(urlBuild({scheme, host})).toEqual('http://my.happy.world');
  });
});
