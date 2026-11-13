import type { ReactNode } from "react";

// À compléter avant la mise en ligne
const SITE_NAME = "QuizArena";
const CONTACT_EMAIL = "contact@exemple.fr";
const LAST_UPDATED = "JJ/MM/AAAA";
// Passer à true si l'équipe traduit ou modifie les questions OpenTDB
const QUESTIONS_MODIFIED = false;

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

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
			{children}
		</a>
	);
}

function CGU() {
	return (
		<main className="min-h-screen bg-slate-950 text-white px-4 py-16">
			<article className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold">Conditions générales d’utilisation</h1>
				<p className="mt-2 text-sm text-slate-400">Dernière mise à jour : {LAST_UPDATED}</p>

				<Section title="1. Objet">
					<p>
						Les présentes conditions encadrent l’utilisation de {SITE_NAME}, un site de quiz
						multijoueur réalisé dans le cadre d’un projet pédagogique à l’école 42 Paris. Le service
						est gratuit et sans but commercial. En créant un compte, vous acceptez ces conditions.
					</p>
				</Section>

				<Section title="2. Compte">
					<ul className="list-disc pl-6 space-y-2">
						<li>La création d’un compte est réservée aux personnes âgées d’au moins 15 ans.</li>
						<li>
							Vous vous engagez à fournir une adresse email valide et à ne pas usurper l’identité
							d’autrui.
						</li>
						<li>Un seul compte par personne est autorisé.</li>
						<li>
							Vous êtes responsable de la confidentialité de votre mot de passe et des actions
							effectuées depuis votre compte.
						</li>
						<li>Vous pouvez supprimer votre compte à tout moment depuis la page de profil.</li>
					</ul>
				</Section>

				<Section title="3. Règles de conduite">
					<p>En utilisant le site, vous vous engagez à ne pas :</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							choisir un pseudo ou un avatar injurieux, haineux, à caractère sexuel ou portant
							atteinte aux droits d’un tiers ;
						</li>
						<li>harceler, insulter ou menacer d’autres joueurs ;</li>
						<li>
							tricher : utiliser des scripts, bots, outils d’automatisation ou plusieurs comptes pour
							fausser les parties ou le classement ;
						</li>
						<li>
							exploiter volontairement un bug ou une faille de sécurité, ou tenter d’accéder à des
							données ou comptes qui ne sont pas les vôtres ;
						</li>
						<li>
							perturber le fonctionnement du site (surcharge volontaire, attaque, contournement des
							protections).
						</li>
					</ul>
					<p>
						Si vous découvrez une faille de sécurité, merci de nous la signaler à <Mail /> sans
						l’exploiter ni la divulguer publiquement.
					</p>
				</Section>

				<Section title="4. Sanctions">
					<p>En cas de non-respect de ces règles, l’équipe peut, selon la gravité des faits :</p>
					<ol className="list-decimal pl-6 space-y-2">
						<li>adresser un avertissement ;</li>
						<li>modifier ou supprimer un pseudo ou un avatar non conforme ;</li>
						<li>annuler des résultats de parties obtenus de manière frauduleuse ;</li>
						<li>suspendre temporairement le compte ;</li>
						<li>supprimer définitivement le compte.</li>
					</ol>
					<p>
						Vous pouvez contester une sanction en écrivant à <Mail />.
					</p>
				</Section>

				<Section title="5. Propriété intellectuelle">
					<p>
						Le code, le design, les logos et les textes du site appartiennent à leurs auteurs,
						membres de l’équipe du projet. Toute reproduction sans autorisation est interdite, sauf
						mention contraire.
					</p>
					<p>
						En envoyant un avatar, vous garantissez en détenir les droits et vous nous autorisez à
						l’afficher sur le site, pour la seule durée d’existence de votre compte.
					</p>
				</Section>

				<Section title="6. Crédit des questions">
					<p>
						Les questions du quiz proviennent de l’
						<ExternalLink href="https://opentdb.com">Open Trivia Database</ExternalLink> et sont
						mises à disposition sous licence{" "}
						<ExternalLink href="https://creativecommons.org/licenses/by-sa/4.0/">
							Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
						</ExternalLink>
						.
					</p>
					{QUESTIONS_MODIFIED && (
						<p>
							Les questions ont été traduites et adaptées par l’équipe ; ces versions modifiées
							sont diffusées sous la même licence CC BY-SA 4.0.
						</p>
					)}
				</Section>

				<Section title="7. Limitation de responsabilité">
					<p>
						Le site est un projet étudiant fourni « en l’état », sans garantie de disponibilité ni
						de continuité. Le service peut être interrompu, modifié ou arrêté à tout moment,
						notamment à la fin du projet. L’équipe ne garantit pas l’exactitude des questions issues
						de l’Open Trivia Database et ne peut être tenue responsable d’une perte de données de
						jeu (scores, statistiques, classement).
					</p>
				</Section>

				<Section title="8. Modification des conditions">
					<p>
						Ces conditions peuvent être mises à jour. La date de dernière mise à jour figure en haut
						de cette page ; en cas de changement important, les utilisateurs connectés en seront
						informés.
					</p>
				</Section>

				<Section title="9. Droit applicable et contact">
					<p>
						Les présentes conditions sont soumises au droit français. Pour toute question : <Mail />.
						Le traitement de vos données personnelles est décrit dans la{" "}
						<a href="/privacy" className="text-sky-400 hover:underline">
							Politique de confidentialité
						</a>
						.
					</p>
				</Section>
			</article>
		</main>
	);
}

export default CGU;
