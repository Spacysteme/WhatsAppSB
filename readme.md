# 💬 WhatsApp Terminal Bot - Version Node.js

Ce projet comprend une version unique du "WhatsApp Terminal Bot" en Node.js.

### Set Up

Avant d'exécuter le bot, suis ces étapes pour le configurer :

1. Crée un dossier sur ton bureau (ou n'importe où ailleurs) nommé :

    ```text
    WhatsApp Terminal Bot
    ```
2. Déplace les fichiers du projet dans ce dossier.
3. Ouvre un terminal et navigue vers le dossier du projet.
4. Installe les dépendances en exécutant la commande suivante :

    ```bash
    npm install
    ```

5. Lance le bot avec la commande suivante :

    ```bash
    node index.js
    ```

Cela garantit que tous les fichiers générés (comme les logs ou les sessions) resteront bien organisés dans le même dossier.

---

## Fonctionnement du Bot

### **QR Code pour se connecter :**
Au démarrage du bot, un QR code apparaît dans ton terminal. Scanne-le avec ton application WhatsApp pour te connecter. Ce QR code est sauvegardé localement grâce à `LocalAuth`, donc plus besoin de le rescanner à chaque fois.

### **Menu Principal :**
Une fois connecté, un menu interactif apparaît dans ton terminal avec ces options :
1. Messages privés
2. Groupes
3. Compte
4. Exit

### **Fonctionnalités par menu :**
- **Messages privés** : Liste les conversations privées, sélectionne un chat et envoie des commandes.
- **Groupes** : Liste les groupes, sélectionne un groupe et envoie des commandes.
- **Compte** : Accède aux options de gestion de ta session (réinitialisation, QR code, etc.).

## Commandes Disponibles

### **Commandes par défaut incluses dans `index.js`** :
- `ping` : Répond avec "Pong !"
- `kiss` : Envoie un baiser (message).
- `hug` : Envoie un câlin (message).
- `8ball` : Répond à une question comme une boule magique.
- `ascii` : Génère un art ASCII à partir de texte.

### **Commandes spécifiques aux groupes** :
- `lovecalc` : Calcule l'amour entre deux personnes.
- `user-info` : Affiche les informations d'un utilisateur.

Tu peux ajouter autant de commandes personnalisées que tu veux en créant de nouveaux fichiers dans le dossier `commands/`.

### **Menu "Compte"** :

Le menu "Compte" te permet de gérer ta session WhatsApp :

- `reset`: Supprime la session locale et demande un nouveau scan du QR code.
- `qrcode`: Réaffiche le QR code actuel.
- `back`: Retour au menu principal.

### **Dépendances** :

Le bot utilise les bibliothèques suivantes :

- `whatsapp-web.js`
- `qrcode-terminal`

Installe-les avec la commande :

    ```bash
    npm install whatsapp-web.js qrcode-terminal
    ```

---

### **Notes Importantes** :

- Ce bot fonctionne uniquement dans le terminal pour envoyer des messages WhatsApp automatiquement.
- Tu peux ajouter autant de commandes personnalisées que tu veux dans `commands/`.
- Si tu supprimes le fichier `.wwebjs_auth`, tu perds ta session et devras rescanner le QR code.

---

By Spacysteme, WavesStudio.