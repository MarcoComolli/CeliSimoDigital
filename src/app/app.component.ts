import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Status } from '../models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public phase: number = 0;
  public username: string = '';
  public response: string = 'Ciao! Come prima cosa, inserisci il tuo nome:';

  private instruction_base: string = 'Forza, inserisci il tuo nome:';
  private instruction: string = '';
  public status: Status = new Status();
  private statusKey: string = 'celi-status-key';

  public isCssAnimating = false;

  public chipTunes = [
    { expected: 'giova', v: '' },
    { expected: 'pit', v: '' },
    { expected: 'michel', v: '' },
    { expected: 'pavel', v: '' },
    { expected: 'dze', v: '' },
    { expected: 'marco', v: '' },
  ];

  public openAccordionIndex: number | null = null;

  private soundMap: Record<string, HTMLAudioElement> = {
    banana: new Audio('audio/banana.mp3'),
    di: new Audio('audio/di.mp3'),
    è: new Audio('audio/è.mp3'),
    la: new Audio('audio/la.mp3'),
    prova: new Audio('audio/prova.mp3'),
    questa: new Audio('audio/questa.mp3'),
    soluzione: new Audio('audio/soluzione.mp3'),
    //voices
    marco: new Audio('audio/chip/mar.mp3'),
    pavel: new Audio('audio/chip/pav.mp3'),
    giova: new Audio('audio/chip/gio.mp3'),
    pit: new Audio('audio/chip/pit.mp3'),
    michel: new Audio('audio/chip/mic.mp3'),
    dze: new Audio('audio/chip/dze.mp3'),
    //band
    amon: new Audio('audio/sarab/amon.mp3'),
    eroe: new Audio('audio/sarab/eroe.mp3'),
    linkin: new Audio('audio/sarab/linkin.mp3'),
    nexus: new Audio('audio/sarab/nexus.mp3'),
    lotr: new Audio('audio/sarab/lotr.mp3'),
    pressure: new Audio('audio/sarab/pressure.mp3'),
    sabaton: new Audio('audio/sarab/sabaton.mp3'),
    sandman: new Audio('audio/sarab/sandman.mp3'),
    inflam: new Audio('audio/sarab/inflam.mp3'),
    //anime
    aot: new Audio('audio/anim/aot.mp3'),
    blackclover: new Audio('audio/anim/blackclover.mp3'),
    deathnote: new Audio('audio/anim/deathnote.mp3'),
    demonslayer: new Audio('audio/anim/demonslayer.mp3'),
    dragonball: new Audio('audio/anim/dragonball.mp3'),
    dungeonfood: new Audio('audio/anim/dungeonfood.mp3'),
    ken: new Audio('audio/anim/ken.mp3'),
    loghorizon: new Audio('audio/anim/loghorizon.mp3'),
    mha: new Audio('audio/anim/mha.mp3'),
    naruto: new Audio('audio/anim/naruto.mp3'),
  };

  constructor() {
    var storageItem = localStorage.getItem(this.statusKey);
    if (!storageItem) return;
    this.status = JSON.parse(storageItem);

    //load audios

    this.status = new Status(); //TODO: cancella qui, solo x test
  }

  public onNameSubmit() {
    let insertedInput = this.username;
    if (this.username === '') {
      return;
    }
    this.instruction = this.instruction_base;
    this.username = '';
    var toChecK = insertedInput.toLowerCase().trim();
    this.status.loginTry++;

    if (this.status.loginTry >= 5) {
      this.instruction =
        `<br>(Nel caso non si fosse ancora capito..questa è una prova in sè..hai ancora ${this.status.loginRequiredTries - this.status.loginTry} tentativi per superarla)</br>` +
        this.instruction_base;
    }

    if (this.status.loginTry >= this.status.loginRequiredTries - 1) {
      this.instruction = `<br>Ok, non ci stiamo capendo...provo a rendertelo un pochino più esplicito.. (hai un ultimo tentativo)</br> Perfavore, inserisci <span class="highlight">il tuo nome</span>:`;
    }

    if (this.status.loginTry >= this.status.loginRequiredTries) {
      this.instruction = `<br>Eh vabbè, la prima prova non è andata benissimo, ma non ti scoraggiare e prova comunque ad entrare, cerchiamo di rendere più esplicito cosa vogliamo.</br> Perfavore, inserisci <span class="highlight2">il tuo nome</span>:`;
    }

    if (this.status.loginTry >= this.status.loginRequiredTries + 1) {
      this.instruction = `<br>Non ci siamo. Più di così non so come dirtelo</br> Perfavore, inserisci <span class="highlight3">il tuo nome</span> nella casella di testo qua sotto:`;
    }

    if (insertedInput.trim().startsWith('simone')) {
      this.status.enableUppercase = true;
      this.response = `Oh suvvia, <span class="highlight2">${insertedInput}</span>, con la minuscola iniziale? Dai, puoi sforzarti di più..<br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK.includes('parola') && toChecK.includes('simone')) {
      this.response = `<span class="highlight2">${insertedInput}</span>. Nome e cognome nonostante io ti abbia chiesto di inserire il tuo nome. Non ci siamo.<br>${this.instruction}`;
      this.saveStatus();
      return;
    }
    if (insertedInput.trim().startsWith('Simone')) {
      this.response = `Oh bene, <span class="highlight2">${insertedInput}</span>, con la lettera maiuscola. Così va meglio =). Tuttavia mi spiace dirti che non è la risposta corretta<br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK.startsWith('vysor')) {
      this.response = `<span class="highlight2">${insertedInput}</span>! Ottimo tentativo! Ok che è il tuo nickname ma non è comunque quello che ti ho chiesto.<br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK.startsWith('marco')) {
      this.response = `<span class="highlight2">${insertedInput}</span> :D. Ahah addirittura! Hai beccato chi ha fatto il sito ma no, hai sbagliato. <br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK === 'il tuo nome') {
      this.startCssAnimation();
      return;
    }

    this.response = `Hai inserito <span class="highlight2">${insertedInput}</span> ma ahimè non è la risposta corretta..<br>${this.instruction}`;
    this.saveStatus();
  }

  private saveStatus() {
    localStorage.setItem(this.statusKey, JSON.stringify(this.status));
  }

  private startCssAnimation() {
    this.isCssAnimating = true;
  }

  public onPhase0End() {
    this.status.phase = 1;
    this.saveStatus();
  }

  toggleAccordion(index: number): void {
    this.openAccordionIndex = this.openAccordionIndex === index ? null : index;
    //in chiusura
    if (this.openAccordionIndex !== index) {
      if (index === 2) {
        this.playAudio('è');
      }
      if (index === 4) {
        this.playAudio('la');
      }
      if (index === 5) {
        this.playAudio('di');
      }
      if (index === 7) {
        this.playAudio('questa');
      }
      if (index === 9) {
        this.playAudio('banana');
      }
      if (index === 10) {
        this.playAudio('prova');
      }
      if (index === 11) {
        this.playAudio('soluzione');
      }
    }
  }

  geoHunter(res: string, target: string) {
    let resNumber = parseFloat(res);
    let targetNumber = parseFloat(target);

    let threshold = 0;
    if (targetNumber < 180) {
      threshold = 290;
    } else {
      threshold = targetNumber * 1.6;
    }
    if (resNumber <= threshold) {
      this.status.challenges.geoHunter.isSuccess = true;
    } else {
      this.status.challenges.geoHunter.isSuccess = false;
    }
    let resStr = `Inseriti: result: ${resNumber}, target: ${targetNumber}. Necessari per vincere < di ${threshold}`;
    this.status.challenges.geoHunter.result = resStr;
    this.status.challenges.geoHunter.isConfirmed = true;
    this.saveStatus();
  }

  narutodleClassic(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 10;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.narutodleClassic.isSuccess = true;
    } else {
      this.status.challenges.narutodleClassic.isSuccess = false;
    }

    this.status.challenges.narutodleClassic.result = resStr;
    this.status.challenges.narutodleClassic.isConfirmed = true;
    this.saveStatus();
  }

  narutodleJutsu(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 7;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.narutodleJutsu.isSuccess = true;
    } else {
      this.status.challenges.narutodleJutsu.isSuccess = false;
    }

    this.status.challenges.narutodleJutsu.result = resStr;
    this.status.challenges.narutodleJutsu.isConfirmed = true;
    this.saveStatus();
  }
  narutodleEye(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 9;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.narutodleEye.isSuccess = true;
    } else {
      this.status.challenges.narutodleEye.isSuccess = false;
    }

    this.status.challenges.narutodleEye.result = resStr;
    this.status.challenges.narutodleEye.isConfirmed = true;
    this.saveStatus();
  }

  pokedleClassic(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 8;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.pokedleClassic.isSuccess = true;
    } else {
      this.status.challenges.pokedleClassic.isSuccess = false;
    }

    this.status.challenges.pokedleClassic.result = resStr;
    this.status.challenges.pokedleClassic.isConfirmed = true;
    this.saveStatus();
  }
  pokedleCard(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 5;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.pokedleCard.isSuccess = true;
    } else {
      this.status.challenges.pokedleCard.isSuccess = false;
    }

    this.status.challenges.pokedleCard.result = resStr;
    this.status.challenges.pokedleCard.isConfirmed = true;
    this.saveStatus();
  }
  pokedleDescription(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 9;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.pokedleDescription.isSuccess = true;
    } else {
      this.status.challenges.pokedleDescription.isSuccess = false;
    }

    this.status.challenges.pokedleDescription.result = resStr;
    this.status.challenges.pokedleDescription.isConfirmed = true;
    this.saveStatus();
  }
  pokedleImage(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 7;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.pokedleImage.isSuccess = true;
    } else {
      this.status.challenges.pokedleImage.isSuccess = false;
    }

    this.status.challenges.pokedleImage.result = resStr;
    this.status.challenges.pokedleImage.isConfirmed = true;
    this.saveStatus();
  }
  globleClassic(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 11;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.globleClassic.isSuccess = true;
    } else {
      this.status.challenges.globleClassic.isSuccess = false;
    }

    this.status.challenges.globleClassic.result = resStr;
    this.status.challenges.globleClassic.isConfirmed = true;
    this.saveStatus();
  }
  globleShape(res: string) {
    let resNumber = parseFloat(res);

    let threshold = 9;
    let resStr = `Inserito: ${resNumber}. Necessari per vincere < di ${threshold}`;
    if (resNumber <= threshold) {
      this.status.challenges.globleShape.isSuccess = true;
    } else {
      this.status.challenges.globleShape.isSuccess = false;
    }

    this.status.challenges.globleShape.result = resStr;
    this.status.challenges.globleShape.isConfirmed = true;
    this.saveStatus();
  }
  flags(flags: string[]) {
    if (flags.findIndex((x) => !x) !== -1) {
      console.log('Invalid');
      return;
    }
    let threshold = 7;
    let resStr = `Necessari per passare la prova: ${threshold} corretti.<br>Risultato [input] - [soluzione]: <br>`;

    var expected: string[] = ['Albania', 'Australia', 'Egitto', 'Marocco', 'Macedonia del Nord', 'Nigeria', 'Nepal', 'Arabia Saudita', 'Svezia'];
    var valid: boolean[] = [
      this.transform(flags[0]).includes('albania'),
      this.transform(flags[1]).includes('australia'),
      this.transform(flags[2]).includes('egitto'),
      this.transform(flags[3]).includes('marocco'),
      this.transform(flags[4]).includes('macedonia'),
      this.transform(flags[5]).includes('nigeria'),
      this.transform(flags[6]).includes('nepal'),
      this.transform(flags[7]).includes('arabia'),
      this.transform(flags[8]).includes('svezia'),
    ];

    for (let i = 0; i < flags.length; i++) {
      const inp = flags[i];
      resStr += `I:[${inp}] - S:[${expected[i]}] >> `;
      if (valid[i]) {
        resStr += '✅<br>';
      } else {
        resStr += '❌<br>';
      }
    }

    this.status.challenges.flags.isSuccess = valid.filter((x) => x).length >= threshold;

    this.status.challenges.flags.result = resStr;
    this.status.challenges.flags.isConfirmed = true;
    this.saveStatus();
  }

  songs(songs: string[]) {
    if (songs.findIndex((x) => !x) !== -1) {
      console.log('Invalid');
      return;
    }

    let threshold = 7;
    let resStr = `Necessari per passare la prova: ${threshold} corretti.<br>Risultato [input] - [soluzione]: <br>`;

    var expected: string[] = ['Castle of Glass', 'Amon Amarth', "Un'ode per l'eroe", 'Under pressure', 'Enter sandman', 'Howard Shore', 'The last stand', 'Amaranthe', 'In Flames'];
    var valid: boolean[] = [
      this.transform(songs[0]).includes('castle') && this.transform(songs[0]).includes('glass'),
      this.transform(songs[1]).includes('amonamart'),
      (this.transform(songs[2]).includes('ode') && this.transform(songs[2]).includes('eroe')) || this.transform(songs[2]).includes('magicsigns'),
      this.transform(songs[3]).includes('underpressure'),
      this.transform(songs[4]).includes('enter') && this.transform(songs[4]).includes('sandman'),
      this.transform(songs[5]).includes('shore'),
      this.transform(songs[6]).includes('laststand'),
      this.transform(songs[7]).includes('amaranthe'),
      this.transform(songs[8]).includes('inflames'),
    ];

    for (let i = 0; i < songs.length; i++) {
      const inp = songs[i];
      resStr += `I:[${inp}] - S:[${expected[i]}] >> `;
      if (valid[i]) {
        resStr += '✅<br>';
      } else {
        resStr += '❌<br>';
      }
    }

    this.status.challenges.songs.isSuccess = valid.filter((x) => x).length >= threshold;

    this.status.challenges.songs.result = resStr;

    this.status.challenges.songs.isConfirmed = true;
    this.saveStatus();
  }

  animeSongs(animes: string[]) {
    if (animes.findIndex((x) => !x) !== -1) {
      console.log('Invalid');
      return;
    }

    let threshold = 8;
    let resStr = `Necessari per passare la prova: ${threshold} corretti.<br>Risultato [input] - [soluzione]: <br>`;

    var expected: string[] = [
      'Death Note',
      'Attack on Titan',
      'Black Clover',
      'Demon Slayer',
      'Dungeon Food',
      'Ken il guerriero',
      'Log Horizon',
      'Dragonball',
      'Naruto: Shippuden',
      'My Hero Academia',
    ];
    var valid: boolean[] = [
      this.transform(animes[0]).includes('deathnote'),
      this.transform(animes[1]).includes('attackontitan') || this.transform(animes[1]).includes('attaccodeigiganti') || this.transform(animes[1]).includes('shingeki no kyojin'),
      this.transform(animes[2]).includes('blackclover'),
      this.transform(animes[3]).includes('demonslayer') || this.transform(animes[3]).includes('kimetsunoyaiba'),
      (this.transform(animes[4]).includes('dungeon') && this.transform(animes[4]).includes('food')) || this.transform(animes[4]).includes('dungeonmeshi'),
      this.transform(animes[5]).includes('ken') && (this.transform(animes[5]).includes('guerriero') || this.transform(animes[5]).includes('hokuto')),
      this.transform(animes[6]).includes('loghorizon'),
      this.transform(animes[7]).includes('dragonball'),
      this.transform(animes[8]).includes('naruto'),
      this.transform(animes[9]).includes('myheroacademia'),
    ];

    for (let i = 0; i < animes.length; i++) {
      const inp = animes[i];
      resStr += `I:[${inp}] - S:[${expected[i]}] >> `;
      if (valid[i]) {
        resStr += '✅<br>';
      } else {
        resStr += '❌<br>';
      }
    }

    this.status.challenges.animeSongs.isSuccess = valid.filter((x) => x).length >= threshold;

    this.status.challenges.animeSongs.result = resStr;
    this.status.challenges.animeSongs.isConfirmed = true;
    this.saveStatus();
  }

  accordionsAudio(res: string) {
    let resStr = `Inserito: ${res}. Soluzione: BANANA`;

    this.status.challenges.accordionsAudio.isSuccess = this.transform(res) === 'banana';

    this.status.challenges.accordionsAudio.result = resStr;
    this.status.challenges.accordionsAudio.isConfirmed = true;
    this.saveStatus();
  }

  voices() {
    var validation = 0;
    Object.values(this.chipTunes).forEach((v) => {
      if (!v.v) validation++;
    });

    if (validation > 0) return;
    let threshold = 5;
    let resStr = `Necessari per passare la prova: ${threshold} corretti.<br>Risultato [input] - [soluzione]: <br>`;

    var validAnswers = 0;

    Object.values(this.chipTunes).forEach((value) => {
      resStr += `I:[${value.v}] - S:[${value.expected}] >> `;
      if (value.v == value.expected) {
        validAnswers++;
        resStr += '✅<br>';
      } else {
        resStr += '❌<br>';
      }
    });

    this.status.challenges.voices.isSuccess = validAnswers >= threshold;

    this.status.challenges.voices.result = resStr;

    this.status.challenges.voices.isConfirmed = true;
    this.saveStatus();
  }

  rickRoll(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.rickRoll.isSuccess = true;

    this.status.challenges.rickRoll.result = resStr;
    this.status.challenges.rickRoll.isConfirmed = true;
    this.saveStatus();
  }

  private currentAudioPlayingKey: string = '';
  playAudio(key: keyof typeof this.soundMap) {
    const audio = this.soundMap[key];
    if (!audio) return;

    // se sto riproducendo
    if (!audio.paused && !audio.ended) {
      audio.pause();
      return;
    }

    if (this.currentAudioPlayingKey && this.currentAudioPlayingKey != key) {
      let currentAudio = this.soundMap[this.currentAudioPlayingKey];
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Object.values(this.soundMap).forEach((a) => {
    //   a.pause();
    //   a.currentTime = 0;
    // });
    this.currentAudioPlayingKey = key;
    audio.play();
  }

  private transform(input: string): string {
    if (!input) return '';
    var res = input.toLowerCase().trim().replaceAll(' ', '');
    return res;
  }
}

//bandiere
//sarabanda anime (dungeon food, hiruga ruga, demon slayer, ken il guerriero)
//geohunter, globle, narutodle, pokedle
//voci modificate
//accordion in ordine suonano (hai mai ascoltato gli accordion? Loro sanno qual'è la soluzione a questo engigma)
//rickrolled
