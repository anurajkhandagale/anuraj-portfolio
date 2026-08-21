"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { showToast } from "@/utils/notifications";

export async function generateAndDownloadBusinessCard(): Promise<void> {
  const { profile } = PORTFOLIO_DATA;

  // High-res retina canvas dimensions (1200 x 675 - 16:9 ratio)
  const width = 1200;
  const height = 675;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 1. Deep Space Dark Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 700);
  bgGrad.addColorStop(0, "#0e111a");
  bgGrad.addColorStop(1, "#030407");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Ambient Glowing Luminous Spheres behind the glass card
  // Red/Crimson Orb (Top Right)
  const redOrb = ctx.createRadialGradient(width - 150, 120, 10, width - 150, 120, 260);
  redOrb.addColorStop(0, "rgba(235, 35, 75, 0.75)");
  redOrb.addColorStop(0.5, "rgba(180, 15, 55, 0.35)");
  redOrb.addColorStop(1, "transparent");
  ctx.fillStyle = redOrb;
  ctx.beginPath();
  ctx.arc(width - 150, 120, 260, 0, Math.PI * 2);
  ctx.fill();

  // Purple Nebula (Bottom Left)
  const purpleOrb = ctx.createRadialGradient(180, height - 120, 10, 180, height - 120, 300);
  purpleOrb.addColorStop(0, "rgba(140, 60, 255, 0.55)");
  purpleOrb.addColorStop(0.5, "rgba(70, 30, 210, 0.25)");
  purpleOrb.addColorStop(1, "transparent");
  ctx.fillStyle = purpleOrb;
  ctx.beginPath();
  ctx.arc(180, height - 120, 300, 0, Math.PI * 2);
  ctx.fill();

  // Gold Glow (Center bottom)
  const goldOrb = ctx.createRadialGradient(width / 2 + 100, height - 80, 10, width / 2 + 100, height - 80, 220);
  goldOrb.addColorStop(0, "rgba(212, 165, 116, 0.45)");
  goldOrb.addColorStop(1, "transparent");
  ctx.fillStyle = goldOrb;
  ctx.beginPath();
  ctx.arc(width / 2 + 100, height - 80, 220, 0, Math.PI * 2);
  ctx.fill();

  // 3. Central Glassmorphism Card (Frosted Glass Container)
  const cardX = 70;
  const cardY = 60;
  const cardW = width - 140;
  const cardH = height - 120;
  const cardR = 36;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Top specular highlight border
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cardX + cardR, cardY);
  ctx.lineTo(cardX + cardW - cardR, cardY);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 4. Helper function to load image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load ${src}`));
      img.src = src;
    });
  };

  // 5. Draw Profile Photo
  try {
    const avatarImg = await loadImage(profile.avatar);
    const avX = cardX + 60;
    const avY = cardY + 70;
    const avSize = 160;

    // Glowing border ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2 + 6, 0, Math.PI * 2);
    ctx.strokeStyle = "#d4a574";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Clip circular avatar
    ctx.beginPath();
    ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(avatarImg, avX, avY, avSize, avSize);
    ctx.restore();
  } catch {
    const avX = cardX + 60;
    const avY = cardY + 70;
    const avSize = 160;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#d4a574";
    ctx.fill();
    ctx.restore();
  }

  // 6. Developer Identity Typography (Clean & Minimal without skills)
  const textLeft = cardX + 260;

  // Status Badge
  ctx.save();
  ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
  ctx.beginPath();
  ctx.roundRect(textLeft, cardY + 70, 240, 30, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = "bold 13px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillStyle = "#34d399";
  ctx.fillText("● AVAILABLE FOR OPPORTUNITIES", textLeft + 14, cardY + 90);
  ctx.restore();

  // Name
  ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(profile.name, textLeft, cardY + 150);

  // Role Title
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
  ctx.fillStyle = "#d4a574";
  ctx.fillText("Java Backend Developer • Software Engineer", textLeft, cardY + 188);

  // University & CGPA
  ctx.font = "500 16px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("B.E. Computer Engineering (SPPU)  •  CGPA: 8.12 / 10.00", textLeft, cardY + 222);

  // 7. Divider Line
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 270);
  ctx.lineTo(cardX + cardW - 60, cardY + 270);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 8. Contact Channels (Spacious & Clean Layout)
  const contactY = cardY + 325;
  ctx.font = "bold 14px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#d4a574";
  ctx.fillText("CONNECT & CHANNELS", cardX + 60, contactY);

  ctx.font = "500 17px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`✉  ${profile.email}`, cardX + 60, contactY + 40);
  ctx.fillText(`⚡  github.com/anurajkhandagale`, cardX + 60, contactY + 80);
  ctx.fillText(`💼  linkedin.com/in/anuraj-khandagale-10020732b`, cardX + 60, contactY + 120);
  ctx.fillText(`📸  instagram.com/foxy52a (@foxy52a)`, cardX + 60, contactY + 160);

  // 9. Embedded Resume QR Code (Bottom Right of Card)
  const qrX = cardX + cardW - 240;
  const qrY = cardY + 295;
  const qrSize = 180;

  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
      profile.resumeUrl
    )}&color=05070d&bgcolor=ffffff&qzone=2&margin=0`;

    const qrImg = await loadImage(qrUrl);

    // QR Container card
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 66, 18);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // White QR code backdrop
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(qrX, qrY, qrSize, qrSize, 14);
    ctx.fill();
    ctx.drawImage(qrImg, qrX + 6, qrY + 6, qrSize - 12, qrSize - 12);

    // QR Caption
    ctx.font = "bold 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#d4a574";
    ctx.textAlign = "center";
    ctx.fillText("SCAN FOR RESUME", qrX + qrSize / 2, qrY + qrSize + 32);
    ctx.restore();
  } catch {
    // Fallback if QR network delayed
  }

  // 10. Watermark Footer
  ctx.save();
  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.textAlign = "right";
  ctx.fillText("ANURAJ.DEV  •  INTELLIJ GLASS ARCHITECTURE", cardX + cardW - 60, cardY + cardH - 25);
  ctx.restore();

  // 11. Trigger Instant Client-Side PNG Download
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `Anuraj_Khandagale_DevCard.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Developer Business Card", "Anuraj_Khandagale_DevCard.png saved to Downloads", "card");
}
