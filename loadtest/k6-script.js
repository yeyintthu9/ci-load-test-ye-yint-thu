import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 25, // virtual users
  duration: '30s', // test duration
};

const hosts = ['http://foo.localhost', 'http://bar.localhost'];

export default function () {
    const host = hosts[Math.floor(Math.random() * hosts.length)];
    const res = http.get(host);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains expected text': (r) =>
            host.includes('foo') ? r.body.includes('foo') : r.body.includes('bar'),
    });

    sleep(1);
}
