import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1 },  
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], 
    http_req_failed: ['rate<0.05'],    
  },
};

export default function () {
  const res = http.get('http://localhost:3000/health');

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo aceitável': (r) => r.timings.duration < 2000
  });

  sleep(1); 
}