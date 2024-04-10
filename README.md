# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Git repo finns här: https://github.com/ivinskiy/jenny-pct

Här använder jag språket TypeScript, som är JavaScript fast med typer. Det gör det lättare att utveckla.

Appen innehåller en karta som ligger under components/Map.
Vill du göra ändringar till kartan, kan du göra det i filen Map.tsx. Har försökt kommentera så mycket som möjligt.
Vill du ändra utseendet på elementen i kartan (typ popupen) kan du göra det i Map.css.
Just nu till exempel så består popupen bara av massa paragraf (p)-taggar. Antingen kan du i css-filen targeta p-taggarna direkt, eller
så kan du leka runt med andra element. Testa wrappa alla dom till exempel i en <div></div> som du sen sätter background-color red på!

Just nu är APIt och backenden ganska långsam, vilket är varför det tar en liten tid att ladda. Jag är osäker på exakt varför det är så. Kan vara en begränsning med google sheets. Vi kan börja såhär, och så får vi se ifall databasen måste uppdateras efter!

Själva data-fetchingen sker i filen utils/getCoordinates.ts. Det går en fetch request till vårt script som sen returnerar alla rader i form av en lista av listor (varje rad är en lista där varje element är ett kolumnvärde). Den omvandlar vi med lite data engineering till ett trevligt objekt vi kan jobba med.

För att köra appen måste du köra

```
npm install
npm run dev

```

Om och när du gjort ändringar kan du göra följande kommandon (givet att du har Git. Om du inte har Git, installera det från internet)

```
git add .
git commit -m "skriv max en mening om vad du har gjort"
git push

```

Så fort du har kört git push så kommer den trigga en uppdatering av hemsidan. Så gör det helst inte för ofta. Om du vill experimentera en massa och spara din progress så kan du skapa en ny branch i git (lite info: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) och pusha upp till den branchen istället. När du är färdig kan du skapa en pull request i GitHub. Uppdateringen av hemsidan kommer att triggas av att det pushas till main.
