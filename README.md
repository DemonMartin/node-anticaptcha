# node-anticaptcha

Modern Node.js library for the Anti-Captcha.com API. Clean, typed, and easy to use.

## Installation

```bash
npm install node-anticaptcha
# or
pnpm install node-anticaptcha
# or
yarn add node-anticaptcha
```

## Features

- 🎯 Clean, modern API design
- 🧠 Built-in TypeScript declarations
- 🔄 Automatic task polling
- 🎨 Verbose logging support
- 💰 Revenue sharing support
- 🔧 Fully configurable

## Usage

### CommonJS

```javascript
const { AntiCaptcha } = require('node-anticaptcha');

const client = new AntiCaptcha('YOUR_API_KEY', {
    verbose: true,
    verboseIdentifier: 'MyBot',
    delay: 2000,
});
```

### ES Modules

```javascript
import { AntiCaptcha } from 'node-anticaptcha';

const client = new AntiCaptcha('YOUR_API_KEY', {
    verbose: true,
    verboseIdentifier: 'MyBot',
    delay: 2000,
});
```

### TypeScript

```typescript
import { AntiCaptcha, type RecaptchaV2TaskProxyless } from 'node-anticaptcha';

const client = new AntiCaptcha('YOUR_API_KEY', {
    verbose: true,
});

const task: RecaptchaV2TaskProxyless = {
    type: 'RecaptchaV2TaskProxyless',
    websiteURL: 'https://example.com',
    websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
};

const result = await client.solve(task);
```

### Constructor Options

- `softId` - Your developer softId from [developer center](https://anti-captcha.com/clients/tools/devcenter) to earn 10% commission
- `verbose` - Enable verbose logging (default: `false`)
- `verboseIdentifier` - Custom identifier for logs
- `apiUrl` - API endpoint URL (default: `https://api.anti-captcha.com`)
- `delay` - Delay between status checks in milliseconds (default: `2000`)
- `callbackUrl` - Optional web address where we can send the results of captcha task processing. Contents are sent by AJAX POST request and are identical to the contents of getTaskResult method.

## Examples

### Get Balance

```javascript
const balance = await client.getBalance();
console.log(`Balance: $${balance.balance}`);
```

### Solve ReCaptcha V2

```javascript
const result = await client.solve({
    type: 'RecaptchaV2TaskProxyless',
    websiteURL: 'https://example.com',
    websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
});

console.log('Token:', result.solution.gRecaptchaResponse);
```

### Solve ReCaptcha V3

```javascript
const result = await client.solve({
    type: 'RecaptchaV3TaskProxyless',
    websiteURL: 'https://example.com',
    websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
    minScore: 0.7,
    pageAction: 'submit',
});

console.log('Token:', result.solution.gRecaptchaResponse);
```

### Solve Turnstile (Cloudflare)

```javascript
const result = await client.solve({
    type: 'TurnstileTaskProxyless',
    websiteURL: 'https://example.com',
    websiteKey: '0x4AAAAAAADnPIDROzbs0Ajs',
});

console.log('Token:', result.solution.token);
```

### Solve Image Captcha

```javascript
const fs = require('node:fs');

const imageBuffer = fs.readFileSync('captcha.png');

const result = await client.solve({
    type: 'ImageToTextTask',
    body: imageBuffer, // Can be Buffer or base64 string
    phrase: false,
    case: false,
    numeric: 0,
    math: false,
    minLength: 0,
    maxLength: 0,
    languagePool: 'en',
});

console.log('Text:', result.solution.text);
```

### Solve GeeTest

```javascript
const result = await client.solve({
    type: 'GeeTestTaskProxyless',
    websiteURL: 'https://example.com',
    gt: 'gt_value_here',
    challenge: 'challenge_value_here',
});

console.log('Solution:', result.solution);
```

### Solve FunCaptcha

```javascript
const result = await client.solve({
    type: 'FunCaptchaTaskProxyless',
    websiteURL: 'https://example.com',
    websitePublicKey: 'public_key_here',
});

console.log('Token:', result.solution.token);
```

### Drive AntiGate Template

```javascript
const result = await client.solve({
    type: 'AntiGateTask',
    websiteURL: 'https://example.com/login',
    templateName: 'Login and fetch session',
    variables: {
        login: 'user@example.com',
        password: 'strong-password',
        twoFactorCode: '_WAIT_FOR_IT_', // send later via pushAntiGateVariable
    },
    domainsOfInterest: ['example.com'],
    // Optional HTTPS proxy fields
    proxyAddress: '1.2.3.4',
    proxyPort: 8080,
    proxyLogin: 'proxyUser',
    proxyPassword: 'proxyPass',
});

console.log('Cookies:', result.solution.cookies);
```

### Using Proxy

```javascript
const result = await client.solve({
    type: 'RecaptchaV2Task', // Note: Not "Proxyless"
    websiteURL: 'https://example.com',
    websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
    proxyType: 'http',
    proxyAddress: '1.2.3.4',
    proxyPort: 8080,
    proxyLogin: 'username',
    proxyPassword: 'password',
    userAgent: 'Mozilla/5.0...',
});

console.log('Token:', result.solution.gRecaptchaResponse);
```

## API Methods

### `getBalance()`

Get account balance.

**Returns:** `Promise<AntiCaptchaBalanceResponse>`

### `createTask(task, callbackUrl?)`

Create a new captcha task.

**Parameters:**

- `task` - Task object (see task types below)
- `callbackUrl` - Optional web address where we can send the results of captcha task processing. Contents are sent by AJAX POST request and are identical to the contents of getTaskResult method. If not provided, will use the callbackUrl from constructor options if set.

**Returns:** `Promise<AntiCaptchaCreateTaskResponse>`

### `getTaskResult(taskId)`

Get result of a task.

**Parameters:**

- `taskId` - Task ID from `createTask()`

**Returns:** `Promise<AntiCaptchaGetTaskResultResponse>`

### `solve(task)`

Create and automatically poll for task completion.

**Parameters:**

- `task` - Task object (see task types below)

**Returns:** `Promise<AntiCaptchaSolveTaskResult>`

### `reportIncorrectImageCaptcha(taskId)`

Report incorrect image captcha result.

**Parameters:**

- `taskId` - Task ID to report

**Returns:** `Promise<AntiCaptchaReportResponse>`

### `reportIncorrectRecaptcha(taskId)`

Report incorrect recaptcha result.

**Parameters:**

- `taskId` - Task ID to report

**Returns:** `Promise<AntiCaptchaReportResponse>`

### `reportCorrectRecaptcha(taskId)`

Report correct recaptcha result (for statistics and worker whitelisting).

**Parameters:**

- `taskId` - Task ID to report

**Returns:** `Promise<AntiCaptchaReportResponse>`

### `pushAntiGateVariable(taskId, name, value)`

Push variable to AntiGate task during execution.

**Parameters:**

- `taskId` - Task ID
- `name` - Variable name
- `value` - Variable value

**Returns:** `Promise<AntiCaptchaReportResponse>`

### `getQueueStats(queueId, templateName?)`

Get queue load statistics to determine a suitable time for uploading tasks.

**Parameters:**

- `queueId` - Queue identifier (1-29). See [documentation](https://anti-captcha.com/apidoc/methods/getQueueStats) for queue IDs
- `templateName` - Optional template name for AntiGate queue (ID 25)

**Returns:** `Promise<AntiCaptchaQueueStatsResponse>`

### `getSpendingStats(date?, queue?, softId?, ip?)`

Retrieve account spending statistics for a 24 hour period.

**Parameters:**

- `date` - Unix timestamp of the hour from which to grab 24 hour stats (optional)
- `queue` - Queue name to filter by (optional)
- `softId` - Filter by softId from Developer Center (optional)
- `ip` - Filter by IP address used for API calls (optional)

**Returns:** `Promise<AntiCaptchaSpendingStatsResponse>`

### `getAppStats(softId, mode?)`

Retrieve daily statistics for your registered application.

**Parameters:**

- `softId` - The ID of your app from the Developer Center
- `mode` - Type of stats: 'errors', 'views', 'downloads', 'users', 'money' (default: 'errors')

**Returns:** `Promise<AntiCaptchaAppStatsResponse>`

### `test(data?)`

Test method for debugging API requests. Returns parsed and raw POST data.

**Parameters:**

- `data` - Any data object to test with (optional)

**Returns:** `Promise<unknown>`

## Supported Task Types

### Image Tasks

- `ImageToTextTask` - Solve image captcha
- `ImageToCoordinatesTask` - Click coordinates on image

### ReCaptcha

- `RecaptchaV2TaskProxyless` - ReCaptcha V2 without proxy
- `RecaptchaV2Task` - ReCaptcha V2 with proxy
- `RecaptchaV2EnterpriseTaskProxyless` - ReCaptcha V2 Enterprise without proxy
- `RecaptchaV2EnterpriseTask` - ReCaptcha V2 Enterprise with proxy
- `RecaptchaV3TaskProxyless` - ReCaptcha V3 (supports Enterprise)

### FunCaptcha

- `FunCaptchaTaskProxyless` - FunCaptcha without proxy
- `FunCaptchaTask` - FunCaptcha with proxy

### GeeTest

- `GeeTestTaskProxyless` - GeeTest without proxy (V3 and V4)
- `GeeTestTask` - GeeTest with proxy (V3 and V4)

### Turnstile (Cloudflare)

- `TurnstileTaskProxyless` - Turnstile without proxy
- `TurnstileTask` - Turnstile with proxy

### Other

- `AntiGateTask` - Custom tasks with templates
- `ProsopoTaskProxyless` - Prosopo captcha without proxy
- `ProsopoTask` - Prosopo captcha with proxy
- `FriendlyCaptchaTaskProxyless` - Friendly Captcha without proxy
- `FriendlyCaptchaTask` - Friendly Captcha with proxy
- `AmazonTaskProxyless` - Amazon WAF without proxy
- `AmazonTask` - Amazon WAF with proxy
- `AltchaTaskProxyless` - Altcha without proxy
- `AltchaTask` - Altcha with proxy

## TypeScript Support

The library is authored in TypeScript and ships first-class type declarations for every task, option, and response. Editors such as VS Code provide rich IntelliSense out of the box.

## Error Handling

```javascript
try {
    const result = await client.solve({
        type: 'RecaptchaV2TaskProxyless',
        websiteURL: 'https://example.com',
        websiteKey: 'invalid_key',
    });
    console.log(result.solution);
} catch (error) {
    if (error.response) {
        // API error
        console.error('API Error:', error.response.data);
    } else {
        // Network or other error
        console.error('Error:', error.message);
    }
}
```

## License

ISC

## Links

- [Anti-Captcha API Documentation](https://anti-captcha.com/apidoc)
- [Anti-Captcha Developer Center](https://anti-captcha.com/clients/tools/devcenter)
- [Error Codes](https://anti-captcha.com/apidoc/errors)
