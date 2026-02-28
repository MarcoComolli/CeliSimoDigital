import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Status } from '../models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgIf, NgFor],
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

  openAccordionIndex: number | null = null;

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  constructor() {
    var storageItem = localStorage.getItem(this.statusKey);
    if (!storageItem) return;
    this.status = JSON.parse(storageItem);

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
  }

  geoHunter(res: string, delta: string) {
    let resNumber = parseFloat(res);
    let deltaNumber = parseFloat(delta);

    let resStr = `Inseriti: ${resNumber} ${deltaNumber}.`;
    if (resNumber > deltaNumber) {
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

  toggleAudio() {
    const audio = this.audioRef.nativeElement;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

//bandiere
//sarabanda anime (dungeon food, hiruga ruga, demon slayer)
//geohunter, globle, narutodle, pokedle
//voci modificate
//accordion in ordine suonano (hai mai ascoltato gli accordion? Loro sanno qual'è la soluzione a questo engigma)
//rickrolled
