import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    { n: 'giova', v: '' },
    { n: 'pit', v: '' },
    { n: 'michel', v: '' },
    { n: 'pavel', v: '' },
    { n: 'dze', v: '' },
    { n: 'marco', v: '' },
    { n: 'giova', v: '' },
    { n: 'giova', v: '' },
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
    marco: new Audio('audio/chip/mar.mp3'),
    pavel: new Audio('audio/chip/pav.mp3'),
    giova: new Audio('audio/chip/gio.mp3'),
    pit: new Audio('audio/chip/pit.mp3'),
    michel: new Audio('audio/chip/mic.mp3'),
    dze: new Audio('audio/chip/dze.mp3'),
    amon: new Audio('audio/sarab/amon.mp3'),
    eroe: new Audio('audio/sarab/eroe.mp3'),
    linkin: new Audio('audio/sarab/linkin.mp3'),
    nexus: new Audio('audio/sarab/nexus.mp3'),
    lotr: new Audio('audio/sarab/lotr.mp3'),
    pressure: new Audio('audio/sarab/pressure.mp3'),
    sabaton: new Audio('audio/sarab/sabaton.mp3'),
    sandman: new Audio('audio/sarab/sandman.mp3'),
    aot: new Audio('audio/sarab/aot.mp3'),
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

    let resStr = `Inseriti: ${resNumber} ${targetNumber}.`;
    if (resNumber > targetNumber) {
      this.status.challenges.geoHunter.isSuccess = true;
    } else {
      this.status.challenges.geoHunter.isSuccess = false;
    }
    this.status.challenges.geoHunter.result = resStr;
    this.status.challenges.geoHunter.isConfirmed = true;
    this.saveStatus();
  }

  narutodleClassic(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.narutodleClassic.isSuccess = true;

    this.status.challenges.narutodleClassic.result = resStr;
    this.status.challenges.narutodleClassic.isConfirmed = true;
    this.saveStatus();
  }

  narutodleJutsu(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.narutodleJutsu.isSuccess = true;

    this.status.challenges.narutodleJutsu.result = resStr;
    this.status.challenges.narutodleJutsu.isConfirmed = true;
    this.saveStatus();
  }
  narutodleEye(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.narutodleEye.isSuccess = true;

    this.status.challenges.narutodleEye.result = resStr;
    this.status.challenges.narutodleEye.isConfirmed = true;
    this.saveStatus();
  }
  pokedleClassic(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.pokedleClassic.isSuccess = true;

    this.status.challenges.pokedleClassic.result = resStr;
    this.status.challenges.pokedleClassic.isConfirmed = true;
    this.saveStatus();
  }
  pokedleCard(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.pokedleCard.isSuccess = true;

    this.status.challenges.pokedleCard.result = resStr;
    this.status.challenges.pokedleCard.isConfirmed = true;
    this.saveStatus();
  }
  pokedleDescription(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.pokedleDescription.isSuccess = true;

    this.status.challenges.pokedleDescription.result = resStr;
    this.status.challenges.pokedleDescription.isConfirmed = true;
    this.saveStatus();
  }
  pokedleImage(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.pokedleImage.isSuccess = true;

    this.status.challenges.pokedleImage.result = resStr;
    this.status.challenges.pokedleImage.isConfirmed = true;
    this.saveStatus();
  }
  globleClassic(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.globleClassic.isSuccess = true;

    this.status.challenges.globleClassic.result = resStr;
    this.status.challenges.globleClassic.isConfirmed = true;
    this.saveStatus();
  }
  globleShape(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.globleShape.isSuccess = true;

    this.status.challenges.globleShape.result = resStr;
    this.status.challenges.globleShape.isConfirmed = true;
    this.saveStatus();
  }
  flags(flags: string[]) {
    let resStr = `Inseriti: ${flags.join(',')}.`;

    this.status.challenges.flags.isSuccess = true;

    this.status.challenges.flags.result = resStr;
    this.status.challenges.flags.isConfirmed = true;
    this.saveStatus();
  }

  songs(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.songs.isSuccess = true;

    this.status.challenges.songs.result = resStr;
    this.status.challenges.songs.isConfirmed = true;
    this.saveStatus();
  }

  animeSongs(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.animeSongs.isSuccess = true;

    this.status.challenges.animeSongs.result = resStr;
    this.status.challenges.animeSongs.isConfirmed = true;
    this.saveStatus();
  }

  accordionsAudio(res: string) {
    let resNumber = parseFloat(res);

    let resStr = `Inseriti: ${resNumber}.`;

    this.status.challenges.accordionsAudio.isSuccess = true;

    this.status.challenges.accordionsAudio.result = resStr;
    this.status.challenges.accordionsAudio.isConfirmed = true;
    this.saveStatus();
  }
  voices() {
    let resStr = `Inseriti: ${this.chipTunes}.`;

    this.status.challenges.voices.isSuccess = true;

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

  playAudio(key: keyof typeof this.soundMap) {
    const audio = this.soundMap[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
}

//bandiere
//sarabanda anime (dungeon food, hiruga ruga, demon slayer, ken il guerriero)
//geohunter, globle, narutodle, pokedle
//voci modificate
//accordion in ordine suonano (hai mai ascoltato gli accordion? Loro sanno qual'è la soluzione a questo engigma)
//rickrolled
