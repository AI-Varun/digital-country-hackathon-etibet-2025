const tesseract = require('tesseract.js');
const { mrz } = require('mrz');

class PassportScanner {
  static async scanPassport(imageBuffer) {
    try {
      // OCR the image
      const { data: { text } } = await tesseract.recognize(
        imageBuffer,
        'eng',
        { logger: m => console.log(m) }
      );

      // Extract MRZ
      const mrzLines = text.split('\n')
        .filter(line => line.match(/^[A-Z0-9<]{44}$/))
        .slice(-2);

      if (mrzLines.length !== 2) {
        throw new Error('Invalid MRZ format');
      }

      // Parse MRZ data
      const parsed = mrz(mrzLines.join('\n'));

      return {
        documentCode: parsed.documentCode,
        issuingState: parsed.issuingState,
        lastName: parsed.lastName,
        firstName: parsed.firstName,
        documentNumber: parsed.documentNumber,
        nationality: parsed.nationality,
        dateOfBirth: parsed.birthDate,
        gender: parsed.sex,
        expiryDate: parsed.expiryDate
      };
    } catch (error) {
      console.error('Passport scanning error:', error);
      throw new Error('Failed to scan passport');
    }
  }
}

module.exports = PassportScanner;