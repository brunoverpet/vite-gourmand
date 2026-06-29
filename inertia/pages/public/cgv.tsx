export default function Cgv() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-28">
      <p className="text-label-caps text-primary" aria-hidden="true">
        Légal
      </p>
      <h1 className="text-h2">Conditions générales de vente</h1>

      <article className="mt-10 space-y-10 text-foreground">
        <section>
          <h2 className="text-h4 mb-3">Article 1 — Objet</h2>
          <p className="leading-relaxed text-muted-foreground">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations
            contractuelles entre Vite & Gourmand, traiteur événementiel basé à Bordeaux, et
            tout client passant commande via le site internet ou par tout autre moyen. Toute
            commande implique l'acceptation sans réserve des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 2 — Commandes</h2>
          <p className="leading-relaxed text-muted-foreground">
            Les commandes doivent être passées au minimum <strong className="text-foreground">7
            jours calendaires</strong> avant la date de prestation souhaitée. Toute commande
            passée dans un délai inférieur à 7 jours sera soumise à validation préalable de notre équipe.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            La commande est considérée comme définitive à réception de la confirmation écrite de
            Vite & Gourmand. Nous nous réservons le droit de refuser toute commande en cas de
            stock insuffisant ou de délai incompatible.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 3 — Tarifs et livraison</h2>
          <p className="leading-relaxed text-muted-foreground">
            Les prix affichés sont en euros TTC. Ils correspondent au prix par personne pour le
            nombre minimum de personnes indiqué sur chaque menu.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            La livraison dans la ville de Bordeaux est incluse dans le prix. Pour toute prestation
            hors de Bordeaux, des frais de déplacement s'appliquent :{' '}
            <strong className="text-foreground">5,00 € forfaitaires</strong>, majorés de{' '}
            <strong className="text-foreground">0,59 € par kilomètre supplémentaire</strong>{' '}
            parcouru depuis Bordeaux.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 4 — Paiement</h2>
          <p className="leading-relaxed text-muted-foreground">
            Le paiement intégral est exigé à la confirmation de la commande. Les modes de
            paiement acceptés sont précisés lors de la finalisation de la commande. Tout retard de
            paiement entraîne l'annulation automatique de la réservation.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 5 — Annulation et modification</h2>
          <p className="leading-relaxed text-muted-foreground">
            L'annulation d'une commande est possible tant qu'elle n'a pas été passée au statut{' '}
            <strong className="text-foreground">« acceptée »</strong> par notre équipe. Vous
            pouvez annuler directement depuis votre espace client.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            La modification est également possible avant acceptation, à l'exception du menu
            choisi qui ne peut pas être modifié après la commande.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Une fois la commande acceptée, toute annulation ou modification nécessite de
            contacter notre équipe directement (par téléphone ou email).
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 6 — Allergènes et régimes alimentaires</h2>
          <p className="leading-relaxed text-muted-foreground">
            La liste des allergènes présents dans chaque plat est disponible sur la fiche détaillée
            de chaque menu. Il appartient au client de vérifier la compatibilité des menus avec les
            besoins alimentaires de ses convives et d'en informer Vite & Gourmand au moment de
            la commande. Nous déclinons toute responsabilité en cas d'omission de cette
            information.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 7 — Responsabilité</h2>
          <p className="leading-relaxed text-muted-foreground">
            Vite & Gourmand s'engage à mettre en œuvre tous les moyens nécessaires pour assurer
            la qualité de la prestation. Notre responsabilité ne saurait être engagée en cas de
            force majeure, d'événement extérieur imprévisible ou d'information erronée communiquée
            par le client.
          </p>
        </section>

        <section>
          <h2 className="text-h4 mb-3">Article 8 — Litiges</h2>
          <p className="leading-relaxed text-muted-foreground">
            En cas de litige, une solution amiable sera recherchée en priorité. À défaut d'accord,
            le différend sera soumis aux tribunaux compétents du ressort de Bordeaux, conformément
            au droit français.
          </p>
        </section>

        <p className="text-caption text-muted-foreground border-t border-border pt-6">
          Dernière mise à jour : juin 2026
        </p>
      </article>
    </section>
  )
}
