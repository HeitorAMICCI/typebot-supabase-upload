
import { createClient } from '@supabase/supabase-js'

export default async (req, res) => {
  try {
    const { fileName, base64 } = req.body;

    const supabase = createClient(
      'https://axajxnpbzncxgpicamgu.supabase.co',
      'SUA_ANON_PUBLIC_KEY_AQUI' // <-- SUBSTITUIR pela sua chave anon do Supabase
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
