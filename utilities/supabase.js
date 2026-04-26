import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFile(file, bucket = 'mokm') {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials missing, skipping file upload.');
    return null;
  }
  
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const path = `uploads/${fileName}`;

    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: file.type,
    });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error('Failed to upload file to Supabase');
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Error in uploadFile:', err);
    return null;
  }
}
