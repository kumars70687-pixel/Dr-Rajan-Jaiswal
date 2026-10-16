import { createClient } from '@supabase/supabase-js';
import { AppointmentFormData } from '../types';

export const SUPABASE_PROJECT_ID = 'cayznhwdupgcxijclgve';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_DXICplRLbX4InsM81nAGIw_QPoj6PDH';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppointmentRecord {
  id: string;
  created_at: string;
  patient_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  reason: string | null;
  contact_method: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export const SUPABASE_APPOINTMENTS_SCHEMA_SQL = `-- Run this in your Supabase SQL Editor:
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  patient_name text not null,
  phone text not null,
  preferred_date text not null,
  preferred_time text not null,
  reason text,
  contact_method text default 'whatsapp',
  status text default 'pending'
);

-- Enable Row Level Security (RLS)
alter table appointments enable row level security;

-- Policy 1: Allow public visitors to submit appointment requests
create policy "Allow public appointment submissions"
  on appointments for insert
  with check (true);

-- Policy 2: Allow reading appointment requests
create policy "Allow reading appointment records"
  on appointments for select
  using (true);

-- Policy 3: Allow clinic staff to update appointment status
create policy "Allow updating appointment status"
  on appointments for update
  using (true);
`;

export async function saveAppointmentToSupabase(formData: AppointmentFormData): Promise<{
  success: boolean;
  record?: AppointmentRecord;
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const payload = {
      patient_name: formData.patientName.trim(),
      phone: formData.phone.trim(),
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      reason: formData.reason.trim() || null,
      contact_method: formData.contactMethod,
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      const isMissing =
        error.message?.includes('relation "appointments" does not exist') ||
        error.code === '42P01';
      return {
        success: false,
        error: error.message || 'Database insert failed',
        isTableMissing: isMissing,
      };
    }

    return {
      success: true,
      record: data as AppointmentRecord,
    };
  } catch (err: unknown) {
    console.error('Unexpected Supabase error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown database error',
    };
  }
}

export async function fetchAppointmentsFromSupabase(): Promise<{
  success: boolean;
  data?: AppointmentRecord[];
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      const isMissing =
        error.message?.includes('relation "appointments" does not exist') ||
        error.code === '42P01';
      return {
        success: false,
        error: error.message,
        isTableMissing: isMissing,
      };
    }

    return {
      success: true,
      data: (data as AppointmentRecord[]) || [],
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

export async function updateAppointmentStatusInSupabase(
  id: string,
  status: AppointmentRecord['status']
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to update status:', err);
    return false;
  }
}
