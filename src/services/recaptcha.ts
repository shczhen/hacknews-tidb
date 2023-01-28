// import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
// import { GoogleAuth } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

import pinoLogger from 'next-pino/logger';
import pino from 'pino';
import axios, { AxiosInstance } from 'axios';

export default class RecaptchaService {
  // private client: RecaptchaEnterpriseServiceClient;
  // private projectPath: string;
  private readonly logger: pino.Logger;
  private readonly ASSESSMENTS_URL: string;
  private readonly fetcher: AxiosInstance;

  constructor(logger?: any) {
    // this.client = new RecaptchaEnterpriseServiceClient();
    // this.projectPath = this.client.projectPath(
    //   process.env.GCP_RECAPTCHA_PROJECT_ID || ''
    // );
    this.logger = logger || pinoLogger;
    const parents = `projects/${process.env.GCP_RECAPTCHA_PROJECT_ID}`;
    const apiKey = process.env.GCP_RECAPTCHA_API_KEY;
    this.ASSESSMENTS_URL = `https://recaptchaenterprise.googleapis.com/v1/${parents}/assessments?key=${apiKey}`;
    this.fetcher = axios.create({
      timeout: 5000,
    });
  }

  async createAssessment(token: string) {
    const request = {
      assessment: {
        event: {
          token,
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
        },
      },
      // parent: this.projectPath,
    };
    // const [response] = await this.client.createAssessment(request);
    const response = this.fetcher
      .post(this.ASSESSMENTS_URL, request.assessment, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);
    return response;
  }

  async verifyRequest(req: NextApiRequest, res: NextApiResponse<any>) {
    if (!req.headers['x-recaptcha-token']) {
      this.logger.error(
        {
          name: 'RecaptchaService/verifyRequest',
          error: 'No x-recaptcha-token',
        },
        'No token'
      );
      res.status(400)?.json({
        message: 'No token',
      });
      return false;
    }
    const response = await this.createAssessment(
      req.headers['x-recaptcha-token'] as string
    );
    // this.logger.debug(response);
    if (!response.tokenProperties?.valid) {
      this.logger.error(
        {
          name: 'RecaptchaService/verifyRequest',
          error: response,
        },
        'Invalid token'
      );
      res.status(400)?.json({
        message: 'Invalid token',
        score: response?.riskAnalysis?.score,
        reason: response.tokenProperties?.invalidReason,
      });
      return false;
    }

    if (response.tokenProperties.action === 'CHAT') {
      return true;
    } else {
      this.logger.error(
        {
          name: 'RecaptchaService/verifyRequest',
          error: response,
        },
        `Fail[${response.riskAnalysis?.reasons}]: ${response.tokenProperties?.action} is not CHAT`
      );
      res.status(500)?.json({
        reason: response.riskAnalysis?.reasons,
        status: 'Fail',
      });
      return false;
    }
  }
}
