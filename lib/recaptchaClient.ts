type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** Gets a reCAPTCHA v3 token for `action`. Rejects if the script is not loaded. */
export const getRecaptchaToken = (action: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const grecaptcha = window.grecaptcha;
    if (!RECAPTCHA_SITE_KEY || !grecaptcha) {
      reject(new Error("reCAPTCHA is not available"));
      return;
    }
    grecaptcha.ready(() => {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve, reject);
    });
  });
