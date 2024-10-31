import { PDFDocument, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { saveAs } from "file-saver";

const generatePDFWithQRCode = async (text: string, place?: string, filename?:string) => {
    // Integrate to have Answer on top of the qr and 
    // Place the qr in correct position.
    // Custom filename when pdf downloads
  try {
    // 1. Generate the QR code as a data URL
    const qrCodeDataUrl = await QRCode.toDataURL(text);

    // 2. Load the existing image as bytes (replace with your image's URL or path)
    const imageUrl = "/qr-code.jpg";
    const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());

    // 3. Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // 4. Embed the image and QR code into the PDF
    const embeddedImage = await pdfDoc.embedJpg(imageBytes);
    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl.split(",")[1]);

    // 5. Add a blank page to the PDF and place the image on it
    const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: embeddedImage.width,
      height: embeddedImage.height,
    });

    // 6. Define the QR code position and size
    const qrCodeSize = 300;
    const qrCodeX = (page.getWidth() - qrCodeSize) / 2;
    const qrCodeY = (page.getHeight() - qrCodeSize) / 2;

    // 7. Draw the QR code image on the page
    page.drawImage(qrCodeImage, {
      x: qrCodeX,
      y: qrCodeY,
      width: qrCodeSize,
      height: qrCodeSize,
    });

    // 8. Draw the text below the QR code with padding
    const padding = 20;
    const textY = qrCodeY - padding; // Position the text slightly below the QR code
    page.drawText(text, {
      x: qrCodeX,
      y: textY,
      size: 12,
      color: rgb(0, 0, 0), // Black text color
    });

    // 9. Save the PDF and trigger the download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "qr_code_image_pdf.pdf");
  } catch (error) {
    console.error("Error generating PDF with QR code:", error);
  }
};
export default generatePDFWithQRCode;
