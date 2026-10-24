To test your application's frontend and backend performance, you need a performance testing strategy: identify what to measure, establish acceptable limits, run tests under different loads, find bottlenecks, and optimize the components responsible.

The most important thing to understand is that performance testing is not just checking whether an application is fast. You also need to know how it behaves with many concurrent users, large datasets, slow networks, and high server load.

# 1. What parameters should you measure?

There are five main areas to evaluate.

Frontend performance

How quickly the user sees and interacts with the application.

- LCP — Largest Contentful Paint
- INP — Interaction to Next Paint
- CLS — Cumulative Layout Shift
- JavaScript execution time
- Bundle size, image size, and API wait time

Backend/API performance

How quickly and reliably the server processes requests.

- API response time: p50, p95, p99
- Requests per second (RPS)
- Error rate and timeout rate
- CPU and memory usage
- Database query duration

Load and scalability

How the application behaves as traffic increases.

- Concurrent users
- Requests per second at different loads
- Maximum sustainable throughput
- Queue length and request timeouts
- Performance under spike and sustained load

Database performance

Whether data access is slowing down the application.

- Query execution time
- Slow queries and missing indexes
- Connection pool usage
- Lock waits and deadlocks
- Cache hit ratio

Infrastructure and reliability

Whether the underlying systems have enough capacity.

- CPU, RAM, disk I/O, and network utilization
- Container or instance saturation
- Garbage collection and thread pool behavior
- Availability and failure rate

# 2. Which performance scales and thresholds should you use?

Start with these parameters. The thresholds below are initial targets, not universal guarantees; your application’s requirements and workload should determine the final service-level objectives (SLOs).

## Frontend: Core Web Vitals

Google's recommended thresholds for a good user experience are measured at the 75th percentile of real page visits.

| Metric | Good target   | What it tells you          |
| ------ | ------------- | -------------------------- |
| LCP    | ≤ 2.5 seconds | Main content loading speed |
| INP    | ≤ 200 ms      | Interaction responsiveness |
| CLS    | ≤ 0.1         | Visual layout stability    |

Also measure the time until the page is usable, JavaScript bundle size, image-loading time, and performance on lower-end mobile devices.

## Backend: API response time

| Metric             | Initial target example       | Interpretation                          |
| ------------------ | ---------------------------- | --------------------------------------- |
| p50 latency        | ≤ 200 ms                     | Typical request                         |
| p95 latency        | ≤ 500 ms                     | 95% of requests are this fast or faster |
| p99 latency        | ≤ 1 second                   | Slow tail of requests                   |
| Error rate         | < 1%                         | Failed requests under the test load     |
| CPU utilization    | Usually < 70–80% sustained   | Leaves some capacity headroom           |
| Memory utilization | Stable, no continuous growth | Helps detect leaks or memory pressure   |

These API targets are illustrative. A simple read API may need to be faster; a complex report or file-processing endpoint may reasonably take longer. Set limits based on business requirements and production behavior.

Important: Average response time alone is not sufficient. An average of 150 ms can hide a significant number of requests taking several seconds. Always check p95 and p99.

# 3. Which tools should you use?

You do not need a large set of tools to get started. Use one tool for each type of measurement.

[Measuring Web Performance | Trung Vo](https://images.openai.com/static-rsc-4/ww73_UZdo7aozOOGtqAjhO6Z-OrOOIb7jQ1-0Wcx8lblic8xemwbXLRFRnsJDcoxTduvFiIhDpPEdNx7TFOsEjYIOphUpKo4O34zrqE2_7sbNG4s6sqbkDgmfaK6uY8UGI56FmOa-O_WSfblMbnsfaAj6XiwG6L3q15g8B8Eu3g?purpose=inline)

1\. Frontend — Lighthouse

Free, built into Chrome DevTools

Measures page loading, rendering, JavaScript, and Core Web Vitals-related performance diagnostics.

[Lighthouse documentation](https://developer.chrome.com/docs/lighthouse/overview?utm_source=chatgpt.com)

[Load Testing Backend Services Using K6 - Earthly Blog](https://images.openai.com/static-rsc-4/MHzxChW1LE7ihENDfKHVQxzvbb8nwdAar1vRod6DziA1nnBMhBVAeEAAGy7C0-zyWgMwIkSnmeryz2b_kt3FvjglaOUPxmaQk4lz5HjGgC-xb28tFIV0-SlYbsadEOAu7kWdyNF7niVlpVR0D5mBA2i0F_Kbg5NPWlPYlLarlm8?purpose=inline)

2\. Backend/API — Grafana k6

Load and stress testing

Measures response-time percentiles, throughput, failures, and behavior under increasing traffic.

[k6 documentation](https://grafana.com/docs/k6/latest/?utm_source=chatgpt.com)

3\. Frontend network — Chrome DevTools

Browser diagnostics

Shows slow API calls, large assets, caching, blocked requests, and network timing.

[Network panel documentation](https://developer.chrome.com/docs/devtools/network?utm_source=chatgpt.com)

[Loki vs Prometheus - Differences, Use Cases, and Alternatives | SigNoz](https://images.openai.com/static-rsc-4/TuJv_6Xki___Imnr-jfXaZVyCJqYpxZaE4zCXLhUaexgK51e0_N-yUYLYCzgE2IzisSMTS4dqPx35NDNmK8EuuStkaiCcH9VfAAuzr7AfTiuh8kgbhvlVhYrkQa_Mt5g-VZyz26tJmouPAMkXmcXrZssJosxBCYCVsZHJ02rReo?purpose=inline)

4\. Server monitoring — Prometheus and Grafana

Infrastructure and application monitoring

Helps correlate slow requests with CPU, memory, database connections, and other server metrics.

[Prometheus overview](https://prometheus.io/docs/introduction/overview/?utm_source=chatgpt.com)

For an initial assessment, start with Lighthouse and Chrome DevTools, then use k6 to load-test the API. Add server monitoring when you need to explain why performance degrades.

# 4. How to perform performance testing step by step

Follow this process for your application.

## 01

Establish a baseline

Test the application under normal conditions before changing any code. Record page performance, API latency, error rate, throughput, and server resource usage.

## 02

Test individual APIs

Select important endpoints, such as login, search, listing records, saving data, and reporting. Test them individually to find slow endpoints before testing the whole application.

## 03

Increase the load gradually

Start with a few virtual users, then increase to your expected concurrent load and peak load. Observe how response time, throughput, and errors change. Use realistic request patterns and test data.

## 04

Identify the bottleneck

Correlate slow API requests with database queries, external services, CPU, memory, network latency, and connection pools. Do not assume the backend code is always responsible.

## 05

Optimize and test again

Change one significant factor at a time. Repeat the same test with the same workload, compare before-and-after results, and check that correctness and reliability have not regressed.

## Types of load tests you should know

| Test type   | Purpose                                                 |
| ----------- | ------------------------------------------------------- |
| Smoke test  | Verify the test and application work under minimal load |
| Load test   | Verify performance at expected traffic                  |
| Stress test | Find capacity limits and failure behavior               |
| Spike test  | Test sudden increases in traffic                        |
| Soak test   | Find memory leaks or degradation over a longer period   |

For most applications, begin with a smoke test, then a normal load test, and finally a peak-load test. Use stress and soak testing once you have a reliable baseline. These approaches align with the [k6 API load-testing guidance](https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?utm_source=chatgpt.com).

# 5. What should you optimize when performance is poor?

Use the symptoms to decide where to investigate first.

| Symptom                                    | Possible cause                                              | What to optimize                                   |
| ------------------------------------------ | ----------------------------------------------------------- | -------------------------------------------------- |
| Page loads slowly                          | Large images, JavaScript, slow rendering                    | Compress images, reduce JS, lazy-load assets       |
| Button clicks feel slow                    | Long JavaScript tasks, slow API                             | Profile JS, reduce main-thread work, optimize API  |
| API response time increases with load      | CPU saturation, database bottleneck, thread pool exhaustion | Profile backend, tune queries and connection pools |
| One endpoint is consistently slow          | Expensive query, N+1 queries, external API                  | Trace request, inspect SQL, batch calls            |
| Database CPU is high                       | Inefficient queries, missing indexes                        | Analyze execution plans, add appropriate indexes   |
| Memory keeps growing                       | Memory leak, unbounded cache, retained objects              | Profile memory, fix retention, bound caches        |
| Requests fail under peak traffic           | Capacity limits, rate limits, exhausted resources           | Tune capacity, backpressure, timeouts, scaling     |
| Frontend is fast but user workflow is slow | Multiple sequential API calls or third-party services       | Parallelize independent calls, reduce round trips  |

A critical rule: measure first, optimize second. For example, adding a database index without inspecting the query plan may not help, and increasing server CPU may not fix an application bottleneck caused by sequential external API calls.

# 6. Example: run your first backend performance test

If your application exposes an HTTP API, you can use this small k6 script as a starting point.

Create a file named `performance-test.js`:

```

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '1m',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const response = http.get(
    `${__ENV.BASE_URL}/api/products`
  );

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

```

Replace `/api/products` with an actual endpoint that is safe to test, and provide your application's base URL.

Run it with:

```
k6 run -e BASE_URL=https://your-test-server.example performance-test.js
```

This test simulates 10 virtual users for one minute, with a one-second pause between iterations. It checks that the HTTP failure rate stays below 1% and the 95th-percentile response time stays below 500 ms.

The thresholds are example targets, not a guarantee that the application is healthy. The test also needs realistic authentication, request payloads, response validation, and user workflows for your particular application. Run load tests against a test or staging environment, or obtain explicit authorization before testing production.

Reference: [k6 thresholds and pass/fail criteria](https://grafana.com/docs/k6/latest/using-k6/thresholds/?utm_source=chatgpt.com).

# 7. Your performance testing checklist

Use this checklist for your first assessment.

### Assessment progress

0 of 12 completed

Frontend

Run Lighthouse on the main pages

Measure LCP, INP, and CLS

Inspect slow network requests and large assets

Test on a typical mobile device or throttled connection

Backend and database

Measure API p50, p95, and p99 latency

Measure throughput and HTTP error rate

Identify slow database queries

Monitor CPU, memory, and connection pools

Load and optimization

Test normal and peak expected traffic

Record baseline results

Identify and fix the largest bottleneck

Repeat the same test and compare results

## 8. Let's make this specific to your application

The tools and metrics above are a general starting point. To recommend the correct tests, thresholds, and optimizations for your app, I need to know your technology stack.

## Application details

Choose the closest options. If you are unsure, keep the defaults and change what you know.

Frontend technology

React

Angular

Vue

Next.js

Other / not sure

Backend technology

Node.js / Express / NestJS

Java / Spring Boot

Python / Django / FastAPI

.NET / C#

Other / not sure

Database

PostgreSQL

MySQL

MongoDB

SQL Server

Other / not sure

Application type

Web application

Mobile app with APIs

E-commerce

Admin dashboard / SaaS

Expected concurrent users

Under 100

100–500

500–1,000

1,000–10,000

More than 10,000

Not sure yet

Where will you run the tests?

Local machine

Staging / test environment

Production

Build my performance testing plan

With these details, the next step is to build a practical testing plan for your actual stack, including which commands to run, which dashboards to inspect, how to interpret the results, and how to decide what to optimize first.