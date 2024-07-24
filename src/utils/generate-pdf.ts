import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync, promises as fsPromises } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export async function generatePDF(): Promise<ComboReturn<string, RequestError>> {
    try {
        const browser = await puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const absolutePath = join(__dirname, "../templates/report.html");
        
        // Ensure the HTML file is readable
        await fsPromises.access(absolutePath);
        
        await page.goto(`file://${absolutePath}`, { waitUntil: "networkidle0" });
        const outputPath = join(__dirname, "../../public/report.pdf");
        
        // Ensure the public directory exists
        await fsPromises.mkdir(join(__dirname, "../../public"), { recursive: true });

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
            data: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/report.pdf`,
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
