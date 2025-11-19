-- Habilitar extensiones necesarias
create extension if not exists "uuid-ossp";

-- Tabla de perfiles de usuario (extiende auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('student', 'instructor', 'admin')) default 'student'
);

-- Tabla de cursos
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  instructor_id uuid references public.profiles(id) on delete cascade not null,
  price decimal(10,2) not null default 0,
  duration text not null,
  total_lessons integer not null default 0,
  image_url text,
  banner_url text,
  gradient text,
  category text,
  level text check (level in ('Principiante', 'Intermedio', 'Avanzado')) default 'Principiante',
  is_published boolean default false
);

-- Tabla de lecciones
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  duration text not null,
  "order" integer not null,
  is_free boolean default false
);

-- Tabla de inscripciones (enrollments)
create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  progress decimal(5,2) default 0,
  completed_lessons integer default 0,
  last_accessed timestamp with time zone,
  unique(user_id, course_id)
);

-- Índices para mejorar el rendimiento
create index courses_instructor_id_idx on public.courses(instructor_id);
create index courses_is_published_idx on public.courses(is_published);
create index lessons_course_id_idx on public.lessons(course_id);
create index enrollments_user_id_idx on public.enrollments(user_id);
create index enrollments_course_id_idx on public.enrollments(course_id);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;

-- Políticas de seguridad para profiles
create policy "Los perfiles son visibles públicamente"
  on public.profiles for select
  using (true);

create policy "Los usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Políticas de seguridad para courses
create policy "Los cursos publicados son visibles públicamente"
  on public.courses for select
  using (is_published = true or instructor_id = auth.uid());

create policy "Los instructores pueden crear cursos"
  on public.courses for insert
  with check (auth.uid() = instructor_id);

create policy "Los instructores pueden actualizar sus propios cursos"
  on public.courses for update
  using (auth.uid() = instructor_id);

create policy "Los instructores pueden eliminar sus propios cursos"
  on public.courses for delete
  using (auth.uid() = instructor_id);

-- Políticas de seguridad para lessons
create policy "Las lecciones son visibles si el curso es visible"
  on public.lessons for select
  using (
    exists (
      select 1 from public.courses
      where courses.id = lessons.course_id
      and (courses.is_published = true or courses.instructor_id = auth.uid())
    )
  );

create policy "Los instructores pueden gestionar lecciones de sus cursos"
  on public.lessons for all
  using (
    exists (
      select 1 from public.courses
      where courses.id = lessons.course_id
      and courses.instructor_id = auth.uid()
    )
  );

-- Políticas de seguridad para enrollments
create policy "Los usuarios pueden ver sus propias inscripciones"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Los usuarios pueden inscribirse en cursos"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios pueden actualizar sus propias inscripciones"
  on public.enrollments for update
  using (auth.uid() = user_id);

-- Función para crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para crear perfil automáticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
