import type { ReactNode } from "react";

// À compléter avant la mise en ligne
const SITE_NAME = "QuizArena";
const CONTACT_EMAIL = "contact@exemple.fr";
const LAST_UPDATED = "JJ/MM/AAAA";
const COOKIE_DURATION = "7 jours";

const collectedData = [
    { data: "Adresse email", origin: "Saisie à l’inscription", isPublic: false },
    { data: "Mot de passe", origin: "Saisi à l’inscription, stocké uniquement sous forme hachée", isPublic: false },
    { data: "Pseudo", origin: "Saisi à l’inscription", isPublic: true },
    { data: "Avatar", origin: "Image envoyée par vous (facultatif)", isPublic: true },
    { data: "Historique des parties (date, catégorie, score, adversaires)", origin: "Généré par votre utilisation du jeu", isPublic: true },
    { data: "Statistiques (victoires, défaites, taux de bonnes réponses, classement)", origin: "Calculées à partir des parties", isPublic: true },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
            <div className="space-y-3 text-slate-300 leading-relaxed">{children}</div>
        </section>
    );
}

function Mail() {
    return (
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-400 hover:underline">
            {CONTACT_EMAIL}
        </a>
    );
}

function Privacy() {
    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
            <article className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
                <p className="mt-2 text-sm text-slate-400">Dernière mise à jour : {LAST_UPDATED}</p>

                <p className="mt-6 text-slate-300 leading-relaxed">
                    {SITE_NAME} est un site de quiz développé dans le cadre d’un projet pédagogique à l’école
                    42 Paris. Cette page explique quelles données nous collectons, pourquoi, combien de temps
                    nous les gardons et comment exercer vos droits, conformément au Règlement général sur la
                    protection des données (RGPD).
                </p>

                <Section title="1. Responsable du traitement">
                    <p>
                        Le traitement est assuré par l’équipe étudiante du projet {SITE_NAME}. Pour toute
                        question relative à vos données : <Mail />.
                    </p>
                </Section>

                <Section title="2. Données collectées">
                    <div className="overflow-x-auto rounded-lg border border-slate-800">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-900 text-slate-200">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Donnée</th>
                                    <th className="px-4 py-3 font-semibold">Origine</th>
                                    <th className="px-4 py-3 font-semibold">Visible par les autres joueurs</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {collectedData.map((row) => (
                                    <tr key={row.data}>
                                        <td className="px-4 py-3 text-white">{row.data}</td>
                                        <td className="px-4 py-3">{row.origin}</td>
                                        <td className="px-4 py-3">{row.isPublic ? "Oui" : "Non"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p>
                        Nous ne collectons aucune donnée sensible, aucune donnée de paiement et aucune donnée
                        de géolocalisation.
                    </p>
                </Section>

                <Section title="3. Finalités et base légale">
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong className="text-white">Créer et gérer votre compte, vous authentifier</strong> :
                            exécution du service que vous demandez (art. 6.1.b RGPD).
                        </li>
                        <li>
                            <strong className="text-white">Faire fonctionner le jeu</strong> (parties, classements,
                            profils publics) : exécution du service (art. 6.1.b RGPD).
                        </li>
                        <li>
                            <strong className="text-white">Assurer la sécurité du site</strong> (prévention des abus
                            et de la triche) : intérêt légitime (art. 6.1.f RGPD).
                        </li>
                    </ul>
                    <p>
                        Vos données ne sont jamais vendues, ni utilisées à des fins publicitaires, ni transmises
                        à des tiers.
                    </p>
                </Section>

                <Section title="4. Durée de conservation">
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong className="text-white">Compte et données de profil</strong> : tant que le compte
                            est actif. Un compte sans connexion pendant 3 ans est supprimé.
                        </li>
                        <li>
                            <strong className="text-white">Parties et statistiques</strong> : supprimées en même temps
                            que le compte. Les parties jouées contre d’autres joueurs sont conservées sous forme
                            anonymisée (« joueur supprimé ») pour ne pas fausser leur historique.
                        </li>
                        <li>
                            <strong className="text-white">Après une demande de suppression</strong> : effacement
                            définitif sous 30 jours au plus.
                        </li>
                        <li>
                            <strong className="text-white">Cookie d’authentification</strong> : {COOKIE_DURATION},
                            ou jusqu’à la déconnexion.
                        </li>
                    </ul>
                </Section>

                <Section title="5. Cookies">
                    <p>
                        Le site utilise un seul cookie, indispensable à son fonctionnement : le cookie
                        d’authentification, qui vous maintient connecté.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Il est marqué <strong className="text-white">HttpOnly</strong> : il n’est pas lisible
                            par le code JavaScript de la page, ce qui limite les risques de vol de session.
                        </li>
                        <li>
                            Il ne contient aucune information publicitaire et ne sert pas à vous suivre sur
                            d’autres sites.
                        </li>
                    </ul>
                    <p>
                        Nous n’utilisons <strong className="text-white">aucun traceur</strong> : pas de cookie
                        publicitaire, pas d’outil de mesure d’audience, pas de réseau social intégré. Ce cookie
                        étant strictement nécessaire au service, il ne requiert pas votre consentement préalable
                        (article 82 de la loi Informatique et Libertés) ; c’est pourquoi aucun bandeau cookies
                        n’est affiché.
                    </p>
                </Section>

                <Section title="6. Sécurité">
                    <p>
                        Les mots de passe sont hachés et ne sont jamais stockés en clair. Les échanges avec le
                        site sont chiffrés (HTTPS). L’accès à la base de données est limité aux membres de
                        l’équipe du projet.
                    </p>
                </Section>

                <Section title="7. Vos droits">
                    <p>Conformément au RGPD, vous disposez des droits suivants sur vos données :</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong className="text-white">Droit d’accès</strong> : obtenir une copie des données
                            que nous détenons sur vous.
                        </li>
                        <li>
                            <strong className="text-white">Droit de rectification</strong> : corriger vos données.
                            Le pseudo, l’email et l’avatar sont modifiables directement depuis la page de profil.
                        </li>
                        <li>
                            <strong className="text-white">Droit à l’effacement</strong> : supprimer votre compte
                            et les données associées, depuis la page de profil ou sur simple demande.
                        </li>
                    </ul>
                    <p>
                        Vous disposez également d’un droit d’opposition, de limitation et de portabilité. Pour
                        exercer l’un de ces droits, écrivez à <Mail /> depuis l’adresse liée à votre compte ;
                        nous répondons sous un mois au plus.
                    </p>
                    <p>
                        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
                        réclamation auprès de la{" "}
                        <a
                            href="https://www.cnil.fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:underline"
                        >
                            CNIL
                        </a>
                        .
                    </p>
                </Section>

                <Section title="8. Contact">
                    <p>
                        Pour toute question sur cette politique ou sur vos données : <Mail />. Les règles
                        d’utilisation du site sont décrites dans les{" "}
                        <a href="/terms" className="text-sky-400 hover:underline">
                            Conditions générales d’utilisation
                        </a>
                        .
                    </p>
                </Section>
            </article>
        </main>
    );
}

export default Privacy;
