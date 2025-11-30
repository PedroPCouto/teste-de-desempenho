import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
stages: [
    { duration: '30s', target: 10 }, 
    { duration: '10s', target: 300 }, 
    { duration: '1m', target: 300 }, 
    { duration: '10s', target: 10 },
    { duration: '30s', target: 10 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], 
    http_req_failed: ['rate<0.05'],    
  },
};

export default function () {
  const res = http.post('http://localhost:3000/checkout/simple');

  check(res, {
    'status é 201': (r) => r.status === 201,
    'tempo aceitável': (r) => r.timings.duration < 2000
  });

  sleep(1); 
}