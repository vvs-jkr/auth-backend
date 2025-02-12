import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { MailerSendService } from '@/libs/mail/mailersend/mailersend.service'
import { UserService } from '@/user/user.service'

import { AuthModule } from '../auth.module'

import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailConfirmationService } from './email-confirmation.service'

@Module({
	imports: [forwardRef(() => AuthModule), ConfigModule],
	controllers: [EmailConfirmationController],
	providers: [EmailConfirmationService, UserService, MailerSendService],
	exports: [EmailConfirmationService, MailerSendService]
})
export class EmailConfirmationModule {}
