import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },     
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '1m', target: 0 },   
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], 
    http_req_failed: ['rate<0.05'],    
  },
};

export default function () {
  const res = http.post('http://localhost:3000/checkout/crypto');

  check(res, {
    'status é 201': (r) => r.status === 201,
    'tempo aceitável': (r) => r.timings.duration < 2000
  });

  sleep(1); 
}