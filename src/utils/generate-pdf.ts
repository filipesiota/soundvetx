import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync } from "fs";
import { join } from "path";

export async function generatePDF(): Promise<ComboReturn<string, RequestError>> {
    try {
        const browser = await puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        const absolutePath = join(process.cwd(), "src", "templates", "report.html");
        const outputPath = join(process.cwd(), "public", "report.pdf");

        await page.goto(`file://${absolutePath}`, { waitUntil: "networkidle0" });
        await page.pdf({ path: outputPath, format: "A4" });
        await browser.close();

        if (readFileSync(outputPath).length === 0) {
            return {
                data: null,
                error: {
                    message: "Failed to generate PDF",
                },
            };
        }

        return {
            data: `${process.env.VERCEL_URL}/report.pdf`,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: {
                message: error.message || "An unexpected error occurred",
            },
        };
    }
}
