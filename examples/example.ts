import { AntiCaptcha, type RecaptchaV2TaskProxyless } from 'node-anticaptcha';

const clientKey = process.env.ANTICAPTCHA_API_KEY ?? 'YOUR_API_KEY';
const websiteURL = process.env.RECAPTCHA_V2_WEBSITE_URL ?? 'https://2captcha.com/demo/recaptcha-v2';
const websiteKey = process.env.RECAPTCHA_V2_SITEKEY ?? '6LfD3PIbAAAAAJs_eEHvoOl75_83eXSqpPSRFJ_u';

async function main(): Promise<void> {
    if (!process.env.ANTICAPTCHA_API_KEY) {
        console.warn('Set ANTICAPTCHA_API_KEY to run this example against the real API.');
    }

    const client = new AntiCaptcha(clientKey, {
        verbose: true,
        verboseIdentifier: 'TS',
    });

    const balance = await client.getBalance();
    console.log(`Balance: $${balance.balance}`);

    const task: RecaptchaV2TaskProxyless = {
        type: 'RecaptchaV2TaskProxyless',
        websiteURL,
        websiteKey,
    };
    const result = await client.solve(task);
    console.log('Recaptcha V2 token:', result.solution?.gRecaptchaResponse);
}

main().catch((error: unknown) => {
    console.error('Example failed:', error);
    process.exitCode = 1;
});
