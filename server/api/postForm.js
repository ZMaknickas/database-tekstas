import { connection } from '../db.js';

export async function postForm(req, res) {
  const { text } = req.body;

  // Validate required fields
  if (!text || text.trim() === "") {
    return res.status(400).json({
      status: 'error',
      message: 'Text required',
    });
  }

  try {
    const [result] = await connection.execute(
      `
        INSERT INTO tekstas (text)
        VALUES (?)
      `,
      [
        text.trim(),
      ]
    );

    return res.status(201).json({
      status: 'success',
      message: 'Search saved successfully',
      data: {
        id: result.insertId,
        text,
      },
    });
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }