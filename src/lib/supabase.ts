import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'admin' | 'seller' | 'buyer'
          status: 'active' | 'pending' | 'suspended'
          created_at: string
          updated_at: string
          address: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'admin' | 'seller' | 'buyer'
          status?: 'active' | 'pending' | 'suspended'
          address?: string | null
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          phone?: string | null
          status?: 'active' | 'pending' | 'suspended'
          address?: string | null
          avatar_url?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          name: string
          description?: string | null
        }
        Update: {
          name?: string
          description?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          stock: number
          category_id: string
          seller_id: string
          image_url: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description: string
          price: number
          stock: number
          category_id: string
          seller_id: string
          image_url?: string | null
          status?: 'active' | 'inactive'
        }
        Update: {
          name?: string
          description?: string
          price?: number
          stock?: number
          category_id?: string
          image_url?: string | null
          status?: 'active' | 'inactive'
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          total_amount: number
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: string
          payment_proof_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          buyer_id: string
          total_amount: number
          shipping_address: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_proof_url?: string | null
        }
        Update: {
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_proof_url?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          quantity?: number
          price?: number
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          user_id: string
          product_id: string
          quantity: number
        }
        Update: {
          quantity?: number
        }
      }
    }
  }
}