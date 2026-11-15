import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db } from '../database/db';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Configure multer for enquiry attachments
const attachmentStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(process.cwd(), 'uploads', 'attachments');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `doc-${base}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: attachmentStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.dwg', '.dxf', '.jpg', '.jpeg', '.png', '.webp', '.zip', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload PDF, CAD drawings, images, Word docs, or ZIP.'));
    }
  }
});

// PUBLIC: POST /api/enquiries
router.post('/', upload.single('attachment'), (req, res) => {
  try {
    const {
      full_name,
      company_name,
      email,
      phone,
      service_required,
      project_type,
      project_location,
      estimated_budget,
      preferred_contact_method,
      project_description,
      privacy_consent,
      honeypot // Anti-bot trap
    } = req.body;

    // Reject bot submissions silently or with message if honeypot is filled
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Enquiry received.' });
    }

    if (!full_name || !email || !phone || !service_required || !project_location || !project_description) {
      return res.status(400).json({
        error: 'Please fill in all required fields (Name, Email, Phone, Service, Location, Project Description).'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const attachmentPath = req.file ? `/uploads/attachments/${req.file.filename}` : null;

    const stmt = db.prepare(`
      INSERT INTO enquiries (
        full_name, company_name, email, phone, service_required, project_type,
        project_location, estimated_budget, preferred_contact_method, project_description,
        attachment_path, privacy_consent, enquiry_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')
    `);

    const info = stmt.run(
      full_name.trim(),
      company_name ? company_name.trim() : null,
      email.trim().toLowerCase(),
      phone.trim(),
      service_required,
      project_type || 'Commercial',
      project_location.trim(),
      estimated_budget || 'To be discussed',
      preferred_contact_method || 'Phone Call',
      project_description.trim(),
      attachmentPath,
      privacy_consent ? 1 : 1
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to SPES Swiftpace Engineering Solutions Limited. Your enquiry has been received and logged. Our engineering consultants will review your brief and contact you promptly.',
      enquiry_id: info.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'An error occurred while submitting your enquiry.' });
  }
});

// ADMIN: GET /api/admin/enquiries
router.get('/admin', authenticateAdmin, (req, res) => {
  const { status, service, search } = req.query;
  let query = 'SELECT * FROM enquiries WHERE 1=1';
  const params: any[] = [];

  if (status && status !== 'all' && status !== 'All') {
    query += ' AND enquiry_status = ?';
    params.push(status);
  }

  if (service && service !== 'all' && service !== 'All') {
    query += ' AND service_required = ?';
    params.push(service);
  }

  if (search) {
    query += ' AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR project_description LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  query += ' ORDER BY created_at DESC';

  const enquiries = db.prepare(query).all(...params);
  return res.json({ enquiries });
});

// ADMIN: GET /api/admin/enquiries/export/csv
router.get('/admin/export/csv', authenticateAdmin, (_req, res) => {
  const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all() as any[];
  const safeCell = (val: unknown) => {
    const str = String(val ?? '');
    const neutralized = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
    return `"${neutralized.replace(/"/g, '""')}"`;
  };

  let csv = 'ID,Full Name,Company,Email,Phone,Service,Project Type,Location,Budget,Preferred Method,Status,Created At\n';
  for (const e of enquiries) {
    const row = [
      e.id,
      safeCell(e.full_name),
      safeCell(e.company_name),
      safeCell(e.email),
      safeCell(e.phone),
      safeCell(e.service_required),
      safeCell(e.project_type),
      safeCell(e.project_location),
      safeCell(e.estimated_budget),
      safeCell(e.preferred_contact_method),
      safeCell(e.enquiry_status),
      safeCell(e.created_at)
    ];
    csv += row.join(',') + '\n';
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="SPES_Swiftpace_Enquiries.csv"');
  return res.send(csv);
});

// ADMIN: GET /api/admin/enquiries/:id
router.get('/admin/:id', authenticateAdmin, (req, res) => {
  const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  return res.json({ enquiry });
});

// ADMIN: PUT /api/admin/enquiries/:id
router.put('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { enquiry_status, internal_notes } = req.body;

  const existing = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id) as any;
  if (!existing) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  db.prepare(`
    UPDATE enquiries SET
      enquiry_status = ?,
      internal_notes = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    enquiry_status || existing.enquiry_status,
    internal_notes !== undefined ? internal_notes : existing.internal_notes,
    id
  );

  return res.json({ success: true, message: 'Enquiry record updated.' });
});

// ADMIN: DELETE /api/admin/enquiries/:id
router.delete('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);
  return res.json({ success: true, message: 'Enquiry deleted successfully.' });
});

export default router;
