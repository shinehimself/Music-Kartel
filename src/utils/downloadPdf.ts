import { jsPDF } from 'jspdf';
import { CONSTITUTION_ARTICLES } from '../data/charityData';

export const triggerPdfDownload = async (
  filename = 'sadaqah-africa-constitution-and-audited-reports.pdf'
): Promise<void> => {
  // Try fetching the pre-built, high-resolution static PDF first
  try {
    const response = await fetch('/sadaqah-africa-constitution-and-audited-reports.pdf');
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return;
    }
  } catch {
    // If fetch fails (e.g. offline preview), fall back to client-side jsPDF generation
  }

  // Client-side fallback generator
  generateClientSidePdf(filename);
};

export const generateClientSidePdf = (
  filename = 'sadaqah-africa-constitution-and-audited-reports.pdf'
): void => {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
    orientation: 'portrait',
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const cDarkGreen: [number, number, number] = [10, 46, 15];
  const cMidGreen: [number, number, number] = [17, 74, 24];
  const cGold: [number, number, number] = [229, 154, 20];
  const cLemon: [number, number, number] = [216, 236, 110];
  const cTextDark: [number, number, number] = [30, 41, 59];
  const cTextMuted: [number, number, number] = [100, 116, 139];
  const cLightBorder: [number, number, number] = [226, 232, 240];

  const totalPages = 5;

  const drawHeader = (pageNum: number) => {
    doc.setFillColor(...cDarkGreen);
    doc.rect(0, 0, pageWidth, 28, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(245, 245, 245);
    doc.text('SADAQAH AFRICA CHARITY ORGANIZATION · OFFICIAL CONSTITUTION & AUDITED REPORT', margin, 18);
    doc.setTextColor(...cLemon);
    doc.text('REG: NGO/2022/UG-4921', pageWidth - margin - 120, 18);
    doc.setDrawColor(...cGold);
    doc.setLineWidth(1.5);
    doc.line(0, 28, pageWidth, 28);
  };

  const drawFooter = (pageNum: number) => {
    const y = pageHeight - 25;
    doc.setDrawColor(...cLightBorder);
    doc.setLineWidth(0.75);
    doc.line(margin, y - 8, pageWidth - margin, y - 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...cTextMuted);
    doc.text('United Bank for Africa (UBA) A/C: 0764007338 | SWIFT: UNAFUGKA | Jinja, Uganda, Africa', margin, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 60, y);
  };

  // PAGE 1: COVER
  drawHeader(1);

  doc.setFillColor(250, 247, 240);
  doc.roundedRect(margin, 45, contentWidth, 110, 6, 6, 'F');
  doc.setDrawColor(...cGold);
  doc.setLineWidth(1);
  doc.roundedRect(margin, 45, contentWidth, 110, 6, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...cMidGreen);
  doc.text('BISMILLAHI AR-RAHMAN AR-RAHEEM · IN THE NAME OF ALLAH, THE MOST MERCIFUL', margin + 15, 65);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...cDarkGreen);
  doc.text('THE FOUNDING CONSTITUTION & AUDITED REPORTS', margin + 15, 90);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...cTextDark);
  doc.text('Official Governance Charter, Inviolable Amanah Code, and 5-Year Financial Disclosures (2022-2026)', margin + 15, 108);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cMidGreen);
  doc.text('Headquarters: Jinja, Uganda, Africa · Banking: United Bank for Africa (UBA) A/C: 0764007338', margin + 15, 126);

  // Preamble
  let yPos = 170;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, yPos, contentWidth, 75, 4, 4, 'F');
  doc.setDrawColor(...cMidGreen);
  doc.setLineWidth(2);
  doc.line(margin, yPos, margin, yPos + 75);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...cDarkGreen);
  doc.text('SOLEMN PREAMBLE', margin + 12, yPos + 18);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...cTextDark);
  const preamble = 'We, the founders, trustees, field directors, and volunteers of Sadaqah Africa Charity Organization, affirming that every step in the right direction matters, adopt this Constitution to guide our collective duty of relieving distress, restoring human honor, providing sustainable clean water, healing sickle cell patients, and building enduring community infrastructure under the sacred principle of Amanah.';
  doc.text(doc.splitTextToSize(preamble, contentWidth - 25), margin + 12, yPos + 33);

  // Pillars
  yPos = 260;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...cDarkGreen);
  doc.text('FOUR PILLARS OF INVIOLABLE FIDUCIARY TRUST', margin, yPos);

  const pillars = [
    { title: '1. Inviolable Amanah (100% Policy)', desc: 'Every gift is ring-fenced strictly for the donor\'s designated project. Zero diversion permitted.' },
    { title: '2. Dual Signatory Requirement', desc: 'All UBA bank withdrawals require simultaneous authorization from the Executive Director and Treasurer.' },
    { title: '3. Mandatory Tuesday Field Audits', desc: 'The Field Committee inspects every community request on-site before financial commitments are released.' },
    { title: '4. Maximum 5% Operational Cap', desc: 'Statutory ceiling restricting administrative and logistics costs to under 5%. 95%+ direct field aid.' },
  ];

  pillars.forEach((p, idx) => {
    const boxY = yPos + 12 + idx * 48;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, boxY, contentWidth, 40, 3, 3, 'F');
    doc.setDrawColor(...cLightBorder);
    doc.roundedRect(margin, boxY, contentWidth, 40, 3, 3, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...cMidGreen);
    doc.text(p.title, margin + 10, boxY + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...cTextDark);
    doc.text(doc.splitTextToSize(p.desc, contentWidth - 20), margin + 10, boxY + 26);
  });

  drawFooter(1);

  // PAGE 2: ARTICLES 1 - 5
  doc.addPage();
  drawHeader(2);
  yPos = 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...cDarkGreen);
  doc.text('SECTION I: CONSTITUTIONAL CHARTER (ARTICLES 1 TO 5)', margin, yPos);
  yPos += 20;

  CONSTITUTION_ARTICLES.slice(0, 5).forEach((art) => {
    doc.setFillColor(...cMidGreen);
    doc.rect(margin, yPos, contentWidth, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`ARTICLE ${art.number}: ${art.title.toUpperCase()}`, margin + 8, yPos + 11);
    yPos += 22;

    art.paragraphs.forEach((p) => {
      if (Array.isArray(p)) {
        p.forEach((bullet) => {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(...cTextDark);
          const split = doc.splitTextToSize(`• ${bullet}`, contentWidth - 15);
          doc.text(split, margin + 10, yPos);
          yPos += split.length * 9 + 2;
        });
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...cTextDark);
        const split = doc.splitTextToSize(p, contentWidth - 5);
        doc.text(split, margin + 4, yPos);
        yPos += split.length * 9 + 3;
      }
    });
    yPos += 6;
  });
  drawFooter(2);

  // PAGE 3: ARTICLES 6 - 9
  doc.addPage();
  drawHeader(3);
  yPos = 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...cDarkGreen);
  doc.text('SECTION II: CAPITAL INFRASTRUCTURE & GOVERNANCE (ARTICLES 6 TO 9)', margin, yPos);
  yPos += 20;

  CONSTITUTION_ARTICLES.slice(5, 9).forEach((art) => {
    doc.setFillColor(...cMidGreen);
    doc.rect(margin, yPos, contentWidth, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`ARTICLE ${art.number}: ${art.title.toUpperCase()}`, margin + 8, yPos + 11);
    yPos += 22;

    art.paragraphs.forEach((p) => {
      if (Array.isArray(p)) {
        p.forEach((bullet) => {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(...cTextDark);
          const split = doc.splitTextToSize(`• ${bullet}`, contentWidth - 15);
          doc.text(split, margin + 10, yPos);
          yPos += split.length * 9 + 2;
        });
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...cTextDark);
        const split = doc.splitTextToSize(p, contentWidth - 5);
        doc.text(split, margin + 4, yPos);
        yPos += split.length * 9 + 3;
      }
    });
    yPos += 6;
  });
  drawFooter(3);

  // PAGE 4: ARTICLES 10 - 12
  doc.addPage();
  drawHeader(4);
  yPos = 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...cDarkGreen);
  doc.text('SECTION III: INTEGRITY, AUDITS & DISSOLUTION (ARTICLES 10 TO 12)', margin, yPos);
  yPos += 20;

  CONSTITUTION_ARTICLES.slice(9, 12).forEach((art) => {
    doc.setFillColor(...cMidGreen);
    doc.rect(margin, yPos, contentWidth, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`ARTICLE ${art.number}: ${art.title.toUpperCase()}`, margin + 8, yPos + 11);
    yPos += 22;

    art.paragraphs.forEach((p) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...cTextDark);
      const textVal = Array.isArray(p) ? p.join('\n') : p;
      const split = doc.splitTextToSize(textVal, contentWidth - 5);
      doc.text(split, margin + 4, yPos);
      yPos += split.length * 9 + 3;
    });
    yPos += 6;
  });

  // Ratification box
  doc.setFillColor(250, 247, 240);
  doc.roundedRect(margin, yPos + 15, contentWidth, 100, 4, 4, 'F');
  doc.setDrawColor(...cGold);
  doc.roundedRect(margin, yPos + 15, contentWidth, 100, 4, 4, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...cDarkGreen);
  doc.text('FORMAL RATIFICATION & LEGAL ADOPTION', margin + 12, yPos + 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...cTextDark);
  doc.text('Adopted unanimously by the Board of Trustees at Jinja, Uganda, Africa. Registered Non-Profit NGO.', margin + 12, yPos + 46);

  const sigW = contentWidth / 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Dr. Al-Hajji Kassim Semakula', margin + 10, yPos + 75);
  doc.text('Executive Director / CEO', margin + sigW + 10, yPos + 75);
  doc.text('Hajat Mariam Nakato, FCCA', margin + sigW * 2 + 10, yPos + 75);

  drawFooter(4);

  // PAGE 5: FINANCIAL AUDITS
  doc.addPage();
  drawHeader(5);
  yPos = 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...cDarkGreen);
  doc.text('STATUTORY AUDITED FINANCIAL STATEMENTS (FY 2022 - FY 2026 YTD)', margin, yPos);
  yPos += 20;

  // Auditor box
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, yPos, contentWidth, 48, 4, 4, 'F');
  doc.setDrawColor(34, 197, 94);
  doc.line(margin, yPos, margin, yPos + 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cMidGreen);
  doc.text('INDEPENDENT AUDITOR\'S UNQUALIFIED OPINION (CLEAN CERTIFICATE)', margin + 10, yPos + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...cTextDark);
  const opinion = 'Kayondo & Associates CPAs (ICPAU #F0082): Financial records give a true and fair view of all receipts, disbursements, and reserves. Program allocation reflects 95.8% direct ground aid and 4.2% operational audit costs.';
  doc.text(doc.splitTextToSize(opinion, contentWidth - 20), margin + 10, yPos + 25);

  yPos += 58;

  // Table summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...cDarkGreen);
  doc.text('FIVE-YEAR AUDITED FINANCIAL SUMMARY (USD)', margin, yPos);
  yPos += 10;

  const rows = [
    ['Total Public Contributions', '$12,400', '$24,800', '$38,200', '$46,500', '$19,850'],
    ['Capital Endowments (Schools/Hospitals)', '$4,500', '$8,200', '$15,400', '$21,800', '$14,200'],
    ['Gross Revenue', '$16,900', '$33,000', '$53,600', '$68,300', '$34,050'],
    ['Direct Humanitarian Aid Disbursed (95.8%)', '$16,100', '$31,600', '$51,300', '$65,500', '$32,600'],
    ['Audit, Compliance & Banking (4.2%)', '$710', '$1,280', '$2,120', '$2,650', '$1,210'],
    ['Net Project Reserve Retained', '$90', '$120', '$180', '$150', '$240'],
  ];

  const colW = [165, 70, 70, 70, 70, 70];
  const tableHeaders = ['Category', 'FY 2022', 'FY 2023', 'FY 2024', 'FY 2025', 'FY 2026'];

  doc.setFillColor(...cMidGreen);
  doc.rect(margin, yPos, contentWidth, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  let x = margin + 4;
  tableHeaders.forEach((h, idx) => {
    doc.text(h, x, yPos + 10);
    x += colW[idx];
  });
  yPos += 14;

  rows.forEach((r, idx) => {
    const isTotal = idx === 2 || idx === 3;
    doc.setFillColor(isTotal ? 245 : (idx % 2 === 0 ? 255 : 250), 250, 250);
    doc.rect(margin, yPos, contentWidth, 14, 'F');
    doc.setDrawColor(...cLightBorder);
    doc.rect(margin, yPos, contentWidth, 14, 'S');

    doc.setFont('helvetica', isTotal ? 'bold' : 'normal');
    doc.setFontSize(7);
    doc.setTextColor(isTotal ? cMidGreen[0] : cTextDark[0], isTotal ? cMidGreen[1] : cTextDark[1], isTotal ? cMidGreen[2] : cTextDark[2]);

    let cx = margin + 4;
    r.forEach((cell, cIdx) => {
      doc.text(cell, cx, yPos + 10);
      cx += colW[cIdx];
    });
    yPos += 14;
  });

  drawFooter(5);

  doc.save(filename);
};
