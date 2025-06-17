const { body, validationResult } = require('express-validator');

exports.validateDataInput = [
  body('date').notEmpty().withMessage('Tanggal wajib diisi'),
  body('jenisBiaya').notEmpty().withMessage('Jenis biaya wajib diisi'),
  body('keterangan').notEmpty().withMessage('Keterangan wajib diisi'),
  body('jumlah').isNumeric().withMessage('Jumlah harus berupa angka'),
  body('klaimOleh').notEmpty().withMessage('Nama pengklaim wajib diisi'),
  body('fileName').optional().isString(),
  body('fileBase64').optional().isString(),
  body('mimeType').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ status: 'error', errors: errors.array() });
    next();
  }
];
