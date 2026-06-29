export default function LegalNotices() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-28">
      <p className="text-label-caps text-primary" aria-hidden="true">
        Légal
      </p>
      <h1 className="text-h2">Mentions légales</h1>

      <article className="mt-10 space-y-10 text-foreground">
        <section>
          <h2 className="text-h4 mb-3">Éditeur du site</h2>
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Vite & Gourmand</strong>
            <br />
            Siège social : 14 rue des Chartrons, 33000 Bordeaux
            <br />
            SIRET : 412 897 653 00024
            <br />
            Responsables de publication : Julie Moreau & José Alvarez
            <br />
            Téléphone : 05 56 00 12 34
            <br />
            Email :{' '}
            <a href="mailto:contact@vite-gourmand.fr" className="text-primary underline">
              contact@vite-gourmand.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Hébergement</h2>
          <p className="leading-relaxed text-muted-foreground">
            Ce site est hébergé par :
            <br />
            <strong className="text-foreground">OVH SAS</strong>
            <br />
            2 rue Kellermann, 59100 Roubaix
            <br />
            <a href="https://www.ovh.com" className="text-primary underline">
              www.ovh.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Propriété intellectuelle</h2>
          <p className="leading-relaxed text-muted-foreground">
            L'ensemble des contenus présents sur ce site (textes, images, photographies, logos)
            sont la propriété exclusive de SAS Vite & Gourmand, sauf mention contraire. Toute
            reproduction, représentation ou diffusion, totale ou partielle, est interdite sans
            autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Données personnelles & RGPD</h2>
          <p className="leading-relaxed text-muted-foreground">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            Informatique et Libertés, vous disposez d'un droit d'accès, de rectification,
            d'effacement et de portabilité de vos données personnelles.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Les données collectées lors de votre inscription (nom, prénom, adresse email, numéro
            de téléphone, adresse postale) sont utilisées exclusivement dans le cadre de la gestion
            de votre compte et de vos commandes. Elles ne sont jamais cédées à des tiers.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Pour exercer vos droits ou pour toute question relative à vos données, contactez-nous à
            l'adresse :{' '}
            <a href="mailto:contact@vite-gourmand.fr" className="text-primary underline">
              contact@vite-gourmand.fr
            </a>
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Vous avez également le droit d'introduire une réclamation auprès de la{' '}
            <strong className="text-foreground">CNIL</strong> (Commission Nationale de
            l'Informatique et des Libertés) — www.cnil.fr.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Cookies</h2>
          <p className="leading-relaxed text-muted-foreground">
            Ce site utilise des cookies techniques nécessaires à son bon fonctionnement
            (authentification, session). Aucun cookie publicitaire ou de suivi tiers n'est déposé
            sans votre consentement.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Limitation de responsabilité</h2>
          <p className="leading-relaxed text-muted-foreground">
            SAS Vite & Gourmand s'efforce de maintenir les informations publiées sur ce site à
            jour. Cependant, nous ne pouvons garantir l'exactitude ou l'exhaustivité de ces
            informations et déclinons toute responsabilité en cas d'erreur ou d'omission.
          </p>
        </section>

        <p className="text-caption text-muted-foreground border-t border-border pt-6">
          Dernière mise à jour : juin 2026
        </p>
      </article>
    </section>
  )
}
