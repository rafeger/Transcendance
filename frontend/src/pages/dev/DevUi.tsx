import { useState, type ReactNode } from 'react';
import { ArrowRight, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, buttonStyles, Spinner } from '../../components/ui';
import { useTheme } from '../../contexts/ThemeContext';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="border-b border-border pb-2 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-24 text-sm text-muted">{label}</span>
      {children}
    </div>
  );
}

function DevUi() {
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  function fakeSave() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-12 text-fg">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Design system</h1>
          <Button variant="secondary" onClick={toggleTheme}>
            Mode {isDark ? 'clair' : 'sombre'}
          </Button>
        </header>

        <Section title="Spinner">
          <Row label="Tailles">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Row>
          <Row label="Couleur">
            <Spinner className="text-primary" />
            <Spinner className="text-muted" />
            <Spinner className="text-danger" />
          </Row>
          <Row label="Avec texte">
            <Spinner
              showLabel
              label="Chargement des amis…"
              className="text-muted"
            />
          </Row>
          <Row label="Dans Button">
            <Button loading>Envoi…</Button>
          </Row>
        </Section>

        <Section title="Button">
          <Row label="Variantes">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Row>
          <Row label="Tailles">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="États">
            <Button disabled>Disabled</Button>
            <Button loading={loading} onClick={fakeSave}>
              {loading ? 'Enregistrement…' : 'Cliquer (loading)'}
            </Button>
          </Row>
          <Row label="Icônes">
            <Button>
              Jouer <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="danger">
              <Trash2 className="size-4" aria-hidden="true" /> Supprimer
            </Button>
            <Button variant="ghost" size="sm" aria-label="Fermer">
              <X className="size-4" aria-hidden="true" />
            </Button>
          </Row>
          <Row label="Lien">
            <Link to="/" className={buttonStyles({ size: 'lg' })}>
              Lien stylé en bouton
            </Link>
          </Row>
        </Section>
      </div>
    </main>
  );
}

export default DevUi;
