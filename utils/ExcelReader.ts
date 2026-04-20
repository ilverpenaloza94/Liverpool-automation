import * as XLSX from 'xlsx';
import * as path from 'path';

export interface LoginData {
  email: string;
  password: string;
}

export class ExcelReader {
  static readLoginData(filePath: string): LoginData {
    // Resolver ruta relativa a la ubicación del proyecto
    const resolvedPath = path.resolve(__dirname, '../', filePath);
    const workbook = XLSX.readFile(resolvedPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      throw new Error('No data found in the Excel file');
    }

    const firstRow = jsonData[0] as any;
    return {
      email: firstRow.email || firstRow.Email,
      password: firstRow.password || firstRow.Password,
    };
  }
}