import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import type { NextApiRequest, NextApiResponse } from 'next';

import pinoLogger from 'next-pino/logger';
import pino from 'pino';

export default class RecaptchaService {
  private client: RecaptchaEnterpriseServiceClient;
  private projectPath: string;
  private readonly logger: pino.Logger;

  constructor(logger?: any) {
    this.client = new RecaptchaEnterpriseServiceClient();
    this.projectPath = this.client.projectPath(
      process.env.GCP_RECAPTCHA_PROJECT_ID || ''
    );
    this.logger = logger || pinoLogger;
  }

  async createAssessment(token: string) {
    const request = {
      assessment: {
        event: {
          token,
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
        },
      },
      parent: this.projectPath,
    };
    const [response] = await this.client.createAssessment(request);
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
