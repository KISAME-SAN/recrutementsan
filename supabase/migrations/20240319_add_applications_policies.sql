-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent créer des candidatures" ON applications;
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir leurs propres candidatures" ON applications;
DROP POLICY IF EXISTS "Les admins peuvent tout faire avec les candidatures" ON applications;

-- Création de la table applications si elle n'existe pas
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id),
  user_id UUID REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT NOT NULL,
  age INTEGER NOT NULL,
  professional_experience TEXT NOT NULL,
  skills TEXT NOT NULL,
  diploma TEXT NOT NULL,
  years_of_experience INTEGER NOT NULL,
  previous_company TEXT,
  cv_url TEXT NOT NULL,
  cover_letter_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Activer RLS sur la table applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs authentifiés de créer des candidatures
CREATE POLICY "Les utilisateurs authentifiés peuvent créer des candidatures"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique pour permettre aux utilisateurs de voir leurs propres candidatures
CREATE POLICY "Les utilisateurs peuvent voir leurs propres candidatures"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Politique pour permettre aux admins de tout faire
CREATE POLICY "Les admins peuvent tout faire avec les candidatures"
  ON applications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );