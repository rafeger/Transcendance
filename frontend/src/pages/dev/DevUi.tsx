import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  buttonStyles,
  Card,
  Input,
  Modal,
  ProgressBar,
  Select,
  Spinner,
  useToast,
} from '../../components/ui';
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
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState<string>();
  const [question, setQuestion] = useState(3);
  const [isModalOpen, setModalOpen] = useState(false);

  function fakeSave() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError(email.includes('@') ? undefined : 'Adresse email invalide');
    setCategoryError(category ? undefined : 'Choisis une catégorie');
    if (email.includes('@') && category) {
      showToast({ variant: 'success', message: 'Formulaire valide !' });
    }
  }

  function confirmDelete() {
    setModalOpen(false);
    showToast({
      variant: 'error',
      title: 'Ami supprimé',
      message: 'raph42 a été retiré de ta liste.',
    });
  }

  return (
    // <div> et pas <main> : le Layout fournit déjà le <main> de la page.
    <div className="min-h-screen bg-bg px-6 py-12 text-fg">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Design system</h1>
          <Button variant="secondary" onClick={toggleTheme}>
            Mode {isDark ? 'clair' : 'sombre'}
          </Button>
        </header>

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

        <Section title="Spinner">
          <Row label="Tailles">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Row>
          <Row label="Couleur">
            <Spinner className="text-primary" />
            <Spinner className="text-muted" />
            <Spinner className="text-error" />
          </Row>
          <Row label="Avec texte">
            <Spinner
              showLabel
              label="Chargement des amis…"
              className="text-muted"
            />
          </Row>
        </Section>

        <Section title="Input et Select">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Pseudo" placeholder="ex. raph42" />
            <Input
              label="Mot de passe"
              type="password"
              hint="8 caractères minimum"
              required
            />
            <Input
              label="Email"
              defaultValue="raph@"
              error="Adresse email invalide"
            />
            <Input label="Désactivé" defaultValue="lecture seule" disabled />
            <Select label="Difficulté" defaultValue="medium">
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </Select>
            <Select
              label="Langue"
              hint="Langue des questions"
              defaultValue=""
              placeholder="Choisir…"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </Select>
          </div>

          <h3 className="pt-4 font-semibold">Démo : validation à l'envoi</h3>
          <Card as="section" className="max-w-md">
            <form
              noValidate
              onSubmit={handleDemoSubmit}
              className="flex flex-col gap-4"
            >
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={emailError}
              />
              <Select
                label="Catégorie"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Choisir une catégorie"
                error={categoryError}
              >
                <option value="science">Science</option>
                <option value="history">Histoire</option>
                <option value="geography">Géographie</option>
              </Select>
              <Button type="submit" className="self-start">
                Valider
              </Button>
            </form>
          </Card>
        </Section>

        <Section title="Card">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h3 className="font-bold">Par défaut</h3>
              <p className="mt-1 text-sm text-muted">padding md, balise div</p>
            </Card>
            <Card as="article" interactive>
              <h3 className="font-bold">Interactive</h3>
              <p className="mt-1 text-sm text-muted">Survole-moi</p>
            </Card>
            <Card padding="sm">
              <h3 className="font-bold">Padding sm</h3>
              <p className="mt-1 text-sm text-muted">plus compacte</p>
            </Card>
          </div>
        </Section>

        <Section title="Badge">
          <Row label="Variantes">
            <Badge>Neutral</Badge>
            <Badge variant="primary">Science</Badge>
            <Badge variant="success">Facile</Badge>
            <Badge variant="warning">Moyen</Badge>
            <Badge variant="danger">Difficile</Badge>
          </Row>
          <Row label="Sans pastille">
            <Badge dot={false}>Nouveau</Badge>
            <Badge variant="primary" dot={false}>
              12 questions
            </Badge>
          </Row>
        </Section>

        <Section title="Avatar">
          <Row label="Tailles">
            <Avatar name="Raphaël Feger" size="sm" />
            <Avatar name="Raphaël Feger" size="md" />
            <Avatar name="Raphaël Feger" size="lg" />
          </Row>
          <Row label="Statut">
            <Avatar name="raph42" status="online" />
            <Avatar name="lzannis" status="offline" />
            <Avatar
              name="Image cassée"
              src="/introuvable.png"
              status="online"
              size="lg"
            />
          </Row>
        </Section>

        <Section title="ProgressBar">
          <div className="max-w-md space-y-6">
            <ProgressBar
              label="Progression du quiz"
              showLabel
              value={question}
              max={10}
              valueText={`Question ${question} sur 10`}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setQuestion((q) => Math.max(q - 1, 0))}
              >
                −1
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setQuestion((q) => Math.min(q + 1, 10))}
              >
                +1
              </Button>
            </div>
            <ProgressBar label="Temps restant" value={25} variant="danger" />
            <ProgressBar
              label="Victoires"
              showLabel
              value={70}
              variant="success"
            />
          </div>
        </Section>

        <Section title="Modal">
          <Button variant="danger" onClick={() => setModalOpen(true)}>
            <Trash2 className="size-4" aria-hidden="true" /> Supprimer un ami
          </Button>
          <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Supprimer raph42 ?"
            description="Il ne pourra plus te défier. Cette action est irréversible."
            footer={
              <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Annuler
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Supprimer
                </Button>
              </>
            }
          />
        </Section>

        <Section title="Toast">
          <Row label="Variantes">
            <Button
              variant="secondary"
              onClick={() =>
                showToast({ message: 'Nouvelle partie disponible.' })
              }
            >
              Info
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  variant: 'success',
                  title: 'Profil enregistré',
                  message: 'Tes modifications sont en ligne.',
                })
              }
            >
              Success
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  variant: 'warning',
                  message: 'Plus que 10 secondes !',
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  variant: 'error',
                  title: 'Connexion perdue',
                  message: 'Reconnexion en cours…',
                })
              }
            >
              Error
            </Button>
          </Row>
        </Section>
      </div>
    </div>
  );
}

export default DevUi;
