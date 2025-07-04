export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_menu_items: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: string
          project_id: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: string
          project_id?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: string
          project_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_menu_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      admin_testimonials: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          project_id: string | null
          rating: number | null
          text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          project_id?: string | null
          rating?: number | null
          text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          project_id?: string | null
          rating?: number | null
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      content_sections: {
        Row: {
          button_link: string | null
          button_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          project_id: string | null
          section_name: string
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          project_id?: string | null
          section_name: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          project_id?: string | null
          section_name?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      galleries: {
        Row: {
          category: string | null
          cloudinary_folder_name: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          project_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          cloudinary_folder_name?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          project_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          cloudinary_folder_name?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          project_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "galleries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      gallery_images: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number | null
          gallery_id: string | null
          id: string
          image_url: string
          is_active: boolean | null
          is_favorite: boolean | null
          is_featured_on_homepage: boolean | null
          media_type: string | null
          project_id: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          gallery_id?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          is_favorite?: boolean | null
          is_featured_on_homepage?: boolean | null
          media_type?: string | null
          project_id?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          gallery_id?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          is_favorite?: boolean | null
          is_featured_on_homepage?: boolean | null
          media_type?: string | null
          project_id?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          id: string
          message: string
          photo_id: string
          recipient_id: string
          sender_email: string
          sender_name: string
          subject: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          photo_id: string
          recipient_id: string
          sender_email: string
          sender_name: string
          subject: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          photo_id?: string
          recipient_id?: string
          sender_email?: string
          sender_name?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          photographer_id: string
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          photographer_id: string
          price?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          photographer_id?: string
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          project_id: string
          project_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          project_id: string
          project_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          project_id?: string
          project_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          display_order: number | null
          duration: string | null
          features: Json | null
          icon_name: string
          id: string
          image_url: string | null
          is_active: boolean | null
          price: string | null
          project_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number | null
          duration?: string | null
          features?: Json | null
          icon_name?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          price?: string | null
          project_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number | null
          duration?: string | null
          features?: Json | null
          icon_name?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          price?: string | null
          project_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      site_backups: {
        Row: {
          backup_name: string
          created_at: string
          created_by: string | null
          file_path: string
          file_size: number | null
          id: string
          project_id: string | null
        }
        Insert: {
          backup_name: string
          created_at?: string
          created_by?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          project_id?: string | null
        }
        Update: {
          backup_name?: string
          created_at?: string
          created_by?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          project_id?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          project_id: string | null
          section_name: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          project_id?: string | null
          section_name: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          project_id?: string | null
          section_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_content_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      site_content_batel: {
        Row: {
          content: Json
          created_at: string
          id: string
          project_id: string | null
          section_name: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          project_id?: string | null
          section_name: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          project_id?: string | null
          section_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_content_batel_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      site_content_inbal: {
        Row: {
          content: Json
          created_at: string
          id: string
          project_id: string | null
          section_name: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          project_id?: string | null
          section_name: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          project_id?: string | null
          section_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_content_duplicate_inbal_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      social_links: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          platform: string
          project_id: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform: string
          project_id?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          project_id?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      social_links_inbal: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          platform: string
          project_id: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform: string
          project_id?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          project_id?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_duplicate_inbal_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      theme_settings: {
        Row: {
          background_color: string
          button_color: string
          created_at: string
          id: string
          project_id: string | null
          text_color: string
          updated_at: string
        }
        Insert: {
          background_color?: string
          button_color?: string
          created_at?: string
          id?: string
          project_id?: string | null
          text_color?: string
          updated_at?: string
        }
        Update: {
          background_color?: string
          button_color?: string
          created_at?: string
          id?: string
          project_id?: string | null
          text_color?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_settings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      theme_settings_batel: {
        Row: {
          background_color: string
          button_color: string
          created_at: string
          id: string
          project_id: string | null
          text_color: string
          updated_at: string
        }
        Insert: {
          background_color?: string
          button_color?: string
          created_at?: string
          id?: string
          project_id?: string | null
          text_color?: string
          updated_at?: string
        }
        Update: {
          background_color?: string
          button_color?: string
          created_at?: string
          id?: string
          project_id?: string | null
          text_color?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_settings_batel_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      theme_settings_Inbal: {
        Row: {
          background_color: string
          button_color: string
          created_at: string
          id: string
          project_id: string | null
          text_color: string
          updated_at: string
        }
        Insert: {
          background_color?: string
          button_color?: string
          created_at?: string
          id?: string
          project_id?: string | null
          text_color?: string
          updated_at?: string
        }
        Update: {
          background_color?: string
          button_color?: string
          created_at?: string
          id?: string
          project_id?: string | null
          text_color?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_settings_Inbal_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
