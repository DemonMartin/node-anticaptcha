import axios, { type AxiosInstance } from 'axios';
import { Buffer } from 'buffer';

/**
 * Configuration options for AntiCaptcha client
 */
export interface AntiCaptchaOptions {
    /** Your developer softId from https://anti-captcha.com/clients/tools/devcenter to earn 10% commission */
    softId?: number;
    /** Whether to print the current status (default: false) */
    verbose?: boolean;
    /** The identifier of the current instance, used to distinguish between multiple instances */
    verboseIdentifier?: string;
    /** The API URL to use (default: 'https://api.anti-captcha.com') */
    apiUrl?: string;
    /** The delay between each status check in milliseconds (default: 2000) */
    delay?: number;
    /** Optional web address where we can send the results of captcha task processing. Contents are sent by AJAX POST request and are identical to the contents of getTaskResult method. */
    callbackUrl?: string;
}

type BooleanNumber = 0 | 1 | 2;

/**
 * Image to text captcha task
 */
export type ImageToTextTask = {
    /** Defines the type of task */
    type: 'ImageToTextTask';
    /** File body encoded in base64. Make sure to send it without line breaks. Do not include 'data:image/png,' or similar tags, only clean base64! */
    body: string | Buffer;
    /** false - no requirements, true - requires workers to enter an answer with at least one "space" */
    phrase?: boolean;
    /** false - no requirements, true - workers see a special mark indicating that the answer must be entered with case sensitivity */
    case?: boolean;
    /** 0 - no requirements, 1 - only numbers are allowed, 2 - any letters are allowed except numbers */
    numeric?: BooleanNumber;
    /** false - no requirements, true - workers see a special mark telling them the answer must be calculated */
    math?: boolean;
    /** 0 - no requirements, >0 - defines minimum length of the answer */
    minLength?: number;
    /** 0 - no requirements, >0 - defines maximum length of the answer */
    maxLength?: number;
    /** Additional comments for workers like "enter red text". The result is not guaranteed and is totally up to the worker */
    comment?: string;
    /** Optional parameter to distinguish source of image captchas in spending statistics */
    websiteURL?: string;
    /** Sets workers' pool language. "en" (default): English language queue, "rn": group of countries: Russia, Ukraine, Belarus, Kazakhstan */
    languagePool?: 'en' | 'rn';
};

/**
 * Image to coordinates task - click coordinates on image
 */
export type ImageToCoordinatesTask = {
    /** Defines the type of task */
    type: 'ImageToCoordinatesTask';
    /** File body encoded in base64. Make sure to send it without line breaks. Do not include 'data:image/png,' or similar tags, only clean base64! */
    body: string | Buffer;
    /** Comments for the task in English characters only. Example: "Select objects in specified order" or "select all cars" */
    comment?: string;
    /** Task mode, can be "points" or "rectangles". The default is "points" */
    mode?: 'points' | 'rectangles';
    /** Optional parameter to distinguish source of image captchas in spending statistics */
    websiteURL?: string;
};

/**
 * ReCaptcha V2 task without proxy
 */
export type RecaptchaV2TaskProxyless = {
    /** Previous name: NoCaptchaTaskProxyless */
    type: 'RecaptchaV2TaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Recaptcha website key */
    websiteKey: string;
    /** Value of 'data-s' parameter. Applies only to reCaptchas on Google web sites */
    recaptchaDataSValue?: string;
    /** Specify whether or not reCaptcha is invisible. This will render an appropriate widget for our workers */
    isInvisible?: boolean;
};

/**
 * ReCaptcha V2 task with proxy
 */
export type RecaptchaV2Task = {
    /** Previous name: NoCaptchaTask */
    type: 'RecaptchaV2Task';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Recaptcha website key */
    websiteKey: string;
    /** Value of 'data-s' parameter. Applies only to reCaptchas on Google web sites */
    recaptchaDataSValue?: string;
    /** Specify whether or not reCaptcha is invisible. This will render an appropriate widget for our workers */
    isInvisible?: boolean;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
    /** Browser's User-Agent to use */
    userAgent?: string;
    /** Additional cookies in format "name1=value1; name2=value2" */
    cookies?: string;
};

/**
 * ReCaptcha V2 Enterprise task without proxy
 */
export type RecaptchaV2EnterpriseTaskProxyless = {
    type: 'RecaptchaV2EnterpriseTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Recaptcha website key */
    websiteKey: string;
    /** Additional parameters which should be passed to "grecaptcha.enterprise.render" method along with sitekey */
    enterprisePayload?: Record<string, unknown>;
    /** Use this parameter to send the domain name from which the reCaptcha script should be served. Can have only one of two values: "www.google.com" or "www.recaptcha.net" */
    apiDomain?: 'www.google.com' | 'www.recaptcha.net';
};

/**
 * ReCaptcha V2 Enterprise task with proxy
 */
export type RecaptchaV2EnterpriseTask = {
    type: 'RecaptchaV2EnterpriseTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Recaptcha website key */
    websiteKey: string;
    /** Additional parameters which should be passed to "grecaptcha.enterprise.render" method along with sitekey */
    enterprisePayload?: Record<string, unknown>;
    /** Use this parameter to send the domain name from which the reCaptcha script should be served. Can have only one of two values: "www.google.com" or "www.recaptcha.net" */
    apiDomain?: 'www.google.com' | 'www.recaptcha.net';
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
    /** Browser's User-Agent to use */
    userAgent?: string;
    /** Additional cookies in format "name1=value1; name2=value2" */
    cookies?: string;
};

/**
 * ReCaptcha V3 task without proxy (supports Enterprise)
 */
export type RecaptchaV3TaskProxyless = {
    type: 'RecaptchaV3TaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Recaptcha website key */
    websiteKey: string;
    /** Filters workers with a particular score. It can have one of the following values: 0.3, 0.7, 0.9 */
    minScore?: 0.3 | 0.7 | 0.9;
    /** Recaptcha's "action" value. Website owners use this parameter to define what users are doing on the page */
    pageAction?: string;
    /** Set this flag to "true" if you need this V3 solved with Enterprise API. Default value is "false" */
    isEnterprise?: boolean;
    /** Use this parameter to send the domain name from which the reCaptcha script should be served. Can have only one of two values: "www.google.com" or "www.recaptcha.net" */
    apiDomain?: 'www.google.com' | 'www.recaptcha.net';
};

/**
 * FunCaptcha (Arkose Labs) task without proxy
 */
export type FunCaptchaTaskProxyless = {
    type: 'FunCaptchaTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Arkose Labs public key */
    websitePublicKey: string;
    /** Custom Arkose Labs subdomain from which the Javascript widget is loaded */
    funcaptchaApiJSSubdomain?: string;
    /** An additional parameter that may be required by Arkose Labs implementation. Use this property to send "blob" value as an object converted to a string */
    data?: string;
};

/**
 * FunCaptcha (Arkose Labs) task with proxy
 */
export type FunCaptchaTask = {
    type: 'FunCaptchaTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Arkose Labs public key */
    websitePublicKey: string;
    /** Custom Arkose Labs subdomain from which the Javascript widget is loaded */
    funcaptchaApiJSSubdomain?: string;
    /** An additional parameter that may be required by Arkose Labs implementation. Use this property to send "blob" value as an object converted to a string */
    data?: string;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
    /** Browser's User-Agent to use */
    userAgent?: string;
    /** Additional cookies in format "name1=value1; name2=value2" */
    cookies?: string;
};

/**
 * GeeTest task without proxy (V3 and V4)
 */
export type GeeTestTaskProxyless = {
    type: 'GeeTestTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** The domain public key, rarely updated */
    gt: string;
    /** Changing token key. Make sure you grab a fresh one for each captcha. Required for version 3. Not required for version 4 */
    challenge?: string;
    /** Optional API subdomain. May be required for some implementations */
    geetestApiServerSubdomain?: string;
    /** Required for some custom implementations */
    geetestGetLib?: string;
    /** Version number. Default version is 3. Supported versions: 3 and 4 */
    version?: 3 | 4;
    /** Additional initialization parameters for version 4 */
    initParameters?: Record<string, unknown>;
};

/**
 * GeeTest task with proxy (V3 and V4)
 */
export type GeeTestTask = {
    type: 'GeeTestTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** The domain public key, rarely updated */
    gt: string;
    /** Changing token key. Make sure you grab a fresh one for each captcha. Required for version 3. Not required for version 4 */
    challenge?: string;
    /** Optional API subdomain. May be required for some implementations */
    geetestApiServerSubdomain?: string;
    /** Required for some custom implementations */
    geetestGetLib?: string;
    /** Version number. Default version is 3. Supported versions: 3 and 4 */
    version?: 3 | 4;
    /** Additional initialization parameters for version 4 */
    initParameters?: Record<string, unknown>;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
    /** Browser's User-Agent to use */
    userAgent?: string;
    /** Additional cookies in format "name1=value1; name2=value2" */
    cookies?: string;
};

/**
 * Turnstile (Cloudflare) task without proxy
 */
export type TurnstileTaskProxyless = {
    type: 'TurnstileTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Turnstile sitekey */
    websiteKey: string;
    /** Optional "action" parameter */
    action?: string;
    /** Optional "cData" token */
    cData?: string;
    /** Optional "chlPageData" token */
    chlPageData?: string;
};

/**
 * Turnstile (Cloudflare) task with proxy
 */
export type TurnstileTask = {
    type: 'TurnstileTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Turnstile sitekey */
    websiteKey: string;
    /** Optional "action" parameter */
    action?: string;
    /** Optional "cData" token */
    cData?: string;
    /** Optional "chlPageData" token */
    chlPageData?: string;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
};

/**
 * AntiGate custom task with templates
 */
export type AntiGateTask = {
    type: 'AntiGateTask';
    /** Address of a target web page where our worker will navigate */
    websiteURL: string;
    /** Name of a scenario template from our database */
    templateName: string;
    /** An object containing the template's variables and their values */
    variables: Record<string, unknown>;
    /** List of domain names where we should collect cookies and localStorage data */
    domainsOfInterest?: string[];
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress?: string;
    /** Proxy port */
    proxyPort?: number;
    /** Login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
};

/**
 * Prosopo captcha task without proxy
 */
export type ProsopoTaskProxyless = {
    type: 'ProsopoTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Prosopo sitekey */
    websiteKey: string;
};

/**
 * Prosopo captcha task with proxy
 */
export type ProsopoTask = {
    type: 'ProsopoTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Prosopo sitekey */
    websiteKey: string;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
};

/**
 * Friendly Captcha task without proxy
 */
export type FriendlyCaptchaTaskProxyless = {
    type: 'FriendlyCaptchaTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Friendly Captcha sitekey */
    websiteKey: string;
};

/**
 * Friendly Captcha task with proxy
 */
export type FriendlyCaptchaTask = {
    type: 'FriendlyCaptchaTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Friendly Captcha sitekey */
    websiteKey: string;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
};

/**
 * Amazon WAF task without proxy
 */
export type AmazonTaskProxyless = {
    type: 'AmazonTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Value of key from window.gokuProps object (for gokuProps type) or API key from AwsWafCaptcha.renderCaptcha (for widget type) */
    websiteKey: string;
    /** Value of iv from window.gokuProps object (required for gokuProps type) */
    iv?: string;
    /** Value of context from window.gokuProps object (required for gokuProps type) */
    context?: string;
    /** Optional URL leading to captcha.js (for gokuProps type) */
    captchaScript?: string;
    /** Optional URL leading to challenge.js (for gokuProps type) */
    challengeScript?: string;
    /** Keep this equal to widget for standalone captcha widget */
    wafType?: 'widget';
    /** Full URL of the jsapi.js (required for widget type) */
    jsapiScript?: string;
};

/**
 * Amazon WAF task with proxy
 */
export type AmazonTask = {
    type: 'AmazonTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Value of key from window.gokuProps object (for gokuProps type) or API key from AwsWafCaptcha.renderCaptcha (for widget type) */
    websiteKey: string;
    /** Value of iv from window.gokuProps object (required for gokuProps type) */
    iv?: string;
    /** Value of context from window.gokuProps object (required for gokuProps type) */
    context?: string;
    /** Optional URL leading to captcha.js (for gokuProps type) */
    captchaScript?: string;
    /** Optional URL leading to challenge.js (for gokuProps type) */
    challengeScript?: string;
    /** Keep this equal to widget for standalone captcha widget */
    wafType?: 'widget';
    /** Full URL of the jsapi.js (required for widget type) */
    jsapiScript?: string;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
};

/**
 * Altcha task without proxy
 */
export type AltchaTaskProxyless = {
    type: 'AltchaTaskProxyless';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Challenge URL from altcha-widget */
    challengeURL?: string;
    /** Challenge JSON fetched from challenge URL of the widget */
    challengeJSON?: string;
};

/**
 * Altcha task with proxy
 */
export type AltchaTask = {
    type: 'AltchaTask';
    /** Address of a target web page. Can be located anywhere on the web site, even in a member area */
    websiteURL: string;
    /** Challenge URL from altcha-widget */
    challengeURL?: string;
    /** Challenge JSON fetched from challenge URL of the widget */
    challengeJSON?: string;
    /** Type of proxy: http, https, socks4, socks5 */
    proxyType: 'http' | 'https' | 'socks4' | 'socks5';
    /** Proxy IP address IPv4/IPv6. No host names or IP addresses from local networks */
    proxyAddress: string;
    /** Proxy port */
    proxyPort: number;
    /** Proxy login for proxy which requires authorization (basic) */
    proxyLogin?: string;
    /** Proxy password */
    proxyPassword?: string;
};

/** Recognition tasks (image-based) */
export type RecognitionTask = ImageToTextTask | ImageToCoordinatesTask;

/** All ReCaptcha V2 task variants */
export type RecaptchaV2 =
    | RecaptchaV2TaskProxyless
    | RecaptchaV2Task
    | RecaptchaV2EnterpriseTaskProxyless
    | RecaptchaV2EnterpriseTask;

/** All FunCaptcha task variants */
export type FunCaptcha = FunCaptchaTaskProxyless | FunCaptchaTask;

/** All GeeTest task variants */
export type GeeTest = GeeTestTaskProxyless | GeeTestTask;

/** All Turnstile task variants */
export type Turnstile = TurnstileTaskProxyless | TurnstileTask;

/** All Prosopo task variants */
export type Prosopo = ProsopoTaskProxyless | ProsopoTask;

/** All Friendly Captcha task variants */
export type FriendlyCaptcha = FriendlyCaptchaTaskProxyless | FriendlyCaptchaTask;

/** All Amazon WAF task variants */
export type Amazon = AmazonTaskProxyless | AmazonTask;

/** All Altcha task variants */
export type Altcha = AltchaTaskProxyless | AltchaTask;

/** Token-based tasks */
export type TokenTask =
    | RecaptchaV2
    | RecaptchaV3TaskProxyless
    | FunCaptcha
    | GeeTest
    | Turnstile
    | AntiGateTask
    | Prosopo
    | FriendlyCaptcha
    | Amazon
    | Altcha;

/** All supported Anti-Captcha task types */
export type AntiCaptchaTask = RecognitionTask | TokenTask;

/**
 * Base API response structure
 */
interface ApiResponseBase {
    /** Error message: 0 - no error, 1 - with error */
    errorId: 0 | 1;
    /** Error code. See https://anti-captcha.com/apidoc/errors */
    errorCode?: string;
    /** Short description of the error */
    errorDescription?: string;
}

/**
 * Response from getBalance API call
 */
export interface AntiCaptchaBalanceResponse extends ApiResponseBase {
    /** Balance in USD */
    balance: number;
    /** Balance in captcha credits (for certain accounts) */
    captchaCredits?: number;
}

/**
 * Response from createTask API call
 */
export interface AntiCaptchaCreateTaskResponse extends ApiResponseBase {
    /** Returns the status, which can only be null or ready */
    status?: 'ready' | null;
    /** Solution object (only present when status is ready) */
    solution?: Record<string, unknown>;
    /** ID of the created task */
    taskId?: string;
}

/**
 * Response from getTaskResult API call
 */
export interface AntiCaptchaGetTaskResultResponse extends ApiResponseBase {
    /** Task status: "ready" when solved, "processing" when still solving */
    status: 'ready' | 'processing' | null;
    /** Solution object, only present when status is "ready" */
    solution?: Record<string, unknown>;
}

/**
 * Response from report/feedback API calls
 */
export interface AntiCaptchaReportResponse extends ApiResponseBase {
    /** Status message */
    status?: string;
}

/**
 * Result from solve() method
 */
export interface AntiCaptchaSolveTaskResult extends AntiCaptchaGetTaskResultResponse {
    /** ID of the solved task */
    taskId: string;
}

/**
 * Response from getQueueStats API call
 */
export interface AntiCaptchaQueueStatsResponse extends ApiResponseBase {
    /** Number of idle workers online, waiting for a task */
    waiting: number;
    /** Queue load as a percentage */
    load: number;
    /** Average task solution cost in USD */
    bid: string;
    /** Average task solution speed in seconds */
    speed: number;
    /** Total number of workers */
    total: number;
}

/**
 * Spending statistics record
 */
export interface SpendingStatsRecord {
    /** UTC seconds of beginning of record period */
    dateFrom: number;
    /** UTC seconds of end of record period */
    dateTill: number;
    /** Number of tasks */
    volume: number;
    /** Funds spent on tasks */
    money: number;
}

/**
 * Response from getSpendingStats API call
 */
export interface AntiCaptchaSpendingStatsResponse extends ApiResponseBase {
    /** Array of spending records */
    data: SpendingStatsRecord[];
}

/**
 * Chart data point for app statistics
 */
export interface ChartDataPoint {
    /** Date string (e.g., "25 January") */
    date: string;
    /** Short date string (e.g., "25 Jan") */
    shortdate: string;
    /** Y-axis value */
    y: number;
    /** Begin timestamp */
    beginstamp: number;
    /** End timestamp */
    endstamp: number;
    /** Timestamp */
    stamp: number;
}

/**
 * Chart data series
 */
export interface ChartDataSeries {
    /** Series name */
    name: string;
    /** Data points */
    data: ChartDataPoint[];
    /** Item name */
    itemname: string;
    /** Error ID */
    errorId: number;
    /** Count */
    count?: number;
    /** Error code */
    code: string;
    /** Description */
    description: string;
}

/**
 * Response from getAppStats API call
 */
export interface AntiCaptchaAppStatsResponse extends ApiResponseBase {
    /** Chart data array ready for HighCharts */
    chartData: ChartDataSeries[];
    /** Starting date of the report */
    fromDate: string;
    /** Ending date of the report */
    toDate: string;
}

type ApiResponse<T> = T | string;

/**
 * Preprocesses task by converting Buffer objects to base64 strings
 * @param {AntiCaptchaTask} task - The task object to preprocess
 */
function preProcessTask(task: AntiCaptchaTask): void {
    for (const key of Object.keys(task)) {
        const value = (task as Record<string, unknown>)[key];
        if (Buffer.isBuffer(value)) {
            (task as Record<string, unknown>)[key] = value.toString('base64');
        }
    }
}

/**
 * Parses API response data
 * @param {ApiResponse<T>} data - Raw response data (string or object)
 * @returns {T} Parsed response object
 */
function parseResponse<T>(data: ApiResponse<T>): T {
    if (typeof data === 'string') {
        return JSON.parse(data) as T;
    }
    return data;
}

/**
 * AntiCaptcha client for solving captchas via Anti-Captcha.com API
 * @example
 * ```typescript
 * const client = new AntiCaptcha('YOUR_API_KEY', {
 *     verbose: true,
 *     delay: 2000
 * });
 *
 * const result = await client.solve({
 *     type: 'RecaptchaV2TaskProxyless',
 *     websiteURL: 'https://example.com',
 *     websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-'
 * });
 * ```
 */
export class AntiCaptcha {
    #client: AxiosInstance;
    #clientKey: string;
    #delay: number;
    #options: AntiCaptchaOptions;

    /**
     * Create a new AntiCaptcha client
     * @param {string} clientKey - Your Anti-Captcha API key
     * @param {AntiCaptchaOptions} [options={}] - Configuration options
     */
    constructor(clientKey: string, options: AntiCaptchaOptions = {}) {
        this.#clientKey = clientKey;
        this.#options = options;
        this.#delay = options.delay ?? 2000;
        this.#client = axios.create({
            baseURL: options.apiUrl ?? 'https://api.anti-captcha.com',
            headers: {
                'Content-Type': 'application/json',
            },
            transformResponse: [(data) => data],
        });
    }

    /**
     * Delay execution for specified milliseconds
     * @param {number} ms - Milliseconds to delay
     */
    async delay(ms: number): Promise<void> {
        await new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    /**
     * Log message if verbose mode is enabled
     * @param {string} log - Message to log
     */
    async verbose(log: string): Promise<void> {
        if (this.#options?.verbose) {
            const verboseIdentifier = this.#options?.verboseIdentifier ? `${this.#options.verboseIdentifier} ` : '';
            console.log(`${verboseIdentifier}${log}`);
        }
    }

    /**
     * Get account balance
     * @returns {Promise<AntiCaptchaBalanceResponse>} Promise resolving to balance response
     * @example
     * ```typescript
     * const balance = await client.getBalance();
     * console.log(`Balance: $${balance.balance}`);
     * ```
     */
    async getBalance(): Promise<AntiCaptchaBalanceResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaBalanceResponse>>({
            method: 'POST',
            url: '/getBalance',
            data: JSON.stringify({
                clientKey: this.#clientKey,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Create a new captcha solving task
     * @param {AntiCaptchaTask} task - Task object with captcha details
     * @param {string} [callbackUrl] - Optional web address where we can send the results of captcha task processing. Contents are sent by AJAX POST request and are identical to the contents of getTaskResult method. If not provided, will use the callbackUrl from constructor options if set.
     * @returns {Promise<AntiCaptchaCreateTaskResponse>} Promise resolving to task creation response with taskId
     * @example
     * ```typescript
     * const response = await client.createTask({
     *     type: 'RecaptchaV2TaskProxyless',
     *     websiteURL: 'https://example.com',
     *     websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-'
     * });
     * console.log('Task ID:', response.taskId);
     * ```
     */
    async createTask(task: AntiCaptchaTask, callbackUrl?: string): Promise<AntiCaptchaCreateTaskResponse> {
        preProcessTask(task);
        const payload: Record<string, unknown> = {
            clientKey: this.#clientKey,
            task,
        };
        if (this.#options.softId) {
            payload.softId = this.#options.softId;
        }
        const finalCallbackUrl = callbackUrl ?? this.#options.callbackUrl;
        if (finalCallbackUrl) {
            payload.callbackUrl = finalCallbackUrl;
        }
        const response = await this.#client.request<ApiResponse<AntiCaptchaCreateTaskResponse>>({
            method: 'POST',
            url: '/createTask',
            data: JSON.stringify(payload),
        });
        return parseResponse(response.data);
    }

    /**
     * Get the result of a captcha solving task
     * @param {string} taskId - Task ID from createTask()
     * @returns {Promise<AntiCaptchaGetTaskResultResponse>} Promise resolving to task result
     * @example
     * ```typescript
     * const result = await client.getTaskResult('12345');
     * if (result.status === 'ready') {
     *     console.log('Solution:', result.solution);
     * }
     * ```
     */
    async getTaskResult(taskId: string): Promise<AntiCaptchaGetTaskResultResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaGetTaskResultResponse>>({
            method: 'POST',
            url: '/getTaskResult',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                taskId,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Report incorrect image captcha result
     * @param {string} taskId - Task ID to report
     * @returns {Promise<AntiCaptchaReportResponse>} Promise resolving to report response
     */
    async reportIncorrectImageCaptcha(taskId: string): Promise<AntiCaptchaReportResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaReportResponse>>({
            method: 'POST',
            url: '/reportIncorrectImageCaptcha',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                taskId,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Report incorrect recaptcha result
     * @param {string} taskId - Task ID to report
     * @returns {Promise<AntiCaptchaReportResponse>} Promise resolving to report response
     */
    async reportIncorrectRecaptcha(taskId: string): Promise<AntiCaptchaReportResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaReportResponse>>({
            method: 'POST',
            url: '/reportIncorrectRecaptcha',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                taskId,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Report correct recaptcha result (used for statistics and worker whitelisting)
     * @param {string} taskId - Task ID to report
     * @returns {Promise<AntiCaptchaReportResponse>} Promise resolving to report response
     */
    async reportCorrectRecaptcha(taskId: string): Promise<AntiCaptchaReportResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaReportResponse>>({
            method: 'POST',
            url: '/reportCorrectRecaptcha',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                taskId,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Push variable to AntiGate task during execution
     * @param {string} taskId - Task ID
     * @param {string} name - Variable name
     * @param {unknown} value - Variable value
     * @returns {Promise<AntiCaptchaReportResponse>} Promise resolving to report response
     * @example
     * ```typescript
     * await client.pushAntiGateVariable('12345', 'my_variable', 'value');
     * ```
     */
    async pushAntiGateVariable(taskId: string, name: string, value: unknown): Promise<AntiCaptchaReportResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaReportResponse>>({
            method: 'POST',
            url: '/pushAntiGateVariable',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                taskId,
                name,
                value,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Get queue load statistics to determine a suitable time for uploading tasks
     * @param {number} queueId - Queue identifier (1-29). See documentation for queue IDs
     * @param {string} [templateName] - Optional template name for AntiGate queue (ID 25)
     * @returns {Promise<AntiCaptchaQueueStatsResponse>} Promise resolving to queue statistics
     * @example
     * ```typescript
     * const stats = await client.getQueueStats(6); // Recaptcha v2 without proxy
     * console.log(`Waiting workers: ${stats.waiting}, Load: ${stats.load}%`);
     * ```
     */
    async getQueueStats(queueId: number, templateName?: string): Promise<AntiCaptchaQueueStatsResponse> {
        const payload: Record<string, unknown> = { queueId };
        if (templateName) {
            payload.templateName = templateName;
        }
        const response = await this.#client.request<ApiResponse<AntiCaptchaQueueStatsResponse>>({
            method: 'POST',
            url: '/getQueueStats',
            data: JSON.stringify(payload),
        });
        return parseResponse(response.data);
    }

    /**
     * Retrieve account spending statistics for a 24 hour period
     * @param {number} [date] - Unix timestamp of the hour from which to grab 24 hour stats (optional)
     * @param {string} [queue] - Queue name to filter by (optional). Examples: "English ImageToText", "Recaptcha Proxyless"
     * @param {number} [softId] - Filter by softId from Developer Center (optional)
     * @param {string} [ip] - Filter by IP address used for API calls (optional)
     * @returns {Promise<AntiCaptchaSpendingStatsResponse>} Promise resolving to spending statistics
     * @example
     * ```typescript
     * const stats = await client.getSpendingStats(1672185600, 'Recaptcha Proxyless');
     * console.log('Total tasks:', stats.data.reduce((sum, r) => sum + r.volume, 0));
     * ```
     */
    async getSpendingStats(
        date?: number,
        queue?: string,
        softId?: number,
        ip?: string
    ): Promise<AntiCaptchaSpendingStatsResponse> {
        const payload: Record<string, unknown> = {
            clientKey: this.#clientKey,
        };
        if (date !== undefined) payload.date = date;
        if (queue) payload.queue = queue;
        if (softId) payload.softId = softId;
        if (ip) payload.ip = ip;

        const response = await this.#client.request<ApiResponse<AntiCaptchaSpendingStatsResponse>>({
            method: 'POST',
            url: '/getSpendingStats',
            data: JSON.stringify(payload),
        });
        return parseResponse(response.data);
    }

    /**
     * Retrieve daily statistics for your registered application
     * @param {number} softId - The ID of your app from the Developer Center
     * @param {'errors' | 'views' | 'downloads' | 'users' | 'money'} [mode='errors'] - Type of stats (default: 'errors')
     * @returns {Promise<AntiCaptchaAppStatsResponse>} Promise resolving to app statistics
     * @example
     * ```typescript
     * const stats = await client.getAppStats(123, 'money');
     * console.log(`App earnings from ${stats.fromDate} to ${stats.toDate}`);
     * ```
     */
    async getAppStats(
        softId: number,
        mode: 'errors' | 'views' | 'downloads' | 'users' | 'money' = 'errors'
    ): Promise<AntiCaptchaAppStatsResponse> {
        const response = await this.#client.request<ApiResponse<AntiCaptchaAppStatsResponse>>({
            method: 'POST',
            url: '/getAppStats',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                softId,
                mode,
            }),
        });
        return parseResponse(response.data);
    }

    /**
     * Test method for debugging API requests
     * @param {Record<string, unknown>} [data={}] - Any data object to test with
     * @returns {Promise<unknown>} Promise resolving to raw API response (for debugging)
     * @example
     * ```typescript
     * const result = await client.test({ hello: 'world', apitest: true });
     * console.log(result); // Shows parsed and raw POST data
     * ```
     */
    async test(data: Record<string, unknown> = {}): Promise<unknown> {
        const response = await this.#client.request({
            method: 'POST',
            url: '/test',
            data: JSON.stringify({
                clientKey: this.#clientKey,
                ...data,
            }),
        });
        return response.data;
    }

    /**
     * Create and automatically poll for task completion
     * @param {AntiCaptchaTask} task - Task object with captcha details
     * @returns {Promise<AntiCaptchaSolveTaskResult | AntiCaptchaCreateTaskResponse>} Promise resolving to solved task result
     * @example
     * ```typescript
     * const result = await client.solve({
     *     type: 'RecaptchaV2TaskProxyless',
     *     websiteURL: 'https://example.com',
     *     websiteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-'
     * });
     * console.log('Token:', result.solution.gRecaptchaResponse);
     * ```
     */
    async solve(task: AntiCaptchaTask): Promise<AntiCaptchaSolveTaskResult | AntiCaptchaCreateTaskResponse> {
        if (!task) {
            return {
                errorCode: 'ERROR_INVALID_TASK_DATA',
                errorDescription: 'Missing task data.',
                errorId: 1,
                status: null,
            };
        }

        const response = await this.createTask(task);
        if (response.errorId === 1 || !response.taskId) {
            return response;
        }
        const taskId = response.taskId;

        await this.verbose(`[${taskId}] Created [${task.type}].`);
        await this.delay(Math.min(2000, this.#delay));

        while (true) {
            const result = await this.getTaskResult(taskId);
            if (result.status === 'ready' || result.errorId === 1) {
                const verboseMessage = result.status === 'ready' ? 'Solved!' : 'Failed!';
                await this.verbose(`[${taskId}] ${verboseMessage}`);
                return {
                    ...result,
                    taskId,
                };
            }

            await this.verbose(`[${taskId}] Waiting ${this.#delay}ms...`);
            await this.delay(this.#delay);
        }
    }
}

export default AntiCaptcha;
