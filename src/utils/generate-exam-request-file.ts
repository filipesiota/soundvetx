import * as puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"
import { readFileSync } from "fs"
import path from "path"

import { ComboReturn } from "@/types/combo-return"
import { RequestError } from "@/types/request"
import { ExamRequest } from "@/schemas/exam-request-schema"

function decorateTemplateContent(template: string, formData: ExamRequest): string {
	const examItems: string[] = Array().concat(
		formData.softTissues ?? [],
		formData.skullItems ?? [],
		formData.axialSkeletonItems ?? [],
		formData.appendicularSkeletonItems ?? [],
		formData.combos ?? []
	)

	const examItemsContent =
		examItems.find(exam => exam !== "") !== undefined
			? `
		<p>
			${examItems.join("</p><p>")}
		</p>
	`
			: ""

	const observationsContent =
		formData.observations !== ""
			? `
		<section>
			<h2>Observação</h2>
			<p>${formData.observations}</p>
		</section>
	`
			: ""

	const currentFullDate = new Date().toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	})

	template = template.replaceAll("{{ patientName }}", formData.patientName)
	template = template.replaceAll("{{ patientSpecies }}", formData.patientSpecies)
	template = template.replaceAll("{{ patientBreed }}", formData.patientBreed)
	template = template.replaceAll("{{ patientSex }}", formData.patientSex)
	template = template.replaceAll("{{ patientTutor }}", formData.patientTutor)
	template = template.replaceAll("{{ examItems }}", examItemsContent)
	template = template.replaceAll("{{ examSuspicion }}", formData.examSuspicion)
	template = template.replaceAll("{{ observations }}", observationsContent)
	template = template.replaceAll("{{ currentFullDate }}", currentFullDate)

	return template
}

export async function generateExamRequestFile(formData: ExamRequest): Promise<ComboReturn<Blob, RequestError>> {
	try {
		const browser = await puppeteer.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			headless: chromium.headless
		})
		const page = await browser.newPage()
		const templatePath = path.join(process.cwd(), "src", "templates", "report.html")
		const template = readFileSync(templatePath, "utf8")
		const templateContent = decorateTemplateContent(template, formData)
		await page.setContent(templateContent, { waitUntil: "networkidle0" })
		const pdfBuffer = await page.pdf({ format: "A4" })
		await browser.close()

		return {
			data: new Blob([pdfBuffer], { type: "application/pdf" }),
			error: null
		}
	} catch (error: any) {
		console.log(error)

		return {
			data: null,
			error: {
				message: {
					serverMessage: "Failed to generate PDF file",
					clientMessage:
						"Ocorreu um erro ao gerar o arquivo do exame. Por favor, contate a SoundvetX."
				}
			}
		}
	}
}
