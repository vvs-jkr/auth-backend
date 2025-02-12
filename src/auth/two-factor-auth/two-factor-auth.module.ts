import { Module } from '@nestjs/common'

import { EmailConfirmationModule } from '@/auth/email-confirmation/email-confirmation.module'

import { TwoFactorAuthService } from './two-factor-auth.service'

@Module({
	imports: [EmailConfirmationModule],
	providers: [TwoFactorAuthService]
})
export class TwoFactorAuthModule {}
