import { parseServerInfo, parseUrlParams, createTlsConfig, parseMaybeNumber } from '../../utils.js';

export function parseAnytls(url) {
    const { addressPart, params, name } = parseUrlParams(url);
    const [password, serverInfo] = addressPart.split('@');
    const { host, port } = parseServerInfo(serverInfo);

    const tls = createTlsConfig(params);

    return {
        type: 'anytls',
        tag: name,
        server: host,
        server_port: port,
        password: decodeURIComponent(password),
        network: 'tcp',
        tls,
        // 为了兼容 Sing-box，这里使用 snake_case
        // 同时兼容链接中可能出现的 kebab-case 参数
        idle_session_check_interval: params['idle_session_check_interval'] || params['idle-session-check-interval'],
        idle_session_timeout: params['idle_session_timeout'] || params['idle-session-timeout'],
        min_idle_session: parseMaybeNumber(params['min_idle_session'] || params['min-idle-session'])
    };
}
