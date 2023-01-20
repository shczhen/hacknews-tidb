import { axiosWithRecaptchaToken } from 'src/utils/axios';

const TOEKN = `dGVzdCBobiBjaGF0MnF1ZXJ5`;

async function waitGRecaptchaReady(): Promise<boolean> {
  // const checkGRecaptcha = new Promise<boolean>((resolve, reject) => {
  //   const timer = setInterval(() => {
  //     if (grecaptcha.enterprise) {
  //       resolve(true);
  //     }
  //   }, 200);
  //   setTimeout(() => {
  //     clearInterval(timer);
  //     reject(new Error('grecaptcha.enterprise.ready timeout'));
  //   }, 2000);
  // });
  const checkGRecaptchaReady = new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('grecaptcha.enterprise.ready timeout'));
    }, 10000);
    grecaptcha.enterprise.ready(() => {
      resolve(true);
    });
  });
  return checkGRecaptchaReady;
}

export async function postQuestion(question: string) {
  await waitGRecaptchaReady();
  const grecaptchaToken = await grecaptcha.enterprise.execute(
    process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '',
    {
      action: 'CHAT',
    }
  );
  // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
  // reCAPTCHA Enterprise to the end user's browser.
  // This token must be validated by creating an assessment.
  // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
  const axios = axiosWithRecaptchaToken(grecaptchaToken);

  return axios
    .post('/api/question', {
      question,
      token: TOEKN,
    })
    .then((response) => response.data);
}

export async function postSQL2Chart(question: string, sql: string) {
  await waitGRecaptchaReady();
  const grecaptchaToken = await grecaptcha.enterprise.execute(
    process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '',
    {
      action: 'CHAT',
    }
  );
  const axios = axiosWithRecaptchaToken(grecaptchaToken);

  return axios
    .post('/api/chart', {
      question,
      sql,
      token: TOEKN,
    })
    .then((response) => response.data);
}
