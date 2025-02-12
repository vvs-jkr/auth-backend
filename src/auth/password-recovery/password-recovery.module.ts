import { Module } from '@nestjs/common'

import { UserService } from '@/user/user.service'

import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module'

import { PasswordRecoveryController } from './password-recovery.controller'
import { PasswordRecoveryService } from './password-recovery.service'

@Module({
	imports: [EmailConfirmationModule],
	controllers: [PasswordRecoveryController],
	providers: [PasswordRecoveryService, UserService]
})
export class PasswordRecoveryModule {}
