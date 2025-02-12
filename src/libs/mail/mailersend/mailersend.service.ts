import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerSend } from 'mailersend'
import { EmailParams, Recipient, Sender } from 'mailersend'

@Injectable()
export class MailerSendService {
	private readonly logger = new Logger(MailerSendService.name)
	private readonly apiKey: string
	private readonly mailersend: MailerSend
	private readonly fromEmail: string
	private readonly fromName: string

	constructor(private readonly configService: ConfigService) {
		this.apiKey =
			this.configService.getOrThrow<string>('MAILERSEND_API_KEY')
		this.fromEmail =
			this.configService.getOrThrow<string>('MAILER_FROM_EMAIL')
		this.fromName =
			this.configService.getOrThrow<string>('MAILER_FROM_NAME')

		this.mailersend = new MailerSend({
			apiKey: this.apiKey
		})
	}

	async sendEmail(to: string, subject: string, html: string): Promise<any> {
		try {
			const sender: Sender = {
				email: this.fromEmail,
				name: this.fromName
			}

			const emailParams = new EmailParams()
			emailParams.from = sender
			emailParams.to = [new Recipient(to)]
			emailParams.subject = subject
			emailParams.html = html
			emailParams.text = 'Это резервный текст для email'

			const response = await this.mailersend.email.send(emailParams)
			this.logger.log(`Email отправлен на ${to} с темой ${subject}`)
			return response
		} catch (error) {
			this.logger.error(
				`Ошибка отправки email на ${to} с темой ${subject}:`,
				error
			)
			throw new Error(
				`Не удалось отправить email через MailerSend API: ${error.message}`
			)
		}
	}
}
