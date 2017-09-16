/* @flow */

import { uriBuild } from './index';

describe('uriBuild()', () => {
  const
    scheme = 'http:',
    host = 'my.happy.world',
    port = 3222,
    path = 'find/us',
    pathParams = {
      country: 'Russia',
      town: 'Sevastopol',
    },
    query = {
      time: '333',
      locale: 'ru',
    }
    ;

  it('should build scheme with host', () => {
    expect(uriBuild({scheme, host})).toEqual('http://my.happy.world');
  });

  it('should build scheme with host and port', () => {
    expect(uriBuild({scheme, host, port})).toEqual('http://my.happy.world:3222');
  });

  it('should error out when scheme provided without host', () => {
    expect(() => uriBuild({scheme})).toThrowError();
  });

  it('should build with host only', () => {
    expect(uriBuild({host})).toEqual('my.happy.world');
  });

  it('should build with host and port', () => {
    expect(uriBuild({host, port})).toEqual('my.happy.world:3222');
  });

  it('should build with path only', () => {
    expect(uriBuild({path})).toEqual('find/us');
    expect(uriBuild({path: '/find/us'})).toEqual('/find/us');
    expect(uriBuild({path: '/find/us/'})).toEqual('/find/us');
  });

  it('should build with parametrized path', () => {
    expect(uriBuild({path: 'find/us/:country/:town', pathParams})).toEqual('find/us/Russia/Sevastopol');
    expect(uriBuild({path: '/find/us/:country/:town', pathParams})).toEqual('/find/us/Russia/Sevastopol');
    expect(uriBuild({path: '/find/us/:country/:town/', pathParams})).toEqual('/find/us/Russia/Sevastopol');
  });

  it('should error out when no params passed with parametrized path', () => {
    expect(() => uriBuild({path: '/find/us/:country/:town'})).toThrowError();
  });

  it('should build with mixed host, port and path', () => {
    expect(uriBuild({host, path})).toEqual('my.happy.world/find/us');
    expect(uriBuild({host, path: '/find/us'})).toEqual('my.happy.world/find/us');
    expect(uriBuild({host, path: '/find/us/'})).toEqual('my.happy.world/find/us');
    expect(uriBuild({host, port, path})).toEqual('my.happy.world:3222/find/us');
    expect(uriBuild({host, port, path: '/find/us'})).toEqual('my.happy.world:3222/find/us');
    expect(uriBuild({host, port, path: '/find/us/'})).toEqual('my.happy.world:3222/find/us');
    expect(uriBuild({host, port, path: 'find/us/:country/:town', pathParams}))
      .toEqual('my.happy.world:3222/find/us/Russia/Sevastopol');
    expect(uriBuild({host, port, path: '/find/us/:country/:town', pathParams}))
      .toEqual('my.happy.world:3222/find/us/Russia/Sevastopol');
    expect(uriBuild({host, port, path: '/find/us/:country/:town/', pathParams}))
      .toEqual('my.happy.world:3222/find/us/Russia/Sevastopol');
  });

  it('should build with mixed scheme, host, port and path', () => {
    expect(uriBuild({scheme, host, path})).toEqual('http://my.happy.world/find/us');
    expect(uriBuild({scheme, host, path: '/find/us'})).toEqual('http://my.happy.world/find/us');
    expect(uriBuild({scheme, host, path: '/find/us/'})).toEqual('http://my.happy.world/find/us');
    expect(uriBuild({scheme, host, port, path})).toEqual('http://my.happy.world:3222/find/us');
    expect(uriBuild({scheme, host, port, path: '/find/us'})).toEqual('http://my.happy.world:3222/find/us');
    expect(uriBuild({scheme, host, port, path: '/find/us/'})).toEqual('http://my.happy.world:3222/find/us');
    expect(uriBuild({scheme, host, port, path: 'find/us/:country/:town', pathParams}))
      .toEqual('http://my.happy.world:3222/find/us/Russia/Sevastopol');
    expect(uriBuild({scheme, host, port, path: '/find/us/:country/:town', pathParams}))
      .toEqual('http://my.happy.world:3222/find/us/Russia/Sevastopol');
    expect(uriBuild({scheme, host, port, path: '/find/us/:country/:town/', pathParams}))
      .toEqual('http://my.happy.world:3222/find/us/Russia/Sevastopol');
  });

  it('should build query only', () => {
    expect(uriBuild({query})).toEqual('time=333&locale=ru');
  });

  it('should build path with query', () => {
    expect(uriBuild({path, query})).toEqual('find/us?time=333&locale=ru');
    expect(uriBuild({path: '/find/us', query})).toEqual('/find/us?time=333&locale=ru');
    expect(uriBuild({path: '/find/us/', query})).toEqual('/find/us?time=333&locale=ru');
    expect(uriBuild({path: 'find/us/:country/:town', pathParams, query}))
      .toEqual('find/us/Russia/Sevastopol?time=333&locale=ru');
    expect(uriBuild({path: 'find/us/:country/:town/', pathParams, query}))
      .toEqual('find/us/Russia/Sevastopol?time=333&locale=ru');
    expect(uriBuild({path: '/find/us/:country/:town/', pathParams, query}))
      .toEqual('/find/us/Russia/Sevastopol?time=333&locale=ru');
  });

  it('should build with mixed host, port and query', () => {
    expect(uriBuild({host, query})).toEqual('my.happy.world?time=333&locale=ru');
    expect(uriBuild({host, port, query})).toEqual('my.happy.world:3222?time=333&locale=ru');
  });

  it('should build with mixed scheme, host, port and query', () => {
    expect(uriBuild({scheme, host, query})).toEqual('http://my.happy.world?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, query})).toEqual('http://my.happy.world:3222?time=333&locale=ru');
  });

  it('should build with mixed host, port, path and query', () => {
    expect(uriBuild({host, path, query})).toEqual('my.happy.world/find/us?time=333&locale=ru');
    expect(uriBuild({host, path: '/find/us', query})).toEqual('my.happy.world/find/us?time=333&locale=ru');
    expect(uriBuild({host, path: '/find/us/', query})).toEqual('my.happy.world/find/us?time=333&locale=ru');
    expect(uriBuild({host, port, path, query})).toEqual('my.happy.world:3222/find/us?time=333&locale=ru');
    expect(uriBuild({host, port, path: '/find/us', query})).toEqual('my.happy.world:3222/find/us?time=333&locale=ru');
    expect(uriBuild({host, port, path: '/find/us/', query})).toEqual('my.happy.world:3222/find/us?time=333&locale=ru');
    expect(uriBuild({host, port, path: 'find/us/:country/:town', pathParams, query}))
      .toEqual('my.happy.world:3222/find/us/Russia/Sevastopol?time=333&locale=ru');
    expect(uriBuild({host, port, path: '/find/us/:country/:town', pathParams, query}))
      .toEqual('my.happy.world:3222/find/us/Russia/Sevastopol?time=333&locale=ru');
    expect(uriBuild({host, port, path: '/find/us/:country/:town/', pathParams, query}))
      .toEqual('my.happy.world:3222/find/us/Russia/Sevastopol?time=333&locale=ru');
  });

  it('should build with mixed scheme, host, port, path and query', () => {
    expect(uriBuild({scheme, host, path, query}))
      .toEqual('http://my.happy.world/find/us?time=333&locale=ru');
    expect(uriBuild({scheme, host, path: '/find/us', query}))
      .toEqual('http://my.happy.world/find/us?time=333&locale=ru');
    expect(uriBuild({scheme, host, path: '/find/us/', query}))
      .toEqual('http://my.happy.world/find/us?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, path, query}))
      .toEqual('http://my.happy.world:3222/find/us?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, path: '/find/us', query}))
      .toEqual('http://my.happy.world:3222/find/us?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, path: '/find/us/', query}))
      .toEqual('http://my.happy.world:3222/find/us?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, path: 'find/us/:country/:town', pathParams, query}))
      .toEqual('http://my.happy.world:3222/find/us/Russia/Sevastopol?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, path: '/find/us/:country/:town', pathParams, query}))
      .toEqual('http://my.happy.world:3222/find/us/Russia/Sevastopol?time=333&locale=ru');
    expect(uriBuild({scheme, host, port, path: '/find/us/:country/:town/', pathParams, query}))
      .toEqual('http://my.happy.world:3222/find/us/Russia/Sevastopol?time=333&locale=ru');
  });
});
