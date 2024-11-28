import { google } from 'googleapis';
import { Costume } from '@/types/costume';

function convertGoogleDriveUrl(url: string): string {
  try {
    const fileId = url.match(/\/d\/(.*?)\/view/)?.[1] || 
                  url.match(/id=(.*?)(&|$)/)?.[1] ||
                  url.match(/\/file\/d\/(.*?)(\?|$)/)?.[1];
    
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url || '';
  } catch {
    return url || '';
  }
}

async function getSpreadsheetInfo() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  const response = await sheets.spreadsheets.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
  });

  return response.data;
}

export async function getCostumes(): Promise<Costume[]> {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  // スプレッドシートの情報を取得
  const info = await getSpreadsheetInfo();
  const sheetName = info.sheets?.[0]?.properties?.title || 'Sheet1';
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${sheetName}!A2:H`,
  });

  const rows = response.data.values;
  
  if (!rows) return [];

  return rows.map((row) => ({
    id: row[0] || '',
    name: row[1] || '',
    category: row[2] || '',
    size: row[3] || '',
    color: row[4] || '',
    imageUrl: convertGoogleDriveUrl(row[5] || ''),
    description: row[6] || '',
    available: row[7] === 'TRUE',
  }));
} 