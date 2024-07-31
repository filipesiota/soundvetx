import * as puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync } from "fs";
import path from "path";

async function getBrowser(): Promise<puppeteer.Browser> {
	if (process.env.NODE_ENV === "production") {
		return puppeteer.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			headless: chromium.headless
		});
	}

	return puppeteer.launch({
		headless: true
	});
}

export async function generatePDF(): Promise<ComboReturn<Blob, RequestError>> {
	try {
		const browser = await getBrowser();
		const page = await browser.newPage();
		const templatePath = path.join(process.cwd(), "src", "templates", "report.html");
		const templateContent = readFileSync(templatePath, "utf8");
		await page.setContent(templateContent, { waitUntil: "networkidle0" });
		const pdfBuffer = await page.pdf({ format: "A4" });
		await browser.close();

		return {
			data: new Blob([pdfBuffer], { type: "application/pdf" }),
			error: null
		};
	} catch (error: any) {
		console.log(error);
		
		return {
			data: null,
			error: {
				message: "Failed to generate PDF file"
			}
		};
	}
}
