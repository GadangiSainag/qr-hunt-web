import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export async function generateQR({
  text,
  topText,
  bottomText,
  logoPath,
}: {
  text: string;
  topText: string;
  bottomText: string;
  logoPath: string;
}) {
  try {
    // 1. Create canvas and load images
    const canvas = createCanvas(720, 1280);
    const ctx = canvas.getContext('2d');
    
    // 2. Load background image and draw it
    const bgImage = await loadImage('../../public/template.jpg');
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    
    // 3. Generate QR code with logo
    const qrSize = 450;
    const qrDataURL = await QRCode.toDataURL(text, {
      width: qrSize,
      margin: 2,
      errorCorrectionLevel: 'H',
    });
    
    const qrImage = await loadImage(qrDataURL);
    const logo = await loadImage(logoPath);
    
    // 4. Position QR code with appropriate top margin
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = 600;
    
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
    
    // 5. Add white background for logo
    const logoSize = qrSize * 0.2; // 20% of QR code size
    const logoMargin = 10; // Margin around the logo (adjust as needed)
    const logoBackgroundSize = logoSize + (logoMargin * 2);
    const logoBgX = qrX + (qrSize - logoBackgroundSize) / 2;
    const logoBgY = qrY + (qrSize - logoBackgroundSize) / 2;
    
    // Draw white background for logo
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(logoBgX, logoBgY, logoBackgroundSize, logoBackgroundSize);
    
    // 6. Add logo on top of white background
    const logoPosX = logoBgX + logoMargin;
    const logoPosY = logoBgY + logoMargin;
    
    ctx.drawImage(logo, logoPosX, logoPosY, logoSize, logoSize);
    
    // 7. Add top text (centered, above QR)
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.fillText(topText, canvas.width / 2, qrY - 80);
    
    // 8. Add bottom text (centered, below QR)
    ctx.font = '24px Arial';
    ctx.fillText(bottomText, canvas.width / 2, qrY + qrSize + 50);
    
    // 9. Return a data URL instead of saving to the filesystem
    const dataURL = canvas.toDataURL('image/jpeg', 0.95);

    return {
      dataURL,
      fileName: `${topText.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`
    };
  } catch (error) {
    console.error('Error generating branded QR:', error);
    throw error;
  }
}

export function downloadImage(dataURL: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



