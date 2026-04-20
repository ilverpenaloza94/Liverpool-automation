import { test } from '@playwright/test';
import { ExcelReader } from '../utils/ExcelReader';

test('Validar lectura de datos del Excel', async () => {
  const loginData = ExcelReader.readLoginData('./data/LoginData.xlsx');
  console.log('Datos leídos del Excel:', loginData);
  // Verificar que los datos no estén vacíos
  test.expect(loginData.email).toBeTruthy();
  test.expect(loginData.password).toBeTruthy();
});