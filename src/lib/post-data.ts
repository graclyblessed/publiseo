export interface PostData {
  filename: string;
  title: string;
  contentTemplate: string;
  backgroundColor: string;
}

const POST_DATA_MAP: Record<string, Omit<PostData, 'filename'>> = {
  'sample_post_1.png': {
    title: "J'ai mis une pastille de lave-vaisselle dans le siphon de ma douche chaque semaine pendant un mois. Voici ce qui s'est passé",
    contentTemplate: `Si vous cherchez une solution simple et efficace pour garder votre siphon de douche propre et sans mauvaises odeurs, cette astuce va vous surprendre.

## Le problème

Au fil du temps, les siphons de douche s'encrassent avec des résidus de savon, des cheveux et du calcaire. Cela crée des odeurs désagréables et peut même provoquer des bouchons.

## La solution : la pastille de lave-vaisselle

Les pastilles de lave-vaisselle sont formulées pour dissoudre les graisses et les résidus alimentaires. Leur pouvoir nettoyant fonctionne tout aussi bien dans les canalisations de salle de bain !

### Comment procéder

1. Prenez une pastille de lave-vaisselle
2. Déposez-la directement dans le siphon de votre douche
3. Versez de l'eau chaude par-dessus
4. Laissez agir toute la nuit
5. Rincez abondamment le lendemain matin
6. Renouvelez l'opération chaque semaine

## Les résultats après un mois

Après avoir appliqué cette astuce pendant 4 semaines, voici ce que j'ai observé :
- ✅ Plus aucune mauvaise odeur
- ✅ L'eau s'écoule plus rapidement
- ✅ Le siphon est visiblement plus propre
- ✅ Fini les bouchons fréquents

## Pourquoi ça fonctionne

Les enzymes contenues dans les pastilles de lave-vaisselle décomposent les résidus organiques et les dépôts de savon. Le dégraissant puissant élimine le calcaire et les résidus accumulés.

## Conseils supplémentaires

- Utilisez une pastille bio si possible pour protéger l'environnement
- En complément, versez de l'eau bouillante une fois par semaine
- Cette astuce fonctionne aussi pour les lavabos et les éviers

Essayez cette astuce simple et économique, et partagez vos résultats en commentaire !`,
    backgroundColor: '#F5E6D3',
  },
  'sample_post_2.png': {
    title: "J'ai essuyé mes placards en bois ternes avec de la mayonnaise. Les résultats sont incroyables",
    contentTemplate: `Vos placards en bois ont perdu leur éclat d'origine ? Avant d'investir dans des produits coûteux, découvrez cette astuce de grand-mère étonnamment efficace.

## Pourquoi la mayonnaise ?

La mayonnaise contient de l'huile et du vinaigre, deux ingrédients parfaits pour le bois :
- L'huile nourrit le bois en profondeur
- Le vinaigre nettoie en douceur
- Les œufs apportent des protéines qui font briller

### Comment procéder

1. Prenez une petite quantité de mayonnaise (classique, pas allégée)
2. Appliquez une fine couche sur un chiffon doux
3. Frottez vos placards en bois avec des mouvements circulaires
4. Laissez agir 5 à 10 minutes
5. Essuyez avec un chiffon propre et sec

## Les résultats

Après un seul passage :
- ✅ Le bois retrouve sa couleur d'origine
- ✅ Les taches légères disparaissent
- ✅ Une brillance naturelle se rétablit
- ✅ Le bois est nourri et protégé

## Précautions

- Testez d'abord sur une petite zone cachée
- Ne pas utiliser sur le bois verni ou peint
- Utilisez de la mayonnaise classique (pas allégée)
- Un seul passage suffit, n'en mettez pas trop

Cette astuce économique et naturelle redonnera une seconde jeunesse à vos meubles en bois !`,
    backgroundColor: '#EDE0D4',
  },
  'sample_post_3.png': {
    title: "J'ai mis une boule de papier aluminium dans mon micro-ondes tous les jours pendant 2 semaines. Voici ce qui s'est passé",
    contentTemplate: `Le papier aluminium dans un micro-ondes ? Avant de paniquer, lisez bien cet article car il ne s'agit pas de ce que vous imaginez !

## ⚠️ Attention : Ce qu'il NE FAUT PAS faire

Ne mettez JAMAIS de papier aluminium plat ou de grands morceaux dans votre micro-ondes, cela peut créer des étincelles et endommager l'appareil.

## L'astuce : la boule de papier aluminium

La technique consiste à créer une petite boule de papier aluminium et à l'utiliser d'une manière très spécifique.

### Comment procéder correctement

1. Prenez un petit morceau de papier aluminium (environ 10x10 cm)
2. Froissez-le en une boule pas trop serrée
3. Placez-la avec votre plat dans le micro-ondes
4. Laissez le four éteint pendant 30 secondes avec la boule à l'intérieur
5. La boule absorbe les odeurs résiduelles

## Pourquoi ça fonctionne

Le papier aluminium froissé crée une surface qui aide à neutraliser les odeurs coincées dans les parois du micro-ondes. C'est comme un petit absorbeur d'odeurs naturel.

## Les résultats après 2 semaines

- ✅ Plus d'odeurs de cuisine résiduelles
- ✅ Le micro-ondes sent plus frais
- ✅ Les odeurs de poisson et de pop-corn ont disparu
- ✅ Solution 100% naturelle et réutilisable

## Autres utilisations

Vous pouvez aussi :
- Mettre un bol d'eau avec du citron et chauffer 3 minutes
- Utiliser du bicarbonate de soude dans un bol ouvert
- Nettoyer avec du vinaigre blanc chauffé

Quelle est votre astuce préférée pour garder votre micro-ondes propre ?`,
    backgroundColor: '#F0E6D8',
  },
  'post_04_baking_soda_toilet.png': {
    title: "J'ai versé du bicarbonate de soude et du vinaigre dans ma cuvette de WC chaque nuit. Après 14 jours, voici ce qui s'est passé",
    contentTemplate: `Fatigué des produits chimiques agressifs pour nettoyer vos WC ? Découvrez cette méthode naturelle qui donne des résultats spectaculaires.

## Le duo magique : bicarbonate + vinaigre

Le mélange de bicarbonate de soude et de vinaigre blanc crée une réaction effervescente qui déloge les taches les plus tenaces.

### Comment procéder

1. Avant de dormir, versez 1/2 tasse de bicarbonate de soude dans la cuvette
2. Ajoutez 1 tasse de vinaigre blanc
3. Laissez la réaction effervescente se produire naturellement
4. Ne tirez pas la chasse ! Laissez agir toute la nuit
5. Le matin, frottez légèrement avec la brosse
6. Tirez la chasse

## Les résultats après 14 jours

- ✅ Le fond de la cuvette est devenu blanc
- ✅ Plus aucune trace de calcaire
- ✅ Les odeurs ont complètement disparu
- ✅ Le jet d'eau est plus puissant (dépôts éliminés)
- ✅ Économie de 15€/mois sur les produits chimiques

## Pourquoi ça marche si bien

Le calcaire se dissout sous l'action acide du vinaigre, tandis que le bicarbonate agit comme abrasif doux et désodorisant. L'action prolongée de la nuit renforce leur efficacité.

## Astuces complémentaires

- Ajoutez quelques gouttes d'huile essentielle de menthe pour la fraîcheur
- Utilisez cette méthode 2-3 fois par semaine en entretien
- Le bicarbonate dans le réservoir prévient aussi le calcaire

Essayez pendant 14 jours et partagez vos résultats !`,
    backgroundColor: '#FFF5EB',
  },
  'post_05_dryer_sheet_baseboard.png': {
    title: "J'ai frotté une feuille d'assouplissant le long de toutes mes plinthes. Voici ce qui s'est passé",
    contentTemplate: `Nettoyer les plinthes est l'une des tâches ménagères les plus fastidieuses. Cette astuce va changer votre vie !

## Le secret : les feuilles d'assouplissant

Les feuilles d'assouplissant pour sèche-linge ont des propriétés anti-statiques et anti-poussière étonnantes.

### Comment procéder

1. Prenez une feuille d'assouplissant usagée ou neuve
2. Enroulez-la autour de votre main comme un gant
3. Passez-la le long de chaque plinthe
4. Insistez sur les coins et les recoins
5. Pas besoin de rincer !

## Les résultats immédiats

- ✅ La poussière est attirée comme par magie
- ✅ Pas besoin de produit nettoyant
- ✅ Résultat brillant et propre
- ✅ L'effet anti-statique repousse la poussière future
- ✅ Une légère odeur propre se dégage

## Pourquoi ça fonctionne

Les assouplissants contiennent des agents antistatiques qui neutralisent les charges électriques. La poussière, qui est chargée positivement, n'est plus attirée par les surfaces traitées.

## Avantages économiques

- Coût : environ 0,05€ par nettoyage
- Temps : 5 minutes pour une pièce entière
- Fréquence : 1 fois par semaine suffit

## Le bonus surprise

Cette technique fonctionne aussi sur :
- Les grilles de radiateur
- Les cadres de fenêtres
- Les étagères
- Les tablettes de ventilateur

C'est devenu mon secret pour une maison toujours propre sans effort !`,
    backgroundColor: '#FDE8D0',
  },
  'post_06_newspaper_mirror.png': {
    title: "J'ai nettoyé le miroir de ma salle de bain avec du journal froissé au lieu d'essuie-tout. Le résultat est choquant",
    contentTemplate: `Arrêtez d'acheter des lingettes pour miroirs et du papier essuie-tout ! Le journal fait mieux et coûte moins cher.

## Pourquoi le journal ?

Le papier de journal a une texture spéciale et contient des encres qui, combinées à un produit nettoyant, laissent les miroirs impeccables.

### Comment procéder

1. Prenez une feuille de journal (évitez les pages colorées)
2. Froissez-la en boule puis dépliez-la
3. Vaporisez du vinaigre blanc dilué (50% eau, 50% vinaigre)
4. Frottez le miroir avec le journal froissé
5. Essuyez avec une partie propre du journal

## Le résultat est choquant

- ✅ Zéro trace, zéro poil
- ✅ Une clarté que je n'avais jamais vue
- ✅ Pas de buée persistante après la douche
- ✅ Les traces de dentifrice ont disparu
- ✅ Coût : presque zéro !

## Le problème avec l'essuie-tout

L'essuie-tout laisse des microfibres sur le miroir. Ces fibres sont invisibles à l'œil nu mais créent cet effet de "verre sale" même après nettoyage.

## Astuces pour un résultat parfait

- Utilisez des pages avec beaucoup de texte (pas de photos)
- Froissez bien le papier pour le rendre plus doux
- Le vinaigre blanc est le meilleur nettoyant
- Finissez par des mouvements verticaux

Cette astuce de nos grands-parents reste la meilleure solution pour des miroirs impeccables !`,
    backgroundColor: '#F5F0E8',
  },
  'post_07_lemon_salt_board.png': {
    title: "J'ai saupoudré du gros sel sur ma planche à découper et frotté avec un demi-citron. Voici ce qui s'est passé",
    contentTemplate: `Vos planches à découper sont tachées et sentent mauvais ? Cette technique naturelle va les rendre comme neuves.

## Le duo citron-sel

Le citron est un antibactérien naturel puissant, tandis que le gros sel agit comme abrasif doux. Ensemble, ils forment le nettoyant parfait pour le bois.

### Comment procéder

1. Saupoudrez généreusement du gros sel sur la planche
2. Prenez un demi-citron, face coupée vers le bas
3. Frottez la planche en effectuant des mouvements circulaires
4. Pressez le citron légèrement pour libérer le jus
5. Laissez agir 5 minutes
6. Rincez à l'eau claire
7. Laissez sécher verticalement

## Les résultats sont bluffants

- ✅ Les taches d'aliments ont disparu
- ✅ Les odeurs de poisson et d'oignon sont éliminées
- ✅ La surface du bois est assainie
- ✅ Le bois retrouve sa couleur naturelle
- ✅ Zéro produit chimique utilisé

## Pourquoi c'est efficace

- L'acide citrique du citron décompose les taches et les bactéries
- Le sel absorbe les odeurs et déloge les résidus
- L'huile essentielle du citron laisse une odeur fraîche
- Le bois est nourri naturellement

## Fréquence recommandée

- Après chaque utilisation pour la viande et le poisson
- Une fois par semaine pour l'entretien général
- Huilez la planche ensuite avec de l'huile minérale alimentaire

C'est la méthode la plus sûre et la plus efficace pour entretenir vos planches à découper en bois !`,
    backgroundColor: '#FFF8E7',
  },
  'post_08_pillowcase_fan.png': {
    title: "J'ai mis une taie d'oreiller sur chaque pale de ventilateur et tiré. La quantité de poussière est incroyable",
    contentTemplate: `Vous ne réaliserez jamais la quantité de poussière accumulée sur votre ventilateur de plafond jusqu'à ce que vous essayiez cette méthode.

## Le problème

Les ventilateurs de plafond accumulent une énorme quantité de poussière sur le dessus des pales. Quand ils tournent, cette poussière se répand dans toute la pièce !

## La méthode de la taie d'oreiller

Au lieu de salir des chiffons et de faire tomber la poussière partout, la taie d'oreiller capture tout.

### Comment procéder

1. MonteZ sur un escabeau stable
2. Glissez une taie d'oreiller propre sur chaque pale
3. Enveloppez entièrement la pale dans la taie
4. Tirez fermement d'un bout à l'autre
5. La poussière reste piégée à l'intérieur
6. Secouez la taie à l'extérieur
7. Passez à la pale suivante

## Les résultats sont incroyables

- ✅ La quantité de poussière collectée est choquante
- ✅ Pas une seule particule ne tombe au sol
- ✅ Nettoyage rapide : 2 minutes pour 5 pales
- ✅ La taie se lave en machine
- ✅ Le ventilateur tourne plus silencieusement

## La poussière que vous respirez

Savez-vous que la poussière d'un ventilateur contient :
- Des acariens
- Des pollens
- Des poils d'animaux
- Des cellules de peau morte
- Des spores de moisissure

## Fréquence recommandée

- Nettoyez toutes les 2 semaines en été
- Une fois par mois le reste de l'année
- Plus souvent si vous avez des animaux

Votre air intérieur sera nettement amélioré !`,
    backgroundColor: '#F8F0E3',
  },
  'post_09_vinegar_showerhead.png': {
    title: "J'ai attaché un sac de vinaigre autour de ma pomme de douche toute la nuit. Après 30 jours, voici ce qui s'est passé",
    contentTemplate: `La pomme de douche est l'élément le plus négligé de la salle de bain, mais elle a un impact direct sur votre confort quotidien.

## Le problème

Le calcaire bouche les trous de la pomme de douche, réduisant la pression de l'eau et créant des jets irréguliers.

## La solution vinaigre

Le vinaigre blanc dissout le calcaire naturellement et en toute sécurité.

### Comment procéder

1. Remplissez un sac en plastique de vinaigre blanc
2. Enveloppez la pomme de shower dans le sac
3. Attachez fermement avec un élastique
4. Assurez-vous que tous les trous sont immergés
5. Laissez agir toute la nuit (8h minimum)
6. Retirez le sac le matin
7. Faites couler l'eau chaude 2 minutes
8. Frottez doucement si nécessaire

## Les résultats après 30 jours de traitement hebdomadaire

- ✅ Pression d'eau restaurée à 100%
- ✅ Tous les jets fonctionnent parfaitement
- ✅ Le calcaire accumulé depuis des années a disparu
- ✅ L'eau semble plus douce
- ✅ Économie sur les produits anti-calcaire

## Pourquoi 30 jours

Un traitement unique améliore les choses, mais un programme de 30 jours élimine même les dépôts de calcaire les plus anciens et profonds.

## Coût

- Vinaigre blanc : 0,50€ le litre
- Sacs plastique : recyclés
- Total pour 30 jours : moins de 3€

C'est l'investissement ménager le plus rentable que j'aie jamais fait !`,
    backgroundColor: '#F0EBE3',
  },
  'post_10_toothpaste_sink.png': {
    title: "J'ai fait briller mon évier en inox avec du dentifrice blanc. Voici ce qui s'est passé",
    contentTemplate: `L'inox de votre évier a perdu son éclat ? Le dentifrice blanc est la solution la plus surprenante et la plus efficace.

## Pourquoi le dentifrice ?

Le dentifrice blanc contient :
- Des agents abrasifs doux (bicarbonate, silice)
- Des agents blanchissants
- Des agents polissants

### Comment procéder

1. Appliquez une quantité généreuse de dentifrice blanc sur l'évier
2. Frottez avec une éponge douce ou un chiffon
3. Insistez sur les taches et les traces d'eau
4. Laissez agir 5 minutes
5. Rincez à l'eau claire
6. Essuyez avec un chiffon sec pour faire briller

## Les résultats sont bluffants

- ✅ L'inox brille comme au premier jour
- ✅ Les traces de calcaire ont disparu
- ✅ Les taches de nourriture s'effacent
- ✅ Une couche protectrice se forme
- ✅ Odeur de fraîcheur dans la cuisine

## Important : dentifrice BLANC uniquement

N'utilisez pas de dentifrice gel ou coloré ! Le dentifrice blanc classique est le plus efficace grâce à sa texture poudreuse.

## Ça marche aussi sur...

- Les robinets
- Les poignées de porte en inox
- Les bouilloires
- Les casseroles en inox
- Les grilles de four

Le dentifrice blanc est devenu mon produit nettoyant numéro 1 pour l'inox !`,
    backgroundColor: '#F5F5F0',
  },
  'post_11_brick_toilet.png': {
    title: "J'ai mis une brique dans le réservoir de mes WC pour économiser l'eau. Après 3 mois, voici ce qui s'est passé",
    contentTemplate: `Chaque chasse d'eau gaspille des litres d'eau potable. Cette astuce simple peut réduire votre consommation de manière significative.

## Le principe

En plaçant un objet dans le réservoir, vous réduisez le volume d'eau utilisé à chaque chasse, sans affecter le fonctionnement.

### Comment procéder

1. Prenez une brique propre ou un objet volumineux
2. Retirez le couvercle du réservoir
3. Placez la brique dans un coin, loin du mécanisme
4. Assurez-vous qu'elle ne gêne pas la chasse
5. Remettez le couvercle

## Les résultats après 3 mois

- ✅ Économie de 2 à 3 litres par chasse
- ✅ 30% de réduction sur la facture d'eau
- ✅ Aucun problème de fonctionnement
- ✅ Le WC fonctionne parfaitement
- ✅ Économie estimée : 50€/an pour une famille

## Les alternatives à la brique

Si vous n'avez pas de brique :
- Une bouteille d'eau remplie de gravier
- Un sac rempli de cailloux
- Un contenant en plastique fermé

## Chiffres impressionnants

- Un Français utilise en moyenne 150 litres d'eau par jour
- 30% de cette eau part dans les WC
- Avec cette astuce, on peut économiser 45 litres/jour/personne
- Pour une famille de 4 : 54 000 litres économisés par an !

## Mise en garde

Vérifiez que votre chasse reste efficace. Si l'évacuation est trop faible, utilisez un objet plus petit.

C'est un geste simple pour la planète et pour votre portefeuille !`,
    backgroundColor: '#F0E8DC',
  },
  'post_12_freezer_jugs.png': {
    title: "J'ai rempli les espaces vides de mon congélateur avec des bouteilles d'eau gelée pendant 3 semaines. Voici ce qui s'est passé",
    contentTemplate: `Votre congélateur consomme trop d'énergie ? Cette astuce simple va le rendre plus efficace et vous faire économiser de l'argent.

## Le problème

Un congélateur à moitié vide consomme PLUS d'énergie qu'un congélateur plein. L'air froid qui s'échappe à chaque ouverture doit être refroidi à nouveau.

## La solution : les bouteilles d'eau gelées

### Comment procéder

1. Remplissez des bouteilles en plastique aux 3/4 d'eau
2. Ne les fermez pas complètement (l'eau se dilate en gelant)
3. Placez-les dans tous les espaces vides du congélateur
4. Laissez geler pendant 24h
5. Fermez les bouteilles ensuite

## Les résultats après 3 semaines

- ✅ Le congélateur maintient mieux sa température
- ✅ Consommation électrique réduite de 20%
- ✅ Les aliments se conservent mieux lors de coupures de courant
- ✅ Le congélateur fait moins de bruit (moteur moins sollicité)
- ✅ En cas de panne, les bouteilles gardent le froid plus longtemps

## Pourquoi ça fonctionne

Les bouteilles gelées agissent comme des "batteries thermiques" :
- Elles stockent le froid et le restituent
- L'espace vide = air qui se réchauffe vite
- L'espace plein = masse thermique stable

## Autres avantages

- Eau potable disponible en cas d'urgence
- Les bouteilles aident à organiser le congélateur
- Vous pouvez aussi les utiliser dans une glacière

Un geste simple avec des résultats concrets sur votre facture !`,
    backgroundColor: '#E8F0F5',
  },
  'post_13_donation_bag.png': {
    title: "J'ai mis un sac de dons dans chaque pièce de ma maison pendant 21 jours en ajoutant un objet par jour. Voici ce qui s'est passé",
    contentTemplate: `21 jours pour transformer votre maison et votre vie ! Le défi du sac de dons est la méthode de désencombrement la plus simple et la plus efficace.

## Le défi des 21 jours

Le principe est simple : un objet par jour, pendant 21 jours, dans chaque pièce.

### Comment procéder

1. Prenez un sac par pièce de la maison
2. Chaque jour, trouvez AU MOINS un objet à donner
3. Déposez-le dans le sac correspondant
4. Au bout de 21 jours, emmenez tous les sacs
5. Recommencez si nécessaire !

## Les résultats sont transformateurs

- ✅ 147 objets donnés (7 pièces × 21 jours)
- ✅ Chaque pièce est plus aérée
- ✅ Le rangement devient un réflexe
- ✅ Moins de stress à la maison
- ✅ Des sourires pour ceux qui reçoivent

## La psychologie derrière les 21 jours

Il faut environ 21 jours pour créer une nouvelle habitude. Ce défi ne désencombre pas seulement votre maison, il change votre relation avec les objets.

## Quels objets donner ?

- Vêtements que vous ne portez plus
- Livres déjà lus
- Cuisinielle en double
- Jouets dont les enfants se sont lassés
- Décorations qui ne vous plaisent plus
- Objets "au cas où"

## Règle d'or

Si vous hésitez, mettez l'objet dans le sac. S'il vous manque vraiment dans les 3 mois, vous pourrez le récupérer. Dans 95% des cas, vous l'oublierez.

Prenez le défi et partagez vos résultats !`,
    backgroundColor: '#F5ECE0',
  },
  'post_14_unplug_tv.png': {
    title: "J'ai débranché ma télévision tous les soirs avant de dormir pendant 30 jours. Ma facture d'électricité montre quelque chose d'incroyable",
    contentTemplate: `La veille de vos appareils électroniques coûte plus cher que vous ne le pensez. Ce que j'ai découvert en débranchant ma télé pendant 30 jours va vous surprendre.

## Le problème de la veille

Même éteints, vos appareils consomment de l'électricité :
- Télévision : 3 à 15W en veille
- Box internet : 10 à 12W
- Console de jeux : 1 à 5W
- Chargeur branché : 0,5W

### Comment j'ai procédé

1. Tous les soirs, j'ai débranché la TV de la prise murale
2. J'ai utilisé une multiprise avec interrupteur
3. J'ai noté ma consommation chaque semaine
4. Après 30 jours, j'ai comparé avec le mois précédent

## Les résultats sont incroyables

- ✅ 8% de réduction sur la facture d'électricité
- ✅ 12€ économisés en un mois
- ✅ Soit 144€ par an pour une seule TV
- ✅ Meilleur sommeil (plus de lumière LED)
- ✅ L'appareil dure plus longtemps

## Calcul pour toute la maison

En débranchant tous les appareils en veille :
- TV + Box + Console = 20-30W en veille
- 24h × 30 jours = 720h
- 25W × 720h = 18 kWh
- Coût : environ 3€ par mois, soit 36€/an

## L'astuce la plus simple

Achetez des multiprices avec interrupteur. Un clic et tout est éteint !

## Bonus santé

Débrancher la TV le soir encourage aussi à :
- Lire davantage
- Dormir plus tôt
- Réduire l'exposition aux ondes
- Passer du temps en famille

Un geste simple avec des bénéfices multiples !`,
    backgroundColor: '#F0E5D8',
  },
  'post_15_pinesol_floor.png': {
    title: "J'ai ajouté du Pine-Sol dans l'eau de ma serpillière au lieu du nettoyant habituel. Après 2 semaines, voici ce qui s'est passé",
    contentTemplate: `Le Pine-Sol n'est pas qu'un nettoyant pour sols. Découvrez comment ce produit classique peut transformer votre routine ménagère.

## Qu'est-ce que le Pine-Sol ?

Le Pine-Sol est un nettoyant multi-usages à base d'huile de pin. Il est utilisé depuis des générations pour ses propriétés nettoyantes et désinfectantes.

### Comment l'utiliser pour les sols

1. Diluez 1/4 de tasse de Pine-Sol dans 5 litres d'eau chaude
2. Trempez votre serpillière
3. Essorez bien (pas besoin de rincer !)
4. Passez sur le sol comme d'habitude

## Les résultats après 2 semaines

- ✅ Les sols sont plus propres qu'avec mon ancien nettoyant
- ✅ Une odeur de propreté naturelle persiste
- ✅ Le linoléum a retrouvé son éclat
- ✅ Les traces de chaussures disparaissent plus facilement
- ✅ Coût réduit de 60% par rapport au nettoyant habituel

## Le Pine-Sol vs nettoyant classique

| Critère | Pine-Sol | Nettoyant classique |
|---------|----------|-------------------|
| Prix/Litre | 2-3€ | 5-8€ |
| Efficacité | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Odeur | Pin naturel | Chimique |
| Rinçage | Pas besoin | Recommandé |
| Multi-usage | ✅ | ❌ |

## Autres utilisations du Pine-Sol

- Nettoyant pour vitres dilué
- Désodorisant pour poubelles
- Nettoyant pour salle de bain
- Désinfectant pour plan de travail

Un produit classique qui reste imbattable !`,
    backgroundColor: '#E8F5E0',
  },
  'post_16_tea_windows.png': {
    title: "J'ai infusé des sachets de thé et utilisé l'eau pour nettoyer mes fenêtres. Voici ce qui s'est passé",
    contentTemplate: `Le thé n'est pas seulement pour boire ! Découvrez cette astuce ancestrale pour des fenêtres parfaitement propres.

## Pourquoi le thé ?

Le thé contient des tanins qui :
- Dissolvent la graisse
- Laissent une couche anti-reflet
- Sèchent sans traces
- Protègent le verre

### Comment procéder

1. Faites bouillir 500ml d'eau
2. Plongez 3-4 sachets de thé noir
3. Laissez infuser 10 minutes
4. Retirez les sachets et laissez refroidir
5. Versez dans un vaporisateur
6. Vaporisez sur les fenêtres
7. Essuyez avec un chiffon propre

## Les résultats sont surprenants

- ✅ Des fenêtres impeccables sans traces
- ✅ L'effet anti-reflet dure plusieurs jours
- ✅ Les doigts ne laissent plus de traces
- ✅ Odeur délicate de thé
- ✅ 100% naturel et économique

## Le thé noir est le meilleur

Utilisez du thé noir classique (type Lipton) car il contient le plus de tanins. Le thé vert et les infusions sont moins efficaces.

## Comparaison avec les produits du commerce

- Windex : laisse des traces, produit chimique
- Vinaigre blanc : efficace mais odeur forte
- Eau savonneuse : laisse des résidus
- Thé noir : aucun défaut !

## Astuce bonus

Ajoutez une cuillère de vinaigre blanc dans le thé pour renforcer l'effet nettoyant.

Essayez cette astuce et vous n'achèterez plus jamais de produit pour vitres !`,
    backgroundColor: '#F5EDE3',
  },
  'post_17_tennis_ball_garage.png': {
    title: "J'ai accroché une balle de tennis au plafond de mon garage pour qu'elle touche mon pare-brise. Voici ce qui s'est passé",
    contentTemplate: `Vous avez du mal à vous garer dans votre garage ? Cette astuce va mettre fin à vos mauvaises manœuvres !

## Le problème

Se garer dans un garage étroit est un cauchemar :
- Toujours la peur de toucher le mur
- Des pare-chocs abîmés
- De la frustration quotidienne

## La solution : la balle de tennis

### Comment procéder

1. Garez-vous à la position parfaite dans votre garage
2. Marquez l'endroit où se trouve votre pare-brise
3. Attachez une corde au plafond à cet endroit précis
4. Accrochez une balle de tennis au bout de la corde
5. Ajustez la longueur pour que la balle touche le pare-brise

## Quand vous vous garez maintenant

1. Avancez lentement dans le garage
2. Quand la balle touche votre pare-brise → STOP
3. Vous êtes garé parfaitement !

## Les résultats

- ✅ Stationnement parfait à chaque fois
- ✅ Plus de stress au volant
- ✅ Pare-chocs intact
- ✅ Compatible avec tous les véhicules
- ✅ Coût : moins de 2€

## Comment fixer la balle

- Vissez un crochet au plafond
- Utilisez une corde solide (type corde à linge)
- Faites un nœud solide autour de la balle
- La balle doit pendre librement

## L'astuce en vidéo

Imaginez : vous avancez, la balle tape doucement sur votre pare-brise, et vous savez exactement que vous êtes au bon endroit. C'est aussi simple que ça !

## Variante

Vous pouvez aussi accrocher une mousse de piscine sur le mur du fond pour protéger votre pare-chocs.

L'astuce la plus simple et la plus efficace pour votre garage !`,
    backgroundColor: '#F0EAE0',
  },
  'post_18_cat_litter_stain.png': {
    title: "J'ai versé de la litière pour chat sur la tache d'huile de mon entrée et laissé toute la nuit. Voici ce qui s'est passé",
    contentTemplate: `Une tache d'huile sur votre entrée ou votre allée ? La litière pour chat est la solution la plus efficace et la moins chère.

## Pourquoi la litière pour chat ?

La litière agglomérante est conçue pour absorber les liquides. Elle est aussi excellente pour absorber les corps gras et les huiles.

### Comment procéder

1. Repérez la tache d'huile
2. Versez une couche généreuse de litière pour chat
3. Étalez uniformément sur la tache
4. Appuyez légèrement avec vos pieds
5. Laissez agir toute la nuit (minimum 8h)
6. Balayez la litière le lendemain matin
7. Si nécessaire, répétez l'opération

## Les résultats sont spectaculaires

- ✅ 90% de la tache absorbée dès la première nuit
- ✅ L'huile est complètement absorbée
- ✅ Pas de résidu gras
- ✅ Le béton retrouve sa couleur
- ✅ Coût : moins de 1€ par tache

## Pourquoi ça fonctionne mieux que les dégraissants

Les dégraissants chimiques :
- Sont nocifs pour l'environnement
- Coûtent entre 5 et 15€
- Nécessitent un rinçage abondant
- Peuvent abîmer certaines surfaces

La litière pour chat :
- 100% naturelle
- Économique
- Sans rinçage
- Sans danger pour les surfaces

## Les meilleures litières

Utilisez de la litière agglomérante à base d'argile. Elle est la plus absorbante.

## Fonctionne aussi sur...

- Taches de gras sur le béton
- Fuites d'huile de voiture
- Taches de moteur
- Déversements de liquide divers

Ne jetez plus votre argent dans des dégraissants chimiques !`,
    backgroundColor: '#F5EDE5',
  },
  'post_19_denture_toilet.png': {
    title: "J'ai déposé une pastille de nettoyage pour prothèse dans ma cuvette de WC chaque nuit pendant 30 jours. Voici ce qui s'est passé",
    contentTemplate: `Les pastilles de nettoyage pour prothèses dentaires sont des bombes nettoyantes méconnues. Découvrez leur pouvoir sur vos WC.

## Pourquoi les pastilles pour prothèses ?

Ces pastilles sont conçues pour :
- Éliminer les taches tenaces
- Dissoudre le calcaire
- Désodoriser en profondeur
- Blâncir les surfaces

Elles sont PERFECTES pour les WC !

### Comment procéder

1. Avant de dormir, déposez 1-2 pastilles dans la cuvette
2. Laissez-les se dissoudre naturellement
3. Ne tirez PAS la chasse pendant la nuit
4. Le matin, la solution est prête
5. Frottez légèrement avec la brosse
6. Tirez la chasse

## Les résultats après 30 jours

- ✅ La cuvette est d'un blanc éclatant
- ✅ Le calcaire incrusté a disparu
- ✅ Les taches au fond sont éliminées
- ✅ Odeur fraîche constante
- ✅ Le jet d'eau est plus puissant

## Comparaison avec les pastilles pour WC classiques

| Critère | Pastilles prothèse | Pastilles WC |
|---------|-------------------|-------------|
| Prix | 5-8€ pour 30 | 3-5€ pour 12 |
| Efficacité | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Action calcaire | ✅ Forte | ❌ Faible |
| Blanchiment | ✅ Oui | ❌ Non |

## Le calcul économique

- Pastilles pour prothèse : ~0,20€/nuit
- Pastilles pour WC : ~0,40€/nuit
- Économie : 50% avec de meilleurs résultats !

C'est devenu mon secret pour des WC toujours impeccables !`,
    backgroundColor: '#F5F0EA',
  },
  'post_20_cooking_spray_shovel.png': {
    title: "J'ai vaporisé du spray culinaire sur ma pelle à neige avant de sortir. Voici ce qui s'est passé",
    contentTemplate: `L'hiver, chaque sortie avec la pelle à neige se transforme en combat. La neige colle, s'accumule et alourdit la pelle. Voici la solution.

## Le problème

Quand vous pellez la neige :
- Elle colle au métal
- Elle s'accumule au lieu de glisser
- La pelle devient de plus en plus lourde
- Le travail est épuisant

## La solution : le spray culinaire

Le spray culinaire (type Pam) crée une couche anti-adhésive sur la pelle.

### Comment procéder

1. Prenez votre pelle à neige
2. Vaporisez du spray culinaire sur toute la surface
3. Insistez sur les bords et le fond
4. Pellez normalement
5. Renouvelez après chaque utilisation

## Les résultats sont incroyables

- ✅ La neige glisse au lieu de coller
- ✅ La pelle reste légère toute la durée du travail
- ✅ Temps de pelletage réduit de 40%
- ✅ Moins d'effort physique
- ✅ La pelle ne rouille pas (protection anti-humidité)

## Le spray culinaire comme anti-adhésif

Le spray culinaire contient :
- De l'huile végétale (anti-adhésif)
- De la lécithine (agent de glisse)
- Parfois du silicone (protection)

## Alternatives au spray culinaire

- Huile végétale avec un chiffon
- WD-40 (mais attention à l'odeur)
- Cire pour voiture
- Graisse alimentaire

## L'astuce fonctionne aussi pour

- Les luges des enfants
- Les patins
- Les chaussures de neige
- Les outils de jardinage en hiver

Gagnez la bataille contre la neige avec cette astuce simple !`,
    backgroundColor: '#F8F0E5',
  },
  'post_21_bonus_vinegar_microwave.png': {
    title: "J'ai mis un bol de vinaigre blanc dans mon micro-ondes et l'ai fait tourner 5 minutes. La saleté s'est enlevée toute seule",
    contentTemplate: `Le nettoyage du micro-ondes ne devrait jamais demander de frotter. Cette méthode à la vapeur fait tout le travail à votre place.

## La méthode vapeur au vinaigre

### Comment procéder

1. Remplissez un bol avec 1 tasse d'eau et 2 cuillères de vinaigre blanc
2. Placez le bol dans le micro-ondes
3. Faites chauffer à puissance maximale pendant 5 minutes
4. NEouvrez PAS la porte immédiatement
5. Attendez 5 minutes (la vapeur continue de travailler)
6. Ouvrez et retirez le bol (attention, chaud !)
7. Essuyez avec un chiffon ou une éponge

## La magie opère

- ✅ Les éclaboussures se détachent TOUTES SEULES
- ✅ Un simple coup d'éponge suffit
- ✅ Les odeurs sont neutralisées
- ✅ Le micro-ondes est désinfecté
- ✅ Zéro effort de frottement

## Pourquoi ça marche

La vapeur d'eau chaude + vinaigre :
- Ramollit les résidus alimentaires séchés
- Le vinaigre dissout les graisses
- La vapeur atteint tous les recoins
- L'action acide décolle les taches

## Fréquence recommandée

- 1 à 2 fois par semaine pour un usage quotidien
- Après chaque cuisson qui éclabousse

## Variantes

- Remplacez le vinaigre par du citron pour une odeur plus agréable
- Ajoutez une cuillère de bicarbonate pour les taches tenaces
- Utilisez du thym pour un effet antibactérien renforcé

5 minutes de votre temps, zéro effort, résultat parfait !`,
    backgroundColor: '#F5EBE0',
  },
  'post_22_bonus_hanger_hack.png': {
    title: "J'ai enroulé des élastiques autour de mes cintres pour empêcher les vêtements de glisser. Voici ce qui s'est passé",
    contentTemplate: `Vos vêtements glissent de leurs cintres ? C'est non seulement frustrant mais ça abîme aussi vos vêtements.

## Le problème

Les cintres en plastique ou en métal lisse laissent glisser :
- Les chemises en soie
- Les robes à bretelles
- Les tops fins
- Les pulls légers

## La solution : l'élastique

### Comment procéder

1. Prenez un cintre
2. Enroulez un élastique (ou deux) autour de chaque extrémité
3. Positionnez-les aux deux bouts du cintre
4. Suspendez vos vêtements

## Les résultats

- ✅ Aucun vêtement ne glisse plus
- ✅ Même les soies et satins tiennent parfaitement
- ✅ Les bretelles ne tombent plus
- ✅ Les vêtements gardent leur forme
- ✅ Coût : quasiment zéro

## Le secret derrière cette astuce

L'élastique crée de la friction qui empêche les tissus de glisser. C'est un principe physique simple mais redoutablement efficace.

## Quels élastiques utiliser

- Les élastiques à bureau (couleur)
- Les élastiques à cheveux
- Les vieux élastiques de paquet

## Astuces complémentaires

- Attachez deux cintres ensemble pour les pantalons
- Utilisez des élastiques de tailles différentes selon le poids du vêtement
- Les élastiques s'usent : changez-les tous les 6 mois

Un geste simple qui vous fera gagner du temps tous les matins !`,
    backgroundColor: '#F0E8DD',
  },
  'post_23_bonus_salt_iron.png': {
    title: "J'ai saupoudré du sel sur un essuie-tout et frotté mon fer à repasser. Mon fer looks neuf maintenant",
    contentTemplate: `Le fond de votre fer à repasser est jaune, brun ou collant ? Ne le jetez pas ! Cette astuce le rendra comme neuf.

## Pourquoi le fer s'encrasse

Les résidus de tissus synthétiques, les adhésifs des étiquettes et les produits d'entretien s'accumulent sur la semelle du fer avec le temps.

## La méthode au sel

### Comment procéder

1. Étendez une grande feuille d'essuie-tout sur votre planche à repasser
2. Saupoudrez une couche généreuse de gros sel
3. Allumez votre fer (vapeur OFF, température MAX)
4. Passez le fer chaud sur le sel en appuyant légèrement
5. Le sel agit comme un abrasif doux et nettoie la semelle
6. Répétez jusqu'à ce que le sel devienne gris
7. Laissez refroidir le fer et essuyez avec un chiffon humide

## Les résultats sont spectaculaires

- ✅ La semelle est comme neuve
- ✅ Les taches brunes ont disparu
- ✅ Le fer glisse parfaitement à nouveau
- ✅ Plus de marques sur les vêtements
- ✅ Le fer repasse mieux qu'avant

## Le sel : abrasif naturel

Le gros sel (sel marin) est :
- Suffisamment dur pour décoller les résidus
- Trop doux pour rayer la semelle
- Absorbant (capte les résidus)
- Facile à nettoyer après utilisation

## Précautions

- Ne jamais utiliser avec la vapeur activée
- Température maximum uniquement
- Éloignez les enfants
- Testez d'abord sur une petite zone si le fer est très encrassé

## Autres nettoyants pour semelle de fer

- Bicarbonate de soude + eau
- Vinaigre blanc chaud
- Coton imbibé de vinaigre (sans chauffer)

Le sel reste la méthode la plus simple et la plus efficace !`,
    backgroundColor: '#F5F5F0',
  },
  'post_24_vinegar_dawn_shower.png': {
    title: "J'ai mélangé du vinaigre blanc avec du liquide vaisselle Dawn et vaporisé sur les murs de ma douche. Après 30 minutes, le calcaire a fondu",
    contentTemplate: `Le calcaire dans la douche est un cauchemar. Ce mélange viral le fait disparaître comme par magie en 30 minutes.

## Le mélange magique : vinaigre + Dawn

Ce mélange est devenu viral sur internet et pour cause : IL MARCHE.

### La recette

1. Mélangez parts égales de vinaigre blanc et de liquide vaisselle Dawn
2. Chauffez le vinaigre blanc au micro-ondes (1 minute)
3. Mélangez doucement (pas de mousse excessive)
4. Versez dans un vaporisateur

### Comment l'utiliser

1. Vaporisez généreusement sur les murs de la douche
2. Laissez agir 30 minutes sans toucher
3. Rincez à l'eau chaude
4. Admirez le résultat

## Les résultats sont incroyables

- ✅ Le calcaire FOND littéralement
- ✅ Le savon accumulé disparaît
- ✅ Les murs sont propres et brillants
- ✅ Les joints redeviennent blancs
- ✅ Aucun frottement nécessaire

## Pourquoi ça marche si bien

- Le vinaigre chaud dissout le calcaire
- Le Dawn coupe le gras et le savon séché
- La chaleur accélère la réaction chimique
- Ensemble, ils pénètrent les dépôts les plus tenaces

## Le Dawn est-il indispensable ?

Oui et non. Le Dawn est particulièrement efficace car sa formulation est plus concentrée que les liquides vaisselle classiques. Mais un autre liquide vaisselle concentré fonctionnera aussi.

## Précautions

- Ventilez la salle de bain (odeur de vinaigre)
- Portez des gants si vous avez la peau sensible
- Ne mélangez JAMAIS avec de l'eau de Javel
- Testez sur une petite zone d'abord

Le nettoyage de douche n'a jamais été aussi facile !`,
    backgroundColor: '#F0EBE3',
  },
  'post_25_coffee_fridge.png': {
    title: "J'ai mis un contenant de marc de café usagé dans mon frigo pendant 2 semaines. Les résultats sont surprenants",
    contentTemplate: `Votre frigo sent mauvais malgré tous vos efforts ? Le marc de café est le désodorisant naturel le plus puissant que vous puissiez utiliser.

## Le problème des odeurs de frigo

Même avec un nettoyage régulier, les odeurs s'accumulent :
- Fromages forts
- Poisson
- Restes alimentaires
- Légumes qui se gâtent

## La solution : le marc de café

### Comment procéder

1. Après avoir préparé votre café, gardez le marc
2. Étalez-le sur une plaque et laissez-le sécher 24h
3. Placez le marc de café sec dans un bol ouvert
4. Mettez le bol sur une étagère du frigo
5. Changez-le toutes les 2 semaines

## Les résultats après 2 semaines

- ✅ Toutes les mauvaises odeurs ont disparu
- ✅ Le frigo sent frais et propre
- ✅ Aucune odeur de renversé
- ✅ Les odeurs de fromage sont neutralisées
- ✅ Solution 100% naturelle et gratuite

## Pourquoi le marc de café absorbe les odeurs

Le marc de café contient :
- Du charbon actif naturel
- Des pores qui captent les molécules odorantes
- De l'azote qui neutralise les odeurs acides

## Astuces complémentaires

- Ajoutez quelques gouttes d'huile essentielle de vanille
- Utilisez du marc de café dans le congélateur aussi
- Placez-en dans les armoires de cuisine
- Mettez-en dans les chaussures pour les désodoriser

## Marc de café séché vs humide

Le marc SEC est plus efficace car il absorbe mieux les odeurs. Ne le mettez jamais humide directement dans le frigo.

Ne jetez plus jamais votre marc de café !`,
    backgroundColor: '#F5EDE0',
  },
  'post_26_hairdryer_wood.png': {
    title: "J'ai tenu un sèche-cheveux sur la trace d'eau sur ma table en bois pendant 10 minutes. Voici ce qui s'est passé",
    contentTemplate: `Une trace de verre d'eau sur votre table en bois ? Pas de panique, cette méthode simple va la faire disparaître.

## Le problème des traces d'eau

Les traces blanches sur le bois sont causées par l'humidité qui s'infiltre dans le vernis ou le revêtement de protection. Elles peuvent sembler permanentes, mais...

## La méthode du sèche-cheveux

### Comment procéder

1. Identifiez la trace d'eau blanche
2. Prenez un sèche-cheveux
3. Réglez sur température MOYENNE (pas trop chaud)
4. Tenez le sèche-cheveux à 15 cm de la surface
5. Déplacez-le en cercles au-dessus de la trace
6. Continuez pendant 5 à 10 minutes
7. La trace disparaît progressivement

## Les résultats

- ✅ La trace blanche disparaît complètement
- ✅ Le bois retrouve sa couleur d'origine
- ✅ Aucun produit chimique nécessaire
- ✅ Pas de risque d'abîmer le bois
- ✅ Résultat en 10 minutes chrono

## Pourquoi ça fonctionne

La chaleur du sèche-cheveux :
- Évapore l'humidité emprisonnée sous le vernis
- Le vernis reprend sa forme originelle
- La trace blanche (eau) disparaît en s'évaporant

## Si la trace est ancienne

Pour les traces plus tenaces :
1. Appliquez un chiffon imbibé d'huile minérale
2. Laissez agir 1 heure
3. Passez le sèche-cheveux ensuite
4. Lustrez avec un chiffon doux

## Précautions

- Température moyenne : pas trop chaud pour ne pas abîmer le vernis
- Ne jamais utiliser sur du bois brut non protégé
- Gardez une distance de 15 cm minimum
- Arrêtez si le vernis devient trop chaud au toucher

Une astuce rapide et efficace pour tous les accidents de verres !`,
    backgroundColor: '#F0E5D8',
  },
  'post_27_toothpaste_headlights.png': {
    title: "J'ai frotté du dentifrice sur les phares embués de ma voiture avec un chiffon. Après 15 minutes, ils sont comme neufs",
    contentTemplate: `Des phares jaunes et embués sont non seulement inesthétiques, ils sont aussi DANGEREUX. Cette astuce à 0€ les rend comme neufs.

## Le danger des phares embués

Des phares opaques réduisent la visibilité de :
- 50% la nuit
- 30% par temps de pluie
- C'est un risque réel d'accident

## La méthode au dentifrice

### Comment procéder

1. Lavez les phares à l'eau claire
2. Appliquez du dentifrice blanc généreusement
3. Frottez vigoureusement avec un chiffon ou une brosse douce
4. Effectuez des mouvements circulaires
5. Laissez agir 5 minutes
6. Rincez à l'eau claire
7. Répétez si nécessaire (2-3 couches)

## Les résultats sont bluffants

- ✅ Les phares retrouvent leur transparence
- ✅ L'éclairage est de nouveau optimal
- ✅ La voiture paraît plus neuve
- ✅ Économie de 150-300€ (remplacement)
- ✅ Contrôle technique validé

## Pourquoi le dentifrice fonctionne

Le dentifrice blanc contient :
- Des agents abrasifs doux (silice)
- Des agents polissants
- Du peroxyde (blanchissant)

## Entretien par la suite

Pour maintenir le résultat :
1. Appliquez une cire automobile sur les phares
2. Renouvelez l'application tous les 3 mois
3. Garez-vous à l'ombre quand possible
4. Nettoyez les phares régulièrement

## Alternatives

- Mélange bicarbonate + eau
- Polish automobile
- Kits de restauration (plus cher)

Le dentifrice reste la solution la plus économique pour des résultats professionnels !`,
    backgroundColor: '#F5F0EA',
  },
  'post_28_tennis_pillows.png': {
    title: "J'ai mis 3 balles de tennis dans mon sèche-linge avec mes oreillers. Ce qui s'est passé est incroyable",
    contentTemplate: `Vos oreillers sont plats, ternes et malodorants ? Le sèche-linge + balles de tennis est la combinaison magique.

## Le problème

Les oreillers accumulent :
- De l'humidité
- Des acariens
- Des peaux mortes
- Des odeurs
- Ils perdent leur gonflant

## La méthode

### Comment procéder

1. Mettez vos oreillers dans le sèche-linge
2. Ajoutez 3 balles de tennis propres
3. Réglez sur température basse/moyenne
4. Lancez un cycle de 30 minutes
5. Sortez les oreillers gonflés et frais !

## Les résultats sont incroyables

- ✅ Les oreillers sont comme neufs
- ✅ Ils sont regonflés à 100%
- ✅ Les acariens sont éliminés par la chaleur
- ✅ Les odeurs ont disparu
- ✅ Le duvet est redistribué uniformément

## Pourquoi les balles de tennis ?

Les balles de tennis :
- Tambourinent les oreillers pour les dégonfler
- Séparent les fibres agglomérées
- Créent des poches d'air dans le rembourrage
- Aèrent le rembourrage pendant le cycle

## Compatible avec tous les oreillers

- ✅ Oreillers en duvet
- ✅ Oreillers synthétiques
- ✅ Oreillers en plumes
- ✅ Coussins de canapé
- ✅ Couettes légères

## Fréquence recommandée

- 1 fois par mois pour les oreillers
- Toutes les 2 semaines si vous avez des allergies

## Astuces supplémentaires

- Ajoutez quelques gouttes d'huile essentielle de lavande sur les balles
- Utilisez des balles propres (lavez-les d'abord)
- Vous pouvez aussi utiliser des balles de sèche-linge en laine

Vos nuits vont changer grâce à cette astuce !`,
    backgroundColor: '#F0E8DD',
  },
  'post_29_baking_soda_shoes.png': {
    title: "J'ai saupoudré du bicarbonate de soude dans mes chaussures de sport puantes chaque nuit pendant une semaine. Voici ce qui s'est passé",
    contentTemplate: `Vos chaussures de sport sentent si fort que vous n'osez pas les enlever ? Le bicarbonate de soude est la solution définitive.

## Le problème des chaussures qui sentent

Les odeurs de chaussures sont causées par :
- La transpiration des pieds
- Les bactéries qui prolifèrent dans l'humidité
- Le manque d'aération
- Les matériaux synthétiques

## La méthode au bicarbonate

### Comment procéder

1. Le soir, retirez les semelles de vos chaussures
2. Saupoudrez généreusement du bicarbonate de soude à l'intérieur
3. Secouez les chaussures pour répartir le bicarbonate
4. Laissez agir toute la nuit
5. Le matin, secouez-les à l'extérieur pour retirer l'excédent
6. Remettez les semelles

## Les résultats après 1 semaine

- ✅ Les odeurs ont COMPLETEMENT disparu
- ✅ Mes pieds sentent frais toute la journée
- ✅ Mes chaussures sont sèches le matin
- ✅ Plus de gêne pour enlever mes chaussures
- ✅ Coût : moins de 1€ pour un mois

## Pourquoi le bicarbonate est si efficace

Le bicarbonate de soude :
- Neutralise le pH (les bactéries aiment l'acidité)
- Absorbe l'humidité
- Capture les molécules odorantes
- Est antibactérien naturel

## Pour des résultats durables

1. Changez vos chaussettes tous les jours
2. Laissez vos chaussures sécher entre deux utilisations
3. Utilisez du papier journal la nuit
4. Alternez entre 2 paires de chaussures
5. Lavez vos pieds avec du savon au pH neutre

## Astuce bonus

Mélangez le bicarbonate avec quelques gouttes d'huile essentielle de tea tree pour un effet antibactérien renforcé.

Dites adieu aux odeurs de chaussures pour toujours !`,
    backgroundColor: '#F8F5F0',
  },
  'post_30_wd40_crayon.png': {
    title: "J'ai vaporisé du WD-40 sur les traces de feutre que mes enfants ont laissées sur le mur. Voici ce qui s'est passé",
    contentTemplate: `Vos enfants ont transformé vos murs en œuvre d'art avec des feutres ? Avant de repeindre, essayez cette astuce.

## Le cauchemar des parents

Les feutres, crayons et marqueurs sur les murs sont un classique. Mais ne désespérez pas !

## La solution : le WD-40

Le WD-40 est un produit miracle pour enlever les traces de feutre.

### Comment procéder

1. Secouez le WD-40
2. Vaporisez directement sur la trace de feutre
3. Laissez agir 1 à 2 minutes
4. Frottez doucement avec un chiffon doux
5. La trace disparaît comme par magie
6. Nettoyez ensuite avec de l'eau savonneuse

## Les résultats

- ✅ Les traces de feutre disparaissent complètement
- ✅ Aucun dommage sur la peinture
- ✅ Résultat en moins de 5 minutes
- ✅ Fonctionne sur tous les types de feutres
- ✅ Même les traces anciennes partent

## Le WD-40 est incroyable pour...

- ✅ Traces de feutre et marqueur
- ✅ Traces de crayon
- ✅ Etiquettes autocollantes
- ✅ Résidus de colle
- ✅ Traces de gomme à effacer
- ✅ Taches de graisse

## Précautions importantes

- Testez d'abord sur une petite zone cachée
- Ventilez la pièce (odeur forte)
- Nettoyez toujours après application
- Ne pas utiliser sur le papier peint fin
- Éloignez les enfants lors de l'application

## Alternative naturelle

Si vous n'avez pas de WD-40 :
- Dentifrice blanc (pour les crayons)
- Alcool à friction (pour les marqueurs)
- Mayonnaise (pour les traces de crayon gras)

Le WD-40 est votre meilleur allié contre les "œuvres d'art" de vos enfants !`,
    backgroundColor: '#F5EBE0',
  },
  'post_31_rice_salt_shaker.png': {
    title: "J'ai mis quelques grains de riz dans ma salière et tout a changé. Voici ce qui s'est passé",
    contentTemplate: "Le sel qui s'agglomère et bouche votre salière ? Cette astuce millénaire résout le problème en une seconde.\n\n## Le problème\n\nLe sel absorbe l'humidité de l'air et forme des blocs durs qui bouchent les trous de la salière. C'est frustrant quand vous devez secouer pendant 10 secondes pour sortir du sel !\n\n## La solution : quelques grains de riz\n\n### Comment procéder\n\n1. Ouvrez votre salière\n2. Ajoutez 10 à 15 grains de riz cru\n3. Mélangez légèrement\n4. Fermez et utilisez normalement\n\n## Les résultats\n\n- ✅ Le sel coule parfaitement à chaque utilisation\n- ✅ Plus jamais de blocs agglomérés\n- ✅ La salière ne se bouche plus\n- ✅ Le riz absorbe l'excès d'humidité\n- ✅ Solution gratuite et permanente\n\n## Pourquoi ça fonctionne\n\nLe riz cru est naturellement très absorbant. Il capte l'humidité avant que le sel ne le fasse, gardant le sel au sec et fluide.\n\n## Les grains de riz ne sortent-ils pas ?\n\nNon ! Les grains de riz sont trop gros pour passer par les trous de la salière. Ils restent à l'intérieur et font leur travail discrètement.\n\n## Durée d'efficacité\n\n- Changez les grains de riz tous les 6 mois\n- Ou quand vous remplissez la salière\n- En cuisine humide, changez tous les 3 mois\n\n## Autres astuces pour la salière\n\n- Ajoutez quelques grains de poivre pour un sel assaisonné\n- Mettez un petit morceau de pain sec (alternative au riz)\n- Gardez la salière loin de la cuisinière\n\nUne astuce si simple qu'on se demande pourquoi tout le monde ne la connaît pas !",
    backgroundColor: '#F8F2E8',
  },
  'post_32_rubberband_paint.png': {
    title: "J'ai enroulé un élastique autour de mon pot de peinture verticalement avant de l'ouvrir. Voici ce qui s'est passé",
    contentTemplate: "Enfin une astuce qui va mettre fin aux gouttes de peinture sur le bord du pot !\n\n## Le problème\n\nQuand vous peignez :\n- Le bord du pot se couvre de peinture\n- La peinture coule sur les côtés\n- Le couvercle ne ferme plus correctement\n- Vous gaspillez de la peinture\n\n## La solution : l'élastique\n\n### Comment procéder\n\n1. Prenez un élastique solide\n2. Enroulez-le autour du pot de peinture verticalement\n3. Positionnez-le de façon à ce qu'il traverse le bord du pot\n4. Quand vous essuyez votre pinceau, passez-le sur l'élastique\n5. L'excédent de peinture tombe dans le pot\n\n## Les résultats\n\n- ✅ Le bord du pot reste propre\n- ✅ Zéro goutte sur les côtés\n- ✅ Le couvercle ferme parfaitement\n- ✅ Moins de gaspillage de peinture\n- ✅ Le nettoyage du pot est plus facile\n\n## Comment ça fonctionne\n\nL'élastique crée un essuie-pinceau improvisé au-dessus du pot. Au lieu d'essuyer sur le bord métallique, vous essuyez sur l'élastique qui renvoie la peinture dans le pot.\n\n## Utilisez des élastiques solides\n\nLes élastiques classiques peuvent se casser avec le poids de la peinture. Utilisez :\n- Des élastiques à viande\n- Des bracelets élastiques épais\n- Des sandows fins\n\n## Autres astuces pour la peinture\n\n- Utilisez un tournevis pour ouvrir les pots difficiles\n- Enveloppez les pinceaux dans du film alimentaire entre deux couches\n- Stockez les pots à l'envers pour créer un joint étanche\n\nL'astuce préférée de tous les peintres professionnels !",
    backgroundColor: '#F0EAE0',
  },
  'post_33_ice_salt_grease.png': {
    title: "J'ai mis des glaçons et du sel sur la tache de graisse sur ma chemise. Après 10 minutes, voici ce qui s'est passé",
    contentTemplate: "Une tache de graisse sur votre chemise préférée juste avant de sortir ? Pas de panique, cette méthode va vous sauver la mise.\n\n## Le problème des taches de graisse\n\nLes taches de graisse sont parmi les plus difficiles à enlever car :\n- La graisse pénètre profondément dans les fibres\n- L'eau seule ne sert à rien\n- Les détergents classiques sont souvent insuffisants\n- Agir tard rend l'élimination plus difficile\n\n## La méthode glaçons + sel\n\n### Comment procéder\n\n1. Étendez votre vêtement à plat sur une surface propre\n2. Placez 2-3 glaçons directement sur la tache\n3. Saupoudrez généreusement de gros sel sur les glaçons\n4. Laissez agir 10 minutes\n5. Retirez les glaçons\n6. Frottez le sel restant avec un chiffon\n7. Lavez normalement en machine\n\n## Les résultats\n\n- ✅ La tache de graisse disparaît complètement\n- ✅ Aucun dommage sur le tissu\n- ✅ Résultat visible avant même le lavage\n- ✅ Fonctionne sur tous les types de tissus\n- ✅ Solution 100% naturelle\n\n## Pourquoi ça fonctionne\n\n- Le froid des glaçons fige la graisse\n- La graisse figée se solidifie et se détache des fibres\n- Le sel agit comme absorbant\n- Ensemble, ils décomposent et absorbent la tache\n\n## Sur quels tissus ça marche\n\n- ✅ Coton\n- ✅ Polyester\n- ✅ Lin\n- ✅ Mélanges coton/polyester\n- ❌ Soie (testez d'abord)\n- ❌ Cuir\n\n## Si la tache est ancienne\n\nPour les taches incrustées :\n1. Appliquez du liquide vaisselle sur la tache\n2. Frottez doucement\n3. Laissez agir 15 minutes\n4. Appliquez ensuite la méthode glaçons + sel\n5. Lavez en machine à 60°C\n\nNe jetez plus vos vêtements tachés !",
    backgroundColor: '#F5F0EB',
  },
};

export function getPostData(filename: string): PostData | undefined {
  const data = POST_DATA_MAP[filename];
  if (!data) return undefined;
  return { filename, ...data };
}

export function getAllPostData(): PostData[] {
  return Object.entries(POST_DATA_MAP).map(([filename, data]) => ({
    filename,
    ...data,
  }));
}
