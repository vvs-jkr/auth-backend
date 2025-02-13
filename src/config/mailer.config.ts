import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export const getMailerConfig = async (
	configService: ConfigService
): Promise<MailerOptions> => ({
	transport: {
		host: configService.get<string>('MAILER_HOST'),
		port: configService.get<number>('MAILER_PORT'),
		secure: false,
		requireTLS: true,
		auth: {
			user: configService.get<string>('MAILER_USER'),
			pass: configService.get<string>('MAILER_PASS')
		}
	},
	defaults: {
		from: configService.get<string>('MAILER_FROM_EMAIL')
	}
})
