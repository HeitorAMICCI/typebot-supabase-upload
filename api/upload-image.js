
import { createClient } from '@supabase/supabase-js'

export default async (req, res) => {
  try {
    const { fileName, base64 } = req.body;

    const supabase = createClient(
      'https://axajxnpbzncxgpicamgu.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YWp4bnBiem5jeGdwaWNhbWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODg0NjgsImV4cCI6MjA2MTQ2NDQ2OH0.4WGkX3j1c-ovenZc9pYGSfqtoX5G2MjCQoDnj5HHJ1Q' // <-- SUBSTITUIR pela sua chave anon do Supabase
    );

    const buffer = Buffer.from(base64, 'base64');

    const { data, error } = await supabase.storage
      .from('images-amy')
      .upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      return res.status(400).json({ error });
    }

    const publicUrl = `https://axajxnpbzncxgpicamgu.supabase.co/storage/v1/object/public/images-amy/${fileName}`;

    return res.status(200).json({ publicUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
