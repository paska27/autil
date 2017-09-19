/* @flow */

type Params = {
  scheme?: string;
  host?: string;
  port?: number;
  path?: string;
  pathParams?: Object;
  query?: Object;
};

const missingSettingError = (setting: string) =>
  new Error(`uriBuild: valid '${setting}' setting is required in such input`);

const rptrim = (path: string) => {
  if (path[path.length - 1] === '/') return path.substr(0, path.length - 1);
  return path;
};

const lptrim = (path: string) => {
  if (path[0] === '/') return path.substr(1);
  return path;
};

export default (params: Params): string => {
  const
    { scheme, host, port, path, pathParams, query } = params,
    template = '{scheme}{host}{port}{path}{query}',
    parts = {
      scheme: '',
      host: '',
      port: '',
      path: '',
      query: '',
    }
    ;

  if (scheme) {
    if (!host) throw missingSettingError('host');
    parts.scheme = `${scheme.replace(':', '')}://`;
    parts.host = host;
    if (port) parts.port = `:${port}`;
  }

  if (host) {
    parts.host = host;
    if (port) parts.port = `:${port}`;
  }

  if (path) {
    let finalPath;
    if (path.indexOf(':') !== -1) {
      if (!pathParams) throw missingSettingError('pathParams');
      // append unparametrized path
      finalPath = path.replace(
        new RegExp(':(' + Object.keys(pathParams).join('|') + ')', 'g'),
        (_, p) => pathParams[p],
      );
    } else {
      finalPath = path;
    }
    finalPath = rptrim(finalPath);
    if (host) finalPath = '/' + lptrim(finalPath);
    parts.path = finalPath;
  }

  if (query) {
    let queryString = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
    if (scheme || host || path) queryString = '?' + queryString;
    parts.query = queryString;
  }

  // build uri from template adding non-empty parts only
  const
    pattern = '\\{(' + Object.keys(parts).join('|') + ')\\}',
    uri = template.replace(new RegExp(pattern, 'g'), (_, p1) => parts[p1]);
  return uri;
};
