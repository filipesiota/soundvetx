import * as Puppeteer from "puppeteer";
import Chromium from "@sparticuz/chromium";
import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync } from "fs";
import path from "path";

async function getBrowser(): Promise<Puppeteer.Browser> {
	if (process.env.NODE_ENV === "production") {
		return Puppeteer.launch({
			args: Chromium.args,
			defaultViewport: Chromium.defaultViewport,
			executablePath: await Chromium.executablePath(),
			headless: Chromium.headless
		});
	}

	return Puppeteer.launch({
		headless: true
	});
}

export async function generatePDF(): Promise<ComboReturn<Blob, RequestError>> {
	try {
		const browser = await getBrowser();
		const page = await browser.newPage();
		await page.goto(`${process.env.VERCEL_URL}/report.html`, { waitUntil: "networkidle0" });
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
