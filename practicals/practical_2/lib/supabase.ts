import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bstwzcypbyyzwvtprzcb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdHd6Y3lwYnl5end2dHByemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzIwOTYsImV4cCI6MjA1OTc0ODA5Nn0.UDvxmftTkld-yp4ZEsRRxbVlYcTbtuqcEsvc64XxVXQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})