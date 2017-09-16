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

export default (params: Params): string => {
  const
    { scheme, host/* , port, path, pathParams, query */ } = params,
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
  }

  if (host) {
    parts.host = host;
  }

  // build uri from template adding non-empty parts only
  const
    pattern = '\\{(' + Object.keys(parts).join('|') + ')\\}',
    uri = template.replace(new RegExp(pattern, 'g'), (_, p1) => parts[p1]);
  return uri;
};
