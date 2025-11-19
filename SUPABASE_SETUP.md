# Guía de Configuración de Supabase

## 📋 Pasos para configurar Supabase

### 1. Crear cuenta y proyecto
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Haz clic en "New Project"
3. Completa los datos:
   - **Name**: plataforma-cursos (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Elige la más cercana a tu ubicación
4. Espera 2-3 minutos mientras se crea el proyecto

### 2. Obtener las credenciales
1. Una vez creado el proyecto, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Una clave larga que empieza con `eyJ...`

### 3. Configurar variables de entorno
1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza los valores con tus credenciales:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui
   ```

### 4. Crear las tablas en la base de datos
1. En Supabase, ve a **SQL Editor**
2. Haz clic en **New Query**
3. Copia y pega todo el contenido del archivo `supabase-schema.sql`
4. Haz clic en **Run** para ejecutar el script
5. Verifica que se crearon las tablas en **Table Editor**

### 5. Configurar autenticación (opcional pero recomendado)
1. Ve a **Authentication** → **Providers**
2. Habilita **Email** (ya está habilitado por defecto)
3. Opcionalmente, habilita proveedores OAuth:
   - Google
   - GitHub
   - etc.

### 6. Insertar datos de prueba (opcional)
Puedes insertar algunos cursos de prueba desde el **Table Editor**:

1. Ve a **Table Editor** → **courses**
2. Haz clic en **Insert row**
3. Completa los campos (o usa el SQL Editor):

```sql
-- Insertar un curso de prueba
INSERT INTO public.courses (
  title,
  description,
  instructor_id,
  price,
  duration,
  total_lessons,
  banner_url,
  gradient,
  category,
  level,
  is_published
) VALUES (
  'Introducción a React',
  'Aprende los fundamentos de React desde cero',
  (SELECT id FROM auth.users LIMIT 1), -- Usa tu user ID
  49.99,
  '8 horas',
  24,
  '/images/react-banner.jpg',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'Desarrollo Web',
  'Principiante',
  true
);
```

### 7. Reiniciar el servidor de desarrollo
```bash
npm run dev
```

## 🎯 Próximos pasos

Una vez configurado Supabase, puedes:

1. **Usar los hooks creados**:
   ```tsx
   import { useAuth } from './hooks/useAuth';
   import { useCourses } from './hooks/useCourses';
   
   function MiComponente() {
     const { user, signIn, signOut } = useAuth();
     const { courses, loading } = useCourses();
     
     // Tu lógica aquí
   }
   ```

2. **Implementar páginas de autenticación**:
   - Login
   - Registro
   - Recuperación de contraseña

3. **Conectar tus componentes existentes** con los datos reales de Supabase

## 📚 Recursos útiles

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de autenticación](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ⚠️ Importante

- **Nunca** subas el archivo `.env.local` a Git (ya está en `.gitignore`)
- Las claves `anon` son seguras para usar en el frontend
- Las políticas RLS protegen tus datos automáticamente
